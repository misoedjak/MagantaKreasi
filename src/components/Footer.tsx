import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";

interface FooterProps {
  profile?: {
    email: string | null;
    phone: string | null;
    phoneName: string | null;
    phone2: string | null;
    phone2Name: string | null;
    address: string | null;
    instagram: string | null;
    facebook: string | null;
    linkedin: string | null;
    whatsapp: string | null;
    whatsappName: string | null;
    whatsapp2: string | null;
    whatsapp2Name: string | null;
  } | null;
}

export default function Footer({ profile }: FooterProps) {
  const instagramLink = profile?.instagram ? `https://instagram.com/${profile.instagram}` : "#";

  const formatWhatsappNumber = (num: string) => {
    let clean = num.replace(/[^0-9]/g, "");
    if (clean.startsWith("0")) {
      clean = "62" + clean.substring(1);
    }
    return clean;
  };

  return (
    <footer className="bg-brand-magenta text-white pt-14 pb-10 border-t border-white/15 shadow-inner">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 md:gap-10 mb-12">
          {/* Brand & Desc */}
          <div>
            <div className="font-heading text-xl font-bold tracking-wider mb-4 text-white">
              MAGANTA<span className="text-brand-yellow">KREASI</span>
            </div>
            <p className="text-white/90 mb-5 leading-relaxed text-xs sm:text-sm max-w-xs">
              Solusi fabrikasi dan dekorasi event premium. Dari pembuatan booth pameran custom
              hingga panggung festival berskala besar.
            </p>
            <div className="flex gap-3">
              {/* Instagram */}
              <a
                href={instagramLink}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Maganta Kreasi"
                className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition-colors focus-visible:outline-2 focus-visible:outline-brand-yellow"
              >
                <svg
                  aria-hidden="true"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* Facebook */}
              <a
                href={profile?.facebook || "#"}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Maganta Kreasi"
                className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition-colors focus-visible:outline-2 focus-visible:outline-brand-yellow"
              >
                <svg
                  aria-hidden="true"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href={profile?.linkedin || "#"}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Maganta Kreasi"
                className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition-colors focus-visible:outline-2 focus-visible:outline-brand-yellow"
              >
                <svg
                  aria-hidden="true"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-base font-bold mb-4 text-white">Tautan Cepat</h3>
            <ul className="space-y-2.5">
              {[
                { name: "Beranda", href: "/test#" },
                { name: "Tentang Workshop", href: "/test#about" },
                { name: "Sewa Produk", href: "/products" },
                { name: "Portofolio Fabrikasi", href: "/test#portfolio" },
                { name: "Cara Kerja Kami", href: "/test#process" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/90 hover:text-brand-yellow transition-colors text-xs sm:text-sm inline-block py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak Section */}
          <div>
            <h3 className="font-heading text-base font-bold mb-4 text-white">Kontak</h3>
            <ul className="space-y-3 text-xs sm:text-sm text-white/95">
              {profile?.phone && (
                <li className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center shrink-0">
                    <Phone size={13} aria-hidden="true" />
                  </div>
                  <span className="text-white">
                    {profile.phoneName ? `${profile.phoneName} - ` : ""}
                    {profile.phone}
                  </span>
                </li>
              )}
              {profile?.phone2 && (
                <li className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center shrink-0">
                    <Phone size={13} aria-hidden="true" />
                  </div>
                  <span className="text-white">
                    {profile.phone2Name ? `${profile.phone2Name} - ` : ""}
                    {profile.phone2}
                  </span>
                </li>
              )}
              {profile?.whatsapp && (
                <li className="flex items-center gap-2.5">
                  <a
                    href={`https://wa.me/${formatWhatsappNumber(profile.whatsapp)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 hover:text-brand-yellow transition-colors py-0.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center shrink-0">
                      <MessageSquare size={13} aria-hidden="true" />
                    </div>
                    <span className="text-white">
                      {profile.whatsappName ? `${profile.whatsappName} - ` : ""}
                      {profile.whatsapp}
                    </span>
                  </a>
                </li>
              )}
              {profile?.whatsapp2 && (
                <li className="flex items-center gap-2.5">
                  <a
                    href={`https://wa.me/${formatWhatsappNumber(profile.whatsapp2)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 hover:text-brand-yellow transition-colors py-0.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center shrink-0">
                      <MessageSquare size={13} aria-hidden="true" />
                    </div>
                    <span className="text-white">
                      {profile.whatsapp2Name ? `${profile.whatsapp2Name} - ` : ""}
                      {profile.whatsapp2}
                    </span>
                  </a>
                </li>
              )}
              {profile?.email && (
                <li className="flex items-center gap-2.5">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2.5 hover:text-brand-yellow transition-colors py-0.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center shrink-0">
                      <Mail size={13} aria-hidden="true" />
                    </div>
                    <span className="text-white">Email - {profile.email}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Alamat Section */}
          <div>
            <h3 className="font-heading text-base font-bold mb-4 text-white">Alamat</h3>
            <ul className="space-y-3 text-xs sm:text-sm text-white/95">
              <li className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={13} aria-hidden="true" />
                </div>
                <span className="whitespace-pre-line leading-relaxed text-white">
                  {profile?.address || "Jakarta, Indonesia"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/85">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p>&copy; 2026 Maganta Kreasi. Hak cipta dilindungi.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-yellow transition-colors py-1">
              Kebijakan Privasi
            </a>
            <a href="#" className="hover:text-brand-yellow transition-colors py-1">
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
