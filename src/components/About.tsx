"use client";

import React from "react";
import Image from "next/image";

interface AboutProps {
  settings?: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    features: string;
  } | null;
  stats?: {
    id: string;
    number: string;
    label: string;
  }[] | null;
}

export default function About(_props: AboutProps) {
  const metrics = [
    { number: "500+", label: "Proyek Terpasang" },
    { number: "100%", label: "Produksi In-House" },
    { number: "24/7", label: "Tim Teknis Siaga" },
  ];

  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-white border-b border-zinc-200/80 relative z-10"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Narrative & Hairline Metrics */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-magenta mb-3">
              Tentang Workshop Kami
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 leading-[1.12] mb-5">
              Dikerjakan Langsung dari Workshop Sendiri.
            </h2>

            <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
              <p>
                Maganta Kreasi adalah workshop produksi event dan pameran. Kami
                mengerjakan pembuatan booth pameran, panggung acara, backdrop,
                hingga totem dan signage dengan konstruksi yang kuat dan
                finishing rapi.
              </p>
              <p>
                Seluruh proses—mulai dari potong rangka, perkayuan, pengecatan,
                hingga bongkar-pasang di lokasi—dikerjakan langsung oleh tim
                in-house kami sendiri tanpa dilempar ke pihak ketiga, sehingga
                kualitas dan ketepatan waktu selalu terjaga.
              </p>
            </div>

            {/* Clean Architectural Metrics Row (Replaces the 4 Magenta Boxes) */}
            <dl className="w-full grid grid-cols-3 gap-6 pt-7 mt-8 border-t border-zinc-200">
              {metrics.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <dt className="text-xs text-zinc-500 font-medium order-2 mt-1">
                    {item.label}
                  </dt>
                  <dd className="font-heading text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight tabular-nums order-1">
                    {item.number}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right Column: Authentic Crew & Fabrication Diptych */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-12 gap-3 sm:gap-4 items-end">
              {/* Primary Crew Carpentry Photo */}
              <div className="col-span-7 relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-100">
                <Image
                  src="/uploads/portfolio/cedea-20th-anniversary/photo-6.jpg"
                  alt="Tim produksi Maganta Kreasi merakit rangka kayu"
                  fill
                  sizes="(max-width: 1024px) 55vw, 320px"
                  className="object-cover"
                />
              </div>

              {/* Secondary Crew Finishing Photo */}
              <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-100">
                  <Image
                    src="/uploads/portfolio/cedea-20th-anniversary/photo-9.jpg"
                    alt="Proses pengecatan dan finishing totem oleh kru Maganta Kreasi"
                    fill
                    sizes="(max-width: 1024px) 40vw, 240px"
                    className="object-cover"
                  />
                </div>
                <p className="text-xs text-zinc-500 leading-snug px-0.5">
                  Dokumentasi kru produksi Maganta saat perakitan rangka &amp;
                  finishing di lapangan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
