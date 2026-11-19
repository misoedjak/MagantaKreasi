"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import QuoteDialog from "@/components/QuoteDialog";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  features: string | null;
  bgImageUrl: string | null;
}

interface ServicesListProps {
  categories: CategoryItem[];
  whatsappNumber?: string;
}

function getServiceMeta(slug: string, fallbackDesc?: string | null, fallbackUrl?: string | null) {
  const lower = slug.toLowerCase();
  if (lower.includes("branding")) {
    return {
      artwork: "/images/service-branding-area-v3.jpg",
      frameBg: "bg-[#FAF6F8]",
      descId: "Area registrasi, foyer, dan titik aktivasi brand dengan konstruksi rapi sesuai identitas acara.",
      descEn: "Registration desks, foyers, and brand activation zones built cleanly to match your event identity.",
      specsId: ["Backdrop & Wall Branding", "Stiker Vinyl & Cutting", "Logo Timbul & LED"],
      specsEn: ["Custom Brand Walls", "Vinyl & Cut Graphics", "3D Illuminated Logos"],
    };
  }
  if (lower.includes("booth")) {
    return {
      artwork: "/images/service-exhibition-booth-v2.jpg",
      frameBg: "bg-brand-yellow",
      descId: "Booth pameran custom dari rangka kayu, besi, finishing duco/HPL, hingga pencahayaan.",
      descEn: "Custom exhibition booths from wood and steel framing to duco/HPL finishing and lighting.",
      specsId: ["Rangka Kayu & Besi", "Finishing Duco / HPL", "Lampu & Kelistrikan"],
      specsEn: ["Wood & Steel Framing", "Duco / HPL Finishing", "Built-in Lighting"],
    };
  }
  if (lower.includes("stage") || lower.includes("panggung")) {
    return {
      artwork: "/images/service-custom-stage-v2.jpg",
      frameBg: "bg-[#FDFBF8]",
      descId: "Panggung korporat, konferensi, dan panggung utama dengan struktur kokoh dan presisi.",
      descEn: "Corporate, conference, and main event stages engineered for structural safety and clean lines.",
      specsId: ["Rangka Panggung Kokoh", "Karpet & Lis Rapi", "Tangga & Ramp Akses"],
      specsEn: ["Load-Rated Framing", "Clean Carpet & Trim", "Steps & Access Ramps"],
    };
  }
  if (lower.includes("decorative") || lower.includes("installation")) {
    return {
      artwork: "/images/service-decorative-installation-v2.jpg",
      frameBg: "bg-[#FAFAFA]",
      descId: "Instalasi dekorasi tematik 3D dan elemen visual custom untuk mall maupun venue acara.",
      descEn: "Thematic 3D decorative installations and custom visual centerpieces for malls and venues.",
      specsId: ["Prop & Ornamen 3D", "Struktur Tematik", "Finishing Detail Halus"],
      specsEn: ["3D Props & Ornaments", "Thematic Structures", "Fine Detail Finishing"],
    };
  }
  if (lower.includes("gate") || lower.includes("gerbang")) {
    return {
      artwork: "/images/service-entrance-gate.jpg",
      frameBg: "bg-[#F06449]",
      descId: "Gerbang masuk utama dan fasad sambutan dengan struktur aman untuk indoor maupun outdoor.",
      descEn: "Main entrance gates and welcome facades engineered for both indoor and outdoor venues.",
      specsId: ["Rangka Besi Stabil", "Indoor & Outdoor", "Signage Fasad Sambutan"],
      specsEn: ["Reinforced Steel Frame", "Indoor & Outdoor", "Welcome Facade Signage"],
    };
  }
  if (lower.includes("backdrop")) {
    return {
      artwork: "/images/service-event-backdrop.jpg",
      frameBg: "bg-brand-magenta",
      descId: "Backdrop panggung, photowall, dan media wall dengan rangka presisi dan visual rata.",
      descEn: "Stage backdrops, photowalls, and media walls built with precision frames and flat finishes.",
      specsId: ["Rangka Rapat & Rata", "Print Tajam Anti-Silau", "Pemasangan Cepat"],
      specsEn: ["Seamless Flat Frame", "Matte High-Res Print", "Fast Venue Setup"],
    };
  }
  if (lower.includes("festival")) {
    return {
      artwork: "/images/service-festival-decoration-v2.jpg",
      frameBg: "bg-brand-yellow",
      descId: "Dekorasi panggung festival, area konser, dan instalasi visual skala besar di ruang terbuka.",
      descEn: "Festival stage decor, concert builds, and large-scale open-air visual installations.",
      specsId: ["Fasad Panggung Besar", "Dekorasi Area Terbuka", "Tahan Cuaca & Angin"],
      specsEn: ["Large Stage Facades", "Open-Air Decor", "Weather-Resistant Build"],
    };
  }
  if (lower.includes("totem") || lower.includes("sign")) {
    return {
      artwork: "/images/service-totem-signage.jpg",
      frameBg: "bg-[#FDF8F2]",
      descId: "Totem wayfinding, huruf timbul 3D, dan signage area untuk navigasi pengunjung.",
      descEn: "Wayfinding totems, 3D raised lettering, and area signage for clear visitor navigation.",
      specsId: ["Totem Penunjuk Arah", "Huruf Timbul 3D", "Rapi & Mudah Dibaca"],
      specsEn: ["Wayfinding Totems", "3D Raised Lettering", "Clear Venue Signage"],
    };
  }
  return {
    artwork: fallbackUrl || null,
    frameBg: "bg-paper-cream",
    descId: fallbackDesc || "Konstruksi dan dekorasi event langsung dari workshop in-house kami.",
    descEn: "Event construction and custom decor fabricated directly from our in-house workshop.",
    specsId: ["Produksi Workshop Sendiri", "Material Pilihan", "Pemasangan Tepat Waktu"],
    specsEn: ["In-House Workshop Build", "Quality Materials", "On-Time Installation"],
  };
}

export default function ServicesList({
  categories,
  whatsappNumber = "6281188820067",
}: ServicesListProps) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { lang } = useLanguage();
  const isEn = lang === "en";

  const handleRequestQuote = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setQuoteOpen(true);
  };

  const categoryOptions = useMemo(
    () => categories.map((c) => ({ id: c.id, name: c.name })),
    [categories]
  );

  return (
    <>
      {categories.length === 0 ? (
        <div className="py-16 text-center text-zinc-600 text-sm border border-dashed border-zinc-300">
          {isEn
            ? "No fabrication services available yet."
            : "Belum ada layanan fabrikasi. Buat kategori di dashboard admin."}
        </div>
      ) : (
        /* Symmetrical 2-Column Editorial Grid (4 balanced rows for 8 services, zero orphan gaps) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-10 gap-y-12 lg:gap-y-14">
          {categories.map((category, idx) => {
            const indexLabel = String(idx + 1).padStart(2, "0");
            const meta = getServiceMeta(category.slug, category.description, category.bgImageUrl);
            const artworkUrl = meta.artwork;
            const featureList = isEn ? meta.specsEn : meta.specsId;

            const waInquiryUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              `Halo Maganta Kreasi, saya ingin menanyakan spesifikasi dan estimasi harga untuk ${category.name}.`
            )}`;

            return (
              <article
                key={category.id}
                className="group flex flex-col justify-between bg-white border border-zinc-200/90 hover:border-brand-magenta/50 transition-colors duration-200 p-5 sm:p-6"
              >
                <div>
                  {/* Custom Editorial Service Artwork Frame (object-contain on matched canvas so nothing ever crops) */}
                  {artworkUrl && (
                    <div className={`relative aspect-[4/3] w-full overflow-hidden ${meta.frameBg}`}>
                      <Image
                        src={artworkUrl}
                        alt={`Ilustrasi layanan ${category.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain"
                      />
                    </div>
                  )}

                  {/* Editorial Header Row: Bold Sans Number + Portfolio Link */}
                  <div className="pt-5 mt-5 border-t border-zinc-200 group-hover:border-brand-magenta transition-colors duration-200">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-sans text-sm font-extrabold text-brand-magenta tabular-nums">
                        {indexLabel}
                      </span>
                      <Link
                        href={`/portfolio?category=${category.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-brand-magenta transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 rounded-xs"
                      >
                        <span>{isEn ? "View portfolio" : "Lihat portofolio"}</span>
                        <ArrowUpRight
                          size={13}
                          aria-hidden="true"
                          className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                        />
                      </Link>
                    </div>

                    {/* Title & Concise 1-Sentence Description */}
                    <h2 className="mt-2 font-display text-xl sm:text-2xl font-extrabold text-zinc-950 tracking-tight leading-snug">
                      {category.name}
                    </h2>

                    <p className="mt-2 text-zinc-600 text-sm leading-relaxed">
                      {isEn ? meta.descEn : meta.descId}
                    </p>

                    {/* Top 3 Compact Specification Chips */}
                    {featureList.length > 0 && (
                      <ul className="mt-4 pt-3.5 border-t border-zinc-100 flex flex-wrap gap-2">
                        {featureList.map((feat, fIdx) => (
                          <li
                            key={fIdx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-paper-cream text-brand-dark text-xs font-medium"
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-brand-magenta shrink-0"
                              aria-hidden="true"
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Clean Pill Action Row matching Homepage & Hero CTAs */}
                <div className="mt-6 pt-5 border-t border-zinc-200/80 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleRequestQuote(category.name)}
                    className="inline-flex items-center justify-center gap-1.5 flex-1 min-h-[44px] px-5 py-2.5 rounded-full bg-brand-magenta hover:bg-brand-magenta-hover text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 active:opacity-90"
                  >
                    <span>{isEn ? "Request Quote" : "Minta Penawaran"}</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </button>

                  <a
                    href={waInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Konsultasi ${category.name} via WhatsApp`}
                    aria-label={`Konsultasi ${category.name} via WhatsApp`}
                    className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full border border-zinc-200 hover:border-brand-magenta hover:bg-paper-cream text-zinc-700 hover:text-brand-magenta transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 active:opacity-80"
                  >
                    <MessageCircle size={17} aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Quote Dialog */}
      <QuoteDialog
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        categories={categoryOptions}
        preselectedCategory={selectedCategory}
      />
    </>
  );
}
