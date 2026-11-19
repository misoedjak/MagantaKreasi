"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  bgImageUrl?: string | null;
}

interface ServicesProps {
  categories?: CategoryItem[];
}

interface CuratedServiceMeta {
  description: string;
  fallbackBg: string;
  posterImage: string;
  projectCaption: string;
  shortTag: string;
}

function getCuratedServiceMeta(slug: string, fallbackDesc?: string | null): CuratedServiceMeta {
  const lower = slug.toLowerCase();

  if (lower.includes("branding")) {
    return {
      description:
        "Area registrasi, foyer, dan titik aktivasi brand dengan konstruksi rapi sesuai identitas acara.",
      fallbackBg: "/uploads/backgrounds/ai_branding.jpg",
      posterImage: "/uploads/portfolio/musrenbangnas-2024.jpg",
      projectCaption: "Musrenbangnas Bappenas RI",
      shortTag: "EVENT BRANDING",
    };
  }
  if (lower.includes("booth")) {
    return {
      description:
        "Produksi booth pameran custom mulai dari rangka kayu, besi, finishing cat duco/HPL, hingga kelistrikan.",
      fallbackBg: "/uploads/backgrounds/ai_booth.jpg",
      posterImage: "/uploads/portfolio/inbody-isfex-2024-reel.jpg",
      projectCaption: "InBody Indonesia (ISFEX)",
      shortTag: "CUSTOM BOOTH",
    };
  }
  if (lower.includes("stage") || lower.includes("panggung")) {
    return {
      description:
        "Pembuatan panggung acara korporat, konferensi, hingga panggung utama dengan struktur kokoh.",
      fallbackBg: "/uploads/backgrounds/ai_stage.jpg",
      posterImage: "/uploads/portfolio/astra-agro-36-setup-reel.jpg",
      projectCaption: "HUT PT Astra Agro Lestari",
      shortTag: "STAGE BUILD",
    };
  }
  if (lower.includes("decorative") || lower.includes("installation")) {
    return {
      description:
        "Instalasi dekorasi tematik 3D, rumah instalasi, dan elemen visual custom untuk mall maupun venue acara.",
      fallbackBg: "/uploads/backgrounds/ai_decor.jpg",
      posterImage: "/uploads/portfolio/christmas-symphony-bxcmall.jpg",
      projectCaption: "Christmas Symphony BXC Mall",
      shortTag: "3D DECORATION",
    };
  }
  if (lower.includes("gate") || lower.includes("gerbang")) {
    return {
      description:
        "Gerbang masuk utama (main gate) dan fasad sambutan dengan struktur aman untuk indoor maupun outdoor.",
      fallbackBg: "/uploads/backgrounds/ai_gate.jpg",
      posterImage: "/uploads/portfolio/iims-2026-gate.jpg",
      projectCaption: "IIMS Pertamax Gokart",
      shortTag: "MAIN GATE",
    };
  }
  if (lower.includes("backdrop")) {
    return {
      description:
        "Backdrop panggung, photowall, dan media wall dengan rangka presisi serta hasil visual yang rata dan rapi.",
      fallbackBg: "/uploads/backgrounds/ai_backdrop.jpg",
      posterImage: "/uploads/portfolio/spark-ibf-summit.jpg",
      projectCaption: "Spark IBF Summit",
      shortTag: "BACKDROP WALL",
    };
  }
  if (lower.includes("festival")) {
    return {
      description:
        "Dekorasi panggung festival, area konser, dan instalasi visual skala besar di ruang terbuka.",
      fallbackBg: "/uploads/backgrounds/ai_festival.jpg",
      posterImage: "/uploads/portfolio/uimf-2026.jpg",
      projectCaption: "The 13th UI Music Fair",
      shortTag: "FESTIVAL AREA",
    };
  }
  if (lower.includes("totem") || lower.includes("sign")) {
    return {
      description:
        "Totem penunjuk arah (wayfinding), huruf timbul 3D, dan signage area untuk navigasi pengunjung.",
      fallbackBg: "/uploads/backgrounds/ai_totem.jpg",
      posterImage: "/uploads/portfolio/cedea-20th-anniversary-reel.jpg",
      projectCaption: "CEDEA 20th Anniversary",
      shortTag: "3D SIGNAGE",
    };
  }

  return {
    description:
      fallbackDesc ||
      "Pengerjaan konstruksi dan dekorasi event langsung dari workshop in-house kami.",
    fallbackBg: "/uploads/backgrounds/ai_stage.jpg",
    posterImage: "/uploads/portfolio/cedea-20th-anniversary-reel.jpg",
    projectCaption: "Workshop Maganta Kreasi",
    shortTag: "IN-HOUSE BUILD",
  };
}

// Maganta Kreasi brand color palette for the staggered poster strip
const POSTER_THEMES = [
  {
    bg: "bg-brand-magenta",
    text: "text-white",
    muted: "text-white/80",
    divider: "border-white/20",
  },
  {
    bg: "bg-brand-yellow",
    text: "text-brand-dark",
    muted: "text-brand-dark/75",
    divider: "border-brand-dark/15",
  },
  {
    bg: "bg-paper-cream",
    text: "text-brand-dark",
    muted: "text-brand-dark/70",
    divider: "border-brand-dark/12",
  },
  {
    bg: "bg-[#E04F82]",
    text: "text-white",
    muted: "text-white/85",
    divider: "border-white/20",
  },
  {
    bg: "bg-[#F06449]",
    text: "text-white",
    muted: "text-white/85",
    divider: "border-white/20",
  },
];

export default function Services({ categories = [] }: ServicesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        el.scrollLeft += e.deltaX;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = el.clientWidth * 0.72;
    el.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-white border-t border-zinc-200/80 relative overflow-hidden"
      suppressHydrationWarning
    >
      {/* Stacked Two-Line Editorial Header matching the staggered poster reference */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 mb-14 md:mb-16">
        <div className="flex flex-col items-center">
          <div className="inline-flex flex-col items-start">
            <h2 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-950 leading-[0.94] uppercase">
              <span className="block">Cakupan</span>
              <span className="flex flex-wrap items-end gap-x-4 sm:gap-x-6 mt-1">
                <span>Produksi</span>
                <span className="font-sans text-xs sm:text-[13px] font-medium normal-case tracking-normal text-zinc-600 leading-tight pb-1.5 sm:pb-2.5 max-w-[180px]">
                  Apa saja yang
                  <br />
                  kami kerjakan.
                </span>
              </span>
            </h2>
          </div>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="py-12 text-center text-zinc-500 border border-dashed border-zinc-300 rounded-2xl">
            Belum ada kategori layanan.
          </div>
        </div>
      ) : (
        <div className="relative max-w-[1440px] mx-auto">
          {/* Desktop Left Arrow */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Geser cakupan produksi ke kiri"
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/95 border border-zinc-200 text-zinc-800 hover:border-brand-magenta hover:text-brand-magenta shadow-sm absolute left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 active:scale-95"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          {/* Horizontally Scrollable Staggered Vertical Poster Strip */}
          <div
            ref={scrollRef}
            style={{ touchAction: "pan-x pan-y" }}
            className="flex items-start gap-5 sm:gap-6 overflow-x-auto overscroll-x-none scrollbar-none px-6 md:px-14 pb-6 pt-2"
          >
            {categories.map((category, idx) => {
              const theme = POSTER_THEMES[idx % POSTER_THEMES.length];
              const meta = getCuratedServiceMeta(category.slug, category.description);
              const posterImage = category.bgImageUrl || meta.posterImage || meta.fallbackBg;
              const isLower = idx % 2 === 0;
              const indexLabel = String(idx + 1).padStart(2, "0");

              return (
                <Link
                  key={category.id}
                  href={`/portfolio?category=${category.slug}`}
                  aria-label={`Lihat portofolio ${category.name}`}
                  className={`group relative overflow-hidden shrink-0 w-[230px] sm:w-[260px] aspect-[3/4] ${theme.bg} p-5 flex flex-col motion-safe:transition-[translate] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-4 active:opacity-95 ${
                    isLower ? "mt-7 sm:mt-10" : "mt-0"
                  }`}
                >
                  {/* Top Editorial Poster Header */}
                  <div className="flex items-center justify-between gap-2 shrink-0">
                    <span className={`font-mono text-[11px] font-semibold tracking-wide ${theme.muted}`}>
                      {indexLabel} / {meta.shortTag}
                    </span>
                    <ArrowUpRight
                      size={15}
                      aria-hidden="true"
                      className={`${theme.text} shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5`}
                    />
                  </div>

                  {/* Center Framed Workshop / Production Visual */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-900/10 mt-3.5 shrink-0">
                    <Image
                      src={posterImage}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 230px, 260px"
                      className="object-cover"
                    />
                  </div>

                  {/* Single Bottom Panel: glides smoothly upward & back down via GPU translate on hover/focus */}
                  <div
                    className={`absolute inset-x-0 bottom-0 z-10 px-5 pt-3 pb-7 ${theme.bg} will-change-transform translate-y-[calc(100%-6.625rem)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-safe:transition-[translate] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]`}
                  >
                    <div className={`pt-2.5 border-t ${theme.divider}`}>
                      <h3 className={`font-sans text-base font-bold leading-[22px] tracking-tight truncate ${theme.text}`}>
                        {category.name}
                      </h3>
                      <p className={`mt-1.5 text-xs leading-[18px] ${theme.muted}`}>
                        {meta.description}
                      </p>
                      <span className={`mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold ${theme.text}`}>
                        Lihat portofolio
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </span>
                    </div>
                  </div>

                  {/* Clean 20px bottom frame bar matching card padding so resting preview never clips mid-line */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-5 z-20 pointer-events-none ${theme.bg}`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Arrow */}
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Geser cakupan produksi ke kanan"
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/95 border border-zinc-200 text-zinc-800 hover:border-brand-magenta hover:text-brand-magenta shadow-sm absolute right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 active:scale-95"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
