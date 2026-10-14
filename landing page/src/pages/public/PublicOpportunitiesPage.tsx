import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Building, Search, Filter, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { getPublicJobs } from '../../api/public';
import { useAuth } from '../../context/AuthContext';

export const PublicOpportunitiesPage: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const { user } = useAuth();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await getPublicJobs();
      setJobs(data);
    } catch (err) {
      console.error('Failed to load opportunities:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((j) => {
    const compName = typeof j.company === 'string' ? j.company : j.company?.name || '';
    const loc = j.location || '';
    const title = j.title || '';
    const q = search.toLowerCase();
    const matchesSearch =
      title.toLowerCase().includes(q) ||
      compName.toLowerCase().includes(q) ||
      loc.toLowerCase().includes(q);
    const empType = (j.employment_type || '').toUpperCase();
    const targetType = typeFilter.toUpperCase();
    const matchesType = typeFilter === 'ALL' || empType.includes(targetType);
    return matchesSearch && matchesType;
  });

  return (
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '48px 24px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '36px',
      }}
    >
      {/* Editorial Header */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '24px' }}>
        <div
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.4)',
            marginBottom: '6px',
          }}
        >
          Active Requisitions
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 600, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
              Explore Verified Corporate Roles
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '0.85rem', marginTop: '4px' }}>
              Curated engineering, AI/ML, and systems positions from verified partner companies with transparent rubric matching.
            </p>
          </div>

          {!user && (
            <Link
              to="/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FFFFFF',
                color: '#05070D',
                padding: '8px 18px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.8rem',
                textDecoration: 'none',
              }}
            >
              Sign In to View Matches
              <ArrowRight size={13} />
            </Link>
          )}
        </div>
      </section>

      {/* Telemetry Strip */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Published Roles
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            {jobs.length || 6} Openings
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Verified Employers
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            DeepMind, Anthropic, Scale
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Compensation Spectrum
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            $45/hr – $165k/yr
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Readiness Scoring
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#38BDF8', marginTop: '4px' }}>
            Deterministic
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '14px', top: '12px', color: 'rgba(255, 255, 255, 0.35)' }} />
          <input
            type="text"
            placeholder="Search by role title, partner company, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {['ALL', 'INTERNSHIP', 'FULL_TIME'].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: typeFilter === type ? '#FFFFFF' : 'rgba(255, 255, 255, 0.08)',
                background: typeFilter === type ? '#FFFFFF' : 'transparent',
                color: typeFilter === type ? '#05070D' : 'rgba(255, 255, 255, 0.65)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {type === 'ALL' ? 'All Roles' : type === 'INTERNSHIP' ? 'Internships' : 'Full-Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem' }}>
          Loading active listings...
        </div>
      ) : filteredJobs.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 24px',
            background: 'rgba(255, 255, 255, 0.015)',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Briefcase size={32} color="rgba(255, 255, 255, 0.3)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '8px' }}>No matching listings found</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem' }}>
            Try adjusting your search criteria or resetting the category filter.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              style={{
                background: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '28px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '24px',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span
                    style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                    }}
                  >
                    {job.employment_type}
                  </span>
                  <span
                    style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.72rem',
                    }}
                  >
                    {job.workplace_type || job.remote_type || 'Hybrid'}
                  </span>
                  {job.salary_range && (
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        color: '#34D399',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                      }}
                    >
                      {job.salary_range}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF', margin: '0 0 8px 0' }}>
                  {job.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem', marginBottom: '14px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Building size={13} color="rgba(255, 255, 255, 0.7)" />
                    {(typeof job.company === 'string' ? job.company : job.company?.name) || 'Verified Partner'}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={13} color="rgba(255, 255, 255, 0.7)" />
                    {job.location}
                  </span>
                </div>

                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.825rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                  {job.description}
                </p>

                {/* Skills Preview */}
                {((job.required_skills && job.required_skills.length > 0) || (job.preferred_skills && job.preferred_skills.length > 0)) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(job.required_skills || []).map((s: string, sIdx: number) => (
                      <span
                        key={`req-${sIdx}`}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#FFFFFF',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontWeight: 500,
                        }}
                      >
                        {s} ★ Core
                      </span>
                    ))}
                    {(job.preferred_skills || []).map((s: string, sIdx: number) => (
                      <span
                        key={`pref-${sIdx}`}
                        style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          color: 'rgba(255, 255, 255, 0.55)',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end', justifyContent: 'center' }}>
                {user ? (
                  <Link
                    to="/student/opportunities"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#FFFFFF',
                      color: '#05070D',
                      padding: '8px 18px',
                      borderRadius: '6px',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      textDecoration: 'none',
                    }}
                  >
                    View Match & Apply
                    <ArrowRight size={13} />
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#FFFFFF',
                      color: '#05070D',
                      padding: '8px 18px',
                      borderRadius: '6px',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      textDecoration: 'none',
                    }}
                  >
                    Sign In to Apply
                    <ArrowRight size={13} />
                  </Link>
                )}
                <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                  Audited Requirements
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
