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

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.settings.findFirst();

  return {
    title:
      settings?.seoTitle ||
      "Maganta Kreasi - In-House Event Workshop Production Premium",
    description:
      settings?.seoDesc ||
      "Jasa fabrikasi booth pameran, panggung event, backdrop dekorasi, gate masuk, dan signage berkualitas tinggi.",
    icons: {
      icon: settings?.faviconUrl || "/favicon.ico",
    },
  };
}

interface HomeProps {
  searchParams: Promise<{ event?: string }> | { event?: string };
}

const PREFERRED_HOMEPAGE_SLUGS = [
  "cedea-20th-anniversary-behind-the-build",
  "the-13th-ui-music-fair-stage-fabrication",
  "christmas-symphony-recap-bxc-mall",
  "inbody-indonesia-isfex-2024-recap",
  "hut-astra-agro-lestari-36-setup",
  "behind-the-booth-fast-track-installation",
];

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const selectedEventId = params?.event;

  // Execute all independent database queries in parallel
  const [
    categories,
    rawPreferredPortfolios,
    profile,
    advantages,
    pipelineSteps,
    dbClients,
    clientPortfolios,
    heroSettings,
    aboutSettings,
    statCards,
    dbFeaturedProducts,
  ] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.portfolio.findMany({
      where: {
        status: "published",
        slug: { in: PREFERRED_HOMEPAGE_SLUGS },
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        portfolioCategories: {
          include: {
            category: { select: { id: true, name: true, slug: true } },
          },
        },
        images: {
          orderBy: { order: "asc" },
          take: 1,
        },
      },
    }),
    prisma.companyProfile.findFirst(),
    prisma.advantage.findMany({ orderBy: { order: "asc" } }),
    prisma.pipelineStep.findMany({ orderBy: { order: "asc" } }),
    prisma.client.findMany({ orderBy: { order: "asc" } }),
    prisma.portfolio.findMany({
      where: { status: "published" },
      select: { client: true, slug: true },
    }),
    prisma.heroSettings.findFirst(),
    prisma.aboutSettings.findFirst(),
    prisma.statCard.findMany({ orderBy: { order: "asc" } }),
    prisma.product.findMany({
      where: { featured: true, status: "active" },
      take: 8,
      include: { category: true },
    }),
  ]);

  const rawPortfolios =
    rawPreferredPortfolios.length >= 6
      ? rawPreferredPortfolios
      : await prisma.portfolio.findMany({
          where: { status: "published" },
          orderBy: { createdAt: "desc" },
          take: 6,
          include: {
            category: { select: { id: true, name: true, slug: true } },
            portfolioCategories: {
              include: {
                category: { select: { id: true, name: true, slug: true } },
              },
            },
            images: {
              orderBy: { order: "asc" },
              take: 1,
            },
          },
        });

  const portfolios = [...rawPortfolios]
    .sort((a, b) => {
      const idxA = PREFERRED_HOMEPAGE_SLUGS.indexOf(a.slug);
      const idxB = PREFERRED_HOMEPAGE_SLUGS.indexOf(b.slug);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    })
    .map((p) => ({
      ...p,
      categories:
        p.portfolioCategories && p.portfolioCategories.length > 0
          ? p.portfolioCategories.map((pc) => pc.category)
          : p.category
            ? [p.category]
            : [],
    }));

  const clients = dbClients.map((c) => {
    const match = clientPortfolios.find(
      (p) => p.client?.toLowerCase() === c.name.toLowerCase()
    );
    return {
      id: c.id,
      name: c.name,
      logoUrl: c.logoUrl,
      portfolioSlug: match ? match.slug : null,
    };
  });

  const homepageProducts =
    dbFeaturedProducts.length > 0
      ? dbFeaturedProducts
      : await prisma.product.findMany({
          where: { status: "active" },
          take: 8,
          include: { category: true },
        });

  const contactWhatsapp = profile?.whatsapp || profile?.phone || "6282115151515";

  return (
    <main className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-brand-yellow selection:text-brand-dark">
      <Navbar
        whatsappNumber={contactWhatsapp}
        email={profile?.email}
        phoneDisplay={profile?.phone || profile?.whatsapp}
      />
      <Hero settings={heroSettings} showcaseProjects={portfolios} />
      <About settings={aboutSettings} stats={statCards} />
      <FeaturedProducts products={homepageProducts} whatsappNumber={contactWhatsapp} />
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
