import React from 'react';
import {
  Code2,
  Layout,
  Server,
  Database,
  Sparkles,
  CheckCircle2,
  Terminal,
  ShieldCheck,
} from 'lucide-react';

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: Code2,
    skills: ['TypeScript', 'JavaScript', 'Python', 'SQL'],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: Layout,
    skills: ['React.js', 'HTML5', 'CSS3', 'Responsive Design', 'UI/UX'],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: Server,
    skills: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    id: 'databases',
    title: 'Databases & ORM',
    icon: Database,
    skills: ['MySQL', 'MongoDB', 'Drizzle ORM'],
  },
  {
    id: 'ai',
    title: 'AI Integration',
    icon: Sparkles,
    skills: ['Google Gemini API', 'Prompt Engineering', 'AI Integration', 'LLM Workflows'],
  },
  {
    id: 'testing',
    title: 'Testing',
    icon: CheckCircle2,
    skills: ['Unit Testing', 'Integration Testing', 'Test Mocking'],
  },
  {
    id: 'tools',
    title: 'Tools & Deployment',
    icon: Terminal,
    skills: ['Git', 'GitHub', 'npm', 'Render', 'Vercel'],
  },
  {
    id: 'auth',
    title: 'Authentication',
    icon: ShieldCheck,
    skills: ['OAuth 2.0', 'Session-based Authentication'],
  },
];

export function Skills() {
  return (
    <section
      id="skills"
      className="w-full bg-transparent py-14 sm:py-20 md:py-28 transition-colors duration-450 border-t border-[var(--border)] relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ──────────────── SECTION HEADER ──────────────── */}
        <div className="scroll-reveal scroll-scale-up mb-7 sm:mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full dual-primary-badge text-xs font-mono-code text-[var(--primary-2)] mb-3 font-semibold">
            <span>Skills</span>
          </div>
          <h2 className="font-display font-bold text-[clamp(26px,5.5vw,44px)] text-[var(--text-primary)] leading-[1.12] tracking-tight">
            Skills &amp; Technologies
          </h2>
          <p className="font-inter text-[13px] sm:text-[15px] md:text-[16px] text-[var(--text-secondary)] mt-1.5 leading-relaxed text-justified">
            Technologies and tools I use to build full-stack web applications.
          </p>
        </div>

        {/* ──────────────── 8 SKILL CARDS (50:50 DUAL-PRIMARY CHECKERBOARD) ──────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const IconComponent = cat.icon;
            const staggerClass = `stagger-${(idx % 4) + 1}`;
            const isP2 = idx % 2 === 1;

            return (
              <div
                key={cat.id}
                className={`skill-card scroll-reveal scroll-flip-up ${staggerClass} ${
                  isP2 ? 'neumorphic-card-p2' : 'neumorphic-card'
                } p-4 sm:p-6 rounded-2xl flex flex-col justify-between hover:border-[var(--primary-2)] transition-all duration-300`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl ${
                    isP2 ? 'tactile-icon-socket-p2' : 'tactile-icon-socket'
                  } flex items-center justify-center text-[var(--primary-2)] shrink-0 mb-3.5`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)] mb-2.5">
                    {cat.title}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div className="pt-3 border-t border-[var(--border)] flex flex-wrap gap-1.5 font-mono-code text-[11px] sm:text-[12px]">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={skill}
                      className={`${
                        (sIdx + idx) % 2 === 0 ? 'tactile-chip text-[var(--text-primary)]' : 'tactile-chip-p2 text-[var(--primary-2)]'
                      } px-2.5 py-1`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
