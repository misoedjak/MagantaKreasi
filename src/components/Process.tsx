"use client";

import { motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface PipelineStepItem {
  id: string;
  title: string;
  description: string;
  bgImageUrl?: string | null;
  order: number;
}

interface ProcessProps {
  steps?: PipelineStepItem[];
}

export default function Process({ steps = [] }: ProcessProps) {
  const fallbackSteps = [
    {
      title: "Konsultasi & Briefing",
      desc: "Memahami visi brand Anda, batasan ruang, dan anggaran.",
      bgImageUrl: null,
    },
    {
      title: "Desain 3D & Rendering",
      desc: "Menyediakan mockup fotorealistis dan denah lantai struktural.",
      bgImageUrl: null,
    },
    {
      title: "Pemilihan Material",
      desc: "Mencari bahan yang tepat, mulai dari kayu, logam, dan finishing yang dibutuhkan.",
      bgImageUrl: null,
    },
    {
      title: "In-House Production",
      desc: "Pekerjaan kayu, logam, dan pengecatan di fasilitas khusus kami.",
      bgImageUrl: null,
    },
    {
      title: "Quality Control",
      desc: "Pemasangan awal struktur kompleks di workshop kami untuk menjamin kesesuaian.",
      bgImageUrl: null,
    },
    {
      title: "Instalasi di Lokasi",
      desc: "Konstruksi dan loading yang aman dan cepat di lokasi event.",
      bgImageUrl: null,
    },
    {
      title: "Pembongkaran",
      desc: "Pembongkaran bersih dan pemindahan logistik pasca-event.",
      bgImageUrl: null,
    },
  ];

  const listToRender =
    steps.length > 0
      ? steps.map((s, idx) => ({
          num: (idx + 1).toString().padStart(2, "0"),
          title: s.title,
          desc: s.description,
          bgImageUrl: s.bgImageUrl ?? null,
        }))
      : fallbackSteps.map((s, idx) => ({
          num: (idx + 1).toString().padStart(2, "0"),
          title: s.title,
          desc: s.desc,
          bgImageUrl: s.bgImageUrl,
        }));

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="process"
        className="py-14 md:py-20 bg-white relative overflow-hidden border-t border-zinc-200/80"
        suppressHydrationWarning
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
          {/* Compact Editorial Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-10"
          >
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.12]">
              Proses{" "}
              <span className="font-script font-normal text-brand-magenta text-4xl sm:text-5xl lg:text-[3.75rem] tracking-normal inline-block">
                pengerjaan.
              </span>
            </h2>
            <p className="mt-2.5 text-zinc-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              Alur kerja sistematis dari konsep hingga pembongkaran pasca-event.
            </p>
          </motion.div>

          {/* Compact 4x2 Grid — fits the entire process cleanly within one viewport */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
            {listToRender.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="group relative overflow-hidden min-h-[146px] flex flex-col justify-between border border-zinc-200 hover:border-brand-magenta transition-colors duration-200 bg-white"
              >
                {step.bgImageUrl ? (
                  <>
                    <Image
                      src={step.bgImageUrl}
                      alt={step.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40 z-10"
                      aria-hidden="true"
                    />
                    <div className="relative z-20 p-4 sm:p-5 flex flex-col justify-between h-full">
                      <span className="font-mono text-xs font-bold text-brand-yellow tabular-nums">
                        {step.num}
                      </span>
                      <div className="mt-4">
                        <h3 className="font-sans text-sm sm:text-[15px] font-bold text-white leading-snug">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-white/85 text-xs leading-relaxed line-clamp-3">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-4 sm:p-5 flex flex-col justify-between h-full">
                    <span className="font-mono text-xs font-bold text-brand-magenta tabular-nums">
                      {step.num}
                    </span>
                    <div className="mt-4">
                      <h3 className="font-sans text-sm sm:text-[15px] font-bold text-zinc-950 leading-snug">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-zinc-600 text-xs leading-relaxed line-clamp-3">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* 8th Interactive CTA Tile to complete the crisp 4x2 grid */}
            <a
              href="#contact"
              className="group min-h-[146px] p-4 sm:p-5 bg-brand-magenta hover:bg-brand-magenta-hover transition-colors duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 active:opacity-95"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-brand-yellow tabular-nums">
                  {String(listToRender.length + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="text-brand-yellow motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                />
              </div>
              <div className="mt-4">
                <span className="font-sans text-sm sm:text-[15px] font-bold text-white leading-snug block">
                  Mulai Proyek Anda
                </span>
                <span className="mt-1 text-white/85 text-xs leading-relaxed block">
                  Diskusikan kebutuhan produksi langsung dengan tim workshop kami.
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
