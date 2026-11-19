import { prisma } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientsPageContent from "@/components/ClientsPageContent";
import { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Klien & Mitra Kami | Maganta Kreasi",
    description:
      "Temukan brand, perusahaan, dan institusi terkemuka yang mempercayakan layanan fabrikasi panggung dan event kepada Maganta Kreasi.",
  };
}

export default async function ClientsPage() {
  const [profile, dbClients, clientPortfolios] = await Promise.all([
    prisma.companyProfile.findFirst(),
    prisma.client.findMany({ orderBy: { order: "asc" } }),
    prisma.portfolio.findMany({
      where: { status: "published" },
      select: { client: true, slug: true, title: true },
    }),
  ]);

  const contactWhatsapp = profile?.whatsapp || profile?.phone || "6281188820067";
  let cleanWa = contactWhatsapp.replace(/[^0-9]/g, "");
  if (cleanWa.startsWith("0")) {
    cleanWa = "62" + cleanWa.substring(1);
  }
  const waConsultUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(
    "Halo Maganta Kreasi, saya ingin mendiskusikan kolaborasi produksi event bersama tim Anda."
  )}`;

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

  return (
    <div className="min-h-screen bg-white text-brand-dark font-sans selection:bg-brand-yellow selection:text-brand-dark">
      <Navbar
        whatsappNumber={contactWhatsapp}
        email={profile?.email}
        phoneDisplay={profile?.phone || profile?.whatsapp}
      />

      <ClientsPageContent logos={logosToRender} waConsultUrl={waConsultUrl} />

      <Footer profile={profile} />
    </div>
  );
}
