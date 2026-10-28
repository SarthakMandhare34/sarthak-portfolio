import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div
      className={`toast ${message ? 'is-active' : ''}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {message || ''}
    </div>
  );
};
