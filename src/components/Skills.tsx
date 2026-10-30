import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';

const STANDARD_EASE = [0.16, 1, 0.3, 1] as const;

export const Skills: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: STANDARD_EASE,
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: STANDARD_EASE }
    }
  };

  return (
    <motion.section
      className="chapter chapter-skills bg-moss-deep text-paper"
      id="skills"
      data-chapter="skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.12 }}
      variants={containerVariants}
    >
      <div className="chapter-bound">
        <header className="section-head">
          <h2 className="section-title text-paper">
            <span className="text-line-wrapper">
              <span className="text-line">Skills</span>
            </span>
          </h2>
        </header>

        <div className="skills-cluster" id="skills-cluster">
          {SKILL_CATEGORIES.map((category) => (
            <motion.div
              key={category.name}
              className="skill-group-item group-solid"
              variants={itemVariants}
            >
              <h3 className="skill-group-name">{category.name}</h3>
              <ul className="skill-item-list">
                {category.skills.map((skill) => (
                  <li key={skill} className="chip-solid">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
