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
              I am a computer science student with a strong interest in building practical web applications. My development focus spans responsive frontend interfaces, reliable backend services, and the careful integration of AI tools.
            </p>
            <p>
              I value clean architecture, maintainable code, and rigorous testing. My approach emphasizes delivering software that is easy to use, visually cohesive, and functionally dependable.
            </p>
            <p className="about-languages-note">
              <strong>Spoken Languages:</strong> English · Hindi · Marathi
            </p>
          </motion.div>

          {/* Right Column: Areas of Focus with Clean Tactile Card */}
          <motion.div
            className="about-column-strengths strengths-solid neuro-card"
            variants={itemVariants}
          >
            <h3 className="strengths-title">Areas of Focus</h3>
            
            <div className="strengths-list">
              <div className="strength-entry">
                <p>
                  <strong>Building responsive React and TypeScript interfaces.</strong> Developing
                  reusable components, managing component state, and creating responsive layouts
                  that adapt to different screen sizes.
                </p>
              </div>

              <div className="strength-entry">
                <p>
                  <strong>Integrating Gemini API into application workflows.</strong> Writing
                  structured prompts, testing AI responses against edge cases, and handling API
                  failures with fallback behavior.
                </p>
              </div>

              <div className="strength-entry">
                <p>
                  <strong>Working with backend services and databases.</strong> Integrating
                  frontend applications with Node.js and Express APIs, working with MySQL and
                  MongoDB, and using tools such as Drizzle ORM and tRPC. Testing integrated features
                  and fixing issues across application workflows.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
