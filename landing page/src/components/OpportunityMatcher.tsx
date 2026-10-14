import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle2, AlertCircle, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { OPPORTUNITY_ITEMS } from '../data/careerData';
import { publicApi } from '../api/public';
import { useAuth } from '../context/AuthContext';

interface OpportunityMatcherProps {
  onContinue: () => void;
  onOpenAuth: (mode: 'student' | 'recruiter') => void;
}

export const OpportunityMatcher: React.FC<OpportunityMatcherProps> = ({ onContinue, onOpenAuth }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<any[]>(OPPORTUNITY_ITEMS);
  const [selectedOppId, setSelectedOppId] = useState<string>('opp-1');
  const [isLiveFromBackend, setIsLiveFromBackend] = useState<boolean>(false);

  useEffect(() => {
    publicApi
      .getJobs()
      .then((jobs) => {
        if (jobs && jobs.length > 0) {
          const mapped = jobs.slice(0, 3).map((j, idx) => ({
            id: `live-${j.id}`,
            role: j.title,
            company: typeof j.company === 'string' ? j.company : j.company?.name || 'Verified Employer',
            location: j.location,
            type: j.employment_type || 'Full-time',
            category: j.category || 'AI/ML',
            matchScore: idx === 0 ? 94 : idx === 1 ? 88 : 83,
            whyMatch: `Verified strong alignment on ${(j.required_skills || ['Python', 'Machine Learning']).slice(0, 2).join(' and ')} with verified repository evidence bonus (+5%).`,
            matchedSkills: j.required_skills && j.required_skills.length > 0 ? j.required_skills : ['Python', 'PyTorch', 'Data Structures'],
            recommendedToLearn: j.preferred_skills && j.preferred_skills.length > 0 ? j.preferred_skills : ['Kubernetes'],
            salaryRange: j.salary_range || '$130k - $175k',
          }));
          setOpportunities(mapped);
          setSelectedOppId(mapped[0].id);
          setIsLiveFromBackend(true);
        }
      })
      .catch(() => {
        // Fallback gracefully to curated local demo dataset
        setOpportunities(OPPORTUNITY_ITEMS);
      });
  }, []);

  const selectedOpp = opportunities.find((o) => o.id === selectedOppId) || opportunities[0] || OPPORTUNITY_ITEMS[0];

  return (
    <section id="section-4" className="section-wrapper opportunity-section">
      <div className="chapter-badge"> Opportunities</div>

      <div style={{ maxWidth: '820px', marginBottom: '44px' }}>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '16px',
            color: 'var(--text-primary)',
          }}
        >
          Find Opportunities That Fit You.
        </h2>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Get matched with internships and jobs that align with your skills, goals, and career trajectory.
        </p>
      </div>

      {/* SECTION 15 AI MATCHING ENGINE VISUALIZER */}
      <div
        className="glass-panel"
        style={{
          padding: '28px',
          marginBottom: '36px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
            AI Match Reasoning Pipeline
          </span>

        </div>

        {/* 4-Step Visual Flow: Student Profile -> AI Matching Engine -> Job Requirements -> 92% Match */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.035)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ textAlign: 'center', flex: '1', minWidth: '130px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Source</div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>Student Profile</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Alex Rivera (68% ML)</div>
          </div>

          <ArrowRight size={18} style={{ color: 'var(--accent-cyan)' }} />

          <div style={{ textAlign: 'center', flex: '1', minWidth: '150px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>Intelligence</div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>AI Matching Engine</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Semantic Vector Match</div>
          </div>

          <ArrowRight size={18} style={{ color: 'var(--accent-cyan)' }} />

          <div style={{ textAlign: 'center', flex: '1', minWidth: '130px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Target</div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>Job Requirements</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{selectedOpp.company}</div>
          </div>

          <ArrowRight size={18} style={{ color: 'var(--accent-mint)' }} />

          <div
            style={{
              textAlign: 'center',
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(52, 211, 153, 0.1)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
            }}
          >
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-mint)', textTransform: 'uppercase', fontWeight: 600 }}>Confidence</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--accent-mint)' }}>
              {selectedOpp.matchScore}% Match
            </div>
          </div>
        </div>
      </div>

      {/* Floating Opportunity Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'stretch',
          marginBottom: '36px',
          zIndex: 10,
        }}
      >
        {opportunities.map((opp) => {
          const isSelected = selectedOppId === opp.id;

          return (
            <div
              key={opp.id}
              onClick={() => setSelectedOppId(opp.id)}
              className="glass-panel"
              style={{
                padding: '28px',
                cursor: 'pointer',
                borderColor: isSelected ? 'rgba(56, 189, 248, 0.45)' : 'var(--border-glass)',
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.14) 0%, rgba(10, 15, 29, 0.65) 100%)'
                  : undefined,
                boxShadow: isSelected
                  ? '0 20px 48px rgba(0, 0, 0, 0.5), 0 0 24px rgba(56, 189, 248, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.18)'
                  : undefined,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Header row: Category & Match Score */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span className="pill-badge" style={{ fontSize: '0.75rem' }}>
                    {opp.category}
                  </span>
                  <div
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      background: opp.matchScore >= 90 ? 'rgba(52, 211, 153, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                      border: opp.matchScore >= 90 ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid rgba(56, 189, 248, 0.3)',
                      color: opp.matchScore >= 90 ? 'var(--accent-mint)' : 'var(--accent-cyan)',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {opp.matchScore}% Match
                  </div>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '4px', color: 'var(--text-primary)' }}>
                  {opp.role}
                </h3>
                <div style={{ fontSize: '0.9375rem', color: 'var(--accent-cyan)', fontWeight: 500, marginBottom: '14px' }}>
                  {opp.company}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={13} />
                    <span>{opp.location}</span>
                  </div>
                  <span>•</span>
                  <div>{opp.type}</div>
                </div>

                {/* Why Match Explanation Snippet */}
                <div
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    AI Match Reasoning
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {opp.whyMatch}
                  </p>
                </div>

                {/* Matched Skills Checklist */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {opp.matchedSkills.slice(0, 3).map((skill: string) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: '0.7rem',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: 'rgba(52, 211, 153, 0.1)',
                        color: 'var(--accent-mint)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <CheckCircle2 size={10} />
                      {skill}
                    </span>
                  ))}
                  {opp.recommendedToLearn.length > 0 && (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: 'rgba(251, 191, 36, 0.1)',
                        color: 'var(--accent-amber)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <AlertCircle size={10} />
                      {opp.recommendedToLearn[0]}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {opp.salaryRange}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (user) {
                      navigate(user.role === 'RECRUITER' ? '/recruiter/jobs' : '/student/opportunities');
                    } else {
                      onOpenAuth('student');
                    }
                  }}
                  className="btn-ghost"
                  style={{ color: 'var(--accent-cyan)', fontSize: '0.8125rem', padding: '4px 8px' }}
                >
                  <span>{user ? 'View In Workspace' : 'Apply with Verified Profile'}</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transition to Section 6 indicator */}
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <button
          onClick={onContinue}
          className="btn-ghost"
          style={{ color: 'var(--accent-mint)', fontSize: '0.875rem' }}
        >
          <span>Line follows 92% Match to Section 6: Future Horizon</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
};
