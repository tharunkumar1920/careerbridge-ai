import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Target, 
  Map, 
  FileText, 
  MessageSquare, 
  Briefcase, 
  BarChart3, 
  CheckCircle2, 
  BrainCircuit, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const featureList = [
    {
      icon: <Target size={24} color="#06B6D4" />,
      title: 'Skill Gap & Readiness Intelligence',
      badge: 'Core Engine',
      desc: 'Transparent formula comparing student proficiency and verified project evidence against target roles like AI/ML Engineer, Full Stack Developer, Data Engineer, and DevOps Specialist.',
      bullets: [
        'Deterministic weighting: 70% required skills, 30% preferred skills',
        '+5% bonus for verifiable project evidence links',
        'Direct identification of missing competencies and clear next steps',
      ],
    },
    {
      icon: <Map size={24} color="#3B82F6" />,
      title: 'Dynamic Personalized Learning Roadmaps',
      badge: 'Interactive',
      desc: 'Synthesizes identified skill gaps into step-by-step sequential milestones. Tracks real completion status in the backend with estimated hours and curated tutorials.',
      bullets: [
        'Milestone tracking with backend progress percentage updates',
        'Direct links to official documentation and open courses',
        'Automatic profile skill alignment upon milestone completion',
      ],
    },
    {
      icon: <BrainCircuit size={24} color="#8B5CF6" />,
      title: 'AI Mock Interview Simulator',
      badge: 'GenAI + Rubrics',
      desc: 'Role-specific simulated interview question sets covering algorithms, system architecture, and behavioral situations with rubric-grounded scoring.',
      bullets: [
        'Evaluates response clarity, technical accuracy, and structure',
        'Generates actionable constructive feedback for each answer',
        'Persists session histories and score progressions over time',
      ],
    },
    {
      icon: <FileText size={24} color="#EC4899" />,
      title: 'AI Resume Diagnostics & Optimization',
      badge: 'NLP Analysis',
      desc: 'Safe client-side and server-side text extraction for PDF and plain-text resumes. Compares extracted content against target roles to uncover missing keywords.',
      bullets: [
        'Action verb enhancement suggestions for quantifiable impact',
        'ATS keyword gap comparison against target career requirements',
        'Candidate privacy guaranteed with isolated access controls',
      ],
    },
    {
      icon: <MessageSquare size={24} color="#F59E0B" />,
      title: 'Grounded Career Assistant',
      badge: 'No Hallucinations',
      desc: 'Context-aware AI career advisory grounded in your real stored profile and platform catalog. Will never fabricate nonexistent jobs or make false promises.',
      bullets: [
        'Explains required trade-offs between adjacent career specializations',
        'Offers targeted learning resource suggestions backed by catalog data',
        'Transparent fallback modes if model endpoints are unreachable',
      ],
    },
    {
      icon: <Briefcase size={24} color="#10B981" />,
      title: 'Recruitment & Candidate Sourcing',
      badge: 'Two-Sided Platform',
      desc: 'Allows verified employers to publish internship and job listings, review application pipelines, and search candidate pools with explainable match scores.',
      bullets: [
        'Role status workflows: Submitted -> Under Review -> Shortlisted -> Interview',
        'Candidate search with transparent skill breakdown metrics',
        'Recruiter company profile management and analytics dashboard',
      ],
    },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 80px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.25)',
            color: '#3B82F6',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '16px',
          }}
        >
          <Sparkles size={14} />
          <span>Platform Capabilities</span>
        </div>
        <h1 style={{ fontSize: '2.75rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#FFFFFF', marginBottom: '20px' }}>
          Comprehensive Career Intelligence System
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
          Explore the integrated modules designed to take you from foundational college coursework to verified corporate readiness.
        </p>
      </div>

      {/* Grid of Features */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '28px', marginBottom: '64px' }}>
        {featureList.map((f, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, border-color 0.2s',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {f.icon}
              </div>
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {f.badge}
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
              {f.title}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
              {f.desc}
            </p>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {f.bullets.map((b, bIdx) => (
                  <li key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.825rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                    <CheckCircle2 size={15} color="#06B6D4" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Callout */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          borderRadius: '16px',
          padding: '36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
            Looking to recruit top engineering talent?
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', margin: 0, maxWidth: '600px' }}>
            Recruiter accounts include automated skill matching, verified repository inspections, and application review workflows.
          </p>
        </div>
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
          Create Recruiter Account
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
