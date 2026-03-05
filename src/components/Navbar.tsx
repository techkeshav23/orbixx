"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/results", label: "Results" },
    { href: "/trainers", label: "Trainers" },
    { href: "/pricing", label: "Pricing" },
    { href: "/schedule", label: "Schedule" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-100"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Orbixx Fitness Logo"
              width={48}
              height={48}
              className="w-11 h-11 lg:w-12 lg:h-12 rounded-full object-cover ring-2 ring-primary/20 shadow-sm"
              priority
            />
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-black tracking-tight text-slate-900">
                ORBIXX
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest -mt-0.5 text-primary">
                Fitness
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-slate-600 hover:text-primary hover:bg-primary/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/pricing"
              className="ml-4 bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-all duration-200 shadow-sm hover:shadow-md"
            >
              BOOK NOW
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/pricing"
              className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold"
            >
              BOOK NOW
            </Link>
            <button
              className="p-2 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between relative">
                <span
                  className={`w-full h-[2px] rounded-full transition-all duration-300 origin-center bg-slate-800 ${isOpen ? "rotate-45 absolute top-1/2 -translate-y-1/2" : ""}`}
                />
                <span
                  className={`w-full h-[2px] rounded-full transition-all duration-300 bg-slate-800 ${isOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`w-full h-[2px] rounded-full transition-all duration-300 origin-center bg-slate-800 ${isOpen ? "-rotate-45 absolute top-1/2 -translate-y-1/2" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-slate-100 px-4 py-4 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 px-4 text-slate-700 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors duration-200 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-slate-100 mt-3 pt-3">
            <Link
              href="/pricing"
              className="block w-full text-center bg-primary text-white px-6 py-3 rounded-lg font-semibold text-sm"
              onClick={() => setIsOpen(false)}
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
