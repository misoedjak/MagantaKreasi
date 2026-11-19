"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ClientLogoItem {
  name: string;
  logoUrl: string;
  portfolioSlug: string | null;
  portfolioTitle: string | null;
}

export default function ClientsPageContent({
  logos,
  waConsultUrl,
}: {
  logos: ClientLogoItem[];
  waConsultUrl: string;
}) {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <>
      {/* Editorial Workshop Graph-Paper Hero Header */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-paper-cream bg-grid-paper border-b border-zinc-200/80 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center relative z-10">
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.08] max-w-3xl mx-auto">
            {isEn ? (
              <>
                Trusted by leading{" "}
                <span className="font-script font-normal text-brand-magenta text-5xl sm:text-6xl lg:text-[4.5rem] tracking-normal inline-block">
                  brands.
                </span>
              </>
            ) : (
              <>
                Dipercaya oleh{" "}
                <span className="font-script font-normal text-brand-magenta text-5xl sm:text-6xl lg:text-[4.5rem] tracking-normal inline-block">
                  brand
                </span>{" "}
                terkemuka.
              </>
            )}
          </h1>
          <p className="mt-5 text-zinc-700 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {isEn
              ? "Production partner for custom stages, exhibition booths, and event installations across Indonesia."
              : "Mitra produksi panggung, booth pameran, dan instalasi event untuk korporasi, institusi, serta festival di Indonesia."}
          </p>
        </div>
      </section>

      {/* Clean Spacious Partner Logo Wall */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          {logos.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <p className="text-xs sm:text-sm text-zinc-500">
                  {isEn
                    ? "Click any linked logo to view the completed project documentation."
                    : "Klik logo yang terhubung untuk melihat dokumentasi proyek terkait."}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-10 sm:gap-x-12 sm:gap-y-12">
                {logos.map((client, i) => {
                  const logoTile = (
                    <div className="group flex flex-col items-center justify-center px-3 py-2">
                      <img
                        src={client.logoUrl}
                        alt={`Logo ${client.name}`}
                        loading="lazy"
                        decoding="async"
                        className="max-h-11 sm:max-h-14 max-w-[130px] sm:max-w-[165px] object-contain opacity-75 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-[opacity,filter] duration-200"
                      />
                      {client.portfolioSlug && (
                        <span className="mt-2 inline-flex items-center gap-0.5 text-[11px] font-semibold text-zinc-400 group-hover:text-brand-magenta transition-colors">
                          <span>{isEn ? "View project" : "Lihat proyek"}</span>
                          <ArrowUpRight
                            size={12}
                            aria-hidden="true"
                            className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                          />
                        </span>
                      )}
                    </div>
                  );

                  if (client.portfolioSlug) {
                    return (
                      <Link
                        key={i}
                        href={`/portfolio/${client.portfolioSlug}`}
                        aria-label={`Lihat portofolio proyek ${client.name}`}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-4 rounded-xs"
                      >
                        {logoTile}
                      </Link>
                    );
                  }

                  return (
                    <div key={i} title={client.name}>
                      {logoTile}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="py-16 text-center text-zinc-500 border border-dashed border-zinc-300">
              <p className="text-sm font-medium">
                {isEn ? "Client list is being updated." : "Daftar klien sedang diperbarui."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bold Yellow Closing CTA Band */}
      <section className="py-14 md:py-16 bg-brand-yellow text-brand-dark">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-dark leading-tight">
              {isEn
                ? "Ready to collaborate on your next event?"
                : "Siap berkolaborasi untuk event Anda berikutnya?"}
            </h2>
            <p className="mt-2 text-sm text-brand-dark/80 leading-relaxed">
              {isEn
                ? "Discuss your booth, stage, or custom decor needs directly with our in-house workshop team."
                : "Diskusikan kebutuhan booth, panggung, atau instalasi dekorasi langsung bersama tim workshop in-house kami."}
            </p>
          </div>
          <a
            href={waConsultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[44px] px-7 py-3 rounded-full bg-brand-dark hover:bg-brand-magenta text-white font-semibold text-sm shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-brand-yellow active:opacity-90"
          >
            <span>{isEn ? "Start Project Discussion" : "Mulai Diskusi Proyek"}</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
