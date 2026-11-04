import React, { useEffect, useRef, useState } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, Database, Award, Copy, Check, Printer } from 'lucide-react';
import anime from 'animejs';
import { TactileButton } from './TactileButton';
import { printDocument } from '../utils/download';

export interface ProjectDetailData {
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
  problemStatement: string;
  architectureHighlights: string[];
  stack: string[];
  imageSrc: string;
  liveHref: string | null;
  githubHref: string;
  backendGithubHref?: string;
}

interface ProjectDetailModalProps {
  project: ProjectDetailData | null;
  onClose: () => void;
  onOpenCertModal?: (cert: { title: string; org: string; id: string; date: string; project: string; desc: string; pdfUrl?: string }) => void;
}

export function ProjectDetailModal({ project, onClose, onOpenCertModal }: ProjectDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';

      if (backdropRef.current && modalRef.current) {
        anime({
          targets: backdropRef.current,
          opacity: [0, 1],
          duration: 300,
          easing: 'easeOutQuad',
        });

        anime({
          targets: modalRef.current,
          opacity: [0, 1],
          scale: [0.96, 1],
          translateY: [20, 0],
          duration: 450,
          easing: 'easeOutCubic',
        });
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [project]);

  const handleClose = () => {
    if (backdropRef.current && modalRef.current) {
      anime({
        targets: backdropRef.current,
        opacity: [1, 0],
        duration: 250,
        easing: 'easeInQuad',
      });

      anime({
        targets: modalRef.current,
        opacity: [1, 0],
        scale: [1, 0.96],
        translateY: [0, 16],
        duration: 250,
        easing: 'easeInQuad',
        complete: () => {
          document.body.style.overflow = '';
          onClose();
        },
      });
    } else {
      document.body.style.overflow = '';
      onClose();
    }
  };

  const handleCopyCert = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
      />

      {/* Modal Dialog */}
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl bg-[var(--bg-surface)] neumorphic-card p-4 sm:p-6 md:p-8 z-10 my-auto text-[var(--text-primary)] max-h-[92vh] overflow-y-auto border border-[var(--border)] rounded-2xl shadow-2xl"
      >
        {/* Top Header Bar */}
        <div className="flex items-start justify-between border-b border-[var(--border)] pb-3.5 mb-4 gap-3">
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono-code text-[11px] text-[var(--accent)] tracking-[0.08em] uppercase font-semibold">
                {project.type}
              </span>
              {project.internshipBadge && (
                <span className="bg-[var(--accent-soft)] border border-[var(--accent)] rounded-md px-2 py-0.5 font-mono-code text-[10px] font-bold text-[var(--accent)]">
                  {project.internshipBadge}
                </span>
              )}
            </div>

            <h2 id="case-study-title" className="font-space text-xl sm:text-2xl md:text-3xl font-bold tracking-tight break-words">
              {project.name}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] font-inter">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="neumorphic-btn p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer shrink-0"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Preview */}
        <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-elevated)] mb-5 shadow-inner">
          <img
            src={project.imageSrc}
            alt={`${project.name} view`}
            className="w-full max-h-[220px] sm:max-h-[320px] object-cover object-top"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Certificate Callout inside Modal if Virtual Internship */}
        {project.certificateId && (
          <div className="mb-5 p-3.5 sm:p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-code">
            <div className="min-w-0">
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
                onClick={() => handleCopyCert(project.certificateId!)}
                className="px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors cursor-pointer flex items-center gap-1 text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[var(--success)]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy ID'}</span>
              </button>
              {onOpenCertModal && (
                <button
                  onClick={() =>
                    onOpenCertModal({
                      title: `${project.name} — Virtual Internship`,
                      org: project.certificateOrg || 'AICTE & Partner Program',
                      id: project.certificateId!,
                      date: 'June 2026 — July 2026',
                      project: project.subtitle,
                      desc: project.description,
                      pdfUrl: project.certificatePdfUrl,
                    })
                  }
                  className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[#001011] font-bold transition-all cursor-pointer inline-flex items-center gap-1 text-xs"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Core Case Study Sections */}
        <div className="space-y-5 font-inter text-xs sm:text-sm">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] font-mono-code mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Overview
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Problem & Goal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] font-mono-code mb-1.5 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              Problem &amp; Solution
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] font-mono-code mb-2 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              Key Features &amp; Implementation
            </h3>
            <ul className="space-y-2 text-[var(--text-secondary)] text-xs sm:text-sm">
              {project.architectureHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] font-mono-code mb-2">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-md px-2 py-0.5 font-mono-code text-[11px] sm:text-xs text-[var(--accent)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-[var(--border)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {project.liveHref && (
              <TactileButton
                href={project.liveHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
                className="w-full sm:w-auto"
              >
                <span>Visit Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </TactileButton>
            )}

            <TactileButton
              href={project.githubHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
              className="w-full sm:w-auto"
            >
              <Github className="w-3.5 h-3.5" />
              <span>{project.backendGithubHref ? 'Frontend Repo' : 'GitHub Repo'}</span>
            </TactileButton>

            {project.backendGithubHref && (
              <TactileButton
                href={project.backendGithubHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
                className="w-full sm:w-auto"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Backend Repo</span>
              </TactileButton>
            )}
          </div>

          <TactileButton onClick={handleClose} variant="secondary" size="sm" className="w-full sm:w-auto">
            <span>Close Window</span>
          </TactileButton>
        </div>
      </div>
    </div>
  );
}
