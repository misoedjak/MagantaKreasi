"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function ProductsHero() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <section className="pt-28 pb-10 md:pt-36 md:pb-12 bg-paper-cream bg-grid-paper border-b border-zinc-200/80 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10 text-center relative z-10">
        <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.1] max-w-3xl mx-auto">
          {isEn ? (
            <>
              Event equipment &amp; production{" "}
              <span className="font-script font-normal text-brand-magenta text-4xl sm:text-6xl lg:text-[4.25rem] tracking-normal inline-block">
                rentals.
              </span>
            </>
          ) : (
            <>
              Penyewaan alat &amp; pendukung{" "}
              <span className="font-script font-normal text-brand-magenta text-4xl sm:text-6xl lg:text-[4.25rem] tracking-normal inline-block">
                event.
              </span>
            </>
          )}
        </h1>
        <p className="mt-4 text-zinc-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {isEn
            ? "Ready-to-rent inventory: sound systems, silent generators, sarnafil & roder tents, AC cooling, barricades, and VIP furniture backed by our venue crew."
            : "Inventaris siap sewa: sound system, genset silent, tenda sarnafil & roder, pendingin ruangan, barricade, dan furnitur VIP didukung tim teknisi panggung."}
        </p>
      </div>
    </section>
  );
}
