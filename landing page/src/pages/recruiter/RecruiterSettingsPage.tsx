import React, { useState } from 'react';
import { Settings, ShieldCheck, Bell, Save, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const RecruiterSettingsPage: React.FC = () => {
  const { success } = useToast();
  const [settings, setSettings] = useState({
    autoNotifyMatch: true,
    requireProjectProof: true,
    emailDailyDigest: false,
    requireInstitutionalVerification: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    success('Recruiter pipeline settings updated successfully.');
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
          Pipeline Governance
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
              Recruiter Portal Settings
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '0.85rem', marginTop: '4px' }}>
              Configure talent screening thresholds, notification digests, and verified credential enforcement.
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
            Proof Standard
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            Verified Commits
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Alert Threshold
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            ≥85% Match Only
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Notification Mode
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            Immediate Telemetry
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Compliance Status
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#34D399', marginTop: '4px' }}>
            GDPR / Equal Merit
          </div>
        </div>
      </section>

      {/* Settings Form in Obsidian Box */}
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.015)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
              Candidate Sourcing & Screening Thresholds
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', margin: '4px 0 0' }}>
              Control automated filtering criteria and applicant qualification filters.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 500, color: '#FFFFFF' }}>
                  Require Verified Project Artifact
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '2px' }}>
                  Prioritize applicants who have demonstrated skills in public audited code repositories.
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.requireProjectProof}
                onChange={(e) => setSettings({ ...settings, requireProjectProof: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#FFFFFF' }}
              />
            </label>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)' }} />

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 500, color: '#FFFFFF' }}>
                  Instant Alerts for High-Match Applicants (≥85%)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '2px' }}>
                  Trigger real-time telemetry alert when an exceptional candidate submits an application.
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.autoNotifyMatch}
                onChange={(e) => setSettings({ ...settings, autoNotifyMatch: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#FFFFFF' }}
              />
            </label>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)' }} />

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 500, color: '#FFFFFF' }}>
                  Require Institutional Verification
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '2px' }}>
                  Only surface candidates with verified university enrollment and degree standing.
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.requireInstitutionalVerification}
                onChange={(e) => setSettings({ ...settings, requireInstitutionalVerification: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#FFFFFF' }}
              />
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            style={{
              padding: '10px 24px',
              borderRadius: '6px',
              background: '#FFFFFF',
              color: '#05070D',
              fontWeight: 600,
              fontSize: '0.8rem',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Save size={14} />
            Save Recruiter Settings
          </button>
        </div>
      </form>
    </div>
  );
};
