import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
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
  const sectionRef = useRef<HTMLElement>(null);

  // Butter-smooth 60fps/120fps Anime.js bi-directional scroll animation
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const header = sectionEl.querySelector('.skills-header');
    const cards = sectionEl.querySelectorAll('.skill-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime.remove([sectionEl, header, cards]);

            // Animate main section wrapper
            anime({
              targets: sectionEl,
              opacity: [0, 1],
              translateY: [10, 0],
              duration: 360,
              easing: 'cubicBezier(0.16, 1, 0.3, 1)',
            });

            // Animate section header
            anime({
              targets: header,
              opacity: [0, 1],
              translateY: [10, 0],
              duration: 340,
              easing: 'easeOutCubic',
              delay: 30,
            });

            // Animate 8 skill cards with snappy micro-stagger
            anime({
              targets: cards,
              opacity: [0, 1],
              translateY: [12, 0],
              delay: anime.stagger(25, { start: 50 }),
              duration: 340,
              easing: 'easeOutCubic',
            });
          } else {
            // Smooth exit reset for continuous bi-directional scroll animation
            anime.remove([sectionEl, header, cards]);
            anime({
              targets: [sectionEl, header, cards],
              opacity: 0,
              translateY: 8,
              duration: 200,
              easing: 'easeInQuad',
            });
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full bg-[var(--bg-base)] py-14 sm:py-20 md:py-28 transition-colors duration-450 border-t border-[var(--border)] relative opacity-0"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ──────────────── SECTION HEADER ──────────────── */}
        <div className="skills-header mb-7 sm:mb-10 max-w-3xl opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] text-xs font-mono-code text-[var(--accent)] mb-3">
            <span>Capabilities</span>
          </div>
          <h2 className="font-display font-bold text-[clamp(26px,5.5vw,44px)] text-[var(--text-primary)] leading-[1.12] tracking-tight">
            Skills
          </h2>
          <p className="font-inter text-[13px] sm:text-[15px] md:text-[16px] text-[var(--text-secondary)] mt-1.5 leading-relaxed">
            Technologies, libraries, and tools I use to build full-stack web applications.
          </p>
        </div>

        {/* ──────────────── 8 SKILL CARDS ──────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {SKILL_CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;

            return (
              <div
                key={cat.id}
                className="skill-card opacity-0 neumorphic-card p-4 sm:p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]/90 flex flex-col justify-between hover:border-[var(--accent)] transition-all duration-300"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl tactile-icon-socket flex items-center justify-center text-[var(--accent)] shrink-0 mb-3.5">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)] mb-2.5">
                    {cat.title}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div className="pt-3 border-t border-[var(--border)] flex flex-wrap gap-1.5 font-mono-code text-[11px] sm:text-[12px]">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="tactile-chip px-2.5 py-1 text-[var(--text-primary)]"
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
