"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ServicesHero({ waConsultUrl }: { waConsultUrl: string }) {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-paper-cream bg-grid-paper border-b border-zinc-200/80 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10 text-center relative z-10">
        <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.08] max-w-3xl mx-auto">
          {isEn ? (
            <>
              Services &amp; fabrication{" "}
              <span className="font-script font-normal text-brand-magenta text-5xl sm:text-6xl lg:text-[4.5rem] tracking-normal inline-block">
                capacity.
              </span>
            </>
          ) : (
            <>
              Layanan &amp; kapasitas{" "}
              <span className="font-script font-normal text-brand-magenta text-5xl sm:text-6xl lg:text-[4.5rem] tracking-normal inline-block">
                fabrikasi.
              </span>
            </>
          )}
        </h1>

        <p className="mt-5 text-zinc-700 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {isEn
            ? "In-house fabrication standards for national exhibitions, corporate stages, and brand activations."
            : "Standar fabrikasi in-house untuk pameran nasional, panggung korporat, dan aktivasi brand."}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          <a
            href={waConsultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-7 py-3 rounded-full bg-brand-magenta hover:bg-brand-magenta-hover text-white font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 active:opacity-90"
          >
            <span>{isEn ? "Consult Technical Team" : "Konsultasi Tim Teknis"}</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a
            href="#services-catalog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 hover:text-brand-magenta transition-colors underline underline-offset-4 decoration-zinc-400 hover:decoration-brand-magenta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-4 rounded-xs"
          >
            <span>{isEn ? "View service specifications" : "Lihat spesifikasi layanan"}</span>
            <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>

        {/* Compact Architectural Capacity Strip */}
        <div className="mt-12 pt-8 border-t border-zinc-900/10 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div>
            <p className="font-sans text-xl sm:text-2xl font-bold text-zinc-950 tabular-nums">
              1.000m²
            </p>
            <p className="text-xs text-zinc-600 mt-0.5">
              {isEn ? "Own Workshop" : "Workshop Mandiri"}
            </p>
          </div>
          <div>
            <p className="font-sans text-xl sm:text-2xl font-bold text-brand-magenta tabular-nums">
              100%
            </p>
            <p className="text-xs text-zinc-600 mt-0.5">
              {isEn ? "In-House Build" : "Produksi In-House"}
            </p>
          </div>
          <div>
            <p className="font-sans text-xl sm:text-2xl font-bold text-zinc-950 tabular-nums">
              24/7
            </p>
            <p className="text-xs text-zinc-600 mt-0.5">
              {isEn ? "Venue Loading Crew" : "Tim Loading Venue"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesClosingCta({ waConsultUrl }: { waConsultUrl: string }) {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <section className="py-14 md:py-16 bg-brand-yellow text-brand-dark">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-brand-dark leading-tight">
            {isEn
              ? "Have a custom design brief or technical blueprint?"
              : "Punya brief desain atau gambar kerja custom?"}
          </h2>
          <p className="mt-2 text-sm text-brand-dark/80 leading-relaxed">
            {isEn
              ? "Share your venue dimensions and concept references, and our workshop team will prepare transparent material, production, and loading estimates."
              : "Kirimkan ukuran venue dan referensi konsep Anda, lalu tim workshop kami bantu hitung estimasi material, jadwal produksi, dan loading secara transparan."}
          </p>
        </div>
        <a
          href={waConsultUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 min-h-[44px] px-7 py-3 rounded-full bg-brand-dark hover:bg-brand-magenta text-white font-semibold text-sm shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-brand-yellow active:opacity-90"
        >
          <span>{isEn ? "Contact Workshop Team" : "Hubungi Tim Workshop"}</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
