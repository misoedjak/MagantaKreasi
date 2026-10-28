"use client";

import React, { useState, useTransition } from "react";
import { 
  FileText, 
  Loader2,
  MessageCircle,
  Link2
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { submitQuoteRequest } from "@/app/actions/public";

interface QuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: { id: string; name: string }[];
  preselectedCategory?: string; // category name to auto-select
}

export default function QuoteDialog({ open, onOpenChange, categories, preselectedCategory }: QuoteDialogProps) {
  const [isPending, startTransition] = useTransition();

  // Form states
  const [contact, setContact] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState(preselectedCategory || "");
  const [customEventType, setCustomEventType] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [budget, setBudget] = useState("");
  const [blueprintUrl, setBlueprintUrl] = useState("");
  const [description, setDescription] = useState("");

  const todayStr = React.useMemo(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  // Sync preselectedCategory when it changes
  React.useEffect(() => {
    if (preselectedCategory) {
      setEventType(preselectedCategory);
      setIsCustom(false);
      setCustomEventType("");
    }
  }, [preselectedCategory]);

  const handleSelectChange = (val: string) => {
    if (val === "CUSTOM") {
      setIsCustom(true);
      setEventType("");
    } else {
      setIsCustom(false);
      setEventType(val);
      setCustomEventType("");
    }
  };

  const handleWhatsAppBridge = () => {
    const targetPhone = "6281188820067";
    const selectedType = isCustom ? customEventType : eventType;
    const lines = [
      "Halo Maganta Kreasi, saya ingin konsultasi cepat mengenai fabrikasi booth / event.",
      contact ? `Nama: ${contact}` : null,
      company ? `Perusahaan: ${company}` : null,
      selectedType ? `Kebutuhan: ${selectedType}` : null,
      location ? `Lokasi: ${location}` : null,
      eventDate ? `Estimasi Tanggal: ${eventDate}` : null,
      budget ? `Estimasi Anggaran: ${budget}` : null,
      blueprintUrl ? `Link Blueprint/CAD: ${blueprintUrl}` : null,
      description ? `Kebutuhan: ${description}` : null,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${targetPhone}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact || !phone || !email || !description) {
      toast.error("Harap isi semua kolom wajib (Nama, WhatsApp/Telepon, Email, dan Brief Proyek).");
      return;
    }

    const finalEventType = isCustom ? customEventType : eventType;
    const finalDescription = blueprintUrl.trim()
      ? `${description.trim()}\n\n[Lampiran Blueprint / Referensi Desain]: ${blueprintUrl.trim()}`
      : description.trim();

    startTransition(async () => {
      try {
        await submitQuoteRequest({
          contact,
          company: company || null,
          phone,
          email,
          eventType: finalEventType || null,
          location: location || null,
          eventDate: eventDate || null,
          budget: budget || null,
          description: finalDescription,
        });

        toast.success("Permintaan penawaran terkirim! Tim estimator kami akan segera menghubungi Anda.");
        onOpenChange(false);
        resetForm();
      } catch (err: any) {
        toast.error(err.message || "Gagal mengirim permintaan penawaran.");
      }
    });
  };

  const resetForm = () => {
    setContact("");
    setCompany("");
    setPhone("");
    setEmail("");
    setEventType("");
    setCustomEventType("");
    setIsCustom(false);
    setLocation("");
    setEventDate("");
    setBudget("");
    setBlueprintUrl("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-zinc-900 rounded-2xl border-none shadow-2xl sm:max-w-4xl p-6 md:p-8">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="pb-4 border-b border-zinc-100">
            <DialogTitle className="text-xl md:text-2xl font-bold flex items-center gap-2.5 text-zinc-900">
              <span className="p-2 rounded-lg bg-brand-yellow/20 text-brand-magenta">
                <FileText className="h-5 w-5" />
              </span>
              <span>Minta Penawaran & Estimasi Biaya</span>
            </DialogTitle>
            <DialogDescription className="text-sm text-zinc-600 mt-1">
              Kirimkan brief atau cetak biru proyek Anda. Estimator dan insinyur fabrikasi kami akan menyiapkan kalkulasi struktural serta proposal penawaran (RAB).
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 py-6 max-h-[60vh] overflow-y-auto px-1">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="q-contact" className="text-xs font-semibold text-zinc-700 uppercase tracking-wide">
                Nama Narahubung <span className="text-brand-magenta">*</span>
              </Label>
              <Input
                id="q-contact"
                placeholder="Contoh: Budi Santoso"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                disabled={isPending}
                className="h-11 text-sm rounded-lg border-zinc-200 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta"
              />
            </div>
            
            {/* Company */}
            <div className="space-y-1.5">
              <Label htmlFor="q-company" className="text-xs font-semibold text-zinc-700 uppercase tracking-wide">
                Nama Perusahaan / EO / Brand
              </Label>
              <Input
                id="q-company"
                placeholder="Contoh: PT Kreasi Bangsa Perkasa"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={isPending}
                className="h-11 text-sm rounded-lg border-zinc-200 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="q-phone" className="text-xs font-semibold text-zinc-700 uppercase tracking-wide">
                Nomor WhatsApp / Telepon <span className="text-brand-magenta">*</span>
              </Label>
              <Input
                id="q-phone"
                placeholder="Contoh: 0812-3456-7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={isPending}
                className="h-11 text-sm rounded-lg border-zinc-200 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="q-email" className="text-xs font-semibold text-zinc-700 uppercase tracking-wide">
                Email Narahubung / Kantor <span className="text-brand-magenta">*</span>
              </Label>
              <Input
                id="q-email"
                type="email"
                placeholder="Contoh: procurement@perusahaan.co.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending}
                className="h-11 text-sm rounded-lg border-zinc-200 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta"
              />
            </div>

            {/* Event Type */}
            <div className="space-y-1.5">
              <Label htmlFor="q-type" className="text-xs font-semibold text-zinc-700 uppercase tracking-wide">
                Kategori Kebutuhan <span className="text-brand-magenta">*</span>
              </Label>
              <select
                id="q-type"
                value={isCustom ? "CUSTOM" : (eventType || "")}
                onChange={(e) => handleSelectChange(e.target.value)}
                disabled={isPending}
                required
                className="flex h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="" disabled>Pilih kategori fabrikasi...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
                <option value="CUSTOM">Kustom (Spesifikasi Khusus)</option>
              </select>
            </div>

            {/* Event Date */}
            <div className="space-y-1.5">
              <Label htmlFor="q-date" className="text-xs font-semibold text-zinc-700 uppercase tracking-wide">
                Tanggal Mulai Event / Loading
              </Label>
              <Input
                id="q-date"
                type="date"
                min={todayStr}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                disabled={isPending}
                className="h-11 text-sm rounded-lg border-zinc-200 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta"
              />
            </div>

            {isCustom && (
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="q-custom-type" className="text-xs font-semibold text-zinc-700 uppercase tracking-wide">
                  Detail Kategori Kustom <span className="text-brand-magenta">*</span>
                </Label>
                <Input
                  id="q-custom-type"
                  placeholder="Contoh: Kinetic LED Panggung & Konstruksi Truss Raksasa"
                  value={customEventType}
                  onChange={(e) => setCustomEventType(e.target.value)}
                  required
                  disabled={isPending}
                  className="h-11 text-sm rounded-lg border-zinc-200 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta"
                />
              </div>
            )}

            {/* Location */}
            <div className="space-y-1.5">
              <Label htmlFor="q-loc" className="text-xs font-semibold text-zinc-700 uppercase tracking-wide">
                Lokasi Venue & Kota
              </Label>
              <Input
                id="q-loc"
                placeholder="Contoh: ICE BSD Hall 3, Tangerang"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={isPending}
                className="h-11 text-sm rounded-lg border-zinc-200 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta"
              />
            </div>

            {/* Budget */}
            <div className="space-y-1.5">
              <Label htmlFor="q-budget" className="text-xs font-semibold text-zinc-700 uppercase tracking-wide">
                Estimasi Alokasi Anggaran
              </Label>
              <Input
                id="q-budget"
                placeholder="Contoh: IDR 50.000.000 - 150.000.000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                disabled={isPending}
                className="h-11 text-sm rounded-lg border-zinc-200 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta"
              />
            </div>

            {/* Blueprint / Attachment Link */}
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="q-blueprint" className="text-xs font-semibold text-zinc-700 uppercase tracking-wide flex items-center gap-1.5">
                <Link2 className="h-3.5 w-3.5 text-zinc-500" />
                <span>Link Cetak Biru / File CAD / Dokumen Google Drive (Opsional)</span>
              </Label>
              <Input
                id="q-blueprint"
                type="url"
                placeholder="https://drive.google.com/drive/folders/... atau Figma link"
                value={blueprintUrl}
                onChange={(e) => setBlueprintUrl(e.target.value)}
                disabled={isPending}
                className="h-11 text-sm rounded-lg border-zinc-200 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta"
              />
              <p className="text-xs text-zinc-500 font-normal">
                Pastikan hak akses tautan disetel ke &ldquo;Siapa saja yang memiliki link&rdquo; (Anyone with link).
              </p>
            </div>

            {/* Brief */}
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="q-desc" className="text-xs font-semibold text-zinc-700 uppercase tracking-wide">
                Brief & Spesifikasi Proyek <span className="text-brand-magenta">*</span>
              </Label>
              <textarea
                id="q-desc"
                rows={4}
                placeholder="Jelaskan dimensi (PxLxT), preferensi material (multiplex/duco/HPL/metal), instalasi kelistrikan/lighting, dan tenggat waktu loading venue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-zinc-200 bg-white rounded-lg p-3 text-sm text-zinc-900 focus:outline-none focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta"
                required
                disabled={isPending}
              />
            </div>
          </div>

          <DialogFooter className="mt-6 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center">
              <Button
                type="button"
                variant="outline"
                onClick={handleWhatsAppBridge}
                disabled={isPending}
                className="h-11 px-4 text-emerald-700 border-emerald-600/30 hover:bg-emerald-50 hover:text-emerald-800 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
                title="Buka WhatsApp langsung dengan data yang sudah diisi"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                <span>Konsultasi Cepat via WhatsApp</span>
              </Button>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  resetForm();
                }}
                disabled={isPending}
                className="h-11 px-5 border-zinc-200 text-zinc-700 hover:bg-zinc-100 font-medium text-xs sm:text-sm"
              >
                Tutup
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="h-11 px-6 bg-brand-yellow text-zinc-900 hover:bg-brand-magenta hover:text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2"
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>Kirim Permintaan Estimasi</span>
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
