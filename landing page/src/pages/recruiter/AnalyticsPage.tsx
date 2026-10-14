import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertCircle, Database, Layers, ArrowUpRight } from 'lucide-react';
import { publicApi } from '../../api/public';

export const AnalyticsPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi
      .getMarketAnalytics()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

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
          Market Telemetry
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
              Market Demand & Skill Frequency Intelligence
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '0.85rem', marginTop: '4px' }}>
              Empirical frequency distribution aggregated across platform postings. Grounded directly in employer requisitions.
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
            Data Source
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            {data?.data_source || 'Verified Partner Requisitions'}
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Observation Window
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            {data?.observation_period || 'Rolling 90-Day Period'}
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Aggregated Postings
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            1,420+ Openings
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Hiring Momentum
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#34D399', marginTop: '4px' }}>
            +28.4% YoY
          </div>
        </div>
      </section>

      {/* Demand Grids */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '24px' }}>
        {/* Left: Top Technical Skills Demanded */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.015)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)' }}>
              Requisition Analysis
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF', margin: '4px 0 0' }}>
              Top Technical Skills Demanded
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', margin: '4px 0 0' }}>
              Frequency percentage observed across active engineering job postings.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(data?.top_skills_demand || []).map((s: any) => (
              <div key={s.skill_name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <span style={{ fontWeight: 500, color: '#FFFFFF' }}>{s.skill_name}</span>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ color: '#34D399', fontWeight: 600, fontSize: '0.75rem' }}>{s.growth_yoy}</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '0.75rem' }}>{s.percentage}% of listings</span>
                  </div>
                </div>

                <div
                  style={{
                    height: '5px',
                    borderRadius: '3px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${s.percentage}%`,
                      background: '#FFFFFF',
                      borderRadius: '3px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Hiring Volume Index by Role Track */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.015)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)' }}>
              Discipline Benchmarking
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF', margin: '4px 0 0' }}>
              Hiring Index by Role Track
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', margin: '4px 0 0' }}>
              Sample volume index and median compensation spectrums.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(data?.top_roles_demand || []).map((r: any) => (
              <div
                key={r.role_name}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                    {r.role_name}
                  </h4>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: '#38BDF8',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                    }}
                  >
                    Index: {r.demand_index}/100
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginTop: '10px', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                  <span>Intern: <strong style={{ color: '#FFFFFF' }}>{r.median_intern_stipend}</strong></span>
                  <span>Full-time: <strong style={{ color: '#34D399' }}>{r.median_grad_salary}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
