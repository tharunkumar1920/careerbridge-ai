import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Clock, CheckCircle2, XCircle, AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { studentApi, ApplicationData } from '../../api/student';
import { useToast } from '../../context/ToastContext';

export const ApplicationsPage: React.FC = () => {
  const { success, error } = useToast();
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);

  const loadApplications = async () => {
    try {
      const data = await studentApi.getApplications();
      setApplications(data);
    } catch (err: any) {
      error(err.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleWithdraw = async (id: number) => {
    if (!window.confirm('Are you sure you want to withdraw this application?')) return;
    try {
      await studentApi.withdrawApplication(id);
      success('Application withdrawn successfully');
      loadApplications();
    } catch (err: any) {
      error(err.message || 'Failed to withdraw application');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SHORTLISTED':
      case 'OFFERED':
        return (
          <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', background: 'rgba(52, 211, 153, 0.12)', color: '#34D399', border: '1px solid rgba(52, 211, 153, 0.25)' }}>
            ✓ {status}
          </span>
        );
      case 'UNDER_REVIEW':
      case 'INTERVIEW':
        return (
          <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', background: 'rgba(56, 189, 248, 0.12)', color: '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
            ● {status}
          </span>
        );
      case 'SUBMITTED':
        return (
          <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', background: 'rgba(167, 139, 250, 0.12)', color: '#A78BFA', border: '1px solid rgba(167, 139, 250, 0.25)' }}>
            {status}
          </span>
        );
      case 'REJECTED':
      case 'WITHDRAWN':
        return (
          <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: '#F87171', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {status}
          </span>
        );
      default:
        return (
          <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.06)', color: 'rgba(255, 255, 255, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            {status}
          </span>
        );
    }
  };

  if (loading && applications.length === 0) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>
        Loading verified application status...
      </div>
    );
  }

  const activeCount = applications.filter((a) => a.status !== 'REJECTED' && a.status !== 'WITHDRAWN').length;
  const interviewingCount = applications.filter((a) => a.status === 'INTERVIEW' || a.status === 'SHORTLISTED').length;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* 1. MINIMALIST EDITORIAL HEADER */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px' }}>
              Candidate Telemetry • Pipeline Status
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
              My Applications Pipeline
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '6px', maxWidth: '640px', lineHeight: 1.5 }}>
              Track verified submission snapshots, recruiter review timestamps, and live interview stages in real time.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              to="/student/opportunities"
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
              Browse Roles
            </Link>
            <button
              onClick={loadApplications}
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
              title="Refresh application status"
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
              Active Pipelines
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              {activeCount} <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.4)' }}>Roles</span>
            </div>
          </div>

          <div style={{ width: '1px', height: '28px', background: 'rgba(255, 255, 255, 0.08)' }} />

          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Shortlisted / Interview
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#34D399', marginTop: '2px' }}>
              {interviewingCount} <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.4)' }}>Advancing</span>
            </div>
          </div>

          <div style={{ width: '1px', height: '28px', background: 'rgba(255, 255, 255, 0.08)' }} />

          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Total Submissions
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              {applications.length}
            </div>
          </div>
        </div>
      </section>

      {/* 2. APPLICATIONS LIST */}
      {applications.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 24px',
            background: 'rgba(255, 255, 255, 0.015)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
          }}
        >
          <div style={{ fontSize: '1.15rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '6px' }}>
            No Active Applications Yet
          </div>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.55)', maxWidth: '420px', margin: '0 auto 20px auto', lineHeight: 1.5 }}>
            Explore opportunities ranked for your profile and submit your verified skill credentials with 1 click.
          </p>
          <Link
            to="/student/opportunities"
            style={{
              display: 'inline-block',
              padding: '8px 18px',
              borderRadius: '5px',
              background: '#FFFFFF',
              color: '#05070D',
              fontSize: '0.825rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Explore Matched Openings →
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {applications.map((app) => (
            <div
              key={app.id}
              style={{
                background: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '22px 28px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                      {app.job?.title || `Opportunity #${app.job_id}`}
                    </h3>
                    {getStatusBadge(app.status)}
                  </div>

                  <div style={{ fontSize: '0.825rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '5px' }}>
                    {app.job?.company || 'Recruiter Partner'} • Applied on{' '}
                    {new Date(app.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>

                  {app.cover_note && (
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', fontStyle: 'italic', maxWidth: '700px' }}>
                      "{app.cover_note}"
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#38BDF8' }}>
                      {app.match_score_snapshot}%
                    </div>
                    <span style={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase' }}>
                      Snapshot Fit
                    </span>
                  </div>

                  {app.status !== 'WITHDRAWN' && app.status !== 'REJECTED' && (
                    <button
                      onClick={() => handleWithdraw(app.id)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '4px',
                        background: 'transparent',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#F87171',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                      }}
                    >
                      Withdraw
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
