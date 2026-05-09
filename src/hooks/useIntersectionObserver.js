// src/hooks/useIntersectionObserver.js
import { useEffect, useRef, useState } from 'react';

/**
 * Returns [ref, isVisible] — attach `ref` to any DOM element.
 * `isVisible` becomes true once the element enters the viewport.
 *
 * @param {IntersectionObserverInit} options
 * @param {boolean} once - If true, stops observing after first intersection
 */
export function useIntersectionObserver(
  options = { threshold: 0.15 },
  once = true
) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (once) observer.unobserve(el);
      } else if (!once) {
        setIsVisible(false);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, options]);

  return [ref, isVisible];
}
