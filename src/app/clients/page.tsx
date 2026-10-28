import { prisma } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Handshake, Award, CheckCircle, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Klien & Mitra Kami | Maganta Kreasi",
    description: "Temukan brand, perusahaan, dan institusi terkemuka yang mempercayakan layanan fabrikasi panggung dan event kepada Maganta Kreasi.",
  };
}

export default async function ClientsPage() {
  const profile = await prisma.companyProfile.findFirst();
  const dbClients = await prisma.client.findMany({
    orderBy: { order: "asc" },
  });
  const clientPortfolios = await prisma.portfolio.findMany({
    where: { status: "published" },
    select: { client: true, slug: true, title: true },
  });

  const logosToRender = dbClients.map((c) => {
    const cLower = c.name.toLowerCase();
    const match = clientPortfolios.find((p) => {
      if (!p.client) return false;
      const pLower = p.client.toLowerCase();
      return pLower === cLower || pLower.includes(cLower) || cLower.includes(pLower);
    });
    return {
      name: c.name,
      logoUrl: c.logoUrl,
      portfolioSlug: match ? match.slug : null,
      portfolioTitle: match ? match.title : null,
    };
  });

  const dbCaseStudies = dbClients.filter((c) => c.feedback && c.feedback.trim() !== "");
  const caseStudiesToRender = dbCaseStudies.map((c) => {
    const cLower = c.name.toLowerCase();
    const match = clientPortfolios.find((p) => {
      if (!p.client) return false;
      const pLower = p.client.toLowerCase();
      return pLower === cLower || pLower.includes(cLower) || cLower.includes(pLower);
    });

    return {
      client: c.name,
      event: c.event || "Corporate Event",
      type: c.type || "Custom Fabrication",
      feedback: c.feedback!,
      stat: c.stat || "Kualitas Premium",
      portfolioSlug: match ? match.slug : null,
    };
  });

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-[#FFD400] selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-20 pb-6 bg-gradient-to-b from-white to-brand-light/60 relative overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-magenta/10 text-brand-magenta text-xs font-semibold uppercase tracking-wider mb-2.5">
            <Handshake size={13} /> Klien & Mitra Strategis
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-3">
            Dipercaya Oleh <span className="text-brand-magenta">Brand & Korporat</span> Terkemuka
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Membangun reputasi jangka panjang melalui presisi fabrikasi panggung, booth pameran custom, dan instalasi event berstandar tinggi untuk institusi pemerintah, BUMN, korporat multinasional, dan universitas di Indonesia.
          </p>
        </div>
      </section>

      {/* Partner Logos Grid */}
      <section className="pt-8 pb-16 bg-brand-light">
        <div className="container mx-auto px-6 md:px-12">
          {logosToRender.length > 0 ? (
            <>
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900">
                  Kemitraan Terpercaya Lintas Sektor
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Klik logo klien untuk melihat dokumentasi proyek fabrikasi panggung dan booth terkait
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
                {logosToRender.map((client, i) => {
                  const cardContent = (
                    <div className="bg-white rounded-2xl border border-gray-100 hover:border-brand-magenta/40 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center p-5 h-28 sm:h-32 group cursor-pointer relative overflow-hidden">
                      <img
                        src={client.logoUrl}
                        alt={client.name}
                        className="max-h-12 sm:max-h-14 max-w-full object-contain filter group-hover:scale-105 transition-all duration-300"
                      />
                      {client.portfolioSlug && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-magenta/15 to-transparent py-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[10px] text-brand-magenta font-bold flex items-center justify-center gap-1">
                            Lihat Portofolio <ArrowRight size={10} />
                          </span>
                        </div>
                      )}
                    </div>
                  );

                  if (client.portfolioSlug) {
                    return (
                      <Link key={i} href={`/portfolio/${client.portfolioSlug}`} title={`Lihat proyek untuk ${client.name}`}>
                        {cardContent}
                      </Link>
                    );
                  }

                  return <div key={i}>{cardContent}</div>;
                })}
              </div>
            </>
          ) : (
            <div className="py-16 text-center text-zinc-400 flex flex-col items-center gap-2 border border-dashed border-zinc-200 rounded-2xl">
              <Handshake className="h-8 w-8 text-zinc-400" />
              <p className="text-sm font-medium">Daftar klien dan testimoni sedang diperbarui.</p>
            </div>
          )}
        </div>
      </section>

      {/* Case Studies / Feedback */}
      {caseStudiesToRender.length > 0 && (
        <section className="py-16 bg-gray-50/70 border-t border-gray-100">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-yellow/30 text-brand-dark text-xs font-semibold uppercase tracking-wider mb-2">
                <Award size={13} className="text-brand-magenta" /> Ulasan Klien Nyata
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Studi Kasus & Kepercayaan Mitra
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm max-w-lg mx-auto">
                Pengakuan dari para penyelenggara acara dan pimpinan proyek tentang standar produksi workshop serta ketepatan waktu Maganta Kreasi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudiesToRender.map((caseStudy, idx) => (
                <div
                  key={idx}
                  className="bg-white p-7 border border-gray-100 rounded-3xl relative overflow-hidden group hover:border-brand-magenta/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-brand-magenta uppercase tracking-widest block mb-1">
                        {caseStudy.type}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-gray-900 group-hover:text-brand-magenta transition-colors">
                        {caseStudy.client}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">{caseStudy.event}</p>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed italic bg-gray-50/60 p-4 rounded-2xl border border-gray-100/60">
                      &ldquo;{caseStudy.feedback}&rdquo;
                    </p>
                  </div>

                  <div className="pt-5 border-t border-gray-100 mt-5 flex items-center justify-between text-xs">
                    <span className="font-semibold text-brand-magenta flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5" />
                      {caseStudy.stat}
                    </span>
                    {caseStudy.portfolioSlug ? (
                      <Link
                        href={`/portfolio/${caseStudy.portfolioSlug}`}
                        className="text-gray-400 hover:text-brand-magenta font-semibold flex items-center gap-1 text-[11px] transition-colors"
                      >
                        Dokumentasi <ArrowRight size={11} />
                      </Link>
                    ) : (
                      <span className="text-gray-400 text-[11px]">Verified Partner</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer profile={profile} />
    </div>
  );
}
