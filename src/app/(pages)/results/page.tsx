"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

const transformations = [
  {
    name: "Priya S.",
    location: "Mumbai",
    duration: "3 Months",
    weightLost: "13 kg",
    image: "/transformations/priya.jpg",
    quote: "I never thought I could feel this confident in my own body again.",
    weightJourney: [78, 72, 68, 65],
    stamina: 92,
    consistency: 88,
    energyLevel: 95,
  },
  {
    name: "Ananya R.",
    location: "Hyderabad",
    duration: "2 Months",
    weightLost: "8 kg",
    image: "/transformations/ananya.jpg",
    quote: "The energy I have now is something I haven't felt since my 20s.",
    weightJourney: [72, 68, 64],
    stamina: 85,
    consistency: 90,
    energyLevel: 88,
  },
  {
    name: "Meera K.",
    location: "Bangalore",
    duration: "1 Month",
    weightLost: "4 kg",
    image: "/transformations/meera.jpg",
    quote: "My doctor was shocked at my next checkup. Everything improved.",
    weightJourney: [68, 64],
    stamina: 78,
    consistency: 95,
    energyLevel: 82,
  },
  {
    name: "Sneha D.",
    location: "Delhi",
    duration: "3 Months",
    weightLost: "12 kg",
    image: "/transformations/sneha.jpg",
    quote: "I started for weight loss but stayed for the community and joy.",
    weightJourney: [80, 74, 70, 68],
    stamina: 88,
    consistency: 82,
    energyLevel: 90,
  },
  {
    name: "Kavita P.",
    location: "Pune",
    duration: "4 Months",
    weightLost: "18 kg",
    image: "/transformations/kavita.jpg",
    quote: "From size XL to M. Orbixx changed my relationship with fitness.",
    weightJourney: [88, 80, 75, 72, 70],
    stamina: 96,
    consistency: 94,
    energyLevel: 97,
  },
  {
    name: "Ritu M.",
    location: "Jaipur",
    duration: "2 Months",
    weightLost: "7 kg",
    image: "/transformations/ritu.jpg",
    quote: "PCOD symptoms reduced drastically. I feel like a new person.",
    weightJourney: [70, 66, 63],
    stamina: 80,
    consistency: 87,
    energyLevel: 85,
  },
  {
    name: "Deepika G.",
    location: "Agra",
    duration: "3 Months",
    weightLost: "14 kg",
    image: "/transformations/deepika.jpg",
    quote: "I dance every morning now. My kids join in too!",
    weightJourney: [82, 76, 72, 68],
    stamina: 91,
    consistency: 90,
    energyLevel: 93,
  },
  {
    name: "Nisha T.",
    location: "Chennai",
    duration: "1 Month",
    weightLost: "5 kg",
    image: "/transformations/nisha.jpeg",
    quote: "The best investment I've ever made in myself.",
    weightJourney: [65, 60],
    stamina: 75,
    consistency: 92,
    energyLevel: 80,
  },
  {
    name: "Pooja V.",
    location: "Lucknow",
    duration: "2 Months",
    weightLost: "9 kg",
    image: "/transformations/1.jpeg",
    quote: "I went from breathless climbing stairs to doing 30-min dance sessions!",
    weightJourney: [76, 71, 67],
    stamina: 87,
    consistency: 91,
    energyLevel: 89,
  },
  {
    name: "Shalini A.",
    location: "Indore",
    duration: "2 Months",
    weightLost: "10 kg",
    image: "/transformations/2.jpeg",
    quote: "My husband says I look 10 years younger. Best compliment ever.",
    weightJourney: [71, 66, 61],
    stamina: 82,
    consistency: 88,
    energyLevel: 86,
  },
  {
    name: "Tanvi R.",
    location: "Nagpur",
    duration: "4 Months",
    weightLost: "16 kg",
    image: "/transformations/3.jpeg",
    quote: "From avoiding mirrors to clicking selfies every day. Thank you Orbixx!",
    weightJourney: [84, 77, 72, 69, 68],
    stamina: 93,
    consistency: 96,
    energyLevel: 94,
  },
  {
    name: "Ishita M.",
    location: "Kolkata",
    duration: "1 Month",
    weightLost: "4 kg",
    image: "/transformations/4.jpeg",
    quote: "PCOD, thyroid — nothing stopped me. The trainers kept me going.",
    weightJourney: [69, 65],
    stamina: 79,
    consistency: 93,
    energyLevel: 83,
  },
  {
    name: "Aarti S.",
    location: "Chandigarh",
    duration: "3 Months",
    weightLost: "13 kg",
    image: "/transformations/5.jpeg",
    quote: "I lost weight but gained so much confidence and energy.",
    weightJourney: [79, 73, 69, 66],
    stamina: 89,
    consistency: 85,
    energyLevel: 91,
  },
  {
    name: "Diya K.",
    location: "Surat",
    duration: "1 Month",
    weightLost: "5 kg",
    image: "/transformations/6.jpeg",
    quote: "My morning dance session is my therapy now. Can't imagine skipping it.",
    weightJourney: [73, 68],
    stamina: 84,
    consistency: 90,
    energyLevel: 87,
  },
  {
    name: "Mansi P.",
    location: "Ahmedabad",
    duration: "4 Months",
    weightLost: "20 kg",
    image: "/transformations/7.jpeg",
    quote: "From XXL to M size. My wardrobe is completely new now!",
    weightJourney: [90, 82, 76, 72, 70],
    stamina: 97,
    consistency: 95,
    energyLevel: 96,
  },
  {
    name: "Neha G.",
    location: "Bhopal",
    duration: "4 Months",
    weightLost: "15 kg",
    image: "/transformations/8.jpeg",
    quote: "Even my kids noticed the change. They say 'Mummy looks so happy now!'",
    weightJourney: [80, 73, 68, 66, 65],
    stamina: 76,
    consistency: 89,
    energyLevel: 81,
  },
  {
    name: "Shruti D.",
    location: "Kochi",
    duration: "2 Months",
    weightLost: "9 kg",
    image: "/transformations/9.jpeg",
    quote: "Post-pregnancy weight gone in 2 months. Feeling like myself again.",
    weightJourney: [77, 72, 68],
    stamina: 86,
    consistency: 92,
    energyLevel: 90,
  },
  {
    name: "Swati N.",
    location: "Varanasi",
    duration: "3 Months",
    weightLost: "14 kg",
    image: "/transformations/10.jpeg",
    quote: "Sugar levels normal, BP normal. My doctor is my biggest fan of Orbixx now.",
    weightJourney: [83, 77, 72, 69],
    stamina: 90,
    consistency: 93,
    energyLevel: 92,
  },
  {
    name: "Radhika J.",
    location: "Patna",
    duration: "2 Months",
    weightLost: "8 kg",
    image: "/transformations/11.jpeg",
    quote: "I joined alone, but made 50+ friends in the community. Love this journey!",
    weightJourney: [74, 70, 66],
    stamina: 83,
    consistency: 87,
    energyLevel: 85,
  },
  {
    name: "Kriti B.",
    location: "Dehradun",
    duration: "3 Months",
    weightLost: "12 kg",
    image: "/transformations/12.jpeg",
    quote: "Went from hating exercise to dancing every single morning. Life-changing.",
    weightJourney: [81, 75, 71, 69],
    stamina: 91,
    consistency: 94,
    energyLevel: 93,
  },
  {
    name: "Anjali T.",
    location: "Coimbatore",
    duration: "4 Months",
    weightLost: "15 kg",
    image: "/transformations/13.jpeg",
    quote: "Knee pain vanished, energy doubled. Wish I had started sooner!",
    weightJourney: [75, 69, 64, 62, 60],
    stamina: 85,
    consistency: 91,
    energyLevel: 88,
  },
  {
    name: "Vidya R.",
    location: "Vizag",
    duration: "4 Months",
    weightLost: "17 kg",
    image: "/transformations/14.jpeg",
    quote: "My transformation photo went viral in my family WhatsApp group!",
    weightJourney: [86, 78, 73, 70, 69],
    stamina: 94,
    consistency: 96,
    energyLevel: 95,
  },
];

// sparkline svg
function Sparkline({ data, color = "#FF6B4A" }: { data: number[]; color?: string }) {
  const w = 140;
  const h = 40;
  const pad = 4;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = pad + ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });

  // Area fill path (closes to bottom-right then bottom-left)
  const firstX = pad;
  const lastX = pad + ((data.length - 1) / (data.length - 1)) * (w - pad * 2);
  const areaPath = `M${points[0]} ${points.slice(1).map((p) => `L${p}`).join(" ")} L${lastX},${h} L${firstX},${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-10" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sparkGrad-${data.length}-${data[0]}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path
        d={areaPath}
        fill={`url(#sparkGrad-${data.length}-${data[0]})`}
      />
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      <circle
        cx={points[points.length - 1].split(",")[0]}
        cy={points[points.length - 1].split(",")[1]}
        r="3"
        fill={color}
      />
    </svg>
  );
}

// progress bar
function ProgressBar({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-medium text-slate-400 w-16 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-[10px] font-bold text-slate-600 w-8 text-right">{value}%</span>
    </div>
  );
}

function TransformationCard({
  t,
  index,
}: {
  t: (typeof transformations)[0];
  index: number;
}) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-500 overflow-hidden">
      {/* Image area */}
      <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
        <Image
          src={t.image}
          alt={`${t.name} transformation`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Duration badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
          {t.duration}
        </div>

        {/* Weight lost badge */}
        <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-bold text-white shadow-sm">
          -{t.weightLost}
        </div>
      </div>

      {/* Journey graph */}
      <div className="px-4 pt-4 pb-2 border-b border-slate-50">
        {/* Weight loss sparkline */}
        <div className="mb-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Weight Journey</span>
            <span className="text-[10px] font-bold text-primary">
              {t.weightJourney[0]}kg → {t.weightJourney[t.weightJourney.length - 1]}kg
            </span>
          </div>
          <Sparkline data={t.weightJourney} color="#FF6B4A" />
        </div>

        {/* Stat bars */}
        <div className="space-y-1.5">
          <ProgressBar value={t.stamina} label="Stamina" color="#14B8A6" />
          <ProgressBar value={t.consistency} label="Consistency" color="#EC4899" />
          <ProgressBar value={t.energyLevel} label="Energy" color="#FF6B4A" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">{t.name}</h3>
            <p className="text-slate-400 text-xs">{t.location}</p>
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className="w-3.5 h-3.5 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed italic">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const [selectedMonth, setSelectedMonth] = useState<number | "all">("all");

  const monthOptions = useMemo(() => {
    const uniqueMonths = Array.from(
      new Set(
        transformations.map((item) => Number(item.duration.match(/\d+/)?.[0] || 0))
      )
    ).filter((month) => month > 0);

    return uniqueMonths.sort((a, b) => a - b);
  }, []);

  const filteredTransformations = useMemo(() => {
    if (selectedMonth === "all") return transformations;

    return transformations.filter(
      (item) => Number(item.duration.match(/\d+/)?.[0] || 0) === selectedMonth
    );
  }, [selectedMonth]);

  return (
    <main>
      <div className="pt-20 lg:pt-24" />
      {/* Transformation Grid */}
      <section className="pt-4 pb-16 md:pb-20 bg-[#ffdee4]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setSelectedMonth("all")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-200 ${
                selectedMonth === "all"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-slate-600 border-slate-200 hover:border-primary/40"
              }`}
            >
              All
            </button>

            {monthOptions.map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-200 ${
                  selectedMonth === month
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-slate-600 border-slate-200 hover:border-primary/40"
                }`}
              >
                {month} Month{month > 1 ? "s" : ""}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTransformations.map((t, i) => (
              <TransformationCard key={i} t={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#ffdee4]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
            Your transformation is next
          </h2>
          <p className="text-slate-500 text-base mb-8 max-w-lg mx-auto">
            Join 10,000+ women who have already transformed their lives with Orbixx.
            Start your 7-day free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md"
            >
              BOOK NOW
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <a
              href="https://wa.me/917451874271"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 border border-slate-200 hover:border-pink-300 text-slate-700 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-[#ffdee4]/50"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
