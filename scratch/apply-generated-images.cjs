const fs = require('fs');
const path = require('path');
const db = require('better-sqlite3')('dev.db');

const brainDir = path.join('C:', 'Users', 'Misael', '.gemini', 'antigravity', 'brain', 'f08ede91-95ee-450b-a829-5d2e55489eba');
const productsDir = path.join(__dirname, '..', 'public', 'uploads', 'products');

// Map of generated images
const sourceMap = {
  soundSystem: 'sound_system_professional_1793163771027.jpg',
  lampuCafe: 'lampu_cafe_gantung_1793163793203.jpg',
  mistyFan: 'misty_fan_embun_single_1793163716484.jpg',
  genset: 'genset_silent_canopy_1793163786345.jpg',
  acStanding: 'ac_standing_5pk_1793163802052.jpg',
  tendaSarnafil: 'tenda_sarnafil_white_1793163818062.jpg',
  kursiFutura: 'kursi_futura_banquet_1793163837137.jpg',
  sofaHitam: 'sofa_single_vip_hitam_1793163829295.jpg',
  ht: 'ht_handie_talkie_1793163812140.jpg',
  queline: 'queline_tiang_antrian_1793163796543.jpg',
  standrope: 'standrope_tiang_bludru_1793163812577.jpg',
  barricade: 'barricade_konser_baja_1793163828338.jpg',
  cableProtector: 'cable_protector_lantai_1793163844425.jpg'
};

// Destination file targets
const copyTargets = [
  // Sound System
  { key: 'soundSystem', dest: 'sound-system-professional.jpg' },

  // Lampu Cafe
  { key: 'lampuCafe', dest: 'lampu-cafe-gantung.jpg' },

  // Misty Fan
  { key: 'mistyFan', dest: 'misty-fan-embun.jpg' },

  // Genset (all capacities)
  { key: 'genset', dest: 'genset-silent-40kva.jpg' },
  { key: 'genset', dest: 'genset-silent-60kva.jpg' },
  { key: 'genset', dest: 'genset-silent-80kva.jpg' },
  { key: 'genset', dest: 'genset-silent-100kva.jpg' },
  { key: 'genset', dest: 'genset-silent-150kva.jpg' },
  { key: 'genset', dest: 'genset-silent-200kva.jpg' },
  { key: 'genset', dest: 'genset-silent-250kva.jpg' },

  // AC Standing
  { key: 'acStanding', dest: 'ac-standing-5pk.jpg' },
  { key: 'acStanding', dest: 'ac-standing-3pk.jpg' },

  // Tenda Sarnafil
  { key: 'tendaSarnafil', dest: 'tenda-sarnafil-3x3.jpg' },
  { key: 'tendaSarnafil', dest: 'tenda-sarnafil-5x5.jpg' },
  { key: 'tendaSarnafil', dest: 'tenda-sarnafil-3x3-fullset.jpg' },
  { key: 'tendaSarnafil', dest: 'tenda-sarnafil-5x5-fullset.jpg' },

  // Kursi Futura
  { key: 'kursiFutura', dest: 'kursi-futura-polos.jpg' },
  { key: 'kursiFutura', dest: 'kursi-futura-cover.jpg' },
  { key: 'kursiFutura', dest: 'kursi-futura-pita-vip.jpg' },

  // Sofa Hitam & Putih
  { key: 'sofaHitam', dest: 'sofa-single-vip-hitam.jpg' },
  { key: 'sofaHitam', dest: 'sofa-single-vip-putih.jpg' },

  // HT
  { key: 'ht', dest: 'ht-handie-talkie.jpg' },

  // Queline
  { key: 'queline', dest: 'queline-tiang-antrian.jpg' },

  // Standrope
  { key: 'standrope', dest: 'standrope-tiang-bludru.jpg' },

  // Barricade
  { key: 'barricade', dest: 'barricade-konser-baja.jpg' },

  // Cable Protector
  { key: 'cableProtector', dest: 'cable-protector-lantai.jpg' }
];

for (const target of copyTargets) {
  const srcFile = sourceMap[target.key];
  if (!srcFile) continue;
  const srcPath = path.join(brainDir, srcFile);
  const destPath = path.join(productsDir, target.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${srcFile} -> ${target.dest}`);
  } else {
    console.warn(`Source not found: ${srcPath}`);
  }
}

// Update DB image paths for all products
const prods = db.prepare('SELECT id, slug FROM Product').all();
const updateProd = db.prepare('UPDATE Product SET image = ? WHERE id = ?');

for (const p of prods) {
  // Check if a direct file matching slug exists
  const candidate = `${p.slug}.jpg`;
  const candPath = path.join(productsDir, candidate);
  if (fs.existsSync(candPath)) {
    updateProd.run(`/uploads/products/${candidate}`, p.id);
  }
}

console.log('Done copying and updating DB.');
