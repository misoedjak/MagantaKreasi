"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

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

function ProductScrollRow({
  items,
  formatPrice,
  onInquiry,
  rowLabel,
}: {
  items: Product[];
  formatPrice: (price: number) => string;
  onInquiry: (name: string, priceStr: string) => void;
  rowLabel: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        el.scrollLeft += e.deltaX;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = el.clientWidth * 0.78;
    el.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  if (items.length === 0) return null;

  return (
    <div className="relative group/row">
      {/* Left Arrow Button */}
      <button
        type="button"
        onClick={() => handleScroll("left")}
        aria-label={`Geser ${rowLabel} ke kiri`}
        className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/95 border border-zinc-200 text-zinc-800 hover:border-brand-magenta hover:text-brand-magenta shadow-sm absolute -left-5 top-[38%] -translate-y-1/2 z-20 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 active:scale-95"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>

      {/* Scrollable Track: no scroll-smooth or snap-mandatory so trackpad & touch scrolling glide smoothly without fighting */}
      <div
        ref={scrollRef}
        style={{ touchAction: "pan-x pan-y" }}
        className="flex items-start gap-5 sm:gap-7 overflow-x-auto overscroll-x-none scrollbar-none pb-2 -mx-6 px-6 md:mx-0 md:px-0"
      >
        {items.map((product) => {
          const formattedPrice =
            product.price > 0
              ? `${formatPrice(product.price)} / ${product.priceUnit}`
              : "Hubungi untuk harga";

          return (
            <button
              key={product.id}
              type="button"
              onClick={() => onInquiry(product.name, formattedPrice)}
              className="group shrink-0 snap-start w-[62vw] sm:w-[40vw] md:w-[calc(33.333%-18px)] lg:w-[calc(25%-21px)] text-center flex flex-col items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-4 active:opacity-85 transition-opacity"
            >
              {/* Sharp Square Photo Frame */}
              <div className="relative aspect-square w-full bg-zinc-100 overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 62vw, (max-width: 1024px) 34vw, 24vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs font-medium">
                    Tidak Ada Gambar
                  </div>
                )}
              </div>

              {/* Product Name & Price Underneath */}
              <h3 className="font-sans font-bold text-zinc-900 text-sm sm:text-base tracking-tight mt-4 group-hover:text-brand-magenta transition-colors line-clamp-2">
                {product.name}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-zinc-500 font-medium mt-1 tabular-nums">
                {formattedPrice}
              </p>
            </button>
          );
        })}
      </div>

      {/* Right Arrow Button */}
      <button
        type="button"
        onClick={() => handleScroll("right")}
        aria-label={`Geser ${rowLabel} ke kanan`}
        className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/95 border border-zinc-200 text-zinc-800 hover:border-brand-magenta hover:text-brand-magenta shadow-sm absolute -right-5 top-[38%] -translate-y-1/2 z-20 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 active:scale-95"
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </div>
  );
}

export default function FeaturedProducts({
  products,
  whatsappNumber,
}: FeaturedProductsProps) {
  const { lang } = useLanguage();
  const isEn = lang === "en";

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

  // Split products evenly into two independent scrollable rows
  const midpoint = Math.ceil(products.length / 2);
  const firstRow = products.slice(0, midpoint);
  const secondRow = products.slice(midpoint);

  return (
    <section id="products" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Centered Minimalist Heading (PostPilot Reference Style) */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.12] max-w-2xl mx-auto">
            {isEn ? (
              <>
                Event equipment &amp;
                <br />
                production{" "}
                <span className="font-script font-normal text-brand-magenta text-4xl sm:text-5xl lg:text-[3.75rem] tracking-normal inline-block">
                  rentals.
                </span>
              </>
            ) : (
              <>
                Penyewaan alat &amp;
                <br />
                pendukung{" "}
                <span className="font-script font-normal text-brand-magenta text-4xl sm:text-5xl lg:text-[3.75rem] tracking-normal inline-block">
                  event.
                </span>
              </>
            )}
          </h2>
        </div>

        {/* Two Independent Horizontally Scrollable Product Rows */}
        <div className="space-y-12 md:space-y-14">
          <ProductScrollRow
            items={firstRow}
            formatPrice={formatPrice}
            onInquiry={handleInquiry}
            rowLabel="baris pertama katalog"
          />
          {secondRow.length > 0 && (
            <ProductScrollRow
              items={secondRow}
              formatPrice={formatPrice}
              onInquiry={handleInquiry}
              rowLabel="baris kedua katalog"
            />
          )}
        </div>

        {/* Minimal Centered Catalog Link */}
        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-brand-magenta transition-colors underline underline-offset-4 decoration-zinc-300 hover:decoration-brand-magenta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-4 active:opacity-80 rounded-xs"
          >
            <span>{isEn ? "View full catalog" : "Lihat semua katalog"}</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
