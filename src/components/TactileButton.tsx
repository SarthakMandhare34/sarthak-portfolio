import React from 'react';

export interface TactileButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  title?: string;
  ariaLabel?: string;
}

/**
 * Advanced tactile neumorphic button component using the exact multi-layer structure:
 * <button class="button">
 *   <div class="button-outer">
 *     <div class="button-inner">
 *       <span>...</span>
 *     </div>
 *   </div>
 * </button>
 */
export function TactileButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  target,
  rel,
  type = 'button',
  disabled = false,
  title,
  ariaLabel,
}: TactileButtonProps) {
  const sizeClass = size === 'sm' ? 'button-sm' : size === 'lg' ? 'button-lg' : '';
  const variantClass = variant === 'secondary' ? 'button-secondary' : '';
  const combinedClass = `button ${sizeClass} ${variantClass} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        className={combinedClass}
        title={title}
        aria-label={ariaLabel}
      >
        <div className="button-outer">
          <div className="button-inner">
            <span>{children}</span>
          </div>
        </div>
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClass}
      title={title}
      aria-label={ariaLabel}
    >
      <div className="button-outer">
        <div className="button-inner">
          <span>{children}</span>
        </div>
      </div>
    </button>
  );
}
