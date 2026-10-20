import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useMaintenance } from '../context/MaintenanceContext';

export default function Toast() {
  const { toast, setToast } = useMaintenance();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={18} color="#16a34a" />;
      case 'warning':
        return <AlertTriangle size={18} color="#ea580c" />;
      case 'info':
      default:
        return <Info size={18} color="#2563eb" />;
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        backgroundColor: '#ffffff',
        color: '#0f172a',
        padding: '0.75rem 1.25rem',
        borderRadius: '12px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        maxWidth: '380px',
        animation: 'slideUp 0.25s ease-out'
      }}
    >
      {getIcon()}
      <span style={{ fontSize: '0.875rem', fontWeight: 500, flex: 1 }}>
        {toast.message}
      </span>
      <button
        onClick={() => setToast(null)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '2px',
          color: '#94a3b8'
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
