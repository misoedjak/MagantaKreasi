"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, MapPin, Tag, Building2, MessageSquare, Play } from "lucide-react";
import Link from "next/link";

interface PortfolioMediaViewerProps {
  portfolio: {
    id: string;
    title: string;
    slug: string;
    client: string | null;
    projectDate: string | null;
    location: string | null;
    description: string;
    thumbnail: string;
    videoUrl?: string | null;
    category?: {
      name: string;
    } | null;
    categories?: {
      id?: string;
      name: string;
    }[];
    images: {
      id: string;
      url: string;
      order: number;
    }[];
  };
  profile: any;
}

export default function PortfolioMediaViewer({ portfolio, profile }: PortfolioMediaViewerProps) {
  const isVideoFile = (url?: string | null) => {
    if (!url) return false;
    return url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".mov");
  };

  // Build list of all selectable media items
  // Primary video (if exists) or thumbnail
  const mediaItems: { type: "video" | "image"; url: string; label: string }[] = [];

  if (portfolio.videoUrl) {
    mediaItems.push({
      type: "video",
      url: portfolio.videoUrl,
      label: "Official Video"
    });
  } else if (isVideoFile(portfolio.thumbnail)) {
    mediaItems.push({
      type: "video",
      url: portfolio.thumbnail,
      label: "Official Video"
    });
  }

  // Cover image (if thumbnail is an image)
  if (portfolio.thumbnail && !isVideoFile(portfolio.thumbnail)) {
    mediaItems.push({
      type: "image",
      url: portfolio.thumbnail,
      label: "Cover Image"
    });
  }

  // Extra gallery images (exclude if matches videoUrl or thumbnail)
  portfolio.images.forEach((img, idx) => {
    if (img.url !== portfolio.videoUrl && img.url !== portfolio.thumbnail) {
      mediaItems.push({
        type: isVideoFile(img.url) ? "video" : "image",
        url: img.url,
        label: `Media ${idx + 1}`
      });
    }
  });

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const activeMedia = mediaItems[activeMediaIndex] || mediaItems[0];

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
            
            {/* Left side: Main Active Viewer + Selection Bar */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Main Player / Image Canvas */}
              <div className="w-full aspect-[16/10] bg-black rounded-3xl overflow-hidden border border-zinc-200 shadow-2xl relative flex items-center justify-center">
                {activeMedia && activeMedia.type === "video" ? (
                  <video 
                    key={activeMedia.url}
                    src={activeMedia.url} 
                    poster={portfolio.thumbnail && !isVideoFile(portfolio.thumbnail) ? portfolio.thumbnail : undefined}
                    controls 
                    autoPlay 
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  />
                ) : activeMedia ? (
                  <img 
                    src={activeMedia.url} 
                    alt={portfolio.title} 
                    className="w-full h-full object-contain bg-zinc-950"
                  />
                ) : null}
              </div>

              {/* Selection Bar / Thumbnail Strip (Only shown if more than 1 media item exists) */}
              {mediaItems.length > 1 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Pilih Media Tampilan ({mediaItems.length} media):
                  </p>
                  <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                    {mediaItems.map((item, idx) => {
                      const isSelected = idx === activeMediaIndex;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveMediaIndex(idx)}
                          className={`relative aspect-video w-32 sm:w-36 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-black group ${
                            isSelected 
                              ? "border-brand-magenta ring-2 ring-brand-magenta/30 scale-105" 
                              : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                        >
                          {item.type === "video" ? (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-white relative">
                              {portfolio.thumbnail && !isVideoFile(portfolio.thumbnail) ? (
                                <img 
                                  src={portfolio.thumbnail} 
                                  alt="Video Cover" 
                                  className="w-full h-full object-cover opacity-60" 
                                />
                              ) : null}
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <div className="w-8 h-8 rounded-full bg-brand-magenta flex items-center justify-center text-white shadow-md">
                                  <Play size={14} fill="currentColor" className="ml-0.5" />
                                </div>
                              </div>
                              <span className="absolute bottom-1 left-2 text-[9px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded">
                                Video
                              </span>
                            </div>
                          ) : (
                            <img 
                              src={item.url} 
                              alt={`Thumbnail ${idx}`} 
                              className="w-full h-full object-cover" 
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right side: Project Profile Specs */}
            <div className="lg:col-span-5 space-y-8 bg-white border border-brand-magenta/10 rounded-3xl p-8 shadow-lg">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {((portfolio.categories && portfolio.categories.length > 0) ? portfolio.categories : (portfolio.category ? [portfolio.category] : [])).map((cat, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-brand-magenta text-white uppercase tracking-wider shadow-md shadow-brand-magenta/10">
                      <Tag className="h-3 w-3" />
                      <span>{cat.name}</span>
                    </span>
                  ))}
                </div>
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
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Timeline / Tanggal</p>
                      <p className="font-semibold text-zinc-800 mt-0.5">
                        {new Date(portfolio.projectDate).toLocaleDateString("id-ID", {
                          day: "numeric",
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
