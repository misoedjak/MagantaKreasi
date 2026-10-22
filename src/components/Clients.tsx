"use client";

import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";

interface ClientItem {
  id?: string;
  name: string;
  logoUrl: string;
  portfolioSlug?: string | null;
}

interface ClientsProps {
  clients?: ClientItem[];
}

export default function Clients({ clients = [] }: ClientsProps) {
  if (!clients || clients.length === 0) return null;

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="clients"
        className="py-10 md:py-12 bg-brand-light relative border-t border-brand-magenta/10"
        suppressHydrationWarning
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-8 text-center flex flex-col items-center"
          >
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-magenta mb-2">
              Dipercaya oleh Klien Terkemuka
            </h2>
            <div className="w-10 h-1 bg-brand-yellow rounded-full" />
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            {clients.map((client, idx) => {
              const cardContent = (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="flex items-center justify-center p-2 md:p-3 hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={client.logoUrl}
                    alt={`Logo ${client.name}`}
                    loading="lazy"
                    decoding="async"
                    className="max-h-9 md:max-h-14 max-w-[110px] md:max-w-[170px] object-contain opacity-70 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              );

              if (client.portfolioSlug) {
                return (
                  <Link
                    key={client.id || idx}
                    href={`/portfolio/${client.portfolioSlug}`}
                    aria-label={`Lihat portofolio proyek ${client.name}`}
                    className="focus-visible:outline-2 focus-visible:outline-brand-magenta rounded-xl"
                  >
                    {cardContent}
                  </Link>
                );
              }

              return <div key={client.id || idx}>{cardContent}</div>;
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
