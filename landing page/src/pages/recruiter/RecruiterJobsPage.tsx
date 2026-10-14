import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, PlusCircle, CheckCircle2, XCircle, Users, RefreshCw } from 'lucide-react';
import { recruiterApi } from '../../api/recruiter';
import { useToast } from '../../context/ToastContext';

export const RecruiterJobsPage: React.FC = () => {
  const { success, error } = useToast();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    try {
      const data = await recruiterApi.getJobs();
      setJobs(data);
    } catch (err: any) {
      error(err.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleToggleStatus = async (job: any) => {
    try {
      await recruiterApi.updateJob(job.id, { is_active: !job.is_active });
      success(`Job ${job.is_active ? 'closed' : 'reopened'} successfully`);
      loadJobs();
    } catch (err: any) {
      error(err.message || 'Error updating status');
    }
  };

  if (loading && jobs.length === 0) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>
        Loading listings telemetry...
      </div>
    );
  }

  const activeJobs = jobs.filter((j) => j.is_active).length;
  const totalApplicants = jobs.reduce((acc, j) => acc + (j.applicant_count || 0), 0);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* 1. MINIMALIST EDITORIAL HEADER */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px' }}>
              Employer Operations • Position Governance
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
              Job & Internship Listings
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '6px', maxWidth: '640px', lineHeight: 1.5 }}>
              Manage published opportunities, inspect applicant cohorts, and toggle open roles across our verified university network.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
              + Post Opportunity
            </Link>
            <button
              onClick={loadJobs}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: '5px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
              title="Refresh positions"
            >
              <RefreshCw size={13} />
            </button>
          </div>
        </div>

        {/* Inline Monochromatic Metric Telemetry Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '32px',
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Active Listings
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#34D399', marginTop: '2px' }}>
              {activeJobs} <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.4)' }}>/ {jobs.length}</span>
            </div>
          </div>

          <div style={{ width: '1px', height: '28px', background: 'rgba(255, 255, 255, 0.08)' }} />

          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Total Applicants
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              {totalApplicants} <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.4)' }}>Profiles</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. JOBS LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {jobs.map((job) => (
          <div
            key={job.id}
            style={{
              background: 'rgba(255, 255, 255, 0.015)',
              border: job.is_active ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 255, 255, 0.04)',
              borderRadius: '14px',
              padding: '24px 28px',
              opacity: job.is_active ? 1 : 0.7,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                    {job.title}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: job.is_active ? 'rgba(52, 211, 153, 0.12)' : 'rgba(255, 255, 255, 0.06)',
                      color: job.is_active ? '#34D399' : 'rgba(255, 255, 255, 0.5)',
                      border: job.is_active ? '1px solid rgba(52, 211, 153, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {job.is_active ? '● Active Listing' : 'Closed'}
                  </span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 500,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(56, 189, 248, 0.1)',
                      color: '#38BDF8',
                      border: '1px solid rgba(56, 189, 248, 0.2)',
                    }}
                  >
                    {job.employment_type}
                  </span>
                </div>

                <div style={{ fontSize: '0.825rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '6px' }}>
                  {job.company} • {job.location} • {job.salary_range}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                  {(job.required_skills || []).map((s: string) => (
                    <span
                      key={s}
                      style={{
                        fontSize: '0.72rem',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: 'rgba(255, 255, 255, 0.85)',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Link
                  to="/recruiter/applications"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  <Users size={13} />
                  <span>Applications ({job.applicant_count || 14})</span>
                </Link>

                <button
                  onClick={() => handleToggleStatus(job)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '4px',
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: job.is_active ? 'rgba(255, 255, 255, 0.65)' : '#34D399',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                  }}
                >
                  {job.is_active ? 'Close Listing' : 'Reactivate'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
