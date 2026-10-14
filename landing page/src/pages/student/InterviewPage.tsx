import React, { useState } from 'react';
import { studentApi, InterviewSessionData } from '../../api/student';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, ChevronRight, Play, RotateCcw, Award, Code2, Sparkles, Terminal } from 'lucide-react';

export const InterviewPage: React.FC = () => {
  const { success, error } = useToast();
  const [session, setSession] = useState<InterviewSessionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [submittingId, setSubmittingId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showModelAnswer, setShowModelAnswer] = useState<Record<number, boolean>>({});

  const [setup, setSetup] = useState({
    target_role: 'AI / Machine Learning Engineer',
    category: 'technical',
    difficulty: 'intermediate',
  });

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await studentApi.startInterview(setup);
      setSession(data);
      success('Diagnostic mock interview session initialized.');
    } catch (err: any) {
      error(err.message || 'Error launching interview');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async (questionId: number) => {
    const text = answers[questionId];
    if (!text || text.trim().length < 10) {
      error('Please write at least 10 characters');
      return;
    }

    setSubmittingId(questionId);
    try {
      const evalRes = await studentApi.answerQuestion(questionId, text);
      if (session) {
        setSession({
          ...session,
          questions: session.questions.map((q) => (q.id === questionId ? evalRes : q)),
        });
      }
      success(`Evaluated: ${evalRes.score}%`);
    } catch (err: any) {
      error(err.message || 'Failed to submit answer');
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '36px',
      }}
    >
      {/* Editorial Header */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '20px' }}>
        <div
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.4)',
            marginBottom: '6px',
          }}
        >
          Diagnostic Simulation
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
              Technical Mock Interview
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '0.85rem', marginTop: '4px' }}>
              Role-specific systems questions scored against technical accuracy, architectural depth, and production trade-offs.
            </p>
          </div>

          {session && (
            <button
              onClick={() => setSession(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={13} />
              Reset Session
            </button>
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
            Simulation Discipline
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            {setup.target_role.split('/')[0]}
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Evaluation Focus
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            {setup.category === 'technical' ? 'Architecture & Algos' : 'Trade-offs'}
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Calibrated Level
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px', textTransform: 'capitalize' }}>
            {setup.difficulty}
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Rubric Grounding
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#38BDF8', marginTop: '4px' }}>
            Stanford / Industry
          </div>
        </div>
      </section>

      {/* Start Session Setup (Obsidian panel form) */}
      {!session ? (
        <section
          style={{
            background: 'rgba(255, 255, 255, 0.015)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '28px',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
              Session Parameters
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', margin: '4px 0 0' }}>
              Select target role trajectory and evaluation scope to calibrate question generation.
            </p>
          </div>

          <form onSubmit={handleStart} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '8px' }}>
                  Target Trajectory Role
                </label>
                <select
                  value={setup.target_role}
                  onChange={(e) => setSetup({ ...setup, target_role: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: '#07090E',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    fontSize: '0.82rem',
                    outline: 'none',
                  }}
                >
                  <option value="AI / Machine Learning Engineer">AI / Machine Learning Engineer</option>
                  <option value="Full-Stack Systems Engineer">Full-Stack Systems Engineer</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '8px' }}>
                  Question Category
                </label>
                <select
                  value={setup.category}
                  onChange={(e) => setSetup({ ...setup, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: '#07090E',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    fontSize: '0.82rem',
                    outline: 'none',
                  }}
                >
                  <option value="technical">Technical Architecture & Algorithms</option>
                  <option value="behavioral">Engineering Trade-offs & Production Triage</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '8px' }}>
                  Calibrated Seniority
                </label>
                <select
                  value={setup.difficulty}
                  onChange={(e) => setSetup({ ...setup, difficulty: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: '#07090E',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    fontSize: '0.82rem',
                    outline: 'none',
                  }}
                >
                  <option value="intermediate">Intermediate (New Grad / L3)</option>
                  <option value="advanced">Advanced (Mid-Senior / L4+)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '8px' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '10px 24px',
                  borderRadius: '6px',
                  background: '#FFFFFF',
                  color: '#05070D',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Play size={14} fill="#05070D" />
                {loading ? 'Generating Rubrics...' : 'Begin Diagnostic Session'}
              </button>
            </div>
          </form>
        </section>
      ) : (
        /* Questions Display in Obsidian Cards */
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {session.questions.map((q, idx) => {
            const isAnswered = q.student_answer !== null && q.student_answer !== undefined;

            return (
              <div
                key={q.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.015)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Diagnostic Prompt 0{idx + 1} • {q.category}
                  </span>

                  {isAnswered && (
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: q.score && q.score >= 80 ? '#34D399' : '#38BDF8',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      Rubric Score: {q.score}%
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '1.1rem', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.5 }}>
                  {q.question_text}
                </div>

                {/* Rubric Criteria */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {(q.rubric_criteria || []).map((c: string) => (
                    <span
                      key={c}
                      style={{
                        fontSize: '0.72rem',
                        padding: '3px 10px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: 'rgba(255, 255, 255, 0.65)',
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {/* Response Area */}
                {!isAnswered ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '6px' }}>
                    <textarea
                      rows={5}
                      placeholder="Type your structured explanation, technical architecture trade-offs, and scaling reasoning..."
                      value={answers[q.id] || ''}
                      onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        fontSize: '0.85rem',
                        lineHeight: 1.6,
                        fontFamily: 'inherit',
                        outline: 'none',
                      }}
                    />
                    <div>
                      <button
                        onClick={() => handleAnswerSubmit(q.id)}
                        disabled={submittingId === q.id}
                        style={{
                          padding: '8px 20px',
                          borderRadius: '6px',
                          background: '#FFFFFF',
                          color: '#05070D',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          border: 'none',
                          cursor: submittingId === q.id ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {submittingId === q.id ? 'Auditing with Rubric...' : 'Submit for Rubric Evaluation'}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Evaluated Results */
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      padding: '18px 20px',
                      borderRadius: '8px',
                      borderLeft: '3px solid #FFFFFF',
                      marginTop: '6px',
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, marginBottom: '16px' }}>
                      <strong style={{ color: '#FFFFFF' }}>Submitted Formulation:</strong> {q.student_answer}
                    </div>

                    {q.strengths && q.strengths.length > 0 && (
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#34D399', marginBottom: '6px', fontWeight: 600 }}>
                          ✓ Demonstrated Strengths
                        </div>
                        {q.strengths.map((s, sI) => (
                          <div key={sI} style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '3px' }}>
                            • {s}
                          </div>
                        ))}
                      </div>
                    )}

                    {q.improvements && q.improvements.length > 0 && (
                      <div>
                        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#F59E0B', marginBottom: '6px', fontWeight: 600 }}>
                          ⚡ Architectural Considerations to Address
                        </div>
                        {q.improvements.map((imp, imI) => (
                          <div key={imI} style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '3px' }}>
                            • {imp}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};
