"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Mail, 
  FileText, 
  MapPin, 
  RefreshCw
} from "lucide-react";
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

  return (
    <section id="contact" className="py-12 md:py-24 bg-brand-magenta text-white relative" suppressHydrationWarning>
      <div className="container mx-auto px-6 md:px-12" suppressHydrationWarning>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* CTA Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-2xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 text-white">
              Mari Bangun Event Anda Bersama Kami.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-8 max-w-lg">
              Hubungi tim kami hari ini untuk mendiskusikan kebutuhan fabrikasi event Anda, anggaran, dan meminta penawaran detail.
            </p>
            
            <div className="w-full flex flex-col sm:flex-row gap-4 items-center" suppressHydrationWarning>
              <a
                href={formattedWhatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-brand-yellow text-black font-semibold text-sm sm:text-base hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-black/10 hover:shadow-brand-yellow/20"
              >
                <MessageCircle size={20} /> WhatsApp
              </a>
              <a
                href={`mailto:${profile?.email || "hello@magantakreasi.com"}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-transparent border-2 border-white text-white font-semibold text-sm sm:text-base hover:bg-white hover:text-brand-magenta hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Mail size={20} /> Email
              </a>

              {/* Request Quotation Link Trigger */}
              <Link 
                href="?quote=open"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-transparent border-2 border-white text-white font-semibold text-sm sm:text-base hover:bg-white hover:text-brand-magenta hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <FileText size={20} /> Pesan sekarang
              </Link>

            </div>
          </motion.div>

          {/* Map & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#8a1a45] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <div data-impeccable-variants="033bc5ac" data-impeccable-variant-count="3" style={{ display: "contents" }}>
              {/* impeccable-variants-start 033bc5ac */}
              {/* Original */}
              <div data-impeccable-variant="original">
                <div className="p-8 pb-6">
                  <h3 className="font-heading text-2xl font-bold mb-4 flex items-center gap-2 text-white">
                    <MapPin className="text-brand-yellow" /> Kantor & Workshop
                  </h3>
                  <p className="text-pink-100/90 mb-2 whitespace-pre-line text-sm leading-relaxed">
                    {profile?.address || "Jakarta, Indonesia\nMelayani fabrikasi untuk seluruh Indonesia."}
                  </p>
                </div>
              </div>
              {/* Variants: insert below this line */}
              <style data-impeccable-css="033bc5ac">{`
                @scope ([data-impeccable-variant="1"]) {
                  :scope > div {
                    padding: 2rem;
                  }
                }
                @scope ([data-impeccable-variant="2"]) {
                  :scope > div {
                    padding: 2rem;
                    background: linear-gradient(135deg, #8a1a45 0%, #be3168 100%);
                  }
                }
                @scope ([data-impeccable-variant="3"]) {
                  :scope > div {
                    padding: 2.5rem 2rem;
                    border-top: 4px solid #FFD400;
                  }
                }
              `}</style>
              <div data-impeccable-variant="1" style={{ display: "none" }}>
                <div className="p-8 pb-6">
                  <h3 className="font-heading text-2xl font-bold mb-4 flex items-center gap-2 text-white">
                    <MapPin className="text-brand-yellow" /> Kantor & Workshop
                  </h3>
                  <p className="text-pink-100/90 mb-2 whitespace-pre-line text-sm leading-relaxed">
                    {(profile?.address || "Jakarta, Indonesia").split(/Phone:/i)[0].trim()}
                  </p>
                </div>
              </div>
              <div data-impeccable-variant="2" style={{ display: "none" }}>
                <div className="p-8 pb-6 rounded-3xl">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 mb-4">
                    <MapPin className="text-brand-yellow" size={20} />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3 text-white">
                    Lokasi Workshop
                  </h3>
                  <p className="text-white/90 whitespace-pre-line text-sm leading-relaxed">
                    {(profile?.address || "Jakarta, Indonesia").split(/Phone:/i)[0].trim()}
                  </p>
                </div>
              </div>
              <div data-impeccable-variant="3" style={{ display: "none" }}>
                <div className="p-8 pb-6">
                  <h3 className="font-heading text-2xl font-bold mb-4 flex items-center gap-2 text-white">
                    <MapPin className="text-brand-yellow" /> Kantor & Workshop Utama
                  </h3>
                  <p className="text-pink-100/80 mb-2 whitespace-pre-line text-sm leading-relaxed font-light">
                    {(profile?.address || "Jakarta, Indonesia").split(/Phone:/i)[0].trim()}
                  </p>
                </div>
              </div>
              {/* impeccable-variants-end 033bc5ac */}
            </div>

            {/* Google Maps Embed */}
            <div className="w-full h-64 bg-white/10 relative">
              {(() => {
                let mapSrc = "https://maps.google.com/maps?q=-6.2846527,107.0533447&hl=id&z=17&output=embed";
                if (profile?.mapUrl && profile.mapUrl.includes("embed")) {
                  mapSrc = profile.mapUrl;
                } else if (profile?.address) {
                  const cleanAddrForMap = profile.address.split(/Phone:/i)[0].trim();
                  mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(cleanAddrForMap)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
                }
                return (
                  <>
                    <iframe 
                      key={mapKey}
                      src={mapSrc} 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(1.1) opacity(0.85)" }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <button
                      type="button"
                      onClick={() => setMapKey(prev => prev + 1)}
                      className="absolute top-2 left-[142px] z-10 h-[34px] px-3 rounded-sm bg-[#1a1a1a] border border-[#2c2c2c] flex items-center gap-1.5 text-xs font-bold text-[#e8e8e8] hover:text-white transition-all shadow-md active:scale-95 hover:bg-[#2a2a2a]"
                      title="Tengahkan Peta"
                    >
                      <RefreshCw size={11} className="shrink-0 text-brand-yellow" />
                      <span>Tengahkan</span>
                    </button>
                  </>
                );
              })()}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
