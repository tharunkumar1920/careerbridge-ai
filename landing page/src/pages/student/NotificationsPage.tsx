import React, { useState } from 'react';
import { Bell, CheckCircle2, Briefcase, Sparkles, BookOpen, Clock, Check } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New AI/ML Engineer Role Matching Your Profile',
      desc: 'DeepMind published a Research Intern role with a 95% match for your PyTorch and Python skill set.',
      time: '2 hours ago',
      type: 'job',
      read: false,
    },
    {
      id: '2',
      title: 'Roadmap Milestone Recommendation',
      desc: 'Based on your recent project update, next recommended milestone is "Transformer Architecture Deep Dive".',
      time: '1 day ago',
      type: 'roadmap',
      read: false,
    },
    {
      id: '3',
      title: 'Interview Practice Rubric Ready',
      desc: 'Your recent answers on "Distributed Model Training" have been evaluated with detailed rubric feedback.',
      time: '2 days ago',
      type: 'interview',
      read: true,
    },
    {
      id: '4',
      title: 'Credential Verification Confirmed',
      desc: 'Stanford University verified enrollment status for junior academic standing.',
      time: '3 days ago',
      type: 'audit',
      read: true,
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

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
          Activity Stream
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
              Notifications & Signals
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '0.85rem', marginTop: '4px' }}>
              Automated telemetry alerts for matching opportunities, roadmap milestones, and recruiter reviews.
            </p>
          </div>

          <button
            onClick={markAllRead}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              fontWeight: 500,
              fontSize: '0.78rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Check size={13} />
            Mark All as Read
          </button>
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
            Unread Alerts
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: unreadCount > 0 ? '#38BDF8' : '#FFFFFF', marginTop: '4px' }}>
            {unreadCount} Active
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Matching Positions
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            1 New Signal
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Milestone Progress
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
            Phase 02 Ready
          </div>
        </div>
        <div style={{ background: '#07090E', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)' }}>
            Telemetry Status
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#34D399', marginTop: '4px' }}>
            Live Stream
          </div>
        </div>
      </section>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '20px 24px',
              borderRadius: '12px',
              background: n.read ? 'rgba(255, 255, 255, 0.015)' : 'rgba(255, 255, 255, 0.035)',
              border: n.read ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(255, 255, 255, 0.14)',
              transition: 'all 0.15s ease',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background:
                  n.type === 'job'
                    ? 'rgba(16, 185, 129, 0.1)'
                    : n.type === 'roadmap'
                    ? 'rgba(56, 189, 248, 0.1)'
                    : 'rgba(167, 139, 250, 0.1)',
                border:
                  n.type === 'job'
                    ? '1px solid rgba(16, 185, 129, 0.25)'
                    : n.type === 'roadmap'
                    ? '1px solid rgba(56, 189, 248, 0.25)'
                    : '1px solid rgba(167, 139, 250, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {n.type === 'job' && <Briefcase size={16} color="#34D399" />}
              {n.type === 'roadmap' && <BookOpen size={16} color="#38BDF8" />}
              {n.type === 'interview' && <Sparkles size={16} color="#A78BFA" />}
              {n.type === 'audit' && <CheckCircle2 size={16} color="#34D399" />}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                    {n.title}
                  </h3>
                  {!n.read && (
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#38BDF8',
                        display: 'inline-block',
                      }}
                    />
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.72rem' }}>
                  <Clock size={11} />
                  <span>{n.time}</span>
                </div>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>
                {n.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
