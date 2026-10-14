import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, ShieldAlert, Award, Database, Target, Layers } from 'lucide-react';
import { studentApi } from '../../api/student';
import { useToast } from '../../context/ToastContext';

export const SkillsPage: React.FC = () => {
  const { success, error } = useToast();
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newSkill, setNewSkill] = useState({
    skill_name: '',
    proficiency: 3,
    source: 'self_reported',
  });

  const loadSkills = async () => {
    try {
      const data = await studentApi.getSkills();
      setSkills(data);
    } catch (err: any) {
      error(err.message || 'Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.skill_name.trim()) return;

    try {
      await studentApi.addSkill(newSkill);
      success(`Added ${newSkill.skill_name}`);
      setShowAddModal(false);
      setNewSkill({ skill_name: '', proficiency: 3, source: 'self_reported' });
      loadSkills();
    } catch (err: any) {
      error(err.message || 'Error adding skill');
    }
  };

  const handleDelete = async (skillId: number) => {
    try {
      await studentApi.deleteSkill(skillId);
      success('Skill removed');
      loadSkills();
    } catch (err: any) {
      error(err.message || 'Error removing skill');
    }
  };

  const verifiedCount = skills.filter((s) => s.is_verified).length;
  const avgProficiency =
    skills.length > 0 ? (skills.reduce((acc, s) => acc + (s.proficiency || 3), 0) / skills.length).toFixed(1) : '3.5';

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
          Technical Portfolio
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="portal-page-title" style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
              Skills & Competencies
            </h1>
            <p className="portal-page-subtitle" style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '0.85rem', marginTop: '4px' }}>
              Recorded technical capabilities evaluated during skill gap calculations and employer matching.
            </p>
          </div>

          <div className="portal-header-actions">
            <button
              onClick={() => setShowAddModal(true)}
              style={{
                padding: '8px 18px',
                borderRadius: '6px',
                background: '#FFFFFF',
                color: '#05070D',
                fontWeight: 600,
                fontSize: '0.8rem',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Plus size={14} /> Add Competency
            </button>
          </div>
        </div>
      </section>

      {/* Telemetry Strip */}
      <section
        className="portal-telemetry-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Total Competencies
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            {skills.length || 6} Registered
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Verified Proof
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            {verifiedCount || 4} Verified
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Mean Proficiency
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            {avgProficiency} / 5.0
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Target Track Coverage
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#38BDF8', marginTop: '4px' }}>
            78% Aligned
          </div>
        </div>
      </section>

      {/* Clean Table / Row List in Obsidian Container */}
      <section
        style={{
          background: 'rgba(255, 255, 255, 0.015)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '20px',
          overflow: 'hidden',
        }}
      >
        <div className="portal-table-scroll-container">
          <div style={{ minWidth: '580px', display: 'flex', flexDirection: 'column' }}>
          {/* Table Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 2fr 1fr auto',
              padding: '10px 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'rgba(255, 255, 255, 0.4)',
              gap: '16px',
            }}
          >
            <div>Competency</div>
            <div>Category</div>
            <div>Proficiency (1 - 5)</div>
            <div>Evidence Verification</div>
            <div></div>
          </div>

          {skills.map((s) => (
            <div
              key={s.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 2fr 1fr auto',
                padding: '16px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div>
                <span style={{ fontSize: '0.88rem', fontWeight: 500, color: '#FFFFFF' }}>
                  {s.name}
                </span>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.55)' }}>
                {s.category || 'General ML'}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, height: '4px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${s.proficiency * 20}%`, height: '100%', background: '#FFFFFF' }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', minWidth: '40px' }}>
                  Lvl {s.proficiency}
                </span>
              </div>

              <div>
                {s.is_verified ? (
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: '#34D399',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                    }}
                  >
                    <CheckCircle2 size={12} color="#34D399" /> Verified
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: 'rgba(255, 255, 255, 0.45)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    Self-reported
                  </span>
                )}
              </div>

              <div>
                <button
                  onClick={() => handleDelete(s.skill_id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.3)',
                    cursor: 'pointer',
                    padding: '6px',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.3)')}
                  title="Remove competency"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Add Skill Modal */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '20px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              background: '#07090E',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              padding: '28px',
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.8)',
            }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF', margin: '0 0 6px 0' }}>
              Add Technical Competency
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', margin: '0 0 20px 0' }}>
              Self-report skills to update your alignment modeling.
            </p>

            <form onSubmit={handleAddSkill} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '6px' }}>
                  Competency Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PyTorch, Distributed Training, CUDA, Docker"
                  value={newSkill.skill_name}
                  onChange={(e) => setNewSkill({ ...newSkill, skill_name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '6px' }}>
                  Proficiency Rating (1 to 5)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={newSkill.proficiency}
                  onChange={(e) => setNewSkill({ ...newSkill, proficiency: parseInt(e.target.value) })}
                  style={{ width: '100%', accentColor: '#FFFFFF' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.4)', marginTop: '4px' }}>
                  <span>Level 1 (Novice)</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Level {newSkill.proficiency}</span>
                  <span>Level 5 (Expert)</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 18px',
                    borderRadius: '6px',
                    background: '#FFFFFF',
                    color: '#05070D',
                    fontWeight: 600,
                    fontSize: '0.78rem',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Save Competency
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
