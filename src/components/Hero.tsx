import React, { useEffect, useRef } from 'react';
import { ArrowDown, Download, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';
import anime from 'animejs';
import { TactileButton } from './TactileButton';

interface HeroProps {
  onResumeClick: () => void;
}

export function Hero({ onResumeClick }: HeroProps) {
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const photoImageRef = useRef<HTMLImageElement>(null);

  // ──────────────── CINEMATIC PHOTO PARALLAX & CAMERA MOVEMENT (45-60 FPS) ────────────────
  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isMouseOver = false;

    // Slow ambient camera breathing timer
    let startTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized coordinates (-1 to 1) relative to screen center
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      mouseX = 0;
      mouseY = 0;
    };

    // Render loop targeting smooth 60fps with lerp easing
    const renderLoop = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      // Subtle ambient camera drift (slow sine wave)
      const ambientFloatX = Math.sin(elapsed * 0.4) * 4;
      const ambientFloatY = Math.cos(elapsed * 0.35) * 5;
      const ambientZoom = 1.05 + Math.sin(elapsed * 0.25) * 0.02;

      // Smooth lerp toward mouse target (desktop only: if screen width >= 1024)
      const isDesktop = window.innerWidth >= 1024;
      const targetMouseX = isDesktop ? mouseX * 12 : 0;
      const targetMouseY = isDesktop ? mouseY * 10 : 0;

      currentX += (targetMouseX - currentX) * 0.05;
      currentY += (targetMouseY - currentY) * 0.05;

      const totalX = currentX + ambientFloatX;
      const totalY = currentY + ambientFloatY;

      if (photoImageRef.current) {
        photoImageRef.current.style.transform = `translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0) scale(${ambientZoom.toFixed(3)})`;
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

  // ──────────────── ENTRANCE & SCROLL ANIMATION ────────────────
  useEffect(() => {
    const playHeroAnimation = () => {
      anime.remove([
        '.hero-avatar-mobile',
        '.hero-photo-wrap',
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
            targets: '.hero-photo-wrap',
            opacity: [0, 1],
            duration: 450,
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

    playHeroAnimation();

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
          isVisible = false;
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
      className="relative w-full min-h-[calc(100svh-64px)] md:min-h-[90vh] flex items-center justify-start overflow-hidden bg-[var(--bg-base)] select-none pt-24 pb-14 sm:py-28 lg:py-32"
    >
      {/* ──────────────── CINEMATIC PORTRAIT (30-40% RIGHT SIDE ON DESKTOP) ──────────────── */}
      <div
        ref={photoContainerRef}
        className="hero-photo-wrap hidden lg:block absolute top-0 right-0 lg:right-2 xl:right-8 w-[38%] xl:w-[35%] max-w-[540px] h-full pointer-events-none select-none z-0 overflow-hidden"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Soft ambient depth halo */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background:
                'radial-gradient(circle at 50% 40%, var(--accent-soft) 0%, transparent 65%)',
            }}
          />

          {/* Sarthak Portrait Image: Natural upper-body framing, proper headroom */}
          <div className="relative w-full h-[88%] max-h-[740px] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)]/60 bg-[var(--bg-surface)]">
            <img
              ref={photoImageRef}
              src="/images/sarthak.jpg"
              alt="Sarthak Mangesh Mandhare"
              className="w-full h-full object-cover object-[center_20%] will-change-transform"
              style={{
                filter: 'contrast(1.04) brightness(1.05) saturate(1.02)',
              }}
            />

            {/* Subtle natural edge vignetting & bottom blend */}
            <div
              className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to top, var(--bg-base) 0%, transparent 100%)',
              }}
            />
            <div
              className="absolute inset-y-0 left-0 w-16 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to right, var(--bg-base) 0%, transparent 100%)',
              }}
            />
            <div
              className="absolute inset-x-0 top-0 h-16 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to bottom, var(--bg-base) 0%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* ──────────────── CONTENT COLUMN (LEFT-ALIGNED) ──────────────── */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[620px] lg:max-w-[640px] xl:max-w-[680px] flex flex-col justify-center">
          
          {/* ──────────────── DEDICATED MOBILE PORTRAIT CARD ──────────────── */}
          <div className="hero-avatar-mobile opacity-0 lg:hidden mb-4 sm:mb-5 flex items-center gap-3.5 sm:gap-4">
            <div className="relative shrink-0">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[var(--accent)]/60 bg-[var(--bg-elevated)] shadow-lg">
                <img
                  src="/images/sarthak.jpg"
                  alt="Sarthak Mangesh Mandhare"
                  className="w-full h-full object-cover object-[center_18%]"
                />
              </div>
            </div>

            <div className="space-y-0.5 min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-[var(--accent)] font-inter truncate">
                Full-Stack Software Developer
              </p>
              <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] font-inter truncate">
                Dombivli, Mumbai, Maharashtra, India
              </p>
            </div>
          </div>

          {/* Availability Indicator */}
          <div className="hero-status opacity-0 mb-3 sm:mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full tactile-status-badge w-fit">
            <span className="w-2 h-2 rounded-full bg-[var(--success)] shrink-0 animate-pulse" />
            <span className="font-mono-code text-[11px] sm:text-xs text-[var(--text-secondary)] font-medium">
              Available for engineering roles
            </span>
          </div>

          {/* Name */}
          <h1 className="hero-title opacity-0 font-display font-bold text-[clamp(28px,6vw,54px)] text-[var(--text-primary)] leading-[1.08] tracking-tight break-words">
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
          <div className="hero-tagline opacity-0 mt-4 sm:mt-5 font-inter text-[14px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed space-y-2">
            <p className="font-medium text-[var(--text-primary)] text-base sm:text-lg">
              &ldquo;I build practical web applications with a focus on frontend experiences, backend functionality and AI integration.&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Developed and deployed web applications and completed two AI-focused virtual internships involving educational and climate-safety solutions.
            </p>
          </div>

          {/* CTA Buttons: View Resume PDF & Explore Projects */}
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

          {/* GitHub and LinkedIn Links */}
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
      </div>
    </section>
  );
}
