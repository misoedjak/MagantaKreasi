const fs = require('fs');
const path = require('path');

const logosDir = path.join(__dirname, '..', 'public', 'uploads', 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

const logos = {
  'ui.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
  <circle cx="28" cy="30" r="18" fill="#FFD400"/>
  <path d="M22,22 C22,17 34,17 34,22 C34,29 28,31 28,37 C28,38 27,39 26,39 C25,39 24,38 24,37 C24,31 18,29 18,22" fill="#000" opacity="0.85"/>
  <circle cx="28" cy="22" r="3" fill="#FFD400"/>
  <text x="56" y="27" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="14" fill="#0f0f12" letter-spacing="0.5">UNIVERSITAS</text>
  <text x="56" y="42" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="15" fill="#be3168" letter-spacing="1">INDONESIA</text>
</svg>`,

  'bxc_mall.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" width="220" height="60">
  <rect x="10" y="14" width="32" height="32" rx="8" fill="#1B4D3E"/>
  <text x="26" y="36" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="16" fill="#FFD400" text-anchor="middle">BXc</text>
  <text x="50" y="27" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="13" fill="#1B4D3E" letter-spacing="0.5">BINTARO JAYA</text>
  <text x="50" y="42" font-family="'Segoe UI', Arial, sans-serif" font-weight="600" font-size="11" fill="#777" letter-spacing="2">XCHANGE MALL</text>
</svg>`,

  'ojk.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 60" width="190" height="60">
  <path d="M12,30 C12,18 20,12 32,12 C44,12 52,18 52,30 C52,42 44,48 32,48 C20,48 12,42 12,30Z" fill="none" stroke="#D32F2F" stroke-width="5"/>
  <path d="M22,30 L42,30 M32,20 L32,40" stroke="#D32F2F" stroke-width="4" stroke-linecap="round"/>
  <text x="62" y="32" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="22" fill="#D32F2F" letter-spacing="1">OJK</text>
  <text x="62" y="44" font-family="'Segoe UI', Arial, sans-serif" font-weight="600" font-size="7.5" fill="#555" letter-spacing="0.8">OTORITAS JASA KEUANGAN</text>
</svg>`,

  'dpr_ri.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 60" width="190" height="60">
  <circle cx="26" cy="30" r="18" fill="#D4AF37"/>
  <path d="M26,16 L30,24 L38,25 L32,31 L34,39 L26,35 L18,39 L20,31 L14,25 L22,24 Z" fill="#fff"/>
  <text x="52" y="28" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="16" fill="#1a1a1a" letter-spacing="1">DPR RI</text>
  <text x="52" y="42" font-family="'Segoe UI', Arial, sans-serif" font-weight="600" font-size="7.5" fill="#666" letter-spacing="0.5">KOMISI XI DPR RI</text>
</svg>`,

  'bappenas.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 60" width="210" height="60">
  <circle cx="26" cy="30" r="18" fill="#003366"/>
  <circle cx="26" cy="30" r="13" fill="#FFCC00"/>
  <circle cx="26" cy="30" r="8" fill="#003366"/>
  <text x="54" y="27" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="13" fill="#003366" letter-spacing="0.5">KEMENTERIAN PPN</text>
  <text x="54" y="42" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="14" fill="#be3168" letter-spacing="1">BAPPENAS RI</text>
</svg>`,

  'astra_agro.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" width="220" height="60">
  <path d="M12,42 L26,16 L40,42 L31,42 L26,30 L21,42 Z" fill="#004A99"/>
  <circle cx="26" cy="22" r="3" fill="#E31E24"/>
  <text x="48" y="27" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="15" fill="#004A99" letter-spacing="1">ASTRA AGRO</text>
  <text x="48" y="41" font-family="'Segoe UI', Arial, sans-serif" font-weight="600" font-size="8" fill="#666" letter-spacing="1">PT ASTRA AGRO LESTARI TBK</text>
</svg>`,

  'sinarmas_sekuritas.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" width="220" height="60">
  <circle cx="26" cy="30" r="17" fill="#E60000"/>
  <path d="M16,30 Q26,18 36,30 Q26,42 16,30 Z" fill="#fff"/>
  <text x="52" y="26" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="13" fill="#E60000" letter-spacing="0.5">SINARMAS</text>
  <text x="52" y="41" font-family="'Segoe UI', Arial, sans-serif" font-weight="700" font-size="11" fill="#333" letter-spacing="1">SEKURITAS • SIMINVEST</text>
</svg>`,

  'willis_towers_watson.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 60" width="210" height="60">
  <path d="M10,20 L18,40 L26,20 L34,40 L42,20" fill="none" stroke="#7A1EA1" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="52" y="32" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="19" fill="#7A1EA1" letter-spacing="1">WTW</text>
  <text x="52" y="44" font-family="'Segoe UI', Arial, sans-serif" font-weight="500" font-size="7.5" fill="#666" letter-spacing="0.5">WILLIS TOWERS WATSON</text>
</svg>`,

  'inbody.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60" width="180" height="60">
  <text x="10" y="38" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="28" fill="#C8102E" letter-spacing="-1">InBody</text>
  <text x="120" y="24" font-family="'Segoe UI', Arial, sans-serif" font-weight="700" font-size="9" fill="#C8102E">®</text>
  <text x="12" y="49" font-family="'Segoe UI', Arial, sans-serif" font-weight="600" font-size="7.5" fill="#666" letter-spacing="2">BODY COMPOSITION</text>
</svg>`,

  'sinemaku_pictures.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 60" width="210" height="60">
  <rect x="12" y="16" width="28" height="28" rx="4" fill="#0f0f12"/>
  <polygon points="22,22 34,30 22,38" fill="#FFD400"/>
  <text x="48" y="28" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="14" fill="#0f0f12" letter-spacing="1">SINEMAKU</text>
  <text x="48" y="42" font-family="'Segoe UI', Arial, sans-serif" font-weight="600" font-size="9" fill="#be3168" letter-spacing="2">PICTURES</text>
</svg>`,

  'iims.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 60" width="190" height="60">
  <path d="M10,38 L18,18 L30,18 L22,38 Z" fill="#D32F2F"/>
  <path d="M26,38 L34,18 L46,18 L38,38 Z" fill="#111"/>
  <text x="54" y="31" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="22" fill="#D32F2F" letter-spacing="1">IIMS</text>
  <text x="54" y="44" font-family="'Segoe UI', Arial, sans-serif" font-weight="700" font-size="7" fill="#333" letter-spacing="0.5">INDONESIA MOTOR SHOW</text>
</svg>`,

  'beam_mobility.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 60" width="190" height="60">
  <circle cx="26" cy="30" r="18" fill="#6C2EB9"/>
  <circle cx="26" cy="30" r="9" fill="#FFD400"/>
  <text x="52" y="32" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="21" fill="#6C2EB9" letter-spacing="0.5">beam</text>
  <text x="52" y="44" font-family="'Segoe UI', Arial, sans-serif" font-weight="600" font-size="7.5" fill="#666" letter-spacing="1">MOBILITY INDONESIA</text>
</svg>`,

  'tmii.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 60" width="190" height="60">
  <path d="M12,38 Q26,14 40,38 Z" fill="#2E7D32"/>
  <circle cx="26" cy="20" r="5" fill="#FFD400"/>
  <text x="50" y="30" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="20" fill="#2E7D32" letter-spacing="1">TMII</text>
  <text x="50" y="43" font-family="'Segoe UI', Arial, sans-serif" font-weight="600" font-size="7" fill="#555" letter-spacing="0.5">TAMAN MINI INDONESIA INDAH</text>
</svg>`,

  'akpi.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 60" width="190" height="60">
  <circle cx="26" cy="30" r="18" fill="#0A2540"/>
  <path d="M26,16 L26,42 M16,24 L36,24 M18,24 L14,32 L22,32 Z M34,24 L30,32 L38,32 Z" fill="#D4AF37" stroke="#D4AF37" stroke-width="1.5"/>
  <text x="52" y="30" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="19" fill="#0A2540" letter-spacing="1">AKPI</text>
  <text x="52" y="43" font-family="'Segoe UI', Arial, sans-serif" font-weight="600" font-size="6.5" fill="#666" letter-spacing="0.5">ASOSIASI KURATOR INDONESIA</text>
</svg>`,

  'creo_production.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
  <rect x="12" y="15" width="30" height="30" rx="8" fill="#be3168"/>
  <polygon points="22,23 34,30 22,37" fill="#FFD400"/>
  <text x="50" y="29" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" font-size="16" fill="#be3168" letter-spacing="1">CREO</text>
  <text x="50" y="42" font-family="'Segoe UI', Arial, sans-serif" font-weight="700" font-size="8.5" fill="#333" letter-spacing="2">PRODUCTION</text>
</svg>`
};

for (const [filename, content] of Object.entries(logos)) {
  const filePath = path.join(logosDir, filename);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log('Saved:', filename);
}

console.log('All 15 client logos created successfully!');
