import React, { useState } from 'react';
import {
  Wrench,
  PlusCircle,
  LayoutDashboard,
  ClipboardList,
  Info,
  Home,
  Menu,
  X,
  Search,
  Lock,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { useMaintenance } from '../context/MaintenanceContext';

export default function Navbar({ activePage, setActivePage }) {
  const { currentRole, setRole, isAdmin, isAdminAuthenticated, setShowLoginModal, logoutAdmin } = useMaintenance();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Student Navigation Items
  const studentNavItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'report', label: 'Report a Problem', icon: PlusCircle },
    { id: 'track', label: 'Track Repairs', icon: Search },
    { id: 'about', label: 'About', icon: Info },
  ];

  // Admin Navigation Items
  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'manage', label: 'Manage & Dispatch', icon: ClipboardList },
    { id: 'report', label: 'Log Repair', icon: PlusCircle },
    { id: 'about', label: 'About', icon: Info },
  ];

  const currentNavItems = isAdmin ? adminNavItems : studentNavItems;

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleToggle = (targetRole) => {
    if (targetRole === 'admin') {
      if (!isAdminAuthenticated) {
        setShowLoginModal(true);
      } else {
        setRole('admin');
        setActivePage('dashboard');
      }
    } else {
      setRole('student');
      setActivePage('landing');
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logoutAdmin();
    setActivePage('landing');
    setMobileMenuOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: isAdmin ? '#0f172a' : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: isAdmin ? '1px solid #1e293b' : '1px solid var(--color-border)',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
      transition: 'background-color 0.25s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px'
      }}>
        {/* Brand / Logo */}
        <div
          onClick={() => handleNavClick(isAdmin ? 'dashboard' : 'landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: isAdmin ? '#1e293b' : 'var(--color-primary)',
            border: isAdmin ? '1px solid rgba(255,255,255,0.15)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 10px rgba(15, 23, 42, 0.2)'
          }}>
            <Wrench size={20} color={isAdmin ? '#f97316' : '#60a5fa'} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: isAdmin ? '#ffffff' : 'var(--color-primary)'
              }}>
                Fixora
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                backgroundColor: isAdmin ? 'rgba(249, 115, 22, 0.2)' : 'var(--color-highlight-light)',
                color: isAdmin ? '#fb923c' : 'var(--color-highlight)',
                padding: '0.15rem 0.45rem',
                borderRadius: '4px',
                border: isAdmin ? '1px solid rgba(249, 115, 22, 0.4)' : '1px solid rgba(249, 115, 22, 0.2)'
              }}>
                {isAdmin ? 'Admin Console' : 'Student & Staff'}
              </span>
            </div>
            <p style={{
              fontSize: '0.725rem',
              color: isAdmin ? '#94a3b8' : 'var(--color-text-muted)',
              marginTop: '-2px'
            }}>
              {isAdmin ? 'Facilities Management' : 'School Repair Portal'}
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '0.4rem' }} className="desktop-nav">
          {currentNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: isActive
                    ? (isAdmin ? 'rgba(255, 255, 255, 0.12)' : 'var(--color-accent-light)')
                    : 'transparent',
                  color: isActive
                    ? (isAdmin ? '#ffffff' : 'var(--color-accent)')
                    : (isAdmin ? '#94a3b8' : 'var(--color-text-muted)'),
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Portal Switcher & Action */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }} className="desktop-cta">
          {/* Role Switcher Pill */}
          <div style={{
            display: 'flex',
            backgroundColor: isAdmin ? 'rgba(255, 255, 255, 0.08)' : 'var(--color-surface)',
            padding: '3px',
            borderRadius: '9999px',
            border: isAdmin ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid var(--color-border)'
          }}>
            <button
              onClick={() => handleRoleToggle('student')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '9999px',
                border: 'none',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: !isAdmin ? '#ffffff' : 'transparent',
                color: !isAdmin ? 'var(--color-primary)' : '#94a3b8',
                boxShadow: !isAdmin ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <GraduationCap size={13} />
              Student View
            </button>
            <button
              onClick={() => handleRoleToggle('admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '9999px',
                border: 'none',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: isAdmin ? 'var(--color-highlight)' : 'transparent',
                color: isAdmin ? '#ffffff' : 'var(--color-text-muted)',
                boxShadow: isAdmin ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <Lock size={12} />
              {isAdmin ? 'Admin Active' : 'Admin Login'}
            </button>
          </div>

          {/* Primary Action Button or Sign Out */}
          {!isAdmin ? (
            <button
              onClick={() => handleNavClick('report')}
              className="btn btn-accent btn-sm"
              style={{ fontWeight: 600 }}
            >
              <PlusCircle size={15} />
              Report Issue
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="btn btn-secondary btn-sm"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                fontSize: '0.8rem'
              }}
              title="Sign Out of Admin Console"
            >
              <LogOut size={13} />
              Sign Out
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            border: isAdmin ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--color-border)',
            background: isAdmin ? '#1e293b' : '#ffffff',
            cursor: 'pointer',
            color: isAdmin ? '#ffffff' : 'var(--color-primary)'
          }}
          className="mobile-menu-btn"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          borderTop: isAdmin ? '1px solid #1e293b' : '1px solid var(--color-border)',
          backgroundColor: isAdmin ? '#0f172a' : '#ffffff',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {/* Mobile Role Switcher */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            paddingBottom: '0.75rem',
            borderBottom: isAdmin ? '1px solid #1e293b' : '1px solid var(--color-border)'
          }}>
            <button
              onClick={() => handleRoleToggle('student')}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                backgroundColor: !isAdmin ? 'var(--color-accent)' : '#1e293b',
                color: '#ffffff'
              }}
            >
              🎓 Student View
            </button>
            <button
              onClick={() => handleRoleToggle('admin')}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                backgroundColor: isAdmin ? 'var(--color-highlight)' : '#f1f5f9',
                color: isAdmin ? '#ffffff' : 'var(--color-primary)'
              }}
            >
              🔒 {isAdmin ? 'Admin Console' : 'Admin Login'}
            </button>
          </div>

          {currentNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: isActive
                    ? (isAdmin ? 'rgba(255, 255, 255, 0.12)' : 'var(--color-accent-light)')
                    : 'transparent',
                  color: isActive
                    ? (isAdmin ? '#ffffff' : 'var(--color-accent)')
                    : (isAdmin ? '#cbd5e1' : 'var(--color-primary)'),
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%'
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}

          {isAdmin && (
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: '#ef4444',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
            >
              <LogOut size={16} />
              Sign Out of Admin
            </button>
          )}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
