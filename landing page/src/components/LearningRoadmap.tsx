import React from 'react';
import { CheckCircle2, ArrowRight, Zap, Target, Radius } from 'lucide-react';
import { ROADMAP_MILESTONES } from '../data/careerData';

interface LearningRoadmapProps {
  onContinue: () => void;
}

const TOPIC_HEADERS: Record<number, string> = {
  1: 'Topic 01 • Compute & Core Systems',
  2: 'Topic 02 • Statistical Modeling & Math',
  3: 'Topic 03 • Algorithmic Machine Learning',
  4: 'Topic 04 • Deep Neural Architectures',
  5: 'Topic 05 • Generative AI & LLM Systems',
  6: 'Topic 06 • Industry Placement & Match',
};

export const LearningRoadmap: React.FC<LearningRoadmapProps> = ({ onContinue }) => {
  return (
    <section
      id="section-3"
      className="section-wrapper roadmap-section"
      style={{
        width: '100%',
        maxWidth: '100%',
        padding: '40px clamp(24px, 4.5vw, 64px) 64px',
        margin: '0 auto',
      }}
    >
      {/* Chapter Indicator & Clean Header */}
      <div className="chapter-badge"> Progression</div>

      <div style={{ maxWidth: '850px', marginBottom: '48px' }}>
        <h2
          style={{
            fontSize: 'clamp(2rem, 3.8vw, 3rem)',
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '12px',
            color: 'var(--text-primary)',
          }}
        >
          Your Learning Trajectory
        </h2>
        <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
         " A milestone-driven curriculum calibrated to eliminate skill gaps and reach career readiness."
        </p>
      </div>

      {/* ========================================================
          FRAMELESS CURVED S-SPLINE PROGRESSION (SPANS FULL WEB PAGE WIDTH)
          ======================================================== */}
      <div className="curved-timeline-wrap">
        {/* Curving SVG Spine Spline connecting all milestones */}
        <svg
          className="curved-svg-spine"
          viewBox="0 0 1000 960"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="spineCurveGrad" x1="500" y1="0" x2="500" y2="960" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#818CF8" stopOpacity="0.85" />
              <stop offset="85%" stopColor="#38BDF8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.25" />
            </linearGradient>
            <filter id="spineCurveGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ambient soft glow aura path */}
          <path
            d="M 500,12 C 470,30 440,52 440,80 C 440,160 560,160 560,240 C 560,320 440,320 440,400 C 440,480 560,480 560,560 C 560,640 440,640 440,720 C 440,800 560,800 560,880 C 560,915 530,940 500,950"
            stroke="rgba(56, 189, 248, 0.24)"
            strokeWidth="10"
            fill="none"
            filter="url(#spineCurveGlow)"
            strokeLinecap="round"
          />

          {/* Main luminous curved trajectory */}
          <path
            d="M 500,12 C 470,30 440,52 440,80 C 440,160 560,160 560,240 C 560,320 440,320 440,400 C 440,480 560,480 560,560 C 560,640 440,640 440,720 C 440,800 560,800 560,880 C 560,915 530,940 500,950"
            stroke="url(#spineCurveGrad)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Dynamic energy stream */}
          <path
            d="M 500,12 C 470,30 440,52 440,80 C 440,160 560,160 560,240 C 560,320 440,320 440,400 C 440,480 560,480 560,560 C 560,640 440,640 440,720 C 440,800 560,800 560,880 C 560,915 530,940 500,950"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 8"
            strokeLinecap="round"
            className="animated-curve-dash"
          />
        </svg>

        {/* Milestone Rows Alternating Left & Right across the Web Page */}
        {ROADMAP_MILESTONES.map((milestone, index) => {
          const isLeft = index % 2 === 0;
          const isCompleted = milestone.status === 'completed';
          const isActive = milestone.status === 'active';
          const topicHeading = TOPIC_HEADERS[milestone.step] || `Topic 0${milestone.step}`;

          return (
            <div key={milestone.id} className="curved-timeline-row">
              {/* LEFT COLUMN (Pushed flush to left of web page: 36% width) */}
              {isLeft ? (
                <div className={`curved-step-content left-side ${isActive ? 'active-step' : ''}`}>
                  {/* Feathered Shapeless Slight Blur Backdrop directly behind the text */}
                  <div className="text-ambient-blur-backdrop" aria-hidden="true" />

                  {/* Organic Shapeless Ambient Glow Mesh */}
                  <div className="shapeless-ambient-glow" aria-hidden="true" />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Topic Heading & Status Tag */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: '10px',
                        marginBottom: '4px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span className="topic-track-heading">{topicHeading}</span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: 'var(--text-muted)',
                          fontWeight: 500,
                        }}
                      >
                        • {milestone.duration}
                      </span>
                      {isCompleted && (
                        <span
                          style={{
                            fontSize: '0.625rem',
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: '999px',
                            background: 'rgba(56, 189, 248, 0.12)',
                            color: 'var(--accent-cyan)',
                            letterSpacing: '0.05em',
                          }}
                        >
                          COMPLETED
                        </span>
                      )}
                      {isActive && (
                        <span
                          style={{
                            fontSize: '0.625rem',
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: '999px',
                            background: 'rgba(56, 189, 248, 0.22)',
                            color: '#38BDF8',
                            boxShadow: '0 0 10px rgba(56, 189, 248, 0.4)',
                            letterSpacing: '0.05em',
                          }}
                        >
                          CURRENT
                        </span>
                      )}
                    </div>

                    {/* Topic Main Title */}
                    <h3
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                        marginBottom: '3px',
                        letterSpacing: '-0.02em',
                        textAlign: 'left',
                      }}
                    >
                      {milestone.title}
                    </h3>

                    {/* Topic Subtitle */}
                    <div className="topic-subtitle" style={{ textAlign: 'left' }}>
                      {milestone.subtitle}
                    </div>

                    {/* Key Skills / Focus Tags */}
                    <div className="topic-skills-tag" style={{ textAlign: 'left' }}>
                      {milestone.tags.join('  •  ')}
                    </div>

                    {/* Milestone Deliverable */}
                    <p
                      className="topic-deliverable"
                      style={{
                        maxWidth: '430px',
                        marginLeft: '0',
                        marginRight: 'auto',
                        textAlign: 'left',
                      }}
                    >
                      <span style={{ color: 'var(--accent-cyan)', fontWeight: 500 }}>Deliverable: </span>
                      {milestone.deliverable}
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{ width: '36%' }} />
              )}

              {/* NODE SITTING DIRECTLY ON CURVE */}
              <div
                className={`curved-timeline-node ${
                  isLeft ? 'left-pos' : 'right-pos'
                } ${isCompleted ? 'completed' : isActive ? 'active' : 'upcoming'}`}
              >
                {isCompleted ? (
                  <CheckCircle2 size={16} />
                ) : isActive ? (
                  <Zap size={16} />
                ) : milestone.step === 6 ? (
                  <Target size={15} />
                ) : (
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{milestone.step}</span>
                )}
              </div>

              {/* RIGHT COLUMN (Pushed flush to right of web page: 36% width) */}
              {!isLeft ? (
                <div className={`curved-step-content right-side ${isActive ? 'active-step' : ''}`}>
                  {/* Feathered Shapeless Slight Blur Backdrop directly behind the text */}
                  <div className="text-ambient-blur-backdrop" aria-hidden="true" />

                  {/* Organic Shapeless Ambient Glow Mesh */}
                  <div className="shapeless-ambient-glow" aria-hidden="true" />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Topic Heading & Status Tag */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '10px',
                        marginBottom: '4px',
                        flexWrap: 'wrap',
                        

                      }}
                    >
                      <span className="topic-track-heading">{topicHeading}</span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: 'var(--text-muted)',
                          fontWeight: 500,
                        }}
                      >
                        • {milestone.duration}
                      </span>
                      {isCompleted && (
                        <span
                          style={{
                            fontSize: '0.625rem',
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: '9px',
                            background: 'rgba(56, 189, 248, 0.12)',
                            color: 'var(--accent-cyan)',
                            letterSpacing: '0.05em',
                          }}
                        >
                          COMPLETED
                        </span>
                      )}
                      {isActive && (
                        <span
                          style={{
                            fontSize: '0.625rem',
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: '9px',
                            background: 'rgba(56, 189, 248, 0.22)',
                            color: '#38BDF8',
                            boxShadow: '0 0 10px rgba(56, 189, 248, 0.4)',
                            letterSpacing: '0.05em',
                          }}
                        >
                          CURRENT
                        </span>
                      )}
                    </div>

                    {/* Topic Main Title */}
                    <h3
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                        marginBottom: '3px',
                        letterSpacing: '-0.02em',
                        textAlign: 'right',
                      }}
                    >
                      {milestone.title}
                    </h3>

                    {/* Topic Subtitle */}
                    <div className="topic-subtitle" style={{ textAlign: 'right' }}>
                      {milestone.subtitle}
                    </div>

                    {/* Key Skills / Focus Tags */}
                    <div className="topic-skills-tag" style={{ textAlign: 'right' }}>
                      {milestone.tags.join('  •  ')}
                    </div>

                    {/* Milestone Deliverable */}
                    <p
                      className="topic-deliverable"
                      style={{
                        maxWidth: '430px',
                        marginLeft: 'auto',
                        marginRight: '0',
                        textAlign: 'right',
                      }}
                    >
                      <span style={{ color: 'var(--accent-cyan)', fontWeight: 500 }}>Deliverable: </span>
                      {milestone.deliverable}
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{ width: '36%' }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Transition indicator to Chapter 05: Opportunities */}
      <div style={{ marginTop: '28px', textAlign: 'center' }}>
        <button
          onClick={onContinue}
          className="btn-ghost"
          style={{ color: 'var(--accent-cyan)', fontSize: '0.875rem' }}
        >
          <span>Proceed to Chapter 05: Opportunity Intelligence</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
};
