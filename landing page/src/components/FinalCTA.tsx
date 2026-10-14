import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinalCTAProps {
  onOpenAuth: (mode: 'student' | 'recruiter') => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenAuth }) => {
  const [emailInput, setEmailInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubmitted(true);
    try {
      confetti({
        particleCount: 60,
        spread: 55,
        origin: { y: 0.8 },
        colors: ['#A78BFA', '#38BDF8', '#34D399'],
      });
    } catch {
      // quiet fallback
    }
  };

  const horizonLabels = ['Skills', 'Experience', 'Opportunities', 'Career'];

  return (
    <section id="section-5" className="section-wrapper final-cta-section" style={{ textAlign: 'center', minHeight: '90vh' }}>
      <div className="chapter-badge" style={{ justifyContent: 'center' }}>
         The Horizon
      </div>

      <div style={{ maxWidth: '820px', margin: '0 auto', zIndex: 10 }}>
        {/* Visual Horizon Labels from Section 18 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
            flexWrap: 'wrap',
          }}
        >
          {horizonLabels.map((lbl) => (
            <div
              key={lbl}
              className="glass-panel"
              style={{
                padding: '4px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {lbl}
            </div>
          ))}
        </div>

        {/* Section 17 Headline */}
        <h2
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: '-0.035em',
            marginBottom: '20px',
            color: 'var(--text-primary)',
          }}
        >
          More Than a Platform. <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #F5F7FF 0%, #A78BFA 60%, #38BDF8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            It's Your Career Partner.
          </span>
        </h2>

        {/* Subheading */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            margin: '0 auto 36px auto',
            lineHeight: 1.6,
          }}
        >
         " CareerBridge AI isn't just about finding jobs. It's about building the future you want — with the right guidance, at the right time."
        </p>

        {/* Section 19 Core Ending Statement */}
        <div
          className="glass-panel"
          style={{
            marginBottom: '36px',
            padding: '28px',
            maxWidth: '560px',
            margin: '0 auto 36px auto',
          }}
        >
          <div style={{ fontSize: '0.8125rem', color: 'var(--accent-cyan)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
            The Promise
          </div>
          <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)' }}>
            "Bridge Your Skills. Build Your Tomorrow."
          </div>
        </div>

        {/* Action Controls */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              maxWidth: '480px',
              margin: '0 auto 28px auto',
              flexWrap: 'wrap',
            }}
          >
            <input
              type="email"
              required
              placeholder="Enter your student email (@edu or university)"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              style={{
                flex: '1',
                minWidth: '260px',
                padding: '12px 18px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                color: 'var(--text-primary)',
                fontSize: '0.9375rem',
                outline: 'none',
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '12px 24px' }}>
              <span>Start Your Journey</span>
              <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <div
            className="glass-panel"
            style={{
              padding: '18px 24px',
              maxWidth: '460px',
              margin: '0 auto 28px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              color: 'var(--accent-mint)',
            }}
          >
            <CheckCircle2 size={18} />
            <span style={{ fontSize: '0.9375rem', fontWeight: 500 }}>
              Welcome to CareerBridge AI. Check your student inbox for your personalized assessment link!
            </span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <button
            onClick={() => onOpenAuth('recruiter')}
            className="btn-secondary"
            style={{ fontSize: '0.875rem', padding: '10px 20px' }}
          >
            <ShieldCheck size={14} style={{ color: 'var(--accent-lavender)' }} />
            <span>I'm a Recruiter</span>
          </button>
        </div>
      </div>
    </section>
  );
};
