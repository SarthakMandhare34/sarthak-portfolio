import { useEffect } from 'react';

/**
 * High-performance, resilient scroll animation observer.
 * Safely marks elements below the fold for smooth progressive entrance reveals,
 * while ensuring all initial viewport elements and revealed elements remain
 * 100% visible and accessible without vanishing when scrolling.
 */
export function useScrollAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect user's reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.scroll-reveal').forEach((el) => {
        el.classList.add('is-in-view');
        el.classList.remove('scroll-pending');
      });
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.classList.remove('scroll-pending');
          target.classList.add('is-in-view');
          // Once revealed, keep it visible and unobserve to free up GPU and CPU cycles
          obs.unobserve(target);
        }
      });
    };

    const isMobile = window.innerWidth <= 768;
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: isMobile ? 0.01 : 0.05,
      rootMargin: '40px 0px 40px 0px',
    });

    const initElements = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const elements = document.querySelectorAll('.scroll-reveal');

      elements.forEach((el) => {
        // If already marked as in-view, nothing to do
        if (el.classList.contains('is-in-view')) {
          return;
        }

        const rect = el.getBoundingClientRect();
        // Elements currently inside or above the viewport should be visible immediately
        if (rect.top <= vh + 50) {
          el.classList.remove('scroll-pending');
          el.classList.add('is-in-view');
        } else {
          // Elements below the fold get the pending entrance class and are observed
          el.classList.add('scroll-pending');
          observer.observe(el);
        }
      });
    };

    // Immediate initial check
    initElements();

    // Secondary pass to ensure all dynamically measured layout elements are handled
    const timer1 = setTimeout(initElements, 80);
    const timer2 = setTimeout(initElements, 350);

    // Re-check if DOM changes (e.g., project filters or expanded cards)
    const mutationObserver = new MutationObserver(() => {
      initElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
