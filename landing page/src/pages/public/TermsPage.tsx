import React from 'react';
import { FileCheck, ShieldAlert, Award, Scale } from 'lucide-react';

export const TermsPage: React.FC = () => {
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
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.25)',
            color: '#3B82F6',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '16px',
          }}
        >
          <Scale size={14} />
          <span>Platform Agreement</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#FFFFFF', marginBottom: '12px' }}>
          Terms of Service
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
          Effective: October 2026 • Skill Link Student and Employer Terms
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
            <FileCheck size={18} color="#06B6D4" /> 1. Platform Purpose & Career Guidance
          </h2>
          <p>
            Skill Link delivers structured career intelligence, objective skill-gap evaluations, and personalized learning roadmaps. While our algorithms provide explainable match scores and preparation feedback, Skill Link does not guarantee employment, internship placements, or hiring outcomes.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={18} color="#06B6D4" /> 2. Accurate Representation of Skills & Projects
          </h2>
          <p>
            Users agree to provide truthful representations of academic background, self-reported skills, and project contributions. Falsification of repository links, credentials, or employer identities may result in immediate suspension.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldAlert size={18} color="#06B6D4" /> 3. Responsible AI Interaction
          </h2>
          <p>
            Users agree not to exploit or abuse the Mock Interview Simulator or Career Assistant services with malicious prompts, prompt injections, or unauthorized automated scraping.
          </p>
        </section>
      </div>
    </div>
  );
};
