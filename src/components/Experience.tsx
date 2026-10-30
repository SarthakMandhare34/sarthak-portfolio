import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EXPERIENCES, CERTIFICATIONS } from '../data/portfolioData';
import { Certification } from '../types';

const EASE = [0.16, 1, 0.3, 1] as const;

interface ExperienceProps {
  onOpenCertificate: (cert: Certification) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onOpenCertificate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    function updateTrackBounds() {
      if (!section || !track) return;
      const entries = section.querySelectorAll<HTMLElement>('.timeline-entry');
      if (entries.length >= 2) {
        const firstEntry = entries[0];
        const lastEntry = entries[entries.length - 1];
        const firstDot = firstEntry.querySelector<HTMLElement>('.timeline-dot');
        const lastDot = lastEntry.querySelector<HTMLElement>('.timeline-dot');
        if (firstDot && lastDot) {
          const firstCenter = firstEntry.offsetTop + firstDot.offsetTop + firstDot.offsetHeight / 2;
          const lastCenter = lastEntry.offsetTop + lastDot.offsetTop + lastDot.offsetHeight / 2;
          track.style.top = `${firstCenter}px`;
          track.style.height = `${Math.max(20, lastCenter - firstCenter)}px`;
        }
      }
    }

    updateTrackBounds();
    window.addEventListener('resize', updateTrackBounds, { passive: true });

    const timer = setTimeout(updateTrackBounds, 300);

    return () => {
      window.removeEventListener('resize', updateTrackBounds);
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="chapter chapter-experience bg-paper"
      id="experience"
      data-chapter="experience"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="chapter-bound">
        <header className="section-head">
          <h2 className="section-title">
            <span className="text-line-wrapper">
              <span className="text-line">Virtual Internships</span>
            </span>
          </h2>
          <div className="experience-meta-banner">
            <span className="meta-period">IBM SkillsBuild &amp; Lenovo LEAP (June — July 2026)</span>
          </div>
        </header>

        {/* Vertical Timeline Spine with Tactile Neumorphic Nodes */}
        <div className="timeline-wrap" id="timeline-wrap">
          <div className="timeline-line-track" id="timeline-track" ref={trackRef} aria-hidden="true" />

          <div className="timeline-nodes-list">
            {EXPERIENCES.map((exp, idx) => {
              const matchingCert = CERTIFICATIONS[idx];
              const isFirst = idx === 0;

              return (
                <motion.article
                  key={exp.id}
                  className={`timeline-entry ${isFirst ? 'entry-ibm' : 'entry-lenovo'} entry-solid`}
                  id={`timeline-entry-${idx + 1}`}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: EASE }}
                >
                  <div className="timeline-dot" aria-hidden="true" />
                  
                  <div className="timeline-content timeline-solid neuro-card">
                    <div className="timeline-header">
                      <div className="timeline-role-row">
                        <h3 className="timeline-role">{exp.role}</h3>
                        <span className={`timeline-program-chip ${isFirst ? 'chip-primary' : 'chip-secondary'}`}>
                          {isFirst ? 'IBM SkillsBuild' : 'Lenovo LEAP'}
                        </span>
                      </div>
                      <p className="timeline-company">{exp.company}</p>
                      <p className="timeline-duration">
                        {exp.duration} · <span className="timeline-cert-tag">ID: {exp.certificateId}</span>
                      </p>
                    </div>

                    <p className="timeline-project-name">
                      <span className="project-lead-label">Project:</span> {exp.projectName}
                    </p>

                    <ul className="timeline-bullets">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>

                    {/* Tech pills */}
                    <div className="timeline-tags-row">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="exp-tech-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="timeline-action-buttons">
                      <a
                        href={exp.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="timeline-action-btn timeline-btn-github neuro-action-btn"
                      >
                        GitHub ↗
                      </a>
                      {exp.liveDemoUrl && (
                        <a
                          href={exp.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="timeline-action-btn timeline-btn-demo neuro-action-btn"
                        >
                          Live Demo ↗
                        </a>
                      )}
                      {matchingCert && (
                        <button
                          type="button"
                          className="timeline-action-btn timeline-btn-cert neuro-action-btn"
                          onClick={() => onOpenCertificate(matchingCert)}
                        >
                          View Certificate ({exp.certificateId}) ↗
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
