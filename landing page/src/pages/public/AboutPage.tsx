import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Cpu, Compass, BookOpen, Briefcase, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px 80px' }}>
      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            background: 'rgba(6, 182, 212, 0.1)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            color: 'var(--accent-cyan, #06B6D4)',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '16px',
          }}
        >
          <Target size={14} />
          <span>The Career Intelligence Mission</span>
        </div>
        <h1 style={{ fontSize: '2.75rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#FFFFFF', marginBottom: '20px', lineHeight: 1.2 }}>
          Bridging the College-to-Industry Divide
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
          College students lack a unified platform that connects their current skills, career goals, skill gaps, future industry trends, preparation activities, and verified internship opportunities.
        </p>
      </div>

      {/* The Core Principle Pipeline */}
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '40px',
          marginBottom: '56px',
        }}
      >
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '24px', textAlign: 'center' }}>
          The Unified Career Intelligence Pipeline
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {[
            { icon: <Target color="#06B6D4" size={20} />, step: '1. Profile & Skills', desc: 'Comprehensive self-reported skills paired with tangible project repository evidence.' },
            { icon: <Cpu color="#3B82F6" size={20} />, step: '2. Skill Gap Analysis', desc: 'Deterministic comparison against real industry role profiles and weightings.' },
            { icon: <Compass color="#8B5CF6" size={20} />, step: '3. Dynamic Roadmap', desc: 'Sequenced learning milestones with curated courses, documentation, and practical exercises.' },
            { icon: <Award color="#EC4899" size={20} />, step: '4. Mock Interviews', desc: 'AI-assisted technical and behavioral interview simulation evaluated against structured rubrics.' },
            { icon: <Briefcase color="#10B981" size={20} />, step: '5. Recruiter Matching', desc: 'Transparent, explainable talent matching connecting verified readiness to genuine openings.' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <div style={{ marginBottom: '12px' }}>{item.icon}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>{item.step}</div>
              <div style={{ fontSize: '0.825rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Architectural Rigor & Principles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '56px' }}>
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '32px',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '16px' }}>
            Why We Avoided Simple Chatbots
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, marginBottom: '16px' }}>
            Generative AI alone without ground truth produces unreliable career advice, fabricated statistics, and hallucinations.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              'Transparent, documented matching formulas without black-box guessing',
              'Skill requirements rooted in real employer job specs and curated frameworks',
              'Real database tracking: roadmaps, milestones, applications, and saved jobs are persisted',
              'Strict separation of student privacy and recruiter access permissions',
            ].map((pt, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                <CheckCircle2 size={16} color="#06B6D4" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '32px',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '16px' }}>
            For Educational Institutions & Recruiters
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, marginBottom: '16px' }}>
            Colleges gain visibility into student readiness while recruiters eliminate keyword guesswork by reviewing demonstrable evidence.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              'Direct evidence verification through GitHub repositories and project demos',
              'Role-specific candidate scoring with required vs. preferred criteria breakdown',
              'Standardized interview feedback rubrics covering reasoning, depth, and clarity',
              'Audit-ready application lifecycle tracking from submission to offer',
            ].map((pt, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Box */}
      <div
        style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12), rgba(59, 130, 246, 0.12))',
          border: '1px solid rgba(6, 182, 212, 0.25)',
          borderRadius: '16px',
          padding: '40px 24px',
        }}
      >
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
          Ready to experience true career intelligence?
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '24px', maxWidth: '550px', margin: '0 auto 24px' }}>
          Create your profile today to calculate your baseline readiness score, generate a personalized learning roadmap, and practice with AI interview rubrics.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <Link
            to="/register"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
              color: '#FFFFFF',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            Get Started as Student
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/opportunities"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            Explore Active Roles
          </Link>
        </div>
      </div>
    </div>
  );
};
