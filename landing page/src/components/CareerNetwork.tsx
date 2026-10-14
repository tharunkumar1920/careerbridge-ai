import React, { useState } from 'react';
import {
  Brain,
  Target,
  BookOpen,
  Terminal,
  Compass,
  Briefcase,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Cpu,
  Radio,
  Layers,
  type LucideIcon,
} from 'lucide-react';

interface CareerNetworkProps {
  onContinue: () => void;
}

interface EcosystemNodeDef {
  id: string;
  label: string;
  direction: string;
  compassVector: string;
  color: string;
  role: string;
  details: string;
  eliminates: string;
  metric: string;
  metricLabel: string;
  icon: LucideIcon;
  connections: string[];
}

const ECOSYSTEM_NODES: EcosystemNodeDef[] = [
  {
    id: 'skills',
    label: 'Skills',
    direction: 'North',
    compassVector: '000° N',
    color: '#A78BFA',
    role: 'Verified Competency Engine',
    details: 'Evaluates real GitHub repos, production project builds, and benchmark code assessments instead of empty bullet points on a static PDF.',
    eliminates: 'Keyword-stuffed resumes and unverified claims.',
    metric: '100% Code-Verified',
    metricLabel: 'Integrity Rating',
    icon: Brain,
    connections: ['goals', 'learning'],
  },
  {
    id: 'goals',
    label: 'Goals',
    direction: 'North-East',
    compassVector: '051° NE',
    color: '#38BDF8',
    role: 'Dynamic Career Trajectory',
    details: 'Adapts continuously as industry hiring bars shift, translating your dream role (e.g. AI/ML Engineer) into real-time skill targets.',
    eliminates: 'Guesswork about what specific tech stacks actually matter.',
    metric: '+34% YoY Demand',
    metricLabel: 'Market Momentum',
    icon: Target,
    connections: ['learning', 'projects'],
  },
  {
    id: 'learning',
    label: 'Learning',
    direction: 'East',
    compassVector: '103° E',
    color: '#818CF8',
    role: 'Adaptive Curricula Engine',
    details: 'Curates exact micro-modules that bridge your specific verified gaps, skipping redundant fluff you already know.',
    eliminates: '60-hour bloated courses with 90% irrelevant theoretical filler.',
    metric: '4.5 Mo. Velocity',
    metricLabel: 'Time-to-Readiness',
    icon: BookOpen,
    connections: ['projects', 'internships'],
  },
  {
    id: 'projects',
    label: 'Projects',
    direction: 'South-East',
    compassVector: '154° SE',
    color: '#34D399',
    role: 'Proof-of-Competency Sandbox',
    details: 'Guides you through building production-grade capstones with automated PR feedback and architectural scoring.',
    eliminates: 'Generic tutorial clone projects that recruiters ignore.',
    metric: 'Auto PR Scoring',
    metricLabel: 'Architecture Grade',
    icon: Terminal,
    connections: ['internships', 'jobs'],
  },
  {
    id: 'internships',
    label: 'Internships',
    direction: 'South-West',
    compassVector: '206° SW',
    color: '#F472B6',
    role: 'Applied Fast-Track Pipelines',
    details: 'Matches you directly with high-growth engineering teams actively hiring interns with your exact demonstrated capability.',
    eliminates: 'Sending 500 blind cold applications into black-hole ATS filters.',
    metric: '7.2 Days to Interview',
    metricLabel: 'Placement Speed',
    icon: Compass,
    connections: ['jobs', 'recruiters'],
  },
  {
    id: 'jobs',
    label: 'Jobs',
    direction: 'West',
    compassVector: '257° W',
    color: '#FBBF24',
    role: 'Precision Placement Ecosystem',
    details: 'Pre-screens your candidacy against verified production hiring bars for new-grad and entry-level career transitions.',
    eliminates: '6-round repetitive technical filters by certifying your skills upfront.',
    metric: '$115k – $135k Tier',
    metricLabel: 'Entry Compensation',
    icon: Briefcase,
    connections: ['recruiters', 'skills'],
  },
  {
    id: 'recruiters',
    label: 'Recruiters',
    direction: 'North-West',
    compassVector: '309° NW',
    color: '#60A5FA',
    role: 'Verified Talent Intelligence',
    details: 'Provides hiring teams with a direct, bias-free pipeline of college students who have proven skills and code deliverables.',
    eliminates: 'Manual LinkedIn searches and weeks of unqualified resume screening.',
    metric: '380+ Tech Partners',
    metricLabel: 'Hiring Network',
    icon: Users,
    connections: ['skills', 'goals'],
  },
];

export const CareerNetwork: React.FC<CareerNetworkProps> = ({ onContinue }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('skills');
  // Starts at 180° so node 0 (Skills at base 0°) lands facing West (180°) toward the Left card
  const [wheelRotation, setWheelRotation] = useState<number>(180);

  const activeIndex = ECOSYSTEM_NODES.findIndex((n) => n.id === selectedNodeId);
  const activeNode = ECOSYSTEM_NODES[activeIndex] || ECOSYSTEM_NODES[0];

  // Focal target angle: 180° (West, facing the left information card)
  const focalAngle = 180;
  const numNodes = ECOSYSTEM_NODES.length;
  const angleStep = 360 / numNodes;

  // Turn-around transition to any selected node by calculating shortest angular delta
  const rotateToNode = (targetIndex: number) => {
    const targetNode = ECOSYSTEM_NODES[targetIndex];
    if (!targetNode) return;

    const baseAngle = targetIndex * angleStep;
    const targetDesired = focalAngle - baseAngle;

    let diff = (targetDesired - (wheelRotation % 360));
    diff = ((diff + 540) % 360) - 180;

    setWheelRotation((prev) => prev + diff);
    setSelectedNodeId(targetNode.id);
  };

  // Next option click -> turns wheel counter-clockwise to next option
  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % numNodes;
    setWheelRotation((prev) => prev - angleStep);
    setSelectedNodeId(ECOSYSTEM_NODES[nextIndex].id);
  };

  // Previous option click -> turns wheel clockwise to previous option
  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + numNodes) % numNodes;
    setWheelRotation((prev) => prev + angleStep);
    setSelectedNodeId(ECOSYSTEM_NODES[prevIndex].id);
  };

  // Geometry: SVG 500x500 square viewBox, radius = 36% (180px in 500px scale)
  const svgCenter = 250;
  const svgRadius = 180;
  const pctRadius = 36; // in % of container

  return (
    <section id="section-1" className="section-wrapper network-section" style={{ paddingBottom: '90px' }}>
      {/* Chapter Indicator */}
      <div className="chapter-badge">Ecosystem</div>

      {/* Main Headline */}
      <div style={{ maxWidth: '840px', marginBottom: '24px' }}>
        <h2
          style={{
            fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)',
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '14px',
            color: 'var(--text-primary)',
          }}
        >
          The Bigger Picture — Connected to the Core.
        </h2>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          "No more fragmented platforms. Skill Link connects every dimension of your career journey to an intelligent AI nucleus. Click any option on the wheel or select next to rotate the constellation into focus.
        </p>
      </div>

      {/* Top Synapse Strip */}
      <div
        className="synapse-navigator-strip no-scrollbar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '28px',
          padding: '6px 12px',
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          width: 'fit-content',
          maxWidth: '100%',
        }}
      >
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '4px' }}>
          Synapse Navigator:
        </span>
        {ECOSYSTEM_NODES.map((node, idx) => {
          const isCurrent = activeNode.id === node.id;
          const NodeIcon = node.icon;
          return (
            <button
              key={node.id}
              onClick={() => rotateToNode(idx)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 11px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.78rem',
                fontWeight: 500,
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                color: isCurrent ? '#FFFFFF' : 'var(--text-secondary)',
                background: isCurrent ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                border: isCurrent ? `1px solid ${node.color}` : '1px solid transparent',
                transition: 'var(--transition-smooth)',
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)',

              }}
            >
              <NodeIcon size={13} color={isCurrent ? node.color : 'var(--text-muted)'} />
              <span>{node.label}</span>
              <span style={{ fontSize: '0.65rem', opacity: isCurrent ? 0.9 : 0.6, fontFamily: 'var(--font-display)' }}>
                {node.compassVector}
              </span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          2-COLUMN SPLIT LAYOUT:
          - Left: Information Display Card (clean dark glassmorphism, no neon)
          - Right: Interactive Rotating AI Core Wheel with Exact Geometric Placement
          ========================================================================= */}
      <div className="ecosystem-split-layout">

        {/* =======================================================================
            INFORMATION DISPLAY CARD (ON THE LEFT)
            ======================================================================= */}
        <div
          className="glass-panel"
          style={{
            padding: '28px',
            
            boxShadow: '0 16px 36px -8px rgba(0, 0, 0, 0.45)',
            position: 'relative',
          }}
        >
          {/* Header: Compass Direction & Live Synapse Marker */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
              paddingBottom: '10px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: activeNode.color,
                fontWeight: 600,
              }}
            >
              <Radio size={13} />
              <span>{activeNode.direction} Vector • {activeNode.compassVector}</span>
            </div>
            <div
              className="pill-badge active"
              style={{
                fontSize: '0.72rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.12)',
                color: 'var(--text-primary)',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: activeNode.color }} />
              Synapse {activeIndex + 1} of {ECOSYSTEM_NODES.length}
            </div>
          </div>

          {/* Node Identity: Clean Icon + Title + Role */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${activeNode.color}60`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {React.createElement(activeNode.icon, { size: 20, color: activeNode.color })}
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                {activeNode.label}
              </h3>
              <div style={{ fontSize: '0.8125rem', color: activeNode.color, fontWeight: 500 }}>
                {activeNode.role}
              </div>
            </div>
          </div>

          {/* Core Capability Mechanism */}
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
            {activeNode.details}
          </p>

          {/* Solves / Eliminates Banner */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              marginBottom: '16px',
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--accent-mint)', fontWeight: 600, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} />
              <span>How Skill Link Eliminates Career Fragmentation</span>
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              {activeNode.eliminates}
            </div>
          </div>

          {/* Live Benchmark Metric + Bi-directional Synergy */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '18px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {activeNode.metricLabel}
              </span>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFFFFF' }}>
                {activeNode.metric}
              </div>
            </div>

            {/* Connected Synapses Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Direct Links:</span>
              {activeNode.connections.map((connId) => {
                const connIdx = ECOSYSTEM_NODES.findIndex((n) => n.id === connId);
                const connNode = ECOSYSTEM_NODES[connIdx];
                if (!connNode) return null;
                return (
                  <button
                    key={connId}
                    onClick={() => rotateToNode(connIdx)}
                    style={{
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.72rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: connNode.color,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)',
                    }}
                    title={`Rotate wheel to ${connNode.label}`}
                  >
                    {connNode.label} ↗
                  </button>
                );
              })}
            </div>
          </div>

          {/* TURN-AROUND TRANSITION CONTROLS (NEXT / PREV OPTION) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              paddingTop: '14px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '14px',
            }}
          >
            <button
              onClick={handlePrev}
              className="btn-secondary"
              style={{
                fontSize: '0.8125rem',
                padding: '7px 14px',
                borderRadius: 'var(--radius-md)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <ArrowLeft size={14} />
              <span>Previous</span>
            </button>

            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>
              Option {activeIndex + 1} of {ECOSYSTEM_NODES.length}
            </span>

            <button
              onClick={handleNext}
              className="btn-primary"
              style={{
                fontSize: '0.8125rem',
                padding: '7px 16px',
                borderRadius: 'var(--radius-md)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Next Option</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Direct Link to Chapter 03 Gap Analysis */}
          <button
            onClick={onContinue}
            className="btn-ghost"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            <span>Explore Dynamic Gap Analysis in Chapter 03</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* =======================================================================
            INTERACTIVE ROTATING AI CORE WHEEL (ON THE RIGHT)
            (Mathematical 100% Alignment: Circular symmetry, zero neon)
            ======================================================================= */}
        <div className="ecosystem-wheel-stage">
          {/* Subtle Atmospheric Ambient Glow behind wheel (calibrated, not blinding) */}
          <div
            style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
             
              filter: 'blur(35px)',
              pointerEvents: 'none',
              transition: 'background 0.5s ease',
            }}
          />

          {/* Subtle Concentric Orbital Background Guides */}
          <div className="core-orbit-ring ring-1" />
          <div className="core-orbit-ring ring-2" />

          {/* Stationary Focal Target Reticle at Left Apex (14% from left = 50% - 36%) */}
          <div
            className="focal-target-reticle"
            style={
              {
                left: `${50 - pctRadius}%`,
                top: '50%',
                '--node-color': activeNode.color,
              } as React.CSSProperties
            }
          />

          {/* Subtle Horizontal Conduit Bridge from Reticle to Stage Left Edge */}
          <div
            className="focal-laser-conduit"
            style={
              {
                left: '0px',
                width: `${50 - pctRadius}%`,
                '--node-color': activeNode.color,
              } as React.CSSProperties
            }
          />

          {/* =====================================================================
              THE ROTATING WHEEL ROTOR
              Rotates with smooth transition so the selected node turns to 180°!
              ===================================================================== */}
          <div
            className="turn-around-wheel-rotor"
            style={{
              transform: `rotate(${wheelRotation}deg)`,
            }}
          >
            {/* SVG Connecting Conduits from Central Core to each Satellite Node */}
            <svg
              viewBox={`0 0 ${svgCenter * 2} ${svgCenter * 2}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            >
              <defs>
                <filter id="soft-conduit-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Subtle Ecosystem Ring Polygon connecting all 7 nodes */}
              <polygon
                points={ECOSYSTEM_NODES.map((_, i) => {
                  const rad = (i * angleStep * Math.PI) / 180;
                  const x = svgCenter + svgRadius * Math.cos(rad);
                  const y = svgCenter + svgRadius * Math.sin(rad);
                  return `${x},${y}`;
                }).join(' ')}
                fill="none"
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth="1"
                strokeDasharray="3 4"
              />

              {/* Connecting Conduits from Center (250, 250) to all nodes */}
              {ECOSYSTEM_NODES.map((node, i) => {
                const isSelected = activeNode.id === node.id;
                const rad = (i * angleStep * Math.PI) / 180;
                const nodeX = svgCenter + svgRadius * Math.cos(rad);
                const nodeY = svgCenter + svgRadius * Math.sin(rad);

                return (
                  <g key={`conduit-group-${node.id}`}>
                    <line
                      x1={svgCenter}
                      y1={svgCenter}
                      x2={nodeX}
                      y2={nodeY}
                      stroke={isSelected ? node.color : 'rgba(255, 255, 255, 0.1)'}
                      strokeWidth={isSelected ? '2.5' : '1'}
                      strokeDasharray={isSelected ? 'none' : '3 4'}
                      filter={isSelected ? 'url(#soft-conduit-glow)' : 'none'}
                    />
                    {/* Balanced glowing traveling photon dot along active conduit */}
                    {isSelected && (
                      <circle
                        cx={nodeX * 0.5 + svgCenter * 0.5}
                        cy={nodeY * 0.5 + svgCenter * 0.5}
                        r="3.5"
                        fill="#FFFFFF"
                        filter="url(#soft-conduit-glow)"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* 7 RADIAL SATELLITE NODES ON THE ROTOR (Exact matching polar coordinates) */}
            {ECOSYSTEM_NODES.map((node, idx) => {
              const isSelected = activeNode.id === node.id;
              const NodeIcon = node.icon;
              const rad = (idx * angleStep * Math.PI) / 180;
              // Precise percentage coordinates centered at 50%
              const nodeXPct = 50 + pctRadius * Math.cos(rad);
              const nodeYPct = 50 + pctRadius * Math.sin(rad);

              return (
                <button
                  key={node.id}
                  className={`satellite-beacon-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => rotateToNode(idx)}
                  style={
                    {
                      left: `${nodeXPct}%`,
                      top: `${nodeYPct}%`,
                      transform: `translate(-50%, -50%) rotate(${-wheelRotation}deg)`,
                      transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
                      '--node-color': node.color,
                    } as React.CSSProperties
                  }
                  title={`Click to rotate to ${node.label}`}
                  aria-label={`Select ${node.label}`}
                >
                  {/* Clean Node Orb */}
                  <div className="satellite-orb">
                    <NodeIcon
                      size={18}
                      color={isSelected ? '#FFFFFF' : node.color}
                    />
                    {/* Small status pip */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '3px',
                        right: '3px',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: node.color,
                      }}
                    />
                  </div>

                  {/* Satellite Label */}
                  <div className="satellite-label-pill">
                    <span>{node.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* =====================================================================
              CENTRAL AI INTELLIGENCE CORE NUCLEUS (Stationary Hub at 50%, 50%)
              ===================================================================== */}
          <div
            onClick={handleNext}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '106px',
              height: '106px',
              borderRadius: '50%',
              background: 'rgba(12, 17, 30, 0.95)',
              border: `1.5px solid ${activeNode.color}60`,
              boxShadow: `0 0 20px ${activeNode.color}35, 0 8px 24px rgba(0, 0, 0, 0.55)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 30,
              cursor: 'pointer',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            title="Click center to rotate to next synapse"
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${activeNode.color}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '4px',
              }}
            >
              <Cpu size={16} color={activeNode.color} />
            </div>

            <span
              style={{
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: '#FFFFFF',
                fontFamily: 'var(--font-display)',
                textTransform: 'uppercase',
              }}
            >
              Career Core
            </span>

            <span
              style={{
                fontSize: '0.5625rem',
                color: activeNode.color,
                fontWeight: 600,
                letterSpacing: '0.04em',
                marginTop: '1px',
              }}
            >
              {activeNode.label.toUpperCase()}
            </span>
          </div>

        </div>

      </div>

      {/* Global Bottom Transition Anchor to Section 3 */}
      <div
        style={{
          marginTop: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(255, 255, 255, 0.025)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',

        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="brand-glyph" style={{ width: '32px', height: '32px' }}>
            <Layers size={16} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Ready to see your real-time skills benchmarked?
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Proceeding along the career journey spline to Chapter 03: Career Intelligence
            </div>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="btn-primary"
          style={{ fontSize: '0.8125rem', padding: '8px 18px' }}
        >
          <span>Continue Journey</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
};
