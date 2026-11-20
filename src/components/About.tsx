"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

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
  const { lang } = useLanguage();
  const isEn = lang === "en";

  const defaultTrustStats = isEn
    ? [
        {
          number: "500+",
          caption: "Custom booths, stages & backdrops installed at national venues",
        },
        {
          number: "100%",
          caption: "In-house fabrication directly at our workshop with zero subcontractors",
        },
        {
          number: "1.000m²",
          caption: "Dedicated woodworking, metal welding & finishing workshop facility",
        },
        {
          number: "24/7",
          caption: "On-site technical crew ready from venue loading to strike-down",
        },
        {
          number: "SNI",
          caption: "Certified hollow steel framing & 18mm plywood built for structural safety",
        },
        {
          number: "CNC",
          caption: "Precision cutting, smooth duco painting & workshop pre-assembly checks",
        },
      ]
    : [
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
    !isEn && stats && stats.length >= 6 && !hasGenericTextStats
      ? stats.slice(0, 6).map((s) => ({
          number: s.number,
          caption: s.label,
        }))
      : defaultTrustStats;

  const headingText = isEn
    ? "Built Directly From Our Own Workshop."
    : settings?.heading && !settings.heading.includes("Dedikasi")
      ? settings.heading
      : "Dikerjakan Langsung dari Workshop Sendiri.";

  const para1Text = isEn
    ? "Maganta Kreasi is an in-house event and exhibition production workshop. We fabricate custom exhibition booths, corporate stages, backdrops, totems, and 3D signage with solid construction and refined finishing."
    : settings?.paragraph1 && !settings.paragraph1.includes("spesialis fabrikasi")
      ? settings.paragraph1
      : "Maganta Kreasi adalah workshop produksi event dan pameran. Kami mengerjakan pembuatan booth pameran, panggung acara, backdrop, hingga totem dan signage dengan konstruksi yang kuat dan finishing rapi.";

  const para2Text = isEn
    ? "Every stage from steel framing, carpentry, and painting to on-site installation and strike-down is handled directly by our in-house crew—never outsourced—so quality and timelines stay guaranteed."
    : settings?.paragraph2 && !settings.paragraph2.includes("Beroperasi dari workshop")
      ? settings.paragraph2
      : "Seluruh proses mulai dari potong rangka, perkayuan, pengecatan, hingga bongkar-pasang di lokasi dikerjakan langsung oleh tim in-house kami sendiri tanpa dilempar ke pihak ketiga, sehingga kualitas dan ketepatan waktu selalu terjaga.";

  return (
    <section id="about" className="bg-white relative z-10 overflow-x-clip">
      {/* Part 1: Full-Bleed Editorial Collage Band (Warm Cream Graph-Paper Canvas) */}
      <div className="relative w-full bg-paper-cream bg-grid-paper overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28">
        {/* Top-Right Torn Pink Paper Corner Scrap */}
        <svg
          className="hidden md:block absolute top-0 right-0 w-36 lg:w-44 h-24 pointer-events-none select-none"
          viewBox="0 0 180 96"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M42 0 H180 V78 L168 72 L156 60 L144 55 L132 45 L118 40 L105 30 L92 26 L78 16 L62 12 L42 0 Z"
            fill="#E04F82"
            fillOpacity="0.65"
          />
          <path
            d="M42 0 L62 12 L78 16 L92 26 L105 30 L118 40 L132 45 L144 55 L156 60 L168 72 L180 78"
            stroke="#FAF6EE"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Bottom-Left Torn Blue Grid Paper Corner Scrap */}
        <svg
          className="hidden md:block absolute bottom-0 left-0 w-32 lg:w-40 h-20 pointer-events-none select-none"
          viewBox="0 0 160 80"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 18 L18 22 L34 32 L52 36 L72 48 L92 54 L112 66 L132 72 L148 80 H0 V18 Z"
            fill="#6096BA"
            fillOpacity="0.55"
          />
          <path
            d="M0 18 L18 22 L34 32 L52 36 L72 48 L92 54 L112 66 L132 72 L148 80"
            stroke="#FAF6EE"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Bottom-Right Torn Kraft Paper Strip */}
        <svg
          className="hidden md:block absolute bottom-0 right-0 w-72 lg:w-96 h-20 pointer-events-none select-none"
          viewBox="0 0 380 80"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 80 L45 72 L78 68 L112 58 L148 54 L182 44 L218 42 L254 30 L292 26 L332 16 L362 10 L380 4 V80 H12 Z"
            fill="#DFCBB0"
            fillOpacity="0.82"
          />
          <path
            d="M12 80 L45 72 L78 68 L112 58 L148 54 L182 44 L218 42 L254 30 L292 26 L332 16 L362 10 L380 4"
            stroke="#FAF6EE"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Top-Left Isometric Booth Wireframe Sketch */}
        <svg
          className="hidden lg:block absolute top-8 left-[4%] w-28 h-24 text-zinc-800/75 pointer-events-none select-none"
          viewBox="0 0 120 100"
          fill="none"
          aria-hidden="true"
        >
          <path d="M18 34 L62 18 L104 28 L60 44 Z" stroke="currentColor" strokeWidth="1.3" />
          <path d="M18 34 V78 L60 90 V44" stroke="currentColor" strokeWidth="1.3" />
          <path d="M104 28 V72 L60 90" stroke="currentColor" strokeWidth="1.3" />
          <path d="M62 18 V62 L18 78 M62 62 L104 72" stroke="currentColor" strokeWidth="0.9" strokeDasharray="3 3" />
          <path d="M40 26 V84 M82 36 V81" stroke="currentColor" strokeWidth="1" />
          <path d="M10 78 L112 72" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
        </svg>

        {/* Mid-Left Diagonal Ruler Sketch */}
        <svg
          className="hidden lg:block absolute top-[45%] left-[3%] w-16 h-28 text-zinc-800/70 pointer-events-none select-none -rotate-12"
          viewBox="0 0 60 120"
          fill="none"
          aria-hidden="true"
        >
          <rect x="20" y="6" width="18" height="108" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          {[18, 28, 38, 48, 58, 68, 78, 88, 98].map((y, idx) => (
            <line
              key={y}
              x1="20"
              y1={y}
              x2={idx % 2 === 0 ? "30" : "26"}
              y2={y}
              stroke="currentColor"
              strokeWidth="1.1"
            />
          ))}
        </svg>

        {/* Bottom-Left Rolled Blueprint Tubes Sketch */}
        <svg
          className="hidden lg:block absolute bottom-10 left-[5%] w-36 h-24 text-zinc-800/75 pointer-events-none select-none"
          viewBox="0 0 150 96"
          fill="none"
          aria-hidden="true"
        >
          {/* Back roll */}
          <path d="M56 34 L128 60 C134 62 132 76 124 75 L52 49" fill="#FAF6EE" stroke="currentColor" strokeWidth="1.3" />
          <ellipse cx="54" cy="41.5" rx="6" ry="8" transform="rotate(-18 54 41.5)" fill="#FAF6EE" stroke="currentColor" strokeWidth="1.3" />
          <path d="M54 39 C56 39 57 42 54 44" stroke="currentColor" strokeWidth="1" />
          {/* Front roll */}
          <path d="M18 42 L106 74 C112 76 110 90 101 89 L14 57" fill="#FAF6EE" stroke="currentColor" strokeWidth="1.3" />
          <ellipse cx="16" cy="49.5" rx="6.5" ry="8.5" transform="rotate(-18 16 49.5)" fill="#FAF6EE" stroke="currentColor" strokeWidth="1.3" />
          <path d="M16 47 C18.5 47 19.5 50.5 16 52.5" stroke="currentColor" strokeWidth="1" />
          <path d="M28 53 L94 77" stroke="currentColor" strokeWidth="0.9" opacity="0.55" />
        </svg>

        {/* Top-Center Floating Cloud Cutout */}
        <div
          className="hidden lg:block absolute top-5 left-[44%] w-28 h-14 pointer-events-none select-none opacity-85"
          aria-hidden="true"
        >
          <Image
            src="/images/collage-cloud-v2.png"
            alt=""
            fill
            unoptimized
            sizes="112px"
            className="object-contain"
          />
        </div>

        {/* Top-Right Magenta Sun + Tiny Clock + Cloud Shadow */}
        <div
          className="hidden lg:block absolute top-6 right-[18%] w-28 h-28 pointer-events-none select-none"
          aria-hidden="true"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-brand-magenta/85 shadow-sm" />
            <svg
              className="absolute -top-1 w-9 h-9 text-zinc-900"
              viewBox="0 0 40 40"
              fill="none"
            >
              <circle cx="20" cy="20" r="14" fill="#FAF6EE" fillOpacity="0.9" stroke="currentColor" strokeWidth="1.4" />
              <path d="M20 12 V20 L25 23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <div className="absolute -bottom-3 w-28 h-12">
              <Image
                src="/images/collage-cloud-v2.png"
                alt=""
                fill
                unoptimized
                sizes="112px"
                className="object-contain opacity-75"
              />
            </div>
          </div>
        </div>

        {/* Mid-Right Vernier Caliper Measurement Tool Sketch */}
        <svg
          className="hidden lg:block absolute top-[44%] right-[3%] w-24 h-24 text-zinc-800/75 pointer-events-none select-none"
          viewBox="0 0 110 100"
          fill="none"
          aria-hidden="true"
        >
          <g transform="rotate(28 55 50)">
            <rect x="26" y="42" width="84" height="10" rx="1" fill="#FAF6EE" stroke="currentColor" strokeWidth="1.3" />
            <path d="M26 42 L14 22 L20 20 L34 42 Z" fill="#FAF6EE" stroke="currentColor" strokeWidth="1.3" />
            <path d="M26 52 L10 74 L17 76 L34 52 Z" fill="#FAF6EE" stroke="currentColor" strokeWidth="1.3" />
            <path d="M48 42 L38 24 L44 22 L56 42 Z" fill="#FAF6EE" stroke="currentColor" strokeWidth="1.3" />
            <path d="M48 52 L36 72 L43 74 L56 52 Z" fill="#FAF6EE" stroke="currentColor" strokeWidth="1.3" />
            {[36, 44, 52, 60, 68, 76, 84, 92, 100].map((x) => (
              <line key={x} x1={x} y1="42" x2={x} y2="46" stroke="currentColor" strokeWidth="0.9" />
            ))}
          </g>
        </svg>

        {/* Bottom-Center Soft Floating Cloud */}
        <div
          className="hidden lg:block absolute bottom-6 left-[35%] w-28 h-14 pointer-events-none select-none opacity-80"
          aria-hidden="true"
        >
          <Image
            src="/images/collage-cloud-v2.png"
            alt=""
            fill
            unoptimized
            sizes="112px"
            className="object-contain"
          />
        </div>

        {/* Bottom-Right Halftone Pointing Hand Cutout */}
        <div
          className="hidden lg:block absolute bottom-3 right-[3%] w-32 h-32 pointer-events-none select-none"
          aria-hidden="true"
        >
          <Image
            src="/images/collage-hand-v2.png"
            alt=""
            fill
            unoptimized
            sizes="128px"
            className="object-contain"
          />
        </div>

        {/* Delicate Sweeping Ink Thread Line */}
        <svg
          className="hidden lg:block absolute bottom-10 left-[46%] w-[37%] h-12 pointer-events-none select-none"
          viewBox="0 0 420 56"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 4 10 Q 130 48 260 36 T 414 26"
            stroke="#18181b"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
        </svg>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-10">
            {/* Left: Hand-Cut Halftone Editorial Collage */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[440px] sm:max-w-[500px] lg:max-w-[520px]">
                <Image
                  src="/images/collage-editorial-v3.png"
                  alt="Kolase editorial proses fabrikasi workshop Maganta Kreasi"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right: Clean Editorial Copy */}
            <div className="lg:col-span-6 lg:pr-12 lg:pl-4 flex flex-col justify-center">
              <div className="mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-magenta">
                  {isEn ? "About Our Workshop" : "Tentang Workshop Kami"}
                </span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-zinc-950 tracking-tight leading-[1.12] mb-5">
                {headingText}
              </h2>

              <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed max-w-xl">
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

      {/* Part 2: Full-Bleed Maganta Magenta 3x2 Trust Block (Matching Contact Palette: Magenta + White + Yellow) */}
      <div className="w-full bg-brand-magenta text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] max-w-2xl mx-auto">
            {isEn ? (
              <>
                Trusted by brands big
                <br className="hidden sm:inline" /> and small across{" "}
                <span className="text-brand-yellow">Indonesia.</span>
              </>
            ) : (
              <>
                Dipercaya brand besar
                <br className="hidden sm:inline" /> dan kecil di{" "}
                <span className="text-brand-yellow">Indonesia.</span>
              </>
            )}
          </h2>

          <div className="mt-6">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand-yellow text-brand-dark text-sm font-bold hover:bg-white transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-4 focus-visible:ring-offset-brand-magenta active:opacity-90"
            >
              {isEn ? "Contact Our Team" : "Hubungi Tim Kami"}
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
