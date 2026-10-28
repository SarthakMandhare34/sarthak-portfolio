import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PROJECTS } from '../data/portfolioData';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { useSettings } from '../context/ThemeContext';

const EASE = [0.16, 1, 0.3, 1] as const;

interface StatCounterProps {
  numericTarget?: number;
  value: string;
  isFloat?: boolean;
  isActive: boolean;
  label: string;
  subtext: string;
}

const StatCounterItem: React.FC<StatCounterProps> = ({
  numericTarget,
  value,
  isFloat = false,
  isActive,
  label,
  subtext
}) => {
  const animatedValue = useAnimatedCounter({
    target: numericTarget ?? 0,
    isFloat,
    isActive: isActive && numericTarget !== undefined
  });

  return (
    <div className="figure-entry">
      <span className="figure-value js-counter">
        {numericTarget !== undefined ? animatedValue : value}
      </span>
      <span className="figure-label">{label}</span>
      <span className="figure-subtext">{subtext}</span>
    </div>
  );
};

export const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(PROJECTS[0].id);
  const controlsRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { designMode } = useSettings();
  const isGlass = designMode === 'liquid-glass';

  // Position sliding underline
  useEffect(() => {
    if (!controlsRef.current || !underlineRef.current) return;
    const controls = controlsRef.current;
    const activeBtn = controls.querySelector<HTMLButtonElement>(`#tab-${activeTab}`);
    if (activeBtn) {
      const controlsRect = controls.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      underlineRef.current.style.left = `${btnRect.left - controlsRect.left}px`;
      underlineRef.current.style.width = `${btnRect.width}px`;
    }
  }, [activeTab, designMode]);

  return (
    <motion.section
      className={`chapter chapter-projects ${isGlass ? 'projects-glass' : 'bg-fern'}`}
      id="projects"
      data-chapter="projects"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="chapter-bound">
        <header className="section-head">
          <div className="section-eyebrow">03 / Selected Works</div>
          <h2 className="section-title">
            <span className="text-line-wrapper">
              <span className="text-line">Projects</span>
            </span>
          </h2>
        </header>

        {/* Accessible Project Tab Bar */}
        <div className={`projects-tab-container ${isGlass ? 'tabs-glass' : 'tabs-solid'}`} id="projects-tab-container">
          <div
            className="tab-controls"
            id="tab-controls"
            role="tablist"
            aria-label="Featured projects switcher"
            ref={controlsRef}
          >
            {PROJECTS.map((proj) => {
              const isActive = activeTab === proj.id;
              return (
                <button
                  key={proj.id}
                  type="button"
                  role="tab"
                  className={`tab-button ${isActive ? 'is-active' : ''}`}
                  id={`tab-${proj.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${proj.id}`}
                  onClick={() => setActiveTab(proj.id)}
                >
                  {proj.name}
                </button>
              );
            })}
            <span className="tab-underline" id="tab-underline" ref={underlineRef} aria-hidden="true" />
          </div>

          {/* Project Panels */}
          {PROJECTS.map((proj) => {
            const isActive = activeTab === proj.id;
            return (
              <motion.div
                key={proj.id}
                className={`project-panel ${isActive ? 'is-active' : ''}`}
                id={`panel-${proj.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${proj.id}`}
                hidden={!isActive}
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`project-card ${isGlass ? 'card-glass' : 'card-solid'}`}>
                  <div className="panel-inner">
                    <div className="project-summary-col">
                      <div className="project-status-row">
                        <span className="project-status-item">{proj.category}</span>
                        <span className="project-status-item">{proj.deploymentPlatform}</span>
                      </div>

                      <h3 className="project-heading">
                        {proj.name} &mdash; {proj.subtitle}
                      </h3>

                      <p className="project-description">{proj.description}</p>

                      <ul className="project-bullet-list">
                        {proj.bulletPoints.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>

                      {/* Tech Stack Pills */}
                      <div className="tech-pills-row">
                        <span className="tech-pills-label">Stack:</span>
                        {proj.techStack.map((tech) => (
                          <span key={tech} className="tech-pill">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Animated Statistics Strip */}
                      <div className={`project-stats-strip ${isGlass ? 'stats-strip-glass' : 'stats-strip-solid'}`}>
                        {proj.stats.map((st, idx) => (
                          <StatCounterItem
                            key={idx}
                            numericTarget={st.numericTarget}
                            value={st.value}
                            isFloat={st.isFloat}
                            isActive={isActive}
                            label={st.label}
                            subtext={st.subtext}
                          />
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="project-actions-row">
                        <a
                          href={proj.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-btn action-btn-primary"
                        >
                          Visit Live App ↗
                        </a>
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-btn action-btn-secondary"
                        >
                          Frontend Repo ↗
                        </a>
                        {proj.backendRepoUrl && (
                          <a
                            href={proj.backendRepoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-btn action-btn-secondary"
                          >
                            Backend Repo ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
