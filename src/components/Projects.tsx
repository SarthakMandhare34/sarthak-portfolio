import React, { useEffect, useRef, useState } from 'react';
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Stethoscope,
  TestTube2,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';
import anime from 'animejs';
import { ProjectDetailData, ProjectDetailModal } from './ProjectDetailModal';
import { TactileButton } from './TactileButton';

const ALL_PROJECTS: ProjectDetailData[] = [
  {
    id: 'lifelink',
    name: 'LifeLink',
    type: 'Major Academic Project · Prototype',
    statusBadge: 'Deployed on Render',
    subtitle: 'LifeLink — Smart Healthcare Assistance Platform',
    description:
      'A healthcare prototype with symptom checking, doctor search across 19 Mumbai railway stations, appointment booking, digital prescriptions, and an Emergency Health Passport. Powered by Gemini Flash guidance with built-in emergency checks, age-based rules, and safe fallback responses.',
    problemStatement:
      'Scattered clinic directories and missing medical records delay patient care. LifeLink brings doctor discovery across 19 Mumbai railway hubs, symptom checking, and appointment management into one dependable portal.',
    architectureHighlights: [
      'Built a healthcare prototype with symptom checking, doctor search, appointment booking, digital prescriptions, and an Emergency Health Passport, working mainly on the React/TypeScript frontend and wiring it to the backend and AI layer.',
      'Used Gemini Flash for symptom-based guidance, with built-in emergency checks, age-based rules, and a fallback response when the AI call fails.',
      'Built doctor search and appointment booking across 52 simulated doctors spanning 19 Mumbai railway stations.',
      'Modeled and managed application data in MySQL using Drizzle ORM.',
      'Deployed the prototype to Render, including the production environment and database connection setup.',
      'Wrote 247 tests across 33 files (1 skipped), covering unit and integration behavior.',
    ],
    stack: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'MySQL',
      'Drizzle ORM',
      'Gemini AI',
      'Render',
    ],
    imageSrc: '/images/projects/lifelink.png',
    liveHref: 'https://new-lifelink-smart-healthcare-assistance.onrender.com/',
    githubHref:
      'https://github.com/SarthakMandhare34/New-LifeLink-Smart-Healthcare-Assistance-Platform',
  },
  {
    id: 'luminahub',
    name: 'LuminaHub',
    type: 'AICTE Virtual Internship · IBM SkillsBuild',
    statusBadge: 'ID: BHIBMAC04046',
    internshipBadge: 'IBM SkillsBuild, AICTE',
    certificateId: 'BHIBMAC04046',
    certificateOrg: 'IBM SkillsBuild, AICTE & BharatCares',
    certificatePdfUrl: '/certificates/IBM_SkillsBuild_Certificate_BHIBMAC04046.pdf',
    subtitle: 'LuminaHub — Educational Diagnostic Pre-Grader',
    description:
      'An educational intelligence platform built during the IBM SkillsBuild virtual internship that reviews student homework submissions, flags conceptual misunderstandings, and generates adaptive follow-up practice questions.',
    problemStatement:
      'Standard homework grading shows a total score without identifying where a student got confused. LuminaHub analyzes reasoning steps and alerts instructors to class-wide learning gaps.',
    architectureHighlights: [
      'Built a platform that reviews student submissions, flags conceptual misunderstandings, and generates follow-up practice questions, using React, TypeScript, Node.js, Express, and the Gemini API.',
      'Implemented diagnostic grading, concept-mastery analysis, and adaptive hints so feedback changes based on where a student is stuck, rather than showing the same response to everyone.',
      'Built a teacher-facing analytics view so instructors can see which concepts a class is struggling with, not just individual scores.',
      'Tested and evaluated the integrated AI features with test fixtures and structured prompts before merging them into the main UI.',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Gemini API'],
    imageSrc: '/images/projects/luminahub.png',
    liveHref: 'https://lumina-hub-pyyu.onrender.com/',
    githubHref: 'https://github.com/SarthakMandhare34/lumina-hub-',
  },
  {
    id: 'knowthyself',
    name: 'KnowThySelf',
    type: 'Group Project · Frontend Contribution',
    statusBadge: 'Deployed on Vercel',
    subtitle: 'KnowThySelf — MBTI Personality Assessment Platform',
    description:
      'A five-page MBTI personality assessment and recommendation platform featuring a dynamic questionnaire flow, real-time trait scoring with percentage calculations, and a tailored results dashboard.',
    problemStatement:
      'Standard online personality quizzes often present rigid interfaces without actionable growth insights. KnowThySelf delivers an interactive, responsive questionnaire with live trait score breakdowns and personalized recommendations.',
    architectureHighlights: [
      'Built all five frontend pages (home, login, test, dashboard, recommendations) for a personality assessment platform.',
      'Built the questionnaire flow: slide-based cards, transitions between questions, and trait scoring with percentage calculations.',
      'Built the results dashboard, including visual trait bars and written personality insights.',
      'Designed the interface with responsive glassmorphism and bento-grid layouts with an interactive HTML5 Canvas background.',
      'Connected the frontend to the backend for personality results and recommendations.',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
    imageSrc: '/images/projects/knowthyself.png',
    liveHref: 'https://knowthyself-frontend-eight.vercel.app/home.html',
    githubHref: 'https://github.com/shubhra-1337/KnowThySelf_CE_Frontend',
    backendGithubHref: 'https://github.com/shubhra-1337/KnowThySelf_CE_Backend',
  },
  {
    id: 'heatsafe',
    name: 'HeatSafe AI',
    type: 'AICTE Virtual Internship · Lenovo LEAP',
    statusBadge: 'ID: 6302092',
    internshipBadge: 'Lenovo LEAP, AICTE',
    certificateId: '6302092',
    certificateOrg: 'Lenovo LEAP NextGen Scholar Program, AICTE',
    certificatePdfUrl: '/certificates/Lenovo_LEAP_Certificate_6302092.pdf',
    subtitle: 'HeatSafe AI — Climate Heatwave Safety Platform',
    description:
      'An extreme-heat safety application created for the Lenovo LEAP NextGen Scholar Program covering heat-risk assessment, hydration planning, AI symptom checking, and emergency guidance.',
    problemStatement:
      'Severe summer heatwaves cause heatstroke and dehydration. HeatSafe AI turns local weather metrics into daily safety plans and early warning indicators for vulnerable groups.',
    architectureHighlights: [
      'Built the React and TypeScript frontend (via Vite) for an extreme-heat safety app, covering heat-risk assessment, hydration planning, symptom checking, and emergency guidance.',
      'Wrote prompts for the Gemini API to power the symptom-checking and safety-guidance features, then tested and adjusted them against edge cases such as conflicting symptoms and missing inputs.',
      'Integrated the AI-assisted components into the existing interface and fixed issues found during testing.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Gemini API', 'Tailwind CSS'],
    imageSrc: '/images/projects/heatsafe.png',
    liveHref: null,
    githubHref: 'https://github.com/SarthakMandhare34/Heat-safe',
  },
];

type FilterCategory = 'all' | 'academic' | 'internship';

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectDetailData | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredProjects = ALL_PROJECTS.filter((p) => {
    if (activeFilter === 'academic') return p.type.includes('Academic') || p.type.includes('Group Project');
    if (activeFilter === 'internship') return p.type.includes('AICTE Virtual Internship');
    return true;
  });

  // Snappy Anime.js scroll animation
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const headers = sectionEl.querySelectorAll('.project-header');
    const cards = sectionEl.querySelectorAll('.project-grid-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime.remove([sectionEl, headers, cards]);

            anime({
              targets: sectionEl,
              opacity: [0, 1],
              translateY: [10, 0],
              duration: 360,
              easing: 'cubicBezier(0.16, 1, 0.3, 1)',
            });

            anime({
              targets: headers,
              opacity: [0, 1],
              translateY: [10, 0],
              duration: 340,
              easing: 'easeOutCubic',
              delay: 30,
            });

            anime({
              targets: cards,
              opacity: [0, 1],
              translateY: [12, 0],
              delay: anime.stagger(40, { start: 60 }),
              duration: 350,
              easing: 'easeOutCubic',
            });
          } else {
            anime.remove([sectionEl, headers, cards]);
            anime({
              targets: [sectionEl, headers, cards],
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

  const handleFilterChange = (cat: FilterCategory) => {
    setActiveFilter(cat);
    setTimeout(() => {
      anime.remove('.project-grid-card');
      anime({
        targets: '.project-grid-card',
        opacity: [0, 1],
        translateY: [10, 0],
        delay: anime.stagger(35),
        duration: 320,
        easing: 'easeOutCubic',
      });
    }, 20);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="w-full bg-[var(--bg-base)] py-14 sm:py-20 md:py-26 transition-colors duration-450 border-t border-[var(--border)] relative opacity-0"
    >
      <div id="projects" className="absolute -top-16 left-0 w-0 h-0 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ──────────────── SECTION HEADER ──────────────── */}
        <div className="project-header mb-7 sm:mb-10 max-w-3xl opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] text-xs font-mono-code text-[var(--accent)] mb-3">
            <span>Academic &amp; Virtual Internships</span>
          </div>
          <h2 className="font-display font-bold text-[clamp(26px,5.5vw,44px)] text-[var(--text-primary)] leading-[1.12] tracking-tight">
            Academic Projects &amp; Virtual Internships
          </h2>
          <p className="font-inter text-[13px] sm:text-[15px] md:text-[16px] text-[var(--text-secondary)] mt-1.5 leading-relaxed">
            Production web applications and AICTE virtual internship capstones showcased in desktop &amp; laptop mockup frames.
          </p>
        </div>

        {/* ──────────────── CATEGORY FILTER BAR ──────────────── */}
        <div className="project-header opacity-0 mb-7 sm:mb-10 flex flex-wrap items-center gap-2 sm:gap-3 border-b border-[var(--border)] pb-4">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeFilter === 'all'
                ? 'neumorphic-btn !bg-[var(--accent)] !text-[#001011] font-bold shadow-sm'
                : 'neumorphic-btn text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            All Projects ({ALL_PROJECTS.length})
          </button>
          <button
            onClick={() => handleFilterChange('academic')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeFilter === 'academic'
                ? 'neumorphic-btn !bg-[var(--accent)] !text-[#001011] font-bold shadow-sm'
                : 'neumorphic-btn text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Major Academic Projects
          </button>
          <button
            onClick={() => handleFilterChange('internship')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeFilter === 'internship'
                ? 'neumorphic-btn !bg-[var(--accent)] !text-[#001011] font-bold shadow-sm'
                : 'neumorphic-btn text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Virtual Internships (IBM &amp; Lenovo)
          </button>
        </div>

        {/* ──────────────── 2-COLUMN DESKTOP & LAPTOP SHOWCASE GRID (2x2) ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="project-grid-card neumorphic-card group relative p-5 sm:p-6 lg:p-7 transition-all duration-300 opacity-0 border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl flex flex-col justify-between space-y-5 hover:border-[var(--accent)]/50 hover:shadow-xl"
            >
              <div className="space-y-4">
                {/* ────── REALISTIC DESKTOP / LAPTOP BROWSER WINDOW MOCKUP ────── */}
                <div
                  className="relative rounded-xl overflow-hidden border border-[var(--border)] bg-[#0d1527] shadow-md cursor-pointer group/mockup"
                  onClick={() => setSelectedProject(project)}
                  title="Click to view full architecture & details"
                >
                  {/* Laptop / Browser Chrome Header Bar */}
                  <div className="flex items-center justify-between px-3 py-2 bg-[#172339] border-b border-white/10 select-none">
                    {/* Mac Traffic Light Control Dots */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                    </div>

                    {/* Desktop Address Bar Pill */}
                    <div className="px-2.5 py-0.5 rounded-md bg-black/40 border border-white/5 text-[10px] font-mono-code text-[var(--accent)] truncate max-w-[180px] sm:max-w-[220px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse shrink-0" />
                      <span className="truncate">
                        {project.id === 'lifelink'
                          ? 'lifelink.onrender.com'
                          : project.id === 'luminahub'
                          ? 'lumina-hub.onrender.com'
                          : project.id === 'knowthyself'
                          ? 'knowthyself.vercel.app'
                          : 'heatsafe-ai.app'}
                      </span>
                    </div>

                    {/* Status Pill */}
                    <div className="text-[10px] font-mono-code text-white/70 truncate max-w-[100px] sm:max-w-none">
                      {project.statusBadge}
                    </div>
                  </div>

                  {/* Laptop Display Screen (16:10 Aspect Ratio) */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#070d19]">
                    <img
                      src={project.imageSrc}
                      alt={`${project.name} preview`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/mockup:scale-[1.03]"
                      onError={(e) => {
                        // Safe fallback without disappearing
                        e.currentTarget.onerror = null;
                      }}
                    />

                    {/* Internship Badge Pill if applicable */}
                    {project.internshipBadge && (
                      <div className="absolute bottom-2.5 left-2.5 z-10 bg-black/75 border border-[var(--accent)] rounded-md px-2.5 py-0.5 font-mono-code text-[10px] font-bold text-[var(--accent)] backdrop-blur-md shadow-xs">
                        {project.internshipBadge}
                      </div>
                    )}
                  </div>
                </div>

                {/* ────── CONTENT & DESCRIPTION ────── */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-code mb-1">
                    <span className="text-[var(--accent)] uppercase font-semibold">
                      {project.type}
                    </span>
                  </div>

                  <h3 className="font-space font-bold text-xl sm:text-2xl text-[var(--text-primary)] tracking-tight">
                    {project.name}
                  </h3>
                  <p className="font-inter text-xs font-semibold text-[var(--text-secondary)] mt-0.5">
                    {project.subtitle}
                  </p>

                  <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-2.5 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Specific Callouts for LifeLink */}
                {project.id === 'lifelink' && (
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="p-2.5 rounded-xl tactile-inset">
                      <div className="flex items-center gap-1.5 font-mono-code text-base font-bold text-[var(--accent)]">
                        <Stethoscope className="w-3.5 h-3.5 text-[var(--accent)]" />
                        <span>52</span>
                      </div>
                      <span className="text-[10px] font-inter text-[var(--text-secondary)] block truncate">
                        Simulated Doctors (19 Stations)
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl tactile-inset">
                      <div className="flex items-center gap-1.5 font-mono-code text-base font-bold text-[var(--accent)]">
                        <TestTube2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                        <span>247</span>
                      </div>
                      <span className="text-[10px] font-inter text-[var(--text-secondary)] block truncate">
                        Automated Tests (33 Files)
                      </span>
                    </div>
                  </div>
                )}

                {/* Certificate Access Strip for Virtual Internships */}
                {project.certificateId && project.certificatePdfUrl && (
                  <div className="p-2.5 rounded-xl tactile-inset flex items-center justify-between text-xs font-mono-code">
                    <div className="flex items-center gap-1.5 text-[var(--accent)] font-semibold truncate">
                      <Award className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">AICTE Credential: {project.certificateId}</span>
                    </div>
                    <a
                      href={project.certificatePdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] hover:underline inline-flex items-center gap-1 font-bold shrink-0 ml-2"
                    >
                      <span>PDF ↗</span>
                    </a>
                  </div>
                )}

                {/* Stack Chips */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="tactile-chip px-2 py-0.5 font-mono-code text-[10px] sm:text-[11px] text-[var(--accent)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-3.5 border-t border-[var(--border)] flex flex-wrap items-center gap-2">
                <TactileButton
                  onClick={() => setSelectedProject(project)}
                  variant="secondary"
                  size="sm"
                  title="View full architecture and testing details"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </TactileButton>

                {project.liveHref && (
                  <TactileButton
                    href={project.liveHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="sm"
                  >
                    <span>Visit App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </TactileButton>
                )}

                {project.githubHref && (
                  <TactileButton
                    href={project.githubHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="sm"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </TactileButton>
                )}

                {project.backendGithubHref && (
                  <TactileButton
                    href={project.backendGithubHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="sm"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Backend</span>
                  </TactileButton>
                )}

                {project.certificatePdfUrl && (
                  <TactileButton
                    href={project.certificatePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="sm"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Certificate</span>
                  </TactileButton>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* ──────────────── COMPREHENSIVE PROJECT DETAIL MODAL ──────────────── */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
