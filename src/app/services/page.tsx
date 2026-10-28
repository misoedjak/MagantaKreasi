import { prisma } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesList from "@/components/ServicesList";
import { Factory } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Layanan & Kapasitas Fabrikasi | Maganta Kreasi",
    description: "Fabrikasi booth pameran, setup panggung, backdrop, gate, wayfinding, dan instalasi dekoratif artistik berstandar presisi tinggi oleh Maganta Kreasi.",
  };
}

export default async function ServicesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const profile = await prisma.companyProfile.findFirst();

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-[#FFD400] selection:text-black">
      <Navbar />

      {/* Hero Header - Compact & Proportional */}
      <section className="pt-24 pb-8 sm:pb-10 bg-gradient-to-b from-white via-zinc-50/50 to-brand-light relative overflow-hidden border-b border-zinc-200/60">
        {/* Subtle Architectural Grid Pattern */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:18px_18px] opacity-70 pointer-events-none" 
          aria-hidden="true"
        />
        <div 
          className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-magenta/5 rounded-full blur-[100px] pointer-events-none" 
          aria-hidden="true"
        />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-3.5">
            <Factory className="h-3.5 w-3.5 text-brand-magenta" />
            <span>Fasilitas Fabrikasi In-House &bull; 1.000+ m²</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-zinc-900 leading-[1.15]">
            Layanan & Kapasitas <span className="text-brand-magenta">Fabrikasi</span>
          </h1>

          <p className="text-zinc-600 text-xs sm:text-sm max-w-2xl mx-auto font-normal leading-relaxed mb-5">
            Dari cetak biru CAD hingga instalasi struktural di venue. Standar presisi tinggi untuk pameran berskala nasional, panggung korporat, dan aktivasi brand.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="#services-catalog"
              className="inline-flex items-center justify-center min-h-[38px] px-4 py-2 rounded-lg bg-zinc-900 text-white font-medium text-xs sm:text-sm hover:bg-zinc-800 transition-colors shadow-xs"
            >
              Jelajahi Spesifikasi Layanan
            </a>
            <a
              href="https://wa.me/6281188820067?text=Halo%20Maganta%20Kreasi%2C%20saya%20ingin%20konsultasi%20kebutuhan%20fabrikasi%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[38px] px-4 py-2 rounded-lg border border-zinc-300 bg-white text-zinc-800 font-medium text-xs sm:text-sm hover:bg-zinc-50 transition-colors shadow-xs"
            >
              Konsultasi Cepat Tim Teknis
            </a>
          </div>
        </div>
      </section>

      {/* Services Detail List */}
      <section id="services-catalog" className="py-8 sm:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesList categories={categories} />
        </div>
      </section>

      <Footer profile={profile} />
    </div>
  );
}
