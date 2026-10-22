"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { ArrowUpRight, FolderOpen, Play, Volume2, VolumeX } from "lucide-react";
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

function VideoHoverCard({
  thumbnail,
  videoSrc,
  title,
}: {
  thumbnail: string;
  videoSrc: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const startPlayback = () => {
    setHasStarted(true);
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch(() => {});
    }
  };

  const pausePlayback = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      if (videoRef.current.paused) {
        setHasStarted(true);
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <div
      className="w-full h-full relative overflow-hidden bg-brand-dark"
      onMouseEnter={startPlayback}
      onMouseLeave={pausePlayback}
      onFocus={startPlayback}
      onBlur={pausePlayback}
    >
      {/* Static thumbnail image using Next/Image */}
      <Image
        src={thumbnail}
        alt={title}
        fill
        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 33vw"
        className={`object-cover transition-opacity duration-300 ${
          hasStarted ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* Video element with preload="none" and muted-by-default WCAG 1.4.2 compliance */}
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        muted={isMuted}
        playsInline
        preload="none"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          hasStarted ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Explicit Audio Control Button */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? `Nyalakan suara video ${title}` : `Matikan suara video ${title}`}
        className="absolute top-2.5 right-2.5 z-30 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-brand-magenta transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-yellow"
      >
        {isMuted ? (
          <VolumeX size={15} aria-hidden="true" />
        ) : (
          <Volume2 size={15} className="text-brand-yellow" aria-hidden="true" />
        )}
      </button>
    </div>
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
            <div className="flex lg:grid lg:grid-cols-3 items-stretch gap-3.5 md:gap-5 overflow-x-auto lg:overflow-visible pb-6 lg:pb-0 snap-x snap-mandatory scroll-smooth -mx-6 px-6 md:-mx-10 md:px-10 lg:mx-0 lg:px-0 scroll-pl-6 md:scroll-pl-10 scrollbar-none">
              {projectsToRender.map((project, idx) => {
                const videoSource =
                  project.videoUrl || (isVideoFile(project.thumbnail) ? project.thumbnail : null);
                const thumbImage =
                  project.thumbnail && !isVideoFile(project.thumbnail)
                    ? project.thumbnail
                    : project.images[0]?.url || project.thumbnail;

                return (
                  <div
                    key={project.id}
                    className="min-w-[78vw] sm:min-w-[44vw] lg:min-w-0 snap-start snap-always shrink-0 lg:shrink flex w-full"
                  >
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="group w-full flex flex-col h-full focus-visible:outline-2 focus-visible:outline-brand-magenta rounded-2xl"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="relative w-full h-full aspect-video rounded-2xl overflow-hidden cursor-pointer bg-brand-dark flex flex-col"
                      >
                        {videoSource ? (
                          <VideoHoverCard
                            thumbnail={thumbImage}
                            videoSrc={videoSource}
                            title={project.title}
                          />
                        ) : (
                          <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <div className="absolute inset-0 p-3.5 sm:p-4 flex flex-col justify-end translate-y-1 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                            {(project.categories && project.categories.length > 0
                              ? project.categories
                              : project.category
                                ? [project.category]
                                : []
                            ).map((cat, cIdx) => (
                              <span
                                key={cIdx}
                                className="text-brand-yellow font-bold text-xs tracking-wider uppercase"
                              >
                                {cat.name}
                              </span>
                            ))}
                            {videoSource && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand-magenta/90 text-xs text-white font-medium">
                                <Play size={9} fill="currentColor" aria-hidden="true" /> Video
                              </span>
                            )}
                          </div>
                          <h3 className="font-heading text-xs sm:text-sm md:text-base font-bold text-white mb-0.5 line-clamp-1">
                            {project.title}
                          </h3>
                          {project.client && (
                            <p className="text-xs text-white/85 mb-1">Klien: {project.client}</p>
                          )}

                          <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                            <ArrowUpRight size={13} className="text-white" aria-hidden="true" />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              <AnimatePresence>
                {projectsToRender.map((project) => {
                  const videoSource =
                    project.videoUrl || (isVideoFile(project.thumbnail) ? project.thumbnail : null);
                  const thumbImage =
                    project.thumbnail && !isVideoFile(project.thumbnail)
                      ? project.thumbnail
                      : project.images[0]?.url || project.thumbnail;

                  return (
                    <Link
                      href={`/portfolio/${project.slug}`}
                      key={project.id}
                      className="block group focus-visible:outline-2 focus-visible:outline-brand-magenta rounded-2xl"
                    >
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        transition={{ duration: 0.35 }}
                        className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer bg-brand-dark"
                      >
                        {videoSource ? (
                          <VideoHoverCard
                            thumbnail={thumbImage}
                            videoSrc={videoSource}
                            title={project.title}
                          />
                        ) : (
                          <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-85 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            {(project.categories && project.categories.length > 0
                              ? project.categories
                              : project.category
                                ? [project.category]
                                : []
                            ).map((cat, cIdx) => (
                              <span key={cIdx} className="text-brand-yellow font-semibold text-xs">
                                {cat.name}
                              </span>
                            ))}
                            {videoSource && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand-magenta/90 text-xs text-white font-medium">
                                <Play size={9} fill="currentColor" aria-hidden="true" /> Video
                              </span>
                            )}
                          </div>
                          <h3 className="font-heading text-sm sm:text-xl font-bold text-white mb-1 line-clamp-2 leading-tight">
                            {project.title}
                          </h3>
                          {project.client && (
                            <p className="text-xs text-white/80 mb-1.5">Klien: {project.client}</p>
                          )}

                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1.5">
                            <ArrowUpRight size={14} className="text-white" aria-hidden="true" />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
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
