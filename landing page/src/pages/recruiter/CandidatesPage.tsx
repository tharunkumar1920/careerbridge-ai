import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, GraduationCap, MapPin, Award, CheckCircle2, ShieldCheck, RefreshCw, FolderGit2 } from 'lucide-react';
import { recruiterApi, CandidateData } from '../../api/recruiter';
import { useToast } from '../../context/ToastContext';

export const CandidatesPage: React.FC = () => {
  const { error } = useToast();
  const [candidates, setCandidates] = useState<CandidateData[]>([]);
  const [skillFilter, setSkillFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const loadCandidates = async (skill?: string) => {
    setLoading(true);
    try {
      const data = await recruiterApi.searchCandidates({ skill: skill || undefined });
      setCandidates(data);
    } catch (err: any) {
      error(err.message || 'Failed to search candidate database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadCandidates(skillFilter);
  };

  if (loading && candidates.length === 0) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>
        Sourcing verified student candidates...
      </div>
    );
  }

  const avgScore = candidates.length > 0 ? Math.round(candidates.reduce((a, c) => a + c.career_readiness_score, 0) / candidates.length) : 82;
  const totalProjects = candidates.reduce((a, c) => a + c.projects_count, 0);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* 1. MINIMALIST EDITORIAL HEADER */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px' }}>
              Talent Sourcing • Empirical Proof Verification
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
              Candidate Search & Proof Verification
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '6px', maxWidth: '640px', lineHeight: 1.5 }}>
              Benchmark applicant cohorts against transparent skill readiness formulas and inspect verified code repositories.
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
              + Post New Role
            </Link>
            <button
              onClick={() => loadCandidates(skillFilter)}
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
              title="Refresh talent database"
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
              Qualified Cohort
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              {candidates.length} <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.4)' }}>Candidates</span>
            </div>
          </div>

          <div style={{ width: '1px', height: '28px', background: 'rgba(255, 255, 255, 0.08)' }} />

          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Average Readiness
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#34D399', marginTop: '2px' }}>
              {avgScore}%
            </div>
          </div>

          <div style={{ width: '1px', height: '28px', background: 'rgba(255, 255, 255, 0.08)' }} />

          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Verified Artifacts
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              {totalProjects} <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.4)' }}>Repositories</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER TOOLBAR */}
      <section
        style={{
          background: 'rgba(255, 255, 255, 0.015)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '16px 20px',
        }}
      >
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.4)' }} />
            <input
              type="text"
              placeholder="Search by required skill (e.g. PyTorch, CUDA, Distributed Systems, FastAPI)..."
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 14px 9px 38px',
                borderRadius: '6px',
                background: '#0A0F1D',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '8px 18px',
              borderRadius: '5px',
              background: '#FFFFFF',
              color: '#05070D',
              fontSize: '0.825rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Filter Candidates
          </button>
          {skillFilter && (
            <button
              type="button"
              onClick={() => {
                setSkillFilter('');
                loadCandidates('');
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '5px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.825rem',
                cursor: 'pointer',
              }}
            >
              Reset Filter
            </button>
          )}
        </form>
      </section>

      {/* 3. CANDIDATE CARDS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {candidates.map((cand) => (
          <div
            key={cand.id}
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
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                    {cand.full_name}
                  </h3>
                  <div style={{ fontSize: '0.825rem', color: 'rgba(255, 255, 255, 0.6)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <GraduationCap size={14} /> {cand.university} • {cand.degree}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#38BDF8', marginTop: '2px', fontWeight: 500 }}>
                    Target: {cand.target_role}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#34D399', letterSpacing: '-0.02em' }}>
                    {cand.career_readiness_score}%
                  </div>
                  <span style={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase' }}>Readiness Score</span>
                </div>
              </div>

              {cand.bio && (
                <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '12px', lineHeight: 1.5 }}>
                  {cand.bio}
                </p>
              )}

              {/* Skills */}
              <div style={{ marginTop: '14px' }}>
                <span style={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Verified Skills & Competencies
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                  {cand.skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: '0.72rem',
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
                </div>
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
                fontSize: '0.78rem',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FolderGit2 size={13} color="#38BDF8" /> {cand.projects_count} verified projects
              </span>
              <span style={{ color: '#34D399', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                <ShieldCheck size={13} /> Sourced via Proof
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
