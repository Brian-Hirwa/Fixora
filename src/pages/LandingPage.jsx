import React from 'react';
import {
  Wrench,
  AlertCircle,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Users,
  Building,
  CheckSquare,
  Sparkles
} from 'lucide-react';
import { useMaintenance } from '../context/MaintenanceContext';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';

export default function LandingPage({ setActivePage }) {
  const { requests, stats, setSelectedRequest, isAdmin, setRole } = useMaintenance();
  const recentThree = requests.slice(0, 3);

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
        borderBottom: '1px solid var(--color-border)',
        padding: '4.5rem 0 4rem 0'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '860px' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--color-primary)',
            marginBottom: '1.75rem'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-highlight)'
            }} />
            Modern Campus Maintenance Infrastructure
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: 'var(--color-primary)',
            marginBottom: '1.5rem'
          }}>
            A Better Way to Maintain Your School.
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            maxWidth: '720px',
            margin: '0 auto 2.5rem auto'
          }}>
            Fixora streamlines school repair requests, broken equipment logs, plumbing emergencies, and electrical faults into one clean, responsive dashboard designed for administrators and teachers.
          </p>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {!isAdmin ? (
              <>
                <button
                  onClick={() => setActivePage('report')}
                  className="btn btn-accent btn-lg"
                  style={{ boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' }}
                >
                  <Wrench size={18} />
                  Report a Problem Now
                </button>
                <button
                  onClick={() => setActivePage('track')}
                  className="btn btn-secondary btn-lg"
                  style={{ fontWeight: 600 }}
                >
                  Track Campus Repairs
                  <ArrowRight size={18} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActivePage('dashboard')}
                  className="btn btn-primary btn-lg"
                  style={{ boxShadow: '0 4px 14px rgba(15, 23, 42, 0.25)' }}
                >
                  Open Executive Dashboard
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => setActivePage('manage')}
                  className="btn btn-secondary btn-lg"
                  style={{ fontWeight: 600 }}
                >
                  <Wrench size={18} color="var(--color-highlight)" />
                  Manage & Dispatch Queue
                </button>
              </>
            )}
          </div>

          {/* Quick Portal Switcher Sub-banner */}
          <div style={{ marginBottom: '2.5rem' }}>
            {!isAdmin ? (
              <span style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)' }}>
                Are you a school administrator or technician?{' '}
                <button
                  onClick={() => {
                    setRole('admin');
                    setActivePage('dashboard');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-accent)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: '0.825rem',
                    padding: 0
                  }}
                >
                  Switch to Admin Console &rarr;
                </button>
              </span>
            ) : (
              <span style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)' }}>
                Previewing as Administrator.{' '}
                <button
                  onClick={() => {
                    setRole('student');
                    setActivePage('landing');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-accent)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: '0.825rem',
                    padding: 0
                  }}
                >
                  Switch to Student Portal &rarr;
                </button>
              </span>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
            padding: '1.25rem 1.75rem',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'left'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Active School Requests</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '2px' }}>{stats.total} Logged</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Pending Review</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-highlight)', marginTop: '2px' }}>{stats.pending} Needs Review</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>In Progress</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-accent)', marginTop: '2px' }}>{stats.inProgress} Under Repair</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Resolved Rate</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#16a34a', marginTop: '2px' }}>
                {stats.total > 0 ? `${Math.round((stats.completed / stats.total) * 100)}%` : '100%'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
              Built Specifically for Educational Facilities
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Say goodbye to messy sticky notes, forgotten hallway complaints, and slow maintenance response times.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Feature 1 */}
            <div className="apple-card" style={{ padding: '2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-accent-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Zap size={24} color="var(--color-accent)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                Instant Problem Reporting
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Faculty and staff report classroom issues in seconds with exact room numbers, category tags, priority levels, and optional photo uploads.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="apple-card" style={{ padding: '2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-highlight-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Clock size={24} color="var(--color-highlight)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                Real-Time Progress Tracking
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Track issues through every milestone: Pending, Approved, In Progress, and Completed. Everyone knows what is being repaired and when.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="apple-card" style={{ padding: '2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#ecfdf5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Users size={24} color="#059669" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                Staff & Worker Dispatch
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                Assign dedicated maintenance technicians like electricians, plumbers, and carpenters to specific tickets to ensure accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How the System Works Section */}
      <section style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '5rem 0'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-accent)'
            }}>
              Simple 3-Step Lifecycle
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.02em', marginTop: '0.5rem' }}>
              How Fixora Works
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginTop: '0.5rem' }}>
              Designed with zero learning curve so any school personnel can participate immediately.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
            position: 'relative'
          }}>
            {/* Step 1 */}
            <div style={{
              backgroundColor: 'var(--color-bg)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid var(--color-border)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-15px',
                left: '24px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}>
                1
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary)', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                Submit the Request
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                A teacher or staff member spots a leaky sink, broken whiteboard, or faulty heater. They submit a quick ticket with room location and urgency.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{
              backgroundColor: 'var(--color-bg)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid var(--color-border)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-15px',
                left: '24px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-accent)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}>
                2
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary)', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                Triage & Assign
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Facilities administrators review pending items in the dashboard, approve critical repairs, and assign available maintenance staff.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{
              backgroundColor: 'var(--color-bg)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid var(--color-border)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-15px',
                left: '24px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}>
                3
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary)', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                Fix & Closeout
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                The technician finishes the repair, marks the ticket completed, and leaves a maintenance audit trail for school safety inspectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Sample Showcase Preview */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase' }}>
                Live Demonstration
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '0.25rem' }}>
                Active School Tickets
              </h2>
            </div>
            <button
              onClick={() => setActivePage('manage')}
              className="btn btn-secondary btn-sm"
            >
              View Full Table ({requests.length} total)
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}>
            {recentThree.map(req => (
              <div
                key={req.id}
                className="apple-card"
                onClick={() => setSelectedRequest(req)}
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-accent)' }}>
                      {req.id}
                    </span>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <PriorityBadge priority={req.priority} />
                      <StatusBadge status={req.status} />
                    </div>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.4rem' }}>
                    {req.title}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {req.description.length > 85 ? req.description.slice(0, 85) + '...' : req.description}
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--color-border)',
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)'
                }}>
                  <span>📍 {req.location}</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-accent)' }}>Inspect &rarr;</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner CTA */}
          <div style={{
            marginTop: '3.5rem',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, #1e293b 100%)',
            borderRadius: '20px',
            padding: '3rem 2rem',
            color: '#ffffff',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.25)'
          }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Ready to streamline school maintenance?
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '560px', margin: '0 auto 1.75rem auto', lineHeight: 1.6 }}>
              Experience the live interactive dashboard or report a new test issue to see immediate updates.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActivePage('report')}
                className="btn btn-accent btn-lg"
              >
                <Wrench size={18} />
                Report a Problem Now
              </button>
              <button
                onClick={() => setActivePage('dashboard')}
                className="btn btn-secondary btn-lg"
                style={{ backgroundColor: 'transparent', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
