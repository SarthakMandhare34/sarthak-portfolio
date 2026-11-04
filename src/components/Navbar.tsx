import React, { useEffect, useRef, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import anime from 'animejs';
import { useTheme } from '../context/ThemeContext';
import { TactileButton } from './TactileButton';

interface NavbarProps {
  onResumeClick: () => void;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onResumeClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('about');
  const prevScrolledRef = useRef(false);
  const navBgRef = useRef<HTMLDivElement>(null);
  const themeIconRef = useRef<HTMLDivElement>(null);
  const hasAnimatedMountRef = useRef(false);

  // Initial Entrance Animation with Anime.js
  useEffect(() => {
    if (hasAnimatedMountRef.current) return;
    hasAnimatedMountRef.current = true;

    anime({
      targets: '.nav-anim-item',
      opacity: [0, 1],
      translateY: [-6, 0],
      duration: 420,
      delay: anime.stagger(45),
      easing: 'easeOutCubic',
    });
  }, []);

  // 60fps requestAnimationFrame-throttled scroll listener for progress and active section
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 30;
          setIsScrolled(scrolled);

          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentProgress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
          }

          // Active section detection
          const scrollPos = window.scrollY + 120;
          for (const link of [...NAV_LINKS].reverse()) {
            const el = document.querySelector(link.href);
            if (el) {
              const top = (el as HTMLElement).offsetTop;
              if (scrollPos >= top) {
                setActiveSection(link.href);
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Snappy Anime.js crossfade for scroll transition
  useEffect(() => {
    if (prevScrolledRef.current !== isScrolled) {
      prevScrolledRef.current = isScrolled;
      if (navBgRef.current) {
        anime.remove(navBgRef.current);
        anime({
          targets: navBgRef.current,
          opacity: isScrolled ? [0, 1] : [1, 0],
          duration: 250,
          easing: 'easeOutQuad',
        });
      }
    }
  }, [isScrolled]);

  // Handle Theme Toggle with Anime.js 180deg rotation & fade
  const handleThemeToggle = () => {
    if (themeIconRef.current) {
      anime({
        targets: themeIconRef.current,
        rotate: '+=180deg',
        opacity: [
          { value: 0, duration: 125, easing: 'easeOutQuad' },
          { value: 1, duration: 125, easing: 'easeInQuad' },
        ],
        duration: 250,
        easing: 'easeInOutQuad',
      });
    }
    toggleTheme();
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = 60;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* ──────────────── TOP VIEWPORT SCROLL PROGRESS BAR ──────────────── */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-50 pointer-events-none bg-[var(--border)]/20">
        <div
          className="h-full bg-[var(--accent)] transition-all duration-150 ease-out shadow-[0_0_10px_var(--accent)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="fixed top-0 left-0 w-full h-[60px] z-40 transition-none select-none">
        {/* Background layer crossfaded by Anime.js */}
        <div
          ref={navBgRef}
          style={{ opacity: 0 }}
          className="absolute inset-0 bg-[var(--bg-surface)]/90 backdrop-blur-[12px] border-b border-[var(--border)] pointer-events-none"
        />

        {/* Navigation Content Container */}
        <div className="relative max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* LEFT: Monogram Logo */}
          <div className="nav-anim-item opacity-0">
            <a
              href="#"
              onClick={scrollToTop}
              className="font-display font-bold text-[14px] text-[var(--accent)] tracking-tight inline-flex items-center justify-center w-8 h-8 rounded-xl tactile-icon-socket transition-transform active:scale-95"
              aria-label="Sarthak Mandhare - Back to top"
            >
              SM
            </a>
          </div>

          {/* RIGHT: Desktop Nav links, Theme Toggle, Resume Button */}
          <div className="flex items-center gap-2.5 sm:gap-4 md:gap-5">
            {/* Desktop Nav Links (Hidden below 768px) */}
            <nav className="hidden md:flex items-center gap-1 text-[13.5px] font-inter p-1 rounded-xl bg-[var(--bg-inset)]/60 border border-[var(--border)]">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`nav-anim-item opacity-0 px-3 py-1 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-[var(--accent)] font-semibold bg-[var(--bg-elevated)] shadow-sm'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]/50 font-medium'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Mobile Resume Quick-Action Button */}
            <div className="nav-anim-item opacity-0 md:hidden">
              <TactileButton
                onClick={onResumeClick}
                variant="secondary"
                size="sm"
                ariaLabel="View Resume PDF"
              >
                <span>Resume ↓</span>
              </TactileButton>
            </div>

            {/* Theme Toggle Button */}
            <div className="nav-anim-item opacity-0">
              <button
                onClick={handleThemeToggle}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="neumorphic-btn w-9 h-9 flex items-center justify-center text-[var(--text-primary)] cursor-pointer"
              >
                <div ref={themeIconRef} className="flex items-center justify-center">
                  {theme === 'dark' ? (
                    <Moon className="w-[17px] h-[17px]" />
                  ) : (
                    <Sun className="w-[17px] h-[17px]" />
                  )}
                </div>
              </button>
            </div>

            {/* Desktop Tactile Resume Button (Hidden below 768px) */}
            <div className="nav-anim-item opacity-0 hidden md:block">
              <TactileButton
                onClick={onResumeClick}
                variant="secondary"
                size="sm"
                ariaLabel="View Resume PDF"
              >
                <span>Resume</span>
                <span>↓</span>
              </TactileButton>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
