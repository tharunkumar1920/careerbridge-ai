import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Bookmark, Send, Sparkles, MapPin, DollarSign, CheckCircle2, AlertCircle, RefreshCw, X } from 'lucide-react';
import { studentApi, JobMatchData } from '../../api/student';
import { useToast } from '../../context/ToastContext';

export const OpportunitiesPage: React.FC = () => {
  const { success, error } = useToast();
  const [matches, setMatches] = useState<JobMatchData[]>([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [applyingJob, setApplyingJob] = useState<any | null>(null);
  const [coverNote, setCoverNote] = useState('');
  const [submittingApp, setSubmittingApp] = useState(false);

  const loadMatches = async (cat?: string) => {
    setLoading(true);
    try {
      const data = await studentApi.getMatchedJobs(cat === 'All' ? undefined : cat);
      setMatches(data);
    } catch (err: any) {
      error(err.message || 'Failed to load matched jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches(category);
  }, [category]);

  const handleToggleSave = async (jobId: number) => {
    try {
      const res = await studentApi.toggleSaveJob(jobId);
      setMatches((prev) =>
        prev.map((m) => (m.job.id === jobId ? { ...m, is_saved: res.saved } : m))
      );
      success(res.message || 'Saved status updated');
    } catch (err: any) {
      error(err.message || 'Error saving job');
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob) return;

    setSubmittingApp(true);
    try {
      await studentApi.applyToJob(applyingJob.id, coverNote);
      success(`Application submitted to ${applyingJob.company}! Snapshot score recorded.`);
      setMatches((prev) =>
        prev.map((m) => (m.job.id === applyingJob.id ? { ...m, has_applied: true } : m))
      );
      setApplyingJob(null);
      setCoverNote('');
    } catch (err: any) {
      error(err.message || 'Failed to submit application');
    } finally {
      setSubmittingApp(false);
    }
  };

  if (loading && matches.length === 0) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>
        Loading matched opportunities...
      </div>
    );
  }

  const avgMatch = matches.length > 0 ? Math.round(matches.reduce((acc, m) => acc + m.match_score, 0) / matches.length) : 90;
  const appliedCount = matches.filter((m) => m.has_applied).length;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* 1. MINIMALIST EDITORIAL HEADER */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px' }}>
              Opportunity Intelligence • Deterministic Scoring
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
              Intelligent Opportunity Matching
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '6px', maxWidth: '640px', lineHeight: 1.5 }}>
              Positions ranked through transparent, explainable skill vectors and verified GitHub project artifacts.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              to="/student/applications"
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
              View Pipeline ({appliedCount})
            </Link>
            <button
              onClick={() => loadMatches(category)}
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
              title="Refresh job opportunities"
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
              Matched Openings
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              {matches.length} <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.4)' }}>Roles</span>
            </div>
          </div>

          <div style={{ width: '1px', height: '28px', background: 'rgba(255, 255, 255, 0.08)' }} />

          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Average Match Fit
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#34D399', marginTop: '2px' }}>
              {avgMatch}%
            </div>
          </div>

          <div style={{ width: '1px', height: '28px', background: 'rgba(255, 255, 255, 0.08)' }} />

          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Submitted Applications
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              {appliedCount} <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.4)' }}>Active</span>
            </div>
          </div>

          <div style={{ width: '1px', height: '28px', background: 'rgba(255, 255, 255, 0.08)' }} />

          {/* Filter Pills */}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['All', 'AI/ML', 'Engineering', 'Web Systems'].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '4px',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  background: category === c ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)',
                  color: category === c ? '#05070D' : 'rgba(255, 255, 255, 0.65)',
                  border: category === c ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. MATCHED OPPORTUNITIES CARDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {matches.map((item) => (
          <div
            key={item.job.id}
            style={{
              background: 'rgba(255, 255, 255, 0.015)',
              border: item.match_score >= 90 ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '24px 28px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ flex: 1, minWidth: '320px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                    {item.job.title}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(56, 189, 248, 0.1)',
                      color: '#38BDF8',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                    }}
                  >
                    {item.job.category}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.825rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
                  <span style={{ fontWeight: 600, color: '#FFFFFF' }}>{item.job.company}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={13} /> {item.job.location} ({item.job.workplace_type})
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#34D399', fontWeight: 600 }}>
                    {item.job.salary_range}
                  </span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '12px', lineHeight: 1.55 }}>
                  {item.job.description}
                </p>

                {/* Explainable Match Rationale */}
                <div
                  style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: 'rgba(0, 0, 0, 0.35)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Deterministic Match Rationale
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'rgba(255, 255, 255, 0.85)', margin: '4px 0 0 0', lineHeight: 1.45 }}>
                    {item.why_match}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                    {item.matched_skills.map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: '0.7rem',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: 'rgba(52, 211, 153, 0.1)',
                          color: '#34D399',
                          border: '1px solid rgba(52, 211, 153, 0.25)',
                          fontWeight: 500,
                        }}
                      >
                        ✓ {s}
                      </span>
                    ))}
                    {item.missing_critical_skills.map((m) => (
                      <span
                        key={m}
                        style={{
                          fontSize: '0.7rem',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: 'rgba(245, 158, 11, 0.1)',
                          color: '#FBBF24',
                          border: '1px solid rgba(245, 158, 11, 0.25)',
                          fontWeight: 500,
                        }}
                      >
                        Bridge Gap: {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Match Score & Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '14px', minWidth: '160px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: item.match_score >= 90 ? '#34D399' : '#38BDF8',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {item.match_score}%
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Match Precision
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleToggleSave(item.job.id)}
                    style={{
                      padding: '7px 11px',
                      borderRadius: '5px',
                      background: item.is_saved ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: item.is_saved ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid rgba(255, 255, 255, 0.1)',
                      color: item.is_saved ? '#38BDF8' : 'rgba(255, 255, 255, 0.7)',
                      cursor: 'pointer',
                    }}
                    title="Bookmark Job"
                  >
                    <Bookmark size={15} />
                  </button>

                  <button
                    disabled={item.has_applied}
                    onClick={() => setApplyingJob(item.job)}
                    style={{
                      padding: '7px 16px',
                      borderRadius: '5px',
                      background: item.has_applied ? 'rgba(52, 211, 153, 0.12)' : '#FFFFFF',
                      border: item.has_applied ? '1px solid rgba(52, 211, 153, 0.3)' : 'none',
                      color: item.has_applied ? '#34D399' : '#05070D',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: item.has_applied ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'opacity 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!item.has_applied) e.currentTarget.style.opacity = '0.9';
                    }}
                    onMouseLeave={(e) => {
                      if (!item.has_applied) e.currentTarget.style.opacity = '1';
                    }}
                  >
                    {item.has_applied ? (
                      <>
                        <CheckCircle2 size={13} />
                        <span>Applied</span>
                      </>
                    ) : (
                      <>
                        <Send size={13} />
                        <span>Apply Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Apply Modal */}
      {applyingJob && (
        <div className="modal-overlay" onClick={() => setApplyingJob(null)}>
          <div className="glass-panel modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', background: '#0A0F1D', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                  Apply to {applyingJob.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.55)', margin: '4px 0 0 0' }}>
                  {applyingJob.company} • Verified skills and repository artifacts will be attached.
                </p>
              </div>
              <button
                onClick={() => setApplyingJob(null)}
                style={{ background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.5)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleApply}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '6px' }}>
                    Cover Note to Hiring Team (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Briefly highlight your relevant projects, research, or passion for this role..."
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#FFFFFF',
                      fontSize: '0.85rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setApplyingJob(null)}
                    style={{
                      padding: '7px 16px',
                      borderRadius: '5px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingApp}
                    style={{
                      padding: '7px 18px',
                      borderRadius: '5px',
                      background: '#FFFFFF',
                      color: '#05070D',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      border: 'none',
                      cursor: submittingApp ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Send size={13} />
                    <span>{submittingApp ? 'Submitting...' : 'Submit Verified Application'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
