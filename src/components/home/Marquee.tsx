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
                ? "text-transparent [-webkit-text-stroke:2px_white]"
                : "text-white"
            }`}
          >
            {w}
          </span>
          <span className="text-[#EC4899] text-lg">◈</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="bg-[#f8c8d0] border-y border-pink-300 py-6 overflow-hidden">
      <div className="marquee-track flex whitespace-nowrap">
        {renderSet(0)}
        {renderSet(1)}
      </div>
    </div>
  );
}
