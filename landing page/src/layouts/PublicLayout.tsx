import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, ArrowRight, Home, Info, Layers, Compass, LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSmoothNavIndicator } from '../components/shared/useSmoothNavIndicator';

export const PublicLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { navRef, setItemRef, indicatorRef } = useSmoothNavIndicator(location.pathname);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'About', href: '/about', icon: Info },
    { label: 'Features', href: '/features', icon: Layers },
    { label: 'Opportunities', href: '/opportunities', icon: Compass },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary, #090D16)', color: 'var(--text-primary, #F8FAFC)' }}>
      {/* Top Navigation */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(16px)',
          background: 'rgba(9, 13, 22, 0.85)',
          borderBottom: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img
              src="/skill-link-icon.png"
              alt="Skill Link"
              style={{ width: '32px', height: '32px', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.35))' }}
            />
            <span style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: '#FFFFFF', letterSpacing: '0.03em' }}>
              SKILL <span style={{ color: 'var(--accent-cyan, #06B6D4)' }}>LINK</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            ref={navRef}
            style={{
              position: 'relative',
              display: 'none',
              alignItems: 'center',
              gap: '28px',
            }}
            className="desktop-nav-show"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  ref={(el) => setItemRef(link.href, el)}
                  to={link.href}
                  style={{
                    position: 'relative',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 600 : 500,
                    textDecoration: 'none',
                    color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                    transition: 'color 0.2s',
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '4px 0 6px 0',
                  }}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <span
              ref={indicatorRef}
              className="portal-nav-sliding-dot"
              aria-hidden="true"
            />
          </nav>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {user ? (
              <Link
                to={user.role === 'RECRUITER' ? '/recruiter/dashboard' : '/student/dashboard'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.3))',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div className="portal-user-name-col">
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.1 }}>
                    {user.name?.split(' ')[0] || 'Portal'}
                  </span>
                  <span className="portal-user-white-dot" title="Active Session" />
                </div>
                <ArrowRight size={14} color="var(--accent-cyan)" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  style={{
                    background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
                    color: '#FFFFFF',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                padding: '8px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
              className="mobile-nav-toggle"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Backdrop Overlay */}
        {mobileMenuOpen && (
          <div
            className="portal-mobile-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Luxury Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="portal-mobile-drawer" role="dialog" aria-label="Mobile Navigation">
            {user ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF' }}>{user.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.5)' }}>Active Session</div>
                </div>
                <Link
                  to={user.role === 'RECRUITER' ? '/recruiter/dashboard' : '/student/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--accent-cyan)',
                    textDecoration: 'none',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: 'rgba(6, 182, 212, 0.1)',
                  }}
                >
                  Dashboard <ArrowRight size={12} />
                </Link>
              </div>
            ) : null}

            <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255, 255, 255, 0.4)', padding: '0 4px' }}>
              Pages
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                const IconComp = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`mobile-drawer-link ${isActive ? 'active' : ''}`}
                  >
                    <IconComp size={16} color={isActive ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.6)'} />
                    <span style={{ flex: 1 }}>{link.label}</span>
                    {isActive && (
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
                  </Link>
                );
              })}
            </div>

            {!user && (
              <>
                <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)', margin: '4px 0' }} />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#FFFFFF',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    <LogIn size={15} />
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
                      color: '#FFFFFF',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    <UserPlus size={15} />
                    Get Started
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
          background: 'rgba(5, 7, 13, 0.95)',
          padding: '48px 24px 24px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            marginBottom: '40px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <img
                src="/skill-link-icon.png"
                alt="Skill Link"
                style={{ width: '26px', height: '26px', objectFit: 'contain' }}
              />
              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#FFFFFF', letterSpacing: '0.03em' }}>
                SKILL <span style={{ color: 'var(--accent-cyan, #06B6D4)' }}>LINK</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: '280px' }}>
              Intelligent Career Guidance, Skill Gap Analytics & Recruitment Platform connecting college talent directly to industry roles.
            </p>
          </div>

          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '12px', letterSpacing: '0.05em' }}>
              Navigation
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><Link to="/" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem' }}>Home Overview</Link></li>
              <li><Link to="/about" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem' }}>About Platform</Link></li>
              <li><Link to="/features" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem' }}>Key Features</Link></li>
              <li><Link to="/opportunities" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem' }}>Open Opportunities</Link></li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '12px', letterSpacing: '0.05em' }}>
              Portals
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><Link to="/login" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem' }}>Student Login</Link></li>
              <li><Link to="/register" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem' }}>Student Registration</Link></li>
              <li><Link to="/login" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem' }}>Recruiter Portal</Link></li>
              <li><Link to="/register" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem' }}>Hire Campus Talent</Link></li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '12px', letterSpacing: '0.05em' }}>
              Legal & Trust
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><Link to="/privacy" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem' }}>Privacy Policy</Link></li>
              <li><Link to="/terms" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem' }}>Terms of Service</Link></li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: '4px' }}>
                <ShieldCheck size={14} color="#10B981" />
                <span>Protected Candidate Data</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          <div>© {new Date().getFullYear()} Skill Link. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Deterministic Scoring</span>
            <span>•</span>
            <span>Grounded AI Guidance</span>
            <span>•</span>
            <span>Zero Hallucination Guarantee</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
