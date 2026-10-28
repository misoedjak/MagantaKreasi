"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { 
  Building2, 
  Layers, 
  Maximize2, 
  Sparkles, 
  MapPin, 
  ChevronRight,
  MessageCircle,
  FileCheck
} from "lucide-react";
import QuoteDialog from "@/components/QuoteDialog";

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
}

function getCategoryIcon(slug: string) {
  const lower = slug.toLowerCase();
  if (lower.includes("booth") || lower.includes("pameran")) return <Building2 size={18} aria-hidden="true" />;
  if (lower.includes("stage") || lower.includes("panggung")) return <Layers size={18} aria-hidden="true" />;
  if (lower.includes("backdrop") || lower.includes("dekorasi")) return <Maximize2 size={18} aria-hidden="true" />;
  if (lower.includes("gate") || lower.includes("gerbang")) return <FileCheck size={18} aria-hidden="true" />;
  if (lower.includes("sign") || lower.includes("totem") || lower.includes("direction")) return <MapPin size={18} aria-hidden="true" />;
  return <Sparkles size={18} aria-hidden="true" />;
}

export default function ServicesList({ categories }: ServicesListProps) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleRequestQuote = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setQuoteOpen(true);
  };

  const categoryOptions = useMemo(() => categories.map(c => ({ id: c.id, name: c.name })), [categories]);

  return (
    <>
      {categories.length === 0 ? (
        <div className="py-16 text-center text-zinc-600 text-sm border border-dashed border-zinc-200 rounded-2xl">
          Belum ada layanan fabrikasi. Buat kategori di dashboard admin!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((category) => {
            const featureList = category.features 
              ? category.features.split(",").map(f => f.trim()).filter(Boolean)
              : [];

            const waInquiryUrl = `https://wa.me/6281188820067?text=${encodeURIComponent(
              `Halo Maganta Kreasi, saya ingin menanyakan spesifikasi dan estimasi harga untuk ${category.name}.`
            )}`;

            return (
              <div 
                key={category.id} 
                className="group bg-white p-4 sm:p-5 border border-zinc-200/90 hover:border-brand-magenta/40 transition-all rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div className="space-y-3.5">
                  {/* Card Thumbnail Image */}
                  {category.bgImageUrl && (
                    <div className="relative h-40 sm:h-44 w-full rounded-xl overflow-hidden border border-zinc-100 bg-zinc-100 shrink-0">
                      <Image 
                        src={category.bgImageUrl} 
                        alt={`Dokumentasi fabrikasi ${category.name}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 motion-reduce:transform-none transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Icon & Title */}
                  <div className="flex items-center gap-2.5 pt-0.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-magenta/10 flex items-center justify-center text-brand-magenta shrink-0">
                      {getCategoryIcon(category.slug)}
                    </div>
                    <h3 className="font-heading text-base font-bold text-zinc-900 tracking-tight leading-snug line-clamp-1" title={category.name}>
                      {category.name}
                    </h3>
                  </div>

                  {/* Description */}
                  {category.description && (
                    <p className="text-zinc-600 text-xs leading-relaxed font-normal line-clamp-2 min-h-[34px]" title={category.description}>
                      {category.description}
                    </p>
                  )}

                  {/* Compact Feature Bullets */}
                  {featureList.length > 0 && (
                    <div className="space-y-1.5 pt-1 border-t border-zinc-100/80">
                      <p className="text-xs text-zinc-400 uppercase font-semibold tracking-wider">
                        Fitur & Kelengkapan
                      </p>
                      <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-zinc-700">
                        {featureList.slice(0, 6).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5 min-w-0" title={feat}>
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-magenta shrink-0" aria-hidden="true" />
                            <span className="truncate text-xs text-zinc-700 font-medium">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Compact Action Bar */}
                <div className="pt-3 mt-4 border-t border-zinc-100 flex items-center justify-between gap-2">
                  <button 
                    type="button"
                    onClick={() => handleRequestQuote(category.name)}
                    className="inline-flex items-center justify-center gap-1 flex-1 py-2 px-3 rounded-lg min-h-[40px] bg-brand-magenta text-white hover:bg-brand-magenta/90 text-xs font-semibold transition-colors cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:outline-none"
                  >
                    <span>Minta Penawaran</span>
                    <ChevronRight size={14} aria-hidden="true" />
                  </button>

                  <a
                    href={waInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Konsultasi cepat via WhatsApp"
                    className="inline-flex items-center justify-center p-2 rounded-lg min-h-[40px] min-w-[40px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
                  >
                    <MessageCircle size={16} className="text-emerald-600" aria-hidden="true" />
                    <span className="sr-only">Tanya WhatsApp</span>
                  </a>
                </div>
              </div>
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
