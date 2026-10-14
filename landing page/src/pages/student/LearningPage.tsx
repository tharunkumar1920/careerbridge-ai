import React, { useState, useEffect } from 'react';
import { BookOpen, Search, ExternalLink, Star, Clock, Compass, Layers } from 'lucide-react';
import { publicApi } from '../../api/public';

export const LearningPage: React.FC = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi
      .getResources()
      .then(setResources)
      .finally(() => setLoading(false));
  }, []);

  const filtered = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.skill_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiff = difficultyFilter === 'All' || res.difficulty?.toLowerCase() === difficultyFilter.toLowerCase();
    return matchesSearch && matchesDiff;
  });

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
          Curriculum Library
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
              Curated Learning Resources
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '0.85rem', marginTop: '4px' }}>
              Accredited courses, documentation repositories, and labs mapped to specific skill gap closures.
            </p>
          </div>
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
            Total Modules
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            {resources.length || 8} Units
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Curriculum Alignment
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            94% Core Tracks
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Accredited Sources
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            Stanford, MIT, FastAI
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Current Query Match
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#38BDF8', marginTop: '4px' }}>
            {filtered.length} Modules
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
          <Search size={15} style={{ position: 'absolute', left: '14px', top: '12px', color: 'rgba(255, 255, 255, 0.35)' }} />
          <input
            type="text"
            placeholder="Search by topic (e.g. PyTorch, Distributed Systems, Attention, MLOps)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          />
        </div>

        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            background: '#07090E',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#FFFFFF',
            fontSize: '0.8125rem',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="All">All Difficulties</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Resources Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'rgba(255, 255, 255, 0.015)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {item.provider}
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background:
                      item.difficulty === 'Advanced'
                        ? 'rgba(239, 68, 68, 0.1)'
                        : item.difficulty === 'Intermediate'
                        ? 'rgba(167, 139, 250, 0.1)'
                        : 'rgba(16, 185, 129, 0.1)',
                    border:
                      item.difficulty === 'Advanced'
                        ? '1px solid rgba(239, 68, 68, 0.25)'
                        : item.difficulty === 'Intermediate'
                        ? '1px solid rgba(167, 139, 250, 0.25)'
                        : '1px solid rgba(16, 185, 129, 0.25)',
                    color:
                      item.difficulty === 'Advanced'
                        ? '#EF4444'
                        : item.difficulty === 'Intermediate'
                        ? '#A78BFA'
                        : '#34D399',
                  }}
                >
                  {item.difficulty}
                </span>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#FFFFFF', margin: '0 0 8px 0', lineHeight: 1.4 }}>
                {item.title}
              </h3>

              <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                {item.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {(item.tags || []).map((tag: string) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      color: 'rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ display: 'flex', gap: '14px', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.45)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {item.duration_hours} hrs
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B' }}>
                  <Star size={12} fill="#F59E0B" /> {item.rating}
                </span>
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
              >
                Access Lab <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
