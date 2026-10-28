"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { 
  Building2, 
  Layers, 
  Maximize2, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
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
  if (lower.includes("booth") || lower.includes("pameran")) return <Building2 size={24} aria-hidden="true" />;
  if (lower.includes("stage") || lower.includes("panggung")) return <Layers size={24} aria-hidden="true" />;
  if (lower.includes("backdrop") || lower.includes("dekorasi")) return <Maximize2 size={24} aria-hidden="true" />;
  if (lower.includes("gate") || lower.includes("gerbang")) return <FileCheck size={24} aria-hidden="true" />;
  if (lower.includes("sign") || lower.includes("totem") || lower.includes("direction")) return <MapPin size={24} aria-hidden="true" />;
  return <Sparkles size={24} aria-hidden="true" />;
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
        <div className="py-24 text-center text-zinc-600 text-sm border border-dashed border-zinc-200 rounded-3xl">
          Belum ada layanan fabrikasi. Buat kategori di dashboard admin!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category) => {
            const featureList = category.features 
              ? category.features.split(",").map(f => f.trim()).filter(Boolean)
              : [];

            const waInquiryUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
              `Halo Maganta Kreasi, saya ingin menanyakan spesifikasi dan penawaran untuk layanan ${category.name}.`
            )}`;

            return (
              <div 
                key={category.id} 
                className="glass-card p-6 sm:p-8 border border-brand-magenta/10 hover:border-brand-magenta/40 transition-all rounded-3xl flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div className="space-y-6">
                  {/* Card Header Image */}
                  {category.bgImageUrl && (
                    <div className="relative aspect-[16/8] w-full rounded-2xl overflow-hidden border border-zinc-100/90 shadow-xs shrink-0 bg-zinc-100">
                      <Image 
                        src={category.bgImageUrl} 
                        alt={`Dokumentasi fabrikasi ${category.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover hover:scale-[1.02] motion-reduce:transform-none transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Icon & Name */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-brand-magenta/10 flex items-center justify-center text-brand-magenta shrink-0">
                      {getCategoryIcon(category.slug)}
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-dark tracking-tight">
                      {category.name}
                    </h3>
                  </div>

                  {/* Description */}
                  {category.description && (
                    <p className="text-zinc-600 text-sm leading-relaxed font-light">
                      {category.description}
                    </p>
                  )}

                  {/* Feature Bullets */}
                  {featureList.length > 0 && (
                    <div className="space-y-2.5 pt-2">
                      <p className="text-xs text-zinc-500 uppercase font-semibold tracking-wider">
                        Fitur & Kelengkapan
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700">
                        {featureList.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 bg-zinc-50/80 p-2 rounded-lg border border-zinc-100">
                            <ShieldCheck className="h-4 w-4 text-brand-magenta shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Call-to-Action Action Bar */}
                <div className="pt-6 mt-6 border-t border-brand-magenta/10 flex flex-wrap items-center justify-between gap-3">
                  <button 
                    type="button"
                    onClick={() => handleRequestQuote(category.name)}
                    className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl min-h-[44px] bg-brand-magenta text-white hover:bg-brand-magenta/90 text-xs font-semibold transition-all cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:outline-none"
                  >
                    <span>Minta Penawaran Spesifikasi</span>
                    <ChevronRight size={15} aria-hidden="true" />
                  </button>

                  <a
                    href={waInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 py-2.5 px-3.5 rounded-xl min-h-[44px] text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
                  >
                    <MessageCircle size={15} className="text-emerald-600" aria-hidden="true" />
                    <span>Tanya WhatsApp</span>
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
