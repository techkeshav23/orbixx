"use client";

import { useInView } from "@/lib/hooks";
import { useRef, useEffect, useCallback, useState } from "react";

const stories = [
  {
    quote:
      "I\u2019ve tried every fitness app, gym, and YouTube video. Orbixx is the only thing that actually stuck. 6 months in, 15kg down, and I genuinely look forward to every class.",
    name: "Priya Sharma",
    loc: "Mumbai",
    result: "-14 KG",
    time: "3 months",
  },
  {
    quote:
      "The women-only environment changed everything. No awkward stares, no judgment. Just me, the music, and 200 other women having the time of their lives.",
    name: "Ananya Reddy",
    loc: "Hyderabad",
    result: "2X STAMINA",
    time: "4 months",
  },
  {
    quote:
      "My doctor told me to exercise for my health. I dreaded it until Orbixx. Now my blood pressure is normal, my energy is through the roof, and I\u2019m hooked.",
    name: "Meera Kulkarni",
    loc: "Bangalore",
    result: "+100% ENERGY",
    time: "3 months",
  },
  {
    quote:
      "Post-pregnancy, I thought my body would never recover. Orbixx\u2019s Zumba classes made fitness fun again. Lost 12kg and gained so much confidence!",
    name: "Sneha Desai",
    loc: "Delhi",
    result: "-12 KG",
    time: "5 months",
  },
  {
    quote:
      "From size XL to M \u2014 I still can\u2019t believe it. The trainers remember your name, push you just right, and the community keeps you accountable.",
    name: "Kavita Patil",
    loc: "Pune",
    result: "XL \u2192 M",
    time: "7 months",
  },
  {
    quote:
      "PCOD symptoms reduced drastically within 3 months. My hormonal balance improved and I feel like a completely new person. Orbixx is a lifesaver.",
    name: "Ritu Mehta",
    loc: "Jaipur",
    result: "PCOD RELIEF",
    time: "4 months",
  },
  {
    quote:
      "I dance every morning now. My kids join in too! It\u2019s become a family ritual. The flexible timing makes it so easy to fit into my schedule.",
    name: "Deepika Gupta",
    loc: "Agra",
    result: "-14 KG",
    time: "6 months",
  },
  {
    quote:
      "As a working professional with no time for the gym, Orbixx was a game-changer. 30 minutes from home, real results. Best investment I\u2019ve made in myself.",
    name: "Nisha Thakur",
    loc: "Chennai",
    result: "3X FITNESS",
    time: "3 months",
  },
  {
    quote:
      "I was skeptical about online fitness. After one week of Orbixx, I was addicted. The energy of live classes is unmatched. 10kg down and counting!",
    name: "Swati Joshi",
    loc: "Ahmedabad",
    result: "-10 KG",
    time: "4 months",
  },
];

// Triple the stories for infinite loop illusion
const doubled = [...stories, ...stories];
const CARD_W_SM = 280;
const CARD_W = 340;
const GAP = 24;

export default function Testimonials() {
  const { ref, inView } = useInView(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const teleporting = useRef(false);
  const [paused, setPaused] = useState(false);

  // When scroll reaches the second copy, jump back to position 0 (same visual position)
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || teleporting.current) return;
    const isMobile = window.innerWidth < 640;
    const cardW = isMobile ? CARD_W_SM : CARD_W;
    const oneSetWidth = stories.length * (cardW + GAP);
    if (el.scrollLeft >= oneSetWidth) {
      teleporting.current = true;
      el.scrollLeft -= oneSetWidth;
      requestAnimationFrame(() => { teleporting.current = false; });
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Auto-slide every 3 seconds — pauses on hover/touch
  useEffect(() => {
    if (paused || !inView) return;
    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      const isMobile = window.innerWidth < 640;
      const cardW = isMobile ? CARD_W_SM : CARD_W;
      el.scrollBy({ left: cardW + GAP, behavior: "smooth" });
    }, 2000);
    return () => clearInterval(interval);
  }, [paused, inView]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -(CARD_W + GAP) : (CARD_W + GAP), behavior: "smooth" });
  };

  return (
    <section ref={ref} className="pt-16 pb-10 md:pt-20 md:pb-12 bg-[#ffdee4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`flex items-end justify-between mb-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <span className="text-[#FF6B4A] text-xs font-mono tracking-[0.3em] uppercase block mb-4">
              // REAL STORIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
              They did it.
              <br />
              So can you.
            </h2>
          </div>

          {/* Scroll arrows — desktop */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer"
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer"
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            </div>
          </div>
        </div>

        {/* Infinite Sliding Cards */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          className="flex gap-6 overflow-x-auto pb-4 -mx-5 px-5 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {doubled.map((story, i) => (
            <div
              key={i}
              className="group shrink-0 w-[280px] sm:w-[340px]"
            >
              <div className="bg-white border border-slate-100 rounded-2xl p-7 h-full hover:border-slate-200 hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B4A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#FF6B4A] font-mono font-bold text-sm tracking-wider">
                    {story.result}
                  </span>
                  <span className="text-slate-300 text-xs font-mono">
                    {story.time}
                  </span>
                </div>

                <blockquote className="text-slate-700 text-sm leading-[1.8] mb-8 font-semibold">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B4A]/20 to-[#EC4899]/20 flex items-center justify-center text-slate-500 text-xs font-mono font-bold border border-slate-100">
                    {story.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-slate-900 text-sm font-semibold">
                      {story.name}
                    </p>
                    <p className="text-slate-400 text-xs">{story.loc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}

/* ── All Reviews Modal ── */
export function AllReviewsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 cursor-pointer"
        aria-label="Close"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Scrollable content */}
      <div
        className="relative z-[105] w-full max-w-4xl max-h-[90vh] overflow-y-auto mt-16 mb-8 mx-4 rounded-2xl bg-white p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
        style={{ scrollbarWidth: "thin" }}
      >
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">All Reviews</h2>
        <p className="text-slate-500 text-sm mb-8">{stories.length} real stories from real women</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stories.map((story, i) => (
            <div
              key={i}
              className="group bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-slate-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B4A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[#FF6B4A] font-mono font-bold text-sm tracking-wider">
                  {story.result}
                </span>
                <span className="text-slate-300 text-xs font-mono">
                  {story.time}
                </span>
              </div>

              <blockquote className="text-slate-700 text-sm leading-[1.8] mb-6 font-semibold">
                &ldquo;{story.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF6B4A]/20 to-[#EC4899]/20 flex items-center justify-center text-slate-500 text-xs font-mono font-bold border border-slate-100">
                  {story.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-slate-900 text-sm font-semibold">{story.name}</p>
                  <p className="text-slate-400 text-xs">{story.loc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
