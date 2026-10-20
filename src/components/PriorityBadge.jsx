import React from 'react';

export default function PriorityBadge({ priority }) {
  let priorityClass = 'priority-low';

  switch (priority) {
    case 'Critical':
      priorityClass = 'priority-critical';
      break;
    case 'High':
      priorityClass = 'priority-high';
      break;
    case 'Medium':
      priorityClass = 'priority-medium';
      break;
    case 'Low':
    default:
      priorityClass = 'priority-low';
      break;
  }

  return (
    <span className={`badge ${priorityClass}`}>
      {priority}
    </span>
  );
}
