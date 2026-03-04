"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-5">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">😓</div>
        <h2 className="text-2xl font-black text-slate-900 mb-3">
          Something went wrong!
        </h2>
        <p className="text-slate-500 text-sm mb-8">
          Don&apos;t worry, it&apos;s not your fault. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-gradient-to-r from-[#FF6B4A] to-[#EC4899] text-white px-8 py-3 rounded-full font-bold text-sm hover:shadow-[0_0_40px_rgba(255,107,74,0.3)] transition-all duration-300 hover:scale-105"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
