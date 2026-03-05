"use client";

import Image from "next/image";
import { useInView } from "@/lib/hooks";
import { useRef, useState, useEffect, useCallback } from "react";

const trainers = [
  {
    name: "Parul",
    role: "Zumba Instructor",
    image: "/trainers/parul.jpg",
    experience: "8+ Years",
    clients: "7,500+",
    specialty: "PCOD & Hormonal Balance Expert",
    tags: ["Energetic", "Results-Focused", "Empowering"],
  },
  {
    name: "Shivangi",
    role: "Zumba & Flexibility Coach",
    image: "/trainers/shivangi.jpg",
    experience: "10+ Years",
    clients: "6,500+",
    specialty: "Stress Relief Expert",
    tags: ["Calming", "Mindful", "Gentle"],
  },
  {
    name: "Vanshika",
    role: "Strength & Power Yoga Coach",
    image: "/trainers/vanshika.jpeg",
    experience: "3+ Years",
    clients: "12,000+",
    specialty: "Women-Focused Training",
    tags: ["Dynamic", "Challenging", "Inspiring"],
  },
];

export default function Trainers() {
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
    const cardWidth = el.querySelector("div")?.offsetWidth ?? 340;
    el.scrollBy({ left: dir === "left" ? -cardWidth - 24 : cardWidth + 24, behavior: "smooth" });
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
              // OUR TRAINERS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
              Meet the experts
              <br />
              behind your results.
            </h2>
          </div>

          {/* Scroll arrows — desktop */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white hover:shadow-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white hover:shadow-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
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
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-5 px-5 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {trainers.map((trainer, i) => (
            <div
              key={trainer.name}
              className={`group snap-start shrink-0 w-[300px] sm:w-[340px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-500 overflow-hidden h-full">
                {/* Image + gradient overlay */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Experience badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm">
                    {trainer.experience}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-1">{trainer.name}</h3>
                  <p className="text-[#FF6B4A] text-sm font-bold mb-4">{trainer.role}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                    <div>
                      <p className="text-slate-900 font-bold text-sm">{trainer.clients}</p>
                      <p className="text-slate-700 font-bold text-[10px] uppercase tracking-wider">Happy Clients</p>
                    </div>
                    <div className="w-px h-8 bg-slate-100" />
                    <div>
                      <p className="text-[#FF6B4A] font-extrabold text-xs leading-tight">{trainer.specialty}</p>
                      <p className="text-slate-700 font-bold text-[10px] uppercase tracking-wider">Specialty</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {trainer.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-slate-50 text-slate-700 text-xs px-3 py-1.5 rounded-lg border border-slate-100 font-bold"
                      >
                        {tag}
                      </span>
                    ))}
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
