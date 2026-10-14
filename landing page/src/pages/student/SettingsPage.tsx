import React, { useState } from 'react';
import { Settings, Shield, Bell, Lock, User, Check, ShieldCheck } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const SettingsPage: React.FC = () => {
  const { success } = useToast();
  const [prefs, setPrefs] = useState({
    notifyNewJobs: true,
    notifyRoadmapReminders: true,
    allowRecruiterDiscovery: true,
    anonymizeUntilShortlist: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    success('Privacy and communication preferences saved successfully!');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* 1. MINIMALIST EDITORIAL HEADER */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px' }}>
              Account Governance • Privacy Controls
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
              Account & Privacy Settings
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '6px', maxWidth: '640px', lineHeight: 1.5 }}>
              Configure employer discovery permissions, telemetry notifications, and cryptographically shielded profile modes.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PREFERENCES FORM */}
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Privacy & Discovery Panel */}
        <section
          style={{
            background: 'rgba(255, 255, 255, 0.015)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '24px 28px',
          }}
        >
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.06em', marginBottom: '4px' }}>
            Accreditation & Visibility
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#FFFFFF', margin: '0 0 18px 0' }}>
            Privacy & Recruiter Discovery
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF' }}>
                  Permit Verified Recruiter Sourcing
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.55)', marginTop: '2px' }}>
                  Allow authenticated enterprise recruiters to match against your verified skill proofs and radar benchmarks.
                </div>
              </div>
              <input
                type="checkbox"
                checked={prefs.allowRecruiterDiscovery}
                onChange={(e) => setPrefs({ ...prefs, allowRecruiterDiscovery: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#34D399', cursor: 'pointer' }}
              />
            </label>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.05)' }} />

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF' }}>
                  Private Profile Shielding
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.55)', marginTop: '2px' }}>
                  Mask contact email and identity until your application is explicitly shortlisted by the employer.
                </div>
              </div>
              <input
                type="checkbox"
                checked={prefs.anonymizeUntilShortlist}
                onChange={(e) => setPrefs({ ...prefs, anonymizeUntilShortlist: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#34D399', cursor: 'pointer' }}
              />
            </label>
          </div>
        </section>

        {/* Notifications Panel */}
        <section
          style={{
            background: 'rgba(255, 255, 255, 0.015)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '24px 28px',
          }}
        >
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.06em', marginBottom: '4px' }}>
            Alerts & Reminders
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#FFFFFF', margin: '0 0 18px 0' }}>
            Telemetry Notifications
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF' }}>
                  High-Match Opportunity Alerts
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.55)', marginTop: '2px' }}>
                  Receive instant alerts whenever a new verified opening with ≥85% match precision is published.
                </div>
              </div>
              <input
                type="checkbox"
                checked={prefs.notifyNewJobs}
                onChange={(e) => setPrefs({ ...prefs, notifyNewJobs: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#34D399', cursor: 'pointer' }}
              />
            </label>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.05)' }} />

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF' }}>
                  Roadmap Milestone Reminders
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.55)', marginTop: '2px' }}>
                  Weekly progress prompts to verify repository deliverables for active learning roadmap phases.
                </div>
              </div>
              <input
                type="checkbox"
                checked={prefs.notifyRoadmapReminders}
                onChange={(e) => setPrefs({ ...prefs, notifyRoadmapReminders: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#34D399', cursor: 'pointer' }}
              />
            </label>
          </div>
        </section>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
          <button
            type="submit"
            style={{
              padding: '8px 22px',
              borderRadius: '5px',
              background: '#FFFFFF',
              color: '#05070D',
              fontSize: '0.825rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Check size={14} />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
