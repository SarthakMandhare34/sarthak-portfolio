import React, { useEffect, useRef, useState } from 'react';
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
import anime from 'animejs';
import { TactileButton } from './TactileButton';
import { downloadBlobFile } from '../utils/download';

interface ContactProps {
  onResumeClick: () => void;
}

export function Contact({ onResumeClick }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Butter-smooth 60fps/120fps Anime.js bi-directional scroll animation
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const header = sectionEl.querySelector('.contact-header');
    const cards = sectionEl.querySelectorAll('.contact-card');

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

            anime({
              targets: header,
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
      ref={sectionRef}
      className="w-full bg-[var(--bg-base)] py-14 sm:py-20 md:py-28 transition-colors duration-450 border-t border-[var(--border)] relative opacity-0"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ──────────────── SECTION HEADER ──────────────── */}
        <div className="contact-header mb-7 sm:mb-12 max-w-3xl opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] text-xs font-mono-code text-[var(--accent)] mb-3">
            <span>Contact</span>
          </div>
          <h2 className="font-display font-bold text-[clamp(26px,5.5vw,44px)] text-[var(--text-primary)] leading-[1.12] tracking-tight">
            Get in Touch
          </h2>
          <p className="font-inter text-[13px] sm:text-[15px] md:text-[16px] text-[var(--text-secondary)] mt-1.5 leading-relaxed">
            Open for full-stack engineering opportunities, AI systems development, and architectural discussions.
          </p>
        </div>

        {/* ──────────────── CONTACT CARDS GRID ──────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-7">
          
          {/* Email Card */}
          <div className="contact-card opacity-0 neumorphic-card p-4 sm:p-7 md:p-8 border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5 mb-4">
                <span className="font-mono-code text-xs text-[var(--accent)] uppercase font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                  <span>Primary Channel · Within 24h</span>
                </span>
              </div>

              <span className="font-mono-code text-xs text-[var(--text-dim)] uppercase block">
                Direct Email
              </span>
              <a
                href="mailto:sarthakmandhare34@gmail.com"
                className="font-display font-bold text-base sm:text-xl md:text-2xl text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors mt-1 block break-all"
              >
                sarthakmandhare34@gmail.com
              </a>

              <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
                For full-stack engineering opportunities, AI systems development, and architectural discussions.
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

          {/* Phone & Location Card */}
          <div className="contact-card opacity-0 neumorphic-card p-4 sm:p-7 md:p-8 border border-[var(--border)] bg-[var(--bg-elevated)]/90 rounded-2xl flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5 mb-4">
                <span className="font-mono-code text-xs text-[var(--accent)] uppercase font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                  <span>Dombivli, Mumbai</span>
                </span>
              </div>

              <span className="font-mono-code text-xs text-[var(--text-dim)] uppercase block">
                Mobile &amp; WhatsApp
              </span>
              <a
                href="tel:+919326397599"
                className="font-display font-bold text-base sm:text-xl md:text-2xl text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors mt-1 block font-mono-code break-words"
              >
                +91 93263 97599
              </a>

              <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
                Available for direct calls, WhatsApp communication, and coordinating hybrid or remote technical roles.
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
        <div className="contact-card opacity-0 mt-7 sm:mt-10 p-4 sm:p-7 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]/90 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
          <div>
            <span className="font-mono-code text-xs text-[var(--accent)] uppercase font-semibold block mb-1">
              Curriculum Vitae
            </span>
            <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--text-primary)]">
              Sarthak Mangesh Mandhare · Resume
            </h3>
            <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
              Clickable certificates, detailed academic coursework, and production project links.
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
