import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist, Covered_By_Your_Grace } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  title: "Maganta Kreasi | Kontraktor Pameran & Vendor Booth Premium",
  description: "Vendor kontraktor event terpercaya di Indonesia. Melayani jasa pembuatan booth pameran custom, panggung festival, panggung konser, dan backdrop event premium.",
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

  return (
    <html lang="en" className={cn("scroll-smooth", "font-sans", geist.variable)} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${coveredByYourGrace.variable} antialiased bg-brand-light text-brand-dark`} suppressHydrationWarning>
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
