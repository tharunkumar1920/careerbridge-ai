import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, Sparkles, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { studentApi, ResumeAnalysisData } from '../../api/student';
import { useToast } from '../../context/ToastContext';

export const ResumePage: React.FC = () => {
  const { success, error } = useToast();
  const [analysis, setAnalysis] = useState<ResumeAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [targetRole, setTargetRole] = useState('ai-ml');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    studentApi
      .getLatestResume()
      .then(setAnalysis)
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      error('Please select a PDF or TXT file to upload');
      return;
    }

    setUploading(true);
    try {
      const data = await studentApi.uploadResume(selectedFile, targetRole);
      setAnalysis(data);
      success('Resume analyzed successfully with ATS & skill extractors!');
    } catch (err: any) {
      error(err.message || 'Failed to analyze resume');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* 1. MINIMALIST EDITORIAL HEADER */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px' }}>
              Document Intelligence • ATS Keyword Parsers
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
              Resume ATS & Skill Intelligence
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '6px', maxWidth: '640px', lineHeight: 1.5 }}>
              Deterministic parsing, keyword density benchmarks against verified job postings, and high-impact action-verb improvements.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              to="/student/interview"
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
              Practice Mock Interview →
            </Link>
          </div>
        </div>

        {/* Inline Monochromatic Metric Telemetry Strip */}
        {analysis && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '32px',
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
                ATS Alignment
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#34D399', marginTop: '2px' }}>
                {analysis.analysis_score}%
              </div>
            </div>

            <div style={{ width: '1px', height: '28px', background: 'rgba(255, 255, 255, 0.08)' }} />

            <div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
                Extracted Skills
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
                {analysis.parsed_skills.length} <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.4)' }}>Keywords</span>
              </div>
            </div>

            <div style={{ width: '1px', height: '28px', background: 'rgba(255, 255, 255, 0.08)' }} />

            <div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
                Missing Keywords
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: analysis.missing_critical_skills.length > 0 ? '#FBBF24' : '#34D399', marginTop: '2px' }}>
                {analysis.missing_critical_skills.length}
              </div>
            </div>

            <div style={{ width: '1px', height: '28px', background: 'rgba(255, 255, 255, 0.08)' }} />

            <div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.04em' }}>
                Analyzed Document
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.85)', marginTop: '5px' }}>
                {analysis.filename}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2. UPLOAD & TARGET ROLE CARD */}
      <section
        style={{
          background: 'rgba(255, 255, 255, 0.015)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '24px 28px',
        }}
      >
        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.06em', marginBottom: '4px' }}>
          Document Upload
        </div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#FFFFFF', margin: '0 0 16px 0' }}>
          Upload New Resume Revision
        </h3>

        <form onSubmit={handleUpload}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '6px' }}>
                Target Benchmark Role
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  background: '#0A0F1D',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              >
                <option value="ai-ml">AI / Machine Learning Engineer</option>
                <option value="full-stack">Full-Stack Systems Engineer</option>
                <option value="data-science">Data Scientist & Quantitative Analyst</option>
                <option value="devops-cloud">Cloud & Distributed Systems Architect</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '6px' }}>
                Select File (PDF or TXT up to 10MB)
              </label>
              <input
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileChange}
                style={{
                  width: '100%',
                  padding: '7px 12px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.85rem',
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={uploading || !selectedFile}
              style={{
                padding: '8px 20px',
                borderRadius: '5px',
                background: selectedFile ? '#FFFFFF' : 'rgba(255, 255, 255, 0.08)',
                color: selectedFile ? '#05070D' : 'rgba(255, 255, 255, 0.3)',
                fontSize: '0.825rem',
                fontWeight: 600,
                border: 'none',
                cursor: selectedFile ? 'pointer' : 'not-allowed',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <UploadCloud size={15} />
              <span>{uploading ? 'Analyzing with NLP extractors...' : 'Analyze Resume'}</span>
            </button>
          </div>
        </form>
      </section>

      {/* 3. ANALYSIS RESULTS MATRICES */}
      {analysis && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
          {/* Left Column: Skills & Raw Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Parsed Technical Skills */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '24px 28px',
              }}
            >
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.06em', marginBottom: '4px' }}>
                Extracted Competencies
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#FFFFFF', margin: '0 0 12px 0' }}>
                Parsed Technical Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {analysis.parsed_skills.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '3px 9px',
                      borderRadius: '4px',
                      background: 'rgba(52, 211, 153, 0.1)',
                      color: '#34D399',
                      border: '1px solid rgba(52, 211, 153, 0.25)',
                    }}
                  >
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Critical Skills */}
            {analysis.missing_critical_skills.length > 0 && (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.015)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: '14px',
                  padding: '24px 28px',
                }}
              >
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#FBBF24', letterSpacing: '0.06em', marginBottom: '4px' }}>
                  ATS Gap Detection
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#FFFFFF', margin: '0 0 12px 0' }}>
                  Missing Target Keywords
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {analysis.missing_critical_skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '3px 9px',
                        borderRadius: '4px',
                        background: 'rgba(245, 158, 11, 0.1)',
                        color: '#FBBF24',
                        border: '1px solid rgba(245, 158, 11, 0.25)',
                      }}
                    >
                      Missing: {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Text Preview */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '24px 28px',
              }}
            >
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.06em', marginBottom: '4px' }}>
                Safe Ingestion Preview
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#FFFFFF', margin: '0 0 12px 0' }}>
                Extracted Document Text
              </h3>
              <pre
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.65)',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '14px',
                  borderRadius: '6px',
                  maxHeight: '160px',
                  overflowY: 'auto',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                {analysis.extracted_text_preview}
              </pre>
            </div>
          </div>

          {/* Right Column: Improvements & Formatting */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Impact Improvements */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '24px 28px',
              }}
            >
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.06em', marginBottom: '4px' }}>
                Action-Verb Optimization
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#FFFFFF', margin: '0 0 12px 0' }}>
                High-Impact Bullet Enhancements
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(analysis.impact_enhancement_suggestions || []).map((sug, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '8px',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', color: '#F87171', textDecoration: 'line-through', marginBottom: '4px' }}>
                      "{sug.weak_phrase}"
                    </div>
                    <div style={{ fontSize: '0.825rem', color: '#34D399', fontWeight: 500 }}>
                      → "{sug.recommended_enhancement}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Structural Check */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '24px 28px',
              }}
            >
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.06em', marginBottom: '4px' }}>
                Formatting Diagnostic
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#FFFFFF', margin: '0 0 12px 0' }}>
                Structural Health Check
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {analysis.formatting_issues.length === 0 ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34D399', fontSize: '0.85rem' }}>
                    <CheckCircle2 size={16} /> Clean formatting and structural headers detected!
                  </div>
                ) : (
                  analysis.formatting_issues.map((iss, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FBBF24', fontSize: '0.825rem' }}>
                      <AlertTriangle size={15} style={{ flexShrink: 0 }} />
                      <span>{iss}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
