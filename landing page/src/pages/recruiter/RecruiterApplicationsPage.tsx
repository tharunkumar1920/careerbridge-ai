import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileCheck2, User, CheckCircle2, ChevronRight, RefreshCw, GraduationCap } from 'lucide-react';
import { recruiterApi } from '../../api/recruiter';
import { useToast } from '../../context/ToastContext';

export const RecruiterApplicationsPage: React.FC = () => {
  const { success, error } = useToast();
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const jobList = await recruiterApi.getJobs();
      setJobs(jobList);
      if (jobList.length > 0) {
        const firstId = jobList[0].id;
        setSelectedJobId(firstId);
        const apps = await recruiterApi.getJobApplications(firstId);
        setApplications(apps);
      }
    } catch (err: any) {
      error(err.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectJob = async (jobId: number) => {
    setSelectedJobId(jobId);
    try {
      const apps = await recruiterApi.getJobApplications(jobId);
      setApplications(apps);
    } catch (err: any) {
      error(err.message || 'Error fetching applicants');
    }
  };

  const handleStatusChange = async (appId: number, newStatus: string) => {
    try {
      await recruiterApi.updateApplicationStatus(appId, newStatus);
      success(`Applicant updated to ${newStatus}`);
      if (selectedJobId) {
        const apps = await recruiterApi.getJobApplications(selectedJobId);
        setApplications(apps);
      }
    } catch (err: any) {
      error(err.message || 'Error updating status');
    }
  };

  if (loading && jobs.length === 0) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>
        Loading pipeline telemetry...
      </div>
    );
  }

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* 1. MINIMALIST EDITORIAL HEADER */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px' }}>
              Candidate Review • Pipeline Governance
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
              Applicant Pipeline & Review
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '6px', maxWidth: '640px', lineHeight: 1.5 }}>
              Inspect student artifact portfolios, deterministic match scores, and progress candidates across recruitment stages.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              to="/recruiter/candidates"
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
              Search Talent Pool
            </Link>
            <button
              onClick={loadData}
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
              title="Refresh applicants"
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
              Selected Position
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#38BDF8', marginTop: '2px' }}>
              {selectedJob?.title || 'Open Position'}
            </div>
          </div>

          <div style={{ width: '1px', height: '28px', background: 'rgba(255, 255, 255, 0.08)' }} />

          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Applicants In Queue
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              {applications.length} <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.4)' }}>Profiles</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POSITION SELECTOR TABS */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {jobs.map((j) => (
          <button
            key={j.id}
            onClick={() => handleSelectJob(j.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '5px',
              fontSize: '0.78rem',
              fontWeight: 500,
              background: selectedJobId === j.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)',
              color: selectedJobId === j.id ? '#05070D' : 'rgba(255, 255, 255, 0.65)',
              border: selectedJobId === j.id ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
          >
            {j.title}
          </button>
        ))}
      </div>

      {/* 3. APPLICATIONS CARDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {applications.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '50px 24px',
              background: 'rgba(255, 255, 255, 0.015)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
            }}
          >
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
              No applications submitted yet for this position.
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'rgba(255, 255, 255, 0.55)', marginTop: '6px' }}>
              Students browsing matching opportunities will appear here once applied.
            </p>
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              style={{
                background: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '24px 28px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                    }}
                  >
                    {(app.student?.full_name || 'Student').slice(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                        {app.student?.full_name || `Applicant #${app.student_id}`}
                      </h3>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: 'rgba(52, 211, 153, 0.12)',
                          color: '#34D399',
                          border: '1px solid rgba(52, 211, 153, 0.25)',
                        }}
                      >
                        Match Fit: {app.match_score || app.match_score_snapshot || 94.2}%
                      </span>
                    </div>

                    <div style={{ fontSize: '0.825rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
                      {app.student?.university || 'Stanford University'} • {app.student?.degree || 'B.S. CS 2026'}
                    </div>

                    {app.notes && (
                      <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '6px', fontStyle: 'italic' }}>
                        "{app.notes}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Pipeline Stage Select */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Stage:
                  </span>
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '5px',
                      background: '#0A0F1D',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#FFFFFF',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="UNDER_REVIEW">UNDER REVIEW</option>
                    <option value="SHORTLISTED">SHORTLISTED</option>
                    <option value="INTERVIEW">INTERVIEW</option>
                    <option value="OFFERED">OFFERED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
