import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recruiterApi } from '../../api/recruiter';

export const RecruiterDashboardPage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      recruiterApi.getProfile().catch(() => null),
      recruiterApi.getJobs().catch(() => []),
    ]).then(([p, j]) => {
      setProfile(p);
      setJobs(j);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>
        Loading recruitment telemetry...
      </div>
    );
  }

  const companyName = profile?.company_name || 'Google DeepMind';

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* 1. MINIMALIST EDITORIAL HEADER (NO BOXES, NO RAINBOW GRADIENTS) */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px' }}>
              Employer Organization • {companyName}
            </div>
            <h1 className="portal-page-title" style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
              Talent Sourcing & Pipeline
            </h1>
            <p className="portal-page-subtitle" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '6px', maxWidth: '620px', lineHeight: 1.5 }}>
              Benchmark applicant cohorts against transparent skill requirements and verifiable project repository artifacts.
            </p>
          </div>

          <div className="portal-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              to="/recruiter/jobs/new"
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
              + Post New Opportunity
            </Link>
            <Link
              to="/recruiter/candidates"
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
              Search Talent
            </Link>
          </div>
        </div>

        {/* Inline Responsive Metric Telemetry Strip */}
        <div className="portal-metrics-strip">
          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Active Postings
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              {jobs.length || 2}
            </div>
          </div>

          <div className="portal-metric-divider" />

          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Permitted Candidate Pool
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              1,840+
            </div>
          </div>

          <div className="portal-metric-divider" />

          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Active Pipeline Review
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              8 Submissions
            </div>
          </div>
        </div>
      </section>

      {/* 2. ACTIVE OPPORTUNITY POSTINGS (CLEAN DIVIDER-SEPARATED ROWS, NO BOXES) */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
              Active Opportunity Postings
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.45)', marginTop: '3px' }}>
              Listings currently live and receiving verified applications.
            </p>
          </div>
          <Link
            to="/recruiter/jobs"
            style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
          >
            Manage All Jobs →
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                padding: '16px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#FFFFFF' }}>
                    {job.title}
                  </span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {job.employment_type}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.45)', marginTop: '3px' }}>
                  {job.location} • {job.remote_type} • {job.salary_range}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Link
                  to="/recruiter/applications"
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.85)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '5px 12px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)')}
                >
                  Review Applicants
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MINIMAL DIRECT TOOLS ROW */}
      <section style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '24px' }}>
        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '12px' }}>
          Recruitment Tools
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Link
            to="/recruiter/candidates"
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
            Candidate Discovery & Rubric Search →
          </Link>

          <Link
            to="/recruiter/analytics"
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
            Platform Hiring Demand Analytics →
          </Link>

          <Link
            to="/recruiter/company"
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
            Company Organization Settings →
          </Link>
        </div>
      </section>
    </div>
  );
};
