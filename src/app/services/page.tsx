import { prisma } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesList from "@/components/ServicesList";
import { ServicesHero, ServicesClosingCta } from "@/components/ServicesPageChrome";
import { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Layanan & Kapasitas Fabrikasi | Maganta Kreasi",
    description:
      "Fabrikasi booth pameran, setup panggung, backdrop, gate, wayfinding, dan instalasi dekoratif artistik berstandar presisi tinggi oleh Maganta Kreasi.",
  };
}

export default async function ServicesPage() {
  const [categories, profile] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.companyProfile.findFirst(),
  ]);

  const contactWhatsapp = profile?.whatsapp || profile?.phone || "6281188820067";
  let cleanWa = contactWhatsapp.replace(/[^0-9]/g, "");
  if (cleanWa.startsWith("0")) {
    cleanWa = "62" + cleanWa.substring(1);
  }
  const waConsultUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(
    "Halo Maganta Kreasi, saya ingin konsultasi kebutuhan fabrikasi event."
  )}`;

  return (
    <div className="min-h-screen bg-white text-brand-dark font-sans selection:bg-brand-yellow selection:text-brand-dark">
      <Navbar
        whatsappNumber={contactWhatsapp}
        email={profile?.email}
        phoneDisplay={profile?.phone || profile?.whatsapp}
      />

      <ServicesHero waConsultUrl={waConsultUrl} />

      <section id="services-catalog" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <ServicesList categories={categories} whatsappNumber={cleanWa} />
        </div>
      </section>

      <ServicesClosingCta waConsultUrl={waConsultUrl} />

      <Footer profile={profile} />
    </div>
  );
}
