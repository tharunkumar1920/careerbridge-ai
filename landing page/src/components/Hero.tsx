import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { HERO_TAGS } from '../data/careerData';
import { useAuth } from '../context/AuthContext';

interface HeroProps {
  onExplore: () => void;
  onOpenAuth: (mode: 'student' | 'recruiter') => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenAuth }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTrack, setSelectedTrack] = useState('AI/ML Engineer');

  const careerTracks = [
    { title: 'AI/ML Engineer', demand: '+34% YoY' },
    { title: 'Generative AI Systems', demand: '+52% YoY' },
    { title: 'Data & Quantitative AI', demand: '+28% YoY' },
  ];

  return (
    <section id="section-0" className="section-wrapper hero-section" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      {/* Subtle ambient blur */}
      <div className="ambient-glow-mesh ambient-lavender" />

      <div style={{ maxWidth: '820px', zIndex: 10 }}>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            marginBottom: '24px',
            color: 'var(--text-primary)',
          }}
        >
          Your Skills. <br />
          Your Goals. <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #F5F7FF 0%, #A78BFA 50%, #38BDF8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Your Future.
          </span>
        </h1>

        {/* Hero Copy */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            lineHeight: 1.55,
            marginBottom: '36px',
            fontWeight: 400,
          }}
        >
          "CareerBridge AI connects your skills, career goals, learning journey, and real-world opportunities into one intelligent career platform."
        </p>

        {/* Interactive Career Track Preview Pill Bar */}
        <div
          className="hero-tracks-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '36px',
            background: 'rgba(255, 255, 255, 0.035)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '8px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            width: 'fit-content',
            maxWidth: '100%',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', paddingLeft: '8px' }}>
            Preview Target Path:
          </span>
          {careerTracks.map((track) => {
            const isSelected = selectedTrack === track.title;
            return (
              <button
                key={track.title}
                onClick={() => setSelectedTrack(track.title)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: isSelected ? '#fff' : 'var(--text-muted)',
                  background: isSelected ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  border: isSelected ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                }}
              >
                {track.title}
                <span style={{ marginLeft: '6px', fontSize: '0.7rem', color: isSelected ? 'var(--accent-cyan)' : 'var(--accent-mint)' }}>
                  {track.demand}
                </span>
              </button>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta-group" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              if (user) {
                navigate(user.role === 'RECRUITER' ? '/recruiter/dashboard' : '/student/dashboard');
              } else {
                onOpenAuth('student');
              }
            }}
            className="btn-primary"
            style={{ padding: '13px 28px', fontSize: '0.8rem' }}
          >
            <span>{user ? 'Enter My Workspace' : 'Build My Career'}</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => {
              if (user) {
                navigate(user.role === 'RECRUITER' ? '/recruiter/dashboard' : '/recruiter/dashboard');
              } else {
                onOpenAuth('recruiter');
              }
            }}
            className="btn-secondary"
            style={{ padding: '13px 24px', fontSize: '0.8rem' }}
          >
            <span>{user ? 'Recruiter Dashboard' : "I'm a Recruiter"}</span>
          </button>
        </div>

        {/* Floating Concept Pillars (Section 1 requirement) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '48px',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Continuous System:
          </span>
          {HERO_TAGS.map((tag, idx) => (
            <div
              key={tag}
              className="glass-panel"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: idx % 2 === 0 ? 'var(--accent-lavender)' : 'var(--accent-cyan)' }} />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Scroll Indicator at bottom */}
      <div
        onClick={onExplore}
        role="button"
        tabIndex={0}
        aria-label="Scroll to explore career journey"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          opacity: 0.8,
          transition: 'var(--transition-smooth)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
      >
        <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
          Scroll to explore
        </span>
        <ChevronDown size={18} style={{ animation: 'bounceSubtle 2s infinite ease-in-out' }} />
      </div>

      <style>{`
        @keyframes bounceSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
      `}</style>
    </section>
  );
};
