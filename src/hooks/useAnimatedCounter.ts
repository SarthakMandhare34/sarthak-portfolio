import { useState, useEffect, useRef } from 'react';

interface UseAnimatedCounterOptions {
  target: number;
  duration?: number;
  isFloat?: boolean;
  decimals?: number;
  isActive?: boolean;
}

export function useAnimatedCounter({
  target,
  duration = 1000,
  isFloat = false,
  decimals = 2,
  isActive = true
}: UseAnimatedCounterOptions) {
  const [count, setCount] = useState<string>(isFloat ? '0.00' : '0');
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isActive) {
      setCount(isFloat ? '0.00' : '0');
      return;
    }

    if (prefersReducedMotion) {
      setCount(isFloat ? target.toFixed(decimals) : Math.round(target).toString());
      return;
    }

    let startTime: number | null = null;

    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    function frame(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easeVal = easeOutCubic(progress);
      const current = easeVal * target;

      setCount(isFloat ? current.toFixed(decimals) : Math.round(current).toString());

      if (progress < 1) {
        animRef.current = window.requestAnimationFrame(frame);
      } else {
        setCount(isFloat ? target.toFixed(decimals) : Math.round(target).toString());
        animRef.current = null;
      }
    }

    animRef.current = window.requestAnimationFrame(frame);

    return () => {
      if (animRef.current) {
        window.cancelAnimationFrame(animRef.current);
      }
    };
  }, [target, duration, isFloat, decimals, isActive]);

  return count;
}
