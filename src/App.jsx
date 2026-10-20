import React, { useState } from 'react';
import { MaintenanceProvider, useMaintenance } from './context/MaintenanceContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RequestModal from './components/RequestModal';
import AdminLoginModal from './components/AdminLoginModal';
import Toast from './components/Toast';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ReportPage from './pages/ReportPage';
import ManagePage from './pages/ManagePage';
import AboutPage from './pages/AboutPage';
import TrackRepairsPage from './pages/TrackRepairsPage';
import { ShieldAlert, ArrowRight, Lock, LogOut } from 'lucide-react';

function MainApp() {
  const [activePage, setActivePage] = useState('landing');
  const { isAdmin, setShowLoginModal, logoutAdmin, setRole } = useMaintenance();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Banner when Admin mode is active */}
      {isAdmin && (
        <div style={{
          backgroundColor: '#1e293b',
          color: '#e2e8f0',
          padding: '0.45rem 1.5rem',
          fontSize: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'inline-block'
            }} />
            <span>
              <strong>Facilities Admin Console</strong> &bull; Authenticated as <code>fixora@gmail.com</code> with dispatch controls.
            </span>
          </div>
          <button
            onClick={() => {
              logoutAdmin();
              setActivePage('landing');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#38bdf8',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <LogOut size={12} />
            Sign Out &rarr;
          </button>
        </div>
      )}

      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main style={{ flex: 1 }}>
        {activePage === 'landing' && <LandingPage setActivePage={setActivePage} />}
        {activePage === 'track' && <TrackRepairsPage setActivePage={setActivePage} />}
        {activePage === 'report' && <ReportPage setActivePage={setActivePage} />}
        {activePage === 'about' && <AboutPage setActivePage={setActivePage} />}

        {/* Admin Dashboard */}
        {activePage === 'dashboard' && (
          isAdmin ? (
            <DashboardPage setActivePage={setActivePage} />
          ) : (
            /* Student attempted to visit admin dashboard */
            <div style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
              <div className="apple-card" style={{ maxWidth: '540px', margin: '0 auto', padding: '3rem 2rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: '#0f172a',
                  color: '#f97316',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}>
                  <Lock size={28} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                  Administrator Password Required
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                  The Executive Dashboard contains administrative metrics and personnel dispatch tools. Please sign in with <code>fixora@gmail.com</code> to access.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setActivePage('track')}
                    className="btn btn-secondary"
                  >
                    View Student Status Board
                  </button>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="btn btn-primary"
                  >
                    <Lock size={15} />
                    Sign In to Admin Console &rarr;
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {/* Admin Manage Requests */}
        {activePage === 'manage' && (
          isAdmin ? (
            <ManagePage setActivePage={setActivePage} />
          ) : (
            /* Student attempted to visit admin manage page */
            <div style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
              <div className="apple-card" style={{ maxWidth: '540px', margin: '0 auto', padding: '3rem 2rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: '#0f172a',
                  color: '#f97316',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}>
                  <Lock size={28} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                  Protected Facilities Queue
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Worker assignment and status override tools are restricted to facilities staff. Sign in to proceed or track repair tickets on the public board.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setActivePage('track')}
                    className="btn btn-secondary"
                  >
                    Open Student Tracking Board
                  </button>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="btn btn-primary"
                  >
                    <Lock size={15} />
                    Sign In to Admin Console &rarr;
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </main>

      <Footer setActivePage={setActivePage} />
      <RequestModal />
      <AdminLoginModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <MaintenanceProvider>
      <MainApp />
    </MaintenanceProvider>
  );
}
