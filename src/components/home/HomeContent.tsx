"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useLoaderReady } from "@/components/AppShell";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Features from "./Features";
import WhyOrbixx from "./WhyOrbixx";
import Stats from "./Stats";
import Testimonials from "./Testimonials";
import Trainers from "./Trainers";
import Schedule from "./Schedule";
import OfferBanner from "./OfferBanner";
import FreeClassPopup from "./FreeClassPopup";
import Footer from "@/components/Footer";

/* ── Lazy-loaded modals — only fetched when the user triggers them ── */
const Carousel3D = dynamic(() => import("./Carousel3D"), { ssr: false });

export default function HomeContent() {
  const loaderReady = useLoaderReady();
  const [showCarousel, setShowCarousel] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  // Wait for loader to finish before starting popup timer
  useEffect(() => {
    if (!loaderReady) return;
    const timer = setTimeout(() => setShowPopup(true), 3000);
    return () => clearTimeout(timer);
  }, [loaderReady]);

  return (
    <>
      {showBanner && <OfferBanner onClose={() => setShowBanner(false)} />}
      <Hero
        onSeeResults={() => setShowCarousel(true)}
      />
      <Marquee />
      <Features />
      <WhyOrbixx />
      <Stats />
      <Testimonials />
      <Trainers />
      <Footer />

      {/* Modals — conditionally rendered so dynamic import triggers on demand */}
      {showCarousel && (
        <Carousel3D
          open={showCarousel}
          onClose={() => setShowCarousel(false)}
        />
      )}

      {/* Lead capture popup — shows on page load */}
      <FreeClassPopup
        open={showPopup}
        onClose={() => setShowPopup(false)}
      />

    </>
  );
}
