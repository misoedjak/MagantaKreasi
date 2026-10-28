import { prisma } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsList from "@/components/ProductsList";
import { Package, Tag } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Katalog Produk & Peralatan Sewa | Maganta Kreasi",
    description: "Telusuri inventaris peralatan sewa event premium kami termasuk pencahayaan panggung profesional, sound system, truss, dan rigging.",
  };
}

export default async function ProductsPage() {
  const profile = await prisma.companyProfile.findFirst();
  const rawProducts = await prisma.product.findMany({
    include: {
      category: true
    },
    orderBy: { name: "asc" }
  });
  
  const categories = await prisma.productCategory.findMany({
    orderBy: { name: "asc" }
  });

  // Safe fallback WhatsApp number
  const whatsappNumber = profile?.whatsapp || profile?.phone || "6282115151515";

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-[#FFD400] selection:text-black">
      <Navbar />

      {/* Compact Header Section */}
      <section className="pt-20 pb-3 bg-gradient-to-b from-white to-brand-light/60 border-b border-gray-100 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-magenta uppercase tracking-wider mb-1">
                <Package size={13} /> Katalog Sewa Peralatan
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                Peralatan Event & <span className="text-brand-magenta">Produksi Panggung</span>
              </h1>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm max-w-lg leading-relaxed">
              Inventaris siap sewa: sound system, genset silent, tenda sarnafil & roder, pendingin ruangan, barricade, dan furnitur VIP didukung tim teknisi panggung.
            </p>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="pt-4 pb-16 bg-brand-light">
        <div className="container mx-auto px-6 md:px-12">
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
