import React from 'react';

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  deploymentPlatform: string;
  description: string;
  bulletPoints: string[];
  techStack: string[];
  stats: {
    value: string;
    numericTarget?: number;
    isFloat?: boolean;
    label: string;
    subtext: string;
  }[];
  liveDemoUrl: string;
  repoUrl: string;
  backendRepoUrl?: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  duration: string;
  certificateId: string;
  projectName: string;
  projectSummary: string;
  bullets: string[];
  tags: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  certificatePdf: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Certification {
  title: string;
  program: string;
  authority: string;
  date: string;
  certificateId: string;
  pdfUrl: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }
}
