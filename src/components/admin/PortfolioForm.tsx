"use client";

import React, { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Upload, 
  Trash2, 
  ArrowLeft, 
  Loader2,
  Video,
  Camera,
  Play
} from "lucide-react";
import { createPortfolio, updatePortfolio } from "@/app/actions/admin";

interface PortfolioFormData {
  id?: string;
  title: string;
  slug: string;
  client: string;
  categoryId: string;
  categoryIds?: string[];
  projectDate: Date | null;
  location: string;
  description: string;
  thumbnail: string;
  videoUrl?: string | null;
  featured: boolean;
  status: string;
  seoTitle: string;
  seoDesc: string;
  images: string[];
}

interface PortfolioFormProps {
  categories: { id: string; name: string }[];
  initialData?: PortfolioFormData;
}

export function PortfolioForm({ categories, initialData }: PortfolioFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditMode = !!initialData;

  // Form Fields State
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [client, setClient] = useState(initialData?.client || "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || (categories[0]?.id || ""));
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    initialData?.categoryIds && initialData.categoryIds.length > 0
      ? initialData.categoryIds
      : (initialData?.categoryId ? [initialData.categoryId] : (categories[0]?.id ? [categories[0].id] : []))
  );

  const toggleCategory = (catId: string) => {
    setSelectedCategoryIds((prev) => {
      const exists = prev.includes(catId);
      let updated: string[];
      if (exists) {
        if (prev.length <= 1) {
          toast.warning("Setidaknya satu kategori harus dipilih");
          return prev;
        }
        updated = prev.filter((id) => id !== catId);
      } else {
        updated = [...prev, catId];
      }
      setCategoryId(updated[0] || "");
      return updated;
    });
  };
  
  // Format Date for Input Value (YYYY-MM-DD)
  const formatInputDate = (dateObj: Date | null | undefined) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
  };
  const [projectDate, setProjectDate] = useState(formatInputDate(initialData?.projectDate));
  
  const [location, setLocation] = useState(initialData?.location || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || "");
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [status, setStatus] = useState(initialData?.status || "draft");
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [seoDesc, setSeoDesc] = useState(initialData?.seoDesc || "");
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  // Upload States
  const [isThumbUploading, setIsThumbUploading] = useState(false);
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const [isGalleryUploading, setIsGalleryUploading] = useState(false);
  const [isCapturingFrame, setIsCapturingFrame] = useState(false);
  const [videoTime, setVideoTime] = useState<number>(0);

  // Hidden Video Ref for Frame Capture
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditMode) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generatedSlug);
    }
  };

  const handleThumbUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsThumbUploading(true);
    try {
      let finalUrl: string | null = null;
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.urls?.[0]) {
            finalUrl = data.urls[0];
          }
        }
      } catch {
        // Fallback to client-side data URL
      }

      if (!finalUrl) {
        const reader = new FileReader();
        finalUrl = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      setThumbnail(finalUrl);
      toast.success("Thumbnail cover uploaded successfully!");
    } catch (err) {
      toast.error("Failed to upload thumbnail");
    } finally {
      setIsThumbUploading(false);
      e.target.value = "";
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsVideoUploading(true);
    try {
      let uploadedVideoUrl: string | null = null;
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.urls?.[0]) {
            uploadedVideoUrl = data.urls[0];
          }
        }
      } catch {
        // Fallback to local Object URL
      }

      if (!uploadedVideoUrl) {
        // Fallback to browser object URL for preview and frame capture
        uploadedVideoUrl = URL.createObjectURL(file);
        setVideoUrl(uploadedVideoUrl);
        toast.info("Video loaded in browser! You can now scrub to any frame and capture it as thumbnail.");
        return;
      }

      setVideoUrl(uploadedVideoUrl);
      toast.success("Video uploaded successfully! You can now capture a frame as thumbnail below.");
    } catch (err) {
      toast.error("Failed to upload video");
    } finally {
      setIsVideoUploading(false);
      e.target.value = "";
    }
  };

  // Capture current frame from video and upload or save as thumbnail
  const captureFrameAsThumbnail = async () => {
    const video = videoPreviewRef.current;
    if (!video) {
      toast.error("Video player not ready.");
      return;
    }

    if (!video.videoWidth || !video.videoHeight) {
      toast.error("Video is not ready yet. Please wait a moment or press play.");
      return;
    }

    try {
      setIsCapturingFrame(true);
      const canvas = document.createElement("canvas");
      // Scale down if necessary to preserve aspect ratio within 1280px max dimension
      const maxDim = 1280;
      let width = video.videoWidth;
      let height = video.videoHeight;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context failed");

      ctx.drawImage(video, 0, 0, width, height);

      // 1. Generate client-side base64 data URL immediately
      let fallbackDataUrl: string | null = null;
      try {
        fallbackDataUrl = canvas.toDataURL("image/jpeg", 0.88);
      } catch (canvasErr) {
        console.warn("Canvas toDataURL failed (possibly tainted canvas):", canvasErr);
      }

      // 2. Try uploading to server endpoint as a persistent file if server permits
      let uploadedUrl: string | null = null;
      try {
        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob((b) => resolve(b), "image/jpeg", 0.88)
        );

        if (blob) {
          const file = new File([blob], `frame-${Math.floor(video.currentTime)}.jpg`, { type: "image/jpeg" });
          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (res.ok) {
            const data = await res.json();
            if (data?.urls?.[0]) {
              uploadedUrl = data.urls[0];
            }
          }
        }
      } catch (uploadErr) {
        console.warn("Server upload failed, falling back to client-side frame data:", uploadErr);
      }

      const finalThumbnail = uploadedUrl || fallbackDataUrl;

      if (!finalThumbnail) {
        throw new Error("Unable to extract frame. Please ensure video permissions allow frame extraction.");
      }

      setThumbnail(finalThumbnail);
      if (video.currentTime < 0.5) {
        toast.info(`Captured frame at 0.0s (start title). Scrub the video to pick an action/stage shot!`);
      } else {
        toast.success(`Captured frame at ${video.currentTime.toFixed(1)}s as project thumbnail!`);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to capture frame");
    } finally {
      setIsCapturingFrame(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsGalleryUploading(true);
    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let fileUrl: string | null = null;

        try {
          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (res.ok) {
            const data = await res.json();
            if (data?.urls?.[0]) {
              fileUrl = data.urls[0];
            }
          }
        } catch {
          // Fallback to base64
        }

        if (!fileUrl) {
          const reader = new FileReader();
          fileUrl = await new Promise<string>((resolve, reject) => {
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        }

        if (fileUrl) {
          uploadedUrls.push(fileUrl);
        }
      }

      setImages([...images, ...uploadedUrls]);
      toast.success("Additional media uploaded successfully!");
    } catch (err) {
      toast.error("Failed to upload gallery media");
    } finally {
      setIsGalleryUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveGalleryImage = (idxToRemove: number) => {
    setImages(images.filter((_, idx) => idx !== idxToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !description || !thumbnail || !categoryId) {
      toast.error("Please fill in all required fields (Title, Slug, Category, Description, and Thumbnail).");
      return;
    }

    startTransition(async () => {
      try {
        const payload = {
          title,
          slug,
          client: client || null,
          categoryId,
          projectDate: projectDate ? new Date(projectDate) : null,
          location: location || null,
          description,
          thumbnail,
          videoUrl: videoUrl || null,
          featured,
          status,
          seoTitle: seoTitle || null,
          seoDesc: seoDesc || null,
          images,
        };

        if (isEditMode && initialData?.id) {
          await updatePortfolio(initialData.id, payload);
          toast.success("Project updated successfully!");
        } else {
          await createPortfolio(payload);
          toast.success("Project created successfully!");
        }

        router.push("/admin/portfolio");
        router.refresh();
      } catch (err: any) {
        toast.error(err.message || "Failed to save project");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Back Button */}
      <div className="flex items-center">
        <Link 
          href="/admin/portfolio" 
          className="text-sm font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Portfolios</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Fields Form (Takes 2 Columns) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* General Information Card */}
          <Card className="border border-gray-100 shadow-sm rounded-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Project Details</CardTitle>
              <CardDescription>Enter project title, slug, client names, locations, and descriptions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <Label htmlFor="project-title">Project Title *</Label>
                  <Input
                    id="project-title"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Custom Exhibition Booth for Company X"
                    required
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="project-slug">Slug (URL) *</Label>
                  <Input
                    id="project-slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. custom-exhibition-booth-company-x"
                    required
                    disabled={isPending || isEditMode}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <Label htmlFor="project-client">Client Name</Label>
                  <Input
                    id="project-client"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="e.g. Bank Mandiri"
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="project-date">Date Completed</Label>
                  <Input
                    id="project-date"
                    type="date"
                    value={projectDate}
                    onChange={(e) => setProjectDate(e.target.value)}
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="project-location">Location / Venue</Label>
                  <Input
                    id="project-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. ICE BSD, Tangerang"
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="project-description">Project Description *</Label>
                <textarea
                  id="project-description"
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-200 bg-white rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#FFD400] disabled:bg-gray-50 leading-relaxed"
                  placeholder="Describe the structural build, custom fabrication materials, LED mapping, and event scope..."
                  required
                  disabled={isPending}
                />
              </div>
            </CardContent>
          </Card>

          {/* Video Attachment & Frame Selection Card */}
          <Card className="border border-gray-100 shadow-sm rounded-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Video className="h-5 w-5 text-brand-magenta" />
                <span>Project Video & Frame Picker</span>
              </CardTitle>
              <CardDescription>
                Upload an MP4/WebM video. You can scrub/play to any timestamp and set that exact frame as the thumbnail cover!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {videoUrl ? (
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-gray-200">
                    <video
                      ref={videoPreviewRef}
                      src={videoUrl}
                      controls
                      playsInline
                      crossOrigin="anonymous"
                      onTimeUpdate={(e) => setVideoTime(e.currentTarget.currentTime)}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        onClick={captureFrameAsThumbnail}
                        disabled={isCapturingFrame || isPending}
                        className="bg-brand-magenta hover:bg-brand-magenta/90 text-white font-semibold flex items-center gap-2 shadow-sm text-xs sm:text-sm"
                      >
                        {isCapturingFrame ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Camera className="h-4 w-4" />
                        )}
                        <span>Set Current Video Frame as Thumbnail</span>
                      </Button>
                      <span className="text-xs text-zinc-500 font-mono bg-white px-2.5 py-1 rounded-md border border-zinc-200 shadow-xs">
                        Frame: {videoTime.toFixed(1)}s
                      </span>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setVideoUrl("")}
                      className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
                      disabled={isPending}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      Remove Video
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="border border-dashed border-gray-200 rounded-xl bg-gray-50/50 p-6 text-center">
                    <label className="flex flex-col items-center gap-2 cursor-pointer">
                      <div className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 shadow-sm">
                        {isVideoUploading ? (
                          <Loader2 className="h-5 w-5 animate-spin text-brand-magenta" />
                        ) : (
                          <Video className="h-5 w-5 text-brand-magenta" />
                        )}
                      </div>
                      <span className="text-xs font-semibold text-gray-700">
                        {isVideoUploading ? "Uploading video..." : "Upload Project Video (MP4 / WebM)"}
                      </span>
                      <span className="text-[10px] text-gray-400">Plays on card hover & on detail view</span>
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime"
                        className="hidden"
                        onChange={handleVideoUpload}
                        disabled={isVideoUploading || isPending}
                      />
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Or enter video URL / path (e.g. /uploads/portfolio/uimf-2026.mp4)"
                      className="text-xs"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const val = (e.currentTarget.value || "").trim();
                          if (val) setVideoUrl(val);
                        }
                      }}
                      onBlur={(e) => {
                        const val = (e.currentTarget.value || "").trim();
                        if (val) setVideoUrl(val);
                      }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Project Gallery Images (Multiple) */}
          <Card className="border border-gray-100 shadow-sm rounded-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Additional Gallery Media</CardTitle>
              <CardDescription>Upload extra photo shots or angles of the project.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Grid Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {images.map((imgUrl, idx) => (
                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 bg-gray-50 group">
                      <img 
                        src={imgUrl} 
                        alt={`Gallery ${idx}`} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="h-8 w-8 bg-red-600 hover:bg-red-700 rounded-full text-white"
                          disabled={isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Dropzone */}
              <div className="border border-dashed border-gray-200 rounded-xl bg-gray-50/50 p-6 text-center">
                <label className="flex flex-col items-center gap-2 cursor-pointer">
                  <div className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 shadow-sm">
                    {isGalleryUploading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Upload className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-gray-700">
                    {isGalleryUploading ? "Uploading photos..." : "Click to select additional photos"}
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleGalleryUpload}
                    disabled={isGalleryUploading || isPending}
                  />
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar settings (Takes 1 Column) */}
        <div className="space-y-8">
          {/* Classification & Settings */}
          <Card className="border border-gray-100 shadow-sm rounded-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-base font-bold text-gray-900">Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <Label htmlFor="project-category">Category *</Label>
                <select
                  id="project-category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                  disabled={isPending}
                  className="w-full h-10 border border-gray-200 bg-white rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#FFD400]"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Status Select */}
              <div className="space-y-1.5">
                <Label htmlFor="project-status">Publish Status</Label>
                <select
                  id="project-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  disabled={isPending}
                  className="w-full h-10 border border-gray-200 bg-white rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#FFD400]"
                >
                  <option value="draft">Draft (Hidden)</option>
                  <option value="published">Published (Live)</option>
                </select>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <Label htmlFor="project-featured" className="font-semibold text-sm">Featured Project</Label>
                  <p className="text-[10px] text-gray-400 mt-0.5">Feature this project prominently on the homepage.</p>
                </div>
                <input
                  id="project-featured"
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  disabled={isPending}
                  className="h-4 w-4 rounded border-gray-300 text-[#FFD400] focus:ring-[#FFD400]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Project Thumbnail Image */}
          <Card className="border border-gray-100 shadow-sm rounded-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-base font-bold text-gray-900">Thumbnail Cover *</CardTitle>
              <CardDescription className="text-xs">
                Upload a picture directly OR use the Video Frame Picker on the left.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {thumbnail ? (
                <div className="space-y-2">
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img 
                      src={thumbnail} 
                      alt="Thumbnail cover" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        onClick={() => setThumbnail("")}
                        className="h-7 w-7 bg-red-600 hover:bg-red-700 rounded-md text-white shadow-sm"
                        disabled={isPending}
                        title="Hapus Thumbnail"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {thumbnail !== initialData?.thumbnail && (
                      <div className="absolute bottom-2 left-2 bg-emerald-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm">
                        Baru dipilih (Belum disimpan)
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-brand-magenta hover:underline cursor-pointer font-medium flex items-center gap-1">
                      <Upload className="h-3 w-3" />
                      <span>Ganti dengan foto lain</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleThumbUpload}
                        disabled={isThumbUploading || isPending}
                      />
                    </label>
                    {isThumbUploading && <Loader2 className="h-3.5 w-3.5 animate-spin text-brand-magenta" />}
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-gray-200 rounded-xl bg-gray-50/50 p-6 text-center">
                  <label className="flex flex-col items-center gap-1.5 cursor-pointer">
                    <div className="w-9 h-9 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 shadow-sm">
                      {isThumbUploading ? (
                        <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      ) : (
                        <Upload className="h-4.5 w-4.5" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-gray-700">
                      {isThumbUploading ? "Uploading..." : "Upload custom cover picture"}
                    </span>
                    <span className="text-[10px] text-gray-400">JPG, PNG, or WebP</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbUpload}
                      disabled={isThumbUploading || isPending}
                    />
                  </label>
                </div>
              )}
            </CardContent>
          </Card>

          {/* SEO Metadata Card */}
          <Card className="border border-gray-100 shadow-sm rounded-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-base font-bold text-gray-900">SEO Customization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="project-seotitle">Meta Title</Label>
                <Input
                  id="project-seotitle"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Defaults to Project Title"
                  disabled={isPending}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="project-seodesc">Meta Description</Label>
                <textarea
                  id="project-seodesc"
                  rows={3}
                  value={seoDesc}
                  onChange={(e) => setSeoDesc(e.target.value)}
                  className="w-full border border-gray-200 bg-white rounded-md p-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#FFD400] disabled:bg-gray-50"
                  placeholder="Write search description..."
                  disabled={isPending}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end gap-3 pb-12 border-t border-gray-200 pt-6">
        <Link href="/admin/portfolio">
          <Button 
            type="button" 
            variant="outline" 
            className="border-gray-200 hover:bg-gray-50 text-gray-700"
            disabled={isPending}
          >
            Cancel
          </Button>
        </Link>
        <Button 
          type="submit" 
          disabled={isPending}
          className="bg-[#FFD400] text-black hover:bg-[#e6be00] font-semibold h-10 px-6 rounded-xl flex items-center gap-2"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          <span>{isEditMode ? "Save Changes" : "Create Project"}</span>
        </Button>
      </div>
    </form>
  );
}
