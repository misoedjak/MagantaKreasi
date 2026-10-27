"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { ArrowUpRight, FolderOpen, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
}

function PortfolioCard({
  project,
  idx,
  isVideoFile,
}: {
  project: PortfolioItem;
  idx: number;
  isVideoFile: (url?: string | null) => boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

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

  const startPlayback = () => {
    if (!videoSource) return;
    setHasStarted(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const pausePlayback = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleMediaClick = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      startPlayback();
    } else {
      pausePlayback();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      className="group relative w-full h-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-200/20 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={startPlayback}
      onMouseLeave={pausePlayback}
      onFocus={startPlayback}
      onBlur={pausePlayback}
    >
      {/* Background Media Container */}
      <div
        className="w-full h-full relative overflow-hidden bg-zinc-900 cursor-pointer"
        onClick={handleMediaClick}
      >
        <Image
          src={thumbImage}
          alt={displayTitle}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-all duration-500 group-hover:scale-[1.03] ${
            hasStarted && videoSource ? "opacity-0 pointer-events-none" : "opacity-100"
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
              hasStarted ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/* Minimalist Category Top Badge */}
      {primaryCategory && (
        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-black/75 backdrop-blur-md text-brand-yellow border border-white/20 shadow-md tracking-wide">
            {primaryCategory}
          </span>
        </div>
      )}

      {/* Discreet Video Badge on Top-Right */}
      {videoSource && (
        <div className="absolute top-3 right-3 z-20 pointer-events-none">
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-black/60 backdrop-blur-md text-white border border-white/15 flex items-center gap-1 shadow-sm">
            <Play size={9} className="fill-brand-yellow text-brand-yellow" aria-hidden="true" /> Video
          </span>
        </div>
      )}

      {/* Bottom Feather Gradient Scrim: Compact at rest, expands smoothly on hover */}
      <div className="absolute inset-x-0 bottom-0 h-28 group-hover:h-44 bg-gradient-to-t from-black/95 via-black/55 to-transparent pointer-events-none z-10 transition-all duration-300" />

      {/* Kinetic Slide-Up Drawer Container - Video plays continuously even when hovering here! */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-20 pointer-events-auto">
        <h3 className="font-heading text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-brand-yellow transition-colors line-clamp-2 leading-snug drop-shadow-sm">
          <Link
            href={`/portfolio/${project.slug}`}
            className="hover:underline focus-visible:outline-2 focus-visible:outline-brand-yellow rounded"
          >
            {displayTitle}
          </Link>
        </h3>

        {/* Revealed Content via CSS Grid Row Transition (Takes 0 height at rest!) */}
        <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-300 ease-out">
          <div className="overflow-hidden">
            {project.client && (
              <p className="text-xs text-zinc-300 line-clamp-1 mt-1.5">
                Klien: {project.client}
              </p>
            )}

            {/* Action Row */}
            <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between">
              <Link
                href={`/portfolio/${project.slug}`}
                className="text-xs font-bold text-brand-yellow hover:underline focus-visible:outline-2 focus-visible:outline-brand-yellow rounded"
              >
                Lihat Detail Proyek
              </Link>
              <Link
                href={`/portfolio/${project.slug}`}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center font-bold text-xs shadow-md transition-transform group-hover:scale-105 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-brand-yellow"
                aria-label={`Buka detail proyek ${displayTitle}`}
              >
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio({
  initialPortfolios,
  categories,
  layoutMode = "grid",
}: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState("Semua");

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
    layoutMode === "carousel" ? "py-12 md:py-16" : "pt-4 pb-12 md:pt-6 md:pb-16";

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="portfolio"
        className={`bg-brand-light border-t border-brand-magenta/10 overflow-hidden ${sectionPadding}`}
        suppressHydrationWarning
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex flex-col mb-6 md:mb-8 gap-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-zinc-900">
                <span className="text-brand-magenta">Portofolio</span> Kami
              </h2>
              <p className="text-zinc-700 font-medium text-xs sm:text-sm max-w-xl leading-relaxed">
                Jelajahi dokumentasi proyek panggung, booth custom, backdrop, dan instalasi event
                resmi kami.
              </p>
            </motion.div>

            {/* Categories Filters - Only show in grid mode */}
            {layoutMode === "grid" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap scrollbar-none snap-x snap-mandatory shrink-0"
              >
                <button
                  type="button"
                  onClick={() => setActiveFilter("Semua")}
                  className={`min-h-[40px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 snap-start cursor-pointer ${
                    activeFilter === "Semua"
                      ? "bg-brand-magenta text-white shadow-md"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  Semua
                </button>
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`min-h-[40px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 snap-start cursor-pointer ${
                      activeFilter === cat.id
                        ? "bg-brand-magenta text-white shadow-md"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
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
            <div className="py-12 text-center text-zinc-600 flex flex-col items-center gap-2 border border-dashed border-zinc-300 rounded-2xl">
              <FolderOpen className="h-8 w-8 text-zinc-500" aria-hidden="true" />
              <p className="text-sm">
                Belum ada proyek portofolio yang dipublikasikan dalam kategori ini.
              </p>
            </div>
          ) : layoutMode === "carousel" ? (
            <div className="flex lg:grid lg:grid-cols-3 items-stretch gap-4 md:gap-6 overflow-x-auto lg:overflow-visible pb-6 lg:pb-0 snap-x snap-mandatory scroll-smooth -mx-6 px-6 md:-mx-10 md:px-10 lg:mx-0 lg:px-0 scroll-pl-6 md:scroll-pl-10 scrollbar-none">
              {projectsToRender.map((project, idx) => (
                <div
                  key={project.id}
                  className="min-w-[80vw] sm:min-w-[46vw] lg:min-w-0 snap-start snap-always shrink-0 lg:shrink flex w-full"
                >
                  <PortfolioCard project={project} idx={idx} isVideoFile={isVideoFile} />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
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
            <div className="text-center mt-8">
              <Link
                href="/portfolio"
                className="min-h-[44px] px-7 py-3 rounded-full bg-brand-yellow hover:bg-brand-magenta hover:text-white text-brand-dark font-semibold text-xs sm:text-sm transition-all inline-flex items-center justify-center shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-magenta"
              >
                Lihat Semua Portofolio
              </Link>
            </div>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}
