import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, Sparkles, ShieldCheck, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { studentApi } from '../../api/student';
import { useToast } from '../../context/ToastContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  structured_data?: any;
}

export const AssistantPage: React.FC = () => {
  const { error } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hello Alex. I am your grounded CareerBridge AI Partner. I have direct access to your verified portfolio (Stanford Junior, AI/ML track), your 4 certified skills (Python, PyTorch, ML, Data Structures), and live employer requirements on the network.\n\nHow can I help you accelerate your trajectory today?',
      structured_data: {
        recommended_actions: [
          'What roles have the highest match for my verified profile?',
          'What are my highest priority skill gaps for Google DeepMind?',
          'Generate a 3-week study roadmap for Distributed Training',
          'How do I frame my PyTorch project for recruiter review?',
        ],
      },
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || sending) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSending(true);

    try {
      const resp = await studentApi.askAssistant(text);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: resp.content,
          structured_data: resp.structured_data,
        },
      ]);
    } catch (err: any) {
      error(err.message || 'Error communicating with career assistant');
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        minHeight: 'calc(100vh - 160px)',
      }}
    >
      {/* Editorial Header */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '18px', flexShrink: 0 }}>
        <div
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.4)',
            marginBottom: '6px',
          }}
        >
          Career Intelligence Engine
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="portal-page-title" style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
              Contextual AI Career Partner
            </h1>
            <p className="portal-page-subtitle" style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '0.85rem', marginTop: '4px' }}>
              Grounded in verified student competencies, platform skill gap records, and verified employer job postings.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '999px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                color: '#34D399',
                fontSize: '0.72rem',
                fontWeight: 500,
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34D399' }} />
              Telemetry Grounded
            </span>
          </div>
        </div>
      </section>

      {/* Telemetry Strip */}
      <section
        className="portal-telemetry-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '1px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <div style={{ background: '#07090E', padding: '14px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Student Profile Context
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFFFFF', marginTop: '3px' }}>
            Alex Morgan • Junior
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '14px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Verified Skills
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFFFFF', marginTop: '3px' }}>
            4 Certified Modules
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '14px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Target Discipline
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFFFFF', marginTop: '3px' }}>
            AI / Machine Learning
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '14px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Reasoning Grounding
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#38BDF8', marginTop: '3px' }}>
            Deterministic Profile Index
          </div>
        </div>
      </section>

      {/* Main Chat Obsidian Surface */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(255, 255, 255, 0.015)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        {/* Messages Stream */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '14px',
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: m.role === 'user' ? '75%' : '88%',
              }}
            >
              {m.role === 'assistant' && (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <Bot size={16} color="#FFFFFF" />
                </div>
              )}

              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '12px',
                  background:
                    m.role === 'user'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(255, 255, 255, 0.025)',
                  border:
                    m.role === 'user'
                      ? '1px solid rgba(255, 255, 255, 0.16)'
                      : '1px solid rgba(255, 255, 255, 0.06)',
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                }}
              >
                <div style={{ whiteSpace: 'pre-wrap', color: 'rgba(255, 255, 255, 0.9)' }}>{m.content}</div>

                {/* Structured Next Action Chips */}
                {m.structured_data?.recommended_actions && m.structured_data.recommended_actions.length > 0 && (
                  <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {m.structured_data.recommended_actions.map((act: string, aIdx: number) => (
                      <button
                        key={aIdx}
                        onClick={() => handleSend(act)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          color: '#FFFFFF',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                        }}
                      >
                        <Zap size={11} color="rgba(255, 255, 255, 0.6)" />
                        {act}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {m.role === 'user' && (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <User size={16} color="#05070D" />
                </div>
              )}
            </div>
          ))}

          {sending && (
            <div
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                color: 'rgba(255, 255, 255, 0.45)',
                fontSize: '0.8rem',
                paddingLeft: '46px',
              }}
            >
              <RefreshCw size={13} className="spin" style={{ animation: 'spin 1.5s linear infinite' }} />
              Grounding response against student record & opportunity corpus...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(5, 7, 13, 0.7)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{ display: 'flex', gap: '12px' }}
          >
            <input
              type="text"
              placeholder="Ask about skill gaps, learning paths, role requirements, or interview prep..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                fontFamily: 'inherit',
                fontSize: '0.85rem',
                outline: 'none',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 20px',
                borderRadius: '8px',
                background: input.trim() && !sending ? '#FFFFFF' : 'rgba(255, 255, 255, 0.1)',
                color: input.trim() && !sending ? '#05070D' : 'rgba(255, 255, 255, 0.4)',
                fontWeight: 600,
                fontSize: '0.8rem',
                border: 'none',
                cursor: input.trim() && !sending ? 'pointer' : 'not-allowed',
                transition: 'all 0.15s ease',
              }}
            >
              <Send size={14} />
              Ask
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
