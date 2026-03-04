"use client";

import { useEffect, useRef, useState } from "react";

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          ob.disconnect();
        }
      },
      { threshold }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function useTextScramble(text: string, trigger: boolean, duration = 1200) {
  const [display, setDisplay] = useState(text);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?0123456789";

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = duration / 16;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const decoded = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (progress * text.length > i) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      setDisplay(decoded);
      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, 16);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, text, duration]);

  return display;
}
