import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { CareerNetwork } from '../components/CareerNetwork';
import { CareerIntelligence } from '../components/CareerIntelligence';
import { LearningRoadmap } from '../components/LearningRoadmap';
import { OpportunityMatcher } from '../components/OpportunityMatcher';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';
import { SideJourneyRail } from '../components/SideJourneyRail';
import { AuthModal } from '../components/AuthModal';
import { JourneyCanvas } from '../three/JourneyCanvas';

export const LandingPage: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: 'student' | 'recruiter';
    action: 'login' | 'signin';
  }>({
    isOpen: false,
    mode: 'student',
    action: 'signin',
  });

  // Calculate normalized scroll progress (0.0 to 1.0) and current section
  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;

    const currentScroll = window.scrollY;
    const progress = Math.max(0, Math.min(1, currentScroll / totalHeight));
    setScrollProgress(progress);

    // 6 Sections mapped evenly: 0: 0-0.16, 1: 0.16-0.33, 2: 0.33-0.5, 3: 0.5-0.66, 4: 0.66-0.83, 5: 0.83-1.0
    const secIndex = Math.min(5, Math.floor(progress * 6));
    setActiveSection(secIndex);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial measure
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (sectionIndex: number) => {
    const targetElement = document.getElementById(`section-${sectionIndex}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAuth = (mode: 'student' | 'recruiter', action: 'login' | 'signin' = 'signin') => {
    setAuthModal({ isOpen: true, mode, action });
  };

  return (
    <div className="page-container" style={{ position: 'relative', minHeight: '100vh', background: 'transparent' }}>
      {/* 1. MASTER 3D CONTINUOUS JOURNEY CANVAS (Fixed Background) */}
      <JourneyCanvas scrollProgress={scrollProgress} activeSection={activeSection} />

      {/* 2. Top Minimal Floating Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenAuth={handleOpenAuth}
      />

      {/* 3. Floating Side Journey Rail (01 Start -> 06 Future) */}
      <SideJourneyRail
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* 4. CHAPTER 01 — HERO ("Your Skills. Your Goals. Your Future.") */}
      <Hero
        onExplore={() => scrollToSection(1)}
        onOpenAuth={handleOpenAuth}
      />

      {/* 5. CHAPTER 02 — THE BIGGER PICTURE — CONNECTED */}
      <CareerNetwork
        onContinue={() => scrollToSection(2)}
      />

      {/* 6. CHAPTER 03 — CAREER INTELLIGENCE ("Your Career, Mapped by AI.") */}
      <CareerIntelligence
        onContinue={() => scrollToSection(3)}
      />

      {/* 7. CHAPTER 04 — LEARN, PRACTICE, GROW */}
      <LearningRoadmap
        onContinue={() => scrollToSection(4)}
      />

      {/* 8. CHAPTER 05 — OPPORTUNITY INTELLIGENCE ("Find Opportunities That Fit You.") */}
      <OpportunityMatcher
        onContinue={() => scrollToSection(5)}
        onOpenAuth={handleOpenAuth}
      />

      {/* 9. CHAPTER 06 — FINAL FUTURE MOMENT ("Bridge Your Skills. Build Your Tomorrow.") */}
      <FinalCTA
        onOpenAuth={handleOpenAuth}
      />

      {/* 10. Minimalist Clean Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenAuth={handleOpenAuth}
      />

      {/* 11. Modal Portal */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        initialAction={authModal.action}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
      />
    </div>
  );
};
