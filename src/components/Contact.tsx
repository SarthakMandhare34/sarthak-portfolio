import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';

const EASE = [0.16, 1, 0.3, 1] as const;

interface ContactProps {
  onCopy: (text: string, label: string) => void;
  onOpenResume: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onCopy, onOpenResume }) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleCopy = (text: string, label: string) => {
    onCopy(text, label);
    setCopiedItem(label);
    setTimeout(() => {
      setCopiedItem(null);
    }, 2000);
  };

  return (
    <motion.section
      className="chapter chapter-contact bg-paper"
      id="contact"
      data-chapter="contact"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="chapter-bound">
        <header className="section-head">
          <div className="section-eyebrow">06 / Contact</div>
          <h2 className="section-title">
            <span className="text-line-wrapper">
              <span className="text-line">Get in Touch</span>
            </span>
          </h2>
        </header>

        {/* Symmetrical Two-Card Architecture with Tactile Neumorphic Relief */}
        <div className="contact-grid">
          {/* Card 1: Direct Email Channel */}
          <div className="contact-card contact-card-solid neuro-card">
            <div className="contact-card-header">
              <span className="contact-type-badge">Primary Channel</span>
              <span className="contact-status-badge">⚡ Response within 24h</span>
            </div>

            <div className="contact-card-main">
              <h3 className="contact-card-title">Direct Email</h3>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="contact-main-value"
                title="Send email to Sarthak"
              >
                {PERSONAL_INFO.email}
              </a>
              <p className="contact-card-desc">
                For full-stack engineering opportunities, AI systems development, and architectural discussions.
              </p>
            </div>

            <div className="contact-card-actions">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="contact-btn contact-btn-primary neuro-action-btn"
              >
                Send Email ↗
              </a>
              <button
                type="button"
                className={`contact-btn contact-btn-secondary neuro-action-btn ${copiedItem === 'email' ? 'is-copied' : ''}`}
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                aria-label="Copy email address"
              >
                {copiedItem === 'email' ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-icon" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 2: Mobile & WhatsApp Channel */}
          <div className="contact-card contact-card-solid neuro-card">
            <div className="contact-card-header">
              <span className="contact-type-badge">Direct Line</span>
              <span className="contact-status-badge">📍 Dombivli, Mumbai</span>
            </div>

            <div className="contact-card-main">
              <h3 className="contact-card-title">Mobile &amp; WhatsApp</h3>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="contact-main-value"
                title="Call Sarthak"
              >
                {PERSONAL_INFO.phoneFormatted}
              </a>
              <p className="contact-card-desc">
                Available for direct calls, WhatsApp communication, and coordinating hybrid or remote technical roles.
              </p>
            </div>

            <div className="contact-card-actions">
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="contact-btn contact-btn-primary neuro-action-btn"
              >
                Call Direct ↗
              </a>
              <button
                type="button"
                className={`contact-btn contact-btn-secondary neuro-action-btn ${copiedItem === 'phone' ? 'is-copied' : ''}`}
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                aria-label="Copy phone number"
              >
                {copiedItem === 'phone' ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-icon" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>Copy Number</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Structured Bottom Dock matching Solid Mode */}
        <div className="contact-bottom-row">
          <div className="contact-resume-dock dock-solid neuro-card">
            <div className="resume-dock-meta">
              <span className="resume-dock-label">Curriculum Vitae:</span>
              <span className="resume-dock-file">Sarthak_Mandhare_Resume.pdf</span>
              <span className="resume-chip">2 Pages</span>
              <span className="resume-chip">{PERSONAL_INFO.resumeSize}</span>
            </div>

            <div className="resume-dock-links">
              <div className="dock-actions-group">
                <button
                  type="button"
                  className="dock-action-btn dock-btn-preview neuro-action-btn js-open-resume"
                  onClick={onOpenResume}
                >
                  Preview CV ↗
                </button>
                <a
                  href={PERSONAL_INFO.resumePdf}
                  download="Sarthak_Mandhare_Resume.pdf"
                  className="dock-action-btn dock-btn-download neuro-action-btn"
                >
                  Download PDF ↓
                </a>
              </div>

              <span className="dock-divider" aria-hidden="true" />

              <div className="dock-social-group">
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dock-social-link"
                >
                  GitHub ↗
                </a>
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dock-social-link"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
