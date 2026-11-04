import React, { useEffect, useRef } from 'react';
import {
  GraduationCap,
  MapPin,
  Languages,
  ArrowRight,
  ShieldCheck,
  Layout,
  Server,
  Sparkles,
} from 'lucide-react';
import anime from 'animejs';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  // High-performance 60fps/120fps Anime.js bi-directional scroll animation
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const header = sectionEl.querySelector('.about-header');
    const cards = sectionEl.querySelectorAll('.about-anim-card');
    const focusCards = sectionEl.querySelectorAll('.focus-area-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime.remove([sectionEl, header, cards, focusCards]);

            // Animate main section wrapper
            anime({
              targets: sectionEl,
              opacity: [0, 1],
              translateY: [10, 0],
              duration: 360,
              easing: 'cubicBezier(0.16, 1, 0.3, 1)',
            });

            // Header animation
            anime({
              targets: header,
              opacity: [0, 1],
              translateY: [10, 0],
              duration: 340,
              easing: 'easeOutCubic',
              delay: 30,
            });

            // Bio & snapshot cards animation
            anime({
              targets: cards,
              opacity: [0, 1],
              translateY: [12, 0],
              delay: anime.stagger(40, { start: 60 }),
              duration: 350,
              easing: 'easeOutCubic',
            });

            // Focus cards animation
            anime({
              targets: focusCards,
              opacity: [0, 1],
              translateY: [12, 0],
              delay: anime.stagger(30, { start: 100 }),
              duration: 340,
              easing: 'easeOutCubic',
            });
          } else {
            anime.remove([sectionEl, header, cards, focusCards]);
            anime({
              targets: [sectionEl, header, cards, focusCards],
              opacity: 0,
              translateY: 8,
              duration: 200,
              easing: 'easeInQuad',
            });
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full bg-[var(--bg-base)] py-14 sm:py-20 md:py-28 transition-colors duration-450 border-t border-[var(--border)] relative opacity-0"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ──────────────── SECTION HEADER ──────────────── */}
        <div className="about-header mb-7 sm:mb-10 max-w-3xl opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] text-xs font-mono-code text-[var(--accent)] mb-3">
            <span>About</span>
          </div>
          <h2 className="font-display font-bold text-[clamp(26px,5.5vw,44px)] text-[var(--text-primary)] leading-[1.12] tracking-tight">
            Background &amp; Approach
          </h2>
          <p className="font-inter text-[13px] sm:text-[15px] md:text-[16px] text-[var(--text-secondary)] mt-1.5 leading-relaxed text-justified">
            Full-Stack Software Developer focused on clean component architecture, backend integration, and practical AI solutions.
          </p>
        </div>

        {/* ──────────────── DUAL-COLUMN GRID: A. NARRATIVE + B. SNAPSHOT ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-stretch">
          
          {/* ────── A. PROFESSIONAL INTRODUCTION (7 cols) ────── */}
          <div className="about-anim-card opacity-0 neumorphic-card p-5 sm:p-7 md:p-8 space-y-5 lg:col-span-7 flex flex-col justify-between border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl">
            <div className="space-y-4 font-inter text-[13px] sm:text-[15px] md:text-[16px] text-[var(--text-secondary)] leading-relaxed">
              <h3 className="font-space font-bold text-lg sm:text-xl text-[var(--text-primary)]">
                Professional Introduction
              </h3>
              
              <p className="text-justified">
                My foundation in Computer Science began through coursework in algorithms, data structures, and database management at <strong className="text-[var(--text-primary)] font-semibold">Keraleeya Samajam&apos;s Model College (Autonomous)</strong>. This academic base quickly grew into a hands-on drive to build end-to-end web applications that solve real operational problems.
              </p>
              
              <p className="text-justified">
                In full-stack engineering, I bridge responsive frontend interfaces built with <strong className="text-[var(--text-primary)] font-semibold">React</strong> and <strong className="text-[var(--text-primary)] font-semibold">TypeScript</strong> to structured <strong className="text-[var(--text-primary)] font-semibold">Node.js/Express</strong> services and relational data models in <strong className="text-[var(--text-primary)] font-semibold">MySQL with Drizzle ORM</strong>. I treat state management, accessibility, and type safety as core design requirements, not afterthoughts.
              </p>
              
              <p className="text-justified">
                My experience integrating generative AI centers on practical API integration with the <strong className="text-[var(--text-primary)] font-semibold">Gemini API</strong>. Rather than relying on open-ended generation, I design structured prompts, implement emergency edge-case guards, and write deterministic fallback mechanisms so applications remain reliable even during network disruptions or API timeouts.
              </p>

              <p className="text-justified">
                My approach to problem-solving is deliberate and verification-driven: break down requirements into testable units, write automated test cases to guard against regressions, and iteratively improve performance and user experience.
              </p>
            </div>

            {/* Spoken Languages */}
            <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 font-mono-code text-[var(--text-dim)] uppercase">
                <Languages className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>Languages:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 font-inter font-medium text-[var(--text-primary)]">
                <span className="tactile-chip px-2.5 py-1">
                  English: <span className="text-[var(--accent)] font-semibold">Fluent</span>
                </span>
                <span className="tactile-chip px-2.5 py-1">
                  Hindi: <span className="text-[var(--accent)] font-semibold">Fluent</span>
                </span>
                <span className="tactile-chip px-2.5 py-1">
                  Marathi: <span className="text-[var(--accent)] font-semibold">Native</span>
                </span>
              </div>
            </div>
          </div>

          {/* ────── B. DEVELOPER SNAPSHOT (5 cols) ────── */}
          <div className="about-anim-card opacity-0 neumorphic-card p-5 sm:p-7 md:p-8 lg:col-span-5 flex flex-col justify-between space-y-5 border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5 mb-4">
                <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--text-primary)]">
                  Developer Snapshot
                </h3>
                <span className="tactile-chip px-2.5 py-0.5 font-mono-code text-xs text-[var(--accent)] font-semibold shrink-0">
                  Sem 6 · CGPA 6.95
                </span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm font-inter">
                {/* Degree & College */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl tactile-inset">
                  <GraduationCap className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[var(--text-dim)] font-mono-code text-[11px] block uppercase">
                      Degree
                    </span>
                    <span className="text-[var(--text-primary)] font-semibold block">
                      Bachelor of Science in Computer Science
                    </span>
                    <p className="text-[var(--text-secondary)] text-xs mt-0.5 text-justified">
                      Keraleeya Samajam&apos;s Model College (Autonomous)
                    </p>
                  </div>
                </div>

                {/* Academic Standing */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl tactile-inset">
                    <span className="text-[var(--text-dim)] font-mono-code text-[10px] block uppercase">
                      Current Semester
                    </span>
                    <span className="text-[var(--text-primary)] font-mono-code font-bold text-sm sm:text-base mt-0.5 block">
                      6th Semester
                    </span>
                    <span className="text-[10px] text-[var(--text-secondary)] block">
                      Expected Grad: 2027
                    </span>
                  </div>

                  <div className="p-3 rounded-xl tactile-inset">
                    <span className="text-[var(--text-dim)] font-mono-code text-[10px] block uppercase">
                      Verified CGPA
                    </span>
                    <span className="text-[var(--accent)] font-mono-code font-bold text-sm sm:text-base mt-0.5 block">
                      6.95 <span className="text-xs text-[var(--text-dim)] font-normal">/ 10</span>
                    </span>
                    <span className="text-[10px] text-[var(--text-secondary)] block">
                      Official Transcript
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl tactile-inset">
                  <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[var(--text-dim)] font-mono-code text-[11px] block uppercase">
                      Location
                    </span>
                    <span className="text-[var(--text-primary)] font-semibold block">
                      Dombivli, Mumbai, Maharashtra, India
                    </span>
                    <p className="text-[var(--text-secondary)] text-xs mt-0.5 text-justified">
                      Open for on-site, hybrid, and remote software engineering roles
                    </p>
                  </div>
                </div>

                {/* Internship Experience */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl tactile-inset">
                  <ShieldCheck className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[var(--text-dim)] font-mono-code text-[11px] block uppercase">
                      Virtual Internship Experience
                    </span>
                    <span className="text-[var(--text-primary)] font-semibold block">
                      Lenovo LEAP &amp; IBM SkillsBuild
                    </span>
                    <p className="text-[var(--text-secondary)] text-xs mt-0.5 text-justified">
                      2 AICTE-approved virtual internships with verified certificate credentials
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono-code">
              <span className="text-[var(--text-dim)]">
                Autonomous Institution
              </span>
              <a
                href="#education"
                className="text-[var(--accent)] hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>Academic Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* ──────────────── 3 AREAS OF FOCUS ──────────────── */}
        <div className="mt-12 sm:mt-14">
          <div className="about-header opacity-0 mb-6 flex items-center justify-between">
            <h3 className="font-space font-bold text-xl sm:text-2xl text-[var(--text-primary)] tracking-tight">
              Areas of Focus
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Area 1 */}
            <div className="focus-area-card opacity-0 neumorphic-card p-5 sm:p-6 flex flex-col justify-between space-y-4 border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl">
              <div>
                <div className="w-10 h-10 rounded-xl tactile-icon-socket flex items-center justify-center text-[var(--accent)] shrink-0 mb-3.5">
                  <Layout className="w-5 h-5" />
                </div>
                <h4 className="font-space font-bold text-base text-[var(--text-primary)] mb-2">
                  Frontend Development
                </h4>
                <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed text-justified">
                  Building responsive React and TypeScript interfaces. Developing modular components, managing UI state, and creating clean layouts that adapt seamlessly across all screen sizes.
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono-code text-[var(--accent)] font-semibold">
                React.js · TypeScript · Responsive Design · UI/UX
              </div>
            </div>

            {/* Area 2 */}
            <div className="focus-area-card opacity-0 neumorphic-card p-5 sm:p-6 flex flex-col justify-between space-y-4 border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl">
              <div>
                <div className="w-10 h-10 rounded-xl tactile-icon-socket flex items-center justify-center text-[var(--accent)] shrink-0 mb-3.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-space font-bold text-base text-[var(--text-primary)] mb-2">
                  AI Integration &amp; Prompts
                </h4>
                <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed text-justified">
                  Integrating Google Gemini API into web applications. Crafting structured prompts, evaluating edge cases, and engineering reliable fallback mechanisms.
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono-code text-[var(--accent)] font-semibold">
                Gemini API · Prompt Engineering · LLM Integration
              </div>
            </div>

            {/* Area 3 */}
            <div className="focus-area-card opacity-0 neumorphic-card p-5 sm:p-6 flex flex-col justify-between space-y-4 border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl sm:col-span-2 lg:col-span-1">
              <div>
                <div className="w-10 h-10 rounded-xl tactile-icon-socket flex items-center justify-center text-[var(--accent)] shrink-0 mb-3.5">
                  <Server className="w-5 h-5" />
                </div>
                <h4 className="font-space font-bold text-base text-[var(--text-primary)] mb-2">
                  Backend &amp; Databases
                </h4>
                <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed text-justified">
                  Writing REST APIs with Node.js and Express. Designing database schemas with MySQL and MongoDB, using Drizzle ORM for type-safe database queries.
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono-code text-[var(--accent)] font-semibold">
                Node.js · Express · MySQL · Drizzle ORM
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
