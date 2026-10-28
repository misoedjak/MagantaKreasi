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
      <section id="services-catalog" className="py-8 sm:py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesList categories={categories} />
        </div>
      </section>

      {/* Workshop Authority & Engineering Capacity Section */}
      <section className="py-14 sm:py-16 bg-zinc-900 text-white relative overflow-hidden">
        {/* Subtle CAD accent grid */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" 
          aria-hidden="true"
        />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-semibold tracking-wide text-brand-yellow uppercase mb-2.5">
              <Compass className="h-3 w-3" />
              <span>Standar Rekayasa & Fabrikasi</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2.5">
              Workshop Sendiri, Kendali Kualitas Penuh
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Seluruh pemotongan, perakitan, finishing duco, dan uji kelistrikan dikerjakan langsung di workshop Maganta Kreasi.
            </p>
          </div>

          {/* 3 Engineering Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-10">
            <div className="bg-zinc-800/70 border border-zinc-700/60 rounded-xl p-4 sm:p-5">
              <div className="h-9 w-9 rounded-lg bg-brand-yellow/15 text-brand-yellow flex items-center justify-center mb-3">
                <Factory className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-semibold text-sm sm:text-base text-white mb-1.5">1.000+ m² Fasilitas Workshop</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Area kerja luas di Babelan, Bekasi dengan panel saw presisi, spray booth pengecatan, dan area perakitan mock-up sebelum loading.
              </p>
            </div>

            <div className="bg-zinc-800/70 border border-zinc-700/60 rounded-xl p-4 sm:p-5">
              <div className="h-9 w-9 rounded-lg bg-brand-magenta/20 text-brand-magenta flex items-center justify-center mb-3">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-semibold text-sm sm:text-base text-white mb-1.5">Kalkulasi Struktur & Beban</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Setiap konstruksi panggung bertingkat, rigging gantung, dan backdrop diuji ketahanan beban dan standar keamanan venue.
              </p>
            </div>

            <div className="bg-zinc-800/70 border border-zinc-700/60 rounded-xl p-4 sm:p-5">
              <div className="h-9 w-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-semibold text-sm sm:text-base text-white mb-1.5">Standby Loading 24/7</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Tim teknis onsite standby selama periode loading, show-day, hingga dismantle untuk memastikan eksekusi tepat waktu.
              </p>
            </div>
          </div>

          {/* Action Callout */}
          <div className="bg-zinc-800/90 border border-zinc-700 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-bold text-white mb-0.5">Punya Desain Khusus atau Dokumen Tender?</h4>
              <p className="text-xs text-zinc-400">Kirimkan gambar kerja 3D / CAD Anda untuk kalkulasi estimasi anggaran transparan.</p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <Link 
                href="/#contact"
                className="inline-flex items-center justify-center gap-1.5 min-h-[38px] px-5 py-2 rounded-lg bg-brand-yellow text-zinc-950 hover:bg-white font-semibold text-xs sm:text-sm transition-colors"
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
