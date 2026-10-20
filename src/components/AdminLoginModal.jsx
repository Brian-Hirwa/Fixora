import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle, X, Sparkles, ArrowRight } from 'lucide-react';
import { useMaintenance } from '../context/MaintenanceContext';

export default function AdminLoginModal() {
  const { showLoginModal, setShowLoginModal, loginAdmin } = useMaintenance();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!showLoginModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      const res = loginAdmin(email, password);
      if (!res.success) {
        setErrorMessage(res.error);
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
        setEmail('');
        setPassword('');
      }
    }, 250);
  };

  const handleQuickFill = () => {
    setEmail('fixora@gmail.com');
    setPassword('fixora123');
    setErrorMessage('');
  };

  const handleClose = () => {
    setShowLoginModal(false);
    setErrorMessage('');
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '440px',
          padding: '2rem',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
          border: '1px solid var(--color-border)',
          backgroundColor: '#ffffff'
        }}
      >
        {/* Close Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.25rem' }}>
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-subtle)',
              padding: '4px',
              borderRadius: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Header with Icon */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            backgroundColor: '#0f172a',
            color: '#f97316',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto',
            boxShadow: '0 10px 20px -5px rgba(15, 23, 42, 0.3)'
          }}>
            <Lock size={26} />
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.02em', marginBottom: '0.35rem' }}>
            Administrator Sign In
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
            Enter facilities administrator credentials to access management dispatch controls.
          </p>
        </div>

        {/* Demo Quick Fill Banner */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px dashed var(--color-border)',
          borderRadius: '12px',
          padding: '0.75rem 1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              Demo Credentials:
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
              fixora@gmail.com / fixora123
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickFill}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', color: 'var(--color-accent)' }}
          >
            <Sparkles size={13} color="var(--color-highlight)" />
            Auto-Fill
          </button>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="adminEmail">
              Administrator Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                color="var(--color-text-subtle)"
                style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                id="adminEmail"
                type="email"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="fixora@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label" htmlFor="adminPassword">
              Security Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                color="var(--color-text-subtle)"
                style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                id="adminPassword"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                placeholder="fixora123"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-subtle)'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              type="submit"
              className="btn btn-accent"
              style={{ width: '100%', padding: '0.8rem', fontWeight: 600, fontSize: '0.95rem' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Verifying Credentials...' : 'Sign In to Admin Console'}
              {!isSubmitting && <ArrowRight size={16} />}
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="btn btn-secondary"
              style={{ width: '100%', fontSize: '0.875rem' }}
            >
              Cancel & Return to Student Portal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
