import React from 'react';
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

export function About() {
  return (
    <section
      id="about"
      className="w-full bg-[var(--bg-base)] py-14 sm:py-20 md:py-28 transition-colors duration-450 border-t border-[var(--border)] relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ──────────────── SECTION HEADER ──────────────── */}
        <div className="scroll-reveal scroll-clip-up mb-7 sm:mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] text-xs font-mono-code text-[var(--accent)] mb-3">
            <span>About</span>
          </div>
          <h2 className="font-display font-bold text-[clamp(26px,5.5vw,44px)] text-[var(--text-primary)] leading-[1.12] tracking-tight">
            About Me
          </h2>
          <p className="font-inter text-[13px] sm:text-[15px] md:text-[16px] text-[var(--text-secondary)] mt-1.5 leading-relaxed text-justified">
            A quick look at my background, skills, and how I build software.
          </p>
        </div>

        {/* ──────────────── DUAL-COLUMN GRID: A. NARRATIVE + B. SNAPSHOT ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-stretch">
          
          {/* ────── A. WHO I AM (7 cols) ────── */}
          <div className="scroll-reveal scroll-slide-left neumorphic-card p-5 sm:p-7 md:p-8 space-y-5 lg:col-span-7 flex flex-col justify-between border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl">
            <div className="space-y-4 font-inter text-[13px] sm:text-[15px] md:text-[16px] text-[var(--text-secondary)] leading-relaxed">
              <h3 className="font-space font-bold text-lg sm:text-xl text-[var(--text-primary)]">
                Who I Am
              </h3>
              
              <p className="text-justified">
                I am currently a Computer Science student at <strong className="text-[var(--text-primary)] font-semibold">Keraleeya Samajam&apos;s Model College (Autonomous)</strong> in Dombivli, Mumbai (graduating in 2027). I enjoy taking ideas and turning them into real, working web applications that people can easily use.
              </p>
              
              <p className="text-justified">
                For frontend development, I build clean and responsive user interfaces with <strong className="text-[var(--text-primary)] font-semibold">React</strong> and <strong className="text-[var(--text-primary)] font-semibold">TypeScript</strong>. For the backend, I create reliable APIs with <strong className="text-[var(--text-primary)] font-semibold">Node.js</strong> and <strong className="text-[var(--text-primary)] font-semibold">Express</strong>, paired with databases like <strong className="text-[var(--text-primary)] font-semibold">MySQL</strong> and <strong className="text-[var(--text-primary)] font-semibold">MongoDB</strong> using <strong className="text-[var(--text-primary)] font-semibold">Drizzle ORM</strong>.
              </p>
              
              <p className="text-justified">
                I also have practical experience integrating AI with the <strong className="text-[var(--text-primary)] font-semibold">Google Gemini API</strong>. I write structured prompts and add clear fallback rules so the application continues working smoothly even when an AI service is slow or unavailable.
              </p>

              <p className="text-justified">
                My approach is simple: write clean, maintainable code, test thoroughly, and build software that works reliably in the real world.
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

          {/* ────── B. QUICK INFO (5 cols) ────── */}
          <div className="scroll-reveal scroll-slide-right neumorphic-card p-5 sm:p-7 md:p-8 lg:col-span-5 flex flex-col justify-between space-y-5 border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5 mb-4">
                <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--text-primary)]">
                  Quick Info
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
                      Current CGPA
                    </span>
                    <span className="text-[var(--accent)] font-mono-code font-bold text-sm sm:text-base mt-0.5 block">
                      6.95 <span className="text-xs text-[var(--text-dim)] font-normal">/ 10</span>
                    </span>
                    <span className="text-[10px] text-[var(--text-secondary)] block">
                      Verified Grade
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
                      Open to on-site, hybrid, and remote developer roles
                    </p>
                  </div>
                </div>

                {/* Internship Experience */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl tactile-inset">
                  <ShieldCheck className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[var(--text-dim)] font-mono-code text-[11px] block uppercase">
                      Virtual Internships
                    </span>
                    <span className="text-[var(--text-primary)] font-semibold block">
                      Lenovo LEAP &amp; IBM SkillsBuild
                    </span>
                    <p className="text-[var(--text-secondary)] text-xs mt-0.5 text-justified">
                      Two 6-week AICTE virtual internships with verified certificates
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
          <div className="scroll-reveal scroll-slide-down mb-6 flex items-center justify-between">
            <h3 className="font-space font-bold text-xl sm:text-2xl text-[var(--text-primary)] tracking-tight">
              What I Do
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Area 1 */}
            <div className="scroll-reveal scroll-flip-up stagger-1 neumorphic-card p-5 sm:p-6 flex flex-col justify-between space-y-4 border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl">
              <div>
                <div className="w-10 h-10 rounded-xl tactile-icon-socket flex items-center justify-center text-[var(--accent)] shrink-0 mb-3.5">
                  <Layout className="w-5 h-5" />
                </div>
                <h4 className="font-space font-bold text-base text-[var(--text-primary)] mb-2">
                  Frontend Development
                </h4>
                <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed text-justified">
                  Building responsive, clean web interfaces with React and TypeScript. I care about intuitive navigation, fast load times, and layouts that look great on phones and desktops.
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono-code text-[var(--accent)] font-semibold">
                React.js · TypeScript · Tailwind CSS
              </div>
            </div>

            {/* Area 2 */}
            <div className="scroll-reveal scroll-flip-up stagger-2 neumorphic-card p-5 sm:p-6 flex flex-col justify-between space-y-4 border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl">
              <div>
                <div className="w-10 h-10 rounded-xl tactile-icon-socket flex items-center justify-center text-[var(--accent)] shrink-0 mb-3.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-space font-bold text-base text-[var(--text-primary)] mb-2">
                  AI Integration
                </h4>
                <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed text-justified">
                  Connecting the Google Gemini API to web apps. I write structured prompts, test tricky inputs, and build smart fallbacks so features stay dependable.
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono-code text-[var(--accent)] font-semibold">
                Gemini API · Prompt Engineering · Workflows
              </div>
            </div>

            {/* Area 3 */}
            <div className="scroll-reveal scroll-flip-up stagger-3 neumorphic-card p-5 sm:p-6 flex flex-col justify-between space-y-4 border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl sm:col-span-2 lg:col-span-1">
              <div>
                <div className="w-10 h-10 rounded-xl tactile-icon-socket flex items-center justify-center text-[var(--accent)] shrink-0 mb-3.5">
                  <Server className="w-5 h-5" />
                </div>
                <h4 className="font-space font-bold text-base text-[var(--text-primary)] mb-2">
                  Backend &amp; Databases
                </h4>
                <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed text-justified">
                  Writing REST APIs with Node.js and Express, and setting up clean database schemas with MySQL, MongoDB, and Drizzle ORM.
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono-code text-[var(--accent)] font-semibold">
                Node.js · Express · MySQL · MongoDB
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
