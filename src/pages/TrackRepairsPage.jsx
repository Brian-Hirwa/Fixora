import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Wrench,
  ShieldCheck,
  MapPin,
  Calendar,
  AlertCircle,
  PlusCircle,
  ChevronRight,
  Filter
} from 'lucide-react';
import { useMaintenance } from '../context/MaintenanceContext';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { CATEGORIES } from '../data/initialData';

export default function TrackRepairsPage({ setActivePage }) {
  const { requests, setSelectedRequest } = useMaintenance();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const filtered = requests.filter(req => {
    if (selectedCategory !== 'ALL' && req.category !== selectedCategory) return false;
    if (selectedStatus !== 'ALL' && req.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        req.id.toLowerCase().includes(q) ||
        req.title.toLowerCase().includes(q) ||
        req.location.toLowerCase().includes(q) ||
        req.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div style={{ padding: '2.5rem 0 5rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
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
            <ShieldCheck size={14} />
            Student & Campus Community Status Board
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            Track Campus Repairs
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
            Check the live progress of maintenance tickets submitted across classrooms, athletic facilities, and study halls.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="apple-card" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--color-text-subtle)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.25rem' }}
                placeholder="Search by ticket ID (e.g. REQ-2041) or room..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="ALL">All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                className="form-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="Pending">Pending Review</option>
                <option value="Approved">Approved for Repair</option>
                <option value="In Progress">Repairs In Progress</option>
                <option value="Completed">Resolved & Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Request Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {filtered.map(req => {
            // Calculate progress percentage
            let progressPct = 25;
            let stepLabel = 'Pending Administrator Review';
            if (req.status === 'Approved') {
              progressPct = 50;
              stepLabel = 'Approved — Scheduling Technician';
            } else if (req.status === 'In Progress') {
              progressPct = 75;
              stepLabel = 'In Progress — Technician Working';
            } else if (req.status === 'Completed') {
              progressPct = 100;
              stepLabel = 'Fixed & Verified';
            }

            return (
              <div
                key={req.id}
                className="apple-card"
                onClick={() => setSelectedRequest(req)}
                style={{
                  padding: '1.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      color: 'var(--color-accent)',
                      fontSize: '0.85rem'
                    }}>
                      {req.id}
                    </span>
                    <StatusBadge status={req.status} />
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                    {req.title}
                  </h3>

                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {req.description.length > 95 ? req.description.slice(0, 95) + '...' : req.description}
                  </p>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
                      <span>Stage: {stepLabel}</span>
                      <span>{progressPct}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--color-surface)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${progressPct}%`,
                          height: '100%',
                          backgroundColor: req.status === 'Completed' ? '#10b981' : 'var(--color-accent)',
                          borderRadius: '3px',
                          transition: 'width 0.3s ease'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={14} color="var(--color-accent)" />
                    <span style={{ fontWeight: 500, color: 'var(--color-text-main)' }}>{req.location}</span>
                  </div>
                  <span style={{ fontWeight: 600, color: 'var(--color-accent)' }}>
                    View Status &rarr;
                  </span>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem', background: '#fff', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
              <Clock size={36} color="var(--color-text-subtle)" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.4rem' }}>
                No repair requests match your search
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
                Double check the ticket ID or room number, or report a new issue below.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); setSelectedStatus('ALL'); }}
                className="btn btn-secondary btn-sm"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* CTA Bar */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid var(--color-border)',
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
              Notice another issue on campus?
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Anyone with school credentials can report broken desks, plumbing leaks, flickering lights, or equipment failures.
            </p>
          </div>
          <button
            onClick={() => setActivePage('report')}
            className="btn btn-accent btn-lg"
          >
            <PlusCircle size={18} />
            Report a Problem Now
          </button>
        </div>
      </div>
    </div>
  );
}
