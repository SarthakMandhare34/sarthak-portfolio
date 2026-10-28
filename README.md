# Sarthak Mandhare — Developer Portfolio (React 19 + TypeScript + Vite)

Modern, accessible, and high-performance developer portfolio built with **React 19**, **TypeScript**, and **Vite**.

## Dual Design Experience Modes

1. **Timeless Solid Mode**: A clean, timeless interface with a refined, solid visual style, anchored top navigation bar, crisp hairline borders, tactile cards, and editorial typography craftsmanship.
2. **Liquid Glass Mode**: A modern, immersive interface featuring realistic glassmorphism, multi-layered depth, physical refraction, specular edge glares, floating frosted capsule dock, and ambient drifting caustics.

## Curated Cohesive Color Themes

1. **Warm Terracotta & Sand**: Rich terracotta (`#B84E2A`), toasted amber (`#D97736`), earthy olive bronze (`#4A6D3B`), and warm linen canvas.
2. **Ocean Azure & Mineral**: Deep marine teal (`#186B80`), coastal mineral slate (`#2E5A88`), electric aqua ice (`#34A0B5`), and crisp ocean mist canvas.

Both themes support Day (Light) and Night (Dark) atmospheres, custom typography scaling (100%, 105%, 112%), and motion dynamics preference.

## Tech Stack & Architecture

- **Core Framework**: React 19 + TypeScript
- **Tooling & Bundler**: Vite 6 (`--host 0.0.0.0 --port 3000`)
- **Animation Engine**: Framer Motion 14 with reduced-motion support
- **State & Customization**:
  - `ThemeContext`: Synchronized management of Design Mode, Color Theme, Light/Dark appearance, Typography scale, and Motion preferences with localStorage persistence.
  - `useScrollSpy`: Real-time section tracking and smooth navigation offset calculation.
  - `useAnimatedCounter`: RequestAnimationFrame eased counters for project statistics and academic GPA.
  - `SettingsDrawer`: Comprehensive appearance panel with live wireframe previews of both design modes and color palette swatches.
  - `Navbar`: Responsive header with floating frosted dock for Liquid Glass mode and anchored solid bar for Timeless Solid mode, plus quick mode switcher and day/night slider.
  - `Experience`: Vertical timeline connected co-axially between internship nodes with no dangling overshoot.
  - `Contact`: High-contrast dual-channel communication hub (Email & Phone/WhatsApp) with one-click clipboard copying, direct mail/dial links, and embedded 2-page resume preview modal.
  - `ResumeModal` & `CertificateModal`: Accessible dialog modals for viewing and downloading verified PDF credentials.

## Project Structure

```text
├── public/
│   ├── certificates/
│   │   ├── IBM_SkillsBuild_Certificate_BHIBMAC04046.pdf
│   │   └── Lenovo_LEAP_Certificate_6302092.pdf
│   ├── Sarthak_Mandhare_Resume.pdf
│   └── resume.pdf
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── CertificateModal.tsx
│   │   ├── Contact.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Projects.tsx
│   │   ├── ResumeModal.tsx
│   │   ├── SettingsDrawer.tsx
│   │   ├── Skills.tsx
│   │   ├── ThemeSlider.tsx
│   │   └── Toast.tsx
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── data/
│   │   └── portfolioData.ts
│   ├── hooks/
│   │   ├── useAnimatedCounter.ts
│   │   └── useScrollSpy.ts
│   ├── types.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── style.css
├── tests/
│   └── portfolio-logic.test.mjs
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Available Commands

```bash
# 1. Install dependencies
npm install

# 2. Run automated logic tests
npm test

# 3. Start local development server (http://localhost:3000)
npm run dev

# 4. Build for production (TypeScript compile + Vite bundle)
npm run build

# 5. Preview the production build locally
npm run preview
```
