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
      const ambientFloatX = Math.sin(elapsed * 0.3) * 2.5;
      const ambientFloatY = Math.cos(elapsed * 0.25) * 3;
      const ambientZoom = 1.025 + Math.sin(elapsed * 0.2) * 0.012;

      // Subtle mouse tracking on desktop
      const isDesktop = window.innerWidth >= 1024;
      const targetMouseX = isDesktop ? mouseX * 8 : 0;
      const targetMouseY = isDesktop ? mouseY * 6 : 0;

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

  // ──────────────── ENTRANCE ANIMATION ────────────────
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
          targets: ['.hero-avatar-mobile', '.hero-photo'],
          opacity: [0, 1],
          duration: 450,
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
      className="relative w-full min-h-[calc(100svh-64px)] md:min-h-[90vh] flex items-center justify-start overflow-hidden bg-[var(--bg-base)] select-none pt-24 pb-14 sm:py-24 lg:py-28"
    >
      {/* ──────────────── CINEMATIC SEAMLESS MERGED PORTRAIT (DESKTOP) ──────────────── */}
      <div
        className="hero-photo hidden lg:block absolute top-0 right-0 lg:right-0 xl:right-[1%] w-[48%] xl:w-[45%] 2xl:w-[42%] max-w-[700px] h-full pointer-events-none select-none z-0 overflow-hidden"
      >
        <div className="relative w-full h-full flex items-center justify-end">
          {/* Soft ambient depth halo behind portrait */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background:
                'radial-gradient(circle at 65% 42%, var(--accent-soft) 0%, transparent 70%)',
            }}
          />

          {/* Sarthak Portrait Image: commanding presence, natural upper-body headroom and shoulders */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <img
              ref={photoImageRef}
              src="/images/sarthak.jpg"
              alt="Sarthak Mangesh Mandhare"
              className="w-full h-full object-cover object-[center_20%] lg:object-[center_18%] will-change-transform relative z-[1]"
              style={{
                filter: 'contrast(1.04) brightness(1.05) saturate(1.02)',
              }}
            />

            {/* 
              SEAMLESS MULTI-DIRECTIONAL MERGE DISSOLVE OVERLAYS:
              Dissolves all outer edges cleanly into var(--bg-base) so the photo merges
              completely into the background without any card, box, or border lines.
            */}
            {/* Left Edge Dissolve: smooth, wide feathered blend into var(--bg-base) */}
            <div
              className="absolute inset-y-0 left-0 w-36 lg:w-48 xl:w-60 pointer-events-none z-[2]"
              style={{
                background:
                  'linear-gradient(to right, var(--bg-base) 0%, var(--bg-base) 20%, transparent 100%)',
              }}
            />

            {/* Bottom Edge Dissolve: fades shoulders seamlessly into page base */}
            <div
              className="absolute inset-x-0 bottom-0 h-32 lg:h-44 pointer-events-none z-[2]"
              style={{
                background:
                  'linear-gradient(to top, var(--bg-base) 0%, var(--bg-base) 25%, transparent 100%)',
              }}
            />

            {/* Top Edge Dissolve: gentle fade for headroom into the navbar */}
            <div
              className="absolute inset-x-0 top-0 h-20 lg:h-28 pointer-events-none z-[2]"
              style={{
                background:
                  'linear-gradient(to bottom, var(--bg-base) 0%, transparent 100%)',
              }}
            />

            {/* Right Edge Dissolve: soft blend into the right margin */}
            <div
              className="absolute inset-y-0 right-0 w-16 lg:w-24 pointer-events-none z-[2]"
              style={{
                background:
                  'linear-gradient(to left, var(--bg-base) 0%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* ──────────────── CONTENT CONTAINER ──────────────── */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl lg:max-w-[58%] xl:max-w-[56%] flex flex-col justify-center">

          {/* Mobile Avatar & Role Strip */}
          <div className="hero-avatar-mobile lg:hidden opacity-0 flex items-center gap-3.5 mb-5 p-2 rounded-2xl tactile-inset">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[var(--border)]">
              <img
                src="/images/sarthak.jpg"
                alt="Sarthak Mandhare"
                className="w-full h-full object-cover object-[center_18%]"
              />
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
            <p className="font-medium text-[var(--text-primary)] text-justified">
              &ldquo;I build practical web applications with React, Node.js, and AI integrations.&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] text-justified">
              Built and deployed full-stack web projects, and completed two AICTE-approved virtual internships with IBM and Lenovo.
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
      </div>
    </section>
  );
}
