import React from 'react';

export default function StatusBadge({ status }) {
  let badgeClass = 'badge-pending';
  let dotColor = '#f59e0b';

  switch (status) {
    case 'Approved':
      badgeClass = 'badge-approved';
      dotColor = '#0284c7';
      break;
    case 'In Progress':
      badgeClass = 'badge-in-progress';
      dotColor = '#8b5cf6';
      break;
    case 'Completed':
      badgeClass = 'badge-completed';
      dotColor = '#10b981';
      break;
    case 'Pending':
    default:
      badgeClass = 'badge-pending';
      dotColor = '#f59e0b';
      break;
  }

  return (
    <span className={`badge ${badgeClass}`}>
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: dotColor,
          display: 'inline-block'
        }}
      />
      {status}
    </span>
  );
}
