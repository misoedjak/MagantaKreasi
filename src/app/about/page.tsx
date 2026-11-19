import { prisma } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Star, ShieldCheck, HeartHandshake } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tentang Workshop In-House Kami di Bekasi & Jakarta",
    description:
      "Kenali tim fabrikasi event, workshop in-house di Bekasi, visi, dan standar pengerjaan Maganta Kreasi untuk booth pameran, panggung, dan dekorasi event di Jabodetabek.",
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const profile = await prisma.companyProfile.findFirst();
  const settings = await prisma.settings.findFirst();

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-[#FFD400] selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#0a0a0c] to-brand-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFD400]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Our Story & <span className="text-[#FFD400]">Vision</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Discover the production team, engineering methods, and core values that drive our event fabrication success.
          </p>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Story text */}
            <div className="space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                Who We Are
              </h2>
              <p className="text-white/70 leading-relaxed font-light">
                {profile?.description || "Maganta Kreasi adalah spesialis fabrikasi dan dekorasi event premier di Indonesia. Beroperasi dari workshop in-house kami yang luas, kami mewujudkan desain visioner menjadi nyata dengan stabilitas struktural yang tak tertandingi. Dari backdrop perusahaan hingga stan pameran besar, kami membangun fondasi produksi event yang sukses."}
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Produksi In-house",
                  "Fabrikator Ahli",
                  "Logistik Nasional",
                  "Teknik Konstruksi Dua Tingkat",
                  "Kalkulasi Struktural Aman",
                  "Finishing Matte Premium"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-white/90 text-sm">
                    <CheckCircle2 className="text-[#FFD400] shrink-0" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision & Mission Cards */}
            <div className="space-y-6">
              <div className="glass-card p-8 border border-white/5 rounded-2xl relative overflow-hidden group hover:border-[#FFD400]/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#FFD400] shrink-0">
                    <Star className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold mb-2">Our Vision</h3>
                    <p className="text-white/60 text-sm leading-relaxed font-light">
                      {profile?.vision || "To be the leading and most trusted event fabrication and decoration provider in Indonesia, recognized for engineering precision, visual brilliance, and timely execution."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 border border-white/5 rounded-2xl relative overflow-hidden group hover:border-[#FFD400]/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#FFD400] shrink-0">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold mb-2">Our Mission</h3>
                    <p className="text-white/60 text-sm leading-relaxed font-light">
                      {profile?.mission || "To deliver high-quality, structurally safe, and aesthetically stunning fabrications, providing exceptional client support and executing projects under strict deadlines with zero tolerance for defects."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-[#0a0a0c] border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-white/60 text-sm max-w-md mx-auto font-light">
              The fundamental standards that guide every blueprint, weld, cut, and joint we manufacture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Safety First", desc: "Every stage, gate, and double-deck structure undergoes strict calculations and structural load checks to ensure absolute safety for guests and staff.", icon: <ShieldCheck size={28} /> },
              { title: "Artistic Precision", desc: "We focus on clean visual joints, seamless branding areas, matte color matching, and edge-lit illumination details that make booths standout.", icon: <Star size={28} /> },
              { title: "Execution Integrity", desc: "No delays. We work round-the-clock during tight load-in windows to ensure your fabrication setup is polished and ready hours before showtime.", icon: <HeartHandshake size={28} /> },
            ].map((val, i) => (
              <div key={i} className="glass-card p-8 border border-white/5 rounded-2xl space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#FFD400]">
                  {val.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-white">{val.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed font-light">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer profile={profile} />
    </div>
  );
}
