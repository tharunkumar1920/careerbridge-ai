import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface JourneyCanvasProps {
  scrollProgress: number; // 0 to 1
  activeSection: number;
}

export const JourneyCanvas: React.FC<JourneyCanvasProps> = ({ scrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    targetProgress: number;
    currentProgress: number;
    mouseX: number;
    mouseY: number;
    targetMouseX: number;
    targetMouseY: number;
    startTime: number;
    curve: THREE.CatmullRomCurve3 | null;
    mainPathMesh: THREE.Mesh | null;
    coreSphereGroup: THREE.Group | null;
    roadmapGroup: THREE.Group | null;
    opportunityGroup: THREE.Group | null;
    horizonGroup: THREE.Group | null;
    travelerGroup: THREE.Group | null;
    travelerFinalGroup: THREE.Group | null;
    pulseLight: THREE.PointLight | null;
    pulseMesh: THREE.Mesh | null;
    ambientParticles: THREE.Points | null;
    animFrameId: number;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    targetProgress: 0,
    currentProgress: 0,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    startTime: performance.now() * 0.001,
    curve: null,
    mainPathMesh: null,
    coreSphereGroup: null,
    roadmapGroup: null,
    opportunityGroup: null,
    horizonGroup: null,
    travelerGroup: null,
    travelerFinalGroup: null,
    pulseLight: null,
    pulseMesh: null,
    ambientParticles: null,
    animFrameId: 0,
  });

  // Keep targetProgress updated
  useEffect(() => {
    stateRef.current.targetProgress = Math.max(0, Math.min(1, scrollProgress));
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene & Renderer setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070D, 0.015);
    stateRef.current.scene = scene;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 300);
    camera.position.set(0, 1.2, 7);
    stateRef.current.camera = camera;

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0x1e2436, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xa78bfa, 1.8);
    keyLight.position.set(5, 10, 8);
    scene.add(keyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    cyanRimLight.position.set(-6, -4, -10);
    scene.add(cyanRimLight);

    const pulseLight = new THREE.PointLight(0x818cf8, 3, 14);
    scene.add(pulseLight);
    stateRef.current.pulseLight = pulseLight;

    // 3. MASTER CONTINUOUS SPLINE PATH - Routed cleanly in background margin
    // Defining key points connecting Section 1 -> 2 -> 3 -> 4 -> 5 -> 6
    const pathPoints = [
      new THREE.Vector3(1.4, -0.95, 6),     // Hero origin (feet of traveler on right side)
      new THREE.Vector3(1.2, -0.9, 2.5),    // Hero path smoothly curving
      new THREE.Vector3(0.5, -0.6, -2),     // Transition 1 -> 2
      new THREE.Vector3(0, 0.2, -7),        // Approach Section 2 (Dashboard)
      new THREE.Vector3(0.0, 0.4, -13),     // Centered in front of planet at Dashboard
      new THREE.Vector3(0.3, 0.1, -19),     // Lingering in front of planet at Dashboard
      new THREE.Vector3(1.5, -0.5, -28),    // Transition to Section 4 (Progression)
      new THREE.Vector3(1.2, -0.8, -38),    // Section 4: Learning Roadmap right background
      new THREE.Vector3(0.8, -0.4, -46),    // Transition 4 -> 5
      new THREE.Vector3(0.4, -0.2, -55),    // Section 5: Top Matched Opportunity
      new THREE.Vector3(0.2, 0.0, -64),     // Transition 5 -> 6
      new THREE.Vector3(0, 0.4, -75),       // Section 6: Future Horizon Peak
    ];

    const curve = new THREE.CatmullRomCurve3(pathPoints, false, 'centripetal', 0.5);
    stateRef.current.curve = curve;

    // Build the glowing tubular connection path
    const tubeGeometry = new THREE.TubeGeometry(curve, 180, 0.045, 12, false);
    
    // Custom gradient colors along the continuous tube
    const colors: number[] = [];
    const count = tubeGeometry.attributes.position.count;
    const colorA = new THREE.Color(0xa78bfa); // lavender
    const colorB = new THREE.Color(0x38bdf8); // cyan
    const colorC = new THREE.Color(0x34d399); // mint
    const colorTemp = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const z = tubeGeometry.attributes.position.getZ(i);
      // Map z from 6 down to -75
      const t = THREE.MathUtils.clamp((6 - z) / 81, 0, 1);
      if (t < 0.33) {
        colorTemp.lerpColors(colorA, colorB, t / 0.33);
      } else if (t < 0.66) {
        colorTemp.lerpColors(colorB, colorC, (t - 0.33) / 0.33);
      } else {
        colorTemp.lerpColors(colorC, colorA, (t - 0.66) / 0.34);
      }
      colors.push(colorTemp.r, colorTemp.g, colorTemp.b);
    }
    tubeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const pathMaterial = new THREE.MeshStandardMaterial({
      vertexColors: true,
      emissive: new THREE.Color(0x7c3aed),
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.88,
    });

    const mainPathMesh = new THREE.Mesh(tubeGeometry, pathMaterial);
    scene.add(mainPathMesh);
    stateRef.current.mainPathMesh = mainPathMesh;

    // Glowing photon bead running along the line
    const pulseGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    });
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    scene.add(pulseMesh);
    stateRef.current.pulseMesh = pulseMesh;

    // 4. SECTION 1 VISUALS: Minimalist Traveler Silhouette at Start (Positioned right)
    const travelerGroup = new THREE.Group();
    travelerGroup.position.set(1.4, -0.9, 5.8);

    // Sleek geometric human figure (calm, elegant, modern AI aesthetic)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0e1322,
      roughness: 0.4,
      metalness: 0.7,
      emissive: 0x1d243a,
      emissiveIntensity: 0.3,
    });
    const headMat = new THREE.MeshStandardMaterial({
      color: 0xa78bfa,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });

    const headGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.position.y = 1.05;
    travelerGroup.add(headMesh);

    const torsoGeo = new THREE.CylinderGeometry(0.1, 0.14, 0.55, 8);
    const torsoMesh = new THREE.Mesh(torsoGeo, bodyMat);
    torsoMesh.position.y = 0.68;
    travelerGroup.add(torsoMesh);

    const legsGeo = new THREE.CylinderGeometry(0.08, 0.05, 0.6, 8);
    const leftLeg = new THREE.Mesh(legsGeo, bodyMat);
    leftLeg.position.set(-0.08, 0.2, 0);
    const rightLeg = new THREE.Mesh(legsGeo, bodyMat);
    rightLeg.position.set(0.08, 0.2, 0);
    travelerGroup.add(leftLeg, rightLeg);

    // Pedestal glow ring under traveler
    const ringGeo = new THREE.RingGeometry(0.35, 0.4, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -0.05;
    travelerGroup.add(ringMesh);

    // Floating concept beacons along Hero path (Skills, Goals, Learning, Opportunities)
    const heroFloatingElements = new THREE.Group();
    const beaconGeo = new THREE.OctahedronGeometry(0.09, 0);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      wireframe: true,
    });
    const beaconCoords = [
      { x: -0.6, y: -0.4, z: 4.2 },
      { x: 0.65, y: -0.3, z: 3.2 },
      { x: -0.55, y: -0.2, z: 2.1 },
      { x: 0.5, y: -0.1, z: 0.8 },
    ];
    beaconCoords.forEach((coord) => {
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(coord.x, coord.y, coord.z);
      heroFloatingElements.add(beacon);
    });
    travelerGroup.add(heroFloatingElements);

    scene.add(travelerGroup);
    stateRef.current.travelerGroup = travelerGroup;

    // 5. SECTION 2 VISUALS: Central AI Core Planet & Orbiting Celestial Rings (Behind Dashboard)
    const coreSphereGroup = new THREE.Group();
    coreSphereGroup.position.set(0, 0.8, -20);

    // Outer lattice cybernetic sphere
    const sphereOuterGeo = new THREE.IcosahedronGeometry(1.7, 2);
    const sphereOuterMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
    });
    const sphereOuter = new THREE.Mesh(sphereOuterGeo, sphereOuterMat);
    coreSphereGroup.add(sphereOuter);

    // Inner glowing planet nucleus
    const sphereInnerGeo = new THREE.SphereGeometry(1.15, 32, 32);
    const sphereInnerMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.95,
      roughness: 0.25,
      metalness: 0.8,
      transparent: true,
      opacity: 0.9,
    });
    const sphereInner = new THREE.Mesh(sphereInnerGeo, sphereInnerMat);
    coreSphereGroup.add(sphereInner);

    // Atmospheric outer glow halo
    const haloGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    coreSphereGroup.add(haloMesh);

    // Orbiting planetary rings
    const orbitRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.02, 12, 80),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.55 })
    );
    orbitRing1.rotation.x = Math.PI / 3;
    orbitRing1.rotation.y = Math.PI / 6;
    coreSphereGroup.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.02, 12, 80),
      new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.45 })
    );
    orbitRing2.rotation.x = -Math.PI / 4;
    orbitRing2.rotation.z = Math.PI / 5;
    coreSphereGroup.add(orbitRing2);

    const orbitRing3 = new THREE.Mesh(
      new THREE.TorusGeometry(3.9, 0.015, 12, 80),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 })
    );
    orbitRing3.rotation.x = Math.PI / 5;
    orbitRing3.rotation.y = -Math.PI / 4;
    coreSphereGroup.add(orbitRing3);

    // Orbiting satellite nodes (7 nodes: Skills, Goals, Learning, Projects, Internships, Jobs, Recruiters)
    const satelliteNodes: THREE.Mesh[] = [];
    const satelliteCount = 7;
    const satelliteColors = [0xa78bfa, 0x38bdf8, 0x818cf8, 0x34d399, 0xf472b6, 0xfbbf24, 0x60a5fa];

    for (let i = 0; i < satelliteCount; i++) {
      const angle = (i / satelliteCount) * Math.PI * 2;
      const radius = 2.4 + (i % 2) * 0.3;
      const nodeGeo = new THREE.SphereGeometry(0.13, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: satelliteColors[i],
        emissive: satelliteColors[i],
        emissiveIntensity: 0.7,
        roughness: 0.2,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.5) * 0.6, Math.sin(angle) * radius);
      coreSphereGroup.add(nodeMesh);
      satelliteNodes.push(nodeMesh);

      // Connecting laser line to center
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        nodeMesh.position,
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: satelliteColors[i],
        transparent: true,
        opacity: 0.35,
      });
      const connLine = new THREE.Line(lineGeo, lineMat);
      coreSphereGroup.add(connLine);
    }

    scene.add(coreSphereGroup);
    stateRef.current.coreSphereGroup = coreSphereGroup;

    // 7. SECTION 4 VISUALS: Futuristic Roadmap Milestones along Spline (in margin)
    const roadmapGroup = new THREE.Group();
    roadmapGroup.position.set(1.2, -0.8, -38);

    // Milestone gate rings (6 milestones)
    const milestoneRings: THREE.Mesh[] = [];
    const milestoneColors = [0x34d399, 0x34d399, 0xa78bfa, 0x64748b, 0x64748b, 0x64748b];
    for (let i = 0; i < 6; i++) {
      const zOffset = (i - 2.5) * 2.2;
      const mRingGeo = new THREE.TorusGeometry(0.65, 0.03, 12, 32);
      const mRingMat = new THREE.MeshStandardMaterial({
        color: milestoneColors[i],
        emissive: milestoneColors[i],
        emissiveIntensity: i === 2 ? 1.0 : (i < 2 ? 0.6 : 0.2),
        roughness: 0.3,
        transparent: true,
        opacity: i === 2 ? 0.95 : 0.6,
      });
      const mRing = new THREE.Mesh(mRingGeo, mRingMat);
      mRing.position.set((i % 2 === 0 ? -0.3 : 0.3), 0, zOffset);
      roadmapGroup.add(mRing);
      milestoneRings.push(mRing);
    }

    scene.add(roadmapGroup);
    stateRef.current.roadmapGroup = roadmapGroup;

    // 8. SECTION 5 VISUALS: Branching Opportunities
    const opportunityGroup = new THREE.Group();
    opportunityGroup.position.set(0, 0, -54);

    // Three opportunity pods (TechNova 92%, ByteCraft 87%, CloudNext 81%)
    const oppBranches = [
      { x: 0.3, y: 0.3, z: 0, scale: 1.1, color: 0x38bdf8, match: '92%' },
      { x: -1.4, y: -0.4, z: -2, scale: 0.9, color: 0x34d399, match: '87%' },
      { x: 1.5, y: -0.5, z: -3, scale: 0.85, color: 0x818cf8, match: '81%' },
    ];

    oppBranches.forEach((opp) => {
      const podGeo = new THREE.OctahedronGeometry(0.4 * opp.scale, 1);
      const podMat = new THREE.MeshStandardMaterial({
        color: opp.color,
        emissive: opp.color,
        emissiveIntensity: opp.match === '92%' ? 0.9 : 0.4,
        roughness: 0.2,
        wireframe: true,
      });
      const pod = new THREE.Mesh(podGeo, podMat);
      pod.position.set(opp.x, opp.y, opp.z);
      opportunityGroup.add(pod);

      // Connecting branch line to root
      const branchCurve = new THREE.LineCurve3(
        new THREE.Vector3(0, 0, 5),
        new THREE.Vector3(opp.x, opp.y, opp.z)
      );
      const branchTubeGeo = new THREE.TubeGeometry(branchCurve, 16, 0.02, 8, false);
      const branchTubeMat = new THREE.MeshBasicMaterial({
        color: opp.color,
        transparent: true,
        opacity: opp.match === '92%' ? 0.85 : 0.35,
      });
      const branchTube = new THREE.Mesh(branchTubeGeo, branchTubeMat);
      opportunityGroup.add(branchTube);
    });

    scene.add(opportunityGroup);
    stateRef.current.opportunityGroup = opportunityGroup;

    // 9. SECTION 6 VISUALS: Final Horizon & Victorious Traveler
    const horizonGroup = new THREE.Group();
    horizonGroup.position.set(0, 0.5, -75);

    // Futuristic city skyline silhouette in distance
    const buildingCount = 28;
    for (let i = 0; i < buildingCount; i++) {
      const bHeight = 1.2 + Math.sin(i * 1.3) * 0.9 + (i % 3) * 0.4;
      const bGeo = new THREE.BoxGeometry(0.4, bHeight, 0.4);
      const bMat = new THREE.MeshStandardMaterial({
        color: 0x090d18,
        roughness: 0.7,
        metalness: 0.4,
        emissive: 0x1e1b4b,
        emissiveIntensity: 0.2 + (i % 4) * 0.1,
      });
      const building = new THREE.Mesh(bGeo, bMat);
      building.position.set((i - buildingCount / 2) * 0.55, -0.6 + bHeight / 2, -10 - (i % 3) * 2);
      horizonGroup.add(building);
    }

    // Horizon glowing disc / dawn aura
    const dawnDiscGeo = new THREE.CircleGeometry(6, 32);
    const dawnDiscMat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });
    const dawnDisc = new THREE.Mesh(dawnDiscGeo, dawnDiscMat);
    dawnDisc.position.set(0, 1.2, -12);
    horizonGroup.add(dawnDisc);

    // Glowing Skill Link emblem over horizon
    const emblemRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.1, 0.03, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 })
    );
    emblemRing.position.set(0, 1.8, -8);
    horizonGroup.add(emblemRing);

    // Final traveler silhouette looking toward the horizon (the visual loop completed!)
    const travelerFinalGroup = travelerGroup.clone();
    travelerFinalGroup.position.set(0, -0.1, -73.5);
    travelerFinalGroup.rotation.y = Math.PI; // Looking toward the horizon
    travelerFinalGroup.scale.set(0.9, 0.9, 0.9);
    horizonGroup.add(travelerFinalGroup);
    stateRef.current.travelerFinalGroup = travelerFinalGroup;

    scene.add(horizonGroup);
    stateRef.current.horizonGroup = horizonGroup;

    // 10. Ambient Starfield / Neural Particles
    const particleCount = 750;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const pColorA = new THREE.Color(0x818cf8);
    const pColorB = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 36;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 2] = 10 - Math.random() * 95;

      const pCol = Math.random() > 0.5 ? pColorA : pColorB;
      particleColors[i * 3] = pCol.r;
      particleColors[i * 3 + 1] = pCol.g;
      particleColors[i * 3 + 2] = pCol.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const ambientParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(ambientParticles);
    stateRef.current.ambientParticles = ambientParticles;

    // 11. Mouse tracking for subtle parallax
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      stateRef.current.targetMouseX = normX * 0.4;
      stateRef.current.targetMouseY = normY * 0.3;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 12. Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 13. ANIMATION RENDER LOOP (BUTTERY-SMOOTH 60 FPS)
    const animate = () => {
      const state = stateRef.current;
      const elapsed = performance.now() * 0.001 - state.startTime;

      // Smooth progress interpolation (lerp)
      const lerpSpeed = prefersReducedMotion ? 0.05 : 0.08;
      state.currentProgress += (state.targetProgress - state.currentProgress) * lerpSpeed;

      // Mouse parallax lerp
      state.mouseX += (state.targetMouseX - state.mouseX) * 0.05;
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.05;

      const progress = Math.max(0, Math.min(0.999, state.currentProgress));

      // Continuous camera position along path
      if (state.curve && camera) {
        // Delay camera motion around dashboard (progress between 0.22 and 0.48)
        let camProgress = progress;
        if (progress >= 0.22 && progress <= 0.48) {
          // Slow down progression across the dashboard zone so background camera lingers
          const norm = (progress - 0.22) / 0.26;
          const eased = Math.sin(norm * Math.PI * 0.5);
          camProgress = 0.22 + eased * 0.10;
        } else if (progress > 0.48) {
          const catchUp = (progress - 0.48) / 0.52;
          camProgress = 0.32 + catchUp * 0.68;
        }

        const effectiveCamProgress = camProgress * 0.92;
        const targetPoint = state.curve.getPointAt(Math.min(effectiveCamProgress + 0.07, 0.999));
        const camPoint = state.curve.getPointAt(effectiveCamProgress);

        // Position camera slightly above and behind the current journey coordinate
        camera.position.x = camPoint.x + state.mouseX * 0.8;
        camera.position.y = camPoint.y + 1.2 + state.mouseY * 0.5;
        camera.position.z = camPoint.z + 5.2 - progress * 2.0;

        // Camera smoothly tracks the next point on the career line
        camera.lookAt(targetPoint.x, targetPoint.y + 0.3, targetPoint.z);
      }

      // Energy pulse bead traveling along the spline
      if (state.curve && state.pulseMesh && state.pulseLight) {
        // Continuous cycle based on time + scroll progress
        const pulseT = (elapsed * 0.15 + progress) % 1.0;
        const pt = state.curve.getPointAt(pulseT);
        state.pulseMesh.position.copy(pt);
        state.pulseLight.position.copy(pt);
        state.pulseLight.position.y += 0.2;
      }

      // 14. DYNAMIC CONTINUOUS SECTION MORPHING & TRANSFORMATIONS
      // Section 1: Traveler fades back as user travels forward along path
      if (state.travelerGroup) {
        const travelerScale = Math.max(0.01, Math.min(1, 1.2 - progress * 4.5));
        state.travelerGroup.scale.setScalar(travelerScale);
        state.travelerGroup.position.y = -0.9 + Math.sin(elapsed * 2) * 0.02;
      }

      // Section 2 / Dashboard: Celestial Planet stays visible in background behind the dashboard
      if (state.coreSphereGroup) {
        // Slower, majestic, serene planetary rotation
        state.coreSphereGroup.rotation.y = elapsed * 0.05;
        state.coreSphereGroup.rotation.x = Math.sin(elapsed * 0.04) * 0.06;

        let sphereScale = 0.01;
        if (progress < 0.10) {
          sphereScale = 0.01;
        } else if (progress < 0.22) {
          // Expanding into view as user approaches Section 2
          sphereScale = (progress - 0.10) / 0.12;
        } else if (progress <= 0.48) {
          // FULL SCALE behind the dashboard!
          sphereScale = 1.15;
        } else if (progress <= 0.56) {
          // Gently shrink/fade out as user scrolls toward Chapter 04 Progression
          sphereScale = Math.max(0.01, 1.15 * (1.0 - (progress - 0.48) / 0.08));
        } else {
          sphereScale = 0.01;
        }
        state.coreSphereGroup.scale.setScalar(sphereScale);
      }

      // Section 4: Pulse milestone rings
      if (state.roadmapGroup) {
        let roadmapScale = 0.01;
        if (progress < 0.45) {
          roadmapScale = 0.01;
        } else if (progress < 0.55) {
          roadmapScale = (progress - 0.45) / 0.10;
        } else if (progress < 0.68) {
          roadmapScale = 1.0;
        } else if (progress < 0.78) {
          roadmapScale = Math.max(0.01, 1.0 - (progress - 0.68) / 0.10);
        } else {
          roadmapScale = 0.01;
        }
        state.roadmapGroup.scale.setScalar(roadmapScale);

        state.roadmapGroup.children.forEach((child, i) => {
          if (child instanceof THREE.Mesh) {
            child.rotation.z = elapsed * 0.5 + i;
          }
        });
      }

      // Section 5: Rotate opportunity pods
      if (state.opportunityGroup) {
        let oppScale = 0.01;
        if (progress < 0.62) {
          oppScale = 0.01;
        } else if (progress < 0.72) {
          oppScale = (progress - 0.62) / 0.10;
        } else if (progress < 0.85) {
          oppScale = 1.0;
        } else if (progress < 0.92) {
          oppScale = Math.max(0.01, 1.0 - (progress - 0.85) / 0.07);
        } else {
          oppScale = 0.01;
        }
        state.opportunityGroup.scale.setScalar(oppScale);

        state.opportunityGroup.children.forEach((child) => {
          if (child instanceof THREE.Mesh && child.geometry instanceof THREE.OctahedronGeometry) {
            child.rotation.y = elapsed * 0.8;
            child.rotation.x = elapsed * 0.4;
          }
        });
      }

      // Section 6: Horizon dawn & final traveler
      if (state.horizonGroup) {
        let horizonScale = 0.01;
        if (progress < 0.78) {
          horizonScale = 0.01;
        } else if (progress < 0.88) {
          horizonScale = (progress - 0.78) / 0.10;
        } else {
          horizonScale = 1.0;
        }
        state.horizonGroup.scale.setScalar(horizonScale);
      }

      // Subtle float for traveler
      if (state.travelerGroup) {
        state.travelerGroup.position.y = -1.05 + Math.sin(elapsed * 2) * 0.02;
      }

      // Ambient particle drift
      if (state.ambientParticles) {
        state.ambientParticles.rotation.y = elapsed * 0.02;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }

      state.animFrameId = requestAnimationFrame(animate);
    };

    stateRef.current.animFrameId = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(stateRef.current.animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="journey-canvas-container"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
};
