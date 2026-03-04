import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

const transformations = [
  {
    name: "Priya S.",
    location: "Mumbai",
    duration: "6 Months",
    weightLost: "15 kg",
    image: "/transformations/priya.jpg",
    quote: "I never thought I could feel this confident in my own body again.",
    weightJourney: [78, 76, 73, 70, 67, 65, 63],
    stamina: 92,
    consistency: 88,
    energyLevel: 95,
  },
  {
    name: "Ananya R.",
    location: "Hyderabad",
    duration: "4 Months",
    weightLost: "10 kg",
    image: "/transformations/ananya.jpg",
    quote: "The energy I have now is something I haven't felt since my 20s.",
    weightJourney: [72, 70, 68, 65, 62],
    stamina: 85,
    consistency: 90,
    energyLevel: 88,
  },
  {
    name: "Meera K.",
    location: "Bangalore",
    duration: "3 Months",
    weightLost: "8 kg",
    image: "/transformations/meera.jpg",
    quote: "My doctor was shocked at my next checkup. Everything improved.",
    weightJourney: [68, 66, 63, 60],
    stamina: 78,
    consistency: 95,
    energyLevel: 82,
  },
  {
    name: "Sneha D.",
    location: "Delhi",
    duration: "5 Months",
    weightLost: "12 kg",
    image: "/transformations/sneha.jpg",
    quote: "I started for weight loss but stayed for the community and joy.",
    weightJourney: [80, 77, 74, 71, 69, 68],
    stamina: 88,
    consistency: 82,
    energyLevel: 90,
  },
  {
    name: "Kavita P.",
    location: "Pune",
    duration: "7 Months",
    weightLost: "18 kg",
    image: "/transformations/kavita.jpg",
    quote: "From size XL to M. Orbixx changed my relationship with fitness.",
    weightJourney: [88, 85, 81, 77, 74, 72, 70, 70],
    stamina: 96,
    consistency: 94,
    energyLevel: 97,
  },
  {
    name: "Ritu M.",
    location: "Jaipur",
    duration: "4 Months",
    weightLost: "9 kg",
    image: "/transformations/ritu.jpg",
    quote: "PCOD symptoms reduced drastically. I feel like a new person.",
    weightJourney: [70, 68, 65, 63, 61],
    stamina: 80,
    consistency: 87,
    energyLevel: 85,
  },
  {
    name: "Deepika G.",
    location: "Agra",
    duration: "6 Months",
    weightLost: "14 kg",
    image: "/transformations/deepika.jpg",
    quote: "I dance every morning now. My kids join in too!",
    weightJourney: [82, 79, 76, 73, 70, 68, 68],
    stamina: 91,
    consistency: 90,
    energyLevel: 93,
  },
  {
    name: "Nisha T.",
    location: "Chennai",
    duration: "3 Months",
    weightLost: "7 kg",
    image: "/transformations/nisha.jpg",
    quote: "The best investment I've ever made in myself.",
    weightJourney: [65, 63, 60, 58],
    stamina: 75,
    consistency: 92,
    energyLevel: 80,
  },
];

/* ── SVG Sparkline helper ── */
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

/* ── Animated progress bar ── */
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

      {/* ── Journey Graph ── */}
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
  return (
    <main>
      <div className="pt-20 lg:pt-24" />
      {/* Transformation Grid */}
      <section className="pt-4 pb-16 md:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {transformations.map((t, i) => (
              <TransformationCard key={i} t={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-slate-50">
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
              Start Free Trial
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
              className="inline-flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 text-slate-700 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-slate-50"
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
