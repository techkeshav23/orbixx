"use client";

import React, { useRef, useState, useEffect } from "react";
import { useInView } from "@/lib/hooks";

export default function Features() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [cardsVisible, setCardsVisible] = useState(false);
  const { ref: headerRef, inView: headerVisible } = useInView(0.1);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setCardsVisible(true);
          ob.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -60px 0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  const cards = [
    {
      num: "01",
      title: "Live Sessions",
      desc: "Real-time classes with trainers who see you, correct your form, and push your limits.",
      color: "#FF6B4A",
      icon: "🎥",
    },
    {
      num: "02",
      title: "Women Only",
      desc: "Private, judgment-free space. Dance like nobody\u2019s watching \u2014 because they aren\u2019t.",
      color: "#EC4899",
      icon: "👑",
    },
    {
      num: "03",
      title: "Any Device",
      desc: "Phone, tablet, laptop. Join from your bedroom, terrace, or while traveling.",
      color: "#14B8A6",
      icon: "📱",
    },
    {
      num: "04",
      title: "All Levels",
      desc: "Whether you\u2019ve never exercised or you\u2019re a fitness junkie \u2014 we\u2019ve got your class.",
      color: "#FF6B4A",
      icon: "🎯",
    },
    {
      num: "05",
      title: "Flexible Timing",
      desc: "Classes from 6 AM to 10 PM. Miss a live session? Recordings available 24/7.",
      color: "#EC4899",
      icon: "⏰",
    },
    {
      num: "06",
      title: "Expert Trainers",
      desc: "Certified, experienced, and passionate. 50+ trainers across different styles.",
      color: "#14B8A6",
      icon: "💪",
    },
  ];

  const getSpreadStyle = (i: number): React.CSSProperties => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const colOffset = col - 1;
    const rowOffset = row === 0 ? -1 : 1;
    const delay = 200 + Math.abs(colOffset) * 150 + row * 120;

    return {
      transition: `transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, opacity 700ms ease ${delay}ms`,
      transform: cardsVisible
        ? "translate3d(0, 0, 0) scale(1)"
        : `translate3d(${colOffset * -60}px, ${rowOffset * -40}px, 0) scale(0.85)`,
      opacity: cardsVisible ? 1 : 0,
    };
  };

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[#FF6B4A] text-xs font-mono tracking-[0.3em] uppercase block mb-4">
            // WHAT WE OFFER
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
            Not another fitness app.
            <br />
            A revolution.
          </h2>
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group relative will-change-transform"
              style={getSpreadStyle(i)}
            >
              <div className="relative rounded-2xl p-[1px] overflow-hidden h-full">
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${card.color}30, transparent 50%, ${card.color}15)`,
                  }}
                />
                <div className="relative bg-white rounded-2xl p-7 sm:p-8 h-full overflow-hidden border border-slate-100 group-hover:border-transparent transition-colors duration-500">
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-15 transition-all duration-700"
                    style={{ background: card.color }}
                  />
                  <div className="relative z-10 flex items-start justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]"
                      style={{ background: `${card.color}12` }}
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
