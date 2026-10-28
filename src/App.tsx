import React, { useState, useRef } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CertificateModal } from './components/CertificateModal';
import { Toast } from './components/Toast';
import { useScrollSpy } from './hooks/useScrollSpy';
import { Certification } from './types';

const PortfolioContent: React.FC = () => {
  const { activeSection, isScrolled, scrollTo } = useScrollSpy();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const handleCopy = async (text: string, label: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const temp = document.createElement('textarea');
        temp.value = text;
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
    } catch {
      const temp = document.createElement('textarea');
      temp.value = text;
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
    }

    setToastMessage(`Copied ${label} to clipboard.`);
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  return (
    <>
      {/* Accessible Skip Link */}
      <a href="#content" className="skip-link">
        Skip to main content
      </a>

      {/* Navigation */}
      <Navbar
        activeSection={activeSection}
        isScrolled={isScrolled}
        onNavigate={scrollTo}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* Main Content Chapters with Framer Motion Entrance Animations */}
      <main id="content" className="chapters-stack">
        <Hero
          onOpenResume={() => setIsResumeModalOpen(true)}
          onNavigate={scrollTo}
        />
        <About />
        <Experience
          onOpenCertificate={(cert) => setSelectedCert(cert)}
        />
        <Projects />
        <Skills />
        <Education
          onOpenCertificate={(cert) => setSelectedCert(cert)}
        />
        <Contact
          onCopy={handleCopy}
          onOpenResume={() => setIsResumeModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Feedback */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onCopy={handleCopy}
      />

      <CertificateModal
        certification={selectedCert}
        onClose={() => setSelectedCert(null)}
      />

      <Toast message={toastMessage} />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
};

export default App;
