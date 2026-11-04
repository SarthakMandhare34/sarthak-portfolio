import { useEffect } from 'react';

/**
 * High-performance, continuous scroll animation observer.
 * Automatically watches elements with the `scroll-reveal` class and toggles
 * the `is-in-view` class repeatedly as elements enter and leave the viewport
 * while scrolling up and down, on desktop and mobile alike.
 */
export function useScrollAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect user's reduced motion preferences
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

    // Mobile-optimized threshold and rootMargin so tall mobile cards trigger instantly
    const isMobile = window.innerWidth <= 768;
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: isMobile ? 0.01 : 0.04,
      rootMargin: isMobile ? '15px 0px 15px 0px' : '0px 0px -25px 0px',
    });

    const registerElements = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((el) => observer.observe(el));
    };

    // Immediate registration
    registerElements();

    // Trigger bidirectional check for elements entering or leaving viewport repeatedly
    const checkViewportElements = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const buffer = isMobile ? 25 : 10;
      document.querySelectorAll('.scroll-reveal').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh + buffer && rect.bottom > -buffer) {
          el.classList.add('is-in-view');
          el.classList.remove('is-out-view');
        } else {
          el.classList.remove('is-in-view');
          el.classList.add('is-out-view');
        }
      });
    };

    checkViewportElements();
    const timer = setTimeout(checkViewportElements, 100);

    // Re-observe if DOM changes (e.g., project filters or expansion)
    const mutationObserver = new MutationObserver(() => {
      registerElements();
      checkViewportElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Touch/scroll passive fallback for mobile momentum scrolling
    let ticking = false;
    const onScrollOrTouch = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkViewportElements();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScrollOrTouch, { passive: true });
    window.addEventListener('touchmove', onScrollOrTouch, { passive: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', onScrollOrTouch);
      window.removeEventListener('touchmove', onScrollOrTouch);
    };
  }, []);
}
