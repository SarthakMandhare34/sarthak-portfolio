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
      <div className="relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-450 overflow-x-hidden">
        {/* ──────── FIXED ATMOSPHERIC AMBIENT MESH (POWERS VIBRANT TRANSLUCENT GLASSMORHPISM) ──────── */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
          {/* Top-Left Orb (Primary 1 / Royal Blue / Sky Blue) */}
          <div
            className="absolute -top-24 -left-28 w-[680px] h-[680px] rounded-full opacity-70 dark:opacity-60 blur-[130px]"
            style={{
              background: 'radial-gradient(circle, var(--ambient-orb-p1) 0%, transparent 70%)',
            }}
          />
          {/* Top-Right Orb behind Hero portrait (Primary 2 / Nitro Orange / Rose Coral) */}
          <div
            className="absolute top-10 -right-24 w-[650px] h-[650px] rounded-full opacity-65 dark:opacity-55 blur-[130px]"
            style={{
              background: 'radial-gradient(circle, var(--ambient-orb-p2) 0%, transparent 70%)',
            }}
          />

          {/* Mid-Left Orb (About & Projects) - Accent Lime / Cerulean */}
          <div
            className="absolute top-[30%] -left-32 w-[600px] h-[600px] rounded-full opacity-60 dark:opacity-50 blur-[140px]"
            style={{
              background: 'radial-gradient(circle, var(--ambient-orb-accent) 0%, transparent 70%)',
            }}
          />

          {/* Mid-Right Orb (Projects & Experience) - Vibrant Sky / Royal Navy */}
          <div
            className="absolute top-[48%] -right-32 w-[650px] h-[650px] rounded-full opacity-65 dark:opacity-55 blur-[140px]"
            style={{
              background: 'radial-gradient(circle, var(--ambient-orb-p1) 0%, transparent 70%)',
            }}
          />

          {/* Lower-Left Orb (Experience & Skills) - Primary 2 Nitro Orange / Rose Coral */}
          <div
            className="absolute top-[68%] -left-28 w-[640px] h-[640px] rounded-full opacity-60 dark:opacity-50 blur-[130px]"
            style={{
              background: 'radial-gradient(circle, var(--ambient-orb-p2) 0%, transparent 70%)',
            }}
          />

          {/* Bottom-Right Orb (Education & Contact) - Accent Lime / Cerulean */}
          <div
            className="absolute -bottom-24 right-[10%] w-[680px] h-[680px] rounded-full opacity-65 dark:opacity-55 blur-[140px]"
            style={{
              background: 'radial-gradient(circle, var(--ambient-orb-accent) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Top Navigation Bar */}
        <Navbar onResumeClick={() => setIsResumeOpen(true)} />

        {/* Main Content: Hero, About, Projects, Skills, Education, and Contact */}
        <main className="relative z-10">
          <Hero onResumeClick={() => setIsResumeOpen(true)} />
          <About />
          <Projects />
          <Skills />
          <Education />
          <Contact onResumeClick={() => setIsResumeOpen(true)} />
        </main>

        {/* Minimal Frosted Glass Footer */}
        <footer className="relative z-10 w-full border-t border-[var(--border)] bg-[var(--bg-surface)] backdrop-blur-xl py-8 pb-24 md:py-10 text-xs font-inter text-[var(--text-secondary)]">
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
