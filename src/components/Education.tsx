import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PERSONAL_INFO, CERTIFICATIONS } from '../data/portfolioData';
import { Certification } from '../types';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

const EASE = [0.16, 1, 0.3, 1] as const;

interface EducationProps {
  onOpenCertificate: (cert: Certification) => void;
}

export const Education: React.FC<EducationProps> = ({ onOpenCertificate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const colRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const el = colRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cgpaValue = useAnimatedCounter({
    target: PERSONAL_INFO.education.cgpa,
    isFloat: true,
    decimals: 2,
    isActive: isVisible
  });

  return (
    <motion.section
      className="chapter chapter-education bg-paper"
      id="education"
      data-chapter="education"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="chapter-bound">
        <header className="section-head">
          <div className="section-eyebrow">05 / Background</div>
          <h2 className="section-title">
            <span className="text-line-wrapper">
              <span className="text-line">Education</span>
            </span>
          </h2>
        </header>

        <div className="education-grid">
          {/* Left Column: Academic Degree & Honors Card */}
          <motion.div
            className="education-degree-card degree-solid neuro-card"
            ref={colRef}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="degree-card-header">
              <span className="degree-category-badge">Higher Education</span>
              <span className="degree-status-badge">Current Undergraduate</span>
            </div>

            <div className="degree-main-info">
              <h3 className="institution-name">{PERSONAL_INFO.education.institution}</h3>
              <p className="degree-title">{PERSONAL_INFO.education.degree}</p>
              <p className="graduation-year">
                <span className="grad-icon" aria-hidden="true">🎓</span>
                {PERSONAL_INFO.education.graduationYear} · Dombivli, Mumbai
              </p>
            </div>

            <div className="degree-overview">
              <div className="degree-spec-row">
                <span className="degree-spec-label">Program Structure</span>
                <span className="degree-spec-value">Autonomous 3–Year Degree</span>
              </div>
              <div className="degree-spec-row">
                <span className="degree-spec-label">University Affiliation</span>
                <span className="degree-spec-value">University of Mumbai</span>
              </div>
            </div>

            <div className="cgpa-box cgpa-solid">
              <div className="cgpa-meta">
                <span className="cgpa-label">Cumulative GPA</span>
              </div>
              <div className="cgpa-display">
                <span className="cgpa-val js-counter">{cgpaValue}</span>
                <span className="cgpa-max">/ {PERSONAL_INFO.education.cgpaMax}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Program Certifications Card */}
          <motion.div
            className="education-cert-card cert-card-solid neuro-card"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="cert-card-header">
              <h3 className="cert-col-title">Program Certifications</h3>
              <span className="cert-count-badge">2 Issued</span>
            </div>

            <div className="cert-entries">
              {CERTIFICATIONS.map((cert, cIdx) => (
                <div
                  key={cert.certificateId}
                  className={`cert-item ${cIdx === 0 ? 'cert-ibm' : 'cert-lenovo'}`}
                >
                  <div className="cert-item-top">
                    <span className={`cert-badge ${cIdx === 0 ? 'badge-terracotta' : 'badge-olive'}`}>
                      {cIdx === 0 ? 'IBM SkillsBuild' : 'Lenovo LEAP'}
                    </span>
                    <span className="cert-date-text">{cert.date}</span>
                  </div>

                  <h4 className="cert-name">{cert.title} — {cert.program}</h4>
                  <p className="cert-authority">{cert.authority}</p>

                  <div className="cert-action-row">
                    <span className="cert-id-badge">ID: {cert.certificateId}</span>
                    <button
                      type="button"
                      className="timeline-action-btn neuro-action-btn"
                      onClick={() => onOpenCertificate(cert)}
                    >
                      View Certificate ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
