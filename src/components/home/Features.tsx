"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "@/lib/hooks";
import { Video, Crown, Smartphone, Target, Clock, Dumbbell } from "lucide-react";

export default function Features() {
  const { ref, inView } = useInView(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("div")?.offsetWidth ?? 280;
    el.scrollBy({ left: dir === "left" ? -cardWidth - 20 : cardWidth + 20, behavior: "smooth" });
  };

  const cards = [
    {
      num: "01",
      title: "Live Sessions",
      desc: "Real-time classes with trainers who see you, correct your form, and push your limits.",
      color: "#FF6B4A",
      icon: <Video className="w-6 h-6" />,
    },
    {
      num: "02",
      title: "Women Only",
      desc: "Private, judgment-free space. Dance like nobody\u2019s watching \u2014 because they aren\u2019t.",
      color: "#EC4899",
      icon: <Crown className="w-6 h-6" />,
    },
    {
      num: "03",
      title: "Any Device",
      desc: "Phone, tablet, laptop. Join from your bedroom, terrace, or while traveling.",
      color: "#14B8A6",
      icon: <Smartphone className="w-6 h-6" />,
    },
    {
      num: "04",
      title: "All Levels",
      desc: "Whether you\u2019ve never exercised or you\u2019re a fitness junkie \u2014 we\u2019ve got your class.",
      color: "#FF6B4A",
      icon: <Target className="w-6 h-6" />,
    },
    {
      num: "05",
      title: "Flexibility in Time Slots",
      desc: "Classes from 6 AM to 10 PM.",
      color: "#EC4899",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      num: "06",
      title: "Expert Trainers",
      desc: "Certified, experienced, and passionate. 50+ trainers across different styles.",
      color: "#14B8A6",
      icon: <Dumbbell className="w-6 h-6" />,
    },
  ];

  return (
    <section ref={ref} className="pt-16 pb-4 md:pt-20 md:pb-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`flex items-end justify-between mb-14 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <span className="text-[#FF6B4A] text-xs font-mono tracking-[0.3em] uppercase block mb-4">
              // WHAT WE OFFER
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
              Not another fitness app.
              <br />
              A revolution.
            </h2>
          </div>

          {/* Scroll arrows — desktop */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:shadow-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:shadow-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sliding Cards */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-5 px-5 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className={`group snap-start shrink-0 w-[280px] sm:w-[320px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="relative rounded-2xl p-[1px] overflow-hidden h-full">
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${card.color}30, transparent 50%, ${card.color}15)`,
                  }}
                />
                <div className="relative bg-white rounded-2xl p-7 sm:p-8 h-full overflow-hidden border-2 border-slate-200 group-hover:border-transparent shadow-sm transition-all duration-500">
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-15 transition-all duration-700"
                    style={{ background: card.color }}
                  />
                  <div className="relative z-10 flex items-start justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]"
                      style={{ background: `${card.color}12`, color: card.color }}
                    >
                      {card.icon}
                    </div>
                    <span
                      className="text-3xl font-black font-mono leading-none"
                      style={{ color: `${card.color}18` }}
                    >
                      {card.num}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-slate-900 font-extrabold text-lg mb-2 tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                      {card.title}
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed font-semibold group-hover:text-slate-800 transition-colors duration-500">
                      {card.desc}
                    </p>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      background: `linear-gradient(90deg, ${card.color}, transparent)`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
