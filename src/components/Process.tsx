"use client";

import { motion, MotionConfig } from "framer-motion";
import Image from "next/image";

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
        className="py-12 md:py-16 bg-brand-light relative overflow-hidden border-t border-brand-magenta/10"
        suppressHydrationWarning
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-zinc-900">
              <span className="text-brand-magenta">Proses</span> Pengerjaan
            </h2>
            <p className="text-zinc-700 font-medium text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Pendekatan sistematis mulai dari konsep hingga arsitektur event yang memukau.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {listToRender.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className="flex gap-4 md:gap-6 mb-4 relative"
              >
                {/* Vertical connector line */}
                {i !== listToRender.length - 1 && (
                  <div
                    className="absolute left-4.5 top-10 bottom-[-18px] w-[2px] bg-gradient-to-b from-brand-magenta/50 to-transparent md:left-6 md:top-12 z-10"
                    aria-hidden="true"
                  />
                )}

                {/* Step Number Circle */}
                <div className="w-9 h-9 md:w-12 md:h-12 shrink-0 rounded-full bg-brand-magenta border-2 border-brand-magenta/30 flex items-center justify-center font-heading text-xs md:text-base font-bold text-white z-10 shadow-md">
                  {step.num}
                </div>

                {/* Step Card */}
                <div className="flex-1 mb-1 rounded-2xl overflow-hidden shadow-sm group">
                  {step.bgImageUrl ? (
                    <div className="relative w-full min-h-[7rem] md:min-h-[8rem]">
                      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25 z-10" />
                      <Image
                        src={step.bgImageUrl}
                        alt={step.title}
                        fill
                        sizes="(max-width: 768px) 85vw, 768px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="relative z-20 p-4 md:p-5 flex flex-col justify-center h-full">
                        <h3 className="font-heading text-sm md:text-lg font-bold text-white mb-1">
                          {step.title}
                        </h3>
                        <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="glass-card p-4 md:p-5 h-full">
                      <h3 className="font-heading text-sm md:text-lg font-bold mb-1 text-brand-dark">
                        {step.title}
                      </h3>
                      <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
