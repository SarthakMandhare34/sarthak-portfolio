import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeSlider } from './ThemeSlider';

interface NavbarProps {
  activeSection: string;
  isScrolled: boolean;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
}

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  isScrolled,
  onNavigate,
  onOpenResume
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const [isMobileNav, setIsMobileNav] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 960;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileNav(window.innerWidth <= 960);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Position indicator according to activeSection
  useEffect(() => {
    if (!trackRef.current || !indicatorRef.current) return;
    if (window.innerWidth <= 960) return;

    const track = trackRef.current;
    const activeLinkEl = track.querySelector<HTMLAnchorElement>(`[data-section="${activeSection}"]`);

    if (activeLinkEl) {
      const trackRect = track.getBoundingClientRect();
      const linkRect = activeLinkEl.getBoundingClientRect();
      indicatorRef.current.style.left = `${linkRect.left - trackRect.left}px`;
      indicatorRef.current.style.width = `${linkRect.width}px`;
      indicatorRef.current.style.opacity = '1';
    } else {
      indicatorRef.current.style.opacity = '0';
    }
  }, [activeSection]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }
    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`site-nav-header ${isScrolled ? 'is-scrolled' : ''} nav-mode-solid`}
        id="site-header"
      >
        <div className="nav-container nav-container-solid">
          <a
            href="#hero"
            className="nav-logo"
            onClick={(e) => handleLinkClick(e, 'hero')}
            aria-label={PERSONAL_INFO.name}
          >
            <span className="logo-text">
              {isMobileNav ? 'Sarthak' : PERSONAL_INFO.shortName}
            </span>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="nav-menu" id="nav-menu" aria-label="Primary navigation">
            <div className="nav-track" id="nav-track" ref={trackRef}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  data-section={link.id}
                  className={`nav-item ${activeSection === link.id ? 'is-active' : ''}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                >
                  {link.label}
                </a>
              ))}
              <span className="nav-indicator" id="nav-indicator" ref={indicatorRef} aria-hidden="true" />
            </div>

            {/* Desktop Controls Group */}
            <div className="nav-controls-group">
              <button
                type="button"
                className="nav-resume-btn js-open-resume"
                onClick={onOpenResume}
                aria-haspopup="dialog"
                id="nav-resume-btn"
              >
                Resume <span className="nav-badge">PDF</span>
              </button>

              {/* Theme Slider Switch */}
              <div className="nav-theme-slider-wrap">
                <ThemeSlider />
              </div>
            </div>
          </nav>

          {/* Mobile Navigation Controls */}
          <div className="mobile-nav-controls">
            <div className="mobile-slider-wrapper">
              <ThemeSlider />
            </div>

            <button
              type="button"
              className="nav-hamburger"
              id="nav-hamburger"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-drawer"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              <span className="hamburger-line" aria-hidden="true" />
              <span className="hamburger-line" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`mobile-drawer-panel ${mobileMenuOpen ? 'is-open' : ''} drawer-solid`}
        id="mobile-menu-drawer"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">{PERSONAL_INFO.shortName}</span>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Mobile Theme Switcher inside Drawer */}
        <div className="mobile-drawer-theme-select">
          <span className="mobile-drawer-label">Theme Appearance:</span>
          <div className="mobile-drawer-theme-row">
            <ThemeSlider showLabels={true} />
          </div>
        </div>

        <nav className="mobile-nav-links">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`mobile-nav-link ${activeSection === link.id ? 'is-active' : ''}`}
              onClick={(e) => handleLinkClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mobile-drawer-footer">
          <button
            type="button"
            className="action-btn action-btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenResume();
            }}
          >
            View Resume <span className="nav-badge" style={{ marginLeft: '6px' }}>PDF</span>
          </button>
        </div>
      </div>
    </>
  );
};
