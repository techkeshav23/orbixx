export default function Marquee() {
  const words = [
    "ZUMBA",
    "YOGA",
    "STRENGTH",
    "DANCE",
    "CARDIO",
    "HIIT",
    "WELLNESS",
    "FIT",
    "ENERGY",
    "POWER",
    "BURN",
    "GLOW",
    "SWEAT",
    "FLEX",
  ];

  const renderSet = (setKey: number) => (
    <div
      key={setKey}
      className="flex items-center shrink-0"
      aria-hidden={setKey > 0 ? "true" : undefined}
    >
      {words.map((w, i) => (
        <span
          key={`${setKey}-${i}`}
          className="flex items-center gap-3 mx-3 sm:mx-4"
        >
          <span
            className={`text-2xl sm:text-4xl font-black tracking-tight ${
              i % 2 === 0
                ? "text-transparent [-webkit-text-stroke:1.5px_rgba(255,107,74,0.6)]"
                : "text-slate-300"
            }`}
          >
            {w}
          </span>
          <span className="text-[#FF6B4A]/40 text-lg">◈</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="bg-slate-50 border-y border-slate-100 py-6 overflow-hidden">
      <div className="marquee-track flex whitespace-nowrap">
        {renderSet(0)}
        {renderSet(1)}
      </div>
    </div>
  );
}
