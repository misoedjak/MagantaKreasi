import { prisma } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsList from "@/components/ProductsList";
import ProductsHero from "@/components/ProductsHero";
import { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sewa Alat Event, Tenda, Videotron, Sound & Furniture",
    description:
      "Katalog sewa peralatan event lengkap Jakarta & Bekasi: tenda sarnafil & roder, LED videotron P3.9, sound system, lighting panggung, genset silent, AC standing, kursi & meja VIP.",
    alternates: { canonical: "/products" },
  };
}

export default async function ProductsPage() {
  const [profile, rawProducts, categories] = await Promise.all([
    prisma.companyProfile.findFirst(),
    prisma.product.findMany({
      include: { category: true },
      orderBy: { name: "asc" },
    }),
    prisma.productCategory.findMany({ orderBy: { name: "asc" } }),
  ]);

  const whatsappNumber = profile?.whatsapp || profile?.phone || "6282115151515";

  const productsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: "https://magantakreasi.com" },
      { "@type": "ListItem", position: 2, name: "Katalog Sewa Alat Event", item: "https://magantakreasi.com/products" },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-brand-dark font-sans selection:bg-brand-yellow selection:text-brand-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />
      <Navbar
        whatsappNumber={whatsappNumber}
        email={profile?.email}
        phoneDisplay={profile?.phone || profile?.whatsapp}
      />

      <ProductsHero />

      <section className="pt-8 pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <ProductsList
            products={rawProducts}
            categories={categories}
            whatsappNumber={whatsappNumber}
          />
        </div>
      </section>

      <Footer profile={profile} />
    </div>
  );
}
