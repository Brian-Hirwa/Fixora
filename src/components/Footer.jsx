import React from 'react';
import { Wrench, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useMaintenance } from '../context/MaintenanceContext';

export default function Footer({ setActivePage }) {
  const { resetToSampleData, isAdmin, setRole } = useMaintenance();

  return (
    <footer style={{
      backgroundColor: 'var(--color-primary)',
      color: '#94a3b8',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: 'auto',
      padding: '3rem 0 1.5rem 0'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {/* Col 1: System info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Wrench size={18} color="#60a5fa" />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                Fixora
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#94a3b8', marginBottom: '1rem' }}>
              The modern School Maintenance and Repair Management System built to keep classrooms safe, operational, and student-ready.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.1)', padding: '0.35rem 0.65rem', borderRadius: '6px' }}>
              <ShieldCheck size={14} />
              Educational Facilities Standard
            </div>
          </div>

          {/* Col 2: Role-based Navigation */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {isAdmin ? 'Admin Navigation' : 'Student & Staff Navigation'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              {!isAdmin ? (
                <>
                  <li>
                    <button
                      onClick={() => { setActivePage('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, textAlign: 'left', font: 'inherit' }}
                    >
                      Home / Overview
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { setActivePage('report'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, textAlign: 'left', font: 'inherit' }}
                    >
                      Report a Problem
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { setActivePage('track'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, textAlign: 'left', font: 'inherit' }}
                    >
                      Track Campus Repairs
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { setActivePage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, textAlign: 'left', font: 'inherit' }}
                    >
                      About Fixora
                    </button>
                  </li>
                  <li style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <button
                      onClick={() => { setRole('admin'); setActivePage('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      style={{ background: 'none', border: 'none', color: '#fb923c', cursor: 'pointer', padding: 0, textAlign: 'left', font: 'inherit', fontWeight: 600 }}
                    >
                      🔒 Switch to Admin Console &rarr;
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      onClick={() => { setActivePage('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, textAlign: 'left', font: 'inherit' }}
                    >
                      Executive Operations Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { setActivePage('manage'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, textAlign: 'left', font: 'inherit' }}
                    >
                      Manage & Dispatch Queue
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { setActivePage('report'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, textAlign: 'left', font: 'inherit' }}
                    >
                      Log Facilities Repair
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { setActivePage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, textAlign: 'left', font: 'inherit' }}
                    >
                      About System Objectives
                    </button>
                  </li>
                  <li style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <button
                      onClick={() => { setRole('student'); setActivePage('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', padding: 0, textAlign: 'left', font: 'inherit', fontWeight: 600 }}
                    >
                      🎓 Exit to Student View &rarr;
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Col 3: Categories & Coverage */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Repair Domains
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['Electrical & Lighting', 'Plumbing & Fountains', 'Desks & Furniture', 'A/V & Equipment', 'HVAC & Climate', 'Emergency Latches'].map(tag => (
                <span key={tag} style={{
                  fontSize: '0.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  color: '#cbd5e1',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Col 4: Demo Tools */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Demonstration Tools
            </h4>
            <p style={{ fontSize: '0.825rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '1rem' }}>
              Data is automatically saved in your browser's LocalStorage for fast offline testing.
            </p>
            <button
              onClick={resetToSampleData}
              className="btn btn-secondary btn-sm"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                fontSize: '0.8rem'
              }}
            >
              <Sparkles size={14} color="#f97316" />
              Reset Sample Requests
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem',
          color: '#64748b'
        }}>
          <div>
            &copy; {new Date().getFullYear()} Fixora School Maintenance System. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Designed with Apple-inspired clarity &bull; Navy Blue & Calm Blue Palette
          </div>
        </div>
      </div>
    </footer>
  );
}
