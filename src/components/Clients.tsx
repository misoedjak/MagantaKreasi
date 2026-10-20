"use client";

import { motion } from "framer-motion";
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
  const listToRender = clients;

  return (
    <section id="clients" className="py-10 md:py-16 bg-brand-light relative border-t border-brand-magenta/5" suppressHydrationWarning>
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-10 text-center flex flex-col items-center"
        >
          <h2 className="font-heading text-xl sm:text-3xl font-bold text-brand-magenta mb-2">Klien Kami</h2>
          <div className="w-12 h-1 bg-brand-yellow rounded-full" />
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8">
          {listToRender.map((client, idx) => {
            const cardContent = (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex items-center justify-center p-2 md:p-4 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <img 
                  src={`${client.logoUrl}?v=2`} 
                  alt={client.name} 
                  className="max-h-10 md:max-h-20 max-w-[120px] md:max-w-[220px] object-contain opacity-60 hover:opacity-100 filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            );

            if (client.portfolioSlug) {
              return (
                <Link key={idx} href={`/portfolio/${client.portfolioSlug}`}>
                  {cardContent}
                </Link>
              );
            }

            return <div key={idx}>{cardContent}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
