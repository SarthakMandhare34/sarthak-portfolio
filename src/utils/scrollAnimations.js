/**
 * @file scrollAnimations.js
 * @description High-Performance IntersectionObserver Scroll Reveal System
 * 
 * PURPOSE & ARCHITECTURE:
 * Creates smooth, progressive entrance animations for cards, headings, and sections
 * as the user scrolls down the page, while ensuring zero content disappearing.
 * 
 * KEY PERFORMANCE OPTIMIZATIONS:
 * 1. Reduced Motion Compliance: Respects users' prefers-reduced-motion OS preferences.
 * 2. Viewport First-Pass: Any element already visible in the initial viewport is revealed
 *    immediately to prevent any layout delay or pop-in effect.
 * 3. Self-Disposing Observations: Once an element intersects and animates in, it is
 *    permanently unobserved. This frees CPU and GPU cycles during subsequent scrolling.
 * 4. MutationObserver Support: Listens to DOM changes (such as expanding cards or
 *    toggling filter categories) and automatically re-measures newly rendered nodes.
 */

/**
 * Initializes the intersection observer for all elements marked with '.scroll-reveal'.
 * 
 * @returns {Function|undefined} Cleanup function to disconnect observers on teardown.
 */
export function initScrollAnimations() {
  if (typeof window === 'undefined') return;

  // ──────────────── CHUNK 1: REDUCED MOTION PREFERENCE CHECK ────────────────
  // If the user has requested reduced motion in their system settings, immediately
  // mark all reveal targets as in-view and skip scroll animation triggers.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      el.classList.add('is-in-view');
      el.classList.remove('scroll-pending');
    });
    return;
  }

  // ──────────────── CHUNK 2: INTERSECTION OBSERVER CALLBACK ────────────────
  // Triggered whenever an element crosses into the viewport detection threshold.
  const observerCallback = (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        // Remove pending state to release the CSS transform/opacity transition
        target.classList.remove('scroll-pending');
        target.classList.add('is-in-view');

        // Permanently unobserve revealed elements to eliminate overhead
        obs.unobserve(target);
      }
    });
  };

  // Mobile devices use a lower threshold (0.01) for earlier, smoother triggers
  const isMobile = window.innerWidth <= 768;
  const observer = new IntersectionObserver(observerCallback, {
    root: null,
    threshold: isMobile ? 0.01 : 0.05,
    rootMargin: '40px 0px 40px 0px',
  });

  // ──────────────── CHUNK 3: DUAL-PASS ELEMENT INITIALIZATION ────────────────
  // Distinguishes above-the-fold content (which renders immediately) from below-the-fold
  // elements (which receive '.scroll-pending' and wait for scroll intersection).
  const initElements = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const elements = document.querySelectorAll('.scroll-reveal');

    elements.forEach((el) => {
      // Skip elements that are already revealed
      if (el.classList.contains('is-in-view')) {
        return;
      }

      const rect = el.getBoundingClientRect();
      // Elements already above or within the initial viewport threshold show instantly
      if (rect.top <= vh + 50) {
        el.classList.remove('scroll-pending');
        el.classList.add('is-in-view');
      } else {
        // Elements below the fold enter the pending animation state and are observed
        el.classList.add('scroll-pending');
        observer.observe(el);
      }
    });
  };

  // Run immediate pass on load
  initElements();

  // Staggered follow-up passes to account for dynamic web-font loading and layout shifts
  setTimeout(initElements, 80);
  setTimeout(initElements, 350);

  // ──────────────── CHUNK 4: MUTATION OBSERVER FOR DYNAMIC DOM UPDATES ────────────────
  // Re-evaluates elements when DOM contents change (e.g. project category filtering).
  const mutationObserver = new MutationObserver(() => {
    initElements();
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Return cleanup teardown function
  return () => {
    observer.disconnect();
    mutationObserver.disconnect();
  };
}
