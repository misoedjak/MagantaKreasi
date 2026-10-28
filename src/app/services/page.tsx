import { prisma } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesList from "@/components/ServicesList";
import { Factory, Compass, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
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

      {/* Hero Header with CAD Grid Texture */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-white via-zinc-50/50 to-brand-light relative overflow-hidden border-b border-zinc-200/60">
        {/* Subtle Architectural Grid Pattern */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:20px_20px] opacity-70 pointer-events-none" 
          aria-hidden="true"
        />
        <div 
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-magenta/5 rounded-full blur-[120px] pointer-events-none" 
          aria-hidden="true"
        />

        <div className="container mx-auto px-6 md:px-12 text-center relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-6">
            <Factory className="h-3.5 w-3.5 text-brand-magenta" />
            <span>Fasilitas Fabrikasi In-House &bull; 1.000+ m²</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-zinc-900 leading-[1.15]">
            Layanan & Kapasitas <span className="text-brand-magenta">Fabrikasi</span>
          </h1>

          <p className="text-zinc-600 text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Dari cetak biru CAD hingga instalasi struktural di venue. Standar presisi tinggi untuk pameran berskala nasional, panggung korporat, dan aktivasi brand.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#services-catalog"
              className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-lg bg-zinc-900 text-white font-medium text-sm hover:bg-zinc-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
            >
              Jelajahi Spesifikasi Layanan
            </a>
            <a
              href="https://wa.me/6281188820067?text=Halo%20Maganta%20Kreasi%2C%20saya%20ingin%20konsultasi%20kebutuhan%20fabrikasi%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-800 font-medium text-sm hover:bg-zinc-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-magenta focus:ring-offset-2"
            >
              Konsultasi Cepat Tim Teknis
            </a>
          </div>
        </div>
      </section>

      {/* Services Detail List */}
      <section id="services-catalog" className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <ServicesList categories={categories} />
        </div>
      </section>

      {/* Workshop Authority & Engineering Capacity Section */}
      <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
        {/* Subtle CAD accent grid */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" 
          aria-hidden="true"
        />

        <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-semibold tracking-wide text-brand-yellow uppercase mb-4">
              <Compass className="h-3.5 w-3.5" />
              <span>Standar Rekayasa & Fabrikasi</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Workshop Sendiri, Kendali Kualitas Penuh
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Kami tidak melempar pekerjaan ke pihak ketiga. Seluruh pemotongan, perakitan, finishing duco, dan uji kelistrikan dikerjakan langsung di workshop Maganta Kreasi.
            </p>
          </div>

          {/* 3 Engineering Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            <div className="bg-zinc-800/70 border border-zinc-700/60 rounded-xl p-6 backdrop-blur-sm">
              <div className="h-11 w-11 rounded-lg bg-brand-yellow/15 text-brand-yellow flex items-center justify-center mb-4">
                <Factory className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-2">1.000+ m² Fasilitas Workshop</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Area kerja luas di Babelan, Bekasi dengan mesin panel saw presisi, spray booth pengecatan, dan area perakitan mock-up sebelum dikirim ke venue.
              </p>
            </div>

            <div className="bg-zinc-800/70 border border-zinc-700/60 rounded-xl p-6 backdrop-blur-sm">
              <div className="h-11 w-11 rounded-lg bg-brand-magenta/20 text-brand-magenta flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-2">Kalkulasi Struktur & Beban</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Setiap konstruksi panggung bertingkat, rigging gantung, dan backdrop monumental diuji ketahanan beban serta standar keselamatan venue.
              </p>
            </div>

            <div className="bg-zinc-800/70 border border-zinc-700/60 rounded-xl p-6 backdrop-blur-sm">
              <div className="h-11 w-11 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-white mb-2">Standby Loading 24/7</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Tim teknis onsite standby selama periode loading, show-day, hingga dismantle untuk memastikan eksekusi nol komplain dan tepat waktu.
              </p>
            </div>
          </div>

          {/* Action Callout */}
          <div className="bg-gradient-to-r from-zinc-800 to-zinc-800/90 border border-zinc-700 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold text-white mb-1">Punya Desain Khusus atau Dokumen Tender?</h4>
              <p className="text-xs text-zinc-400">Kirimkan gambar kerja 3D / CAD Anda untuk kalkulasi estimasi anggaran transparan.</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto justify-center">
              <Link 
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-lg bg-brand-yellow text-zinc-950 hover:bg-white font-semibold text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              >
                <span>Konsultasi Proyek</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer profile={profile} />
    </div>
  );
}
