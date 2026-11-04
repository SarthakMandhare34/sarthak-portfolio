import React, { useEffect, useRef, useState } from 'react';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Copy,
  Check,
  X,
} from 'lucide-react';
import anime from 'animejs';
import { TactileButton } from './TactileButton';

interface CertificateData {
  id: string;
  title: string;
  organization: string;
  platform: string;
  date: string;
  certificateId: string;
  description: string;
  pdfUrl?: string;
}

const CERTIFICATES: CertificateData[] = [
  {
    id: 'ibm',
    title: 'AI Automation & Intelligent Solutions — IBM SkillsBuild, AICTE',
    organization: 'BharatCares in association with AICTE and IBM SkillsBuild',
    platform: 'IBM SkillsBuild Virtual Internship',
    date: 'June 2026 — July 2026',
    certificateId: 'BHIBMAC04046',
    pdfUrl: '/certificates/IBM_SkillsBuild_Certificate_BHIBMAC04046.pdf',
    description:
      'Completed a 6-week virtual internship on AI Automation & Intelligent Solutions with IBM SkillsBuild in association with AICTE, building the LuminaHub educational diagnostic pre-grader.',
  },
  {
    id: 'lenovo',
    title: 'Generative AI & Agentic Systems Engineering — Lenovo LEAP NextGen Scholar Program, AICTE',
    organization: 'Lenovo LEAP NextGen Scholar Program in association with AICTE & BharatCares',
    platform: 'Lenovo LEAP Virtual Internship',
    date: 'June 2026 — July 2026',
    certificateId: '6302092',
    pdfUrl: '/certificates/Lenovo_LEAP_Certificate_6302092.pdf',
    description:
      'Completed a 6-week virtual internship on Generative AI & Agentic Systems Engineering under the Lenovo LEAP NextGen Scholar Program in association with AICTE, developing the HeatSafe AI climate platform.',
  },
];

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedCertId, setExpandedCertId] = useState<string | null>(null);
  const [copiedCertId, setCopiedCertId] = useState<string | null>(null);

  // Butter-smooth 60fps/120fps Anime.js bi-directional scroll animation
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const header = sectionEl.querySelector('.edu-header');
    const cards = sectionEl.querySelectorAll('.edu-feature-card');

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

            // Animate header
            anime({
              targets: header,
              opacity: [0, 1],
              translateY: [10, 0],
              duration: 340,
              easing: 'easeOutCubic',
              delay: 30,
            });

            // Animate cards with snappy micro-stagger
            anime({
              targets: cards,
              opacity: [0, 1],
              translateY: [12, 0],
              delay: anime.stagger(35, { start: 60 }),
              duration: 350,
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

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedCertId(id);
    setTimeout(() => setCopiedCertId(null), 2000);
  };

  const toggleCert = (id: string) => {
    setExpandedCertId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="w-full bg-[var(--bg-base)] py-14 sm:py-20 md:py-28 transition-colors duration-450 border-t border-[var(--border)] relative opacity-0"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ──────────────── SECTION HEADER ──────────────── */}
        <div className="edu-header mb-7 sm:mb-10 max-w-3xl opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] text-xs font-mono-code text-[var(--accent)] mb-3">
            <span>Academics</span>
          </div>
          <h2 className="font-display font-bold text-[clamp(26px,5.5vw,44px)] text-[var(--text-primary)] leading-[1.12] tracking-tight">
            Education
          </h2>
          <p className="font-inter text-[13px] sm:text-[15px] md:text-[16px] text-[var(--text-secondary)] mt-1.5 leading-relaxed">
            Higher education degree and program certifications.
          </p>
        </div>

        {/* ──────────────── DUAL-COLUMN GRID ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-stretch">
          
          {/* ────── LEFT COLUMN: UNDERGRADUATE DEGREE (6 cols) ────── */}
          <div className="edu-feature-card neumorphic-card relative p-4 sm:p-7 md:p-8 opacity-0 lg:col-span-6 flex flex-col justify-between space-y-5 border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl">
            <div>
              {/* Meta Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code mb-4">
                <span className="px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--accent)] font-semibold shadow-xs">
                  Higher Education
                </span>
                <span className="px-3 py-1 rounded-full border border-[var(--border)] text-[var(--text-secondary)]">
                  Current Undergraduate
                </span>
              </div>

              {/* Institution & Title */}
              <div>
                <p className="text-xs sm:text-sm font-mono-code text-[var(--text-dim)] uppercase tracking-wider mb-1">
                  Keraleeya Samajam&apos;s Model College (Autonomous)
                </p>
                <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-[var(--text-primary)] tracking-tight break-words">
                  Bachelor of Science in Computer Science
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm font-inter text-[var(--text-secondary)] flex items-center gap-2 flex-wrap">
                  <GraduationCap className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>Expected Graduation: 2027 · Dombivli, Mumbai</span>
                </p>
              </div>

              {/* Academic Standing & CGPA Box */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl tactile-inset grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-mono-code text-[var(--text-dim)] uppercase block">
                    Current Semester
                  </span>
                  <span className="font-mono-code font-bold text-base sm:text-xl text-[var(--text-primary)] mt-0.5 block truncate">
                    6th Semester
                  </span>
                </div>
                <div className="border-l border-[var(--border)] pl-3 sm:pl-4">
                  <span className="text-[10px] sm:text-[11px] font-mono-code text-[var(--text-dim)] uppercase block">
                    Current CGPA
                  </span>
                  <span className="font-mono-code font-bold text-base sm:text-xl text-[var(--accent)] mt-0.5 block">
                    6.95 <span className="text-xs text-[var(--text-dim)] font-normal">/ 10</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono-code text-[var(--text-dim)]">
              <span>Model College (TYCS)</span>
              <span className="text-[var(--accent)]">Computer Science</span>
            </div>
          </div>

          {/* ────── RIGHT COLUMN: PROGRAM CERTIFICATIONS (6 cols) ────── */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            <div className="edu-feature-card neumorphic-card p-4 sm:p-7 md:p-8 opacity-0 border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5 mb-4">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--text-primary)]">
                    Program Certifications
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--accent)] font-mono-code text-xs font-semibold">
                    2 Issued
                  </span>
                </div>

                {/* 2 Certificates with Inline Expansion in their Own Space */}
                <div className="space-y-3.5 sm:space-y-4">
                  {CERTIFICATES.map((cert) => {
                    const isCertExpanded = expandedCertId === cert.id;

                    return (
                      <div
                        key={cert.id}
                        id={`cert-${cert.id}`}
                        className={`p-3.5 sm:p-4 rounded-xl tactile-inset space-y-2.5 transition-all ${
                          isCertExpanded ? 'ring-2 ring-[var(--accent)]/50 shadow-md' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono-code">
                          <span className="font-bold text-[var(--text-primary)]">{cert.platform}</span>
                          <span className="text-[var(--text-dim)]">{cert.date}</span>
                        </div>

                        <h4 className="font-space font-bold text-xs sm:text-sm text-[var(--accent)] break-words">
                          {cert.title}
                        </h4>

                        <p className="text-xs font-inter text-[var(--text-secondary)]">
                          {cert.organization}
                        </p>

                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono-code border-t border-[var(--border)]">
                          <div className="flex items-center gap-2">
                            <span className="text-[var(--text-dim)]">ID:</span>
                            <span className="text-[var(--accent)] font-bold break-all">{cert.certificateId}</span>
                            <button
                              onClick={() => handleCopyId(cert.certificateId)}
                              className="p-1 hover:text-[var(--accent)] transition-colors cursor-pointer shrink-0"
                              title="Copy ID"
                            >
                              {copiedCertId === cert.certificateId ? (
                                <Check className="w-3.5 h-3.5 text-[var(--success)]" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>

                          <button
                            onClick={() => toggleCert(cert.id)}
                            className="text-[var(--accent)] hover:underline inline-flex items-center gap-1 cursor-pointer font-semibold"
                          >
                            <span>{isCertExpanded ? 'Hide Certificate ↑' : 'View Certificate ↓'}</span>
                          </button>
                        </div>

                        {/* ──────────────── INLINE EXPANDABLE CERTIFICATE VIEWER (IN ITS OWN SPACE) ──────────────── */}
                        {isCertExpanded && (
                          <div className="mt-3 pt-3 border-t border-[var(--border)] space-y-3 animate-fade-in">
                            <div className="flex items-center justify-between text-xs font-mono-code text-[var(--accent)]">
                              <span className="flex items-center gap-1.5 font-semibold">
                                <Award className="w-3.5 h-3.5" />
                                <span>Official Verified Credential Document</span>
                              </span>
                              <button
                                onClick={() => toggleCert(cert.id)}
                                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer flex items-center gap-1 text-xs"
                              >
                                <span>Close</span>
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {cert.pdfUrl && (
                              <div className="tactile-display-frame w-full">
                                <div className="h-64 sm:h-80 w-full rounded-[0.95rem] overflow-hidden bg-[#1e1e1e]">
                                  <object
                                    data={`${cert.pdfUrl}#toolbar=0&navpanes=0`}
                                    type="application/pdf"
                                    className="w-full h-full"
                                  >
                                    <iframe
                                      src={`${cert.pdfUrl}#toolbar=0&navpanes=0`}
                                      title={`${cert.title} Preview`}
                                      className="w-full h-full border-0"
                                    >
                                      <div className="p-4 text-center text-xs text-[var(--text-secondary)]">
                                        <p>Document preview unavailable inline.</p>
                                        <a
                                          href={cert.pdfUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-[var(--accent)] underline mt-1 inline-block"
                                        >
                                          Open Certificate PDF
                                        </a>
                                      </div>
                                    </iframe>
                                  </object>
                                </div>
                              </div>
                            )}

                            <p className="font-inter text-xs text-[var(--text-secondary)] leading-relaxed">
                              {cert.description}
                            </p>

                            <div className="pt-2 flex flex-wrap items-center justify-end gap-2 text-xs font-mono-code">
                              {cert.pdfUrl && (
                                <TactileButton
                                  href={cert.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  variant="primary"
                                  size="sm"
                                >
                                  <Award className="w-3.5 h-3.5" />
                                  <span>Open PDF in Tab ↗</span>
                                </TactileButton>
                              )}
                              <TactileButton
                                onClick={() => toggleCert(cert.id)}
                                variant="secondary"
                                size="sm"
                              >
                                <span>Hide Document ↑</span>
                              </TactileButton>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border)] text-xs font-mono-code text-[var(--success)] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>AICTE Verified Virtual Internships</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
