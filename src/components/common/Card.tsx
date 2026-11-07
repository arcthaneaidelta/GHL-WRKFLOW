import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-card border border-border shadow-subtle p-5 ${
        hoverable
          ? 'hover:border-accent/40 hover:shadow-card cursor-pointer transition-all duration-200'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

