"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface ShowcaseProject {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  thumbnail: string;
  videoUrl?: string | null;
  categories?: { id: string; name: string; slug?: string }[];
  images?: { id: string; url: string; order: number }[];
}

interface HeroProps {
  settings?: {
    heading: string;
    subheading: string;
    bgImageUrl: string;
    ctaText: string;
    ctaLink: string;
    portfolioText: string;
    portfolioLink: string;
  } | null;
  showcaseProjects?: ShowcaseProject[];
}

const FALLBACK_SHOWCASE: ShowcaseProject[] = [
  {
    id: "fallback-cedea",
    title: "CEDEA 20th Anniversary - Behind The Build",
    slug: "cedea-20th-anniversary-behind-the-build",
    client: "CEDEA Seafood & Creo Production",
    thumbnail: "/uploads/portfolio/DVN1Mi_ExXe_1.jpg",
    videoUrl: "/uploads/portfolio/cedea-anniversary.mp4",
    categories: [{ id: "c0", name: "Totem & Signage" }],
  },
];

function isVideoFile(url?: string | null) {
  if (!url) return false;
  return url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".mov");
}

export default function Hero({ settings, showcaseProjects = [] }: HeroProps) {
  const headingText = "In-House Event Workshop Production Premium";
  const subheading =
    "Dikerjakan langsung oleh tim produksi di workshop kami sendiri—lebih rapi, tepat waktu, dan siap pasang di lokasi acara.";
  const bgImageUrl = settings?.bgImageUrl || "/uploads/backgrounds/hero-flame-fest.jpg";
  const ctaText = settings?.ctaText || "Pesan disini";
  const ctaLink = settings?.ctaLink || "#contact";

  // Video #1 as the Hero Background
  const items =
    showcaseProjects.length > 0 ? showcaseProjects : FALLBACK_SHOWCASE;
  const videoOne = items[0] || FALLBACK_SHOWCASE[0];

  const heroVideoSrc =
    videoOne?.videoUrl ||
    (isVideoFile(videoOne?.thumbnail) ? videoOne?.thumbnail : null);
  const heroPosterImg =
    videoOne?.thumbnail && !isVideoFile(videoOne?.thumbnail)
      ? videoOne.thumbnail
      : videoOne?.images?.[0]?.url || bgImageUrl;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // Sound ON by default, fallback to unlock on first interaction
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !heroVideoSrc) return;

    video.muted = isMuted;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {
            setIsPlaying(false);
          });

          const unlockAudio = () => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              setIsMuted(false);
            }
            window.removeEventListener("pointerdown", unlockAudio);
            window.removeEventListener("keydown", unlockAudio);
          };
          window.addEventListener("pointerdown", unlockAudio, { once: true });
          window.addEventListener("keydown", unlockAudio, { once: true });
        }
      });
    }
  }, [heroVideoSrc]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration > 0) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextPct = Number(e.target.value);
    setProgress(nextPct);
    const video = videoRef.current;
    if (video && video.duration > 0) {
      video.currentTime = (nextPct / 100) * video.duration;
    }
  };

  const togglePlayPause = () => {
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

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (videoRef.current) {
      videoRef.current.muted = next;
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative min-h-screen h-dvh w-full flex items-center justify-center overflow-hidden pt-20 pb-20 bg-brand-dark"
        suppressHydrationWarning
      >
        {/* GPU-Accelerated SVG Unsharp Mask Filter to Sharpen 720p Reel Video at Fullscreen */}
        <svg className="sr-only" aria-hidden="true">
          <defs>
            <filter id="hero-hd-sharpen" colorInterpolationFilters="sRGB">
              <feConvolveMatrix
                order="3 3"
                preserveAlpha="true"
                kernelMatrix="0 -0.35 0 -0.35 2.4 -0.35 0 -0.35 0"
              />
            </filter>
          </defs>
        </svg>

        {/* Full-Screen Background Video #1 (object-cover object-top: anchored at top, crops only bottom) */}
        <div className="absolute inset-0 z-0 bg-brand-dark overflow-hidden">
          <Image
            src={heroPosterImg}
            alt={videoOne?.title || "Maganta Kreasi"}
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-top"
          />

          {heroVideoSrc && (
            <video
              ref={videoRef}
              src={heroVideoSrc}
              poster={heroPosterImg}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              style={{
                filter: "url(#hero-hd-sharpen) contrast(1.08) saturate(1.06)",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
              className="absolute inset-0 z-10 w-full h-full object-cover object-top"
            />
          )}

          {/* Subtle Editorial Scrim so Video Stays Crisp & Vivid */}
          <div className="absolute inset-0 bg-black/20 z-20 pointer-events-none" />
        </div>

        {/* Centered Single-Column Hero Composition */}
        <div className="max-w-4xl w-full mx-auto px-6 md:px-10 relative z-30 flex flex-col items-center text-center">
          {/* Centered Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight text-white mb-5 max-w-3xl drop-shadow-lg"
          >
            {headingText}
          </motion.h1>

          {/* Centered 2-Line Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg text-zinc-200/90 max-w-xl leading-relaxed mb-8 drop-shadow-sm"
          >
            {subheading}
          </motion.p>

          {/* Centered Pill CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <a
              href={ctaLink}
              className="min-h-[44px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-brand-yellow text-brand-dark font-semibold text-sm hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>{ctaText}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        {/* Distilled Bottom-Left Controls: No Pill Soup, Just Clean Icons + Plain Link */}
        {heroVideoSrc && (
          <div className="absolute bottom-6 left-6 md:left-10 z-30 flex items-center gap-4 text-white/75">
            <button
              type="button"
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Jeda video latar" : "Putar video latar"}
              className="w-9 h-9 flex items-center justify-center text-white/80 hover:text-brand-yellow transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-yellow rounded-full"
            >
              {isPlaying ? (
                <Pause size={16} aria-hidden="true" />
              ) : (
                <Play size={16} className="fill-current" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Nyalakan suara video latar" : "Matikan suara video latar"}
              className="w-9 h-9 flex items-center justify-center text-white/80 hover:text-brand-yellow transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-yellow rounded-full"
            >
              {isMuted ? (
                <VolumeX size={16} aria-hidden="true" />
              ) : (
                <Volume2 size={16} aria-hidden="true" />
              )}
            </button>

            <span className="h-3.5 w-px bg-white/20" aria-hidden="true" />

            <Link
              href={`/portfolio/${videoOne.slug}`}
              className="inline-flex items-center gap-1 text-xs font-medium text-white/70 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-brand-yellow rounded"
            >
              <span>{videoOne.title}</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>
        )}

        {/* Flush Bottom-Edge Progress Line (Zero Pill Containers) */}
        {heroVideoSrc && (
          <div className="group/scrub absolute inset-x-0 bottom-0 z-30 h-4 flex items-end">
            <div className="w-full h-[3px] group-hover/scrub:h-1.5 bg-white/15 transition-all overflow-hidden">
              <div
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                className="h-full bg-brand-yellow transition-[width] duration-100 ease-linear"
              />
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={Number.isFinite(progress) ? progress : 0}
              onChange={handleSeek}
              aria-label={`Durasi video ${videoOne.title}`}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        )}
      </section>
    </MotionConfig>
  );
}
