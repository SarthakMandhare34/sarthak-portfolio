import { Project, ExperienceEntry, SkillCategory, Certification } from '../types';

export const PERSONAL_INFO = {
  name: 'Sarthak Mangesh Mandhare',
  shortName: 'Sarthak Mandhare',
  role: 'Full-stack developer, frontend-leaning',
  location: 'Dombivli, Mumbai, India',
  email: 'sarthakmandhare34@gmail.com',
  phone: '+91 93263 97599',
  phoneFormatted: '+91 93263 97599',
  githubUrl: 'https://github.com/sarthakmandhare34',
  linkedinUrl: 'https://www.linkedin.com/in/sarthak-mandhare-8a6730377/?isSelfProfile=true',
  resumePdf: '/Sarthak_Mandhare_Resume.pdf',
  resumeSize: '20 KB',
  education: {
    institution: "Keraleeya Samajam's Model College (Autonomous)",
    degree: 'Bachelor of Science in Computer Science',
    graduationYear: 'Expected graduation: 2027',
    cgpa: 7.08,
    cgpaMax: 10,
    languages: 'English (fluent), Hindi (fluent), and Marathi (native).'
  }
};

export const EXPERIENCES: ExperienceEntry[] = [
  {
    id: 'exp-ibm',
    role: 'AI Automation & Intelligent Solutions Virtual Internship',
    company: 'IBM SkillsBuild & BharatCares, in association with AICTE',
    duration: '22 June 2026 — 31 July 2026',
    certificateId: 'BHIBMAC04046',
    projectName: 'LuminaHub, educational diagnostic pre-grader',
    projectSummary: 'Educational diagnostic pre-grader platform built with React, TypeScript, Node.js, and Gemini.',
    bullets: [
      'Built a platform that reviews student submissions, flags conceptual misunderstandings, and generates adaptive follow-up practice questions using React, TypeScript, Node.js, Express, and the Gemini API.',
      'Implemented diagnostic grading and concept-mastery analysis so feedback changes dynamically based on where each student is stuck.',
      'Built a teacher analytics view showing class-wide concept gaps rather than just individual numerical scores.',
      'Tested AI features in Google AI Studio across diverse prompts before merging into the main user interface.'
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'Gemini API'],
    githubUrl: 'https://github.com/SarthakMandhare34/lumina-hub-',
    liveDemoUrl: 'https://lumina-hub-pyyu.onrender.com/',
    certificatePdf: '/certificates/IBM_SkillsBuild_Certificate_BHIBMAC04046.pdf'
  },
  {
    id: 'exp-lenovo',
    role: 'Generative AI & Agentic Systems Engineering Virtual Internship',
    company: 'Lenovo LEAP NextGen Scholar Program, implemented by BharatCares in association with AICTE',
    duration: 'June — July 2026 (Issued 24 July 2026)',
    certificateId: '6302092',
    projectName: 'HeatSafe AI, climate heatwave safety platform',
    projectSummary: 'Climate heatwave safety platform covering heat-risk assessment, hydration planning, and emergency guidance.',
    bullets: [
      'Built the React and TypeScript (Vite) frontend covering heat-risk assessment, hydration planning, symptom checking, and emergency guidance.',
      'Wrote Gemini API prompts for symptom checking and safety guidance, testing them against edge cases like conflicting symptoms and missing user inputs.',
      'Integrated AI components into the existing interface and resolved edge-case behaviors identified during testing.'
    ],
    tags: ['React', 'TypeScript', 'Vite', 'Gemini API'],
    githubUrl: 'https://github.com/SarthakMandhare34/Heat-safe',
    certificatePdf: '/certificates/Lenovo_LEAP_Certificate_6302092.pdf'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'lifelink',
    name: 'LifeLink',
    subtitle: 'Smart Healthcare Assistance Platform',
    category: 'Major academic project · Prototype',
    deploymentPlatform: 'Deployed on Render',
    description:
      'A smart healthcare system providing symptom checking, doctor search, appointment booking, digital prescriptions, and an Emergency Health Passport. Powered by Gemini Flash guidance with emergency triage checks, age-based rules, and safe fallback responses when AI calls fail.',
    bulletPoints: [
      'Full triage flow with real-time SSE streaming and tRPC end-to-end type safety.',
      'Persistent clinical schemas and appointment workflows modeled with Drizzle ORM on MySQL.',
      'Validated through a comprehensive suite of unit and integration tests.'
    ],
    techStack: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'MySQL',
      'Drizzle ORM',
      'Gemini Flash',
      'tRPC',
      'SSE',
      'Render'
    ],
    stats: [
      {
        value: '52',
        numericTarget: 52,
        isFloat: false,
        label: 'Simulated doctors',
        subtext: 'Across 19 Mumbai railway stations'
      },
      {
        value: '19',
        numericTarget: 19,
        isFloat: false,
        label: 'Railway stations',
        subtext: 'Covering Mumbai commuter hubs'
      }
    ],
    liveDemoUrl: 'https://new-lifelink-smart-healthcare-assistance.onrender.com/',
    repoUrl: 'https://github.com/SarthakMandhare34/New-LifeLink-Smart-Healthcare-Assistance-Platform'
  },
  {
    id: 'knowthyself',
    name: 'KnowThySelf',
    subtitle: 'MBTI Personality Assessment Platform',
    category: 'Group project · Frontend Contribution',
    deploymentPlatform: 'Deployed on Vercel',
    description:
      'A self-discovery platform featuring five complete frontend views: home, login, questionnaire, assessment dashboard, and tailored recommendations. Designed around an engaging bento-grid layout, glassmorphic accents, dark/light theme switching, and an interactive HTML5 Canvas particle backdrop.',
    bulletPoints: [
      'Slide-based 60-question assessment workflow with smooth view transitions.',
      'Percentage-based trait calculation mapping psychological preferences to 16 personality types.',
      'Visual trait distribution bars, written behavioral insights, and curated learning roadmaps.'
    ],
    techStack: [
      'HTML5 Canvas',
      'CSS3',
      'JavaScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Vercel'
    ],
    stats: [
      {
        value: '5',
        numericTarget: 5,
        isFloat: false,
        label: 'Interface Views',
        subtext: 'Home, login, quiz, dashboard & suggestions'
      },
      {
        value: 'Canvas',
        label: 'Interactive Particles',
        subtext: 'Dynamic background painted with Canvas API'
      },
      {
        value: '16 Types',
        label: 'Trait Analytics',
        subtext: 'Granular psychological trait scoring'
      }
    ],
    liveDemoUrl: 'https://knowthyself-frontend-eight.vercel.app/home.html',
    repoUrl: 'https://github.com/shubhra-1337/KnowThySelf_CE_Frontend',
    backendRepoUrl: 'https://github.com/shubhra-1337/KnowThySelf_CE_Backend'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'SQL']
  },
  {
    name: 'Frontend',
    skills: ['React', 'HTML5', 'CSS3', 'Responsive Design', 'UI/UX']
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Express', 'REST APIs', 'tRPC', 'SSE']
  },
  {
    name: 'Databases & ORM',
    skills: ['MySQL', 'MongoDB', 'Drizzle ORM']
  },
  {
    name: 'AI',
    skills: ['Google Gemini API', 'Prompt Engineering', 'AI Integration', 'Google AI Studio']
  },
  {
    name: 'Testing',
    skills: ['Unit Testing', 'Integration Testing', 'Test Mocking']
  },
  {
    name: 'Tools & Deployment',
    skills: ['Git', 'GitHub', 'npm', 'Render', 'Vercel']
  },
  {
    name: 'Authentication',
    skills: ['OAuth 2.0', 'Session-based Authentication']
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Certificate of Training',
    program: 'IBM SkillsBuild AI Automation & Intelligent Solutions Internship',
    authority:
      'Awarded by BharatCares in association with the All India Council for Technical Education (AICTE) and IBM SkillsBuild.',
    date: '22 June 2026 — 31 July 2026',
    certificateId: 'BHIBMAC04046',
    pdfUrl: '/certificates/IBM_SkillsBuild_Certificate_BHIBMAC04046.pdf'
  },
  {
    title: 'Certificate of Completion',
    program: 'Generative AI & Agentic Systems Engineering',
    authority:
      'Awarded under the Lenovo LEAP NextGen Scholar Program, implemented by BharatCares in association with the All India Council for Technical Education (AICTE).',
    date: 'June — July 2026 (Issued 24 July 2026)',
    certificateId: '6302092',
    pdfUrl: '/certificates/Lenovo_LEAP_Certificate_6302092.pdf'
  }
];
