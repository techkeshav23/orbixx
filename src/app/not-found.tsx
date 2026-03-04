import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-5">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] via-[#EC4899] to-[#14B8A6] mb-6">
          404
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-3">
          Page Not Found
        </h2>
        <p className="text-slate-500 text-sm mb-8">
          Looks like this page took a rest day. Let&apos;s get you back to the
          workout!
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B4A] to-[#EC4899] text-white px-8 py-3 rounded-full font-bold text-sm hover:shadow-[0_0_40px_rgba(255,107,74,0.3)] transition-all duration-300 hover:scale-105"
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
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
