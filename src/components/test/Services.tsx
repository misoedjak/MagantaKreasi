"use client";

import { useRef } from "react";
import { motion, MotionConfig } from "framer-motion";
import {
  Tent,
  LayoutTemplate,
  DoorOpen,
  MapPin,
  Palette,
  Frame,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

function getCategoryIcon(slug: string, size = 20) {
  const lower = slug.toLowerCase();
  if (lower.includes("booth")) return <Tent size={size} aria-hidden="true" />;
  if (lower.includes("stage") || lower.includes("panggung"))
    return <LayoutTemplate size={size} aria-hidden="true" />;
  if (lower.includes("backdrop") || lower.includes("dekorasi"))
    return <Frame size={size} aria-hidden="true" />;
  if (lower.includes("gate") || lower.includes("gerbang"))
    return <DoorOpen size={size} aria-hidden="true" />;
  if (lower.includes("sign") || lower.includes("totem") || lower.includes("direction"))
    return <MapPin size={size} aria-hidden="true" />;
  return <Palette size={size} aria-hidden="true" />;
}

export default function Services({ categories = [] }: ServicesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="services"
        className="py-12 md:py-16 bg-brand-light relative border-t border-brand-magenta/10 overflow-hidden"
        suppressHydrationWarning
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-zinc-900">
              <span className="text-brand-magenta">Layanan</span> Kami
            </h2>
            <p className="text-zinc-700 font-medium text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Solusi Fabrikasi Event Menyeluruh. Kami membangun fondasi fisik untuk kesuksesan event
              Anda.
            </p>
          </motion.div>

          {categories.length === 0 ? (
            <div className="py-10 text-center text-zinc-600 border border-dashed border-zinc-300 rounded-2xl">
              Belum ada layanan fabrikasi. Buat kategori di dashboard admin.
            </div>
          ) : (
            <div className="relative group/slider">
              <div
                ref={scrollRef}
                className="flex lg:grid lg:grid-cols-3 items-stretch gap-4 md:gap-6 overflow-x-auto lg:overflow-visible pb-6 lg:pb-0 snap-x snap-mandatory scroll-smooth -mx-6 px-6 md:-mx-10 md:px-10 lg:mx-0 lg:px-0 scroll-pl-6 md:scroll-pl-10 lg:scroll-pl-0 scrollbar-none"
              >
                {categories.map((category, i) => {
                  const hasBg = !!category.bgImageUrl;

                  return (
                    <div
                      key={category.id}
                      className="min-w-[78vw] sm:min-w-[44vw] lg:min-w-0 snap-start snap-always shrink-0 lg:shrink flex w-full"
                    >
                      <Link
                        href={`/portfolio?category=${category.slug}`}
                        className="w-full flex focus-visible:outline-2 focus-visible:outline-brand-magenta rounded-2xl"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.06 }}
                          className={classNameHelper(hasBg)}
                        >
                          {hasBg ? (
                            <>
                              <div className="absolute inset-0 z-0">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10" />
                                <Image
                                  src={category.bgImageUrl!}
                                  alt={category.name}
                                  fill
                                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 33vw"
                                  className="object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>

                              <div className="relative z-20 flex flex-col h-full justify-end">
                                <div className="absolute top-0 right-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-brand-yellow">
                                  {getCategoryIcon(category.slug, 18)}
                                </div>
                                <span className="font-semibold text-xs tracking-wider uppercase mb-1 text-brand-yellow">
                                  Layanan
                                </span>
                                <h3 className="font-heading text-base sm:text-xl font-bold mb-1.5 text-white">
                                  {category.name}
                                </h3>
                                {category.description && (
                                  <p className="text-white/90 leading-relaxed text-xs line-clamp-2 mb-3">
                                    {category.description}
                                  </p>
                                )}
                                <div className="w-8 h-8 rounded-full border border-white/35 flex items-center justify-center text-white group-hover:bg-brand-yellow group-hover:text-brand-dark group-hover:border-brand-yellow transition-all duration-300">
                                  <ArrowUpRight size={14} aria-hidden="true" />
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                className="absolute top-0 right-0 w-28 h-28 bg-brand-magenta/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-magenta/10 transition-colors"
                                aria-hidden="true"
                              />

                              <div className="relative z-10">
                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-brand-magenta/10 flex items-center justify-center text-brand-magenta mb-4 group-hover:scale-110 transition-transform">
                                  {getCategoryIcon(category.slug, 20)}
                                </div>
                                <h3 className="font-heading text-base sm:text-xl font-bold mb-1.5 text-brand-dark">
                                  {category.name}
                                </h3>
                                {category.description && (
                                  <p className="text-zinc-600 leading-relaxed text-xs line-clamp-2">
                                    {category.description}
                                  </p>
                                )}
                              </div>
                            </>
                          )}
                        </motion.div>
                      </Link>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Geser layanan ke kiri"
                className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/95 border border-zinc-200 text-zinc-800 hidden sm:flex items-center justify-center shadow-md hover:bg-brand-magenta hover:text-white transition-all"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Geser layanan ke kanan"
                className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/95 border border-zinc-200 text-zinc-800 hidden sm:flex items-center justify-center shadow-md hover:bg-brand-magenta hover:text-white transition-all"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              href="/portfolio"
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-magenta text-white text-xs sm:text-sm font-semibold hover:bg-brand-magenta-hover hover:scale-105 active:scale-95 transition-all shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-magenta"
            >
              <span>Lihat Semua Layanan</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

function classNameHelper(hasBg: boolean) {
  if (hasBg) {
    return "relative w-full overflow-hidden group h-full min-h-[16rem] sm:min-h-[21rem] rounded-2xl border border-brand-magenta/10 shadow-lg hover:shadow-xl hover:border-brand-magenta/30 hover:-translate-y-1 cursor-pointer flex flex-col justify-end p-5 sm:p-6 transition-all duration-300";
  }
  return "glass-card w-full p-5 sm:p-6 relative overflow-hidden group hover:-translate-y-1 hover:border-brand-magenta/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between";
}
