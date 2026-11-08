/**
 * @file main.js
 * @description Main Application Controller for Sarthak Mandhare's Portfolio
 * 
 * ARCHITECTURE OVERVIEW:
 * This script orchestrates all client-side interactions, animations, and state
 * management using pure modern JavaScript (ES Modules). No heavyweight frontend
 * framework is required.
 * 
 * CORE MODULES & RESPONSIBILITIES:
 * 1. CSS Imports: Imports the foundational stylesheet (index.css) for Vite bundling.
 * 2. Theme Controller: Manages Dark/Light mode, OS preference sync, and localStorage persistence.
 * 3. Resume Modal: Controls PDF preview dialog, in-memory Blob downloading, and printing.
 * 4. Certificate Modal: Manages interactive previews of AICTE verified internship credentials.
 * 5. Clipboard Utilities: One-click copying with animated checkmark feedback.
 * 6. Projects Controller: Handles category segmentation (All/Academic/Internship) and expandable in-place details.
 * 7. Hero Parallax: Runs a 60fps requestAnimationFrame loop combining gentle ambient float with subtle cursor parallax.
 * 8. Scroll Tracker: Drives the top gradient progress bar, navbar backdrop crossfade, and active link highlights.
 * 9. Smooth Scrolling: Computes precise document offsets for anchor links accounting for the fixed navbar.
 * 10. Micro-Animations: Uses Anime.js for spring-like entrance choreography, theme toggle 360-spin, and modal popups.
 * 11. Application Lifecycle: Coordinates initialization routines on DOM ready and dismisses the network preloader.
 */

// ─────────────────────────────────────────────────────────────────────────────
// CHUNK 1: IMPORTS & DEPENDENCIES
// ─────────────────────────────────────────────────────────────────────────────
import './index.css';
import anime from 'animejs';
import { downloadBlobFile } from './utils/download.js';
import { initScrollAnimations } from './utils/scrollAnimations.js';

// ─────────────────────────────────────────────────────────────────────────────
// CHUNK 2: THEME MANAGEMENT (Dark / Light Mode & LocalStorage Persistence)
// ─────────────────────────────────────────────────────────────────────────────
const THEME_STORAGE_KEY = 'portfolio-theme';

/**
 * Retrieves the user's preferred theme from localStorage or falls back to system preferences.
 * @returns {'dark'|'light'}
 */
function getStoredTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    // Inspect operating system color preference when no explicit setting is saved
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  } catch (e) {
    return 'dark';
  }
}

/**
 * Applies the selected theme to the root document element and updates toggle button iconography.
 * @param {'dark'|'light'} theme - Target theme name.
 * @param {boolean} animate - Whether to trigger the Anime.js 360-degree rotation animation.
 */
function applyTheme(theme, animate = false) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  // Toggle visible icon between Sun (for switching to light) and Moon (for switching to dark)
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIconWrap = document.getElementById('theme-icon-wrap');

  if (sunIcon && moonIcon) {
    if (theme === 'dark') {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    } else {
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }

  // Smooth tactile icon spring rotation when the user clicks the theme toggle button
  if (animate && themeIconWrap) {
    anime({
      targets: themeIconWrap,
      rotate: [0, 360],
      scale: [0.75, 1],
      duration: 350,
      easing: 'easeOutBack',
    });
  }
}

/**
 * Toggles between dark and light themes with tactile rotation feedback.
 */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next, true);
}

// ─────────────────────────────────────────────────────────────────────────────
// CHUNK 3: RESUME MODAL CONTROLLER (PDF Preview, Blob Downloading, Printing)
// ─────────────────────────────────────────────────────────────────────────────
const resumeModal = document.getElementById('resume-modal');
const resumeBackdrop = document.getElementById('resume-backdrop');
const resumeDialog = document.getElementById('resume-dialog');
const resumeDownloadBtn = document.getElementById('resume-download-btn');
const resumePrintBtn = document.getElementById('resume-print-btn');
let isResumeOpen = false;
let resumeDownloadState = 'idle'; // State machine: 'idle' | 'downloading' | 'success'

/**
 * Opens the interactive resume modal with backdrop blur and spring scale-up animation.
 */
export function openResumeModal() {
  if (!resumeModal || isResumeOpen) return;
  isResumeOpen = true;
  resumeModal.classList.remove('hidden');

  // Fade in the frosted backdrop
  anime({
    targets: resumeBackdrop,
    opacity: [0, 1],
    duration: 350,
    easing: 'cubicBezier(0.16, 1, 0.3, 1)',
  });

  // Scale and translate the modal card upward
  anime({
    targets: resumeDialog,
    opacity: [0, 1],
    scale: [0.96, 1],
    translateY: [16, 0],
    duration: 400,
    easing: 'cubicBezier(0.16, 1, 0.3, 1)',
  });

  document.body.style.overflow = 'hidden';
}

/**
 * Closes the resume modal with a smooth scale-down and opacity transition.
 */
export function closeResumeModal() {
  if (!resumeModal || !isResumeOpen) return;

  anime({
    targets: resumeBackdrop,
    opacity: [1, 0],
    duration: 220,
    easing: 'easeInQuad',
  });

  anime({
    targets: resumeDialog,
    opacity: [1, 0],
    scale: [1, 0.96],
    translateY: [0, 12],
    duration: 220,
    easing: 'easeInQuad',
    complete: () => {
      resumeModal.classList.add('hidden');
      isResumeOpen = false;
      document.body.style.overflow = '';
    },
  });
}

/**
 * Handles resilient resume downloading with intermediate spinner and success checkmark states.
 */
async function handleResumeDownload() {
  if (resumeDownloadState === 'downloading') return;
  const idleContent = document.getElementById('resume-dl-idle');
  const loadingContent = document.getElementById('resume-dl-loading');
  const successContent = document.getElementById('resume-dl-success');

  try {
    resumeDownloadState = 'downloading';
    if (idleContent) idleContent.classList.add('hidden');
    if (loadingContent) loadingContent.classList.remove('hidden');
    if (successContent) successContent.classList.add('hidden');

    // Use our resilient Blob downloader to bypass iframe sandbox download blocking
    await downloadBlobFile('/Sarthak_Mandhare_Resume.pdf', 'Sarthak_Mangesh_Mandhare_Resume.pdf');

    resumeDownloadState = 'success';
    if (loadingContent) loadingContent.classList.add('hidden');
    if (successContent) successContent.classList.remove('hidden');

    // Automatically revert the button back to the idle download state after 3 seconds
    setTimeout(() => {
      resumeDownloadState = 'idle';
      if (successContent) successContent.classList.add('hidden');
      if (idleContent) idleContent.classList.remove('hidden');
    }, 3000);
  } catch (err) {
    resumeDownloadState = 'idle';
    if (loadingContent) loadingContent.classList.add('hidden');
    if (idleContent) idleContent.classList.remove('hidden');
  }
}

/**
 * Opens the raw PDF document in an isolated window and focuses it for quick system printing.
 */
function handleResumePrint() {
  const printWindow = window.open('/Sarthak_Mandhare_Resume.pdf', '_blank');
  if (printWindow) {
    printWindow.focus();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CHUNK 4: CERTIFICATE MODAL CONTROLLER (IBM SkillsBuild & Lenovo LEAP Previews)
// ─────────────────────────────────────────────────────────────────────────────
const certModal = document.getElementById('certificate-modal');
const certModalBackdrop = document.getElementById('cert-modal-backdrop');
const certModalDialog = document.getElementById('cert-modal-dialog');
const certModalPlatform = document.getElementById('cert-modal-platform');
const certModalId = document.getElementById('cert-modal-id');
const certModalTitle = document.getElementById('cert-modal-title');
const certModalObject = document.getElementById('cert-modal-object');
const certModalFallbackLink = document.getElementById('cert-modal-fallback-link');
const certModalTabLink = document.getElementById('cert-modal-tab-link');
let isCertModalOpen = false;

// Structured data for verified internship certificate credentials
const CERTIFICATES_DATA = {
  ibm: {
    id: 'ibm',
    title: 'AI Automation & Intelligent Solutions — IBM SkillsBuild, AICTE',
    platform: 'IBM SkillsBuild Virtual Internship',
    certificateId: 'BHIBMAC04046',
    pdfUrl: '/certificates/IBM_SkillsBuild_Certificate_BHIBMAC04046.pdf',
  },
  lenovo: {
    id: 'lenovo',
    title: 'Generative AI & Agentic Systems Engineering — Lenovo LEAP NextGen Scholar Program, AICTE',
    platform: 'Lenovo LEAP Virtual Internship',
    certificateId: '6302092',
    pdfUrl: '/certificates/Lenovo_LEAP_Certificate_6302092.pdf',
  },
};

/**
 * Opens the certificate preview dialog and populates it with verified credential metadata.
 * @param {'ibm'|'lenovo'} certKey - Identifier of the certificate to display.
 */
export function openCertModal(certKey) {
  const cert = CERTIFICATES_DATA[certKey];
  if (!cert || !certModal) return;

  if (certModalPlatform) certModalPlatform.textContent = cert.platform;
  if (certModalId) certModalId.textContent = cert.certificateId;
  if (certModalTitle) certModalTitle.textContent = cert.title;
  if (certModalObject) certModalObject.setAttribute('data', `${cert.pdfUrl}#toolbar=0`);
  if (certModalFallbackLink) certModalFallbackLink.setAttribute('href', cert.pdfUrl);
  if (certModalTabLink) certModalTabLink.setAttribute('href', cert.pdfUrl);

  isCertModalOpen = true;
  certModal.classList.remove('hidden');

  anime({
    targets: certModalBackdrop,
    opacity: [0, 1],
    duration: 250,
    easing: 'easeOutQuad',
  });

  anime({
    targets: certModalDialog,
    opacity: [0, 1],
    scale: [0.95, 1],
    translateY: [12, 0],
    duration: 300,
    easing: 'easeOutCubic',
  });

  document.body.style.overflow = 'hidden';
}

/**
 * Closes the certificate preview modal and restores body scroll behavior.
 */
export function closeCertModal() {
  if (!certModal || !isCertModalOpen) return;

  anime({
    targets: certModalBackdrop,
    opacity: [1, 0],
    duration: 200,
    easing: 'easeInQuad',
  });

  anime({
    targets: certModalDialog,
    opacity: [1, 0],
    scale: [1, 0.95],
    duration: 200,
    easing: 'easeInQuad',
    complete: () => {
      certModal.classList.add('hidden');
      isCertModalOpen = false;
      document.body.style.overflow = '';
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CHUNK 5: CLIPBOARD UTILITY WITH TIMED FEEDBACK
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Copies the given text to clipboard and temporarily swaps icons to display a checkmark.
 * @param {string} text - String content to copy.
 * @param {HTMLElement|null} copyIconEl - The default copy icon element to hide.
 * @param {HTMLElement|null} checkIconEl - The green checkmark icon element to reveal.
 * @param {HTMLElement|null} labelEl - Optional text label to update to 'Copied!'.
 * @param {string} feedbackText - Temporary label text shown on success.
 */
function copyTextWithFeedback(text, copyIconEl, checkIconEl, labelEl = null, feedbackText = 'Copied!') {
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(text).then(() => {
    if (copyIconEl) copyIconEl.classList.add('hidden');
    if (checkIconEl) checkIconEl.classList.remove('hidden');
    let originalText = '';
    if (labelEl) {
      originalText = labelEl.textContent;
      labelEl.textContent = feedbackText;
    }

    // Restore default iconography and label after a 2-second acknowledgment window
    setTimeout(() => {
      if (checkIconEl) checkIconEl.classList.add('hidden');
      if (copyIconEl) copyIconEl.classList.remove('hidden');
      if (labelEl) labelEl.textContent = originalText;
    }, 2000);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CHUNK 6: PROJECT DETAILS TOGGLING & CATEGORY FILTERING
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Toggles the in-place expandable architecture highlights of a project card.
 * @param {string} projectId - Unique project slug ('lifelink', 'luminahub', 'knowthyself', 'heatsafe').
 */
function toggleProjectDetails(projectId) {
  const detailsEl = document.getElementById(`project-${projectId}-details`);
  const btn = document.querySelector(`[data-project-toggle="${projectId}"]`);
  if (!detailsEl) return;

  const isHidden = detailsEl.classList.contains('hidden');
  const chevronDown = btn ? btn.querySelector('.chevron-down-icon') : null;
  const chevronUp = btn ? btn.querySelector('.chevron-up-icon') : null;
  const label = btn ? btn.querySelector('.toggle-label') : null;

  if (isHidden) {
    detailsEl.classList.remove('hidden');
    if (chevronDown) chevronDown.classList.add('hidden');
    if (chevronUp) chevronUp.classList.remove('hidden');
    if (label) label.textContent = 'Hide Details';

    const card = document.getElementById(`project-${projectId}`);
    if (card) {
      card.classList.add('ring-2', 'ring-[var(--primary-2)]/50', 'shadow-xl');
      // Smoothly scroll the card into a comfortable reading position if it is out of frame
      setTimeout(() => {
        const rect = card.getBoundingClientRect();
        if (rect.top < 70 || rect.top > window.innerHeight - 250) {
          const navHeight = 68;
          const offsetPosition = rect.top + window.pageYOffset - navHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 60);
    }
  } else {
    detailsEl.classList.add('hidden');
    if (chevronUp) chevronUp.classList.add('hidden');
    if (chevronDown) chevronDown.classList.remove('hidden');
    if (label) label.textContent = 'Details';

    const card = document.getElementById(`project-${projectId}`);
    if (card) {
      card.classList.remove('ring-2', 'ring-[var(--primary-2)]/50', 'shadow-xl');
    }
  }
}

/**
 * Filters the project showcase cards based on segmented control selection.
 * @param {'all'|'academic'|'internship'} filterCategory - Selected filter category.
 */
function filterProjects(filterCategory) {
  const buttons = document.querySelectorAll('[data-filter-btn]');
  buttons.forEach((btn) => {
    const isSelected = btn.getAttribute('data-filter-btn') === filterCategory;
    if (isSelected) {
      btn.className = 'px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap tactile-chip-p2 text-[var(--primary-2)] font-semibold';
    } else {
      btn.className = 'px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]/40';
    }
  });

  const cards = document.querySelectorAll('.project-showcase-card');
  cards.forEach((card) => {
    const cat = card.getAttribute('data-project-category');
    let show = true;
    if (filterCategory === 'academic') {
      show = cat === 'academic';
    } else if (filterCategory === 'internship') {
      show = cat === 'internship';
    }

    if (show) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
      // Collapse expanded details when hiding a project card
      const projId = card.id.replace('project-', '');
      const detailsEl = document.getElementById(`project-${projId}-details`);
      if (detailsEl && !detailsEl.classList.contains('hidden')) {
        toggleProjectDetails(projId);
      }
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CHUNK 7: HERO PORTRAIT PARALLAX (Subtle Ambient Camera Float & Cursor Parallax)
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Drives a continuous 60fps requestAnimationFrame loop on the portrait image.
 * Combines gentle harmonic floating with cursor tracking on desktop screens.
 */
function initHeroParallax() {
  const photoEl = document.getElementById('hero-portrait-img');
  if (!photoEl) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  const startTime = performance.now();

  const handleMouseMove = (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  };

  const handleMouseLeave = () => {
    mouseX = 0;
    mouseY = 0;
  };

  const renderLoop = (now) => {
    const elapsed = (now - startTime) / 1000;
    // Harmonic sinusoidal ambient float
    const ambientFloatX = Math.sin(elapsed * 0.3) * 2.5;
    const ambientFloatY = Math.cos(elapsed * 0.25) * 3;
    const ambientZoom = 1.02 + Math.sin(elapsed * 0.2) * 0.01;

    // Apply cursor parallax on desktop viewports (>= 1024px)
    const isDesktop = window.innerWidth >= 1024;
    const targetMouseX = isDesktop ? mouseX * 8 : 0;
    const targetMouseY = isDesktop ? mouseY * 6 : 0;

    // Exponential smoothing (lerp) for buttery 60fps motion
    currentX += (targetMouseX - currentX) * 0.05;
    currentY += (targetMouseY - currentY) * 0.05;

    const totalX = currentX + ambientFloatX;
    const totalY = currentY + ambientFloatY;

    photoEl.style.transform = `translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0) scale(${ambientZoom.toFixed(3)})`;
    requestAnimationFrame(renderLoop);
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('mouseleave', handleMouseLeave);
  requestAnimationFrame(renderLoop);
}

// ─────────────────────────────────────────────────────────────────────────────
// CHUNK 8: SCROLL TRACKER & ACTIVE NAVIGATION HIGHLIGHTS
// ─────────────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: '#about', id: 'about' },
  { href: '#work', id: 'work' },
  { href: '#skills', id: 'skills' },
  { href: '#education', id: 'education' },
  { href: '#contact', id: 'contact' },
];

/**
 * Monitors viewport scroll progression, updates the top progress bar,
 * crossfades the navbar background, and detects active sections.
 */
function initScrollTracker() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const navBg = document.getElementById('nav-bg-layer');
  const desktopNavLinks = document.querySelectorAll('[data-nav-link]');
  const mobileNavTabs = document.querySelectorAll('[data-mobile-tab]');

  let ticking = false;
  let prevScrolled = false;

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

        // 1. Update top viewport scroll progress bar (0% to 100%)
        if (progressBar && totalHeight > 0) {
          const progress = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
          progressBar.style.width = `${progress}%`;
        }

        // 2. Crossfade navbar frosted glass background when scrolled past 30px
        const isScrolled = scrollY > 30;
        if (isScrolled !== prevScrolled && navBg) {
          prevScrolled = isScrolled;
          anime.remove(navBg);
          anime({
            targets: navBg,
            opacity: isScrolled ? [0, 1] : [1, 0],
            duration: 250,
            easing: 'easeOutQuad',
          });
        }

        // 3. Detect current section in viewport and update desktop nav active chip
        const scrollPos = scrollY + 120;
        let activeSectionHref = '#about';

        for (const link of [...NAV_LINKS].reverse()) {
          const el = document.querySelector(link.href);
          if (el) {
            const top = el.offsetTop;
            if (scrollPos >= top) {
              activeSectionHref = link.href;
              break;
            }
          }
        }

        desktopNavLinks.forEach((linkEl) => {
          const href = linkEl.getAttribute('href');
          if (href === activeSectionHref) {
            linkEl.className = 'nav-anim-item px-3 py-1 rounded-lg transition-all duration-200 text-[var(--accent)] font-semibold tactile-chip';
          } else {
            linkEl.className = 'nav-anim-item px-3 py-1 rounded-lg transition-all duration-200 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]/40 font-medium';
          }
        });

        // 4. Update mobile bottom tab bar active item
        const mobileScrollPos = scrollY + 200;
        let mobileActiveId = 'hero';
        const mobileTabs = [
          { href: '#home', id: 'hero' },
          { href: '#about', id: 'about' },
          { href: '#work', id: 'work' },
          { href: '#skills', id: 'skills' },
          { href: '#education', id: 'education' },
          { href: '#contact', id: 'contact' },
        ];

        for (const tab of [...mobileTabs].reverse()) {
          const el = document.querySelector(tab.href);
          if (el && mobileScrollPos >= el.offsetTop) {
            mobileActiveId = tab.id;
            break;
          }
        }

        mobileNavTabs.forEach((tabEl) => {
          const tabId = tabEl.getAttribute('data-mobile-tab');
          if (tabId === mobileActiveId) {
            tabEl.className = 'flex flex-col items-center justify-center flex-1 py-1.5 transition-all duration-200 select-none cursor-pointer min-h-[44px] rounded-xl mx-0.5 text-[var(--accent)] font-semibold tactile-chip';
          } else {
            tabEl.className = 'flex flex-col items-center justify-center flex-1 py-1.5 transition-all duration-200 select-none cursor-pointer min-h-[44px] rounded-xl mx-0.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-95';
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ─────────────────────────────────────────────────────────────────────────────
// CHUNK 9: SMOOTH SCROLLING FOR INTERNAL ANCHORS
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Intercepts internal anchor clicks to provide smooth scrolling with fixed navbar compensation.
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = 60;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CHUNK 10: ENTRANCE CHOREOGRAPHY (Anime.js Staggered Reveals)
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Staggers the initial entrance of navigation elements and mobile bottom tabs.
 */
function runEntranceAnimations() {
  anime({
    targets: '.nav-anim-item',
    opacity: [0, 1],
    translateY: [-6, 0],
    duration: 420,
    delay: anime.stagger(45),
    easing: 'easeOutCubic',
  });

  const mobileNav = document.getElementById('mobile-bottom-nav');
  if (mobileNav) {
    anime({
      targets: mobileNav,
      translateY: [56, 0],
      opacity: [0, 1],
      duration: 400,
      easing: 'easeOutExpo',
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CHUNK 11: EVENT DELEGATION & LISTENER WIRING
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Binds all interactive click events, modals, clipboard actions, and key listeners.
 */
function initEventListeners() {
  // Theme toggle button
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Resume modal triggers across Navbar, Hero, Contact, and Footer
  document.querySelectorAll('[data-open-resume]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  // Resume modal close triggers
  document.querySelectorAll('[data-close-resume]').forEach((btn) => {
    btn.addEventListener('click', closeResumeModal);
  });
  if (resumeBackdrop) {
    resumeBackdrop.addEventListener('click', closeResumeModal);
  }
  if (resumeDownloadBtn) {
    resumeDownloadBtn.addEventListener('click', handleResumeDownload);
  }
  if (resumePrintBtn) {
    resumePrintBtn.addEventListener('click', handleResumePrint);
  }

  // Contact section direct resume download
  const contactDownloadBtn = document.getElementById('contact-download-resume-btn');
  if (contactDownloadBtn) {
    contactDownloadBtn.addEventListener('click', () => {
      downloadBlobFile('/Sarthak_Mandhare_Resume.pdf', 'Sarthak_Mandhare_Resume.pdf');
    });
  }

  // Certificate preview modal triggers
  document.querySelectorAll('[data-open-cert]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certKey = btn.getAttribute('data-open-cert');
      openCertModal(certKey);
    });
  });

  // Certificate modal close triggers
  document.querySelectorAll('[data-close-cert]').forEach((btn) => {
    btn.addEventListener('click', closeCertModal);
  });
  if (certModalBackdrop) {
    certModalBackdrop.addEventListener('click', closeCertModal);
  }

  // Copy buttons
  // 1. IBM Certificate Credential ID
  const copyIbmCertBtn = document.getElementById('copy-ibm-cert-btn');
  if (copyIbmCertBtn) {
    copyIbmCertBtn.addEventListener('click', () => {
      copyTextWithFeedback(
        'BHIBMAC04046',
        document.getElementById('copy-ibm-icon'),
        document.getElementById('check-ibm-icon')
      );
    });
  }

  // 2. Lenovo LEAP Credential ID
  const copyLenovoCertBtn = document.getElementById('copy-lenovo-cert-btn');
  if (copyLenovoCertBtn) {
    copyLenovoCertBtn.addEventListener('click', () => {
      copyTextWithFeedback(
        '6302092',
        document.getElementById('copy-lenovo-icon'),
        document.getElementById('check-lenovo-icon')
      );
    });
  }

  // 3. Contact Email Copy
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      copyTextWithFeedback(
        'sarthakmandhare34@gmail.com',
        document.getElementById('copy-email-icon'),
        document.getElementById('check-email-icon'),
        document.getElementById('copy-email-label'),
        'Copied!'
      );
    });
  }

  // 4. Contact Phone Copy
  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      copyTextWithFeedback(
        '+919326397599',
        document.getElementById('copy-phone-icon'),
        document.getElementById('check-phone-icon'),
        document.getElementById('copy-phone-label'),
        'Copied!'
      );
    });
  }

  // Project category filters
  document.querySelectorAll('[data-filter-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-filter-btn');
      filterProjects(cat);
    });
  });

  // Project details toggles
  document.querySelectorAll('[data-project-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project-toggle');
      toggleProjectDetails(projectId);
    });
  });

  // Project preview frame clicks toggle details too
  document.querySelectorAll('[data-project-frame-toggle]').forEach((frame) => {
    frame.addEventListener('click', () => {
      const projectId = frame.getAttribute('data-project-frame-toggle');
      toggleProjectDetails(projectId);
    });
  });

  // Global ESC key listener for dismissing active modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (isResumeOpen) closeResumeModal();
      if (isCertModalOpen) closeCertModal();
    }
  });

  // Mobile Bottom Nav tactile spring scale on tap
  document.querySelectorAll('[data-mobile-tab]').forEach((tabBtn) => {
    tabBtn.addEventListener('click', () => {
      anime({
        targets: tabBtn,
        scale: [0.92, 1],
        duration: 200,
        easing: 'easeOutQuad',
      });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CHUNK 12: APPLICATION INITIALIZATION ON DOM READY
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Bootstraps all portfolio features and gracefully dismisses the preloader.
 */
function initApp() {
  applyTheme(getStoredTheme(), false);
  initScrollAnimations();
  initHeroParallax();
  initScrollTracker();
  initSmoothScroll();
  initEventListeners();
  runEntranceAnimations();

  // Dismiss network preloader overlay once JS execution is complete
  if (typeof window !== 'undefined' && window.__dismissPreloader) {
    window.__dismissPreloader();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
