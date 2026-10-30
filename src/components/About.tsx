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
              I&apos;m a Computer Science student at Keraleeya Samajam&apos;s Model College (Autonomous) in
              Dombivli, expected to graduate in 2027. I develop web applications with a focus on
              frontend development, responsive interfaces, and integrating AI-powered features into
              practical workflows.
            </p>
            <p>
              My projects include <strong>LifeLink</strong>, a deployed healthcare prototype featuring
              AI-guided symptom triage, doctor discovery, and appointment booking, and{' '}
              <strong>KnowThySelf</strong>, a deployed MBTI personality assessment and recommendation
              platform. I have also completed two virtual internships, contributing to{' '}
              <strong>LuminaHub</strong>, an educational diagnostic pre-grader, and{' '}
              <strong>HeatSafe AI</strong>, a climate heat-safety platform. Both projects involved
              integrating and testing Gemini-powered features.
            </p>
            <p>
              I value clear interfaces, maintainable code, careful testing, and reliable deployment.
              I aim to build software that is practical, easy to use, and dependable.
            </p>
            <p className="about-languages-note">
              <strong>Spoken Languages:</strong> English · Hindi · Marathi
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
