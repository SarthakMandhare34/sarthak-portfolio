import React, { useEffect, useRef, useState } from 'react';
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Stethoscope,
  TestTube2,
  Award,
  X,
  Check,
  Copy,
  Printer,
  Layers,
  Cpu,
  Database,
} from 'lucide-react';
import anime from 'animejs';
import { ProjectDetailData } from './ProjectDetailModal';
import { TactileButton } from './TactileButton';

const ALL_PROJECTS: ProjectDetailData[] = [
  {
    id: 'lifelink',
    name: 'LifeLink',
    type: 'Major Academic Project · Prototype',
    statusBadge: 'Deployed on Render',
    subtitle: 'LifeLink — Smart Healthcare Assistance Platform',
    description:
      'A healthcare prototype with symptom checking, doctor search, appointment booking, digital prescriptions, and an Emergency Health Passport, working mainly on the React/TypeScript frontend and wiring it to the backend and AI layer. Powered by Gemini Flash guidance with built-in emergency checks, age-based rules, and safe fallback responses when AI calls fail.',
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
    type: 'AICTE Virtual Internship Project · IBM SkillsBuild',
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
    subtitle: 'KnowThySelf — MBTI Personality Assessment & Recommendation Platform',
    description:
      'A five-page MBTI personality assessment and recommendation platform featuring a dynamic questionnaire flow, real-time trait scoring with percentage calculations, and a tailored results dashboard.',
    problemStatement:
      'Standard online personality quizzes often present rigid interfaces without actionable growth insights. KnowThySelf delivers an interactive, responsive questionnaire with glassmorphism layouts, live trait score breakdowns, and personalized recommendations.',
    architectureHighlights: [
      'Built all five frontend pages (home, login, test, dashboard, recommendations) for a personality assessment platform.',
      'Built the questionnaire flow: slide-based cards, transitions between questions, and trait scoring with percentage calculations.',
      'Built the results dashboard, including visual trait bars and written personality insights.',
      'Designed the interface with glassmorphism and bento-grid layouts, responsive across screen sizes, with dark/light mode and an interactive HTML5 Canvas particle background.',
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
    type: 'AICTE Virtual Internship Project · Lenovo LEAP',
    statusBadge: 'ID: 6302092',
    internshipBadge: 'Lenovo LEAP, AICTE',
    certificateId: '6302092',
    certificateOrg: 'Lenovo LEAP NextGen Scholar Program, AICTE',
    certificatePdfUrl: '/certificates/Lenovo_LEAP_Certificate_6302092.pdf',
    subtitle: 'HeatSafe AI — Climate Heatwave Safety & Preparedness Platform',
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
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [copiedId, setCopiedId] = useState(false);

  const toggleProjectDetails = (projectId: string) => {
    setExpandedProjectId((prev) => {
      const next = prev === projectId ? null : projectId;
      if (next) {
        setTimeout(() => {
          const el = document.getElementById(`details-${projectId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 100);
      }
      return next;
    });
  };

  const filteredProjects = ALL_PROJECTS.filter((p) => {
    if (activeFilter === 'academic') return p.type.includes('Academic') || p.type.includes('Group Project');
    if (activeFilter === 'internship') return p.type.includes('AICTE Virtual Internship');
    return true;
  });

  // Butter-smooth 60fps/120fps Anime.js bi-directional scroll animation
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const headers = sectionEl.querySelectorAll('.project-header');
    const cards = sectionEl.querySelectorAll('.case-study-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime.remove([sectionEl, headers, cards]);

            // Animate section container
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
            // Smooth exit reset for continuous bi-directional scroll animation
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
    setExpandedProjectId(null);
    setTimeout(() => {
      anime.remove('.case-study-card');
      anime({
        targets: '.case-study-card',
        opacity: [0, 1],
        translateY: [10, 0],
        delay: anime.stagger(35),
        duration: 320,
        easing: 'easeOutCubic',
      });
    }, 20);
  };

  const handleCopyCertId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="w-full bg-[var(--bg-base)] py-14 sm:py-20 md:py-28 transition-colors duration-450 border-t border-[var(--border)] relative opacity-0"
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
            Academic software prototypes and AICTE virtual internship capstones with live deployments, source repositories, and verified certificate credentials.
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

        {/* ──────────────── PROJECT SHOWCASE CARDS ──────────────── */}
        <div className="space-y-7 sm:space-y-12 md:space-y-16">
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 1;
            const isExpanded = expandedProjectId === project.id;

            return (
              <article
                key={project.id}
                className={`case-study-card neumorphic-card group relative p-4 sm:p-7 md:p-9 transition-all duration-300 opacity-0 border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl ${
                  isExpanded ? 'ring-2 ring-[var(--accent)]/50 shadow-2xl' : ''
                }`}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start ${
                    isEven ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Visual Preview Frame */}
                  <div
                    className={`tactile-display-frame cursor-pointer lg:col-span-6 w-full ${
                      isEven ? 'lg:col-start-7' : ''
                    }`}
                    onClick={() => toggleProjectDetails(project.id)}
                    title={isExpanded ? 'Click to hide details' : 'Click to view details in-place'}
                  >
                    <div className="relative rounded-[0.95rem] overflow-hidden aspect-[16/10] bg-[var(--bg-surface)]">
                      <img
                        src={project.imageSrc}
                        alt={`${project.name} preview`}
                        className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />

                      {/* Adaptive Status & Internship Badges Container */}
                      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center gap-2 pointer-events-none">
                        <div className="tactile-status-badge px-2.5 py-1 text-[10px] sm:text-[11px] font-mono-code text-[var(--text-secondary)] backdrop-blur-md flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[var(--success)] shrink-0" />
                          <span className="truncate">{project.statusBadge}</span>
                        </div>

                        {project.internshipBadge && (
                          <div className="bg-[var(--accent-soft)] border border-[var(--accent)] rounded-lg px-2.5 py-0.5 font-mono-code text-[10px] sm:text-[11px] font-bold text-[var(--accent)] backdrop-blur-md shadow-xs">
                            {project.internshipBadge}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Narrative Column */}
                  <div
                    className={`flex flex-col justify-between space-y-4 lg:col-span-6 min-w-0 ${
                      isEven ? 'lg:col-start-1 lg:row-start-1' : ''
                    }`}
                  >
                    <div>
                      <span className="font-mono-code text-xs text-[var(--accent)] uppercase font-semibold block">
                        {project.type}
                      </span>

                      <h3 className="font-space font-bold text-xl sm:text-2xl md:text-3xl text-[var(--text-primary)] tracking-tight mt-1 break-words">
                        {project.name}
                      </h3>
                      <p className="font-inter text-xs sm:text-sm font-semibold text-[var(--text-primary)] mt-1">
                        {project.subtitle}
                      </p>

                      <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-3">
                        {project.description}
                      </p>

                      {/* Specific Key Stat Callouts for LifeLink */}
                      {project.id === 'lifelink' && (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                          <div className="p-3 rounded-xl tactile-inset">
                            <div className="flex items-center gap-1.5 font-mono-code text-lg font-bold text-[var(--accent)]">
                              <Stethoscope className="w-4 h-4 text-[var(--accent)]" />
                              <span>52</span>
                            </div>
                            <span className="text-[11px] font-inter text-[var(--text-secondary)] font-medium block mt-0.5">
                              Simulated Doctors
                            </span>
                            <span className="text-[10px] text-[var(--text-dim)] block">
                              Across 19 Mumbai railway stations
                            </span>
                          </div>

                          <div className="p-3 rounded-xl tactile-inset">
                            <div className="flex items-center gap-1.5 font-mono-code text-lg font-bold text-[var(--accent)]">
                              <TestTube2 className="w-4 h-4 text-[var(--accent)]" />
                              <span>247</span>
                            </div>
                            <span className="text-[11px] font-inter text-[var(--text-secondary)] font-medium block mt-0.5">
                              Automated Tests
                            </span>
                            <span className="text-[10px] text-[var(--text-dim)] block">
                              Across 33 files (1 skipped)
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Certificate Trigger Button for Virtual Internships */}
                      {project.certificateId && (
                        <div className="mt-4 p-3 rounded-xl tactile-inset flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 text-xs font-mono-code">
                          <div className="flex items-center gap-1.5 text-[var(--accent)] font-semibold">
                            <Award className="w-4 h-4 text-[var(--accent)] shrink-0" />
                            <span className="break-all sm:break-normal">AICTE Certificate ({project.certificateId})</span>
                          </div>
                          {project.certificatePdfUrl ? (
                            <a
                              href={project.certificatePdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent)] text-[var(--accent)] font-bold hover:bg-[var(--accent)] hover:text-[#001011] transition-all cursor-pointer w-full sm:w-auto text-center inline-flex items-center justify-center gap-1"
                            >
                              <span>View Certificate PDF ({project.certificateId}) ↗</span>
                            </a>
                          ) : (
                            <span className="text-[var(--text-dim)]">Verified Credential</span>
                          )}
                        </div>
                      )}

                      {/* Stack Chips */}
                      <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="tactile-chip px-2 py-0.5 font-mono-code text-[11px] text-[var(--accent)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center gap-2 sm:gap-2.5">
                      <TactileButton
                        onClick={() => toggleProjectDetails(project.id)}
                        variant={isExpanded ? 'primary' : 'secondary'}
                        size="sm"
                        title={isExpanded ? 'Collapse project details' : 'Expand full project details'}
                      >
                        <span>{isExpanded ? 'Hide Details' : 'Details'}</span>
                        <ArrowUpRight
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            isExpanded ? 'rotate-90' : ''
                          }`}
                        />
                      </TactileButton>

                      {project.liveHref && (
                        <TactileButton
                          href={project.liveHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="primary"
                          size="sm"
                        >
                          <span>{project.type.includes('Virtual Internship') ? 'Live Demo' : 'Visit Live App'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </TactileButton>
                      )}

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
                    </div>
                  </div>
                </div>

                {/* ──────────────── INLINE EXPANDABLE DETAILS PANEL (OPENS DIRECTLY IN PROJECT'S OWN SPACE) ──────────────── */}
                {isExpanded && (
                  <div
                    id={`details-${project.id}`}
                    className="mt-6 pt-6 border-t border-[var(--border)] space-y-5 animate-fade-in"
                  >
                    {/* Header Bar */}
                    <div className="flex items-start justify-between gap-4 pb-3 border-b border-[var(--border)]">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono-code text-[11px] text-[var(--accent)] tracking-[0.08em] uppercase font-semibold">
                            In-Depth Architecture &amp; Implementation
                          </span>
                          {project.internshipBadge && (
                            <span className="bg-[var(--accent-soft)] border border-[var(--accent)] rounded-md px-2 py-0.5 font-mono-code text-[10px] font-bold text-[var(--accent)]">
                              {project.internshipBadge}
                            </span>
                          )}
                        </div>
                        <h4 className="font-space font-bold text-lg sm:text-2xl text-[var(--text-primary)]">
                          {project.name} · Complete Project Details
                        </h4>
                      </div>

                      <button
                        onClick={() => toggleProjectDetails(project.id)}
                        className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono-code transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                        title="Close details"
                      >
                        <span>Close Details</span>
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* AICTE Certificate Callout if Virtual Internship */}
                    {project.certificateId && (
                      <div className="p-3.5 sm:p-4 rounded-xl tactile-inset flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-code">
                        <div>
                          <span className="text-[var(--accent)] font-semibold flex items-center gap-1.5 mb-1">
                            <Award className="w-4 h-4 text-[var(--accent)] shrink-0" />
                            <span>Verified AICTE Virtual Internship Certificate</span>
                          </span>
                          <p className="text-[var(--text-secondary)] font-inter">
                            Issued by {project.certificateOrg || 'AICTE & BharatCares'} · ID: <strong className="text-[var(--text-primary)] break-all">{project.certificateId}</strong>
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleCopyCertId(project.certificateId!)}
                            className="px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors cursor-pointer flex items-center gap-1 text-xs"
                          >
                            {copiedId ? <Check className="w-3.5 h-3.5 text-[var(--success)]" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedId ? 'Copied' : 'Copy ID'}</span>
                          </button>
                          {project.certificatePdfUrl && (
                            <a
                              href={project.certificatePdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent)] text-[var(--accent)] font-bold hover:bg-[var(--accent)] hover:text-[#001011] transition-all cursor-pointer inline-flex items-center gap-1 text-xs"
                            >
                              <Award className="w-3.5 h-3.5" />
                              <span>Open Certificate PDF ↗</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Dual-Column Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-xs sm:text-sm font-inter">
                      {/* Left Column: Overview & Problem/Solution (5 cols) */}
                      <div className="lg:col-span-5 space-y-4">
                        <div className="p-4 sm:p-5 rounded-xl tactile-inset space-y-2">
                          <h5 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            Overview
                          </h5>
                          <p className="text-[var(--text-secondary)] leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        <div className="p-4 sm:p-5 rounded-xl tactile-inset space-y-2">
                          <h5 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
                            <Cpu className="w-3.5 h-3.5" />
                            Problem &amp; Solution
                          </h5>
                          <p className="text-[var(--text-secondary)] leading-relaxed">
                            {project.problemStatement}
                          </p>
                        </div>
                      </div>

                      {/* Right Column: Key Features & Architecture Implementation (7 cols) */}
                      <div className="lg:col-span-7 p-4 sm:p-5 rounded-xl tactile-inset space-y-4 flex flex-col justify-between">
                        <div>
                          <h5 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5 mb-2.5">
                            <Database className="w-3.5 h-3.5" />
                            Key Features &amp; Implementation (Resume Verified)
                          </h5>
                          <ul className="space-y-2.5 text-[var(--text-secondary)] leading-relaxed">
                            {project.architectureHighlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0 mt-2" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Stack Chips in details */}
                        <div className="pt-3 border-t border-[var(--border)]">
                          <span className="font-mono-code text-[11px] text-[var(--text-dim)] uppercase block mb-1.5">
                            Technologies Used
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {project.stack.map((tech) => (
                              <span
                                key={tech}
                                className="tactile-chip px-2 py-0.5 font-mono-code text-[11px] text-[var(--accent)]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Collapse Button */}
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => toggleProjectDetails(project.id)}
                        className="px-3.5 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono-code transition-colors cursor-pointer flex items-center gap-1.5"
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
