import { useEffect } from 'react';

/**
 * High-performance, continuous scroll animation observer.
 * Automatically watches elements with the `scroll-reveal` class and toggles
 * the `is-in-view` class repeatedly as elements enter and leave the viewport
 * while scrolling up and down.
 */
export function useScrollAnimations() {
  useEffect(() => {
    // Respect user's reduced motion preferences
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.scroll-reveal').forEach((el) => {
        el.classList.add('is-in-view');
      });
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;

        if (entry.isIntersecting) {
          target.classList.add('is-in-view');
          target.classList.remove('is-out-view');
        } else {
          // Element has scrolled out of view (either above or below)
          target.classList.remove('is-in-view');
          target.classList.add('is-out-view');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px',
    });

    const registerElements = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((el) => observer.observe(el));
    };

    registerElements();

    // Re-observe if DOM changes (e.g., project filters or expansion)
    const mutationObserver = new MutationObserver(() => {
      registerElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

