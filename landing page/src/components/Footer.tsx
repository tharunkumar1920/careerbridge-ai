import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionIndex: number) => void;
  onOpenAuth: (mode: 'student' | 'recruiter') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAuth }) => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(5, 7, 13, 0.95)',
        position: 'relative',
        zIndex: 10,
        padding: '32px 24px 20px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '24px',
          marginBottom: '24px',
        }}
      >
        {/* Left Column: Brand & Tagline */}
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <img
              src="/skill-link-icon.png"
              alt="Skill Link"
              style={{ width: '24px', height: '24px', objectFit: 'contain' }}
            />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', letterSpacing: '0.03em' }}>
              SKILL <span style={{ color: 'var(--accent-cyan)' }}>LINK</span>
            </span>
          </div>

          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', maxWidth: '300px', lineHeight: 1.45, marginBottom: '12px' }}>
            "Bridge Your Skills. Build Your Tomorrow."
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="btn-ghost" style={{ padding: '4px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter / X" className="btn-ghost" style={{ padding: '4px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733-16z" />
                <path d="M4 20l6.768-6.768m2.464-2.464L20 4" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="btn-ghost" style={{ padding: '4px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 1: For Students */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-primary)', marginBottom: '8px' }}>
            For Students
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>
              <Link to="/student/career-guidance" className="btn-ghost" style={{ padding: 0, fontSize: '0.8125rem' }}>
                Career Guidance
              </Link>
            </li>
            <li>
              <Link to="/student/roadmap" className="btn-ghost" style={{ padding: 0, fontSize: '0.8125rem' }}>
                Progression Map
              </Link>
            </li>
            <li>
              <Link to="/opportunities" className="btn-ghost" style={{ padding: 0, fontSize: '0.8125rem' }}>
                Explore Opportunities
              </Link>
            </li>
            <li>
              <Link to="/student/interview" className="btn-ghost" style={{ padding: 0, fontSize: '0.8125rem' }}>
                AI Mock Interview
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: For Recruiters */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-primary)', marginBottom: '8px' }}>
            For Recruiters
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>
              <Link to="/recruiter/dashboard" className="btn-ghost" style={{ padding: 0, fontSize: '0.8125rem' }}>
                Recruiter Portal
              </Link>
            </li>
            <li>
              <Link to="/recruiter/jobs/new" className="btn-ghost" style={{ padding: 0, fontSize: '0.8125rem' }}>
                + Post Job / Intern
              </Link>
            </li>
            <li>
              <Link to="/recruiter/candidates" className="btn-ghost" style={{ padding: 0, fontSize: '0.8125rem' }}>
                Verified Candidate Search
              </Link>
            </li>
            <li>
              <Link to="/recruiter/analytics" className="btn-ghost" style={{ padding: 0, fontSize: '0.8125rem' }}>
                Market Trends
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Platform & Legal */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Platform
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>
              <Link to="/about" className="btn-ghost" style={{ padding: 0, fontSize: '0.8125rem' }}>
                About Mission
              </Link>
            </li>
            <li>
              <Link to="/features" className="btn-ghost" style={{ padding: 0, fontSize: '0.8125rem' }}>
                Platform Features
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="btn-ghost" style={{ padding: 0, fontSize: '0.8125rem' }}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="btn-ghost" style={{ padding: 0, fontSize: '0.8125rem' }}>
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
        }}
      >
        <div>
          © {new Date().getFullYear()} Skill Link Inc. All rights reserved.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span>Stanford • MIT • Berkeley • CMU Verified Partner</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-mint)' }} />
          <span style={{ color: 'var(--accent-mint)' }}>All Systems Operational</span>
        </div>
      </div>
    </footer>
  );
};
