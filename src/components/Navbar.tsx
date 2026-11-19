"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

interface NavbarProps {
  whatsappNumber?: string;
  email?: string | null;
  phoneDisplay?: string | null;
}

export default function Navbar({
  whatsappNumber = "6282115151515",
  email = "hello@magantakreasi.id",
  phoneDisplay = "+62 821 1515 1515",
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const isEn = lang === "en";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = isEn
    ? [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/#about" },
        { name: "Services", href: "/services" },
        { name: "Rentals", href: "/products" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Clients", href: "/clients" },
        { name: "Contact", href: "/#contact" },
      ]
    : [
        { name: "Beranda", href: "/" },
        { name: "Tentang Kami", href: "/#about" },
        { name: "Layanan", href: "/services" },
        { name: "Sewa Produk", href: "/products" },
        { name: "Portofolio", href: "/portfolio" },
        { name: "Klien", href: "/clients" },
        { name: "Hubungi Kami", href: "/#contact" },
      ];

  const ctaLabel = isEn ? "Book Now" : "Pesan di Sini";

  const cleanWhatsapp = (() => {
    let clean = whatsappNumber.replace(/[^0-9]/g, "");
    if (clean.startsWith("0")) {
      clean = "62" + clean.substring(1);
    }
    return clean;
  })();

  return (
    <MotionConfig reducedMotion="user">
      <motion.nav
        suppressHydrationWarning
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        aria-label="Navigasi Utama"
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,box-shadow] duration-200 ${
          mobileMenuOpen
            ? "bg-transparent py-2"
            : scrolled
              ? "bg-brand-magenta py-2 lg:py-2.5 border-b border-white/10 shadow-md"
              : "bg-brand-magenta py-2.5 lg:py-3 border-b border-white/10 shadow-md"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow rounded-lg"
            >
              <span className="font-heading text-lg md:text-xl font-bold tracking-wider text-white">
                MAGANTA<span className="text-brand-yellow">KREASI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Links (Centered so right-side switcher & CTA stay locked in place) */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-5 lg:gap-6 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-white/90 hover:text-brand-yellow transition-colors relative py-1.5 group whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow rounded-sm"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-yellow transition-[width] duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop Right Controls (Fixed widths so ID/EN never shifts under cursor) */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Language Switcher (ID | EN) */}
            <div
              role="group"
              aria-label="Language switcher"
              className="inline-flex items-center rounded-full bg-white/15 border border-white/25 p-0.5 text-[11px] font-bold shrink-0"
            >
              <button
                type="button"
                onClick={() => setLang("id")}
                aria-pressed={lang === "id"}
                className={`w-8 py-1 text-center rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow ${
                  lang === "id"
                    ? "bg-white text-brand-magenta shadow-xs"
                    : "text-white/85 hover:text-white"
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
                className={`w-8 py-1 text-center rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow ${
                  lang === "en"
                    ? "bg-white text-brand-magenta shadow-xs"
                    : "text-white/85 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            <Link
              href={`${pathname}?quote=open`}
              className="inline-flex items-center justify-center w-[118px] py-2 rounded-full bg-brand-yellow text-brand-dark text-xs font-bold hover:bg-white transition-colors duration-200 shadow-md whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:opacity-90"
            >
              {ctaLabel}
            </Link>
          </div>

          {/* Mobile Controls: Language Switcher + Menu Toggle */}
          <div className="flex md:hidden items-center gap-2 z-50 relative">
            <div
              role="group"
              aria-label="Language switcher"
              className="inline-flex items-center rounded-full bg-white/15 border border-white/25 p-0.5 text-[11px] font-bold"
            >
              <button
                type="button"
                onClick={() => setLang("id")}
                aria-pressed={lang === "id"}
                className={`px-2 py-1 rounded-full transition-colors cursor-pointer ${
                  lang === "id" ? "bg-white text-brand-magenta" : "text-white/85"
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
                className={`px-2 py-1 rounded-full transition-colors cursor-pointer ${
                  lang === "en" ? "bg-white text-brand-magenta" : "text-white/85"
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              className="text-white w-11 h-11 inline-flex items-center justify-center rounded-xl active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-brand-yellow"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
            >
              <motion.div
                key={mobileMenuOpen ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? (
                  <X size={22} className="text-brand-yellow" aria-hidden="true" />
                ) : (
                  <Menu size={22} aria-hidden="true" />
                )}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-brand-magenta/98 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-8 pt-24 md:hidden overflow-y-auto"
            >
              <div className="flex flex-col gap-5">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: idx * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-heading font-bold text-white hover:text-brand-yellow transition-colors block py-1"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.25 }}
                className="flex flex-col gap-5 border-t border-white/15 pt-6 mt-6"
              >
                <Link
                  href={`${pathname}?quote=open`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full min-h-[48px] py-3.5 flex items-center justify-center rounded-full bg-brand-yellow text-brand-dark font-bold text-base hover:bg-white transition-colors shadow-md"
                >
                  {ctaLabel}
                </Link>
                <div className="flex flex-wrap justify-between items-center gap-2 text-xs text-white/80">
                  <span>{email || "hello@magantakreasi.id"}</span>
                  <span>{phoneDisplay || "+62 821 1515 1515"}</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Floating WhatsApp Action Button (Mobile Only, 56x56px target) */}
      <a
        href={`https://wa.me/${cleanWhatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 md:hidden flex items-center justify-center w-14 h-14 bg-brand-whatsapp text-white rounded-full shadow-lg active:scale-95 transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle size={28} className="fill-current" aria-hidden="true" />
      </a>
    </MotionConfig>
  );
}
