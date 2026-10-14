import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  Building,
  PlusCircle,
  Settings,
  LogOut,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  LayoutDashboard,
  Briefcase,
  Compass,
  FileText,
  Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSmoothNavIndicator } from '../components/shared/useSmoothNavIndicator';

interface TopNavLink {
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
}

export const RecruiterLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Desktop Top Navigation Hook
  const { navRef, pillRef, setItemRef, indicatorRef } = useSmoothNavIndicator(location.pathname);

  // Mobile Bottom Navigation Dock Hook
  const mobileNav = useSmoothNavIndicator(location.pathname);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Curated, slim, single-line text options pushed to the right
  const primaryNavItems: TopNavLink[] = [
    { label: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
    { label: 'Job Postings', path: '/recruiter/jobs', icon: FileText },
    { label: 'Pipeline', path: '/recruiter/applications', icon: Briefcase },
    { label: 'Talent Search', path: '/recruiter/candidates', icon: Users },
    { label: 'Analytics', path: '/recruiter/analytics', icon: Sparkles },
  ];

  // Mobile 5 quick tabs
  const mobileDockItems = [
    { label: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
    { label: 'Jobs', path: '/recruiter/jobs', icon: FileText },
    { label: 'Pipeline', path: '/recruiter/applications', icon: Briefcase },
    { label: 'Talent', path: '/recruiter/candidates', icon: Users },
    { label: 'Trends', path: '/recruiter/analytics', icon: Sparkles },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getInitials = (name?: string) => {
    if (!name) return 'RC';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary, #05070D)', color: 'var(--text-primary)' }}>
      {/* 1. SLIM & SUBTLE TOP NAVIGATION BAR */}
      <header
        className="portal-top-navbar"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          background: 'rgba(5, 7, 13, 0.92)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 24px',
            height: '54px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* Left: Brand Identity */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={13} color="#FFFFFF" />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem', color: '#FFFFFF', letterSpacing: '-0.01em' }}>
              CareerBridge<span style={{ color: 'var(--accent-mint, #34D399)' }}>RECRUIT</span>
            </span>
          </Link>

          {/* Right: Pushed to the right in a single horizontal line, slim & small text, reduced colors */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto', flexShrink: 0 }}>
            <nav
              ref={navRef}
              style={{
                position: 'relative',
                display: 'none',
                alignItems: 'center',
                gap: '2px',
                whiteSpace: 'nowrap',
                flexWrap: 'nowrap',
              }}
              className="desktop-top-nav"
            >
              {/* Sliding Active Background Pill */}
              <span
                ref={pillRef}
                className="portal-nav-sliding-pill"
                aria-hidden="true"
              />

              {primaryNavItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    ref={(el) => setItemRef(item.path, el)}
                    to={item.path}
                    className={`portal-nav-link ${isActive ? 'active' : ''}`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <span
                ref={indicatorRef}
                className="portal-nav-sliding-dot"
                aria-hidden="true"
              />
            </nav>

            {/* Subtle Divider */}
            <div
              style={{
                width: '1px',
                height: '16px',
                background: 'rgba(255, 255, 255, 0.08)',
                margin: '0 4px',
                display: 'none',
              }}
              className="desktop-top-nav"
            />

            {/* Post Job Action (Slim & subtle) */}
            <Link
              to="/recruiter/jobs/new"
              className="recruiter-post-role-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '5px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
            >
              <PlusCircle size={12} />
              <span>Post Role</span>
            </Link>

            {/* Recruiter Profile Dropdown Pill */}
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '3px 10px 3px 4px',
                  borderRadius: '9999px',
                  background: profileMenuOpen ? 'rgba(255, 255, 255, 0.09)' : 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.4))',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                  }}
                >
                  {getInitials(user?.name)}
                </div>
                <div className="portal-user-name-col">
                  <span className="portal-user-name-text username-hide-mobile">
                    {user?.name?.split(' ')[0] || 'Recruiter'}
                  </span>
                  <span className="portal-user-white-dot" title="Active Session" />
                </div>
                <ChevronDown size={11} color="rgba(255, 255, 255, 0.5)" style={{ transform: profileMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
              </button>

              {/* Dropdown Menu */}
              {profileMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    right: 0,
                    width: '210px',
                    borderRadius: '10px',
                    background: 'rgba(10, 14, 26, 0.96)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5)',
                    padding: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1px',
                    zIndex: 150,
                    animation: 'fadeInUp 0.15s ease-out',
                  }}
                >
                  <div style={{ padding: '8px 10px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', marginBottom: '3px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFFFFF' }}>{user?.name || 'Recruiter'}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.45)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user?.email}
                    </div>
                  </div>

                  <Link
                    to="/recruiter/company"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 8px',
                      borderRadius: '5px',
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <Building size={13} color="rgba(255, 255, 255, 0.6)" />
                    <span>Company Organization</span>
                  </Link>

                  <Link
                    to="/recruiter/settings"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 8px',
                      borderRadius: '5px',
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <Settings size={13} color="rgba(255, 255, 255, 0.6)" />
                    <span>Settings & Team</span>
                  </Link>

                  <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)', margin: '3px 0' }} />

                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 8px',
                      borderRadius: '5px',
                      fontSize: '0.75rem',
                      color: '#EF4444',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <LogOut size={13} color="#EF4444" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                cursor: 'pointer',
              }}
              className="mobile-nav-toggle-btn"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
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
            {/* User Profile Header Card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8B5CF6, #38BDF8)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                }}
              >
                {getInitials(user?.name)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user?.name || 'Sarah Chen'}
                  </span>
                  <span className="portal-user-white-dot" title="Active Session" />
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '2px' }}>
                  Recruiter • Google DeepMind
                </div>
              </div>
            </div>

            {/* Navigation Category Label */}
            <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255, 255, 255, 0.4)', padding: '0 4px' }}>
              Recruiter Navigation
            </div>

            {/* Core Links List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {primaryNavItems.map((item) => {
                const isActive = location.pathname === item.path;
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`mobile-drawer-link ${isActive ? 'active' : ''}`}
                  >
                    <IconComponent size={16} color={isActive ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.6)'} />
                    <span style={{ flex: 1 }}>{item.label}</span>
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

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)', margin: '4px 0' }} />

            {/* Quick Actions */}
            <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255, 255, 255, 0.4)', padding: '0 4px' }}>
              Quick Actions
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Link
                to="/recruiter/jobs/new"
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-drawer-link ${location.pathname === '/recruiter/jobs/new' ? 'active' : ''}`}
              >
                <PlusCircle size={16} color="var(--accent-cyan)" />
                <span>Post New Role</span>
              </Link>
              <Link
                to="/recruiter/company"
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-drawer-link ${location.pathname === '/recruiter/company' ? 'active' : ''}`}
              >
                <Building size={16} color="rgba(255, 255, 255, 0.6)" />
                <span>Company Profile</span>
              </Link>
              <Link
                to="/recruiter/settings"
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-drawer-link ${location.pathname === '/recruiter/settings' ? 'active' : ''}`}
              >
                <Settings size={16} color="rgba(255, 255, 255, 0.6)" />
                <span>Settings</span>
              </Link>
            </div>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)', margin: '4px 0' }} />

            {/* Logout Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#EF4444',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <LogOut size={16} color="#EF4444" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </header>

      {/* 2. MAIN WORKSPACE CONTAINER (Responsive Mobile Padding) */}
      <main className="portal-workspace-main">
        <Outlet />
      </main>

      {/* 3. MOBILE FLOATING BOTTOM NAVIGATION DOCK */}
      <nav ref={mobileNav.navRef} className="portal-mobile-bottom-dock" aria-label="Mobile Navigation">
        <span ref={mobileNav.pillRef} className="mobile-dock-pill" aria-hidden="true" />
        {mobileDockItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComp = item.icon;
          return (
            <Link
              key={item.path}
              ref={(el) => mobileNav.setItemRef(item.path, el)}
              to={item.path}
              className={`mobile-dock-item ${isActive ? 'active' : ''}`}
            >
              <IconComp size={16} color={isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'} />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <span ref={mobileNav.indicatorRef} className="mobile-dock-dot" aria-hidden="true" />
      </nav>
    </div>
  );
};
