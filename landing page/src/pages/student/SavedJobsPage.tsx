import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, MapPin, DollarSign, Send, Trash2, RefreshCw } from 'lucide-react';
import { studentApi } from '../../api/student';
import { useToast } from '../../context/ToastContext';

export const SavedJobsPage: React.FC = () => {
  const { success, error } = useToast();
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSaved = async () => {
    try {
      const data = await studentApi.getSavedJobs();
      setSavedJobs(data);
    } catch (err: any) {
      error(err.message || 'Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSaved();
  }, []);

  const handleRemove = async (id: number) => {
    try {
      await studentApi.toggleSaveJob(id);
      success('Job removed from saved list');
      loadSaved();
    } catch (err: any) {
      error(err.message || 'Error removing bookmark');
    }
  };

  if (loading && savedJobs.length === 0) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>
        Loading bookmarked opportunities...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* 1. MINIMALIST EDITORIAL HEADER */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px' }}>
              Saved Vault • Opportunity Tracker
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
              Bookmarked Opportunities
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '6px', maxWidth: '640px', lineHeight: 1.5 }}>
              Positions and research fellowships saved for review, preparation, and upcoming application deadlines.
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
              Browse More Roles
            </Link>
            <button
              onClick={loadSaved}
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
              title="Refresh bookmarks"
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
              Bookmarked Positions
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              {savedJobs.length} <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.4)' }}>Saved</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SAVED JOBS GRID */}
      {savedJobs.length === 0 ? (
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
            No Saved Opportunities Yet
          </div>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.55)', maxWidth: '420px', margin: '0 auto 20px auto', lineHeight: 1.5 }}>
            Bookmark roles while reviewing recommendations to prepare tailored project proofs before applying.
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
          {savedJobs.map((job) => (
            <div
              key={job.id}
              style={{
                background: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '24px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                    {job.title}
                  </h3>
                  <button
                    onClick={() => handleRemove(job.id)}
                    style={{ background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.4)', cursor: 'pointer', padding: '2px' }}
                    title="Remove from saved"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div style={{ fontSize: '0.825rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
                  {job.company} • {job.location}
                </div>

                <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '12px', lineHeight: 1.5 }}>
                  {job.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
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

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '18px',
                  paddingTop: '14px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <span style={{ fontSize: '0.875rem', color: '#34D399', fontWeight: 600 }}>
                  {job.salary_range}
                </span>
                <Link
                  to="/student/opportunities"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '4px',
                    background: '#FFFFFF',
                    color: '#05070D',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <Send size={12} />
                  <span>Apply Now</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
