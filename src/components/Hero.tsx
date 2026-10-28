import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useSettings } from '../context/ThemeContext';

const EASE = [0.16, 1, 0.3, 1] as const;

interface HeroProps {
  onOpenResume: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();
  const { designMode } = useSettings();
  const isGlass = designMode === 'liquid-glass';

  return (
    <section
      className={`chapter chapter-hero ${isGlass ? 'hero-glass' : 'bg-paper'}`}
      id="hero"
      data-chapter="hero"
    >
      <motion.div
        className="chapter-bound hero-bound"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className={`hero-block ${isGlass ? 'hero-block-glass' : 'hero-block-solid'}`}>
          <div className="hero-grid-layout">
            <div className="hero-intro-column">
              <motion.h1
                className="display-heading hero-title"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              >
                <span className="text-line-wrapper">
                  <span className="text-line">I build AI-powered web apps</span>
                </span>{' '}
                <span className="text-line-wrapper">
                  <span className="text-line">that people can actually use.</span>
                </span>
              </motion.h1>

              <div className="hero-divider" aria-hidden="true" />

              <motion.div
                className="hero-details"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              >
                <p className="hero-identity">{PERSONAL_INFO.name}</p>
                <p className="hero-role">{PERSONAL_INFO.role}</p>
                <p className="hero-location">{PERSONAL_INFO.location}</p>
              </motion.div>

              <motion.div
                className="hero-links"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              >
                <button
                  type="button"
                  className="hero-link hero-link-primary js-open-resume"
                  id="hero-resume-btn"
                  onClick={onOpenResume}
                >
                  View Resume <span className="btn-badge">PDF</span>
                </button>
                <a
                  href="#projects"
                  className="hero-link hero-link-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('projects');
                  }}
                >
                  Explore Projects ↓
                </a>
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-link"
                >
                  GitHub ↗
                </a>
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-link"
                >
                  LinkedIn ↗
                </a>
              </motion.div>
            </div>

            {/* Right Column: Hero Portrait Card */}
            <motion.div
              className="hero-portrait-column"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
            >
              <div className={`hero-portrait-card ${isGlass ? 'portrait-glass' : 'portrait-solid'}`}>
                <div className="hero-portrait-frame">
                  <img
                    src="/sarthak-mandhare.jpg"
                    alt="Sarthak Mandhare"
                    className="hero-portrait-img"
                    width="280"
                    height="320"
                    loading="eager"
                  />
                  <div className="hero-portrait-glare" aria-hidden="true" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
