# Sarthak Mangesh Mandhare — Developer Portfolio

A responsive, high-performance developer portfolio built with modern web standards, adhering strictly to **HTML5, CSS3, JavaScript (ES Modules), JSON, and NPM**.

---

## 1. Overview & Architecture

This portfolio presents the software projects, academic credentials, and AICTE virtual internship certifications of Sarthak Mangesh Mandhare, a Computer Science student at Keraleeya Samajam's Model College (Autonomous), Mumbai.

The application architecture has been restructured from a heavyweight framework into a clean, modern web application that runs without frontend library overhead:
- **HTML5 (`index.html`)**: Defines the semantic page hierarchy, accessible modals, responsive grids, and embedded SVG iconography.
- **CSS3 (`src/index.css`)**: Provides design tokens, a 50:50 dual-primary color palette (Midnight Navy and Nitro Orange), high-translucency frosted glassmorphism, responsive tactile buttons, and keyframe animations.
- **JavaScript (`src/main.js`, `src/utils/`)**: Implements client-side features including theme toggling, scroll progress tracking, mouse parallax, project filtering, in-place technical details expansion, credential copying, and PDF preview modals using standard ES Modules.
- **JSON (`package.json`)**: Configures project metadata, scripts, and production dependencies.
- **NPM**: Manages dependencies and provides execution scripts via Vite.

---

## 2. Dependency Audit & `node_modules` Clean-Up

To ensure the repository remains minimal and compliant with the language constraints, all redundant and obsolete packages have been pruned from `node_modules` and `package.json`.

### A. Packages Retained (Required for Execution)

| Package Name | Purpose | Why It Is Essential |
| :--- | :--- | :--- |
| **`vite`** | Build tool and dev server | Serves the vanilla HTML, CSS, and JavaScript with instant Hot Module Replacement (HMR) and compiles optimized production assets. |
| **`@tailwindcss/vite`** | Tailwind CSS v4 Vite plugin | Automatically scans `index.html` and `src/main.js` to compile used utility classes into lightweight CSS. |
| **`tailwindcss`** | Core styling engine | Powers the utility class compilation for layout, responsive spacing, and theme variants. |
| **`animejs`** | JavaScript animation library | Drives micro-interactions including the 360° theme toggle spin, staggered navigation reveals, and spring-like modal popups. |

### B. Packages Removed (Useless for Vanilla Stack)

| Removed Package | Reason for Removal |
| :--- | :--- |
| **`react`** & **`react-dom`** | Replaced entirely with native semantic HTML5 elements and vanilla JavaScript DOM APIs. |
| **`scheduler`** | Internal React scheduling dependency that is no longer needed. |
| **`@vitejs/plugin-react`** | React JSX transform plugin that is obsolete for pure HTML and JavaScript. |
| **`typescript`** & **`tslib`** | The project exclusively uses standard JavaScript (`.js`), eliminating the need for a TypeScript compiler. |
| **`@types/*`** (`@types/react`, `@types/node`, etc.) | TypeScript declaration packages that are unnecessary in a pure JavaScript environment. |
| **`lucide-react`** | Replaced with lightweight, native inline SVGs embedded directly in the HTML, reducing bundle size. |
| **`autoprefixer`** | Tailwind CSS v4 includes native Lightning CSS bundling, making standalone Autoprefixer redundant. |

---

## 3. Project Directory Structure

```text
sarthak-mandhare---developer-portfolio/
├── index.html                  # Main semantic HTML document with complete markup and modals
├── package.json                # Project manifest and NPM execution scripts
├── vite.config.js              # Vite configuration with Tailwind CSS v4 plugin
├── README.md                   # Documentation and architectural guide
├── public/                     # Static assets served at root
│   ├── Sarthak_Mandhare_Resume.pdf
│   ├── certificates/           # Verified AICTE internship certificate PDFs
│   │   ├── IBM_SkillsBuild_Certificate_BHIBMAC04046.pdf
│   │   └── Lenovo_LEAP_Certificate_6302092.pdf
│   └── images/                 # Portrait photograph and project showcase screenshots
│       ├── sarthak.jpg
│       └── projects/
├── src/
│   ├── index.css               # Core stylesheet with tokens, glassmorphism, and animations
│   ├── main.js                 # Primary controller managing state, events, and UI interactions
│   └── utils/
│       ├── download.js         # Resilient in-memory Blob file download utility
│       └── scrollAnimations.js # IntersectionObserver scroll reveal controller
```

---

## 4. Codebase Organization & Commenting Standards

Every source code file includes structured comments explaining the role and operation of each chunk:

- **`index.html`**:
  - *Head & Metadata*: Pre-connects Google Fonts and configures early theme initialization to prevent flash-of-white.
  - *Preloader*: Critical CSS and lightweight script for immediate visual feedback on slow connections.
  - *Viewport Progress*: Top gradient progress indicator linked to window scroll position.
  - *Ambient Mesh*: 6 fixed radial blur orbs generating atmospheric depth behind cards.
  - *Fixed Navbar*: Responsive header with monogram logo, navigation links, theme toggle, and resume trigger.
  - *Hero Section*: Professional introduction, location, bio statement, CTA button, and macOS-framed portrait with parallax.
  - *About Section*: Background narrative, spoken languages, academic metrics (CGPA 6.95), and 3 focus areas.
  - *Projects Section*: Category segmented control (`All`, `Academic`, `Internship`), 4 project cards with browser chrome, metrics, tech tags, and expandable architectural breakdowns.
  - *Skills Section*: 8 categorized skill cards arranged in a 50:50 dual-primary checkerboard.
  - *Education Section*: Higher education degree overview and 2 AICTE virtual internship credential cards with copyable IDs.
  - *Contact Section*: Direct email card, phone/WhatsApp card, and curriculum vitae banner.
  - *Modals*: Dedicated dialogs for embedded certificate previews and resume review with print and Blob download capabilities.

- **`src/main.js`**:
  - *Theme Controller*: Manages dark/light modes, synchronizes with system preferences, and saves settings to `localStorage`.
  - *Modals Controller*: Manages opening, closing, keyboard navigation (ESC key), and backdrop dismissals.
  - *Clipboard Utilities*: Implements clipboard copying for credential IDs, email, and phone with a 2-second visual checkmark confirmation.
  - *Project Details*: Toggles in-place technical implementation highlights and recalculates card viewport positioning.
  - *Parallax Animation*: Executes a 60fps `requestAnimationFrame` loop that smoothly blends harmonic camera float with desktop cursor movement.
  - *Scroll Progress & Nav*: Updates the top indicator bar and highlights the active navbar item based on section offsets.

- **`src/utils/download.js`**:
  - Implements an asynchronous Blob-based download mechanism that bypasses browser iframe sandbox restrictions on standard download attributes.

- **`src/utils/scrollAnimations.js`**:
  - Utilizes `IntersectionObserver` to progressively reveal elements as they enter the viewport, unobserving revealed elements to conserve device memory.

---

## 5. Local Setup & Execution (NPM Only)

### Prerequisites
- Node.js (v18 or higher recommended)
- NPM (bundled with Node.js)

### Step 1: Install Dependencies
Open your command prompt or terminal in this directory and run:
```bash
npm install
```

### Step 2: Start Local Development Server
```bash
npm run dev
```
*(Alternatively, run `npm start`)*

### Step 3: Open in Browser
Open your browser and navigate to:
```
http://localhost:3000
```

### Step 4: Build for Production
To bundle and optimize the project for deployment:
```bash
npm run build
```
Production-ready files will be generated in the `dist/` directory.

### Step 5: Preview Production Build
```bash
npm run preview
```
