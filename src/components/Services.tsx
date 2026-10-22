"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Volume2, VolumeX, Play, Pause } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  videoUrl: string;
  posterImage: string;
  projectCaption: string;
}

function getCuratedServiceMeta(slug: string, fallbackDesc?: string | null): CuratedServiceMeta {
  const lower = slug.toLowerCase();

  if (lower.includes("branding")) {
    return {
      description:
        "Area registrasi, foyer, dan titik aktivasi brand dengan konstruksi rapi sesuai identitas acara.",
      fallbackBg: "/uploads/backgrounds/ai_branding.jpg",
      videoUrl: "/uploads/portfolio/musrenbangnas-2024.mp4",
      posterImage: "/uploads/portfolio/musrenbangnas-2024.jpg",
      projectCaption: "Area Branding PPD Hub — Musrenbangnas Bappenas RI",
    };
  }
  if (lower.includes("booth")) {
    return {
      description:
        "Produksi booth pameran custom mulai dari rangka kayu, besi, finishing cat duco/HPL, hingga kelistrikan.",
      fallbackBg: "/uploads/backgrounds/ai_booth.jpg",
      videoUrl: "/uploads/portfolio/inbody-isfex-2024-reel.mp4",
      posterImage: "/uploads/portfolio/inbody-isfex-2024-reel.jpg",
      projectCaption: "Custom Exhibition Booth — InBody Indonesia (ISFEX)",
    };
  }
  if (lower.includes("stage") || lower.includes("panggung")) {
    return {
      description:
        "Pembuatan panggung acara korporat, konferensi, hingga panggung utama dengan struktur kokoh.",
      fallbackBg: "/uploads/backgrounds/ai_stage.jpg",
      videoUrl: "/uploads/portfolio/astra-agro-36-setup-reel.mp4",
      posterImage: "/uploads/portfolio/astra-agro-36-setup-reel.jpg",
      projectCaption: "Custom Stage & Setup — HUT PT Astra Agro Lestari",
    };
  }
  if (lower.includes("decorative") || lower.includes("installation")) {
    return {
      description:
        "Instalasi dekorasi tematik 3D, rumah instalasi, dan elemen visual custom untuk mall maupun venue acara.",
      fallbackBg: "/uploads/backgrounds/ai_decor.jpg",
      videoUrl: "/uploads/portfolio/christmas-symphony-bxcmall.mp4",
      posterImage: "/uploads/portfolio/christmas-symphony-bxcmall.jpg",
      projectCaption: "Decorative Installation — Christmas Symphony BXC Mall",
    };
  }
  if (lower.includes("gate") || lower.includes("gerbang")) {
    return {
      description:
        "Gerbang masuk utama (main gate) dan fasad sambutan dengan struktur aman untuk indoor maupun outdoor.",
      fallbackBg: "/uploads/backgrounds/ai_gate.jpg",
      videoUrl: "/uploads/portfolio/iims-2026-gate.mp4",
      posterImage: "/uploads/portfolio/iims-2026-gate.jpg",
      projectCaption: "Entrance Gate & Signage — IIMS Pertamax Gokart",
    };
  }
  if (lower.includes("backdrop")) {
    return {
      description:
        "Backdrop panggung, photowall, dan media wall dengan rangka presisi serta hasil visual yang rata dan rapi.",
      fallbackBg: "/uploads/backgrounds/ai_backdrop.jpg",
      videoUrl: "/uploads/portfolio/spark-ibf-summit.mp4",
      posterImage: "/uploads/portfolio/spark-ibf-summit.jpg",
      projectCaption: "Event Backdrop & Stage — Spark IBF Summit",
    };
  }
  if (lower.includes("festival")) {
    return {
      description:
        "Dekorasi panggung festival, area konser, dan instalasi visual skala besar di ruang terbuka.",
      fallbackBg: "/uploads/backgrounds/ai_festival.jpg",
      videoUrl: "/uploads/portfolio/uimf-2026.mp4",
      posterImage: "/uploads/portfolio/uimf-2026.jpg",
      projectCaption: "Festival Stage & Gate — The 13th UI Music Fair",
    };
  }
  if (lower.includes("totem") || lower.includes("sign")) {
    return {
      description:
        "Totem penunjuk arah (wayfinding), huruf timbul 3D, dan signage area untuk navigasi pengunjung.",
      fallbackBg: "/uploads/backgrounds/ai_totem.jpg",
      videoUrl: "/uploads/portfolio/cedea-20th-anniversary-reel.mp4",
      posterImage: "/uploads/portfolio/cedea-20th-anniversary-reel.jpg",
      projectCaption: "Totem & 3D Signage — CEDEA 20th Anniversary",
    };
  }

  return {
    description:
      fallbackDesc ||
      "Pengerjaan konstruksi dan dekorasi event langsung dari workshop in-house kami.",
    fallbackBg: "/uploads/backgrounds/ai_stage.jpg",
    videoUrl: "/uploads/portfolio/cedea-20th-anniversary-reel.mp4",
    posterImage: "/uploads/portfolio/cedea-20th-anniversary-reel.jpg",
    projectCaption: "Dokumentasi Proyek Maganta Kreasi",
  };
}

export default function Services({ categories = [] }: ServicesProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeCategory = categories[activeIdx] || categories[0];
  const activeMeta = activeCategory
    ? getCuratedServiceMeta(activeCategory.slug, activeCategory.description)
    : null;

  // Respect system reduced-motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        setIsPlaying(false);
      }
    }
  }, []);

  // Clean up debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeMeta?.videoUrl) return;

    if (isPlaying) {
      video.currentTime = 0;
      video.muted = isMuted;
      video.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [activeIdx, activeMeta?.videoUrl, isPlaying, isMuted]);

  const handleMouseEnter = (idx: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveIdx(idx);
    }, 100);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !isMuted;
    setIsMuted(next);
    if (videoRef.current) {
      videoRef.current.muted = next;
    }
  };

  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-white border-t border-zinc-200/80"
      suppressHydrationWarning
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Editorial Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10 border-b border-zinc-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-magenta block mb-2.5">
              Cakupan Produksi
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 leading-[1.12]">
              Apa Saja yang Kami Kerjakan.
            </h2>
          </div>

          <p className="text-zinc-600 text-sm sm:text-base max-w-md leading-relaxed">
            Mulai dari kebutuhan pameran satu booth hingga konstruksi panggung
            dan dekorasi satu venue penuh.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="py-12 text-center text-zinc-500 border border-dashed border-zinc-300 rounded-2xl mt-8">
            Belum ada kategori layanan.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-8 items-start">
            {/* Left Column (7 cols): Numbered List where Each Part Has Its Matching Background */}
            <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col gap-3">
              {categories.map((category, idx) => {
                const isActive = idx === activeIdx;
                const meta = getCuratedServiceMeta(category.slug, category.description);
                const bgImage = category.bgImageUrl || meta.fallbackBg;
                const indexLabel = String(idx + 1).padStart(2, "0");

                return (
                  <div
                    key={category.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveIdx(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveIdx(idx);
                      }
                    }}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={handleMouseLeave}
                    onFocus={() => setActiveIdx(idx)}
                    aria-pressed={isActive}
                    aria-label={`Pilih kategori ${category.name}`}
                    className={`group relative overflow-hidden rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 transition-all border cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-brand-yellow ${
                      isActive
                        ? "border-brand-yellow/80 ring-2 ring-brand-yellow/25 shadow-lg shadow-black/20"
                        : "border-white/10 hover:border-brand-yellow/50"
                    }`}
                  >
                    {/* Matching Background Image on Each Part */}
                    <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950 pointer-events-none">
                      <Image
                        src={bgImage}
                        alt={category.name}
                        fill
                        sizes="(max-width: 1024px) 92vw, 620px"
                        className={`object-cover transition-transform duration-500 ${
                          isActive ? "scale-105" : "scale-100 group-hover:scale-105"
                        }`}
                      />
                      {/* Asymmetric Directional Scrim: Pitch black on left (text zone), transparent on right (photo showcase) */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-black/95 via-black/80 via-45% to-black/15"
                            : "bg-gradient-to-r from-black/90 via-black/75 via-45% to-black/20 group-hover:from-black/90 group-hover:via-black/70 group-hover:via-45% group-hover:to-black/10"
                        }`}
                      />
                    </div>

                    <div className="relative z-10 flex items-baseline gap-4 min-w-0 flex-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pointer-events-none">
                      <span
                        className={`text-xs font-bold tabular-nums shrink-0 transition-colors ${
                          isActive
                            ? "text-brand-yellow"
                            : "text-white/60 group-hover:text-brand-yellow"
                        }`}
                      >
                        {indexLabel}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3
                          className={`font-heading text-base sm:text-lg font-bold tracking-tight transition-colors ${
                            isActive
                              ? "text-brand-yellow"
                              : "text-white group-hover:text-brand-yellow"
                          }`}
                        >
                          {category.name}
                        </h3>

                        <p className="text-xs sm:text-sm leading-relaxed mt-1 text-white/90">
                          {meta.description}
                        </p>
                      </div>
                    </div>

                    {/* Dedicated Direct Action Button to Portfolio */}
                    <Link
                      href={`/portfolio?category=${category.slug}`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      aria-label={`Lihat portofolio ${category.name}`}
                      title={`Lihat portofolio ${category.name}`}
                      className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-white ${
                        isActive
                          ? "bg-brand-yellow text-brand-dark shadow-md"
                          : "bg-white/15 backdrop-blur-sm border border-white/20 text-white hover:bg-brand-yellow hover:text-brand-dark hover:border-brand-yellow"
                      }`}
                    >
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Right Column (5 cols): Sticky Live Video Showcase for the Active Service */}
            {activeCategory && activeMeta && (
              <div className="order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-24">
                <div className="relative aspect-video sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-200 shadow-lg group/preview">
                  <Image
                    key={activeMeta.posterImage}
                    src={activeMeta.posterImage}
                    alt={activeMeta.projectCaption}
                    fill
                    sizes="(max-width: 1024px) 92vw, 440px"
                    className="object-cover opacity-60"
                  />

                  <video
                    key={activeMeta.videoUrl}
                    ref={videoRef}
                    src={activeMeta.videoUrl}
                    poster={activeMeta.posterImage}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent z-20 pointer-events-none" />

                  {/* 44x44px Touch-Compliant Video Controls */}
                  <div className="absolute top-3.5 right-3.5 z-30 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={togglePlayPause}
                      aria-label={isPlaying ? "Jeda video" : "Putar video"}
                      className="w-11 h-11 rounded-full bg-black/60 hover:bg-brand-yellow hover:text-brand-dark backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause size={16} aria-hidden="true" />
                      ) : (
                        <Play size={16} className="fill-current ml-0.5" aria-hidden="true" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? "Nyalakan suara" : "Matikan suara"}
                      className="w-11 h-11 rounded-full bg-black/60 hover:bg-brand-yellow hover:text-brand-dark backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      {isMuted ? (
                        <VolumeX size={16} aria-hidden="true" />
                      ) : (
                        <Volume2 size={16} className="text-brand-yellow" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  {/* Bottom Caption & Action Link */}
                  <div className="absolute inset-x-0 bottom-0 z-30 p-5 sm:p-6 flex items-end justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-yellow block mb-1">
                        {activeCategory.name}
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-white/95 leading-snug">
                        {activeMeta.projectCaption}
                      </p>
                    </div>

                    <Link
                      href={`/portfolio?category=${activeCategory.slug}`}
                      className="px-3.5 py-2 rounded-full bg-white text-zinc-950 text-xs font-semibold shrink-0 hover:bg-brand-yellow transition-colors"
                    >
                      Lihat Proyek
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
