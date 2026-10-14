import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, RefreshCw, ArrowRight, Play, BookOpen, Layers, Terminal, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { studentApi, RoadmapData, RoadmapMilestoneData } from '../../api/student';
import { useToast } from '../../context/ToastContext';

export const RoadmapPage: React.FC = () => {
  const { success, error } = useToast();
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const loadRoadmap = async () => {
    try {
      const data = await studentApi.getRoadmap();
      setRoadmap(data);
    } catch (err: any) {
      error(err.message || 'Failed to load roadmap');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoadmap();
  }, []);

  const handleUpdateStatus = async (milestoneId: number, newStatus: 'pending' | 'active' | 'completed') => {
    if (!roadmap) return;
    setUpdatingId(milestoneId);
    try {
      const updated = await studentApi.updateMilestone(roadmap.id, milestoneId, newStatus);
      setRoadmap(updated);
      if (newStatus === 'completed') {
        success('Phase marked complete! Verified portfolio evidence recorded.');
        try {
          confetti({
            particleCount: 55,
            spread: 65,
            origin: { y: 0.6 },
            colors: ['#38BDF8', '#34D399', '#A78BFA'],
          });
        } catch {
          // quiet
        }
      } else {
        success(`Phase status updated to ${newStatus}`);
      }
    } catch (err: any) {
      error(err.message || 'Failed to update phase');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>
        Loading structured curriculum telemetry...
      </div>
    );
  }

  const milestones = roadmap?.milestones || [];
  const completedCount = milestones.filter((m) => m.status === 'completed').length;
  const activeMilestone = milestones.find((m) => m.status === 'active') || milestones[0];
  const progressPercent = roadmap?.progress_percent || (milestones.length > 0 ? (completedCount / milestones.length) * 100 : 0);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* 1. MINIMALIST EDITORIAL HEADER (MATCHING DASHBOARD & RECRUITER PORTAL) */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px' }}>
              Target Specialization • {roadmap?.target_role || 'AI / Machine Learning Engineer'}
            </div>
            <h1 className="portal-page-title" style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
              Personalized Learning Roadmap
            </h1>
            <p className="portal-page-subtitle" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '6px', maxWidth: '640px', lineHeight: 1.5 }}>
              Deterministic sequence of intensive milestone phases structured to close verified competency gaps with production artifacts.
            </p>
          </div>

          <div className="portal-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              to="/student/gap"
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
              View Skill Gap Engine
            </Link>
            <Link
              to="/student/assistant"
              style={{
                display: 'inline-block',
                padding: '7px 16px',
                borderRadius: '5px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
            >
              Consult AI Advisor
            </Link>
            <button
              onClick={loadRoadmap}
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
              title="Refresh roadmap data"
            >
              <RefreshCw size={13} />
            </button>
          </div>
        </div>

        {/* Inline Responsive Metric Telemetry Strip */}
        <div className="portal-metrics-strip">
          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Curriculum Progress
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              {Math.round(progressPercent)}%
            </div>
          </div>

          <div className="portal-metric-divider" />

          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Milestones Verified
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              {completedCount} <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.4)' }}>/ {milestones.length}</span>
            </div>
          </div>

          <div className="portal-metric-divider" />

          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Total Duration
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
              {roadmap?.total_weeks || 12} <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.4)' }}>Weeks</span>
            </div>
          </div>

          <div className="portal-metric-divider" />

          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
              Active Focus
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#38BDF8', marginTop: '5px' }}>
              {activeMilestone ? `Phase ${activeMilestone.step_number}: ${activeMilestone.title.split(':')[1] || activeMilestone.title}` : 'Complete'}
            </div>
          </div>
        </div>

        {/* Minimal Progress Line */}
        <div
          style={{
            marginTop: '20px',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progressPercent}%`,
              background: '#FFFFFF',
              transition: 'width 0.4s ease-out',
            }}
          />
        </div>
      </section>

      {/* 2. SEQUENTIAL PHASE TIMELINE */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {milestones.map((m: RoadmapMilestoneData) => {
          const isCompleted = m.status === 'completed';
          const isActive = m.status === 'active';

          return (
            <div
              key={m.id}
              style={{
                background: isActive
                  ? 'rgba(56, 189, 248, 0.03)'
                  : isCompleted
                  ? 'rgba(52, 211, 153, 0.02)'
                  : 'rgba(255, 255, 255, 0.015)',
                border: isActive
                  ? '1px solid rgba(56, 189, 248, 0.35)'
                  : isCompleted
                  ? '1px solid rgba(52, 211, 153, 0.25)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '24px 28px',
                transition: 'border-color 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                  {/* Status & Phase Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: isCompleted
                          ? '#34D399'
                          : isActive
                          ? '#38BDF8'
                          : 'rgba(255, 255, 255, 0.4)',
                      }}
                    >
                      Phase {m.step_number} • {m.duration || `Weeks ${(m.step_number - 1) * 3 + 1} - ${m.step_number * 3}`}
                    </span>

                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: isCompleted
                          ? 'rgba(52, 211, 153, 0.12)'
                          : isActive
                          ? 'rgba(56, 189, 248, 0.12)'
                          : 'rgba(255, 255, 255, 0.06)',
                        color: isCompleted ? '#34D399' : isActive ? '#38BDF8' : 'rgba(255, 255, 255, 0.5)',
                        border: isCompleted
                          ? '1px solid rgba(52, 211, 153, 0.25)'
                          : isActive
                          ? '1px solid rgba(56, 189, 248, 0.25)'
                          : '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      {isCompleted ? '✓ Completed' : isActive ? '● Active Focus' : 'Upcoming'}
                    </span>
                  </div>

                  {/* Milestone Title & Subtitle */}
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF', margin: 0, letterSpacing: '-0.01em' }}>
                    {m.title}
                  </h3>

                  {m.subtitle && (
                    <div style={{ fontSize: '0.85rem', color: '#38BDF8', marginTop: '4px', fontWeight: 500 }}>
                      {m.subtitle}
                    </div>
                  )}

                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '10px', lineHeight: 1.55, maxWidth: '850px' }}>
                    {m.description}
                  </p>

                  {/* Capstone Deliverable Box */}
                  {m.deliverable && (
                    <div
                      style={{
                        marginTop: '16px',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        background: 'rgba(0, 0, 0, 0.35)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <Terminal size={16} color="#38BDF8" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div style={{ fontSize: '0.825rem' }}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.04em', display: 'block', marginBottom: '2px' }}>
                          Verified Capstone Deliverable
                        </span>
                        <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                          {m.deliverable}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Competencies Acquired & Learning Resources */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
                    {(m.skills_acquired || []).map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: '0.72rem',
                          padding: '3px 9px',
                          borderRadius: '4px',
                          background: 'rgba(56, 189, 248, 0.08)',
                          color: '#38BDF8',
                          border: '1px solid rgba(56, 189, 248, 0.2)',
                          fontWeight: 500,
                        }}
                      >
                        Target: {skill}
                      </span>
                    ))}

                    {(m.resources || []).map((res) => (
                      <span
                        key={res}
                        style={{
                          fontSize: '0.72rem',
                          padding: '3px 9px',
                          borderRadius: '4px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          color: 'rgba(255, 255, 255, 0.65)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <BookOpen size={11} style={{ opacity: 0.7 }} />
                        <span>{res}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Editorial Phase Status Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '160px', alignItems: 'flex-end' }}>
                  {!isCompleted ? (
                    <button
                      type="button"
                      disabled={updatingId === m.id}
                      onClick={() => handleUpdateStatus(m.id, 'completed')}
                      style={{
                        padding: '7px 16px',
                        borderRadius: '5px',
                        background: '#FFFFFF',
                        color: '#05070D',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        width: '100%',
                        justifyContent: 'center',
                        transition: 'opacity 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      <CheckCircle2 size={14} />
                      <span>{updatingId === m.id ? 'Updating...' : 'Mark Completed'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={updatingId === m.id}
                      onClick={() => handleUpdateStatus(m.id, 'active')}
                      style={{
                        padding: '7px 16px',
                        borderRadius: '5px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.14)',
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'center',
                      }}
                    >
                      Reopen Phase
                    </button>
                  )}

                  {!isActive && !isCompleted && (
                    <button
                      type="button"
                      disabled={updatingId === m.id}
                      onClick={() => handleUpdateStatus(m.id, 'active')}
                      style={{
                        padding: '7px 16px',
                        borderRadius: '5px',
                        background: 'transparent',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        color: '#38BDF8',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'center',
                      }}
                    >
                      Set In Progress
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
