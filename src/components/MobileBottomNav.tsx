import React, { useEffect, useState, useRef } from 'react';
import { Home, Briefcase, Code2, GraduationCap, User, Mail, ShieldCheck } from 'lucide-react';
import anime from 'animejs';

interface TabItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabItem[] = [
  { id: 'hero', label: 'Home', href: '#home', icon: Home },
  { id: 'about', label: 'About', href: '#about', icon: User },
  { id: 'work', label: 'Projects', href: '#work', icon: Briefcase },
  { id: 'experience', label: 'Internships', href: '#experience', icon: ShieldCheck },
  { id: 'skills', label: 'Skills', href: '#skills', icon: Code2 },
  { id: 'education', label: 'Education', href: '#education', icon: GraduationCap },
  { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
];

export function MobileBottomNav() {
  const [activeTab, setActiveTab] = useState('hero');
  const navRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);

  // Entrance animation with Anime.js on mount
  useEffect(() => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    if (navRef.current) {
      anime({
        targets: navRef.current,
        translateY: [56, 0],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutExpo',
      });
    }
  }, []);

  // 60fps requestAnimationFrame-throttled scroll listener to update active tab
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY + 200;
          for (const tab of [...TABS].reverse()) {
            const el = document.querySelector(tab.href);
            if (el) {
              const top = (el as HTMLElement).offsetTop;
              if (scrollPos >= top) {
                setActiveTab(tab.id);
                ticking = false;
                return;
              }
            }
          }
          setActiveTab('hero');
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (e: React.MouseEvent, tab: TabItem) => {
    e.preventDefault();
    setActiveTab(tab.id);

    // Animate clicked tab button with Anime.js
    const target = e.currentTarget;
    anime({
      targets: target,
      scale: [0.92, 1],
      duration: 200,
      easing: 'easeOutQuad',
    });

    if (tab.href === '#home' || tab.href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(tab.href);
      if (el) {
        const navHeight = 60;
        const top = (el as HTMLElement).offsetTop - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      ref={navRef}
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 w-full min-h-[56px] bg-[var(--bg-surface)]/95 backdrop-blur-md border-t border-[var(--border)] z-40 flex items-center justify-around px-1 pt-1 pb-[max(env(safe-area-inset-bottom,0px),6px)]"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={(e) => handleTabClick(e, tab)}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all duration-200 select-none cursor-pointer min-h-[44px] rounded-xl mx-0.5 ${
              isActive
                ? 'text-[var(--accent)] font-semibold bg-[var(--accent-soft)] shadow-inner'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-95'
            }`}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5" />
            <span className="text-[10px] font-inter font-medium leading-none truncate max-w-full px-0.5">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
