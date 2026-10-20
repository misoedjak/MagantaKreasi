import { prisma } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Handshake, Award, CheckCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Klien & Mitra Kami | Maganta Kreasi",
    description: "Temukan brand, perusahaan, dan penyelenggara acara yang mempercayakan layanan fabrikasi premium kepada Maganta Kreasi.",
  };
}

export default async function ClientsPage() {
  const profile = await prisma.companyProfile.findFirst();
  const dbClients = await prisma.client.findMany({
    orderBy: { order: "asc" },
  });
  const clientPortfolios = await prisma.portfolio.findMany({
    where: { status: "published" },
    select: { client: true, slug: true },
  });

  const logosToRender = dbClients.map(c => {
    const match = clientPortfolios.find(p => p.client?.toLowerCase() === c.name.toLowerCase());
    return {
      name: c.name,
      logoUrl: c.logoUrl,
      portfolioSlug: match ? match.slug : null
    };
  });

  const dbCaseStudies = dbClients.filter(c => c.feedback && c.feedback.trim() !== "");
  const caseStudiesToRender = dbCaseStudies.map(c => ({
    client: c.name,
    event: c.event || "Corporate Event",
    type: c.type || "Custom Fabrication",
    feedback: c.feedback!,
    stat: c.stat || "Premium Quality"
  }));

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-[#FFD400] selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-8 bg-gradient-to-b from-white to-brand-light relative overflow-hidden border-b border-brand-magenta/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-magenta/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 tracking-tight text-brand-dark">
            Our <span className="text-brand-magenta">Clients</span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            We build long-term trust by delivering high-end structural fabrications for Indonesia&apos;s leading brands.
          </p>
        </div>
      </section>

      {/* Partner Logos Grid */}
      <section className="pt-6 pb-16 bg-brand-light">
        <div className="container mx-auto px-6 md:px-12">
          {logosToRender.length > 0 ? (
            <>
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-dark">Trusted Nationwide</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                {logosToRender.map((client, i) => {
                  const cardContent = (
                    <div 
                      className="flex items-center justify-center p-4 hover:scale-105 transition-all duration-300 cursor-pointer h-24 sm:h-28"
                    >
                      <img 
                        src={client.logoUrl} 
                        alt={client.name} 
                        className="max-h-12 sm:max-h-16 max-w-full object-contain opacity-95 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  );

                  if (client.portfolioSlug) {
                    return (
                      <Link key={i} href={`/portfolio/${client.portfolioSlug}`}>
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
        <section className="py-24 bg-zinc-50 border-t border-brand-magenta/5">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl font-bold mb-4 flex items-center justify-center gap-2 text-brand-dark">
                <Award className="text-brand-magenta h-8 w-8" />
                <span>Project Showcases</span>
              </h2>
              <p className="text-zinc-500 text-sm max-w-md mx-auto font-light">
                See what our corporate partners say about our workshop production standards and deadlines.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {caseStudiesToRender.map((caseStudy, idx) => (
                <div 
                  key={idx} 
                  className="glass-card p-8 bg-white border border-brand-magenta/10 rounded-3xl relative overflow-hidden group hover:border-brand-magenta/40 transition-colors flex flex-col justify-between shadow-sm hover:shadow-md"
                >
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-bold text-brand-magenta uppercase tracking-widest block">
                        {caseStudy.type}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-brand-dark mt-1">
                        {caseStudy.client}
                      </h3>
                      <p className="text-xs text-zinc-500 font-light mt-0.5">{caseStudy.event}</p>
                    </div>
                    <p className="text-zinc-600 text-sm font-light leading-relaxed italic">
                      &ldquo;{caseStudy.feedback}&rdquo;
                    </p>
                  </div>

                  <div className="pt-6 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-medium text-brand-magenta flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5" />
                      {caseStudy.stat}
                    </span>
                    <span>Verified Client</span>
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
