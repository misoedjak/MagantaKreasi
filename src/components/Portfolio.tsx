"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { ArrowRight, ArrowUpRight, FolderOpen, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface PortfolioImage {
  id: string;
  url: string;
  order: number;
}

interface PortfolioCategoryItem {
  id: string;
  name: string;
  slug?: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  categoryId?: string | null;
  category?: { id: string; name: string } | null;
  categories?: PortfolioCategoryItem[];
  thumbnail: string;
  videoUrl?: string | null;
  featured: boolean;
  images: PortfolioImage[];
}

interface PortfolioProps {
  initialPortfolios: PortfolioItem[];
  categories: { id: string; name: string; slug: string }[];
  layoutMode?: "grid" | "carousel";
  hideHeader?: boolean;
}

function PortfolioCard({
  project,
  idx,
  isVideoFile,
  featuredWide = false,
}: {
  project: PortfolioItem;
  idx: number;
  isVideoFile: (url?: string | null) => boolean;
  featuredWide?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoSource =
    project.videoUrl || (isVideoFile(project.thumbnail) ? project.thumbnail : null);
  let thumbImage =
    project.thumbnail && !isVideoFile(project.thumbnail)
      ? project.thumbnail
      : project.images[0]?.url || project.thumbnail;

  if (project.slug === "cedea-20th-anniversary-behind-the-build") {
    thumbImage = "/uploads/portfolio/cedea-20th-anniversary/photo-6.jpg";
  }

  const displayTitle = project.title.replace(/^\[.*?\]\s*/, "");
  const primaryCategory =
    project.categories && project.categories.length > 0
      ? project.categories[0].name
      : project.category
        ? project.category.name
        : null;
  const indexLabel = String(idx + 1).padStart(2, "0");

  const startPlayback = () => {
    if (!videoSource) return;
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const pausePlayback = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.25) }}
      className="group flex flex-col w-full"
      onMouseEnter={startPlayback}
      onMouseLeave={pausePlayback}
      onFocus={startPlayback}
      onBlur={pausePlayback}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        aria-label={`Lihat detail proyek ${displayTitle}`}
        className="flex flex-col flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-4 active:opacity-90"
      >
        {/* Sharp Unobstructed Editorial Media Frame */}
        <div
          className={`relative w-full overflow-hidden bg-zinc-950 ${
            featuredWide ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={thumbImage}
            alt={displayTitle}
            fill
            sizes={
              featuredWide
                ? "(max-width: 1024px) 100vw, 50vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            }
            className={`object-cover transition-opacity duration-300 ${
              isPlaying && videoSource ? "opacity-0" : "opacity-100"
            }`}
          />

          {videoSource && (
            <video
              ref={videoRef}
              src={videoSource}
              loop
              muted
              playsInline
              preload="none"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isPlaying ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Minimal Corner Reel Cue — fades out cleanly once video plays */}
          {videoSource && (
            <div
              className={`absolute bottom-3 right-3 z-10 w-8 h-8 bg-white/95 text-zinc-950 flex items-center justify-center transition-opacity duration-200 pointer-events-none ${
                isPlaying ? "opacity-0" : "opacity-100"
              }`}
              aria-hidden="true"
            >
              <Play size={12} className="fill-current ml-0.5" />
            </div>
          )}
        </div>

        {/* Clean Editorial Metadata Underneath Frame */}
        <div className="pt-3.5 mt-3.5 border-t border-zinc-200 group-hover:border-brand-magenta transition-colors duration-200 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`font-sans font-bold text-zinc-950 group-hover:text-brand-magenta transition-colors duration-200 tracking-tight leading-snug line-clamp-2 ${
                featuredWide ? "text-base sm:text-xl" : "text-sm sm:text-base"
              }`}
            >
              {displayTitle}
            </h3>
            <ArrowUpRight
              size={15}
              aria-hidden="true"
              className="shrink-0 mt-1 text-zinc-400 group-hover:text-brand-magenta motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
            />
          </div>

          {project.client && (
            <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
              {project.client}
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

export default function Portfolio({
  initialPortfolios,
  categories,
  layoutMode = "grid",
  hideHeader = false,
}: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const { lang } = useLanguage();
  const isEn = lang === "en";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get("category");
      if (categoryParam) {
        const match = categories.find(
          (c) =>
            c.slug.toLowerCase() === categoryParam.toLowerCase() || c.id === categoryParam
        );
        if (match) {
          setActiveFilter(match.id);
          const el = document.getElementById("portfolio");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    }
  }, [categories]);

  const isVideoFile = (url?: string | null) => {
    if (!url) return false;
    return url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".mov");
  };

  const filteredProjects =
    activeFilter === "Semua"
      ? initialPortfolios
      : initialPortfolios.filter((p) => p.categoryId === activeFilter);

  const videoPortfolios = initialPortfolios.filter(
    (p) => isVideoFile(p.videoUrl) || isVideoFile(p.thumbnail)
  );

  const preferredVideoOrder = [
    "the-13th-ui-music-fair-stage-fabrication",
    "christmas-symphony-recap-bxc-mall",
    "inbody-indonesia-isfex-2024-recap",
    "cedea-20th-anniversary-behind-the-build",
    "hut-astra-agro-lestari-36-setup",
    "behind-the-booth-fast-track-installation",
  ];

  const sortedVideos = [...videoPortfolios].sort((a, b) => {
    const idxA = preferredVideoOrder.indexOf(a.slug);
    const idxB = preferredVideoOrder.indexOf(b.slug);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return 0;
  });

  const projectsToRender =
    layoutMode === "carousel"
      ? sortedVideos.length >= 6
        ? sortedVideos.slice(0, 6)
        : initialPortfolios.slice(0, 6)
      : filteredProjects;

  const sectionPadding =
    layoutMode === "carousel" ? "py-20 md:py-28" : "pt-6 pb-16 md:pt-10 md:pb-24";

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="portfolio"
        className={`bg-white border-t border-zinc-200/80 overflow-hidden ${sectionPadding}`}
        suppressHydrationWarning
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          {/* Centered Editorial Header */}
          <div className="flex flex-col items-center mb-10 md:mb-14 gap-6">
            {!hideHeader && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-2xl mx-auto"
              >
                <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.12]">
                  {isEn ? (
                    <>
                      Our{" "}
                      <span className="font-script font-normal text-brand-magenta text-4xl sm:text-5xl lg:text-[3.75rem] tracking-normal inline-block">
                        portfolio.
                      </span>
                    </>
                  ) : (
                    <>
                      Portofolio{" "}
                      <span className="font-script font-normal text-brand-magenta text-4xl sm:text-5xl lg:text-[3.75rem] tracking-normal inline-block">
                        kami.
                      </span>
                    </>
                  )}
                </h2>
              </motion.div>
            )}

            {/* Category Filters - Wrapped cleanly with zero horizontal clipping */}
            {layoutMode === "grid" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto"
              >
                <button
                  type="button"
                  onClick={() => setActiveFilter("Semua")}
                  className={`min-h-[40px] px-4 py-2 text-xs sm:text-sm font-semibold transition-colors shrink-0 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 ${
                    activeFilter === "Semua"
                      ? "bg-zinc-950 text-white border-zinc-950"
                      : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-900 hover:text-zinc-950"
                  }`}
                >
                  {isEn ? "All" : "Semua"}
                </button>
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`min-h-[40px] px-4 py-2 text-xs sm:text-sm font-semibold transition-colors shrink-0 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 ${
                      activeFilter === cat.id
                        ? "bg-zinc-950 text-white border-zinc-950"
                        : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-900 hover:text-zinc-950"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Portfolios Display */}
          {projectsToRender.length === 0 ? (
            <div className="py-12 text-center text-zinc-600 flex flex-col items-center gap-2 border border-dashed border-zinc-300">
              <FolderOpen className="h-8 w-8 text-zinc-500" aria-hidden="true" />
              <p className="text-sm">
                Belum ada proyek portofolio yang dipublikasikan dalam kategori ini.
              </p>
            </div>
          ) : layoutMode === "carousel" ? (
            /* Editorial 2-Wide Hero Reels + 4-Column Showcase Row */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 md:gap-x-7 md:gap-y-12">
              {projectsToRender.map((project, idx) => {
                const isFeaturedWide = idx < 2;
                return (
                  <div
                    key={project.id}
                    className={isFeaturedWide ? "sm:col-span-1 lg:col-span-6" : "sm:col-span-1 lg:col-span-3"}
                  >
                    <PortfolioCard
                      project={project}
                      idx={idx}
                      isVideoFile={isVideoFile}
                      featuredWide={isFeaturedWide}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 md:gap-x-7 md:gap-y-12"
            >
              <AnimatePresence>
                {projectsToRender.map((project, idx) => (
                  <div key={project.id} className="w-full flex">
                    <PortfolioCard project={project} idx={idx} isVideoFile={isVideoFile} />
                  </div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {layoutMode === "carousel" && projectsToRender.length > 0 && (
            <div className="text-center mt-14">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-brand-magenta transition-colors underline underline-offset-4 decoration-zinc-300 hover:decoration-brand-magenta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-4 active:opacity-80 rounded-xs"
              >
                <span>{isEn ? "View all portfolio" : "Lihat semua portofolio"}</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}
