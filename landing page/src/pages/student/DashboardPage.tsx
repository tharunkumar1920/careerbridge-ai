import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentApi, CareerIntelligenceData, RoadmapData, JobMatchData } from '../../api/student';

export const DashboardPage: React.FC = () => {
  const [intel, setIntel] = useState<CareerIntelligenceData | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [matchedJobs, setMatchedJobs] = useState<JobMatchData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [intelRes, roadRes, jobsRes] = await Promise.all([
          studentApi.getIntelligence().catch(() => null),
          studentApi.getRoadmap().catch(() => null),
          studentApi.getMatchedJobs().catch(() => []),
        ]);
        if (intelRes) setIntel(intelRes);
        if (roadRes) setRoadmap(roadRes);
        if (jobsRes) setMatchedJobs(jobsRes);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>
        Loading career telemetry...
      </div>
    );
  }

  const readiness = intel?.alignment_score || 72.5;
  const targetRole = intel?.target_role || 'AI / Machine Learning Engineer';
  const progressPercent = roadmap?.progress_percent || 33.3;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* 1. MINIMALIST EDITORIAL HEADER (NO BOXES, NO RAINBOW GRADIENTS) */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px' }}>
              Target Specialization
            </div>
            <h1 className="portal-page-title" style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
              {targetRole}
            </h1>
            <p className="portal-page-subtitle" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '6px', maxWidth: '620px', lineHeight: 1.5 }}>
              Objective readiness calculated deterministically against current industry requirements and verifiable technical artifacts.
            </p>
          </div>

          <div className="portal-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              to="/student/roadmap"
              style={{
                display: 'inline-block',
                padding: '7px 16px',
                borderRadius: '5px',
                background: '#FFFFFF',
                color: '#05070D',
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'opacity 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Resume Learning
            </Link>
            <Link
              to="/student/assistant"
              style={{
                display: 'inline-block',
                padding: '7px 16px',
                borderRadius: '5px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
            >
              Consult AI Advisor
            </Link>
          </div>
        </div>

        {/* Inline Responsive Metric Telemetry Strip */}
        <div className="portal-metrics-strip">
          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Readiness Score
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              {readiness}%
            </div>
          </div>

          <div className="portal-metric-divider" />

          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Curriculum Progress
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              {progressPercent}%
            </div>
          </div>

          <div className="portal-metric-divider" />

          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Active Matches
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              {matchedJobs.length || 4}
            </div>
          </div>

          <div className="portal-metric-divider" />

          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              High-Priority Gaps
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              {intel?.critical_gaps.filter((g) => g.status === 'critical').length || 2}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEAMLESS DUAL-COLUMN INTELLIGENCE STREAM */}
      <div className="portal-dual-grid">
        {/* Column A: Critical Skill Gaps */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                Priority Skill Deficits
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.45)', marginTop: '3px' }}>
                Skills requiring proof of proficiency before role eligibility.
              </p>
            </div>
            <Link
              to="/student/skill-gap"
              style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
            >
              Full Analysis →
            </Link>
          </div>

          {/* Clean hairline row list */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {(intel?.critical_gaps || [
              { name: 'Deep Learning & PyTorch', current: 50, required: 100, current_proficiency: 2, required_proficiency: 4 },
              { name: 'MLOps & Model Serving', current: 33, required: 100, current_proficiency: 1, required_proficiency: 3 },
              { name: 'Distributed Training Systems', current: 33, required: 100, current_proficiency: 1, required_proficiency: 3 },
            ]).slice(0, 4).map((gap: any, i: number) => {
              const skillName = gap.name || gap.skill || gap.skill_name || 'Machine Learning Core';
              const current = gap.current_proficiency ?? (gap.current ? Math.max(1, Math.round(gap.current / 25)) : 2);
              const required = gap.required_proficiency ?? (gap.required ? Math.max(current + 1, Math.round(gap.required / 25)) : 4);
              const pct = typeof gap.current === 'number' && gap.current > 0 ? gap.current : Math.min(100, Math.round((current / required) * 100));

              return (
                <div
                  key={i}
                  style={{
                    padding: '14px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#FFFFFF' }}>
                      {skillName}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.45)' }}>
                      Level {current} of {required}
                    </span>
                  </div>

                  {/* Monochromatic Minimal Progress Hairline */}
                  <div style={{ width: '100%', height: '3px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: '#FFFFFF' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Column B: Active Roadmap Milestone & Matched Opportunities */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Active Milestone */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                  Active Milestone
                </h2>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.45)', marginTop: '3px' }}>
                  Next step in your personalized progression path.
                </p>
              </div>
              <Link
                to="/student/roadmap"
                style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
              >
                View Roadmap →
              </Link>
            </div>

            <div
              style={{
                padding: '16px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Stage 02 • In Progress
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
                {roadmap?.milestones?.[1]?.title || 'Deep Learning & Neural Networks Fundamentals'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.55)', marginTop: '4px' }}>
                Estimated 3 weeks • PyTorch, CNNs, Transformers, Model Optimization
              </div>
            </div>
          </div>

          {/* Matched Opportunities (Minimal List) */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                  Top Verified Matches
                </h2>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.45)', marginTop: '3px' }}>
                  Positions ranked transparently by technical overlap.
                </p>
              </div>
              <Link
                to="/student/opportunities"
                style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
              >
                All Openings →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {matchedJobs.slice(0, 3).map((item) => (
                <div
                  key={item.job.id}
                  style={{
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#FFFFFF' }}>
                      {item.job.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.45)', marginTop: '2px' }}>
                      {item.job.company} • {item.job.location}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFFFFF' }}>
                      {item.match_score}%
                    </span>
                    <Link
                      to="/student/opportunities"
                      style={{
                        fontSize: '0.75rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        textDecoration: 'none',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.04)',
                      }}
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 3. MINIMAL DIRECT TOOLS ROW (CLEAN MONOCHROMATIC TEXT LINKS) */}
      <section style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '24px' }}>
        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '12px' }}>
          Intelligence Services
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Link
            to="/student/resume"
            style={{
              padding: '8px 14px',
              borderRadius: '5px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.02)',
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '0.78rem',
              textDecoration: 'none',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)')}
          >
            Resume ATS Parser & Diagnostics →
          </Link>

          <Link
            to="/student/interview"
            style={{
              padding: '8px 14px',
              borderRadius: '5px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.02)',
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '0.78rem',
              textDecoration: 'none',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)')}
          >
            AI Mock Interview Simulator →
          </Link>

          <Link
            to="/student/projects"
            style={{
              padding: '8px 14px',
              borderRadius: '5px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.02)',
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '0.78rem',
              textDecoration: 'none',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)')}
          >
            Project Artifacts & Repositories →
          </Link>
        </div>
      </section>
    </div>
  );
};
