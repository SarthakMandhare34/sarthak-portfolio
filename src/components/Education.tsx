import React, { useEffect, useState } from 'react';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  X,
  FileText,
} from 'lucide-react';
import { TactileButton } from './TactileButton';

interface CertificateData {
  id: string;
  title: string;
  organization: string;
  platform: string;
  date: string;
  certificateId: string;
  description: string;
  pdfUrl: string;
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
  const [modalCert, setModalCert] = useState<CertificateData | null>(null);
  const [copiedCertId, setCopiedCertId] = useState<string | null>(null);

  // Handle ESC key for certificate modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalCert) {
        setModalCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalCert]);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedCertId(id);
    setTimeout(() => setCopiedCertId(null), 2000);
  };

  return (
    <section
      id="education"
      className="w-full bg-[var(--bg-base)] py-14 sm:py-20 md:py-24 transition-colors duration-450 border-t border-[var(--border)] relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ──────────────── SECTION HEADER ──────────────── */}
        <div className="scroll-reveal scroll-slide-down mb-8 sm:mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] text-xs font-mono-code text-[var(--accent)] mb-3">
            <span>Education</span>
          </div>
          <h2 className="font-display font-bold text-[clamp(26px,5.5vw,44px)] text-[var(--text-primary)] leading-[1.12] tracking-tight">
            Education &amp; Certifications
          </h2>
          <p className="font-inter text-[13px] sm:text-[15px] md:text-[16px] text-[var(--text-secondary)] mt-1.5 leading-relaxed text-justified">
            My college degree and verified AICTE virtual internship certificates.
          </p>
        </div>

        {/* ──────────────── DUAL-COLUMN GRID: CONTENT-DRIVEN HEIGHTS ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-start">
          
          {/* ────── LEFT COLUMN: UNDERGRADUATE DEGREE (6 cols) ────── */}
          <div className="edu-feature-card scroll-reveal scroll-slide-left neumorphic-card p-5 sm:p-7 md:p-8 lg:col-span-6 space-y-5 border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl">
            {/* Meta Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code">
              <span className="px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--accent)] font-semibold">
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
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] tracking-tight">
                Bachelor of Science in Computer Science
              </h3>

              <p className="mt-2 text-xs sm:text-sm font-inter text-[var(--text-secondary)] flex items-center gap-2 flex-wrap">
                <GraduationCap className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>Expected Graduation: 2027 · Dombivli, Mumbai</span>
              </p>
            </div>

            {/* Academic Standing & Verified CGPA Box */}
            <div className="p-3.5 sm:p-4 rounded-xl tactile-inset grid grid-cols-2 gap-3 sm:gap-4">
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
                  Verified CGPA
                </span>
                <span className="font-mono-code font-bold text-base sm:text-xl text-[var(--accent)] mt-0.5 block">
                  6.95 <span className="text-xs text-[var(--text-dim)] font-normal">/ 10</span>
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono-code text-[var(--text-dim)]">
              <span>Model College (TYCS)</span>
              <span className="text-[var(--accent)]">Computer Science</span>
            </div>
          </div>

          {/* ────── RIGHT COLUMN: PROGRAM CERTIFICATIONS (6 cols) ────── */}
          <div className="edu-feature-card scroll-reveal scroll-slide-right stagger-1 neumorphic-card p-5 sm:p-7 md:p-8 lg:col-span-6 space-y-4 border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5">
              <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--text-primary)]">
                Program Certifications
              </h3>
              <span className="px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--accent)] font-mono-code text-xs font-semibold">
                2 Issued
              </span>
            </div>

            {/* 2 Clean, Compact Certificate Cards */}
            <div className="space-y-3.5">
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert.id}
                  className="p-3.5 sm:p-4 rounded-xl tactile-inset space-y-2 hover:border-[var(--accent)]/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className="font-bold text-[var(--text-primary)]">{cert.platform}</span>
                    <span className="text-[var(--text-dim)]">{cert.date}</span>
                  </div>

                  <h4 className="font-space font-bold text-xs sm:text-sm text-[var(--accent)] break-words">
                    {cert.title}
                  </h4>

                  <p className="text-xs font-inter text-[var(--text-secondary)] text-justified">
                    {cert.organization}
                  </p>

                  <p className="text-xs font-inter text-[var(--text-secondary)] text-justified leading-relaxed pt-1">
                    {cert.description}
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono-code border-t border-[var(--border)]">
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--text-dim)]">ID:</span>
                      <span className="text-[var(--accent)] font-bold">{cert.certificateId}</span>
                      <button
                        onClick={() => handleCopyId(cert.certificateId)}
                        className="p-1 hover:text-[var(--accent)] transition-colors cursor-pointer shrink-0"
                        title="Copy Certificate ID"
                      >
                        {copiedCertId === cert.certificateId ? (
                          <Check className="w-3.5 h-3.5 text-[var(--success)]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModalCert(cert)}
                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-xs"
                      >
                        Preview
                      </button>
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)] hover:underline inline-flex items-center gap-1 font-semibold"
                      >
                        <span>Open PDF</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[var(--border)] text-xs font-mono-code text-[var(--success)] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>AICTE Verified Virtual Internships</span>
            </div>
          </div>

        </div>

      </div>

      {/* ──────────────── CLEAN POPUP MODAL FOR CERTIFICATE PREVIEW (NO INLINE CLUTTER) ──────────────── */}
      {modalCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl neumorphic-card p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--accent)]">
                <Award className="w-4 h-4" />
                <span className="font-semibold">{modalCert.platform} · {modalCert.certificateId}</span>
              </div>
              <button
                onClick={() => setModalCert(null)}
                className="p-1.5 rounded-lg hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-72 sm:h-96 w-full rounded-xl overflow-hidden tactile-inset">
              <object
                data={`${modalCert.pdfUrl}#toolbar=0`}
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="h-full flex flex-col items-center justify-center p-6 text-center text-xs text-[var(--text-secondary)] space-y-2">
                  <p>Document preview unavailable in your browser viewer.</p>
                  <a
                    href={modalCert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] underline font-semibold"
                  >
                    Open Certificate PDF in new tab ↗
                  </a>
                </div>
              </object>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-code pt-1">
              <span className="text-[var(--text-secondary)] truncate">
                {modalCert.title}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={modalCert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[#001011] font-bold inline-flex items-center gap-1 hover:opacity-90"
                >
                  <span>Open PDF in Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setModalCert(null)}
                  className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
