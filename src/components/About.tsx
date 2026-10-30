import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

const STANDARD_EASE = [0.16, 1, 0.3, 1] as const;

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: STANDARD_EASE,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: STANDARD_EASE }
    }
  };

  return (
    <motion.section
      className="chapter chapter-about bg-fern"
      id="about"
      data-chapter="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      variants={containerVariants}
    >
      <div className="chapter-bound">
        <header className="section-head">
          <div className="section-eyebrow">01 / Profile</div>
          <h2 className="section-title">
            <span className="text-line-wrapper">
              <span className="text-line">About</span>
            </span>
          </h2>
        </header>

        <div className="about-grid">
          {/* Left Column: Plain First-Person Prose */}
          <motion.div className="about-column-story" variants={itemVariants}>
            <p>
              I am a computer science student at Keraleeya Samajam&apos;s Model College in Dombivli,
              graduating in 2027. My work focuses on building full-stack applications where modern
              machine learning interfaces feel natural, responsive, and grounded in practical
              needs.
            </p>
            <p>
              I care about seeing projects through from initial schema design to production
              deployment. Over the past year, I have shipped two deployed applications and completed
              two virtual internships integrating Gemini models into clinical triage and classroom
              pre-grading.
            </p>
            <p>
              I work comfortably in English, Hindi, and Marathi. Whether refining component state
              flow or writing database migrations, I value simplicity, steady architectural
              decisions, and reliable software.
            </p>
          </motion.div>

          {/* Right Column: Current Capabilities with Clean Tactile Card */}
          <motion.div
            className="about-column-strengths strengths-solid neuro-card"
            variants={itemVariants}
          >
            <h3 className="strengths-title">What I am currently good at</h3>
            
            <div className="strengths-list">
              <div className="strength-entry">
                <p>
                  <strong>Building accessible React and TypeScript interfaces.</strong> Writing clean
                  component trees, predictable state boundaries, and responsive layouts that
                  perform well on any screen.
                </p>
              </div>

              <div className="strength-entry">
                <p>
                  <strong>Integrating the Gemini API into real workflows.</strong> Designing
                  structured prompts, testing against failure edge cases, and building fallbacks
                  when an API call times out or returns unexpected output.
                </p>
              </div>

              <div className="strength-entry">
                <p>
                  <strong>Architecting typed backend services.</strong> Building Express, tRPC, and
                  REST routes backed by relational MySQL schemas or MongoDB collections, with
                  automated test coverage.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
