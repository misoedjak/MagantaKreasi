"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
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
  whatsappNumber?: string;
}

export default function ServicesList({
  categories,
  whatsappNumber = "6281188820067",
}: ServicesListProps) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

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
          Belum ada layanan fabrikasi. Buat kategori di dashboard admin.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-12">
          {categories.map((category, idx) => {
            const indexLabel = String(idx + 1).padStart(2, "0");
            const featureList = category.features
              ? category.features
                  .split(",")
                  .map((f) => f.trim())
                  .filter(Boolean)
              : [];

            const waInquiryUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              `Halo Maganta Kreasi, saya ingin menanyakan spesifikasi dan estimasi harga untuk ${category.name}.`
            )}`;

            return (
              <article key={category.id} className="group flex flex-col justify-between">
                <div>
                  {/* Sharp Unobstructed Editorial Photo Frame */}
                  {category.bgImageUrl && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                      <Image
                        src={category.bgImageUrl}
                        alt={`Dokumentasi fabrikasi ${category.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Hairline Top Rule + Index & Portfolio Link */}
                  <div className="pt-4 mt-4 border-t border-zinc-200 group-hover:border-brand-magenta transition-colors duration-200">
                    <div className="flex items-center justify-between gap-2 text-xs text-zinc-500">
                      <span className="font-mono font-semibold tabular-nums text-brand-magenta">
                        {indexLabel}
                      </span>
                      <Link
                        href={`/portfolio?category=${category.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-zinc-600 hover:text-brand-magenta transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 rounded-xs"
                      >
                        <span>Lihat portofolio</span>
                        <ArrowUpRight
                          size={13}
                          aria-hidden="true"
                          className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                        />
                      </Link>
                    </div>

                    {/* Title & Full Description */}
                    <h2 className="mt-2 font-sans text-lg sm:text-xl font-bold text-zinc-950 tracking-tight leading-snug">
                      {category.name}
                    </h2>

                    {category.description && (
                      <p className="mt-2 text-zinc-600 text-xs sm:text-sm leading-relaxed">
                        {category.description}
                      </p>
                    )}

                    {/* Clean Specification List */}
                    {featureList.length > 0 && (
                      <ul className="mt-4 pt-3.5 border-t border-zinc-100 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-zinc-700">
                        {featureList.slice(0, 6).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2 min-w-0" title={feat}>
                            <span
                              className="h-1.5 w-1.5 bg-brand-magenta shrink-0"
                              aria-hidden="true"
                            />
                            <span className="truncate font-medium">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Clean Action Row */}
                <div className="mt-6 pt-4 border-t border-zinc-200/80 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleRequestQuote(category.name)}
                    className="inline-flex items-center justify-center gap-1.5 flex-1 min-h-[42px] px-4 py-2 bg-brand-magenta hover:bg-brand-magenta-hover text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 active:opacity-90"
                  >
                    <span>Minta Penawaran</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </button>

                  <a
                    href={waInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Konsultasi ${category.name} via WhatsApp`}
                    aria-label={`Konsultasi ${category.name} via WhatsApp`}
                    className="inline-flex items-center justify-center min-h-[42px] min-w-[42px] border border-zinc-200 hover:border-brand-magenta text-zinc-700 hover:text-brand-magenta transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 active:opacity-80"
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
