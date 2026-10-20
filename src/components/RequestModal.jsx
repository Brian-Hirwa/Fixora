import React from 'react';
import { X, MapPin, Calendar, User, Tag, AlertCircle, Wrench, CheckCircle2, ShieldAlert, Clock, ArrowRight } from 'lucide-react';
import { useMaintenance } from '../context/MaintenanceContext';
import { WORKERS, STATUSES } from '../data/initialData';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

export default function RequestModal() {
  const { selectedRequest, setSelectedRequest, updateStatus, assignWorker, isAdmin } = useMaintenance();

  if (!selectedRequest) return null;

  // Stages for student progress tracker
  const stages = [
    { label: 'Submitted', desc: 'Logged by campus member' },
    { label: 'Approved', desc: 'Approved by administration' },
    { label: 'In Progress', desc: 'Technician on-site' },
    { label: 'Completed', desc: 'Fixed & verified' }
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case 'Completed': return 3;
      case 'In Progress': return 2;
      case 'Approved': return 1;
      case 'Pending':
      default: return 0;
    }
  };

  const currentStageIdx = getStageIndex(selectedRequest.status);

  return (
    <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fafbfc'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: 'var(--color-accent)',
              backgroundColor: 'var(--color-accent-light)',
              padding: '0.2rem 0.5rem',
              borderRadius: '6px'
            }}>
              {selectedRequest.id}
            </span>
            <StatusBadge status={selectedRequest.status} />
            <PriorityBadge priority={selectedRequest.priority} />
            {isAdmin && (
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px'
              }}>
                ADMIN ACCESS
              </span>
            )}
          </div>
          <button
            onClick={() => setSelectedRequest(null)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              display: 'flex',
              padding: '4px',
              borderRadius: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
            {selectedRequest.title}
          </h2>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--color-surface)',
            borderRadius: '10px',
            marginBottom: '1.25rem',
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={16} color="var(--color-accent)" />
              <strong style={{ color: 'var(--color-text-main)' }}>{selectedRequest.location}</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Tag size={16} />
              <span>Category: <strong>{selectedRequest.category}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={16} />
              <span>Reported: {selectedRequest.date}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={16} />
              <span>By: {selectedRequest.reportedBy || 'Staff'}</span>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
              Problem Description
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-main)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
              {selectedRequest.description}
            </p>
          </div>

          {/* Photo attachment if available */}
          {selectedRequest.imageUrl && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                Attached Photo / Proof
              </h4>
              <div style={{
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                maxHeight: '220px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f1f5f9'
              }}>
                <img
                  src={selectedRequest.imageUrl}
                  alt={selectedRequest.title}
                  style={{ width: '100%', maxHeight: '220px', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>
          )}

          {/* ROLE CONDITIONAL: What the Admin sees vs What Students/Public see */}
          {isAdmin ? (
            /* ADMIN VIEW: Dispatch & Status Management Controls */
            <div style={{
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '1.25rem',
              backgroundColor: '#ffffff',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Wrench size={16} color="var(--color-accent)" />
                  Admin Dispatch & Status Control
                </h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  Administrator Mode
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
                    Update Status:
                  </label>
                  <select
                    className="form-select"
                    value={selectedRequest.status}
                    onChange={(e) => updateStatus(selectedRequest.id, e.target.value)}
                    style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem' }}
                  >
                    {STATUSES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
                    Assign Maintenance Worker:
                  </label>
                  <select
                    className="form-select"
                    value={selectedRequest.assignedTo || 'Unassigned'}
                    onChange={(e) => assignWorker(selectedRequest.id, e.target.value)}
                    style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem' }}
                  >
                    {WORKERS.map(w => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            /* STUDENT / PUBLIC VIEW: Progress Timeline & Read-Only Status */
            <div style={{
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '1.25rem',
              backgroundColor: '#fafbfc'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} color="var(--color-accent)" />
                  Repair Progress Timeline
                </h4>
                <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, backgroundColor: '#dcfce7', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  Verified School Ticket
                </span>
              </div>

              {/* Step indicator */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                {stages.map((stage, idx) => {
                  const isDone = idx <= currentStageIdx;
                  const isCurrent = idx === currentStageIdx;
                  return (
                    <div key={stage.label} style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: isDone ? 'var(--color-accent)' : '#e2e8f0',
                        color: isDone ? '#ffffff' : '#94a3b8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 0.35rem auto',
                        fontWeight: 700,
                        fontSize: '0.75rem'
                      }}>
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <div style={{ fontSize: '0.75rem', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                        {stage.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                fontSize: '0.85rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-main)' }}>
                  <span>Assigned Facilities Specialist:</span>
                  <strong style={{ color: 'var(--color-primary)' }}>{selectedRequest.assignedTo || 'Under Review (Unassigned)'}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '0.75rem',
          backgroundColor: '#fafbfc'
        }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setSelectedRequest(null)}
          >
            Close
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setSelectedRequest(null)}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
