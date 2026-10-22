"use client";

import React, { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { MessageCircle, Mail, FileText, MapPin, RefreshCw } from "lucide-react";
import Link from "next/link";

interface ContactProps {
  profile?: {
    email: string | null;
    phone: string | null;
    phoneName: string | null;
    phone2: string | null;
    phone2Name: string | null;
    address: string | null;
    mapUrl: string | null;
    whatsapp: string | null;
    whatsappName: string | null;
    whatsapp2: string | null;
    whatsapp2Name: string | null;
  } | null;
  categories?: {
    id: string;
    name: string;
  }[];
  selectedEventId?: string;
}

export default function Contact({ profile }: ContactProps) {
  const [mapKey, setMapKey] = useState(0);

  const formattedWhatsapp = profile?.whatsapp
    ? (() => {
        let clean = profile.whatsapp.replace(/[^0-9]/g, "");
        if (clean.startsWith("0")) {
          clean = "62" + clean.substring(1);
        }
        return `https://wa.me/${clean}`;
      })()
    : "https://wa.me/6281234567890";

  const cleanAddress = (
    profile?.address || "Jakarta, Indonesia\nMelayani fabrikasi untuk seluruh Indonesia."
  )
    .split(/Phone:/i)[0]
    .trim();

  let mapSrc = "https://maps.google.com/maps?q=-6.2846527,107.0533447&hl=id&z=17&output=embed";
  if (profile?.mapUrl && profile.mapUrl.includes("embed")) {
    mapSrc = profile.mapUrl;
  } else if (profile?.address) {
    mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(cleanAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="contact"
        className="py-12 md:py-16 bg-brand-magenta text-white relative"
        suppressHydrationWarning
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10" suppressHydrationWarning>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* CTA Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
                Mari Bangun Event Anda Bersama Kami.
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-white/90 mb-6 max-w-md leading-relaxed">
                Hubungi tim kami hari ini untuk mendiskusikan kebutuhan fabrikasi event Anda,
                anggaran, dan meminta penawaran detail.
              </p>

              <div
                className="w-full flex flex-col sm:flex-row flex-wrap gap-3 items-center"
                suppressHydrationWarning
              >
                <a
                  href={formattedWhatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brand-yellow text-brand-dark font-semibold text-xs sm:text-sm hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`mailto:${profile?.email || "hello@magantakreasi.com"}`}
                  className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-transparent border-2 border-white text-white font-semibold text-xs sm:text-sm hover:bg-white hover:text-brand-magenta hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                >
                  <Mail size={17} aria-hidden="true" />
                  <span>Email</span>
                </a>

                <Link
                  href="?quote=open"
                  className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-transparent border-2 border-white text-white font-semibold text-xs sm:text-sm hover:bg-white hover:text-brand-magenta hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
                >
                  <FileText size={17} aria-hidden="true" />
                  <span>Pesan Sekarang</span>
                </Link>
              </div>
            </motion.div>

            {/* Clean, Hardened Workshop & Map Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-magenta-wine text-white rounded-3xl overflow-hidden shadow-2xl border border-white/15"
            >
              <div className="p-6 pb-5">
                <h3 className="font-heading text-lg sm:text-xl font-bold mb-2.5 flex items-center gap-2 text-white">
                  <MapPin className="text-brand-yellow shrink-0" size={20} aria-hidden="true" />
                  <span>Kantor & Workshop</span>
                </h3>
                <p className="text-white/90 whitespace-pre-line text-xs sm:text-sm leading-relaxed">
                  {cleanAddress}
                </p>
              </div>

              {/* Google Maps Embed */}
              <div className="w-full h-56 sm:h-60 bg-black/20 relative">
                <iframe
                  key={mapKey}
                  src={mapSrc}
                  title="Peta Lokasi Kantor dan Workshop Maganta Kreasi"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: "grayscale(100%) invert(90%) contrast(1.1) opacity(0.85)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <button
                  type="button"
                  onClick={() => setMapKey((prev) => prev + 1)}
                  className="absolute bottom-3 left-3 z-10 min-h-[40px] px-3.5 py-2 rounded-xl bg-brand-dark/90 backdrop-blur-md border border-white/20 flex items-center gap-2 text-xs font-bold text-white hover:bg-brand-dark transition-all shadow-lg active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-yellow"
                  aria-label="Tengahkan ulang peta lokasi workshop"
                >
                  <RefreshCw size={13} className="shrink-0 text-brand-yellow" aria-hidden="true" />
                  <span>Tengahkan Peta</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
