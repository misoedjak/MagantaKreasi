"use client";

import { motion, MotionConfig } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PipelineStepItem {
  id: string;
  title: string;
  description: string;
  bgImageUrl?: string | null;
  order: number;
}

interface ProcessProps {
  steps?: PipelineStepItem[];
}

const INK = "#111111";

/**
 * Hand-drawn expressive black-ink & crisp white-fill animated illustrations
 * tailored directly to each Maganta Kreasi workflow step.
 * All rotations use <g transform="translate(cx,cy)"> around (0,0) so coordinates never drift.
 */
function ProcessIllustration({ index, title }: { index: number; title: string }) {
  const lower = title.toLowerCase();

  // Match by title keywords first (in case DB order changes), fallback to index
  let kind = index % 7;
  if (lower.includes("konsultasi") || lower.includes("brief")) kind = 0;
  else if (lower.includes("3d") || lower.includes("desain") || lower.includes("render")) kind = 1;
  else if (lower.includes("material") || lower.includes("bahan")) kind = 2;
  else if (lower.includes("production") || lower.includes("produksi") || lower.includes("fabrikasi")) kind = 3;
  else if (lower.includes("quality") || lower.includes("qc") || lower.includes("kontrol")) kind = 4;
  else if (lower.includes("instalasi") || lower.includes("install") || lower.includes("loading") || lower.includes("pasang")) kind = 5;
  else if (lower.includes("bongkar") || lower.includes("pembongkaran") || lower.includes("dismantl") || lower.includes("strike")) kind = 6;

  // 01 — Konsultasi & Briefing: Overlapping speech bubbles + glowing idea bulb
  if (kind === 0) {
    return (
      <svg viewBox="0 0 120 76" fill="none" className="w-[116px] h-[72px]" aria-hidden="true">
        {/* Back speech bubble (client brief) */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M14 26 C14 19 20 15 28 15 H56 C64 15 68 20 68 27 V40 C68 46 63 50 56 50 H32 L20 58 L22 49 C17 47 14 43 14 38 Z"
            fill="#ffffff"
            stroke={INK}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Animated typing / discussion dots */}
          <motion.circle
            cx="30"
            cy="32"
            r="2.2"
            fill={INK}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 0 }}
          />
          <motion.circle
            cx="41"
            cy="32"
            r="2.2"
            fill={INK}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 0.25 }}
          />
          <motion.circle
            cx="52"
            cy="32"
            r="2.2"
            fill={INK}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 0.5 }}
          />
        </motion.g>

        {/* Front overlapping idea bubble with lightbulb */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <path
            d="M54 34 C54 27 60 23 68 23 H96 C103 23 108 28 108 35 V47 C108 53 103 57 96 57 H90 L94 65 L81 57 H68 C60 57 54 52 54 46 Z"
            fill="#FFD400"
            stroke={INK}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Lightbulb inside */}
          <path
            d="M81 30 C76.5 30 73.5 33 73.5 37 C73.5 39.8 75 41.8 77 43.2 V46 H85 V43.2 C87 41.8 88.5 39.8 88.5 37 C88.5 33 85.5 30 81 30 Z"
            fill="#ffffff"
            stroke={INK}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <line x1="78" y1="49" x2="84" y2="49" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
          {/* Pulsing idea rays */}
          <motion.g
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1="81" y1="25.5" x2="81" y2="27.5" stroke={INK} strokeWidth="1.3" strokeLinecap="round" />
            <line x1="71" y1="29.5" x2="73" y2="31" stroke={INK} strokeWidth="1.3" strokeLinecap="round" />
            <line x1="91" y1="29.5" x2="89" y2="31" stroke={INK} strokeWidth="1.3" strokeLinecap="round" />
          </motion.g>
        </motion.g>
      </svg>
    );
  }

  // 02 — Desain 3D & Rendering: Drafting screen with 3D isometric booth cube & animated pencil
  if (kind === 1) {
    return (
      <svg viewBox="0 0 120 76" fill="none" className="w-[116px] h-[72px]" aria-hidden="true">
        {/* Blueprint / Monitor frame */}
        <rect x="14" y="12" width="78" height="50" rx="3" fill="#ffffff" stroke={INK} strokeWidth="1.5" />
        {/* Stand */}
        <line x1="44" y1="62" x2="40" y2="69" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="62" y1="62" x2="66" y2="69" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="34" y1="69" x2="72" y2="69" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />

        {/* Subtle floorplan dashed lines */}
        <line x1="22" y1="22" x2="36" y2="22" stroke={INK} strokeWidth="1.15" strokeLinecap="round" />
        <line x1="22" y1="27" x2="32" y2="27" stroke={INK} strokeWidth="1.15" strokeLinecap="round" />
        <rect x="22" y="34" width="14" height="18" stroke={INK} strokeWidth="1.15" strokeDasharray="2.5 2" />

        {/* Floating 3D isometric booth / cube inside screen */}
        <motion.g
          animate={{ y: [0, -2.5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <polygon
            points="64,20 82,28 64,36 46,28"
            fill="#FFD400"
            stroke={INK}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <polygon
            points="46,28 64,36 64,53 46,45"
            fill="#ffffff"
            stroke={INK}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <polygon
            points="82,28 64,36 64,53 82,45"
            fill="#FFD400"
            stroke={INK}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Corner vector handle */}
          <rect x="62" y="18" width="4" height="4" fill="#ffffff" stroke={INK} strokeWidth="1.1" />
        </motion.g>

        {/* Animated hand-sketched pencil drawing */}
        <motion.g
          animate={{ x: [0, -3, 0], y: [0, 2.5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M84 46 L104 26 L109 31 L89 51 L82 53 Z"
            fill="#ffffff"
            stroke={INK}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <line x1="100" y1="30" x2="105" y2="35" stroke={INK} strokeWidth="1.3" />
        </motion.g>
      </svg>
    );
  }

  // 03 — Pemilihan Material: Fanned swatch deck (wood grain, metal grid, paint/HPL finish)
  if (kind === 2) {
    return (
      <svg viewBox="0 0 120 76" fill="none" className="w-[116px] h-[72px]" aria-hidden="true">
        {/* Swatch pivot at (34, 58) */}
        <g transform="translate(34, 58)">
          {/* Rightmost swatch (Metal grid) — gently fans out */}
          <motion.g
            animate={{ rotate: [28, 36, 28] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect x="-12" y="-44" width="26" height="48" rx="3" fill="#ffffff" stroke={INK} strokeWidth="1.45" />
            <line x1="-6" y1="-36" x2="8" y2="-36" stroke={INK} strokeWidth="1.1" strokeDasharray="2 2" />
            <line x1="-6" y1="-29" x2="8" y2="-29" stroke={INK} strokeWidth="1.1" strokeDasharray="2 2" />
            <line x1="-6" y1="-22" x2="8" y2="-22" stroke={INK} strokeWidth="1.1" strokeDasharray="2 2" />
          </motion.g>

          {/* Middle swatch (Wood grain) */}
          <motion.g
            animate={{ rotate: [12, 16, 12] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect x="-12" y="-45" width="26" height="49" rx="3" fill="#FFD400" stroke={INK} strokeWidth="1.45" />
            {/* Organic wood grain waves */}
            <path d="M-6 -38 C-2 -34 -2 -26 -6 -20" stroke={INK} strokeWidth="1.15" strokeLinecap="round" />
            <path d="M1 -39 C5 -33 5 -25 1 -18" stroke={INK} strokeWidth="1.15" strokeLinecap="round" />
            <path d="M7 -37 C10 -32 10 -26 7 -21" stroke={INK} strokeWidth="1.15" strokeLinecap="round" />
          </motion.g>

          {/* Front swatch (Finishing plate + rivet) */}
          <rect x="-12" y="-46" width="26" height="50" rx="3" fill="#ffffff" stroke={INK} strokeWidth="1.5" />
          <rect x="-7" y="-40" width="16" height="16" fill="#FFD400" stroke={INK} strokeWidth="1.25" />
          <line x1="-7" y1="-17" x2="9" y2="-17" stroke={INK} strokeWidth="1.2" strokeLinecap="round" />
          <line x1="-7" y1="-12" x2="4" y2="-12" stroke={INK} strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="1" cy="-3" r="2.8" fill="#ffffff" stroke={INK} strokeWidth="1.35" />
        </g>

        {/* Subtle hand-drawn sparkle next to swatch */}
        <motion.path
          d="M92 20 L94 26 L100 28 L94 30 L92 36 L90 30 L84 28 L90 26 Z"
          fill="#ffffff"
          stroke={INK}
          strokeWidth="1.2"
          strokeLinejoin="round"
          animate={{ scale: [0.9, 1.12, 0.9] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      </svg>
    );
  }

  // 04 — In-House Production: Spinning workshop saw blade cutting a timber plank + sparks
  if (kind === 3) {
    return (
      <svg viewBox="0 0 120 76" fill="none" className="w-[116px] h-[72px]" aria-hidden="true">
        {/* Spinning circular saw blade centered cleanly at (48, 38) */}
        <g transform="translate(48, 38)">
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="0" cy="0" r="19" fill="#ffffff" stroke={INK} strokeWidth="1.5" strokeDasharray="5 3" />
            <circle cx="0" cy="0" r="15" stroke={INK} strokeWidth="1.35" />
            <line x1="-11" y1="0" x2="11" y2="0" stroke={INK} strokeWidth="1.15" />
            <line x1="0" y1="-11" x2="0" y2="11" stroke={INK} strokeWidth="1.15" />
            <circle cx="0" cy="0" r="4.5" fill="#FFD400" stroke={INK} strokeWidth="1.4" />
          </motion.g>
        </g>

        {/* Workshop bench & timber plank being cut */}
        <rect x="14" y="47" width="90" height="12" rx="1.5" fill="#ffffff" stroke={INK} strokeWidth="1.5" />
        {/* Wood cut seam */}
        <line x1="48" y1="47" x2="48" y2="54" stroke={INK} strokeWidth="1.5" />
        {/* Wood grain lines on plank */}
        <line x1="20" y1="53" x2="40" y2="53" stroke={INK} strokeWidth="1.1" strokeLinecap="round" />
        <line x1="58" y1="53" x2="96" y2="53" stroke={INK} strokeWidth="1.1" strokeLinecap="round" />

        {/* Animated sawdust / workshop sparks */}
        <motion.g
          animate={{ x: [0, 5, 0], y: [0, -4, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
        >
          <line x1="72" y1="36" x2="78" y2="32" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
          <line x1="76" y1="42" x2="84" y2="40" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="85" cy="30" r="2" fill="#ffffff" stroke={INK} strokeWidth="1.2" />
        </motion.g>
      </svg>
    );
  }

  // 05 — Quality Control: Workshop clipboard checklist + animated magnifying glass checking items
  if (kind === 4) {
    return (
      <svg viewBox="0 0 120 76" fill="none" className="w-[116px] h-[72px]" aria-hidden="true">
        {/* Clipboard */}
        <rect x="18" y="14" width="52" height="54" rx="3" fill="#ffffff" stroke={INK} strokeWidth="1.5" />
        {/* Clip */}
        <rect x="33" y="9" width="22" height="9" rx="2" fill="#FFD400" stroke={INK} strokeWidth="1.4" />
        {/* Checklist rows */}
        <path d="M26 29 L29 32 L34 26" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="40" y1="29" x2="60" y2="29" stroke={INK} strokeWidth="1.35" strokeLinecap="round" />

        <path d="M26 42 L29 45 L34 39" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="40" y1="42" x2="58" y2="42" stroke={INK} strokeWidth="1.35" strokeLinecap="round" />

        <path d="M26 55 L29 58 L34 52" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="40" y1="55" x2="54" y2="55" stroke={INK} strokeWidth="1.35" strokeLinecap="round" />

        {/* Animated magnifying glass inspecting */}
        <motion.g
          animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="79" cy="39" r="15" fill="#FFD400" stroke={INK} strokeWidth="1.5" />
          <circle cx="79" cy="39" r="10.5" fill="#ffffff" stroke={INK} strokeWidth="1.2" />
          <path
            d="M74 39.5 L77.5 43 L85 35"
            stroke={INK}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="90" y1="50" x2="102" y2="62" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
        </motion.g>
      </svg>
    );
  }

  // 06 — Instalasi di Lokasi: Event stage truss portal with glowing spotlights & rigging deck
  if (kind === 5) {
    return (
      <svg viewBox="0 0 120 76" fill="none" className="w-[116px] h-[72px]" aria-hidden="true">
        {/* Left & Right Stage Truss Towers */}
        <rect x="16" y="14" width="10" height="46" fill="#ffffff" stroke={INK} strokeWidth="1.45" />
        <path d="M16 24 L26 34 M26 24 L16 34 M16 40 L26 50 M26 40 L16 50" stroke={INK} strokeWidth="1.1" />
        <rect x="92" y="14" width="10" height="46" fill="#ffffff" stroke={INK} strokeWidth="1.45" />
        <path d="M92 24 L102 34 M102 24 L92 34 M92 40 L102 50 M102 40 L92 50" stroke={INK} strokeWidth="1.1" />

        {/* Top Truss Header */}
        <rect x="16" y="14" width="86" height="9" fill="#ffffff" stroke={INK} strokeWidth="1.45" />
        <path d="M30 14 L38 23 L46 14 L54 23 L62 14 L70 23 L78 14 L86 23" stroke={INK} strokeWidth="1.1" />

        {/* Animated Stage Spotlight Beams */}
        <motion.g
          animate={{ opacity: [0.3, 0.85, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <polygon points="40,24 30,56 50,56" fill="#ffffff" opacity="0.55" />
          <polygon points="78,24 68,56 88,56" fill="#ffffff" opacity="0.55" />
        </motion.g>
        {/* Spotlight fixtures */}
        <rect x="37" y="23" width="6" height="5" fill={INK} />
        <rect x="75" y="23" width="6" height="5" fill={INK} />

        {/* Center Backdrop Panel lowering cleanly into place */}
        <motion.rect
          x="45"
          y="33"
          width="28"
          height="22"
          fill="#ffffff"
          stroke={INK}
          strokeWidth="1.4"
          animate={{ y: [-2, 1, -2] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Stage Platform */}
        <rect x="10" y="57" width="98" height="8" rx="1" fill="#ffffff" stroke={INK} strokeWidth="1.5" />
      </svg>
    );
  }

  // 07 — Pembongkaran: Logistics box truck with packed crates & spinning wheels
  return (
    <svg viewBox="0 0 120 76" fill="none" className="w-[116px] h-[72px]" aria-hidden="true">
      {/* Motion speed lines */}
      <motion.g
        animate={{ x: [0, -5, 0], opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="8" y1="28" x2="18" y2="28" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="5" y1="36" x2="16" y2="36" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="10" y1="44" x2="18" y2="44" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
      </motion.g>

      {/* Truck body with subtle suspension bounce */}
      <motion.g
        animate={{ y: [0, -1.5, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Cargo Box */}
        <rect x="24" y="19" width="52" height="34" rx="2" fill="#ffffff" stroke={INK} strokeWidth="1.5" />
        {/* Packed crates inside cargo box */}
        <rect x="31" y="27" width="16" height="12" fill="#FFD400" stroke={INK} strokeWidth="1.2" />
        <rect x="51" y="27" width="18" height="12" fill="#FFD400" stroke={INK} strokeWidth="1.2" />
        <line x1="31" y1="44" x2="69" y2="44" stroke={INK} strokeWidth="1.2" strokeDasharray="3 2.5" />

        {/* Cab */}
        <path
          d="M76 31 H93 L103 42 V53 H76 Z"
          fill="#ffffff"
          stroke={INK}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Cab window */}
        <path
          d="M81 35 H91 L97 42 H81 Z"
          fill="#FFD400"
          stroke={INK}
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* Road line */}
      <line x1="14" y1="62" x2="108" y2="62" stroke={INK} strokeWidth="1.3" strokeLinecap="round" />

      {/* Left Spinning Wheel at (40, 55) */}
      <g transform="translate(40, 55)">
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="0" cy="0" r="7" fill="#ffffff" stroke={INK} strokeWidth="1.6" />
          <line x1="-4.5" y1="0" x2="4.5" y2="0" stroke={INK} strokeWidth="1.2" />
          <line x1="0" y1="-4.5" x2="0" y2="4.5" stroke={INK} strokeWidth="1.2" />
          <circle cx="0" cy="0" r="2" fill={INK} />
        </motion.g>
      </g>

      {/* Right Spinning Wheel at (89, 55) */}
      <g transform="translate(89, 55)">
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="0" cy="0" r="7" fill="#ffffff" stroke={INK} strokeWidth="1.6" />
          <line x1="-4.5" y1="0" x2="4.5" y2="0" stroke={INK} strokeWidth="1.2" />
          <line x1="0" y1="-4.5" x2="0" y2="4.5" stroke={INK} strokeWidth="1.2" />
          <circle cx="0" cy="0" r="2" fill={INK} />
        </motion.g>
      </g>
    </svg>
  );
}

export default function Process({ steps = [] }: ProcessProps) {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  const englishSteps = [
    {
      title: "Consultation & Briefing",
      desc: "Understanding your brand vision, venue dimensions, and project budget.",
    },
    {
      title: "3D Design & Rendering",
      desc: "Delivering photorealistic mockups and structural floor plans.",
    },
    {
      title: "Material Selection",
      desc: "Sourcing the right timber, steel framing, and custom finishes.",
    },
    {
      title: "In-House Production",
      desc: "Carpentry, metal welding, and painting inside our dedicated workshop.",
    },
    {
      title: "Quality Control",
      desc: "Pre-assembling complex structures at our workshop to verify fit and safety.",
    },
    {
      title: "On-Site Installation",
      desc: "Safe, fast, and scheduled venue loading and setup.",
    },
    {
      title: "Dismantling",
      desc: "Clean strike-down and post-event logistics clearance.",
    },
  ];

  const fallbackSteps = [
    {
      title: "Konsultasi & Briefing",
      desc: "Memahami visi brand Anda, batasan ruang, dan anggaran.",
    },
    {
      title: "Desain 3D & Rendering",
      desc: "Menyediakan mockup fotorealistis dan denah lantai struktural.",
    },
    {
      title: "Pemilihan Material",
      desc: "Mencari bahan yang tepat, mulai dari kayu, logam, dan finishing yang dibutuhkan.",
    },
    {
      title: "In-House Production",
      desc: "Pekerjaan kayu, logam, dan pengecatan di fasilitas khusus kami.",
    },
    {
      title: "Quality Control",
      desc: "Pemasangan awal struktur kompleks di workshop kami untuk menjamin kesesuaian.",
    },
    {
      title: "Instalasi di Lokasi",
      desc: "Konstruksi dan loading yang aman dan cepat di lokasi event.",
    },
    {
      title: "Pembongkaran",
      desc: "Pembongkaran bersih dan pemindahan logistik pasca-event.",
    },
  ];

  const listToRender = isEn
    ? englishSteps.map((s, idx) => ({
        num: (idx + 1).toString().padStart(2, "0"),
        title: s.title,
        desc: s.desc,
      }))
    : steps.length > 0
      ? steps.map((s, idx) => ({
          num: (idx + 1).toString().padStart(2, "0"),
          title: s.title,
          desc: s.description,
        }))
      : fallbackSteps.map((s, idx) => ({
          num: (idx + 1).toString().padStart(2, "0"),
          title: s.title,
          desc: s.desc,
        }));

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="process"
        className="py-16 md:py-22 bg-brand-yellow text-brand-dark relative overflow-hidden"
        suppressHydrationWarning
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
          {/* Clean Editorial Heading on Yellow Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-14"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-magenta leading-[1.1]">
              {isEn ? "Production Process." : "Proses Pengerjaan."}
            </h2>
          </motion.div>

          {/* Open Borderless 4x2 Grid with Animated Hand-Drawn Ink Art */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 md:gap-x-10 md:gap-y-12">
            {listToRender.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className="flex flex-col items-start text-left"
              >
                {/* Animated Simplistic Ink Illustration matching step description */}
                <div className="w-full flex justify-center mb-4">
                  <ProcessIllustration index={i} title={step.title} />
                </div>

                {/* Bold Dark-Ink Title */}
                <h3 className="font-sans text-base sm:text-[17px] font-bold text-brand-dark leading-snug tracking-tight">
                  <span className="font-mono text-xs font-semibold text-brand-dark/55 mr-2 tabular-nums">
                    {step.num}
                  </span>
                  {step.title}
                </h3>

                {/* Crisp Editorial Description */}
                <p className="mt-2 text-brand-dark/80 text-xs sm:text-[13px] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}

            {/* 8th Balanced Open CTA Column with Animated Paper Plane */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.35 }}
              className="group flex flex-col items-start text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-4 focus-visible:ring-offset-brand-yellow rounded-xs"
            >
              <div className="w-full flex justify-center mb-4">
                <svg viewBox="0 0 120 76" fill="none" className="w-[116px] h-[72px]" aria-hidden="true">
                  {/* Dashed flight trail */}
                  <path
                    d="M14 58 C30 56 38 42 54 38"
                    stroke={INK}
                    strokeWidth="1.3"
                    strokeDasharray="3.5 3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="14" cy="58" r="3.5" fill="#ffffff" stroke={INK} strokeWidth="1.35" />
                  {/* Gliding paper plane */}
                  <motion.g
                    animate={{ x: [0, 5, 0], y: [0, -3.5, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path
                      d="M52 36 L98 20 L78 52 L68 42 Z"
                      fill="#ffffff"
                      stroke={INK}
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path d="M98 20 L68 42 L70 54 L76 46" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
                  </motion.g>
                </svg>
              </div>

              <span className="inline-flex items-center gap-1.5 font-sans text-base sm:text-[17px] font-bold text-brand-magenta group-hover:text-brand-dark transition-colors leading-snug tracking-tight">
                {isEn ? "Start Your Project" : "Mulai Proyek Anda"}
                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                  className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                />
              </span>
              <p className="mt-2 text-brand-dark/80 text-xs sm:text-[13px] leading-relaxed">
                {isEn
                  ? "Discuss your brief and event schedule directly with our workshop team."
                  : "Diskusikan brief dan jadwal event langsung dengan tim workshop kami."}
              </p>
            </motion.a>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
