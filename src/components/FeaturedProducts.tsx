"use client";

import { useRef } from "react";
import { motion, MotionConfig } from "framer-motion";
import { MessageSquare, ArrowRight, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  priceUnit: string;
  description: string | null;
  image: string | null;
  featured: boolean;
  status: string;
  categoryId: string;
  category: {
    name: string;
  };
}

interface FeaturedProductsProps {
  products: Product[];
  whatsappNumber: string;
}

export default function FeaturedProducts({ products, whatsappNumber }: FeaturedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace("IDR", "Rp");
  };

  const handleInquiry = (productName: string, priceStr: string) => {
    let cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
    if (cleanNumber.startsWith("0")) {
      cleanNumber = "62" + cleanNumber.substring(1);
    }
    const message = encodeURIComponent(
      `Halo Maganta Kreasi, saya tertarik untuk menyewa/memesan produk berikut:\n\n*Produk:* ${productName}\n*Harga:* ${priceStr}\n\nMohon info ketersediaan untuk event saya. Terima kasih!`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <section className="py-10 lg:py-14 bg-brand-light relative overflow-hidden border-t border-brand-magenta/10">
        {/* Background accents */}
        <div
          className="absolute top-0 right-0 w-80 h-80 bg-brand-magenta/5 rounded-full blur-3xl opacity-40 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 bg-brand-yellow/10 rounded-full blur-3xl opacity-30 pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 lg:mb-8 gap-4">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-magenta/10 border border-brand-magenta/15 text-brand-magenta text-xs font-bold uppercase tracking-wider mb-3">
                <Tag size={12} aria-hidden="true" /> Rental Peralatan Event
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
                Penyewaan Alat &{" "}
                <span className="text-brand-magenta relative inline-block text-glow-magenta font-bold">
                  Pendukung Event
                  <span className="absolute bottom-1 left-0 w-full h-1.5 bg-brand-yellow -z-10 rounded-full opacity-80" />
                </span>
              </h2>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mt-2.5 max-w-lg">
                Lengkapi kebutuhan acara Anda dengan peralatan berkualitas premium. Tersedia sistem
                pencahayaan (lighting), panggung, sound system, dan pendukung fabrikasi lainnya.
              </p>
            </div>

            <Link
              href="/products"
              className="min-h-[44px] inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-magenta hover:text-brand-magenta-hover group shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-brand-magenta rounded-lg px-2"
            >
              <span>Lihat Semua Katalog</span>
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Carousel Container */}
          <div className="relative group/slider">
            <div
              ref={scrollRef}
              className="flex items-stretch gap-4 md:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth -mx-6 px-6 md:-mx-10 md:px-10 lg:mx-0 lg:px-0 scroll-pl-6 md:scroll-pl-10 lg:scroll-pl-0 scrollbar-none"
            >
              {products.map((product, idx) => {
                const formattedPrice =
                  product.price > 0
                    ? `${formatPrice(product.price)} / ${product.priceUnit}`
                    : "Custom / Hubungi Tim";
                return (
                  <div
                    key={product.id}
                    className="min-w-[74vw] sm:min-w-[42vw] lg:min-w-[calc(25%-15px)] lg:max-w-[calc(25%-15px)] snap-start snap-always shrink-0 flex w-full"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="group bg-white rounded-2xl overflow-hidden border border-zinc-200/80 hover:-translate-y-1 hover:shadow-xl hover:border-brand-magenta/30 transition-all duration-300 flex flex-col w-full"
                    >
                      {/* Image container */}
                      <div className="relative aspect-video w-full bg-brand-gray overflow-hidden flex items-center justify-center shrink-0 border-b border-zinc-100">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-zinc-500 gap-1">
                            <Tag size={16} aria-hidden="true" />
                            <span className="text-xs font-medium">Tidak Ada Gambar</span>
                          </div>
                        )}
                        {product.featured && (
                          <div className="absolute top-2.5 left-2.5 bg-brand-yellow text-brand-dark font-bold text-xs px-2.5 py-0.5 rounded-full shadow-sm">
                            Terpopuler
                          </div>
                        )}
                      </div>

                      {/* Body Content */}
                      <div className="p-3.5 sm:p-4 flex flex-col grow">
                        <span className="text-xs font-bold text-brand-magenta tracking-wider uppercase mb-0.5 block">
                          {product.category.name}
                        </span>
                        <h3 className="font-heading font-bold text-zinc-900 group-hover:text-brand-magenta transition-colors mb-2.5 line-clamp-1 text-xs sm:text-sm">
                          {product.name}
                        </h3>

                        {/* Price and Action (WCAG AA contrast + 44px touch target) */}
                        <div className="pt-2.5 border-t border-zinc-100 mt-auto flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <span className="text-xs text-zinc-600 block font-medium leading-tight mb-0.5">
                              Harga Sewa
                            </span>
                            <span className="text-brand-magenta font-bold text-xs sm:text-sm truncate block">
                              {product.price > 0 ? (
                                <>
                                  {formatPrice(product.price)}
                                  <span className="text-xs text-zinc-600 font-normal">
                                    /{product.priceUnit}
                                  </span>
                                </>
                              ) : (
                                "Custom / Hubungi Tim"
                              )}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleInquiry(product.name, formattedPrice)}
                            aria-label={`Sewa ${product.name} via WhatsApp`}
                            className="shrink-0 min-h-[40px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-brand-whatsapp text-white font-semibold text-xs hover:bg-brand-whatsapp-hover active:scale-95 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-magenta"
                          >
                            <MessageSquare size={13} className="shrink-0" aria-hidden="true" />
                            <span>Sewa</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Left Arrow Button */}
            <button
              type="button"
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/95 border border-zinc-200 text-zinc-800 items-center justify-center shadow-md hover:bg-brand-magenta hover:text-white hover:border-brand-magenta active:scale-95 transition-all opacity-0 group-hover/slider:opacity-100 focus-visible:opacity-100 hidden md:flex cursor-pointer"
              aria-label="Geser produk ke kiri"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>

            {/* Right Arrow Button */}
            <button
              type="button"
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/95 border border-zinc-200 text-zinc-800 items-center justify-center shadow-md hover:bg-brand-magenta hover:text-white hover:border-brand-magenta active:scale-95 transition-all opacity-0 group-hover/slider:opacity-100 focus-visible:opacity-100 hidden md:flex cursor-pointer"
              aria-label="Geser produk ke kanan"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Swipe Indicator (Mobile Only) */}
          <div className="flex md:hidden items-center justify-center gap-1.5 mt-2 text-zinc-600 text-xs font-medium">
            <span>← Geser untuk melihat produk lainnya →</span>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
