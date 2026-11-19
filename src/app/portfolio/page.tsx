import { prisma } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Portfolio from "@/components/Portfolio";
import PortfolioHero from "@/components/PortfolioHero";
import { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Portofolio Proyek | Maganta Kreasi",
    description:
      "Lihat semua booth pameran custom, fabrikasi panggung, setup backdrop, dan instalasi dekoratif yang diselesaikan oleh Maganta Kreasi.",
  };
}

export default async function PortfolioCataloguePage() {
  const [categories, portfolios, profile] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.portfolio.findMany({
      where: { status: "published" },
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { id: true, name: true } },
        images: { orderBy: { order: "asc" } },
      },
    }),
    prisma.companyProfile.findFirst(),
  ]);

  const contactWhatsapp = profile?.whatsapp || profile?.phone || "6282115151515";

  return (
    <div className="min-h-screen bg-white text-brand-dark font-sans selection:bg-brand-yellow selection:text-brand-dark">
      <Navbar
        whatsappNumber={contactWhatsapp}
        email={profile?.email}
        phoneDisplay={profile?.phone || profile?.whatsapp}
      />

      <PortfolioHero />

      <div className="pb-16">
        <Portfolio initialPortfolios={portfolios} categories={categories} hideHeader />
      </div>

      <Footer profile={profile} />
    </div>
  );
}
