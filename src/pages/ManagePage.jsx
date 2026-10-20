import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Wrench,
  CheckCircle2,
  Clock,
  User,
  ArrowUpDown,
  PlusCircle,
  Eye,
  Trash2,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { useMaintenance } from '../context/MaintenanceContext';
import { WORKERS, STATUSES, PRIORITIES, CATEGORIES } from '../data/initialData';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';

export default function ManagePage({ setActivePage }) {
  const { requests, updateStatus, assignWorker, deleteRequest, setSelectedRequest } = useMaintenance();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'priority'

  // Priority weight for sorting
  const priorityWeights = {
    'Critical': 4,
    'High': 3,
    'Medium': 2,
    'Low': 1
  };

  // Filtered and sorted requests
  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = req.title.toLowerCase().includes(q);
        const matchDesc = req.description.toLowerCase().includes(q);
        const matchLoc = req.location.toLowerCase().includes(q);
        const matchId = req.id.toLowerCase().includes(q);
        const matchWorker = (req.assignedTo || '').toLowerCase().includes(q);
        const matchReporter = (req.reportedBy || '').toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchLoc && !matchId && !matchWorker && !matchReporter) {
          return false;
        }
      }

      // Status filter
      if (selectedStatus !== 'ALL' && req.status !== selectedStatus) {
        return false;
      }

      // Priority filter
      if (selectedPriority !== 'ALL' && req.priority !== selectedPriority) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'ALL' && req.category !== selectedCategory) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priority') {
        return (priorityWeights[b.priority] || 0) - (priorityWeights[a.priority] || 0);
      }
      if (sortBy === 'oldest') {
        return a.date.localeCompare(b.date);
      }
      // default newest
      return b.date.localeCompare(a.date) || b.id.localeCompare(a.id);
    });
  }, [requests, searchQuery, selectedStatus, selectedPriority, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('ALL');
    setSelectedPriority('ALL');
    setSelectedCategory('ALL');
    setSortBy('newest');
  };

  const isFiltered = searchQuery || selectedStatus !== 'ALL' || selectedPriority !== 'ALL' || selectedCategory !== 'ALL';

  return (
    <div style={{ padding: '2rem 0 5rem 0' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>
              Manage Repair Requests
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Search, filter, update statuses, and dispatch technicians across all school maintenance tickets.
            </p>
          </div>

          <button
            onClick={() => setActivePage('report')}
            className="btn btn-accent"
            style={{ fontWeight: 600 }}
          >
            <PlusCircle size={16} />
            New Repair Request
          </button>
        </div>

        {/* Filter Controls Card */}
        <div className="apple-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* Search Input */}
            <div style={{ position: 'relative', gridColumn: 'span 1' }}>
              <Search
                size={16}
                color="var(--color-text-subtle)"
                style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.25rem' }}
                placeholder="Search ticket, room, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                className="form-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="ALL">Status: All Statuses</option>
                {STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <select
                className="form-select"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                <option value="ALL">Priority: All Priorities</option>
                {PRIORITIES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="ALL">Category: All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="priority">Sort: Highest Priority</option>
              </select>
            </div>
          </div>

          {/* Filter Status Bar */}
          {isFiltered && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '1rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--color-border)',
              fontSize: '0.85rem'
            }}>
              <span style={{ color: 'var(--color-text-muted)' }}>
                Showing <strong>{filteredRequests.length}</strong> of {requests.length} requests
              </span>
              <button
                onClick={clearFilters}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.8rem', padding: '0.25rem 0.6rem' }}
              >
                <X size={14} />
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Requests Table */}
        <div className="apple-card" style={{ overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="apple-table">
              <thead>
                <tr>
                  <th style={{ width: '100px' }}>ID</th>
                  <th>Issue Details</th>
                  <th>Location</th>
                  <th>Priority</th>
                  <th style={{ minWidth: '150px' }}>Status Update</th>
                  <th style={{ minWidth: '180px' }}>Assigned Worker</th>
                  <th style={{ width: '120px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map(req => (
                  <tr key={req.id}>
                    {/* ID */}
                    <td>
                      <span
                        onClick={() => setSelectedRequest(req)}
                        style={{
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          color: 'var(--color-accent)',
                          cursor: 'pointer'
                        }}
                      >
                        {req.id}
                      </span>
                    </td>

                    {/* Title & Description */}
                    <td>
                      <div>
                        <div
                          onClick={() => setSelectedRequest(req)}
                          style={{
                            fontWeight: 600,
                            color: 'var(--color-primary)',
                            cursor: 'pointer'
                          }}
                        >
                          {req.title}
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          color: 'var(--color-text-muted)',
                          marginTop: '2px',
                          maxWidth: '380px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {req.description}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)', marginTop: '2px' }}>
                          Category: <strong>{req.category}</strong> &bull; Logged: {req.date} by {req.reportedBy}
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td>
                      <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-text-main)' }}>
                        {req.location}
                      </span>
                    </td>

                    {/* Priority */}
                    <td>
                      <PriorityBadge priority={req.priority} />
                    </td>

                    {/* Quick Status Select */}
                    <td>
                      <select
                        className="form-select"
                        value={req.status}
                        onChange={(e) => updateStatus(req.id, e.target.value)}
                        style={{
                          fontSize: '0.825rem',
                          padding: '0.35rem 0.6rem',
                          height: 'auto',
                          fontWeight: 600,
                          backgroundColor:
                            req.status === 'Completed' ? '#f0fdf4' :
                            req.status === 'In Progress' ? '#faf5ff' :
                            req.status === 'Approved' ? '#f0f9ff' : '#fffbeb'
                        }}
                      >
                        {STATUSES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>

                    {/* Quick Worker Select */}
                    <td>
                      <select
                        className="form-select"
                        value={req.assignedTo || 'Unassigned'}
                        onChange={(e) => assignWorker(req.id, e.target.value)}
                        style={{
                          fontSize: '0.825rem',
                          padding: '0.35rem 0.6rem',
                          height: 'auto',
                          color: req.assignedTo === 'Unassigned' ? 'var(--color-text-muted)' : 'var(--color-text-main)'
                        }}
                      >
                        {WORKERS.map(w => (
                          <option key={w} value={w}>{w}</option>
                        ))}
                      </select>
                    </td>

                    {/* Actions */}
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="btn btn-secondary btn-sm"
                          title="Inspect Request Details"
                          style={{ padding: '0.35rem 0.5rem' }}
                        >
                          <Eye size={15} />
                          Details
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete request ${req.id}?`)) {
                              deleteRequest(req.id);
                            }
                          }}
                          className="btn btn-secondary btn-sm"
                          title="Delete Request"
                          style={{ padding: '0.35rem 0.5rem', color: '#dc2626' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredRequests.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--color-text-muted)' }}>
                      <div style={{ maxWidth: '320px', margin: '0 auto' }}>
                        <SlidersHorizontal size={36} color="var(--color-text-subtle)" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                          No matching requests found
                        </h3>
                        <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                          Try adjusting your search keywords or clearing active status and priority filters.
                        </p>
                        <button
                          onClick={clearFilters}
                          className="btn btn-secondary btn-sm"
                        >
                          Reset Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table summary bar */}
          <div style={{
            padding: '1rem 1.25rem',
            backgroundColor: '#fafbfc',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)'
          }}>
            <span>Total records: <strong>{filteredRequests.length}</strong> items</span>
            <span>All modifications saved locally in real-time</span>
          </div>
        </div>
      </div>
    </div>
  );
}
