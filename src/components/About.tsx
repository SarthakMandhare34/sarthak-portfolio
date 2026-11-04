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
            // Smooth exit reset for continuous bi-directional scroll animation
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
            <span>About Me</span>
          </div>
          <h2 className="font-display font-bold text-[clamp(26px,5.5vw,44px)] text-[var(--text-primary)] leading-[1.12] tracking-tight">
            Sarthak Mandhare
          </h2>
          <p className="font-inter text-[13px] sm:text-[15px] md:text-[16px] text-[var(--text-secondary)] mt-1.5 leading-relaxed">
            Full-Stack Software Developer based in Dombivli, Mumbai.
          </p>
        </div>

        {/* ──────────────── DUAL-COLUMN GRID: NARRATIVE + PROFILE SNAPSHOT ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-stretch">
          
          {/* Main Bio Container (7 cols) */}
          <div className="about-anim-card opacity-0 neumorphic-card p-4 sm:p-7 md:p-8 space-y-5 lg:col-span-7 flex flex-col justify-between border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl">
            <div className="space-y-4 font-inter text-[13px] sm:text-[15px] md:text-[16px] text-[var(--text-secondary)] leading-relaxed">
              <p>
                I am a frontend-leaning full-stack developer who builds AI-integrated web applications with React, TypeScript, and Node.js. Currently completing my <strong className="text-[var(--text-primary)] font-semibold">Bachelor of Science in Computer Science</strong> at <strong className="text-[var(--text-primary)] font-semibold">Keraleeya Samajam&apos;s Model College (Autonomous)</strong> in Dombivli (Current Semester: 6th, Current CGPA: 6.95/10, Expected Graduation: 2027).
              </p>
              <p>
                I have shipped two production-deployed projects: <strong className="text-[var(--text-primary)] font-semibold">LifeLink</strong>, a smart healthcare assistance platform on Render with AI symptom guidance and clinic booking across 19 Mumbai railway stations, and <strong className="text-[var(--text-primary)] font-semibold">KnowThySelf</strong>, an MBTI personality assessment and recommendation platform on Vercel. In addition, I completed two AI-focused virtual internships with <strong className="text-[var(--text-primary)] font-semibold">IBM SkillsBuild</strong> and <strong className="text-[var(--text-primary)] font-semibold">Lenovo LEAP</strong>, engineering diagnostic pre-grading and climate heat-safety platforms powered by the Gemini API.
              </p>
              <p>
                I prioritise clean component architecture, reliable REST APIs, database modeling with Drizzle ORM, rigorous automated testing, and dependable cloud deployments to deliver fast, intuitive, and practical digital products.
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

          {/* Developer Snapshot Card (5 cols) */}
          <div className="about-anim-card opacity-0 neumorphic-card p-4 sm:p-7 md:p-8 lg:col-span-5 flex flex-col justify-between space-y-5 border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5 mb-4">
                <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--text-primary)]">
                  Developer Snapshot
                </h3>
                <span className="tactile-chip px-2.5 py-0.5 font-mono-code text-xs text-[var(--accent)] font-semibold shrink-0">
                  Semester 6 · CGPA 6.95
                </span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm font-inter">
                <div className="flex items-start gap-3 p-3 rounded-xl tactile-inset">
                  <GraduationCap className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[var(--text-dim)] font-mono-code text-[11px] block uppercase">
                      Degree &amp; College
                    </span>
                    <span className="text-[var(--text-primary)] font-medium block">
                      Bachelor of Science in Computer Science
                    </span>
                    <p className="text-[var(--text-secondary)] text-xs mt-0.5">
                      Keraleeya Samajam&apos;s Model College (Autonomous) · 2027
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl tactile-inset">
                  <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[var(--text-dim)] font-mono-code text-[11px] block uppercase">
                      Location
                    </span>
                    <span className="text-[var(--text-primary)] font-medium block">
                      Dombivli, Mumbai, Maharashtra, India
                    </span>
                    <p className="text-[var(--text-secondary)] text-xs mt-0.5">
                      Available for on-site, hybrid, and remote technical roles
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl tactile-inset">
                  <ShieldCheck className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[var(--text-dim)] font-mono-code text-[11px] block uppercase">
                      Virtual Internships (AICTE)
                    </span>
                    <span className="text-[var(--text-primary)] font-medium block">
                      IBM SkillsBuild &amp; Lenovo LEAP
                    </span>
                    <p className="text-[var(--text-secondary)] text-xs mt-0.5">
                      IDs: BHIBMAC04046 &amp; 6302092
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
                <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
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
                <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Integrating Google Gemini API into web applications. Crafting structured prompts, evaluating edge cases in Google AI Studio, and engineering reliable fallback mechanisms.
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono-code text-[var(--accent)] font-semibold">
                Gemini API · Prompt Engineering · Google AI Studio
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
                <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Engineering backend services and REST APIs with Node.js and Express. Modeling application data in MySQL and MongoDB with Drizzle ORM, backed by unit and integration testing.
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono-code text-[var(--accent)] font-semibold">
                Node.js · Express.js · MySQL · MongoDB · Drizzle ORM
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
