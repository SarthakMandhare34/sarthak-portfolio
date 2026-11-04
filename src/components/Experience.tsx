import React, { useState } from 'react';
import {
  Briefcase,
  Calendar,
  Award,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { TactileButton } from './TactileButton';

interface InternshipExperience {
  id: string;
  company: string;
  program: string;
  domain: string;
  duration: string;
  association: string;
  projectTitle: string;
  projectId: string;
  credentialId: string;
  certificatePdfUrl: string;
  responsibilities: string[];
}

const EXPERIENCES: InternshipExperience[] = [
  {
    id: 'ibm-skillsbuild',
    company: 'IBM SkillsBuild',
    program: 'AICTE Virtual Internship Program',
    domain: 'AI Automation & Intelligent Solutions',
    duration: 'June 2026 — July 2026 (6 Weeks)',
    association: 'In association with AICTE & BharatCares',
    projectTitle: 'LuminaHub — Educational Diagnostic Pre-Grader',
    projectId: 'luminahub',
    credentialId: 'BHIBMAC04046',
    certificatePdfUrl: '/certificates/IBM_SkillsBuild_Certificate_BHIBMAC04046.pdf',
    responsibilities: [
      'Built a full-stack educational diagnostic platform using React, TypeScript, Node.js, and Express.',
      'Integrated Google Gemini API to analyze student homework submissions and flag conceptual misunderstandings.',
      'Engineered adaptive hints and follow-up question generation tailored to specific student learning gaps.',
      'Created an instructor analytics view summarizing class-wide concept mastery and common bottlenecks.',
    ],
  },
  {
    id: 'lenovo-leap',
    company: 'Lenovo LEAP',
    program: 'NextGen Scholar Program',
    domain: 'Generative AI & Agentic Systems Engineering',
    duration: 'June 2026 — July 2026 (6 Weeks)',
    association: 'In association with AICTE & BharatCares',
    projectTitle: 'HeatSafe AI — Climate Heatwave Safety Platform',
    projectId: 'heatsafe',
    credentialId: '6302092',
    certificatePdfUrl: '/certificates/Lenovo_LEAP_Certificate_6302092.pdf',
    responsibilities: [
      'Developed responsive React and TypeScript frontend interface with Vite and Tailwind CSS for heatwave preparedness.',
      'Authored structured prompt workflows for Google Gemini API for heat-risk evaluation and hydration guidance.',
      'Tested and adjusted AI fallback rules against conflicting symptoms, missing sensor metrics, and edge cases.',
      'Published open-source codebase and prompt evaluation templates to GitHub.',
    ],
  },
];

export function Experience() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="experience"
      className="w-full bg-[var(--bg-base)] py-14 sm:py-20 md:py-28 transition-colors duration-450 border-t border-[var(--border)] relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="scroll-reveal scroll-clip-up mb-8 sm:mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] text-xs font-mono-code text-[var(--accent)] mb-3">
            <span>Experience</span>
          </div>
          <h2 className="font-display font-bold text-[clamp(26px,5.5vw,44px)] text-[var(--text-primary)] leading-[1.12] tracking-tight">
            Virtual Internships
          </h2>
          <p className="font-inter text-[13px] sm:text-[15px] md:text-[16px] text-[var(--text-secondary)] mt-1.5 leading-relaxed text-justified">
            Two distinct AICTE-approved virtual internships completed with IBM SkillsBuild and Lenovo LEAP.
          </p>
        </div>

        {/* 2 Separate Organized Experience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {EXPERIENCES.map((exp, idx) => {
            const animClass = idx === 0 ? 'scroll-rotate-left' : 'scroll-rotate-right stagger-1';

            return (
              <div
                key={exp.id}
                className={`exp-card scroll-reveal ${animClass} neumorphic-card p-5 sm:p-7 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] flex flex-col justify-between space-y-6`}
              >
                {/* Header: Company & Program */}
                <div>
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5 mb-4">
                    <div className="flex items-center gap-2 font-mono-code text-xs text-[var(--accent)] font-semibold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{exp.program}</span>
                    </div>
                    <span className="tactile-chip px-2.5 py-0.5 font-mono-code text-[11px] text-[var(--text-dim)]">
                      {exp.company}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] tracking-tight">
                      {exp.company}
                    </h3>
                    <p className="font-inter text-sm sm:text-base font-semibold text-[var(--accent)]">
                      {exp.domain}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] font-inter">
                      {exp.association}
                    </p>
                  </div>

                  {/* Duration & Project Inset */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    <div className="p-3 rounded-xl tactile-inset flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono-code text-[10px] text-[var(--text-dim)] uppercase block">
                          Duration
                        </span>
                        <span className="font-inter text-xs text-[var(--text-primary)] font-medium mt-0.5 block">
                          {exp.duration}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl tactile-inset flex items-start gap-2.5">
                      <Briefcase className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <span className="font-mono-code text-[10px] text-[var(--text-dim)] uppercase block">
                          Assigned Project
                        </span>
                        <a
                          href={`#project-${exp.projectId}`}
                          className="font-inter text-xs text-[var(--accent)] font-medium mt-0.5 block truncate hover:underline"
                        >
                          {exp.projectTitle.split('—')[0].trim()} ↗
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Key Responsibilities */}
                  <div className="mt-5 space-y-2.5">
                    <span className="font-mono-code text-[11px] text-[var(--text-dim)] uppercase tracking-wider block">
                      Key Responsibilities &amp; Deliverables
                    </span>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs font-inter text-[var(--text-secondary)] leading-relaxed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                          <span className="text-justified">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer: Credential ID & Certificate Actions */}
                <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-code">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--text-dim)]">ID:</span>
                    <span className="text-[var(--accent)] font-bold">{exp.credentialId}</span>
                    <button
                      onClick={() => handleCopy(exp.credentialId)}
                      className="p-1 hover:text-[var(--accent)] transition-colors cursor-pointer"
                      title="Copy Credential ID"
                      aria-label={`Copy Credential ID ${exp.credentialId}`}
                    >
                      {copiedId === exp.credentialId ? (
                        <Check className="w-3.5 h-3.5 text-[var(--success)]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <TactileButton
                      href={exp.certificatePdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="sm"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>View Certificate</span>
                      <ExternalLink className="w-3 h-3" />
                    </TactileButton>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
