import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Download,
  FileText,
  ExternalLink,
  Printer,
  Check,
  Loader2,
} from 'lucide-react';
import anime from 'animejs';
import { downloadBlobFile } from '../utils/download';
import { TactileButton } from './TactileButton';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'success'>('idle');
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (backdropRef.current && modalRef.current) {
        anime({
          targets: backdropRef.current,
          opacity: [0, 1],
          duration: 350,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        });

        anime({
          targets: modalRef.current,
          opacity: [0, 1],
          scale: [0.96, 1],
          translateY: [16, 0],
          duration: 400,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        });
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (backdropRef.current && modalRef.current) {
      anime({
        targets: backdropRef.current,
        opacity: [1, 0],
        duration: 220,
        easing: 'easeInQuad',
      });

      anime({
        targets: modalRef.current,
        opacity: [1, 0],
        scale: [1, 0.96],
        translateY: [0, 12],
        duration: 220,
        easing: 'easeInQuad',
        complete: () => {
          onClose();
        },
      });
    } else {
      onClose();
    }
  };

  const handleDownload = async () => {
    try {
      setDownloadStatus('downloading');
      await downloadBlobFile('/Sarthak_Mandhare_Resume.pdf', 'Sarthak_Mangesh_Mandhare_Resume.pdf');
      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    } catch {
      setDownloadStatus('idle');
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('/Sarthak_Mandhare_Resume.pdf', '_blank');
    if (printWindow) {
      printWindow.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity opacity-0"
      />

      {/* Modal Dialog with Neumorphic & Glassmorphic Styling */}
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl h-[94vh] sm:h-[92vh] neumorphic-card p-3.5 sm:p-5 md:p-6 z-10 text-[var(--text-primary)] flex flex-col opacity-0 rounded-2xl"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 mb-2.5 sm:mb-3 gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] shrink-0">
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0">
              <h2 id="resume-title" className="font-display text-sm sm:text-lg md:text-xl font-bold tracking-tight truncate">
                Sarthak Mangesh Mandhare — Resume
              </h2>
              <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] font-inter truncate">
                Official PDF Document
              </p>
            </div>
          </div>

          {/* Action Header Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <TactileButton
              href="/Sarthak_Mandhare_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
              title="Open in new window"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open Tab</span>
            </TactileButton>

            <div className="hidden md:block">
              <TactileButton
                onClick={handlePrint}
                variant="secondary"
                size="sm"
                title="Print resume"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </TactileButton>
            </div>

            <TactileButton
              onClick={handleDownload}
              disabled={downloadStatus === 'downloading'}
              variant="primary"
              size="sm"
            >
              {downloadStatus === 'downloading' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="hidden xs:inline sm:inline">Downloading...</span>
                </>
              ) : downloadStatus === 'success' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline sm:inline">Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </>
              )}
            </TactileButton>

            <button
              onClick={handleClose}
              className="neumorphic-btn p-1.5 text-[var(--text-primary)] cursor-pointer"
              aria-label="Close resume preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ──────────────── EMBEDDED ORIGINAL PDF PREVIEW ──────────────── */}
        <div className="relative flex-1 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-[var(--border)] bg-[#2a2a2a] shadow-inner flex flex-col">
          <object
            data="/Sarthak_Mandhare_Resume.pdf#toolbar=1&navpanes=0"
            type="application/pdf"
            className="w-full h-full flex-1"
          >
            <iframe
              src="/Sarthak_Mandhare_Resume.pdf#toolbar=1&navpanes=0"
              title="Sarthak Mandhare Resume PDF"
              className="w-full h-full border-0"
            >
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Your browser does not support embedded PDF viewing.
                </p>
                <a
                  href="/Sarthak_Mandhare_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neumorphic-btn bg-[var(--accent)] text-[var(--bg-base)] px-4 py-2 text-xs font-semibold inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download or Open Resume PDF</span>
                </a>
              </div>
            </iframe>
          </object>
        </div>

        {/* Footer Info */}
        <div className="mt-2.5 pt-2 border-t border-[var(--border)] flex items-center justify-between text-[11px] sm:text-xs text-[var(--text-dim)] font-mono-code">
          <span className="truncate max-w-[200px] sm:max-w-none">Sarthak_Mangesh_Mandhare_Resume.pdf</span>
          <button
            onClick={handleClose}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline cursor-pointer shrink-0 ml-2"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
