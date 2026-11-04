/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ResumeModal } from './components/ResumeModal';
import { useScrollAnimations } from './utils/useScrollAnimations';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Initialize continuous scroll animations across all sections
  useScrollAnimations();

  // Gracefully dismiss the initial network preloader once React has mounted
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as unknown as { __dismissPreloader?: () => void }).__dismissPreloader) {
      (window as unknown as { __dismissPreloader: () => void }).__dismissPreloader();
    }
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-450">
        {/* Top Navigation Bar */}
        <Navbar onResumeClick={() => setIsResumeOpen(true)} />

        {/* Main Content: Hero, About, Projects, Experience, Skills, Education, and Contact */}
        <main>
          <Hero onResumeClick={() => setIsResumeOpen(true)} />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Education />
          <Contact onResumeClick={() => setIsResumeOpen(true)} />
        </main>

        {/* Minimal Footer */}
        <footer className="w-full border-t border-[var(--border)] bg-[var(--bg-base)] py-8 pb-24 md:py-10 text-xs font-inter text-[var(--text-secondary)]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="font-space font-bold text-[var(--text-primary)]">Sarthak Mangesh Mandhare</span>
              <span className="text-[var(--text-dim)]">·</span>
              <span>2026</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 font-mono-code text-[11px]">
              <a
                href="https://github.com/SarthakMandhare34"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors py-1"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/sarthak-mandhare-8a6730377"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors py-1"
              >
                LinkedIn ↗
              </a>
              <button
                onClick={() => setIsResumeOpen(true)}
                className="text-[var(--accent)] hover:underline cursor-pointer py-1"
              >
                Resume Preview ↗
              </button>
            </div>
          </div>
        </footer>

        {/* Mobile Bottom Tab Bar */}
        <MobileBottomNav />

        {/* Interactive Resume Preview Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}
