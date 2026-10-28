import { useState, useEffect } from 'react';

const SECTION_IDS = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 80);

      // Check bottom of page edge case for contact
      const isBottom =
        window.innerHeight + scrollPos >= document.documentElement.scrollHeight - 24;
      if (isBottom) {
        setActiveSection('contact');
        ticking = false;
        return;
      }

      // Detection offset
      const detectionOffset = scrollPos + 100;
      let current = 'hero';

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const id = SECTION_IDS[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + scrollPos;
          if (detectionOffset >= top - 20) {
            current = id;
            break;
          }
        }
      }

      setActiveSection(current);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 64;
      const targetScrollY = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: Math.max(0, targetScrollY),
        behavior: 'smooth'
      });
    }
  };

  return { activeSection, isScrolled, scrollTo };
}
