import React, { useEffect, useRef } from 'react';
import { ArrowDown, Download, MapPin, Github, Linkedin } from 'lucide-react';
import anime from 'animejs';
import { TactileButton } from './TactileButton';

interface HeroProps {
  onResumeClick: () => void;
}

export function Hero({ onResumeClick }: HeroProps) {
  const photoImageRef = useRef<HTMLImageElement>(null);

  // ──────────────── SUBTLE MOUSE PARALLAX (NATURAL & GENTLE, 45-60 FPS) ────────────────
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    let startTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    const renderLoop = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      // Extremely subtle, gentle camera float
      const ambientFloatX = Math.sin(elapsed * 0.3) * 2;
      const ambientFloatY = Math.cos(elapsed * 0.25) * 2.5;

      // Subtle mouse tracking on desktop
      const isDesktop = window.innerWidth >= 1024;
      const targetMouseX = isDesktop ? mouseX * 6 : 0;
      const targetMouseY = isDesktop ? mouseY * 5 : 0;

      currentX += (targetMouseX - currentX) * 0.05;
      currentY += (targetMouseY - currentY) * 0.05;

      const totalX = currentX + ambientFloatX;
      const totalY = currentY + ambientFloatY;

      if (photoImageRef.current) {
        photoImageRef.current.style.transform = `translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // ──────────────── ENTRANCE ANIMATION ────────────────
  useEffect(() => {
    const playHeroAnimation = () => {
      anime.remove([
        '.hero-avatar-mobile',
        '.hero-portrait-desktop',
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
          targets: ['.hero-avatar-mobile', '.hero-portrait-desktop'],
          opacity: [0, 1],
          scale: [0.96, 1],
          duration: 380,
        })
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

    playHeroAnimation();
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent, selector: string) => {
    e.preventDefault();
    const target = document.querySelector(selector) || document.querySelector('#work');
    if (target) {
      const navHeight = 64;
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
      className="relative w-full min-h-[calc(100svh-64px)] md:min-h-[85vh] flex items-center justify-start overflow-hidden bg-[var(--bg-base)] select-none pt-24 pb-14 sm:py-24 lg:py-28"
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ──────────────── LEFT COLUMN: CONTENT (7 cols on Desktop) ──────────────── */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
            
            {/* Availability Indicator */}
            <div className="hero-status opacity-0 mb-3 sm:mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full tactile-status-badge w-fit">
              <span className="w-2 h-2 rounded-full bg-[var(--success)] shrink-0 animate-pulse" />
              <span className="font-mono-code text-[11px] sm:text-xs text-[var(--text-secondary)] font-medium">
                Available for engineering roles
              </span>
            </div>

            {/* Name */}
            <h1 className="hero-title opacity-0 font-display font-bold text-[clamp(28px,5vw,52px)] text-[var(--text-primary)] leading-[1.1] tracking-tight">
              Sarthak Mangesh Mandhare
              <span className="text-[var(--accent)] font-serif">.</span>
            </h1>

            {/* Professional Designation & Location */}
            <div className="mt-2.5 sm:mt-3 space-y-1">
              <p className="hero-role opacity-0 font-inter text-base sm:text-xl md:text-2xl font-semibold text-[var(--accent)] tracking-tight">
                Full-Stack Software Developer
              </p>
              <p className="hero-location opacity-0 font-inter text-[11px] sm:text-xs md:text-sm text-[var(--text-secondary)] flex items-center gap-1.5 flex-wrap">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <span>Dombivli, Mumbai, Maharashtra, India</span>
              </p>
            </div>

            {/* Short Introduction & Supporting Statement */}
            <div className="hero-tagline opacity-0 mt-4 sm:mt-5 font-inter text-[14px] sm:text-[15px] md:text-[16px] text-[var(--text-secondary)] leading-relaxed space-y-2 max-w-xl">
              <p className="font-medium text-[var(--text-primary)]">
                &ldquo;I build practical web applications with a focus on frontend experiences, backend functionality and AI integration.&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Developed and deployed web applications and completed two AI-focused virtual internships involving educational and climate-safety solutions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-cta-buttons opacity-0 mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
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
            <div className="hero-socials opacity-0 mt-6 sm:mt-8 flex items-center gap-5 sm:gap-6">
              <a
                href="https://github.com/SarthakMandhare34"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-code text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1 group py-1"
              >
                <Github className="w-4 h-4" />
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
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>

          </div>

          {/* ──────────────── RIGHT COLUMN: BALANCED 30-35% PORTRAIT (5 cols on Desktop) ──────────────── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
            
            {/* Desktop & Tablet Portrait Frame: Natural upper-body framing, proper headroom */}
            <div className="hero-portrait-desktop opacity-0 relative w-[260px] sm:w-[320px] lg:w-[360px] xl:w-[390px] aspect-[4/5] rounded-3xl p-2.5 sm:p-3 neumorphic-card border border-[var(--border)] bg-[var(--bg-elevated)]/90 shadow-2xl">
              
              {/* Inner photo container with natural framing showing hair headroom and suit shoulders */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[var(--bg-surface)]">
                <img
                  ref={photoImageRef}
                  src="/images/sarthak.jpg"
                  alt="Sarthak Mangesh Mandhare"
                  className="w-full h-full object-cover object-[center_10%] will-change-transform"
                  style={{
                    filter: 'contrast(1.03) brightness(1.04) saturate(1.02)',
                  }}
                />

                {/* Soft natural edge vignettes */}
                <div
                  className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, var(--bg-surface) 0%, transparent 100%)',
                  }}
                />
              </div>

              {/* Status pill on bottom of card */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] text-[11px] font-mono-code text-[var(--accent)] shadow-md whitespace-nowrap flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
                <span>Full-Stack Developer</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
