import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, MapPin, Tag, Building2, CheckCircle2, MessageSquare } from "lucide-react";
import Link from "next/link";
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

  const isVideo = (url?: string | null) => {
    if (!url) return false;
    return url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".mov");
  };

  // Compile all media items: thumbnail + gallery
  const allMedia = [portfolio.thumbnail];
  portfolio.images.forEach(img => {
    if (img.url !== portfolio.thumbnail) {
      allMedia.push(img.url);
    }
  });

  const profile = await prisma.companyProfile.findFirst();

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-[#FFD400] selection:text-black">
      <Navbar />

      {/* Top Padding for fixed Navbar */}
      <div className="pt-24 pb-12 md:pt-32">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Back Button */}
          <Link 
            href="/#portfolio" 
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-brand-magenta transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Portofolio</span>
          </Link>

          {/* Hero Banner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side: Video / Media Showcase */}
            <div className="lg:col-span-7 space-y-6">
              <div className="w-full aspect-[16/10] bg-black rounded-3xl overflow-hidden border border-zinc-200 shadow-2xl relative flex items-center justify-center">
                {isVideo(portfolio.thumbnail) ? (
                  <video 
                    src={portfolio.thumbnail} 
                    controls 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  />
                ) : (
                  <img 
                    src={portfolio.thumbnail} 
                    alt={portfolio.title} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Additional Media List */}
              {allMedia.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {allMedia.slice(1).map((url, idx) => (
                    <div 
                      key={idx} 
                      className="aspect-video bg-black rounded-2xl overflow-hidden border border-zinc-200 hover:border-brand-magenta/50 transition-colors group relative flex items-center justify-center"
                    >
                      {isVideo(url) ? (
                        <video 
                          src={url} 
                          controls 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <a href={url} target="_blank" rel="noreferrer" className="w-full h-full block">
                          <img 
                            src={url} 
                            alt={`Gallery ${idx}`} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right side: Project Profile Specs */}
            <div className="lg:col-span-5 space-y-8 bg-white border border-brand-magenta/10 rounded-3xl p-8 shadow-lg">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-brand-magenta text-white uppercase tracking-wider shadow-md shadow-brand-magenta/10">
                  <Tag className="h-3 w-3" />
                  <span>{portfolio.category.name}</span>
                </span>
                <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight text-brand-dark">
                  {portfolio.title}
                </h1>
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-1 gap-5 border-y border-zinc-200 py-6 text-sm">
                {portfolio.client && (
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-brand-magenta shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Client Name</p>
                      <p className="font-semibold text-zinc-800 mt-0.5">{portfolio.client}</p>
                    </div>
                  </div>
                )}
                {portfolio.projectDate && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-brand-magenta shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Date Completed</p>
                      <p className="font-semibold text-zinc-800 mt-0.5">
                        {new Date(portfolio.projectDate).toLocaleDateString("id-ID", {
                          month: "long",
                          year: "numeric"
                        })}
                      </p>
                    </div>
                  </div>
                )}
                {portfolio.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-brand-magenta shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Location / Venue</p>
                      <p className="font-semibold text-zinc-800 mt-0.5">{portfolio.location}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Narrative Content */}
              <div className="space-y-4">
                <h3 className="font-heading text-lg font-bold text-zinc-900">Project Overview</h3>
                <div className="text-zinc-600 text-sm leading-relaxed whitespace-pre-line font-light">
                  {portfolio.description}
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div className="pt-4 border-t border-zinc-100">
                <a
                  href={`https://wa.me/${(profile?.whatsapp || profile?.phone || "6282115151515").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Halo Maganta Kreasi, saya tertarik membuat panggung/booth seperti proyek "${portfolio.title}". Mohon info konsultasi & penawarannya.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-brand-yellow hover:bg-brand-magenta hover:text-white text-zinc-950 font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 group"
                >
                  <MessageSquare size={18} className="text-zinc-950 group-hover:text-white transition-colors" />
                  <span>Konsultasi Proyek Serupa via WhatsApp</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>

      <Footer profile={profile} />
    </div>
  );
}
