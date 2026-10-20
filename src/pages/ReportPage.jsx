import React, { useState } from 'react';
import {
  Wrench,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  MapPin,
  Tag,
  ArrowRight,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { useMaintenance } from '../context/MaintenanceContext';
import { CATEGORIES, PRIORITIES } from '../data/initialData';

const SAMPLE_PHOTO_PRESETS = [
  { label: 'Water Leak', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80' },
  { label: 'Broken Furniture', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80' },
  { label: 'Faulty Lighting', url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80' },
  { label: 'Door Latch Issue', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80' }
];

export default function ReportPage({ setActivePage }) {
  const { addRequest, setSelectedRequest, isAdmin } = useMaintenance();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: 'Electrical',
    priority: 'Medium',
    reportedBy: 'Staff Member',
    imageUrl: null
  });

  const [errors, setErrors] = useState({});
  const [submittedRequest, setSubmittedRequest] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size should be under 5MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange('imageUrl', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Problem title is required.';
    } else if (formData.title.trim().length < 4) {
      newErrors.title = 'Title must be at least 4 characters long.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a clear description of the issue.';
    } else if (formData.description.trim().length < 8) {
      newErrors.description = 'Description must be at least 8 characters long.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Specific classroom or campus location is required.';
    }

    if (!formData.category) {
      newErrors.category = 'Please select an issue category.';
    }

    if (!formData.priority) {
      newErrors.priority = 'Please specify priority level.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const created = addRequest(formData);
    setSubmittedRequest(created);
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      location: '',
      category: 'Electrical',
      priority: 'Medium',
      reportedBy: 'Staff Member',
      imageUrl: null
    });
    setErrors({});
    setSubmittedRequest(null);
  };

  return (
    <div style={{ padding: '2.5rem 0 5rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
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
            <Wrench size={14} />
            Campus Facilities Helpdesk
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            Report a Problem
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '580px', margin: '0 auto' }}>
            Submit damaged infrastructure, plumbing emergencies, broken classroom furniture, or electrical hazards for immediate triage.
          </p>
        </div>

        {/* Success State Card if just submitted */}
        {submittedRequest ? (
          <div className="apple-card" style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            animation: 'modalIn 0.3s ease-out'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#dcfce7',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <span style={{
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              fontWeight: 700,
              color: 'var(--color-accent)',
              backgroundColor: 'var(--color-accent-light)',
              padding: '0.25rem 0.75rem',
              borderRadius: '6px'
            }}>
              {submittedRequest.id}
            </span>

            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
              Maintenance Request Submitted!
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
              Thank you. Your request for <strong>"{submittedRequest.title}"</strong> at <strong>{submittedRequest.location}</strong> has been logged and added to the administrative queue.
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => {
                  setSelectedRequest(submittedRequest);
                }}
                className="btn btn-secondary"
              >
                Inspect Ticket Details
              </button>
              {isAdmin ? (
                <button
                  onClick={() => setActivePage('dashboard')}
                  className="btn btn-primary"
                >
                  Go to Dashboard
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => setActivePage('track')}
                  className="btn btn-primary"
                >
                  Track in Campus Status Board
                  <ArrowRight size={16} />
                </button>
              )}
              <button
                onClick={handleReset}
                className="btn btn-outline-primary"
              >
                Report Another Issue
              </button>
            </div>
          </div>
        ) : (
          /* Report Form */
          <div className="apple-card" style={{ padding: '2.5rem' }}>
            <form onSubmit={handleSubmit} noValidate>
              {/* Problem Title */}
              <div className="form-group">
                <label className="form-label" htmlFor="title">
                  Problem Title <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  className="form-input"
                  placeholder="e.g., Clogged sink in Biology Lab 2, Broken projector bulb, Jammed locker"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
                {errors.title && <div className="form-error">{errors.title}</div>}
              </div>

              {/* Two Column Grid: Location & Category */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.25rem'
              }}>
                {/* Location / Classroom */}
                <div className="form-group">
                  <label className="form-label" htmlFor="location">
                    Location or Classroom <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="location"
                      type="text"
                      className="form-input"
                      placeholder="e.g., Room 304, Main Cafeteria, Science Lab 2"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>
                  {errors.location && <div className="form-error">{errors.location}</div>}
                </div>

                {/* Category */}
                <div className="form-group">
                  <label className="form-label" htmlFor="category">
                    Category <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    id="category"
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <div className="form-error">{errors.category}</div>}
                </div>
              </div>

              {/* Two Column Grid: Priority & Reporter */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.25rem'
              }}>
                {/* Priority */}
                <div className="form-group">
                  <label className="form-label" htmlFor="priority">
                    Priority Level <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    id="priority"
                    className="form-select"
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                  >
                    {PRIORITIES.map(pri => (
                      <option key={pri} value={pri}>
                        {pri === 'Critical' ? 'Critical (Immediate Hazard)' :
                         pri === 'High' ? 'High (Urgent Repair)' :
                         pri === 'Medium' ? 'Medium (Standard Attention)' :
                         'Low (Minor Cosmetic / Maintenance)'}
                      </option>
                    ))}
                  </select>
                  <div className="form-hint">
                    Choose Critical only for safety hazards, power outages, or major leaks.
                  </div>
                  {errors.priority && <div className="form-error">{errors.priority}</div>}
                </div>

                {/* Reported By */}
                <div className="form-group">
                  <label className="form-label" htmlFor="reportedBy">
                    Reported By (Teacher / Staff Member)
                  </label>
                  <input
                    id="reportedBy"
                    type="text"
                    className="form-input"
                    placeholder="e.g., Ms. Eleanor Davis (Science Dept)"
                    value={formData.reportedBy}
                    onChange={(e) => handleInputChange('reportedBy', e.target.value)}
                  />
                  <div className="form-hint">Helps technicians verify the room access.</div>
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label" htmlFor="description">
                  Description of Problem <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea
                  id="description"
                  className="form-textarea"
                  rows={4}
                  placeholder="Describe what is broken, what symptoms are observed, and any safety hazards or access instructions..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
                {errors.description && <div className="form-error">{errors.description}</div>}
              </div>

              {/* Optional Photo Upload */}
              <div className="form-group">
                <label className="form-label">
                  Optional Photo of Problem
                </label>
                <div style={{
                  border: '2px dashed var(--color-border)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  backgroundColor: 'var(--color-surface)',
                  transition: 'border-color 0.2s ease'
                }}>
                  {formData.imageUrl ? (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        style={{
                          maxHeight: '180px',
                          borderRadius: '8px',
                          border: '1px solid var(--color-border)'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleInputChange('imageUrl', null)}
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          background: '#ef4444',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Remove photo"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload size={32} color="var(--color-text-muted)" style={{ margin: '0 auto 0.75rem auto' }} />
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 500 }}>
                        Click to upload an image from your device
                      </p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                        PNG, JPG, or WEBP up to 5MB
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFile}
                        style={{
                          marginTop: '0.75rem',
                          fontSize: '0.825rem',
                          cursor: 'pointer'
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Preset sample photo quick picker */}
                {!formData.imageUrl && (
                  <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                      Quick Sample Photos:
                    </span>
                    {SAMPLE_PHOTO_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handleInputChange('imageUrl', preset.url)}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                      >
                        <ImageIcon size={12} />
                        {preset.label}
                      </button>
                    ))}
                  </div>
                )}
                {errors.image && <div className="form-error">{errors.image}</div>}
              </div>

              {/* Submit Button */}
              <div style={{
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-secondary"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  className="btn btn-accent btn-lg"
                  style={{ minWidth: '180px', fontWeight: 600 }}
                >
                  <CheckCircle2 size={18} />
                  Submit Repair Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
