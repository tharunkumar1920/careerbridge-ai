import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'optimal' | 'moderate' | 'critical' | 'cyan' | 'lavender' | 'neutral';
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', style }) => {
  const getBadgeColors = () => {
    switch (variant) {
      case 'optimal':
        return {
          bg: 'rgba(52, 211, 153, 0.12)',
          text: '#34D399',
          border: 'rgba(52, 211, 153, 0.25)',
        };
      case 'moderate':
        return {
          bg: 'rgba(251, 191, 36, 0.12)',
          text: '#FBBF24',
          border: 'rgba(251, 191, 36, 0.25)',
        };
      case 'critical':
        return {
          bg: 'rgba(239, 68, 68, 0.12)',
          text: '#F87171',
          border: 'rgba(239, 68, 68, 0.25)',
        };
      case 'cyan':
        return {
          bg: 'rgba(56, 189, 248, 0.12)',
          text: '#38BDF8',
          border: 'rgba(56, 189, 248, 0.25)',
        };
      case 'lavender':
        return {
          bg: 'rgba(167, 139, 250, 0.12)',
          text: '#A78BFA',
          border: 'rgba(167, 139, 250, 0.25)',
        };
      default:
        return {
          bg: 'rgba(255, 255, 255, 0.06)',
          text: 'var(--text-secondary)',
          border: 'var(--border-subtle)',
        };
    }
  };

  const colors = getBadgeColors();

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '3px 10px',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        background: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        ...style,
      }}
    >
      {children}
    </span>
  );
};
