import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import PortfolioMediaViewer from "@/components/PortfolioMediaViewer";
import { Metadata } from "next";

export const revalidate = 0;

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const portfolio = await prisma.portfolio.findUnique({
    where: { slug },
  });

  if (!portfolio) {
    return { title: "Portfolio Not Found | Maganta Kreasi" };
  }

  return {
    title: portfolio.seoTitle || `${portfolio.title} | Maganta Kreasi`,
    description: portfolio.seoDesc || portfolio.description.slice(0, 160),
    openGraph: {
      title: portfolio.seoTitle || portfolio.title,
      description: portfolio.seoDesc || portfolio.description.slice(0, 160),
      images: [portfolio.thumbnail],
    }
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;

  const portfolio = await prisma.portfolio.findUnique({
    where: { slug },
    include: {
      category: true,
      images: {
        orderBy: { order: "asc" }
      }
    }
  });

  if (!portfolio) {
    notFound();
  }

  const profile = await prisma.companyProfile.findFirst();

  const formattedPortfolio = {
    ...portfolio,
    projectDate: portfolio.projectDate ? portfolio.projectDate.toISOString() : null,
  };

  return <PortfolioMediaViewer portfolio={formattedPortfolio} profile={profile} />;
}
