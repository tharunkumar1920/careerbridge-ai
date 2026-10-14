import React from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <div style={{ marginBottom: '40px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            color: '#10B981',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '16px',
          }}
        >
          <Shield size={14} />
          <span>Candidate Privacy Commitment</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#FFFFFF', marginBottom: '12px' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
          Last updated: October 2026 • CareerBridge AI Platform Data Governance
        </p>
      </div>

      <div
        style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          lineHeight: 1.7,
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '0.925rem',
        }}
      >
        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock size={18} color="#06B6D4" /> 1. Data Collection & Student Ownership
          </h2>
          <p>
            CareerBridge AI collects only the educational and professional information necessary to evaluate skill gaps, generate customized roadmaps, and match candidates to verified employers. Your profile data, project links, and resume remain your intellectual property.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Eye size={18} color="#06B6D4" /> 2. Recruiter Visibility & Access Controls
          </h2>
          <p>
            Recruiters cannot browse private unsubmitted contact details or arbitrary profile histories. A recruiter can only view your resume and verified project metrics when you submit an application to one of their active listings or opt in to candidate talent search.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={18} color="#06B6D4" /> 3. AI Diagnostics & Model Training
          </h2>
          <p>
            Your resume text and interview practice answers are processed purely for your personal diagnostics and feedback generation. We do not sell your personal data or provide candidate profiles to third-party ad networks.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={18} color="#10B981" /> 4. Security & Encryption Standards
          </h2>
          <p>
            All communications between client and server are transmitted via TLS encryption. Sensitive credentials and passwords are hash-salted with industrial-grade Bcrypt prior to persistence.
          </p>
        </section>
      </div>
    </div>
  );
};
