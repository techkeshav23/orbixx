"use client";

import { useState, useEffect } from "react";
import { WHATSAPP_URL } from "@/lib/constants";

export default function OfferBanner({ onClose }: { onClose: () => void }) {
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 0, s: 0 });

  useEffect(() => {
    const end = Date.now() + 2 * 60 * 60 * 1000;
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="sticky top-16 lg:top-20 z-[45] bg-gradient-to-r from-[#FF6B4A] via-[#EC4899] to-[#14B8A6] text-white overflow-hidden animate-[slideDown_0.4s_ease]">
      {/* Animated shimmer */}
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.15)_50%,transparent_75%)] animate-[shimmer_2.5s_infinite]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        <div className="flex items-center gap-3">
          <span className="text-xl">🔥</span>
          <span className="font-bold text-sm sm:text-base">
            FLAT 40% OFF — First 100 Women Only!
          </span>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-1.5 font-mono text-sm">
          <span className="bg-white/20 backdrop-blur-sm rounded-md px-2 py-1 font-bold">
            {pad(timeLeft.h)}
          </span>
          <span className="font-bold">:</span>
          <span className="bg-white/20 backdrop-blur-sm rounded-md px-2 py-1 font-bold">
            {pad(timeLeft.m)}
          </span>
          <span className="font-bold">:</span>
          <span className="bg-white/20 backdrop-blur-sm rounded-md px-2 py-1 font-bold">
            {pad(timeLeft.s)}
          </span>
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-[#FF6B4A] px-5 py-1.5 rounded-full text-xs font-bold hover:bg-white/90 transition-all hover:scale-105 whitespace-nowrap"
        >
          CLAIM NOW →
        </a>

        <button
          onClick={onClose}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-1"
          aria-label="Close banner"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
