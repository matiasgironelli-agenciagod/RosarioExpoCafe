import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal Component
 * Wraps content and animate-reveals it when it enters the viewport.
 * Supports configurable delay, duration and custom translate classes.
 */
export default function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 800,
  yOffset = 30
}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if browser supports IntersectionObserver
    if (!window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Animates once
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px', // Triggers slightly before element enters fully
      }
    );

    const current = elementRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`${className} transition-all ease-out`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : `translateY(${yOffset}px) scale(0.98)`,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
