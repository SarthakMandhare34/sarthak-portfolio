import React, { useState } from 'react';
import {
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Download,
  Github,
  Linkedin,
  FileText,
  Zap,
  Phone,
} from 'lucide-react';
import { TactileButton } from './TactileButton';
import { downloadBlobFile } from '../utils/download';

interface ContactProps {
  onResumeClick: () => void;
}

export function Contact({ onResumeClick }: ContactProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sarthakmandhare34@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+919326397599');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleDownloadResume = () => {
    downloadBlobFile('/Sarthak_Mandhare_Resume.pdf', 'Sarthak_Mandhare_Resume.pdf');
  };

  return (
    <section
      id="contact"
      className="w-full bg-transparent py-14 sm:py-20 md:py-28 transition-colors duration-450 border-t border-[var(--border)] relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ──────────────── SECTION HEADER ──────────────── */}
        <div className="contact-header scroll-reveal scroll-scale-up mb-7 sm:mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full dual-primary-badge text-xs font-mono-code text-[var(--primary-2)] mb-3 font-semibold">
            <span>Contact</span>
          </div>
          <h2 className="font-display font-bold text-[clamp(26px,5.5vw,44px)] text-[var(--text-primary)] leading-[1.12] tracking-tight">
            Get in Touch
          </h2>
          <p className="font-inter text-[13px] sm:text-[15px] md:text-[16px] text-[var(--text-secondary)] mt-1.5 leading-relaxed text-justified">
            Feel free to reach out for developer roles, project inquiries, or to connect.
          </p>
        </div>

        {/* ──────────────── CONTACT CARDS GRID (50:50 DUAL-PRIMARY BALANCE) ──────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-7">
          
          {/* Email Card (Primary 1 Foundation) */}
          <div className="contact-card scroll-reveal scroll-slide-left neumorphic-card p-4 sm:p-7 md:p-8 rounded-2xl flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5 mb-4">
                <span className="font-mono-code text-xs text-[var(--primary-2)] uppercase font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[var(--primary-2)] shrink-0" />
                  <span>Primary Channel · Within 24h</span>
                </span>
              </div>

              <span className="font-mono-code text-xs text-[var(--text-dim)] uppercase block">
                Direct Email
              </span>
              <a
                href="mailto:sarthakmandhare34@gmail.com"
                className="font-display font-bold text-base sm:text-xl md:text-2xl text-[var(--text-primary)] hover:text-[var(--primary-2)] transition-colors mt-1 block break-all"
              >
                sarthakmandhare34@gmail.com
              </a>

              <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed text-justified">
                Best way to reach me for full-stack engineering roles and project opportunities.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center gap-2.5 sm:gap-3">
              <TactileButton
                href="mailto:sarthakmandhare34@gmail.com"
                variant="primary"
                size="sm"
                className="w-full sm:w-auto"
              >
                <span>Send Email</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </TactileButton>

              <TactileButton
                onClick={handleCopyEmail}
                variant="secondary"
                size="sm"
                className="w-full sm:w-auto"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-[var(--success)]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied!' : 'Copy Address'}</span>
              </TactileButton>
            </div>
          </div>

          {/* Phone & Location Card (Primary 2 Elevated) */}
          <div className="contact-card scroll-reveal scroll-slide-right stagger-1 neumorphic-card-p2 p-4 sm:p-7 md:p-8 rounded-2xl flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5 mb-4">
                <span className="font-mono-code text-xs text-[var(--primary-2)] uppercase font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--primary-2)] shrink-0" />
                  <span>Dombivli, Mumbai</span>
                </span>
              </div>

              <span className="font-mono-code text-xs text-[var(--text-dim)] uppercase block">
                Mobile &amp; WhatsApp
              </span>
              <a
                href="tel:+919326397599"
                className="font-display font-bold text-base sm:text-xl md:text-2xl text-[var(--text-primary)] hover:text-[var(--primary-2)] transition-colors mt-1 block font-mono-code break-words"
              >
                +91 93263 97599
              </a>

              <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed text-justified">
                Available for phone calls, WhatsApp messages, and role discussions.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center gap-2.5 sm:gap-3">
              <TactileButton
                href="tel:+919326397599"
                variant="primary"
                size="sm"
                className="w-full sm:w-auto"
              >
                <span>Call Direct</span>
                <Phone className="w-3.5 h-3.5" />
              </TactileButton>

              <TactileButton
                onClick={handleCopyPhone}
                variant="secondary"
                size="sm"
                className="w-full sm:w-auto"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-[var(--success)]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPhone ? 'Copied!' : 'Copy Number'}</span>
              </TactileButton>
            </div>
          </div>

        </div>

        {/* ──────────────── CURRICULUM VITAE & LINKS ROW ──────────────── */}
        <div className="contact-card scroll-reveal scroll-slide-up stagger-2 mt-7 sm:mt-10 p-4 sm:p-7 md:p-8 rounded-2xl neumorphic-card flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
          <div>
            <span className="font-mono-code text-xs text-[var(--accent)] uppercase font-semibold block mb-1">
              Curriculum Vitae
            </span>
            <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--text-primary)]">
              Sarthak Mangesh Mandhare · Resume
            </h3>
            <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5 text-justified">
              View or download my resume with verified internship certificates and project links.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 font-mono-code text-xs w-full lg:w-auto">
            <TactileButton
              onClick={onResumeClick}
              variant="primary"
              size="sm"
              className="w-full sm:w-auto"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Preview CV ↗</span>
            </TactileButton>

            <TactileButton
              onClick={handleDownloadResume}
              variant="secondary"
              size="sm"
              className="w-full sm:w-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF ↓</span>
            </TactileButton>

            <a
              href="https://github.com/SarthakMandhare34"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors inline-flex items-center justify-center gap-1 flex-1 sm:flex-initial"
            >
              <Github className="w-4 h-4" />
              <span>GitHub ↗</span>
            </a>

            <a
              href="https://www.linkedin.com/in/sarthak-mandhare-8a6730377"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--accent)] hover:underline inline-flex items-center justify-center gap-1 font-semibold flex-1 sm:flex-initial"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn ↗</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}