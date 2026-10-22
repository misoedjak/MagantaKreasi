"use client";

import { motion, MotionConfig } from "framer-motion";
import {
  Hammer,
  ShieldCheck,
  PenTool,
  Clock,
  Map,
  Drill,
  Award,
  Palette,
  Settings,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";

interface AdvantageItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  bgImageUrl?: string | null;
}

interface WhyChooseUsProps {
  advantages?: AdvantageItem[];
}

function getIcon(name: string, size = 24) {
  switch (name) {
    case "Hammer":
      return <Hammer size={size} aria-hidden="true" />;
    case "ShieldCheck":
      return <ShieldCheck size={size} aria-hidden="true" />;
    case "PenTool":
      return <PenTool size={size} aria-hidden="true" />;
    case "Clock":
      return <Clock size={size} aria-hidden="true" />;
    case "Map":
      return <Map size={size} aria-hidden="true" />;
    case "Drill":
      return <Drill size={size} aria-hidden="true" />;
    case "Award":
      return <Award size={size} aria-hidden="true" />;
    case "Palette":
      return <Palette size={size} aria-hidden="true" />;
    case "Settings":
      return <Settings size={size} aria-hidden="true" />;
    case "Sparkles":
      return <Sparkles size={size} aria-hidden="true" />;
    default:
      return <Hammer size={size} aria-hidden="true" />;
  }
}

export default function WhyChooseUs({ advantages = [] }: WhyChooseUsProps) {
  const fallbackFeatures = [
    {
      title: "Workshop In-House",
      desc: "Kendali penuh atas kualitas dan ketepatan waktu dengan fasilitas fabrikasi yang lengkap.",
      icon: "Hammer",
    },
    {
      title: "Material Premium",
      desc: "Kami hanya menggunakan material berkualitas tinggi untuk keamanan struktural dan estetika.",
      icon: "ShieldCheck",
    },
    {
      title: "Prototyping 3D",
      desc: "Visualisasikan setup Anda sebelum kami membangunnya dengan tim desain 3D ahli kami.",
      icon: "PenTool",
    },
    {
      title: "Teknik Presisi",
      desc: "Setiap sambungan dan rangka dirancang untuk keamanan beban maksimal.",
      icon: "Drill",
    },
    {
      title: "Pengerjaan Tepat Waktu",
      desc: "Kepatuhan ketat terhadap jadwal produksi dan waktu loading venue.",
      icon: "Clock",
    },
    {
      title: "Layanan Seluruh Indonesia",
      desc: "Mampu memproduksi di Jakarta dan memasang di mana saja di seluruh Indonesia.",
      icon: "Map",
    },
  ];

  const listToRender =
    advantages.length > 0
      ? advantages.map((a) => ({
          title: a.title,
          desc: a.description,
          icon: a.icon,
          bgImageUrl: a.bgImageUrl,
        }))
      : fallbackFeatures.map((f) => ({ ...f, bgImageUrl: null }));

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="py-12 md:py-16 bg-brand-light relative border-t border-brand-magenta/10"
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
              <span className="text-brand-magenta">Keunggulan</span> Maganta Kreasi
            </h2>
            <p className="text-zinc-700 font-medium text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Kami tidak menggunakan pihak ketiga. Kami membangun sendiri. Inilah mengapa agensi dan
              brand top mempercayai kami.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {listToRender.map((feature, i) => {
              const hasBg = !!feature.bgImageUrl;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className={classNameHelperAdvantage(hasBg)}
                >
                  {hasBg ? (
                    <>
                      <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent z-10" />
                        <Image
                          src={feature.bgImageUrl!}
                          alt={feature.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="relative z-20 flex flex-col h-full justify-end">
                        <div className="absolute top-2 right-2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-brand-yellow">
                          {getIcon(feature.icon, 20)}
                        </div>
                        <span className="font-semibold text-xs tracking-wider uppercase mb-1 text-brand-yellow">
                          Keunggulan
                        </span>
                        <h3 className="font-heading text-lg font-bold mb-1.5 text-white">
                          {feature.title}
                        </h3>
                        <p className="text-white/90 leading-relaxed text-xs line-clamp-3 mb-3">
                          {feature.desc}
                        </p>
                        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-brand-yellow group-hover:text-brand-dark group-hover:border-brand-yellow transition-all duration-300">
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-brand-magenta/10 flex items-center justify-center text-brand-magenta mb-3.5 md:mb-4 group-hover:scale-110 group-hover:bg-brand-magenta/20 transition-all duration-300">
                        {getIcon(feature.icon, 22)}
                      </div>
                      <h3 className="font-heading text-sm sm:text-base md:text-lg font-bold mb-1.5 text-brand-dark">
                        {feature.title}
                      </h3>
                      <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                        {feature.desc}
                      </p>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

function classNameHelperAdvantage(hasBg: boolean) {
  if (hasBg) {
    return "relative overflow-hidden group h-[20rem] sm:h-[22rem] rounded-2xl border border-brand-magenta/10 shadow-lg hover:shadow-xl hover:-translate-y-1 flex flex-col justify-end p-5 sm:p-6 transition-all duration-300";
  }
  return "glass-card p-5 md:p-6 group hover:-translate-y-1 hover:border-brand-magenta/40 hover:shadow-xl transition-all duration-300";
}
