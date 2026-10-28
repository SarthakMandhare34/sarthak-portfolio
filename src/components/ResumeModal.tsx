import React, { useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopy: (text: string, label: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onCopy }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (typeof dialog.showModal === 'function' && !dialog.open) {
        dialog.showModal();
      }
      document.body.style.overflow = 'hidden';
    } else {
      if (typeof dialog.close === 'function' && dialog.open) {
        dialog.close();
      }
      document.body.style.removeProperty('overflow');
    }

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [isOpen]);

  // Handle ESC and click outside
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="resume-modal"
      onClose={onClose}
      onClick={handleDialogClick}
      aria-labelledby="resume-modal-title"
    >
      <div className="modal-container">
        <header className="modal-header">
          <div className="modal-title-group">
            <h2 id="resume-modal-title" className="modal-title">
              {PERSONAL_INFO.name}
            </h2>
            <span className="modal-badge">Full-Stack Software Developer · 2-Page CV</span>
          </div>
          <div className="modal-actions">
            <a
              href={PERSONAL_INFO.resumePdf}
              download="Sarthak_Mandhare_Resume.pdf"
              className="modal-action-btn modal-btn-download"
            >
              Download PDF ↓
            </a>
            <a
              href={PERSONAL_INFO.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-action-btn modal-btn-external"
              title="Open PDF in new tab"
            >
              Open in New Tab ↗
            </a>
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close resume preview"
            >
              ✕
            </button>
          </div>
        </header>

        <div className="modal-body">
          <iframe
            src={`${PERSONAL_INFO.resumePdf}#toolbar=0&navpanes=0`}
            className="resume-frame"
            title="Sarthak Mandhare Resume PDF"
          >
            <p className="resume-fallback">
              Your browser does not support inline PDF viewing.{' '}
              <a href={PERSONAL_INFO.resumePdf} download="Sarthak_Mandhare_Resume.pdf">
                Click here to download Sarthak's Resume PDF
              </a>
              .
            </p>
          </iframe>
        </div>

        <footer className="modal-footer">
          <div className="modal-footer-info">
            <span>
              {PERSONAL_INFO.education.institution} · B.Sc. Computer Science (2027)
            </span>
          </div>
          <div className="modal-footer-contact">
            <button
              type="button"
              className="modal-contact-chip"
              onClick={() => onCopy(PERSONAL_INFO.email, 'email address')}
            >
              {PERSONAL_INFO.email}
            </button>
            <button
              type="button"
              className="modal-contact-chip"
              onClick={() => onCopy(PERSONAL_INFO.phone, 'phone number')}
            >
              {PERSONAL_INFO.phone}
            </button>
          </div>
        </footer>
      </div>
    </dialog>
  );
};
