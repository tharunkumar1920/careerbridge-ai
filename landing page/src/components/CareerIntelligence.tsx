import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Zap,
  Map,
  Briefcase,
  User,
  Settings,
  MoreHorizontal,
  CheckCircle2,
  Database,
  Code,
  Folder,
  Users,
  ChevronDown,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

interface CareerIntelligenceProps {
  onContinue: () => void;
}

export const CareerIntelligence: React.FC<CareerIntelligenceProps> = ({ onContinue }) => {
  const [activeNav, setActiveNav] = useState<string>('dashboard');
  const [readinessScore, setReadinessScore] = useState<number>(0);

  // Animated counter for 94% readiness score
  useEffect(() => {
    let start = 0;
    const target = 94;
    const duration = 1000;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setReadinessScore(target);
        clearInterval(timer);
      } else {
        setReadinessScore(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="section-2"
      className="section-wrapper intelligence-section"
      style={{
        paddingTop: '32px',
        paddingBottom: '48px',
        maxWidth: '1240px',
        margin: '0 auto',
      }}
    >
      {/* Chapter Indicator & Title */}
      <div className="chapter-badge">Student Intelligence</div>

      <div style={{ maxWidth: '820px', marginBottom: '28px' }}>
        <h2
          style={{
            fontSize: 'clamp(2rem, 3.8vw, 3rem)',
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '10px',
            color: 'var(--text-primary)',
          }}
        >
          Your Career Intelligence
        </h2>
        <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Track competencies, sprint roadmaps, and recruiter match scores in real time.
        </p>
      </div>

      {/* ========================================================
          MAIN STUDENT DASHBOARD (LUMINOUS BLUE COVE)
          ======================================================== */}
      <div style={{ position: 'relative' }}>
        {/* Glowing Blue Ambient Cove Backlight */}
        <div className="dashboard-ambient-cove" aria-hidden="true" />

        <div className="student-dashboard-frame">
          {/* 1. LEFT SIDEBAR NAVIGATION */}
          <aside className="student-dashboard-sidebar">
            {/* Brand Logo */}
            <div className="student-sidebar-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="/skill-link-icon.png" alt="Skill Link" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
              <span style={{ fontWeight: 700, letterSpacing: '0.02em' }}>SKILL LINK</span>
            </div>

            {/* Nav Menu */}
            <nav className="student-sidebar-nav">
              <button
               
                className={`student-sidebar-item ${activeNav === 'dashboard' ? 'active' : ''}`}
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </button>

              <button
                
                className={`student-sidebar-item ${activeNav === 'skills' ? 'active' : ''}`}
              >
                <Zap size={16} />
                <span>Skills</span>
              </button>

              <button
                
                className={`student-sidebar-item ${activeNav === 'roadmap' ? 'active' : ''}`}
              >
                <Map size={16} />
                <span>Roadmap</span>
              </button>

              <button
                
                className={`student-sidebar-item ${activeNav === 'opportunities' ? 'active' : ''}`}
              >
                <Briefcase size={16} />
                <span>Opportunities</span>
              </button>

              <button
                
                className={`student-sidebar-item ${activeNav === 'profile' ? 'active' : ''}`}
              >
                <User size={16} />
                <span>Profile</span>
              </button>

              <button
                
                className={`student-sidebar-item ${activeNav === 'settings' ? 'active' : ''}`}
              >
                <Settings size={16} />
                <span>Settings</span>
              </button>
            </nav>
          </aside>

          {/* 2. MAIN DASHBOARD CONTENT */}
          <main className="student-dashboard-body">
            {/* Dashboard Header Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Student Dashboard</span>
                <span style={{ color: 'rgba(56, 189, 248, 0.35)', fontWeight: 300 }}>|</span>
                <span style={{ fontSize: '1.0625rem', color: '#94A3B8', fontWeight: 400 }}>Welcome, Alex Chen</span>
              </h3>
            </div>

            {/* Top 2 Cards (Readiness Donut + Skill Gap Matrix) */}
            <div className="student-dashboard-grid">
              {/* CARD 1: Career Readiness Score */}
              <div className="student-card" style={{ justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#FFFFFF' }}>Career Readiness Score</span>
                  <MoreHorizontal size={16} style={{ color: '#64748B', cursor: 'pointer' }} />
                </div>

                {/* Circular Donut Gauge (94%) with Blue/Cyan Gradient */}
                <div style={{ position: 'relative', width: '148px', height: '148px', margin: '14px 0' }}>
                  <svg width="148" height="148" viewBox="0 0 148 148">
                    <defs>
                      <linearGradient id="donutCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#818CF8" />
                      </linearGradient>
                    </defs>
                    {/* Background Ring */}
                    <circle
                      cx="74"
                      cy="74"
                      r="60"
                      fill="none"
                      stroke="rgba(56, 189, 248, 0.12)"
                      strokeWidth="11"
                    />
                    {/* Filled Progress Arc */}
                    <circle
                      cx="74"
                      cy="74"
                      r="60"
                      fill="none"
                      stroke="url(#donutCyanGrad)"
                      strokeWidth="11"
                      strokeDasharray={`${(readinessScore / 100) * 377} 377`}
                      strokeLinecap="round"
                      transform="rotate(-90 74 74)"
                      style={{ transition: 'stroke-dasharray 0.8s ease' }}
                    />
                  </svg>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.25rem',
                      fontWeight: 700,
                      color: '#38BDF8',
                      textShadow: '0 0 20px rgba(56, 189, 248, 0.5)',
                      fontFamily: 'var(--font-display)',
                    }}
                    className="tabular-nums"
                  >
                    {readinessScore}%
                  </div>
                </div>

                <div style={{ fontSize: '0.78125rem', color: '#94A3B8' }}>
                  Target: 98%. You're in the top 5%
                </div>
              </div>

              {/* CARD 2: Skill Gap Differential Matrix */}
              <div className="student-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#FFFFFF' }}>Skill Gap Differential Matrix</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Skill 1: Python */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78125rem', marginBottom: '5px' }}>
                      <span style={{ color: '#E2E8F0', fontWeight: 500 }}>Python</span>
                      <span style={{ color: '#94A3B8' }} className="tabular-nums">85% / Benchmark: 90%</span>
                    </div>
                    <div style={{ height: '5px', width: '100%', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', position: 'relative' }}>
                      <div style={{ height: '100%', width: '85%', background: 'linear-gradient(90deg, #38BDF8, #818CF8)', borderRadius: '3px' }} />
                      <div style={{ position: 'absolute', left: '90%', top: '-2px', width: '2px', height: '9px', background: 'rgba(255, 255, 255, 0.4)' }} />
                    </div>
                  </div>

                  {/* Skill 2: Data Analysis */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78125rem', marginBottom: '5px' }}>
                      <span style={{ color: '#E2E8F0', fontWeight: 500 }}>Data Analysis</span>
                      <span style={{ color: '#94A3B8' }} className="tabular-nums">90% / Benchmark: 90%</span>
                    </div>
                    <div style={{ height: '5px', width: '100%', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', position: 'relative' }}>
                      <div style={{ height: '100%', width: '90%', background: 'linear-gradient(90deg, #38BDF8, #818CF8)', borderRadius: '3px' }} />
                      <div style={{ position: 'absolute', left: '90%', top: '-2px', width: '2px', height: '9px', background: 'rgba(255, 255, 255, 0.4)' }} />
                    </div>
                  </div>

                  {/* Skill 3: SQL */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78125rem', marginBottom: '5px' }}>
                      <span style={{ color: '#E2E8F0', fontWeight: 500 }}>SQL</span>
                      <span style={{ color: '#94A3B8' }} className="tabular-nums">80% / Benchmark: 90%</span>
                    </div>
                    <div style={{ height: '5px', width: '100%', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', position: 'relative' }}>
                      <div style={{ height: '100%', width: '80%', background: 'linear-gradient(90deg, #38BDF8, #818CF8)', borderRadius: '3px' }} />
                      <div style={{ position: 'absolute', left: '90%', top: '-2px', width: '2px', height: '9px', background: 'rgba(255, 255, 255, 0.4)' }} />
                    </div>
                  </div>

                  {/* Skill 4: Communication */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78125rem', marginBottom: '5px' }}>
                      <span style={{ color: '#E2E8F0', fontWeight: 500 }}>Communication</span>
                      <span style={{ color: '#94A3B8' }} className="tabular-nums">50% / Benchmark: 90%</span>
                    </div>
                    <div style={{ height: '5px', width: '100%', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', position: 'relative' }}>
                      <div style={{ height: '100%', width: '50%', background: '#FFFFFF', borderRadius: '3px' }} />
                      <div style={{ position: 'absolute', left: '90%', top: '-2px', width: '2px', height: '9px', background: 'rgba(255, 255, 255, 0.4)' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 2 Cards (8-Week Roadmap Sprints + Recruiter Matching) */}
            <div className="student-dashboard-grid">
              {/* CARD 3: 8-Week Dynamic Roadmap Sprints */}
              <div className="student-card" style={{ justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '12px' }}>
                  8-Week Dynamic Roadmap Sprints
                </span>

                {/* Milestone Timeline Graph */}
                <div style={{ position: 'relative', padding: '24px 8px 16px', margin: 'auto 0' }}>
                  {/* Top Milestones */}
                  <div style={{ position: 'relative', height: '42px', marginBottom: '8px' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: '42%',
                        top: 0,
                        transform: 'translateX(-50%)',
                        fontSize: '0.6875rem',
                        color: '#E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <CheckCircle2 size={11} style={{ color: '#FFFFFF' }} />
                      <span>Week 3: Advanced SQL Certification</span>
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        left: '84%',
                        top: 0,
                        transform: 'translateX(-50%)',
                        fontSize: '0.6875rem',
                        color: '#94A3B8',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Users size={11} />
                      <span>Week 5: Mock Interview Session</span>
                    </div>
                  </div>

                  {/* Horizontal Spline Line */}
                  <div style={{ position: 'relative', height: '2px', background: 'rgba(255, 255, 255, 0.2)', margin: '14px 0' }}>
                    {/* Node points along line */}
                    <div style={{ position: 'absolute', left: '10%', top: '-4px', width: '10px', height: '10px', borderRadius: '50%', background: '#FFFFFF' }} />
                    <div style={{ position: 'absolute', left: '26%', top: '-18px', width: '22px', height: '22px', borderRadius: '50%', background: '#1E293B', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Database size={11} style={{ color: '#94A3B8' }} />
                    </div>
                    <div style={{ position: 'absolute', left: '42%', top: '-18px', width: '22px', height: '22px', borderRadius: '50%', background: '#1E293B', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Code size={11} style={{ color: '#94A3B8' }} />
                    </div>
                    <div style={{ position: 'absolute', left: '60%', top: '-18px', width: '22px', height: '22px', borderRadius: '50%', background: '#1E293B', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Folder size={11} style={{ color: '#94A3B8' }} />
                    </div>
                    <div style={{ position: 'absolute', left: '78%', top: '-4px', width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.4)' }} />
                  </div>

                  {/* Bottom Milestones */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', marginTop: '14px' }}>
                    <div style={{ maxWidth: '110px', color: '#94A3B8', lineHeight: 1.3 }}>
                      Week 3: Advanced SQL Certification <span style={{ color: '#64748B' }}>(Completed)</span>
                    </div>
                    <div style={{ maxWidth: '120px', color: '#E2E8F0', lineHeight: 1.3, textAlign: 'center' }}>
                      <span style={{ color: '#FFFFFF' }}>●</span> Week 4: Project Portfolio Polish <span style={{ color: '#94A3B8' }}>(In Progress)</span>
                    </div>
                    <div style={{ maxWidth: '100px', color: '#94A3B8', lineHeight: 1.3, textAlign: 'right' }}>
                      Week 5: Mock Interview Session
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 4: Recruiter Opportunity Matching */}
              <div className="student-card" style={{ justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '12px' }}>
                  Recruiter Opportunity Matching
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Job 1: Data Analyst @ TechCorp */}
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.025)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {/* Black Logo Box with White Cube Logo */}
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          background: '#090D16',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                        }}
                      >
                        <Database size={16} />
                      </div>

                      <div>
                        <div style={{ fontSize: '0.84375rem', fontWeight: 600, color: '#FFFFFF' }}>
                          Data Analyst @ TechCorp
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '1px' }}>
                          Data Analyst • Verified Talent Score: 96
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#FFFFFF' }}>
                        98% Match
                      </span>
                      <button
                        onClick={onContinue}
                        style={{
                          background: '#FFFFFF',
                          color: '#080C14',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Job 2: ML Engineer @ AI Solutions */}
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.025)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {/* Black Logo Box with Stylized A Logo */}
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          background: '#090D16',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '0.875rem',
                        }}
                      >
                        Λ
                      </div>

                      <div>
                        <div style={{ fontSize: '0.84375rem', fontWeight: 600, color: '#FFFFFF' }}>
                          ML Engineer @ AI Solutions
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '1px' }}>
                          ML Engineer • Verified Talent Score: 93
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#FFFFFF' }}>
                        91% Match
                      </span>
                      <button
                        onClick={onContinue}
                        style={{
                          background: '#FFFFFF',
                          color: '#080C14',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Bottom Chevron */}
                  <div style={{ textAlign: 'center', color: '#64748B', cursor: 'pointer', paddingTop: '2px' }}>
                    <ChevronDown size={14} />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Floating Pill Badge: 8-Week Sprints Active (From reference image) */}
        <div
          style={{
            position: 'absolute',
            bottom: '-14px',
            right: '24px',
            background: '#0F172A',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '999px',
            padding: '4px 14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#FFFFFF',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.6)',
          }}
        >
          <TrendingUp size={12} style={{ color: '#38BDF8' }} />
          <span>8-Week Sprints Active</span>
        </div>
      </div>

      {/* ========================================================
          BOTTOM 4 METRIC STAT BOXES (EXACTLY AS IN PHOTO)
          ======================================================== */}
      <div className="bottom-stats-row">
        <div className="bottom-stat-box">
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
            94%
          </div>
          <div style={{ fontSize: '0.84375rem', color: '#94A3B8' }}>
            Match Accuracy
          </div>
        </div>

        <div className="bottom-stat-box">
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
            3.2x
          </div>
          <div style={{ fontSize: '0.84375rem', color: '#94A3B8' }}>
            Faster Progress
          </div>
        </div>

        <div className="bottom-stat-box">
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
            100%
          </div>
          <div style={{ fontSize: '0.84375rem', color: '#94A3B8' }}>
            Verified Skills
          </div>
        </div>

        <div className="bottom-stat-box">
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
            Real-time
          </div>
          <div style={{ fontSize: '0.84375rem', color: '#94A3B8' }}>
            Recruiter Sync
          </div>
        </div>
      </div>

      {/* Optional Transition Button to Chapter 04 */}
      <div style={{ marginTop: '36px', textAlign: 'center' }}>
        <button
          onClick={onContinue}
          className="btn-ghost"
          style={{ color: '#94A3B8', fontSize: '0.875rem' }}
        >
          <span>Proceed to Learning Roadmap</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
};
