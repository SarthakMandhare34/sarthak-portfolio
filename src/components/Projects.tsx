import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  TestTube2,
  Award,
  Sparkles,
  CheckCircle2,
  Code2,
  Layers,
  Cpu,
} from 'lucide-react';
import { TactileButton } from './TactileButton';

export interface ProjectData {
  id: string;
  name: string;
  type: string;
  statusBadge: string;
  internshipBadge?: string;
  certificateId?: string;
  certificateOrg?: string;
  certificatePdfUrl?: string;
  subtitle: string;
  description: string;
  myContribution: string;
  problemStatement: string;
  architectureHighlights: string[];
  stack: string[];
  imageSrc: string;
  liveHref: string | null;
  githubHref: string;
  backendGithubHref?: string;
}

const ALL_PROJECTS: ProjectData[] = [
  {
    id: 'lifelink',
    name: 'LifeLink',
    type: 'Major Academic Project · Prototype',
    statusBadge: 'Deployed on Render',
    subtitle: 'LifeLink — Smart Healthcare Assistance Platform',
    description:
      'A healthcare prototype connecting patients with medical specialists. Features include AI-guided symptom triage, doctor discovery across 19 Mumbai railway stations, appointment booking, digital prescriptions, and an Emergency Health Passport. Powered by Gemini Flash guidance with built-in emergency checks, age-based rules, and safe fallback responses.',
    myContribution:
      'Primary contribution: Lead frontend architecture and UI development in React and TypeScript, integration with backend endpoints, Drizzle ORM data modeling in MySQL, Gemini Flash AI implementation with safety fallbacks, and comprehensive test suite (247 tests across 33 files).',
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
      'tRPC',
      'SSE',
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
      'An educational diagnostic platform developed during the IBM SkillsBuild virtual internship that reviews student homework submissions, identifies conceptual misunderstandings, and generates adaptive follow-up practice exercises.',
    myContribution:
      'Internship contribution: Built the complete diagnostic grading interface with React and TypeScript, structured prompt evaluation for Gemini API, teacher analytics dashboard for class-wide learning gaps, and adaptive feedback loops.',
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
    myContribution:
      'Collaborative frontend contribution: Built all five user-facing pages (home, login, questionnaire, dashboard, recommendations), smooth card slide transitions, real-time trait score math, and HTML5 Canvas interactive background.',
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
      'An extreme-heat safety application created for the Lenovo LEAP NextGen Scholar Program covering heat-risk assessment, hydration planning, AI symptom checking, and emergency guidance. Codebase and Gemini prompt engineering templates are available on GitHub.',
    myContribution:
      'Internship contribution: Built the responsive React and TypeScript frontend with Vite and Tailwind CSS, engineered structured prompt workflows for Google Gemini API, tested edge cases for conflicting symptoms, and integrated safety checklists.',
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
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredProjects = ALL_PROJECTS.filter((p) => {
    if (activeFilter === 'academic') return p.type.includes('Academic') || p.type.includes('Group Project');
    if (activeFilter === 'internship') return p.type.includes('AICTE Virtual Internship');
    return true;
  });

  const toggleProject = (id: string) => {
    setExpandedProjectId((prev) => {
      const next = prev === id ? null : id;
      if (next) {
        setTimeout(() => {
          const cardEl = document.getElementById(`project-${id}`);
          if (cardEl) {
            const rect = cardEl.getBoundingClientRect();
            if (rect.top < 70 || rect.top > window.innerHeight - 250) {
              const navHeight = 68;
              const elementPosition = cardEl.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - navHeight;
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
              });
            }
          }
        }, 60);
      }
      return next;
    });
  };

  const handleFilterChange = (cat: FilterCategory) => {
    setActiveFilter(cat);
    setExpandedProjectId(null);
  };

  return (
    <section
      id="work"
      className="w-full bg-[var(--bg-base)] py-14 sm:py-20 md:py-26 transition-colors duration-450 border-t border-[var(--border)] relative"
    >
      <div id="projects" className="absolute -top-16 left-0 w-0 h-0 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ──────────────── SECTION HEADER ──────────────── */}
        <div className="scroll-reveal scroll-blur-clear mb-7 sm:mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] text-xs font-mono-code text-[var(--accent)] mb-3">
            <span>Projects</span>
          </div>
          <h2 className="font-display font-bold text-[clamp(26px,5.5vw,44px)] text-[var(--text-primary)] leading-[1.12] tracking-tight">
            Projects &amp; Virtual Internships
          </h2>
          <p className="font-inter text-[13px] sm:text-[15px] md:text-[16px] text-[var(--text-secondary)] mt-1.5 leading-relaxed text-justified">
            Web applications and AICTE virtual internships I&apos;ve built. Click &ldquo;Details&rdquo; on any project to see its architecture and how it works.
          </p>
        </div>

        {/* ──────────────── CATEGORY FILTER BAR (macOS SEGMENTED CONTROL) ──────────────── */}
        <div className="scroll-reveal scroll-slide-down stagger-1 mb-7 sm:mb-10 flex items-center border-b border-[var(--border)] pb-4">
          <div className="p-1 rounded-2xl bg-[var(--bg-inset)]/70 border border-[var(--border)] inline-flex flex-wrap gap-1">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[var(--bg-elevated)] text-[var(--accent)] font-semibold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]/40'
              }`}
            >
              All Projects ({ALL_PROJECTS.length})
            </button>
            <button
              onClick={() => handleFilterChange('academic')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === 'academic'
                  ? 'bg-[var(--bg-elevated)] text-[var(--accent)] font-semibold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]/40'
              }`}
            >
              Major Academic Projects
            </button>
            <button
              onClick={() => handleFilterChange('internship')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === 'internship'
                  ? 'bg-[var(--bg-elevated)] text-[var(--accent)] font-semibold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]/40'
              }`}
            >
              Virtual Internships (IBM &amp; Lenovo)
            </button>
          </div>
        </div>

        {/* ──────────────── 4 DISTINCT SHOWCASE CARDS (EXPANDS IN ITS OWN SPACE) ──────────────── */}
        <div className="space-y-6 sm:space-y-8">
          {filteredProjects.map((project, idx) => {
            const isExpanded = expandedProjectId === project.id;
            const animClass = idx % 2 === 0 ? 'scroll-slide-left' : 'scroll-slide-right';

            return (
              <article
                key={project.id}
                id={`project-${project.id}`}
                className={`project-showcase-card scroll-reveal ${animClass} neumorphic-card group relative p-5 sm:p-7 md:p-8 transition-all duration-300 border border-[var(--border)] bg-[var(--bg-elevated)] rounded-2xl ${
                  isExpanded ? 'ring-2 ring-[var(--accent)]/50 shadow-xl' : 'hover:border-[var(--accent)]/40'
                }`}
              >
                {/* ────── MAIN PROJECT ROW (PREVIEW + CONTENT) ────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                  
                  {/* LEFT: Realistic macOS Desktop Preview Frame (5 cols) */}
                  <div
                    className="lg:col-span-5 cursor-pointer"
                    onClick={() => toggleProject(project.id)}
                    title={isExpanded ? 'Click to hide details' : 'Click to view details in place'}
                  >
                    <div className="relative rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-surface)] shadow-md group-hover:border-[var(--accent)]/60 transition-all">
                      {/* Browser Chrome Top Bar */}
                      <div className="flex items-center justify-between px-3 py-2 bg-[var(--bg-inset)] border-b border-[var(--border)] select-none">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                        </div>
                        <div className="px-2.5 py-0.5 rounded-md bg-[var(--bg-elevated)] border border-[var(--border)] text-[10px] font-mono-code text-[var(--accent)] truncate max-w-[200px] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse shrink-0" />
                          <span className="truncate">
                            {project.id === 'lifelink'
                              ? 'lifelink.onrender.com'
                              : project.id === 'luminahub'
                              ? 'lumina-hub.onrender.com'
                              : project.id === 'knowthyself'
                              ? 'knowthyself.vercel.app'
                              : 'github.com/SarthakMandhare34/Heat-safe'}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono-code text-[var(--text-dim)] font-medium">
                          {project.statusBadge}
                        </span>
                      </div>

                      {/* Display Screen */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-inset)]">
                        <img
                          src={project.imageSrc}
                          alt={`${project.name} preview`}
                          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                        {project.internshipBadge && (
                          <div className="absolute bottom-2.5 left-2.5 z-10 bg-black/80 border border-[var(--accent)] rounded-md px-2.5 py-0.5 font-mono-code text-[10px] font-bold text-[var(--accent)] backdrop-blur-md">
                            {project.internshipBadge}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Content & Actions (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="font-mono-code text-xs text-[var(--accent)] uppercase font-semibold block mb-1">
                        {project.type}
                      </span>

                      <h3 className="font-space font-bold text-xl sm:text-2xl md:text-3xl text-[var(--text-primary)] tracking-tight">
                        {project.name}
                      </h3>
                      <p className="font-inter text-xs sm:text-sm font-semibold text-[var(--text-secondary)] mt-0.5">
                        {project.subtitle}
                      </p>

                      <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-2.5 text-justified">
                        {project.description}
                      </p>

                      {/* Explicit My Contribution Callout */}
                      <div className="mt-3 p-3 rounded-xl tactile-inset space-y-1">
                        <span className="font-mono-code text-[11px] font-semibold text-[var(--accent)] uppercase flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5" />
                          My Contribution
                        </span>
                        <p className="font-inter text-xs text-[var(--text-secondary)] leading-relaxed text-justified">
                          {project.myContribution}
                        </p>
                      </div>

                      {/* Callout metrics for LifeLink */}
                      {project.id === 'lifelink' && (
                        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mt-3">
                          <div className="p-3 rounded-xl tactile-inset">
                            <div className="flex items-center gap-1.5 font-mono-code text-base sm:text-lg font-bold text-[var(--accent)]">
                              <Stethoscope className="w-4 h-4 text-[var(--accent)]" />
                              <span>52</span>
                            </div>
                            <span className="text-[11px] font-inter text-[var(--text-secondary)] font-medium block">
                              Simulated Doctors (19 Stations)
                            </span>
                          </div>

                          <div className="p-3 rounded-xl tactile-inset">
                            <div className="flex items-center gap-1.5 font-mono-code text-base sm:text-lg font-bold text-[var(--accent)]">
                              <TestTube2 className="w-4 h-4 text-[var(--accent)]" />
                              <span>247</span>
                            </div>
                            <span className="text-[11px] font-inter text-[var(--text-secondary)] font-medium block">
                              Automated Tests (33 Files)
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Certificate Callout */}
                      {project.certificateId && project.certificatePdfUrl && (
                        <div className="mt-3.5 p-3 rounded-xl tactile-inset flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono-code">
                          <div className="flex items-center gap-1.5 text-[var(--accent)] font-semibold truncate">
                            <Award className="w-4 h-4 shrink-0" />
                            <span className="truncate">AICTE Verified Certificate: {project.certificateId}</span>
                          </div>
                          <a
                            href={project.certificatePdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent)] hover:underline inline-flex items-center gap-1 font-bold shrink-0"
                          >
                            <span>Open Certificate PDF ↗</span>
                          </a>
                        </div>
                      )}

                      {/* Stack Chips */}
                      <div className="mt-3.5 pt-2 flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="tactile-chip px-2.5 py-1 font-mono-code text-[11px] text-[var(--accent)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="pt-3.5 border-t border-[var(--border)] flex flex-wrap items-center gap-2 sm:gap-2.5">
                      <TactileButton
                        onClick={() => toggleProject(project.id)}
                        variant={isExpanded ? 'primary' : 'secondary'}
                        size="sm"
                      >
                        <span>{isExpanded ? 'Hide Details' : 'Details'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </TactileButton>

                      {project.liveHref && (
                        <TactileButton
                          href={project.liveHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="primary"
                          size="sm"
                        >
                          <span>Visit Live App</span>
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
                          <span>{project.backendGithubHref ? 'Frontend Repo' : 'GitHub'}</span>
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
                          <span>Backend Repo</span>
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
                          <span>Certificate PDF</span>
                        </TactileButton>
                      )}
                    </div>
                  </div>

                </div>

                {/* ────── IN-PLACE EXPANDED DETAILS (OPENS DIRECTLY IN ITS OWN SPACE) ────── */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-5 animate-fade-in">
                    
                    {/* Header Banner */}
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                      <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--accent)] font-semibold">
                        <Layers className="w-4 h-4" />
                        <span>Architecture, Testing &amp; Implementation Details</span>
                      </div>
                      <button
                        onClick={() => toggleProject(project.id)}
                        className="text-xs font-mono-code text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>Close Details</span>
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Problem Statement */}
                    <div className="p-4 rounded-xl tactile-inset space-y-1.5">
                      <span className="font-mono-code text-[11px] text-[var(--accent)] uppercase font-semibold block">
                        Problem &amp; Practical Solution
                      </span>
                      <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed text-justified">
                        {project.problemStatement}
                      </p>
                    </div>

                    {/* Technical Implementation Highlights */}
                    <div className="space-y-2.5">
                      <span className="font-mono-code text-[11px] text-[var(--text-dim)] uppercase tracking-wider block">
                        Technical Architecture &amp; Key Deliverables
                      </span>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {project.architectureHighlights.map((point, idx) => (
                          <li
                            key={idx}
                            className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] flex items-start gap-2.5 text-xs font-inter text-[var(--text-secondary)] leading-relaxed"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                            <span className="text-justified">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Quick-Action Buttons in the expanded space */}
                    <div className="pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
                      <div className="flex flex-wrap items-center gap-2">
                        {project.liveHref && (
                          <a
                            href={project.liveHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[#001011] font-bold inline-flex items-center gap-1 hover:opacity-90 transition-opacity"
                          >
                            <span>Open Live Application</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <a
                          href={project.githubHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors inline-flex items-center gap-1"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>View Source Code</span>
                        </a>
                      </div>

                      <button
                        onClick={() => toggleProject(project.id)}
                        className="text-[var(--accent)] hover:underline inline-flex items-center gap-1 font-semibold cursor-pointer py-1"
                      >
                        <span>Hide Details ↑</span>
                      </button>
                    </div>

                  </div>
                )}
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
