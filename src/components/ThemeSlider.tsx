import React from 'react';
import { useSettings } from '../context/ThemeContext';

interface ThemeSliderProps {
  showLabels?: boolean;
  className?: string;
}

export const ThemeSlider: React.FC<ThemeSliderProps> = ({ showLabels = false, className = '' }) => {
  const { theme, toggleTheme } = useSettings();
  const isDark = theme === 'dark';

  return (
    <div className={`theme-slider-container ${className}`}>
      {showLabels && (
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'var(--ink-mid)'
          }}
        >
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`Toggle theme: currently ${isDark ? 'Dark' : 'Light'}`}
        className="theme-slider-track"
        onClick={toggleTheme}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {/* Left Sun Icon */}
        <svg
          className="theme-slider-icon"
          viewBox="0 0 24 24"
          style={{ stroke: !isDark ? 'transparent' : 'var(--ink-faint)' }}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M4.93 4.93l1.41 1.41" />
          <path d="M17.66 17.66l1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M4.93 19.07l1.41-1.41" />
          <path d="M17.66 6.34l1.41-1.41" />
        </svg>

        {/* Sliding Thumb */}
        <span className="theme-slider-thumb" aria-hidden="true">
          {isDark ? (
            <svg viewBox="0 0 24 24">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          )}
        </span>

        {/* Right Moon Icon */}
        <svg
          className="theme-slider-icon"
          viewBox="0 0 24 24"
          style={{ stroke: isDark ? 'transparent' : 'var(--ink-faint)' }}
          aria-hidden="true"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>
    </div>
  );
};
