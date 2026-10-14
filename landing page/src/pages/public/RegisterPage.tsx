import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, Building, ArrowRight, UserCheck, Briefcase, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<'student' | 'recruiter'>('student');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !password) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (role === 'recruiter' && !companyName) {
      showToast('Company name is required for recruiter accounts', 'error');
      return;
    }

    setLoading(true);
    try {
      await register({
        email,
        name: fullName,
        password,
        role: role === 'recruiter' ? 'RECRUITER' : 'STUDENT',
        university_or_company: role === 'recruiter' ? companyName : undefined,
      });
      showToast('Account registered successfully!', 'success');
      if (role === 'recruiter') {
        navigate('/recruiter/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err: any) {
      showToast(err.message || 'Registration failed. Email may already be in use.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto 80px', padding: '0 20px' }}>
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '36px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img
            src="/skill-link-icon.png"
            alt="Skill Link"
            style={{ width: '48px', height: '48px', objectFit: 'contain', margin: '0 auto 12px auto', display: 'block', filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.4))' }}
          />
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
            Create Your Account
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
            Join Skill Link as a Student or Recruiter
          </p>
        </div>

        {/* Account Type Toggle */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '4px',
            borderRadius: '10px',
            marginBottom: '20px',
          }}
        >
          <button
            type="button"
            onClick={() => setRole('student')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '9px',
              borderRadius: '7px',
              border: 'none',
              background: role === 'student' ? 'linear-gradient(135deg, #06B6D4, #3B82F6)' : 'transparent',
              color: role === 'student' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <UserCheck size={15} />
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole('recruiter')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '9px',
              borderRadius: '7px',
              border: 'none',
              background: role === 'recruiter' ? 'linear-gradient(135deg, #06B6D4, #3B82F6)' : 'transparent',
              color: role === 'recruiter' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <Briefcase size={15} />
            Recruiter
          </button>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.8)', marginBottom: '5px' }}>
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} color="rgba(255, 255, 255, 0.4)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Morgan"
                style={{
                  width: '100%',
                  padding: '9px 14px 9px 38px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.8)', marginBottom: '5px' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="rgba(255, 255, 255, 0.4)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'student' ? 'alex@university.edu' : 'alex@company.com'}
                style={{
                  width: '100%',
                  padding: '9px 14px 9px 38px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {role === 'recruiter' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.8)', marginBottom: '5px' }}>
                Company Organization
              </label>
              <div style={{ position: 'relative' }}>
                <Building size={16} color="rgba(255, 255, 255, 0.4)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Apex Technologies"
                  style={{
                    width: '100%',
                    padding: '9px 14px 9px 38px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '0.875rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.8)', marginBottom: '5px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="rgba(255, 255, 255, 0.4)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => setCapsLockOn(e.getModifierState('CapsLock'))}
                onKeyUp={(e) => setCapsLockOn(e.getModifierState('CapsLock'))}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '9px 40px 9px 38px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {capsLockOn && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '0.7rem', color: '#FBBF24' }}>
                <AlertCircle size={11} />
                <span>Caps Lock is ON</span>
              </div>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.8)', marginBottom: '5px' }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="rgba(255, 255, 255, 0.4)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '9px 40px 9px 38px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '10px',
            }}
          >
            {loading ? 'Creating Account...' : `Register as ${role === 'student' ? 'Student' : 'Recruiter'}`}
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.825rem', color: 'rgba(255, 255, 255, 0.6)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent-cyan, #06B6D4)', fontWeight: 600, textDecoration: 'none' }}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
