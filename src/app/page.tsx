import { prisma } from "@/lib/db";
import { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedProducts from "@/components/FeaturedProducts";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const revalidate = 0; // Fresh database query on load

export async function generateMetadata(): Promise<Metadata> {
  let settings = await prisma.settings.findFirst();
  
  if (!settings) {
    settings = {
      siteName: "Maganta Kreasi",
      seoTitle: "Maganta Kreasi - Premium Event Fabrication & Decoration",
      seoDesc: "Jasa fabrikasi booth pameran, panggung event, backdrop dekorasi, gate masuk, dan signage berkualitas tinggi untuk kesuksesan event Anda.",
      faviconUrl: "/favicon.ico",
      logoUrl: null,
      id: "default",
      gaId: null,
      updatedAt: new Date()
    };
  }

  return {
    title: settings.seoTitle || "Maganta Kreasi - Premium Event Fabrication & Decoration",
    description: settings.seoDesc || "Jasa fabrikasi booth pameran, panggung event, backdrop dekorasi, gate masuk, dan signage berkualitas tinggi.",
    icons: {
      icon: settings.faviconUrl || "/favicon.ico",
    }
  };
}

interface HomeProps {
  searchParams: Promise<{ event?: string }> | { event?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const selectedEventId = params?.event;

  // Query categories
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  // Query published portfolios with category, multi-category, and gallery images relations
  const rawPortfolios = await prisma.portfolio.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
    include: {
      category: {
        select: { id: true, name: true, slug: true }
      },
      portfolioCategories: {
        include: {
          category: {
            select: { id: true, name: true, slug: true }
          }
        }
      },
      images: {
        orderBy: { order: "asc" }
      }
    }
  });

  const portfolios = rawPortfolios.map(p => ({
    ...p,
    categories: p.portfolioCategories && p.portfolioCategories.length > 0
      ? p.portfolioCategories.map(pc => pc.category)
      : p.category ? [p.category] : []
  }));

  // Query Company Profile
  const profile = await prisma.companyProfile.findFirst();

  // Query advantages
  const advantages = await prisma.advantage.findMany({
    orderBy: { order: "asc" },
  });

  // Query pipeline steps
  const pipelineSteps = await prisma.pipelineStep.findMany({
    orderBy: { order: "asc" },
  });

  // Query clients and their matching portfolio slugs
  const dbClients = await prisma.client.findMany({
    orderBy: { order: "asc" },
  });
  const clientPortfolios = await prisma.portfolio.findMany({
    where: { status: "published" },
    select: { client: true, slug: true },
  });
  const clients = dbClients.map(c => {
    const match = clientPortfolios.find(p => p.client?.toLowerCase() === c.name.toLowerCase());
    return {
      id: c.id,
      name: c.name,
      logoUrl: c.logoUrl,
      portfolioSlug: match ? match.slug : null
    };
  });

  // Query Hero Settings
  const heroSettings = await prisma.heroSettings.findFirst();

  // Query About Settings
  const aboutSettings = await prisma.aboutSettings.findFirst();

  // Query Stat Cards
  const statCards = await prisma.statCard.findMany({
    orderBy: { order: "asc" },
  });

  // Query featured products for the homepage (or first 8 active as fallback)
  const dbFeaturedProducts = await prisma.product.findMany({
    where: { featured: true, status: "active" },
    take: 8,
    include: { category: true }
  });

  const homepageProducts = dbFeaturedProducts.length > 0
    ? dbFeaturedProducts
    : await prisma.product.findMany({
        where: { status: "active" },
        take: 8,
        include: { category: true }
      });

  return (
    <main className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-[#FFD400] selection:text-black">
      <Navbar whatsappNumber={profile?.whatsapp || profile?.phone || "6282115151515"} />
      <Hero settings={heroSettings} />
      <About settings={aboutSettings} stats={statCards} />
      <FeaturedProducts 
        products={homepageProducts} 
        whatsappNumber={profile?.whatsapp || profile?.phone || "6282115151515"} 
      />
      <Clients clients={clients} />
      <Services categories={categories} />
      <Portfolio initialPortfolios={portfolios} categories={categories} layoutMode="carousel" />
      <WhyChooseUs advantages={advantages} />
      <Process steps={pipelineSteps} />
      <Suspense fallback={null}>
        <Contact profile={profile} categories={categories} selectedEventId={selectedEventId} />
      </Suspense>
      <Footer profile={profile} />
    </main>
  );
}
