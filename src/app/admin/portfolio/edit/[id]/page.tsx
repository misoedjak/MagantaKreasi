import { prisma } from "@/lib/db";
import { PortfolioForm } from "@/components/admin/PortfolioForm";
import { redirect } from "next/navigation";

export const revalidate = 0;

interface EditPortfolioPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function EditPortfolioPage({ params }: EditPortfolioPageProps) {
  // Await params if it is a Promise (Next.js 15+ convention)
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const portfolio = await prisma.portfolio.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: { order: "asc" }
      }
    }
  });

  if (!portfolio) {
    redirect("/admin/portfolio");
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  // Map database record to match initial fields
  const mappedPortfolio = {
    id: portfolio.id,
    title: portfolio.title,
    slug: portfolio.slug,
    client: portfolio.client || "",
    categoryId: portfolio.categoryId,
    projectDate: portfolio.projectDate,
    location: portfolio.location || "",
    description: portfolio.description,
    thumbnail: portfolio.thumbnail,
    videoUrl: portfolio.videoUrl || "",
    featured: portfolio.featured,
    status: portfolio.status,
    seoTitle: portfolio.seoTitle || "",
    seoDesc: portfolio.seoDesc || "",
    images: portfolio.images.map(img => img.url),
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Project</h1>
        <p className="text-gray-500 mt-1">Modify project fabrication configurations, descriptions, and media attachments.</p>
      </div>

      <PortfolioForm categories={categories} initialData={mappedPortfolio} />
    </div>
  );
}
