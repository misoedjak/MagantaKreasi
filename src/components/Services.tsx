"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  bgImageUrl?: string | null;
}

interface ServicesProps {
  categories?: CategoryItem[];
}

interface CuratedServiceMeta {
  description: string;
  descriptionEn: string;
  shortTag: string;
  artKind:
    | "branding"
    | "booth"
    | "stage"
    | "decor"
    | "gate"
    | "backdrop"
    | "festival"
    | "totem";
}

function getCuratedServiceMeta(slug: string, fallbackDesc?: string | null): CuratedServiceMeta {
  const lower = slug.toLowerCase();

  if (lower.includes("branding")) {
    return {
      description:
        "Area registrasi, foyer, dan titik aktivasi brand dengan konstruksi rapi sesuai identitas acara.",
      descriptionEn:
        "Registration zones, foyers, and brand activation points fabricated cleanly to match your event identity.",
      shortTag: "EVENT BRANDING",
      artKind: "branding",
    };
  }
  if (lower.includes("booth")) {
    return {
      description:
        "Produksi booth pameran custom mulai dari rangka kayu, besi, finishing cat duco/HPL, hingga kelistrikan.",
      descriptionEn:
        "Custom exhibition booth fabrication from wood and steel framing to duco/HPL finishing and lighting.",
      shortTag: "CUSTOM BOOTH",
      artKind: "booth",
    };
  }
  if (lower.includes("stage") || lower.includes("panggung")) {
    return {
      description:
        "Pembuatan panggung acara korporat, konferensi, hingga panggung utama dengan struktur kokoh.",
      descriptionEn:
        "Corporate, conference, and main event stage construction engineered for structural strength and clean lines.",
      shortTag: "STAGE BUILD",
      artKind: "stage",
    };
  }
  if (lower.includes("decorative") || lower.includes("installation")) {
    return {
      description:
        "Instalasi dekorasi tematik 3D, rumah instalasi, dan elemen visual custom untuk mall maupun venue acara.",
      descriptionEn:
        "Thematic 3D decorative installations, spatial structures, and custom visual centerpieces for malls and venues.",
      shortTag: "3D DECORATION",
      artKind: "decor",
    };
  }
  if (lower.includes("gate") || lower.includes("gerbang")) {
    return {
      description:
        "Gerbang masuk utama (main gate) dan fasad sambutan dengan struktur aman untuk indoor maupun outdoor.",
      descriptionEn:
        "Main entrance gates and welcome facades engineered safely for both indoor and outdoor event venues.",
      shortTag: "MAIN GATE",
      artKind: "gate",
    };
  }
  if (lower.includes("backdrop")) {
    return {
      description:
        "Backdrop panggung, photowall, dan media wall dengan rangka presisi serta hasil visual yang rata dan rapi.",
      descriptionEn:
        "Stage backdrops, photowalls, and media walls built with precision frames and seamless flat visual finishes.",
      shortTag: "BACKDROP WALL",
      artKind: "backdrop",
    };
  }
  if (lower.includes("festival")) {
    return {
      description:
        "Dekorasi panggung festival, area konser, dan instalasi visual skala besar di ruang terbuka.",
      descriptionEn:
        "Festival stage decor, concert area builds, and large-scale open-air visual installations.",
      shortTag: "FESTIVAL AREA",
      artKind: "festival",
    };
  }
  if (lower.includes("totem") || lower.includes("sign")) {
    return {
      description:
        "Totem penunjuk arah (wayfinding), huruf timbul 3D, dan signage area untuk navigasi pengunjung.",
      descriptionEn:
        "Wayfinding totems, 3D raised lettering, and area signage crafted for clear visitor navigation.",
      shortTag: "3D SIGNAGE",
      artKind: "totem",
    };
  }

  return {
    description:
      fallbackDesc ||
      "Pengerjaan konstruksi dan dekorasi event langsung dari workshop in-house kami.",
    descriptionEn:
      "Event construction and custom decor fabricated directly from our in-house workshop.",
    shortTag: "IN-HOUSE BUILD",
    artKind: "stage",
  };
}

// Maganta Kreasi brand color palette for the staggered poster strip
const POSTER_THEMES = [
  {
    bg: "bg-brand-magenta",
    text: "text-white",
    muted: "text-white/85",
    divider: "border-white/20",
    ink: "#18181B",
    paper: "#FFFDF8",
    accent: "#FFD400",
    soft: "#F7C5D8",
  },
  {
    bg: "bg-brand-yellow",
    text: "text-brand-dark",
    muted: "text-brand-dark/75",
    divider: "border-brand-dark/15",
    ink: "#18181B",
    paper: "#FFFFFF",
    accent: "#BE3168",
    soft: "#FFF3B0",
  },
  {
    bg: "bg-paper-cream",
    text: "text-brand-dark",
    muted: "text-brand-dark/70",
    divider: "border-brand-dark/12",
    ink: "#18181B",
    paper: "#FFFFFF",
    accent: "#BE3168",
    soft: "#FFD400",
  },
  {
    bg: "bg-[#E04F82]",
    text: "text-white",
    muted: "text-white/85",
    divider: "border-white/20",
    ink: "#18181B",
    paper: "#FFFDF8",
    accent: "#FFD400",
    soft: "#FDE2EC",
  },
  {
    bg: "bg-[#F06449]",
    text: "text-white",
    muted: "text-white/85",
    divider: "border-white/20",
    ink: "#18181B",
    paper: "#FFFDF8",
    accent: "#FFD400",
    soft: "#FFE0D6",
  },
];

interface ArtPalette {
  ink: string;
  paper: string;
  accent: string;
  soft: string;
}

/**
 * Lineless, soft-shaded flat-editorial animated poster illustrations with stylized
 * human characters & scenes directly matching each Maganta Kreasi service description.
 */
function ServicePosterArt({
  kind,
  palette,
}: {
  kind: CuratedServiceMeta["artKind"];
  palette: ArtPalette;
}) {
  const { ink, paper, accent, soft } = palette;

  // 1. Branding Area: Registration desk + receptionist welcoming guest + modular foyer brand wall
  if (kind === "branding") {
    return (
      <svg viewBox="0 0 220 170" fill="none" className="w-full h-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="br-coral" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF9B6A" />
            <stop offset="100%" stopColor="#F26A4B" />
          </linearGradient>
          <linearGradient id="br-indigo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8576F2" />
            <stop offset="100%" stopColor="#6152D6" />
          </linearGradient>
          <linearGradient id="br-skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE2D4" />
            <stop offset="100%" stopColor="#F5C3AF" />
          </linearGradient>
        </defs>

        {/* Floating editorial accents */}
        <motion.g
          animate={{ y: [0, -3.5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="34" cy="24" r="8.5" fill="#FFE45E" />
          <path d="M180 22 L189 31 M189 22 L180 31" stroke="#6CE5E8" strokeWidth="2.4" strokeLinecap="round" />
        </motion.g>

        {/* Foyer Modular Brand Wall behind desk */}
        <rect x="26" y="34" width="168" height="94" rx="8" fill="#FFF7F2" opacity="0.96" />
        <rect x="38" y="46" width="32" height="22" rx="3" fill="#FFD9E6" />
        <rect x="76" y="46" width="32" height="22" rx="3" fill="#FFE45E" />
        <rect x="114" y="46" width="32" height="22" rx="3" fill="#E8E4FF" />
        <rect x="38" y="74" width="52" height="16" rx="3" fill="#FFE8DE" />

        {/* Hanging Vertical Brand Flag */}
        <motion.g
          animate={{ y: [0, 2.5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <line x1="168" y1="22" x2="168" y2="42" stroke={ink} strokeWidth="1" opacity="0.6" />
          <rect x="155" y="42" width="26" height="44" rx="4" fill="url(#br-coral)" />
          <circle cx="168" cy="60" r="6" fill="#FFE45E" />
          <line x1="161" y1="74" x2="175" y2="74" stroke="#FFFDF8" strokeWidth="1.6" strokeLinecap="round" />
        </motion.g>

        {/* Receptionist behind registration desk */}
        <g>
          <circle cx="118" cy="80" r="7.5" fill="url(#br-skin)" />
          <path d="M111 80 C110 72 117 69 124 73 C126 75 126 83 123 87 C121 82 115 80 111 80 Z" fill={ink} />
          <path d="M107 95 C107 89 112 87 118 87 C124 87 129 90 129 97 L130 114 H106 Z" fill="url(#br-indigo)" />
        </g>

        {/* Sleek Registration Counter Desk */}
        <rect x="76" y="108" width="108" height="44" rx="5" fill="#FFFDF8" />
        <rect x="72" y="104" width="116" height="8" rx="3" fill="#FFE45E" />
        <rect x="100" y="122" width="60" height="6" rx="3" fill="#F26A4B" opacity="0.75" />
        <rect x="112" y="133" width="36" height="4" rx="2" fill="#D4D4DC" />

        {/* Event Guest arriving at registration holding badge */}
        <motion.g
          animate={{ x: [0, 2.5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="52" cy="84" r="7.5" fill="url(#br-skin)" />
          <path d="M45 83 C45 76 52 73 58 76 C60 77 58 81 54 81 C50 81 48 84 46 86 Z" fill={ink} />
          <path d="M42 97 C42 92 47 90 53 90 C59 90 64 94 65 102 L62 126 H43 Z" fill="url(#br-coral)" />
          {/* Reaching hand with guest pass */}
          <path d="M62 103 L76 105" stroke="url(#br-skin)" strokeWidth="4.5" strokeLinecap="round" />
          <rect x="74" y="99" width="8" height="10" rx="1.5" fill="#6CE5E8" />
          {/* Trousers */}
          <path d="M44 126 H61 L64 156 H54 L52 138 L49 156 H41 Z" fill="#2A2B38" />
        </motion.g>

        {/* Subtle floor ink line */}
        <line x1="20" y1="156" x2="200" y2="156" stroke={ink} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      </svg>
    );
  }

  // 2. Custom Exhibition Booth: 3D wood & HPL custom booth + craftsman with paint roller & glowing spotlights
  if (kind === "booth") {
    return (
      <svg viewBox="0 0 220 170" fill="none" className="w-full h-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="bt-wood" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5B87A" />
            <stop offset="100%" stopColor="#D98A4E" />
          </linearGradient>
          <linearGradient id="bt-mag" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DE4B84" />
            <stop offset="100%" stopColor="#BE3168" />
          </linearGradient>
          <linearGradient id="bt-skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE2D4" />
            <stop offset="100%" stopColor="#F5C3AF" />
          </linearGradient>
        </defs>

        {/* Editorial floating accents */}
        <motion.g
          animate={{ y: [0, -3.5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="186" cy="26" r="8" fill="url(#bt-mag)" />
          <path d="M26 30 L34 38 M34 30 L26 38" stroke={ink} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </motion.g>

        {/* Custom 3D Open-Corner Exhibition Booth (Lineless Wood + White HPL) */}
        <polygon points="44,44 152,44 152,146 44,146" fill="#FFFFFF" />
        <polygon points="152,44 186,58 186,154 152,146" fill="url(#bt-wood)" />
        {/* Warm wooden slat panel accent inside booth */}
        <rect x="56" y="64" width="34" height="72" rx="3" fill="url(#bt-wood)" opacity="0.9" />
        <line x1="65" y1="64" x2="65" y2="136" stroke="#B86B34" strokeWidth="1" opacity="0.5" />
        <line x1="74" y1="64" x2="74" y2="136" stroke="#B86B34" strokeWidth="1" opacity="0.5" />
        <line x1="83" y1="64" x2="83" y2="136" stroke="#B86B34" strokeWidth="1" opacity="0.5" />

        {/* Overhead Fascia Beam */}
        <rect x="38" y="32" width="122" height="18" rx="4" fill="url(#bt-mag)" />
        <rect x="68" y="39" width="60" height="4.5" rx="2.2" fill="#FFFDF8" />

        {/* Soft Glowing Booth Spotlights */}
        <motion.g
          animate={{ opacity: [0.3, 0.85, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <polygon points="74,50 54,104 94,104" fill="#FFE866" opacity="0.35" />
          <polygon points="124,50 104,104 144,104" fill="#FFE866" opacity="0.35" />
        </motion.g>

        {/* Display Pedestal & Floating Showcase Object */}
        <rect x="104" y="106" width="34" height="40" rx="3" fill="#F2EFE9" />
        <motion.rect
          x="113"
          y="88"
          width="16"
          height="16"
          rx="3"
          fill="#6152D6"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Stylized Craftsman finishing the booth with a roller */}
        <g>
          <circle cx="44" cy="96" r="7" fill="url(#bt-skin)" />
          <path d="M38 94 C39 87 48 87 51 92 C48 92 43 93 38 94 Z" fill={ink} />
          <path d="M35 108 C35 103 40 101 45 101 C51 101 55 105 55 112 L54 134 H36 Z" fill="#3B82F6" />
          <path d="M37 134 H53 L55 156 H47 L45 142 L43 156 H35 Z" fill="#27272A" />
          {/* Animated Paint Roller Arm */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M52 110 L68 96" stroke="url(#bt-skin)" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="68" y1="96" x2="72" y2="84" stroke={ink} strokeWidth="1.4" />
            <rect x="66" y="79" width="14" height="6" rx="2" fill="url(#bt-mag)" />
          </motion.g>
        </g>

        <line x1="20" y1="156" x2="200" y2="156" stroke={ink} strokeWidth="1" opacity="0.35" strokeLinecap="round" />
      </svg>
    );
  }

  // 3. Custom Stage: Corporate stage platform + glowing presentation screen + stylized speaker at podium
  if (kind === "stage") {
    return (
      <svg viewBox="0 0 220 170" fill="none" className="w-full h-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="st-screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#BE3168" />
            <stop offset="100%" stopColor="#7C153D" />
          </linearGradient>
          <linearGradient id="st-deck" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3F3F46" />
            <stop offset="100%" stopColor="#18181B" />
          </linearGradient>
          <linearGradient id="st-skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE2D4" />
            <stop offset="100%" stopColor="#F5C3AF" />
          </linearGradient>
        </defs>

        {/* Overhead stage spotlight beams */}
        <motion.g
          animate={{ opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <polygon points="56,16 20,122 80,122" fill="#FFD400" opacity="0.32" />
          <polygon points="164,16 140,122 200,122" fill="#FFD400" opacity="0.32" />
        </motion.g>

        {/* Wide Corporate Stage Screen & Curved Side Wings */}
        <rect x="26" y="42" width="24" height="68" rx="4" fill="#FFD400" opacity="0.85" />
        <rect x="170" y="42" width="24" height="68" rx="4" fill="#FFD400" opacity="0.85" />
        <rect x="44" y="34" width="132" height="78" rx="6" fill="url(#st-screen)" />
        {/* Abstract glowing presentation graphic inside screen */}
        <motion.circle
          cx="110"
          cy="68"
          r="18"
          fill="#FFD400"
          opacity="0.9"
          animate={{ scale: [0.92, 1.08, 0.92] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        <rect x="62" y="54" width="26" height="4" rx="2" fill="#FFFDF8" opacity="0.8" />
        <rect x="62" y="62" width="18" height="4" rx="2" fill="#FFFDF8" opacity="0.5" />

        {/* Stylized Keynote Speaker gesturing at Podium */}
        <g>
          <circle cx="110" cy="82" r="6.5" fill="url(#st-skin)" />
          <path d="M104 80 C104 74 115 73 116 80 C113 79 107 79 104 80 Z" fill={ink} />
          <path d="M101 94 C101 89 105 88 110 88 C115 88 119 90 119 95 L120 110 H100 Z" fill="#6152D6" />
          <motion.path
            d="M118 95 L130 86"
            stroke="url(#st-skin)"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{ rotate: [-6, 6, -6] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformBox: "fill-box", transformOrigin: "bottom left" }}
          />
          {/* Sleek Podium */}
          <polygon points="100,100 120,100 117,124 103,124" fill="#FFFFFF" />
          <rect x="97" y="97" width="26" height="4.5" rx="2" fill="#FFD400" />
        </g>

        {/* Wide Stage Platform & Illuminated Center Steps */}
        <rect x="20" y="124" width="180" height="26" rx="4" fill="url(#st-deck)" />
        <rect x="86" y="130" width="48" height="20" rx="2" fill="#52525B" />
        <line x1="88" y1="136" x2="132" y2="136" stroke="#FFD400" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="88" y1="143" x2="132" y2="143" stroke="#FFD400" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  // 4. Decorative Installation: Hanging 3D geometric atrium ornaments & sculptural arch with admiring visitor
  if (kind === "decor") {
    return (
      <svg viewBox="0 0 220 170" fill="none" className="w-full h-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="dc-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF08A" />
            <stop offset="100%" stopColor="#FFB82E" />
          </linearGradient>
          <linearGradient id="dc-mint" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9DF0E4" />
            <stop offset="100%" stopColor="#46C9A7" />
          </linearGradient>
          <linearGradient id="dc-skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE2D4" />
            <stop offset="100%" stopColor="#F5C3AF" />
          </linearGradient>
        </defs>

        {/* Soft Sculptural 3D Arch House in Background */}
        <path d="M56 156 V88 C56 58 80 38 110 38 C140 38 164 58 164 88 V156 Z" fill="#FFF7F2" opacity="0.22" />

        {/* Hanging 3D Geometric Ornaments gently bobbing */}
        <motion.g
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <line x1="56" y1="10" x2="56" y2="48" stroke="#FFFDF8" strokeWidth="1.1" opacity="0.7" />
          <polygon points="56,46 74,66 56,88 38,66" fill="url(#dc-mint)" />
          <polygon points="56,46 74,66 56,88" fill="#FFFFFF" opacity="0.25" />
        </motion.g>

        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <line x1="112" y1="10" x2="112" y2="32" stroke="#FFFDF8" strokeWidth="1.1" opacity="0.7" />
          <polygon points="112,32 138,46 138,76 112,90 86,76 86,46" fill="url(#dc-gold)" />
          <polygon points="112,32 138,46 112,60 86,46" fill="#FFFDF8" opacity="0.45" />
          <polygon points="112,60 138,46 138,76 112,90" fill="#D98A1A" opacity="0.22" />
        </motion.g>

        <motion.g
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <line x1="166" y1="10" x2="166" y2="54" stroke="#FFFDF8" strokeWidth="1.1" opacity="0.7" />
          <circle cx="166" cy="72" r="18" fill="#FFFDF8" />
          <circle cx="160" cy="66" r="5" fill="#FFE45E" />
        </motion.g>

        {/* Admiring Event Visitor looking up at the 3D installation */}
        <g>
          <circle cx="110" cy="110" r="7" fill="url(#dc-skin)" />
          <path d="M103 108 C103 101 114 100 117 107 C115 113 111 117 106 117 C104 114 103 111 103 108 Z" fill={ink} />
          <path d="M101 122 C101 118 106 116 111 116 C116 116 121 119 122 126 L124 144 H99 Z" fill="#FFE45E" />
          {/* Raised arm pointing up at the 3D centerpiece */}
          <path d="M120 124 L132 106" stroke="url(#dc-skin)" strokeWidth="4.2" strokeLinecap="round" />
          <path d="M101 144 H122 L125 158 H115 L112 149 L109 158 H99 Z" fill="#2A2B38" />
        </g>

        {/* Playful editorial cross & sparkles */}
        <path d="M32 118 L40 126 M40 118 L32 126" stroke="#FFE45E" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="182" cy="126" r="5.5" fill="#9DF0E4" />
      </svg>
    );
  }

  // 5. Entrance Gate: Sculpted monumental welcome portal arch + glowing inner trim + guests walking through
  if (kind === "gate") {
    return (
      <svg viewBox="0 0 220 170" fill="none" className="w-full h-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="gt-arch" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F4ECE8" />
          </linearGradient>
          <linearGradient id="gt-skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE2D4" />
            <stop offset="100%" stopColor="#F5C3AF" />
          </linearGradient>
        </defs>

        {/* Floating editorial accents */}
        <motion.circle
          cx="34"
          cy="28"
          r="8.5"
          fill="#FFE45E"
          animate={{ y: [0, -3.5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <path d="M180 24 L189 33 M189 24 L180 33" stroke="#FFFDF8" strokeWidth="2.2" strokeLinecap="round" />

        {/* Perspective Welcome Carpet */}
        <polygon points="82,116 138,116 168,158 52,158" fill="#FFE45E" opacity="0.9" />

        {/* Monumental Sculpted Entrance Gate Arch */}
        <path
          d="M38 150 L50 34 L170 34 L182 150 H148 L142 66 H78 L72 150 Z"
          fill="url(#gt-arch)"
        />
        {/* Illuminated Inner Portal Trim */}
        <motion.path
          d="M72 148 L78 66 H142 L148 148"
          stroke="#FFE45E"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Gate Header Signage Strip */}
        <rect x="74" y="42" width="72" height="13" rx="3" fill="#2A2B38" />
        <rect x="90" y="46.5" width="40" height="4" rx="2" fill="#FFE45E" />

        {/* Two Stylized Guests Walking Happily Through the Gate */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Guest 1 */}
          <circle cx="98" cy="96" r="6" fill="url(#gt-skin)" />
          <path d="M92 95 C92 90 102 89 104 95 Z" fill={ink} />
          <path d="M90 107 C90 103 94 102 98 102 C102 102 106 104 106 109 L105 126 H91 Z" fill="#6152D6" />
          <path d="M92 126 H104 L106 146 H100 L98 134 L96 146 H90 Z" fill="#2A2B38" />
          {/* Guest 2 */}
          <circle cx="122" cy="100" r="5.5" fill="url(#gt-skin)" />
          <path d="M117 98 C117 93 127 93 128 100 C127 104 125 106 122 106 Z" fill={ink} />
          <path d="M115 110 C115 107 118 105 122 105 C126 105 129 107 129 112 L131 128 H113 Z" fill="#BE3168" />
          <path d="M116 128 H128 L129 146 H123 L122 135 L120 146 H115 Z" fill="#FFFDF8" />
        </motion.g>
      </svg>
    );
  }

  // 6. Event Backdrop / Photowall: Seamless media wall + uplights + posing guest + pulsing camera flash
  if (kind === "backdrop") {
    return (
      <svg viewBox="0 0 220 170" fill="none" className="w-full h-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="bd-skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE2D4" />
            <stop offset="100%" stopColor="#F5C3AF" />
          </linearGradient>
        </defs>

        {/* Wide Seamless Photowall Panel */}
        <rect x="26" y="34" width="168" height="102" rx="6" fill="#FFFDF8" />
        {/* Clean Step-and-Repeat Pattern */}
        <rect x="42" y="48" width="30" height="8" rx="4" fill={soft} />
        <rect x="94" y="48" width="32" height="8" rx="4" fill={accent} opacity="0.7" />
        <rect x="148" y="48" width="30" height="8" rx="4" fill={soft} />
        <rect x="64" y="70" width="36" height="8" rx="4" fill={accent} opacity="0.45" />
        <rect x="122" y="70" width="36" height="8" rx="4" fill={soft} />

        {/* Floor Uplights */}
        <rect x="38" y="132" width="18" height="7" rx="2" fill={ink} />
        <rect x="164" y="132" width="18" height="7" rx="2" fill={ink} />

        {/* Stylized VIP Guest Posing at Photowall */}
        <g>
          <circle cx="106" cy="84" r="7.5" fill="url(#bd-skin)" />
          <path d="M99 83 C99 75 110 74 114 81 C114 88 111 93 106 94 C101 92 99 88 99 83 Z" fill={ink} />
          <path d="M96 97 C96 92 101 90 107 90 C113 90 117 94 118 101 L120 124 H94 Z" fill="#F26A4B" />
          <path d="M96 124 H118 L122 156 H112 L107 136 L102 156 H92 Z" fill="#FFE45E" />
        </g>

        {/* Animated Camera Flash Starburst */}
        <motion.path
          d="M174 18 L178 30 L190 34 L178 38 L174 50 L170 38 L158 34 L170 30 Z"
          fill="#FFE45E"
          animate={{ scale: [0.82, 1.18, 0.82], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      </svg>
    );
  }

  // 7. Festival Decoration: Open-air concert stage arch + swaying bunting + cheering crowd silhouettes
  if (kind === "festival") {
    return (
      <svg viewBox="0 0 220 170" fill="none" className="w-full h-full overflow-visible" aria-hidden="true">
        {/* Rising Festival Concert Beams */}
        <motion.g
          animate={{ opacity: [0.25, 0.75, 0.25] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <polygon points="74,116 36,16 66,16" fill="#FFFDF8" opacity="0.38" />
          <polygon points="146,116 154,16 184,16" fill="#FFFDF8" opacity="0.38" />
        </motion.g>

        {/* Swaying Festival Bunting Flags */}
        <motion.g
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M18 28 Q110 52 202 28" stroke={ink} strokeWidth="1.2" opacity="0.6" />
          <polygon points="46,35 58,38 51,50" fill="#BE3168" />
          <polygon points="82,42 94,43 87,56" fill="#FFFFFF" />
          <polygon points="126,43 138,42 133,56" fill="#6CE5E8" />
          <polygon points="162,38 174,35 169,50" fill="#BE3168" />
        </motion.g>

        {/* Grand Concert Stage Arch & Twin Speakers */}
        <path d="M40 72 L110 48 L180 72 Z" fill="#BE3168" />
        <rect x="46" y="72" width="18" height="52" rx="3" fill="#2A2B38" />
        <rect x="156" y="72" width="18" height="52" rx="3" fill="#2A2B38" />
        <circle cx="55" cy="88" r="5" fill="#FFE45E" />
        <circle cx="55" cy="105" r="5" fill="#FFE45E" />
        <circle cx="165" cy="88" r="5" fill="#FFE45E" />
        <circle cx="165" cy="105" r="5" fill="#FFE45E" />
        <rect x="64" y="72" width="92" height="52" fill="#FFFDF8" opacity="0.9" />
        <rect x="30" y="122" width="160" height="14" rx="3" fill="#2A2B38" />

        {/* Stylized Cheering Crowd in Foreground */}
        <motion.g
          animate={{ y: [0, -2.5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="58" cy="146" r="7" fill={ink} />
          <circle cx="92" cy="144" r="8" fill="#6152D6" />
          <circle cx="128" cy="144" r="8" fill="#F26A4B" />
          <circle cx="162" cy="146" r="7" fill={ink} />
          <path d="M46 158 C48 150 68 150 70 158 Z" fill={ink} />
          <path d="M78 158 C80 148 104 148 106 158 Z" fill="#6152D6" />
          <path d="M114 158 C116 148 140 148 142 158 Z" fill="#F26A4B" />
          <path d="M150 158 C152 150 172 150 174 158 Z" fill={ink} />
        </motion.g>
      </svg>
    );
  }

  // 8. Totem & Signage: Freestanding directional wayfinding totem + 3D signage + visitor checking directions
  return (
    <svg viewBox="0 0 220 170" fill="none" className="w-full h-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="tt-skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE2D4" />
          <stop offset="100%" stopColor="#F5C3AF" />
        </linearGradient>
      </defs>

      {/* Floating editorial circle & cross */}
      <motion.circle
        cx="46"
        cy="34"
        r="9"
        fill="#FFE45E"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <path d="M174 30 L182 38 M182 30 L174 38" stroke={ink} strokeWidth="2" strokeLinecap="round" opacity="0.65" />

      {/* Tall Wayfinding Totem Monolith */}
      <rect x="86" y="144" width="66" height="10" rx="3" fill="#2A2B38" />
      <rect x="102" y="34" width="34" height="110" rx="5" fill="#FFFFFF" />
      <rect x="108" y="42" width="22" height="16" rx="3" fill={accent} />

      {/* Animated Directional Arrow Blades */}
      <motion.polygon
        points="136,60 184,60 194,70 184,80 136,80"
        fill="#FFE45E"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.polygon
        points="102,84 54,84 44,94 54,104 102,104"
        fill="#6CE5E8"
        animate={{ x: [0, -4, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <rect x="144" y="68" width="30" height="3.5" rx="1.7" fill={ink} opacity="0.7" />
      <rect x="64" y="92" width="28" height="3.5" rx="1.7" fill={ink} opacity="0.7" />

      {/* Stylized Visitor Checking Wayfinding Directions */}
      <g>
        <circle cx="62" cy="112" r="6.5" fill="url(#tt-skin)" />
        <path d="M56 110 C56 105 66 104 68 110 Z" fill={ink} />
        <path d="M53 122 C53 118 57 117 62 117 C67 117 71 119 71 124 L70 140 H54 Z" fill="#6152D6" />
        <path d="M70 124 L82 118" stroke="url(#tt-skin)" strokeWidth="4" strokeLinecap="round" />
        <path d="M55 140 H69 L71 156 H64 L62 146 L60 156 H53 Z" fill="#2A2B38" />
      </g>

      <line x1="24" y1="156" x2="196" y2="156" stroke={ink} strokeWidth="1" opacity="0.35" strokeLinecap="round" />
    </svg>
  );
}

const CUSTOM_SERVICE_ART: Partial<Record<CuratedServiceMeta["artKind"], string>> = {
  branding: "/images/service-branding-area-v3.jpg",
  booth: "/images/service-exhibition-booth-v2.jpg",
  stage: "/images/service-custom-stage-v2.jpg",
  decor: "/images/service-decorative-installation-v2.jpg",
  gate: "/images/service-entrance-gate.jpg",
  backdrop: "/images/service-event-backdrop.jpg",
  festival: "/images/service-festival-decoration-v2.jpg",
  totem: "/images/service-totem-signage.jpg",
};

export default function Services({ categories = [] }: ServicesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const isEn = lang === "en";

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        el.scrollLeft += e.deltaX;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = el.clientWidth * 0.72;
    el.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="services"
        className="py-20 md:py-28 bg-[#FFFBF4] border-t border-zinc-200/80 relative overflow-hidden"
        suppressHydrationWarning
      >
        {/* Colorful Flat-Editorial Background Layer (Matching the 5-Color Maganta Card Palette) */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 overflow-hidden"
        >
          {/* Full-width colorful layered Storyset editorial waves & geometric backdrop */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1440 760"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Soft warm yellow sweep top-left to center */}
            <path
              d="M0 0 H620 C520 140 360 220 180 260 C90 280 30 310 0 340 Z"
              fill="#FFD400"
              fillOpacity="0.16"
            />
            {/* Soft rose/magenta arch sweep top-right */}
            <path
              d="M840 0 H1440 V310 C1310 270 1160 245 1030 185 C930 140 875 75 840 0 Z"
              fill="#E04F82"
              fillOpacity="0.13"
            />
            {/* Playful flowing coral/cream ribbon running behind the staggered cards */}
            <path
              d="M-40 430 C240 330 480 510 760 410 C1040 310 1240 460 1480 370 V760 H-40 Z"
              fill="#F6F1E7"
              fillOpacity="0.92"
            />
            {/* Bold subtle coral-orange wave peeking along the lower edge */}
            <path
              d="M-40 590 C260 510 540 650 860 560 C1120 485 1300 570 1480 520 V760 H-40 Z"
              fill="#F06449"
              fillOpacity="0.10"
            />
            {/* Magenta corner arc bottom-left */}
            <circle cx="90" cy="690" r="170" fill="#BE3168" fillOpacity="0.08" />
            {/* Brand yellow corner arc bottom-right */}
            <circle cx="1360" cy="680" r="190" fill="#FFD400" fillOpacity="0.16" />
          </svg>

          {/* Subtle magenta architectural dot pattern across top canvas */}
          <div
            className="absolute inset-x-0 top-0 h-80 opacity-[0.26]"
            style={{
              backgroundImage: "radial-gradient(#be3168 1.1px, transparent 1.1px)",
              backgroundSize: "24px 24px",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)",
            }}
          />
        </div>

        {/* Centered Editorial Header Flanked Tightly by Storyset Workshop & 3D Decor Vignettes */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 mb-14 md:mb-16 relative z-10">
          <div className="flex items-center justify-center gap-4 lg:gap-10">
            {/* Left Vignette: Hugs right next to CAKUPAN PRODUKSI */}
            <motion.svg
              aria-hidden="true"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:block shrink-0 w-44 lg:w-64 h-36 lg:h-48 pointer-events-none select-none"
              viewBox="0 0 300 220"
              fill="none"
            >
              {/* Soft Cream Arch & Yellow Sun */}
              <path d="M24 188 V86 C24 44 58 18 100 18 C142 18 176 44 176 86 V188 Z" fill="#F6F1E7" />
              <circle cx="192" cy="70" r="34" fill="#FFD400" fillOpacity="0.35" />
              <rect x="26" y="186" width="236" height="3" rx="1.5" fill="#18181B" fillOpacity="0.16" />

              {/* Stage Truss Bar */}
              <g stroke="#18181B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                <line x1="26" y1="34" x2="212" y2="34" />
                <line x1="26" y1="49" x2="212" y2="49" />
                <path d="M34 34 L49 49 L64 34 L79 49 L94 34 L109 49 L124 34 L139 49 L154 34 L169 49 L184 34 L199 49" />
              </g>

              {/* Hanging Spotlights + Soft Color Cones */}
              <polygon points="74,55 46,154 102,154" fill="#FFD400" fillOpacity="0.24" />
              <polygon points="150,55 124,154 178,154" fill="#E04F82" fillOpacity="0.18" />
              <rect x="66" y="47" width="16" height="12" rx="3" fill="#BE3168" />
              <rect x="142" y="47" width="16" height="12" rx="3" fill="#F06449" />

              {/* Color Swatch Fan */}
              <g transform="translate(96, 102)">
                <rect x="0" y="18" width="25" height="66" rx="4" fill="#F06449" transform="rotate(-18 12 84)" />
                <rect x="8" y="12" width="25" height="72" rx="4" fill="#FFD400" transform="rotate(-4 20 84)" />
                <rect x="16" y="16" width="25" height="68" rx="4" fill="#BE3168" transform="rotate(12 28 84)" />
                <circle cx="24" cy="74" r="3.5" fill="#FFFDF9" />
              </g>

              {/* Potted Botanical Plant */}
              <g transform="translate(36, 120)">
                <path d="M22 44 C12 28 8 14 14 4 C22 10 26 24 26 44 Z" fill="#E04F82" fillOpacity="0.82" />
                <path d="M26 44 C34 24 44 14 52 14 C48 26 38 36 30 44 Z" fill="#BE3168" fillOpacity="0.88" />
                <path d="M24 44 C20 26 26 10 34 2 C36 16 32 30 28 44 Z" fill="#F06449" fillOpacity="0.85" />
                <path d="M12 44 H42 L38 66 H16 Z" fill="#18181B" fillOpacity="0.82" />
                <rect x="10" y="40" width="34" height="6" rx="2" fill="#FFD400" />
              </g>

              {/* Sparkles & Dots */}
              <path d="M242 40 L246 50 L256 54 L246 58 L242 68 L238 58 L228 54 L238 50 Z" fill="#FFD400" />
              <circle cx="264" cy="96" r="6" fill="#E04F82" fillOpacity="0.7" />
              <circle cx="224" cy="118" r="3.5" fill="#18181B" fillOpacity="0.4" />
            </motion.svg>

            {/* Center Two-Line Stacked Title with Soft Floating Motion */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex flex-col items-start shrink-0"
            >
              <motion.h2
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
                className="font-sans text-4xl sm:text-5xl lg:text-[4.25rem] font-extrabold tracking-tight leading-[0.94] uppercase"
              >
                <span className="block bg-gradient-to-r from-[#be3168] via-[#E04F82] to-[#be3168] bg-clip-text text-transparent">
                  {isEn ? "Production" : "Cakupan"}
                </span>
                <span className="flex flex-wrap items-end gap-x-4 sm:gap-x-5 mt-1">
                  <span className="bg-gradient-to-r from-[#F06449] via-[#E04F82] to-[#be3168] bg-clip-text text-transparent">
                    {isEn ? "Scope" : "Produksi"}
                  </span>
                  <span className="font-sans text-xs sm:text-[13px] font-semibold normal-case tracking-normal text-brand-magenta/90 leading-tight pb-1.5 sm:pb-2 max-w-[165px]">
                    {isEn ? (
                      <>
                        What we build
                        <br />
                        in-house.
                      </>
                    ) : (
                      <>
                        Apa saja yang
                        <br />
                        kami kerjakan.
                      </>
                    )}
                  </span>
                </span>
              </motion.h2>
            </motion.div>

            {/* Right Vignette: Hugs right next to CAKUPAN PRODUKSI */}
            <motion.svg
              aria-hidden="true"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:block shrink-0 w-44 lg:w-64 h-36 lg:h-48 pointer-events-none select-none"
              viewBox="0 0 300 220"
              fill="none"
            >
              {/* Soft Cream & Rose Backdrop Shapes */}
              <circle cx="212" cy="92" r="74" fill="#F6F1E7" />
              <path d="M142 188 V104 C142 74 166 50 196 50 C226 50 250 74 250 104 V188 Z" fill="#E04F82" fillOpacity="0.24" />
              <rect x="34" y="186" width="236" height="3" rx="1.5" fill="#18181B" fillOpacity="0.16" />

              {/* Layered 3D Decorative Arch */}
              <path d="M164 186 V114 C164 90 182 72 206 72 C230 72 248 90 248 114 V186 Z" fill="#F06449" fillOpacity="0.9" />
              <path d="M180 186 V120 C180 105 192 94 206 94 C220 94 232 105 232 120 V186 Z" fill="#FFFBF4" />
              <path d="M192 186 V128 C192 119 198 112 206 112 C214 112 220 119 220 128 V186 Z" fill="#FFD400" />

              {/* Exhibition Easel / Blueprint Board */}
              <g transform="translate(70, 70)">
                <line x1="14" y1="68" x2="6" y2="116" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
                <line x1="66" y1="68" x2="74" y2="116" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
                <rect x="4" y="8" width="72" height="62" rx="6" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.6" strokeOpacity="0.65" />
                <rect x="12" y="18" width="32" height="20" rx="3" fill="#BE3168" fillOpacity="0.9" />
                <circle cx="58" cy="28" r="9" fill="#FFD400" />
                <line x1="12" y1="48" x2="66" y2="48" stroke="#18181B" strokeWidth="1.6" strokeOpacity="0.38" strokeLinecap="round" />
                <line x1="12" y1="57" x2="48" y2="57" stroke="#18181B" strokeWidth="1.6" strokeOpacity="0.28" strokeLinecap="round" />
              </g>

              {/* 3D Star & Floating Accent Shapes */}
              <path d="M150 54 L155 66 L168 67 L158 75 L161 88 L150 81 L139 88 L142 75 L132 67 L145 66 Z" fill="#FFD400" stroke="#18181B" strokeWidth="1.3" strokeLinejoin="round" strokeOpacity="0.6" />
              <path d="M44 44 L47 52 L55 55 L47 58 L44 66 L41 58 L33 55 L41 52 Z" fill="#BE3168" fillOpacity="0.8" />
              <circle cx="266" cy="52" r="7" fill="#F06449" fillOpacity="0.65" />
              <rect x="254" y="148" width="18" height="38" rx="3" fill="#BE3168" fillOpacity="0.85" />
            </motion.svg>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="py-12 text-center text-zinc-500 border border-dashed border-zinc-300 rounded-2xl">
              {isEn ? "No service categories available yet." : "Belum ada kategori layanan."}
            </div>
          </div>
        ) : (
          <div className="relative max-w-[1440px] mx-auto">
            {/* Desktop Left Arrow */}
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Geser cakupan produksi ke kiri"
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/95 border border-zinc-200 text-zinc-800 hover:border-brand-magenta hover:text-brand-magenta shadow-sm absolute left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 active:scale-95"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>

            {/* Horizontally Scrollable Staggered Vertical Poster Strip */}
            <div
              ref={scrollRef}
              style={{ touchAction: "pan-x pan-y" }}
              className="flex items-start gap-5 sm:gap-6 overflow-x-auto overscroll-x-none scrollbar-none px-6 md:px-14 pb-6 pt-2"
            >
              {categories.map((category, idx) => {
                const theme = POSTER_THEMES[idx % POSTER_THEMES.length];
                const meta = getCuratedServiceMeta(category.slug, category.description);
                const isLower = idx % 2 === 0;
                const indexLabel = String(idx + 1).padStart(2, "0");

                return (
                  <Link
                    key={category.id}
                    href={`/portfolio?category=${category.slug}`}
                    aria-label={`Lihat portofolio ${category.name}`}
                    className={`group relative overflow-hidden shrink-0 w-[230px] sm:w-[260px] aspect-[3/4] ${theme.bg} p-5 flex flex-col motion-safe:transition-[translate] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-4 active:opacity-95 ${
                      isLower ? "mt-7 sm:mt-10" : "mt-0"
                    }`}
                  >
                    {/* Top Editorial Poster Header */}
                    <div className="flex items-center justify-between gap-2 shrink-0">
                      <span className={`font-mono text-[11px] font-semibold tracking-wide ${theme.muted}`}>
                        {indexLabel} / {meta.shortTag}
                      </span>
                      <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                        className={`${theme.text} shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5`}
                      />
                    </div>

                    {/* Center Visual: Custom Editorial Illustration */}
                    <div className="relative w-full aspect-[4/3] mt-3.5 shrink-0 flex items-center justify-center overflow-hidden">
                      {CUSTOM_SERVICE_ART[meta.artKind] ? (
                        <Image
                          src={CUSTOM_SERVICE_ART[meta.artKind]!}
                          alt={category.name}
                          fill
                          sizes="(max-width: 640px) 230px, 260px"
                          className="object-cover"
                        />
                      ) : (
                        <ServicePosterArt
                          kind={meta.artKind}
                          palette={{
                            ink: theme.ink,
                            paper: theme.paper,
                            accent: theme.accent,
                            soft: theme.soft,
                          }}
                        />
                      )}
                    </div>

                    {/* Single Bottom Panel: glides smoothly upward & back down via GPU translate on hover/focus */}
                    <div
                      className={`absolute inset-x-0 bottom-0 z-10 px-5 pt-3 pb-7 ${theme.bg} will-change-transform translate-y-[calc(100%-6.625rem)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-safe:transition-[translate] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]`}
                    >
                      <div className={`pt-2.5 border-t ${theme.divider}`}>
                        <h3 className={`font-sans text-base font-bold leading-[22px] tracking-tight truncate ${theme.text}`}>
                          {category.name}
                        </h3>
                        <p className={`mt-1.5 text-xs leading-[18px] ${theme.muted}`}>
                          {isEn ? meta.descriptionEn : meta.description}
                        </p>
                        <span className={`mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold ${theme.text}`}>
                          {isEn ? "View portfolio" : "Lihat portofolio"}
                          <ArrowUpRight size={13} aria-hidden="true" />
                        </span>
                      </div>
                    </div>

                    {/* Clean 20px bottom frame bar matching card padding so resting preview never clips mid-line */}
                    <div
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0 h-5 z-20 pointer-events-none ${theme.bg}`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Desktop Right Arrow */}
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Geser cakupan produksi ke kanan"
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/95 border border-zinc-200 text-zinc-800 hover:border-brand-magenta hover:text-brand-magenta shadow-sm absolute right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 active:scale-95"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </section>
    </MotionConfig>
  );
}
