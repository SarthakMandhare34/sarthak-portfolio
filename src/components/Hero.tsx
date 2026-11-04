import React, { useEffect } from 'react';
import { ArrowDown, Download, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';
import anime from 'animejs';
import { TactileButton } from './TactileButton';

interface HeroProps {
  onResumeClick: () => void;
}

export function Hero({ onResumeClick }: HeroProps) {
  // Butter-smooth, high-refresh 60fps/120fps Anime.js bi-directional animation
  useEffect(() => {
    const playHeroAnimation = () => {
      anime.remove([
        '.hero-avatar-mobile',
        '.hero-photo',
        '.hero-status',
        '.hero-title',
        '.hero-role',
        '.hero-location',
        '.hero-tagline',
        '.hero-cta-buttons',
        '.hero-socials',
      ]);

      const timeline = anime.timeline({ easing: 'cubicBezier(0.16, 1, 0.3, 1)' });

      timeline
        .add({
          targets: '.hero-avatar-mobile',
          opacity: [0, 1],
          scale: [0.94, 1],
          duration: 320,
        })
        .add(
          {
            targets: '.hero-photo',
            opacity: [0, 1],
            duration: 380,
          },
          0
        )
        .add(
          {
            targets: [
              '.hero-status',
              '.hero-title',
              '.hero-role',
              '.hero-location',
              '.hero-tagline',
              '.hero-cta-buttons',
              '.hero-socials',
            ],
            opacity: [0, 1],
            translateY: [10, 0],
            delay: anime.stagger(30, { start: 40 }),
            duration: 340,
          },
          40
        );
    };

    const playHeroExit = () => {
      anime.remove([
        '.hero-avatar-mobile',
        '.hero-photo',
        '.hero-status',
        '.hero-title',
        '.hero-role',
        '.hero-location',
        '.hero-tagline',
        '.hero-cta-buttons',
        '.hero-socials',
      ]);
      anime({
        targets: [
          '.hero-avatar-mobile',
          '.hero-photo',
          '.hero-status',
          '.hero-title',
          '.hero-role',
          '.hero-location',
          '.hero-tagline',
          '.hero-cta-buttons',
          '.hero-socials',
        ],
        opacity: 0,
        translateY: -8,
        duration: 200,
        easing: 'easeInQuad',
      });
    };

    playHeroAnimation();

    // Bi-directional scroll animation: fades in when entering, fades out when exiting
    const heroEl = document.getElementById('home');
    if (!heroEl) return;

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            playHeroAnimation();
            isVisible = true;
          }
        } else {
          if (isVisible) {
            playHeroExit();
            isVisible = false;
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent, selector: string) => {
    e.preventDefault();
    const target = document.querySelector(selector) || document.querySelector('#work');
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
    <section
      id="home"
      className="relative w-full min-h-[calc(100svh-56px)] md:min-h-screen flex items-center justify-start overflow-hidden bg-[var(--bg-base)] select-none pt-20 pb-14 sm:py-24 lg:py-28"
    >
      {/* ──────────────── SEAMLESS DOMINATING PORTRAIT (DESKTOP & LARGE DISPLAYS) ──────────────── */}
      <div className="hero-photo hidden lg:block absolute top-0 right-0 lg:right-[1%] xl:right-[3%] w-[54%] lg:w-[56%] xl:w-[54%] 2xl:w-[52%] max-w-[1100px] h-full pointer-events-none select-none z-0 overflow-hidden">
        <div className="relative w-full h-full">
          {/* Soft ambient accent halo behind portrait */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background:
                'radial-gradient(circle at 55% 35%, var(--accent-soft) 0%, transparent 65%)',
            }}
          />

          {/* Sarthak Portrait Image: commanding presence, high clarity, full headroom */}
          <img
            src="/images/sarthak.jpg"
            alt="Sarthak Mandhare"
            className="w-full h-full object-cover object-[center_24%] lg:object-[center_22%] scale-[1.08] lg:scale-[1.12] relative z-[1]"
            style={{
              filter: 'contrast(1.05) brightness(1.08) saturate(1.03)',
            }}
          />

          {/* 
            Clean Left Edge Dissolve:
            Softly dissolves ONLY the first edge (under 160px) into var(--bg-base),
            leaving 100% of his face completely untouched, crystal clear, and dominating.
            Uses pure var(--bg-base) so in Light Mode it is pure light blue, and in Dark Mode pure deep cyan.
          */}
          <div
            className="absolute inset-y-0 left-0 w-28 lg:w-36 xl:w-44 pointer-events-none z-[2]"
            style={{
              background:
                'linear-gradient(to right, var(--bg-base) 0%, var(--bg-base) 15%, transparent 100%)',
            }}
          />

          {/* Top & Bottom Edge Soft Fades */}
          <div
            className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-[2]"
            style={{
              background: 'linear-gradient(to top, var(--bg-base) 0%, transparent 100%)',
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-16 pointer-events-none z-[2]"
            style={{
              background: 'linear-gradient(to bottom, var(--bg-base) 0%, transparent 100%)',
            }}
          />
        </div>
      </div>

      {/* ──────────────── MOBILE AMBIENT GLOW BACKDROP ──────────────── */}
      <div className="lg:hidden absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-12 right-4 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
        />
      </div>

      {/* ──────────────── CONTENT COLUMN (LEFT-ALIGNED, HIGH CONTRAST) ──────────────── */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[540px] lg:max-w-[500px] xl:max-w-[540px] flex flex-col justify-center">
          
          {/* ──────────────── DEDICATED PROMINENT PORTRAIT ON MOBILE (CLEARS TEXT CLASH) ──────────────── */}
          <div className="hero-avatar-mobile opacity-0 lg:hidden mb-4 sm:mb-5 flex items-center gap-3.5 sm:gap-4">
            <div className="relative group shrink-0">
              {/* Outer ambient glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[var(--accent)] to-[var(--border)] opacity-40 blur-md group-hover:opacity-75 transition duration-300" />
              {/* Avatar frame */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[var(--accent)]/60 bg-[var(--bg-elevated)] shadow-xl">
                <img
                  src="/images/sarthak.jpg"
                  alt="Sarthak Mandhare"
                  className="w-full h-full object-cover object-[center_17%]"
                />
              </div>
            </div>

            {/* Title alongside photo on mobile */}
            <div className="space-y-0.5 min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-[var(--accent)] font-inter truncate">
                Full-Stack Developer
              </p>
              <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] font-inter truncate">
                Dombivli, Mumbai
              </p>
            </div>
          </div>

          {/* Status Badge Pill */}
          <div className="hero-status opacity-0 mb-3 sm:mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full tactile-status-badge w-fit">
            <span className="w-2 h-2 rounded-full bg-[var(--success)] shrink-0 animate-pulse" />
            <span className="font-mono-code text-[11px] sm:text-xs text-[var(--text-secondary)] font-medium">
              Available for engineering roles
            </span>
          </div>

          {/* Name */}
          <h1 className="hero-title opacity-0 font-display font-bold text-[clamp(26px,6.8vw,56px)] text-[var(--text-primary)] leading-[1.08] tracking-tight break-words">
            Sarthak Mangesh Mandhare
            <span className="text-[var(--accent)] font-serif">.</span>
          </h1>

          {/* Role & Location */}
          <div className="mt-2.5 sm:mt-3 space-y-1">
            <p className="hero-role opacity-0 font-inter text-base sm:text-xl md:text-2xl font-semibold text-[var(--accent)] tracking-tight">
              Full-Stack Software Developer
            </p>
            <p className="hero-location opacity-0 font-inter text-[11px] sm:text-xs md:text-sm text-[var(--text-secondary)] flex items-center gap-1.5 flex-wrap">
              <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
              <span>Dombivli, Mumbai, Maharashtra, India</span>
            </p>
          </div>

          {/* Tagline aligned with Resume Summary */}
          <div className="hero-tagline opacity-0 mt-3.5 sm:mt-5 font-inter text-[14px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed space-y-1.5">
            <p className="font-medium text-[var(--text-primary)]">
              Frontend-leaning full-stack developer who builds AI-integrated web applications with React, TypeScript, and Node.js.
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Shipped two production-deployed projects on Render and Vercel, and completed two AI-focused virtual internships building diagnostic and climate-safety tools with the Gemini API.
            </p>
          </div>

          {/* CTAs */}
          <div className="hero-cta-buttons opacity-0 mt-5 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
            <TactileButton
              onClick={onResumeClick}
              variant="primary"
              size="md"
              className="w-full sm:w-auto"
            >
              <span>View Resume PDF</span>
              <Download className="w-4 h-4 inline-block" />
            </TactileButton>

            <TactileButton
              href="#projects"
              onClick={(e) => handleSmoothScroll(e, '#projects')}
              variant="secondary"
              size="md"
              className="w-full sm:w-auto"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4 inline-block" />
            </TactileButton>
          </div>

          {/* Social Links */}
          <div className="hero-socials opacity-0 mt-5 sm:mt-8 flex items-center gap-5 sm:gap-6">
            <a
              href="https://github.com/SarthakMandhare34"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-code text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1 group py-1"
            >
              <span>GitHub</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/sarthak-mandhare-8a6730377"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-code text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1 group py-1"
            >
              <span>LinkedIn</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
