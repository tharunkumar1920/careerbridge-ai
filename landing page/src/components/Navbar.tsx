import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, LogOut, Activity, Menu, X, User, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api, BackendHealth } from '../api/client';

interface NavbarProps {
  activeSection?: number;
  onNavigate?: (sectionIndex: number) => void;
  onOpenAuth: (mode: 'student' | 'recruiter', action?: 'login' | 'signin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 0, onNavigate, onOpenAuth }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [health, setHealth] = useState<BackendHealth>({ online: false, message: 'Checking backend...' });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    api.checkHealth().then(setHealth);
    // Periodic check every 30s
    const interval = setInterval(() => {
      api.checkHealth().then(setHealth);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: 'Network', section: 1 },
    { label: 'Intelligence', section: 2 },
    { label: 'Roadmap', section: 3 },
    { label: 'Matcher', section: 4 },
  ];

  const getInitials = (name?: string) => {
    if (!name) return 'CB';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Left: Webpage Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.(0);
            }}
            className="brand-logo"
            aria-label="Skill Link Home"
          >
            <img
              src="/skill-link-icon.png"
              alt="Skill Link Logo"
              style={{ width: '32px', height: '32px', objectFit: 'contain', filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.4))' }}
            />
            <span style={{ letterSpacing: '0.03em', fontWeight: 700 }}>
              SKILL <span style={{ color: 'var(--accent-cyan)' }}>LINK</span>
            </span>
          </a>

          {/* Center-Left: Desktop Section Quick Navigation */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '4px 6px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
            className="desktop-nav-show"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.section;
              return (
                <button
                  key={item.label}
                  onClick={() => onNavigate?.(item.section)}
                  style={{
                    position: 'relative',
                    background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    border: 'none',
                    padding: '5px 12px 7px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="portal-nav-dot" />}
                </button>
              );
            })}
            <Link
              to="/opportunities"
              style={{
                color: 'var(--accent-cyan)',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
            
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="header-actions">
          {/* User Session Check */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link
                to={user.role === 'RECRUITER' ? '/recruiter/dashboard' : '/student/dashboard'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: user.role === 'RECRUITER' ? 'linear-gradient(135deg, #8B5CF6, #38BDF8)' : 'linear-gradient(135deg, #06B6D4, #3B82F6)',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                  }}
                >
                  {getInitials(user.name)}
                </div>
                <div className="portal-user-name-col username-hide-mobile">
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#FFF', lineHeight: 1.1 }}>
                    {user.name?.split(' ')[0] || 'Workspace'}
                  </span>
                  <span className="portal-user-white-dot" title="Active Session" />
                </div>
                <ArrowRight size={14} color="var(--accent-cyan)" />
              </Link>

              <button
                onClick={async () => {
                  await logout();
                  navigate('/');
                }}
                className="btn-ghost"
                title="Sign Out"
                style={{
                  padding: '6px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '6px',
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('student', 'login')}
                className="btn-secondary header-btn"
                aria-label="Log in to existing account"
              >
                <span>Log In</span>
              </button>

              <button
                onClick={() => onOpenAuth('student', 'signin')}
                className="btn-primary header-btn"
                aria-label="Sign in or create account"
              >
                <span>Sign In</span>
              </button>
            </>
          )}

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '6px',
            }}
            className="mobile-nav-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="portal-mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="portal-mobile-drawer"
          style={{ top: '68px' }}
        >
          <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255, 255, 255, 0.4)', padding: '0 4px' }}>
            Sections
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate?.(item.section);
                  setMobileMenuOpen(false);
                }}
                className={`mobile-drawer-link ${activeSection === item.section ? 'active' : ''}`}
                style={{ width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer' }}
              >
                <span style={{ flex: 1 }}>{item.label}</span>
                {activeSection === item.section && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      boxShadow: '0 0 6px #FFFFFF',
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '4px 0' }} />

          <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255, 255, 255, 0.4)', padding: '0 4px' }}>
            Explore
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Link
              to="/opportunities"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-drawer-link"
            >
              <span style={{ color: 'var(--accent-mint)' }}>Opportunities & Jobs</span>
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-drawer-link"
            >
              <span>About Skill Link</span>
            </Link>
          </div>

          {!user && (
            <>
              <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '4px 0' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', paddingTop: '4px' }}>
                <button
                  onClick={() => {
                    onOpenAuth('student', 'login');
                    setMobileMenuOpen(false);
                  }}
                  className="btn-secondary"
                  style={{ padding: '10px', fontSize: '0.85rem' }}
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('student', 'signin');
                    setMobileMenuOpen(false);
                  }}
                  className="btn-primary"
                  style={{ padding: '10px', fontSize: '0.85rem' }}
                >
                  Sign In
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};
