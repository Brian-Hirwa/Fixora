import React from 'react';
import {
  ShieldCheck,
  Target,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Users,
  Building2,
  Clock,
  ArrowRight,
  BookOpen,
  Laptop
} from 'lucide-react';

export default function AboutPage({ setActivePage }) {
  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            backgroundColor: 'var(--color-accent-light)',
            color: 'var(--color-accent)',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '0.75rem'
          }}>
            <BookOpen size={14} />
            System Overview & Objectives
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            About Fixora
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
            Modernizing educational facility management through clear reporting, transparent accountability, and rapid maintenance resolution.
          </p>
        </div>

        {/* Section 1: The Problem Fixora Solves */}
        <div className="apple-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertTriangle size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                The Challenge in School Maintenance
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Traditional school environments suffer from fragmented communication
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.975rem', color: 'var(--color-text-main)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            In most educational institutions, reporting a broken classroom air conditioner, leaking sink, or shattered window relies on verbal hallway comments, paper slips, or scattered emails. As a result:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-surface)', borderRadius: '10px' }}>
              <div style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                Lost Requests & Delays
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Issues get forgotten when staff are busy, causing minor defects to escalate into costly structural problems.
              </p>
            </div>

            <div style={{ padding: '1rem', backgroundColor: 'var(--color-surface)', borderRadius: '10px' }}>
              <div style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                Safety & Hazard Risks
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Critical electrical shorts or blocked fire doors linger without immediate visibility by administrators.
              </p>
            </div>

            <div style={{ padding: '1rem', backgroundColor: 'var(--color-surface)', borderRadius: '10px' }}>
              <div style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                Zero Accountability
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Teachers are left wondering if their ticket was seen, while custodians lack a prioritized workload schedule.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Core Objectives */}
        <div className="apple-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-accent-light)',
              color: 'var(--color-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Target size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                System Objectives
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                What Fixora sets out to achieve
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <CheckCircle2 size={20} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  1. Centralized Issue Intake
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  Provide an intuitive, fast reporting form that any teacher, administrator, or staff member can fill in under 30 seconds.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <CheckCircle2 size={20} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  2. Priority-Driven Triage
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  Automatically classify and highlight Critical and High-priority issues so urgent repairs are dispatched ahead of routine tasks.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <CheckCircle2 size={20} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  3. Transparent Lifecycle Tracking
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  Track tickets through four distinct operational stages: <em>Pending</em>, <em>Approved</em>, <em>In Progress</em>, and <em>Completed</em>.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <CheckCircle2 size={20} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  4. Staff & Technician Dispatch
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  Directly route plumbing issues to plumbers, electrical faults to electricians, and furniture issues to carpenters.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: How Fixora Improves School Maintenance */}
        <div className="apple-card" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                How Fixora Improves School Operations
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Measurable benefits for students, educators, and administrators
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div style={{
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-accent)', marginBottom: '0.25rem' }}>
                70% Faster
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
                Response Times
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Direct electronic routing eliminates administrative delays between seeing a problem and dispatching a technician.
              </p>
            </div>

            <div style={{
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16a34a', marginBottom: '0.25rem' }}>
                100% Paperless
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
                Digital Audit Trail
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Maintains date logs and photo evidence for school board inspections, fire marshall checks, and warranty claims.
              </p>
            </div>

            <div style={{
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-highlight)', marginBottom: '0.25rem' }}>
                Safer Rooms
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
                Student Well-Being
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Optimal lighting, functioning climate control, and safe classroom equipment create a better learning atmosphere.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1.75rem 2rem',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              Ready to explore the system?
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Check out live tickets or log a test repair request.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setActivePage('dashboard')}
              className="btn btn-secondary"
            >
              Open Dashboard
            </button>
            <button
              onClick={() => setActivePage('report')}
              className="btn btn-accent"
            >
              Report a Problem &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
