import React, { useEffect, useRef } from 'react';
import { ArrowDown, MapPin, Github, Linkedin } from 'lucide-react';
import { TactileButton } from './TactileButton';

interface HeroProps {
  onResumeClick?: () => void;
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

    const startTime = performance.now();

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

      // Subtle, gentle camera float
      const ambientFloatX = Math.sin(elapsed * 0.3) * 2.5;
      const ambientFloatY = Math.cos(elapsed * 0.25) * 3;
      const ambientZoom = 1.02 + Math.sin(elapsed * 0.2) * 0.01;

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
      className="relative w-full min-h-[calc(100svh-64px)] md:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[var(--bg-base)] select-none pt-20 pb-12 sm:pt-24 sm:pb-16 lg:py-20"
    >
      {/* Soft background ambient gradient glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[480px] h-[480px] rounded-full pointer-events-none opacity-40 dark:opacity-25 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, var(--accent) 0%, var(--decorative-soft) 40%, transparent 70%)',
        }}
      />

      {/* ──────────────── BALANCED 2-COLUMN CONTAINER ──────────────── */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ────── LEFT COLUMN: IDENTITY & ACTIONS (7 cols) ────── */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-1">
            
            {/* Clear & Prominent Introduction (Single cohesive heading) */}
            <div className="scroll-reveal scroll-slide-left stagger-1">
              <h1 className="font-display font-bold text-[clamp(28px,5.5vw,48px)] text-[var(--text-primary)] leading-[1.15] tracking-tight">
                Hi, I&apos;m <span className="text-[var(--accent)]">Sarthak M. Mandhare</span>
                <span className="text-[var(--decorative)]">.</span>
              </h1>
            </div>

            {/* Professional Role & Location */}
            <div className="scroll-reveal scroll-slide-left stagger-2 mt-3 space-y-1">
              <p className="font-inter text-base sm:text-lg md:text-xl font-semibold text-[var(--text-primary)] tracking-tight">
                Full-Stack Software Developer
              </p>
              <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] flex items-center gap-1.5 flex-wrap">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <span>Dombivli, Mumbai, Maharashtra, India</span>
              </p>
            </div>

            {/* Short Supporting Statement */}
            <div className="scroll-reveal scroll-slide-left stagger-3 mt-4 sm:mt-5 font-inter text-sm sm:text-[15px] md:text-base text-[var(--text-secondary)] leading-relaxed space-y-2.5 max-w-xl">
              <p className="font-medium text-[var(--text-primary)] text-justified">
                &ldquo;I build practical web applications with a focus on frontend experiences, backend functionality and AI integration.&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] text-justified">
                Computer Science student at Keraleeya Samajam&apos;s Model College (Autonomous). Built and deployed full-stack web applications and completed two AICTE-approved virtual internships with IBM and Lenovo.
              </p>
            </div>

            {/* Call-To-Action Button */}
            <div className="scroll-reveal scroll-slide-up stagger-4 mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
              <TactileButton
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, '#projects')}
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4 inline-block" />
              </TactileButton>
            </div>

            {/* Social Links */}
            <div className="scroll-reveal scroll-slide-up stagger-5 mt-6 sm:mt-7 flex items-center gap-5 sm:gap-6">
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

          {/* ────── RIGHT COLUMN: REFINED macOS FLOATING PORTRAIT (5 cols) ────── */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-2">
            <div className="scroll-reveal scroll-rotate-right hero-scroll-parallax stagger-2 w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[390px] mx-auto">
              
              {/* macOS Window Bezel Container */}
              <div className="neumorphic-card p-3 sm:p-4 rounded-3xl relative">
                
                {/* macOS Title Bar with Traffic Lights */}
                <div className="flex items-center justify-between pb-3 px-1 border-b border-[var(--border)] select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block shadow-xs" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block shadow-xs" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block shadow-xs" />
                  </div>
                  <div className="px-2.5 py-0.5 rounded-md tactile-inset text-[10px] font-mono-code text-[var(--accent)] truncate">
                    sarthak-mandhare.dev
                  </div>
                  <div className="w-8" />
                </div>

                {/* Profile Portrait Image Frame (Perfect 1:1 Framing for Sarthak Photo) */}
                <div className="relative mt-3 rounded-2xl overflow-hidden aspect-square tactile-display-frame">
                  <img
                    ref={photoImageRef}
                    src="/images/sarthak.jpg"
                    alt="Sarthak M. Mandhare"
                    className="w-full h-full object-cover object-[center_18%] will-change-transform"
                    style={{
                      filter: 'contrast(1.03) brightness(1.03) saturate(1.02)',
                    }}
                  />
                  {/* Subtle inner gradient shadow at bottom of image */}
                  <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>

                {/* Floating Status Footer inside Card */}
                <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono-code text-[var(--text-secondary)]">
                  <span className="truncate">Keraleeya Samajam&apos;s Model College</span>
                  <span className="text-[var(--accent)] font-semibold shrink-0 ml-1">B.Sc. CS</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
