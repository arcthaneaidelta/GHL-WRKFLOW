import React from 'react';
import { getStatusColor } from '../../utils/formatters';

interface BadgeProps {
  status: string;
  label?: string;
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  status,
  label,
  size = 'md',
  dot = true,
  className = '',
}) => {
  const colors = getStatusColor(status);
  const displayLabel = label || status.replace('_', ' ');

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-xs'
      : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border} ${sizeClasses} capitalize transition-colors ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />}
      {displayLabel}
    </span>
  );
};

