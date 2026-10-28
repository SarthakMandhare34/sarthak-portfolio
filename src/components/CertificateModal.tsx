import React, { useEffect, useRef } from 'react';
import { Certification } from '../types';

interface CertificateModalProps {
  certification: Certification | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certification, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (certification) {
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
  }, [certification]);

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!certification) return null;

  return (
    <dialog
      ref={dialogRef}
      className="resume-modal"
      onClose={onClose}
      onClick={handleDialogClick}
      aria-labelledby="cert-modal-title"
    >
      <div className="modal-container">
        <header className="modal-header">
          <div className="modal-title-group">
            <h2 id="cert-modal-title" className="modal-title">
              {certification.title}
            </h2>
            <span className="modal-badge">{certification.certificateId}</span>
          </div>
          <div className="modal-actions">
            <a
              href={certification.pdfUrl}
              download
              className="modal-action-btn modal-btn-download"
            >
              Download PDF ↓
            </a>
            <a
              href={certification.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-action-btn modal-btn-external"
              title="Open Certificate in new tab"
            >
              Open in New Tab ↗
            </a>
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close certificate preview"
            >
              ✕
            </button>
          </div>
        </header>

        <div className="modal-body">
          <iframe
            src={`${certification.pdfUrl}#toolbar=0&navpanes=0`}
            className="resume-frame"
            title={`${certification.title} - ${certification.program}`}
          >
            <p className="resume-fallback">
              Your browser does not support inline PDF viewing.{' '}
              <a href={certification.pdfUrl} download>
                Click here to download Certificate PDF
              </a>
              .
            </p>
          </iframe>
        </div>

        <footer className="modal-footer">
          <div className="modal-footer-info">
            <span>{certification.program} · {certification.date}</span>
          </div>
          <div className="modal-footer-contact">
            <span style={{ fontSize: '0.8rem', color: 'var(--ink-mid)' }}>
              {certification.authority}
            </span>
          </div>
        </footer>
      </div>
    </dialog>
  );
};
