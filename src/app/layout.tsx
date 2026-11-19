import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist, Covered_By_Your_Grace, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const coveredByYourGrace = Covered_By_Your_Grace({
  weight: "400",
  variable: "--font-covered-by-your-grace",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://magantakreasi.com"),
  title: {
    default: "Maganta Kreasi | Kontraktor Pameran, Booth Custom & Sewa Alat Event Jakarta Bekasi",
    template: "%s | Maganta Kreasi",
  },
  description:
    "Workshop produksi event in-house di Bekasi & Jakarta. Melayani jasa pembuatan booth pameran custom, panggung acara, backdrop, gate, dekorasi 3D, dan sewa alat event lengkap.",
  keywords: [
    "kontraktor pameran Jakarta",
    "kontraktor pameran Bekasi",
    "jasa pembuatan booth pameran custom",
    "vendor booth pameran",
    "jasa pembuatan panggung event",
    "vendor backdrop event Jakarta",
    "sewa alat event Bekasi",
    "sewa tenda sarnafil roder",
    "sewa videotron panggung",
    "workshop produksi event in-house",
    "Maganta Kreasi",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "8xOt2Vbh7TVcpeiu7sNWzZ3pLYNlS5Ut-WPLhuRH_gI",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: "https://magantakreasi.com",
    siteName: "Maganta Kreasi",
    title: "Maganta Kreasi | Kontraktor Pameran, Booth Custom & Sewa Alat Event",
    description:
      "Dikerjakan langsung dari workshop in-house kami di Bekasi. Jasa pembuatan booth pameran custom, panggung event, backdrop, gate, dan penyewaan peralatan event.",
    images: [
      {
        url: "/uploads/backgrounds/hero-flame-fest.jpg",
        width: 1200,
        height: 630,
        alt: "Maganta Kreasi — In-House Event Workshop Production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maganta Kreasi | Kontraktor Pameran & Vendor Booth Custom",
    description:
      "Workshop produksi event in-house untuk booth pameran custom, panggung, backdrop, gate, dan sewa alat event di Jabodetabek & Indonesia.",
    images: ["/uploads/backgrounds/hero-flame-fest.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner";
import { prisma } from "@/lib/db";
import { Suspense } from "react";
import GlobalQuoteDialog from "@/components/GlobalQuoteDialog";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" }
  });

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Maganta Kreasi",
    url: "https://magantakreasi.com",
    image: "https://magantakreasi.com/uploads/backgrounds/hero-flame-fest.jpg",
    description:
      "Workshop produksi event in-house untuk pembuatan booth pameran custom, panggung acara, backdrop, entrance gate, instalasi dekorasi 3D, dan sewa peralatan event di Bekasi, Jakarta, dan seluruh Indonesia.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Kampung Pekopen No.61, Lambangjaya, Kec. Tambun Sel.",
      addressLocality: "Kabupaten Bekasi",
      addressRegion: "Jawa Barat",
      postalCode: "17510",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.2846543,
      longitude: 107.0533416,
    },
    hasMap:
      "https://www.google.com/maps/place/MAGANTA+KREASI/@-6.2846527,107.0533447,17z/data=!4m6!3m5!1s0x2e6991a01e4dfca5:0x491f21ecaa20f8d3!8m2!3d-6.2846543!4d107.0533416!16s%2Fg%2F11x0zhdxjz",
    areaServed: ["Bekasi", "Jakarta", "Tangerang", "Depok", "Bogor", "Indonesia"],
    sameAs: ["https://www.instagram.com/magantakreasi/"],
    priceRange: "$$",
  };

  return (
    <html lang="id" className={cn("scroll-smooth", "font-sans", geist.variable)} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${coveredByYourGrace.variable} ${plusJakartaSans.variable} antialiased bg-brand-light text-brand-dark`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Providers>
          {children}
          <Suspense fallback={null}>
            <GlobalQuoteDialog categories={categories} />
          </Suspense>
        </Providers>
        <Toaster position="top-right" richColors />
      {/* impeccable-live-start */}
<script src="http://localhost:8400/live.js"></script>
{/* impeccable-live-end */}
</body>
    </html>
  );
}
