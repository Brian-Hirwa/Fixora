import React, { useState } from 'react';
import {
  Inbox,
  Clock,
  Wrench,
  CheckCircle2,
  PlusCircle,
  Filter,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Layers,
  ChevronRight,
  Sparkles,
  BarChart3,
  Calendar
} from 'lucide-react';
import { useMaintenance } from '../context/MaintenanceContext';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { CATEGORIES } from '../data/initialData';

export default function DashboardPage({ setActivePage }) {
  const { requests, stats, setSelectedRequest } = useMaintenance();
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Filter requests for recent table
  const displayedRequests = requests.filter(req => {
    if (filterStatus === 'ALL') return true;
    return req.status === filterStatus;
  });

  // Calculate category breakdowns for visual chart
  const categoryCounts = CATEGORIES.map(cat => {
    const count = requests.filter(r => r.category === cat).length;
    const percentage = requests.length > 0 ? Math.round((count / requests.length) * 100) : 0;
    return { name: cat, count, percentage };
  });

  // Priority count
  const criticalCount = requests.filter(r => r.priority === 'Critical').length;
  const highCount = requests.filter(r => r.priority === 'High').length;

  return (
    <div style={{ padding: '2rem 0 4rem 0' }}>
      <div className="container">
        {/* Dashboard Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>
                Maintenance Operations Dashboard
              </h1>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Real-time monitoring of campus repair tickets, technician dispatches, and infrastructure safety.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActivePage('report')}
              className="btn btn-accent"
              style={{ fontWeight: 600 }}
            >
              <PlusCircle size={16} />
              Log Repair Request
            </button>
            <button
              onClick={() => setActivePage('manage')}
              className="btn btn-secondary"
            >
              Manage All Requests
            </button>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          {/* Card 1: Total */}
          <div className="apple-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                Total Requests
              </span>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Inbox size={18} color="var(--color-primary)" />
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1.1 }}>
              {stats.total}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.6rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              <span>Across all school departments</span>
            </div>
          </div>

          {/* Card 2: Pending */}
          <div className="apple-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-highlight)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                Pending Repairs
              </span>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-highlight-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Clock size={18} color="var(--color-highlight)" />
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-highlight)', lineHeight: 1.1 }}>
              {stats.pending}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.6rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              <span>Awaiting admin triage / approval</span>
            </div>
          </div>

          {/* Card 3: In Progress */}
          <div className="apple-card" style={{ padding: '1.5rem', borderLeft: '4px solid #8b5cf6' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                Repairs In Progress
              </span>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#ede9fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Wrench size={18} color="#8b5cf6" />
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6d28d9', lineHeight: 1.1 }}>
              {stats.inProgress}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.6rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              <span>Technicians currently deployed</span>
            </div>
          </div>

          {/* Card 4: Completed */}
          <div className="apple-card" style={{ padding: '1.5rem', borderLeft: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                Completed Repairs
              </span>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle2 size={18} color="#10b981" />
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#166534', lineHeight: 1.1 }}>
              {stats.completed}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.6rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              <span>Successfully inspected and fixed</span>
            </div>
          </div>
        </div>

        {/* Visual Analytics & Breakdown Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Category Breakdown Chart */}
          <div className="apple-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  Requests by Category
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Volume distribution of school maintenance domains
                </p>
              </div>
              <BarChart3 size={20} color="var(--color-accent)" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {categoryCounts.map((cat) => (
                <div key={cat.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{cat.name}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>{cat.count} issues ({cat.percentage}%)</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div
                      style={{
                        width: `${cat.percentage}%`,
                        height: '100%',
                        backgroundColor:
                          cat.name === 'Electrical' ? '#f59e0b' :
                          cat.name === 'Plumbing' ? '#0284c7' :
                          cat.name === 'Equipment' ? '#2563eb' :
                          cat.name === 'Furniture' ? '#8b5cf6' : '#64748b',
                        borderRadius: '4px',
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority & Readiness Overview */}
          <div className="apple-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    Campus Safety & Urgency Triage
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    Immediate hazard alerts requiring supervisor attention
                  </p>
                </div>
                <AlertTriangle size={20} color="#ea580c" />
              </div>

              {/* Critical & High callouts */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{
                  flex: 1,
                  padding: '1rem',
                  backgroundColor: '#fee2e2',
                  borderRadius: '12px',
                  border: '1px solid #fecaca'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase' }}>
                    Critical Urgency
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#b91c1c', margin: '4px 0' }}>
                    {criticalCount}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#7f1d1d' }}>Requires immediate safety response</div>
                </div>

                <div style={{
                  flex: 1,
                  padding: '1rem',
                  backgroundColor: '#ffedd5',
                  borderRadius: '12px',
                  border: '1px solid #fed7aa'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9a3412', textTransform: 'uppercase' }}>
                    High Priority
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#c2410c', margin: '4px 0' }}>
                    {highCount}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#7c2d12' }}>Should be fixed within 24 hours</div>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: '10px',
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', fontWeight: 500 }}>
                Filter table for critical emergencies:
              </span>
              <button
                onClick={() => setActivePage('manage')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem' }}
              >
                Inspect Queue &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Recent Requests Table Section */}
        <div className="apple-card" style={{ padding: '1.5rem', overflow: 'hidden' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.25rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                Recent Maintenance Requests
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Click any row to view full details or reassign technician
              </p>
            </div>

            {/* Quick Status Filter Tabs */}
            <div style={{
              display: 'flex',
              gap: '0.35rem',
              backgroundColor: 'var(--color-surface)',
              padding: '4px',
              borderRadius: '8px',
              flexWrap: 'wrap'
            }}>
              {['ALL', 'Pending', 'In Progress', 'Completed'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  style={{
                    border: 'none',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor: filterStatus === status ? '#ffffff' : 'transparent',
                    color: filterStatus === status ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    boxShadow: filterStatus === status ? 'var(--shadow-sm)' : 'none',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {status === 'ALL' ? 'All Requests' : status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="apple-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Problem & Category</th>
                  <th>Location</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedRequests.slice(0, 7).map(req => (
                  <tr
                    key={req.id}
                    onClick={() => setSelectedRequest(req)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <span style={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        color: 'var(--color-accent)',
                        fontSize: '0.85rem'
                      }}>
                        {req.id}
                      </span>
                    </td>
                    <td>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                          {req.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          {req.category} &bull; Assigned to: {req.assignedTo || 'Unassigned'}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                        {req.location}
                      </span>
                    </td>
                    <td>
                      <PriorityBadge priority={req.priority} />
                    </td>
                    <td>
                      <StatusBadge status={req.status} />
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        {req.date}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRequest(req);
                        }}
                        className="btn btn-secondary btn-sm"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}

                {displayedRequests.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                      No repair requests found for this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer link */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1rem',
            marginTop: '0.5rem',
            borderTop: '1px solid var(--color-border)',
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)'
          }}>
            <span>Showing recent items ({Math.min(displayedRequests.length, 7)} of {requests.length})</span>
            <button
              onClick={() => setActivePage('manage')}
              className="btn btn-outline-primary btn-sm"
            >
              Open Full Search & Table &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
