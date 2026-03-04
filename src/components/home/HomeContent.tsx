"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Features from "./Features";
import About from "./About";
import Stats from "./Stats";
import Testimonials from "./Testimonials";
import Schedule from "./Schedule";
import OfferBanner from "./OfferBanner";
import Footer from "@/components/Footer";

/* ── Lazy-loaded modals — only fetched when the user triggers them ── */
const Carousel3D = dynamic(() => import("./Carousel3D"), { ssr: false });
const FreeClassPopup = dynamic(() => import("./FreeClassPopup"), { ssr: false });
const SpinWheel = dynamic(() => import("./SpinWheel"), { ssr: false });

export default function HomeContent() {
  const [showCarousel, setShowCarousel] = useState(false);
  const [showFreeClass, setShowFreeClass] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  // Show free class popup after 5 seconds
  useEffect(() => {
    const t = setTimeout(() => setShowFreeClass(true), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {showBanner && <OfferBanner onClose={() => setShowBanner(false)} />}
      <Hero
        onSeeResults={() => setShowCarousel(true)}
        onSpinWheel={() => setShowSpinWheel(true)}
      />
      <Marquee />
      <Features />
      <About />
      <Stats />
      <Testimonials />
      <Schedule />
      <Footer />

      {/* Modals — conditionally rendered so dynamic import triggers on demand */}
      {showCarousel && (
        <Carousel3D
          open={showCarousel}
          onClose={() => setShowCarousel(false)}
        />
      )}
      {showFreeClass && (
        <FreeClassPopup
          open={showFreeClass}
          onClose={() => setShowFreeClass(false)}
        />
      )}
      {showSpinWheel && (
        <SpinWheel
          open={showSpinWheel}
          onClose={() => setShowSpinWheel(false)}
        />
      )}
    </>
  );
}
