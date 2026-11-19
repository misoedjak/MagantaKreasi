"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

function AnimatedStatNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  // Parse leading integer (supporting dot thousand separators like "1.000m²") + suffix ("+", "%", "m²", "/7")
  const match = value.match(/^(\d[\d.]*)(.*)$/);
  const numericTarget = match ? parseInt(match[1].replace(/\./g, ""), 10) : null;
  const usesDotSeparator = match ? match[1].includes(".") : false;
  const suffix = match ? match[2] : "";

  const [displayValue, setDisplayValue] = useState<string>(
    numericTarget !== null && !prefersReducedMotion ? `0${suffix}` : value
  );

  useEffect(() => {
    if (numericTarget === null) return;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }
    if (!isInView) return;

    const controls = animate(0, numericTarget, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        const rounded = Math.round(latest);
        const formatted = usesDotSeparator
          ? rounded.toLocaleString("id-ID")
          : String(rounded);
        setDisplayValue(`${formatted}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [isInView, numericTarget, prefersReducedMotion, suffix, usesDotSeparator, value]);

  return <span ref={ref}>{numericTarget !== null ? displayValue : value}</span>;
}

interface AboutProps {
  settings?: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    features?: string;
  } | null;
  stats?: {
    id: string;
    number: string;
    label: string;
  }[] | null;
}

export default function About({ settings, stats }: AboutProps) {
  const defaultTrustStats = [
    {
      number: "500+",
      caption: "Proyek booth, panggung & backdrop terpasang di venue nasional",
    },
    {
      number: "100%",
      caption: "Produksi in-house langsung di workshop sendiri tanpa subkontraktor",
    },
    {
      number: "1.000m²",
      caption: "Fasilitas workshop fabrikasi kayu, las metal & ruang finishing",
    },
    {
      number: "24/7",
      caption: "Tim teknis & kru lapangan siaga dari loading hingga bongkaran",
    },
    {
      number: "SNI",
      caption: "Material rangka besi holo & multiplek 18mm berstandar kekuatan tinggi",
    },
    {
      number: "CNC",
      caption: "Pemotongan presisi, cat duco rapi & uji pra-rakit sebelum loading",
    },
  ];

  // Keep authentic quantitative stats if DB only has generic text placeholders
  const hasGenericTextStats = stats?.some(
    (s) => s.number === "Top" || s.number === "In-House"
  );
  const trustStats =
    stats && stats.length >= 6 && !hasGenericTextStats
      ? stats.slice(0, 6).map((s) => ({
          number: s.number,
          caption: s.label,
        }))
      : defaultTrustStats;

  const headingText =
    settings?.heading && !settings.heading.includes("Dedikasi")
      ? settings.heading
      : "Dikerjakan Langsung dari Workshop Sendiri.";

  const para1Text =
    settings?.paragraph1 && !settings.paragraph1.includes("spesialis fabrikasi")
      ? settings.paragraph1
      : "Maganta Kreasi adalah workshop produksi event dan pameran. Kami mengerjakan pembuatan booth pameran, panggung acara, backdrop, hingga totem dan signage dengan konstruksi yang kuat dan finishing rapi.";

  const para2Text =
    settings?.paragraph2 && !settings.paragraph2.includes("Beroperasi dari workshop")
      ? settings.paragraph2
      : "Seluruh proses mulai dari potong rangka, perkayuan, pengecatan, hingga bongkar-pasang di lokasi dikerjakan langsung oleh tim in-house kami sendiri tanpa dilempar ke pihak ketiga, sehingga kualitas dan ketepatan waktu selalu terjaga.";

  return (
    <section id="about" className="bg-white relative z-10 overflow-x-clip">
      {/* Part 1: Multi-Layered Editorial Collage Banner (Warm Cream Graph-Paper Canvas) */}
      <div className="pt-20 md:pt-28 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="relative rounded-[28px] sm:rounded-[32px] border border-stone-300/70 bg-paper-cream bg-grid-paper overflow-visible">
            {/* Top-Right Floating Accent: Coral/Magenta Sun + Hand-Drawn Clock + Cloud (breaks out of top edge) */}
            <div
              className="hidden lg:block absolute -top-11 right-[14%] w-32 h-28 pointer-events-none select-none"
              aria-hidden="true"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-brand-magenta/80" />
                <svg
                  className="absolute -top-2 w-10 h-10 text-zinc-900"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <circle
                    cx="20"
                    cy="20"
                    r="15"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M20 11 V20 L26 23"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute -bottom-3 w-32 h-16">
                  <Image
                    src="/images/collage-cloud.jpg"
                    alt=""
                    fill
                    sizes="128px"
                    className="object-contain mix-blend-multiply"
                  />
                </div>
              </div>
            </div>

            {/* Bottom-Left Overflowing Cloud Cutout (breaks out of bottom-left edge) */}
            <div
              className="hidden sm:block absolute -bottom-12 -left-6 w-52 sm:w-64 h-28 sm:h-32 pointer-events-none select-none"
              aria-hidden="true"
            >
              <Image
                src="/images/collage-cloud.jpg"
                alt=""
                fill
                sizes="256px"
                className="object-contain mix-blend-multiply"
              />
            </div>

            {/* Bottom-Right Halftone Pointing Hand Cutout (reaches in from bottom-right edge) */}
            <div
              className="hidden lg:block absolute -bottom-11 -right-3 w-28 h-28 pointer-events-none select-none"
              aria-hidden="true"
            >
              <Image
                src="/images/collage-hand.jpg"
                alt=""
                fill
                sizes="112px"
                className="object-contain mix-blend-multiply"
              />
            </div>

            {/* Delicate Ink Thread Line sweeping along bottom-right to the pointing finger */}
            <svg
              className="hidden lg:block absolute bottom-3 left-[48%] w-[41%] h-12 pointer-events-none select-none"
              viewBox="0 0 420 56"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 4 8 Q 110 52 240 40 T 414 34"
                stroke="#18181b"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            </svg>

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center relative">
              {/* Left: Hand-Cut Halftone Editorial Collage */}
              <div className="lg:col-span-6 relative p-6 sm:p-10 flex items-center justify-center">
                <div className="relative w-full aspect-square max-w-[420px] sm:max-w-[470px]">
                  <Image
                    src="/images/collage-editorial-v2.jpg"
                    alt="Kolase editorial proses fabrikasi workshop Maganta Kreasi"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-contain mix-blend-multiply"
                    priority
                  />
                </div>
              </div>

              {/* Right: Clean Editorial Copy (Preserved Text, No Button, No Location Badge) */}
              <div className="lg:col-span-6 p-6 sm:p-10 lg:pr-14 lg:pl-4 flex flex-col justify-center">
                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-magenta">
                    Tentang Workshop Kami
                  </span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2.35rem] font-bold text-zinc-950 tracking-tight leading-[1.14] mb-5">
                  {headingText}
                </h2>

                <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
                  <p className="font-medium text-zinc-900 leading-relaxed">
                    {para1Text}
                  </p>
                  <p className="text-stone-600 text-sm sm:text-[15px] leading-relaxed">
                    {para2Text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Full-Bleed Maganta Magenta 3x2 Trust Block (Matching Contact Palette: Magenta + White + Yellow) */}
      <div className="w-full bg-brand-magenta text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] max-w-2xl mx-auto">
            Dipercaya brand besar
            <br className="hidden sm:inline" /> dan kecil di{" "}
            <span className="text-brand-yellow">Indonesia.</span>
          </h2>

          <div className="mt-6">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand-yellow text-brand-dark text-sm font-bold hover:bg-white transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-4 focus-visible:ring-offset-brand-magenta active:opacity-90"
            >
              Hubungi Tim Kami
            </a>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 md:gap-y-14 mt-14 md:mt-16 max-w-5xl mx-auto">
            {trustStats.map((item) => {
              const isHighlighted = item.number === "100%";
              const shouldAnimate = item.number === "500+" || item.number === "100%";
              return (
                <motion.div
                  key={item.number}
                  whileHover={{ scale: 1.08, y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="group flex flex-col items-center p-4 cursor-default"
                >
                  <dt
                    className={`font-sans text-sm sm:text-[15px] max-w-[260px] leading-relaxed order-2 mt-3 transition-colors duration-300 ease-out ${
                      isHighlighted
                        ? "text-brand-yellow font-medium"
                        : "text-white/80 group-hover:text-white"
                    }`}
                  >
                    {item.caption}
                  </dt>
                  <dd
                    className={`font-sans text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight tabular-nums leading-none order-1 transition-colors duration-300 ease-out ${
                      isHighlighted
                        ? "text-brand-yellow"
                        : "text-white group-hover:text-brand-yellow"
                    }`}
                  >
                    {shouldAnimate ? (
                      <AnimatedStatNumber value={item.number} />
                    ) : (
                      item.number
                    )}
                  </dd>
                </motion.div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
