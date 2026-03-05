"use client";

import { useState, useCallback, useEffect, createContext, useContext } from "react";
import dynamic from "next/dynamic";

const ParticleSilhouetteLoader = dynamic(
  () => import("@/components/loaders/ParticleSilhouetteLoader"),
  { ssr: false }
);

/* ── Context: tells child components when the loader is done ── */
const LoaderCtx = createContext(false);

/** Returns `true` once the intro loader has finished (or was skipped). */
export const useLoaderReady = () => useContext(LoaderCtx);

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  // Start loader only on client mount — avoids hydration mismatch
  useEffect(() => {
    const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navEntry && navEntry.type === "back_forward") {
      setReady(true); // skip loader, show content immediately
      return;
    }
    setLoading(true);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
    // Let the loader exit before revealing content
    requestAnimationFrame(() => setReady(true));
  }, []);

  return (
    <LoaderCtx.Provider value={ready}>
      {loading && <ParticleSilhouetteLoader onComplete={handleLoaderComplete} />}
      {/* Both server & client start with ready=false → identical HTML → no hydration mismatch */}
      <div
        style={{
          opacity: ready ? 1 : 0,
          pointerEvents: ready ? "auto" : "none",
          transition: ready ? "opacity 0.7s ease-out" : "none",
        }}
      >
        {children}
      </div>
    </LoaderCtx.Provider>
  );
}
