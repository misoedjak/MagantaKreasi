"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function PortfolioHero() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-paper-cream bg-grid-paper border-b border-zinc-200/80 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10 text-center relative z-10">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.08]">
          {isEn ? (
            <>
              Our{" "}
              <span className="text-brand-magenta">Portfolio.</span>
            </>
          ) : (
            <>
              Portofolio{" "}
              <span className="text-brand-magenta">Kami.</span>
            </>
          )}
        </h1>
        <p className="mt-4 text-zinc-700 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {isEn
            ? "Explore our completed custom booths, corporate stages, backdrops, and event installations."
            : "Lihat dokumentasi booth pameran custom, panggung acara, backdrop, dan instalasi event yang telah kami kerjakan."}
        </p>
      </div>
    </section>
  );
}
