const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const db = new Database('dev.db');

const uploadsDir = path.join(__dirname, '..', 'public', 'uploads', 'products');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Helper to download image
async function downloadImage(url, filename) {
  const destPath = path.join(uploadsDir, filename);
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
    return `/uploads/products/${filename}`;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destPath, buffer);
    console.log(`Downloaded: ${filename} (${buffer.length} bytes)`);
    return `/uploads/products/${filename}`;
  } catch (err) {
    console.warn(`Failed downloading ${filename}, falling back to CDN URL: ${err.message}`);
    return url;
  }
}

async function run() {
  console.log('Seeding Product Categories & Rental Products...');

  const categories = [
    { id: 'cat-sound', name: 'Sound & Audio', slug: 'sound-audio' },
    { id: 'cat-lighting', name: 'Lighting Panggung', slug: 'lighting' },
    { id: 'cat-rigging', name: 'Panggung & Rigging', slug: 'panggung-rigging' },
    { id: 'cat-genset', name: 'Genset & Power', slug: 'genset-power' },
    { id: 'cat-videotron', name: 'LED Screen Videotron', slug: 'led-videotron' },
    { id: 'cat-tenda', name: 'Tenda & Kain', slug: 'tenda-kain' },
    { id: 'cat-kursi', name: 'Kursi & Sofa', slug: 'kursi-sofa' },
    { id: 'cat-meja', name: 'Meja Event', slug: 'meja-event' },
    { id: 'cat-partisi', name: 'Partisi & Booth R8', slug: 'partisi-r8' },
    { id: 'cat-pendingin', name: 'AC & Pendingin', slug: 'ac-pendingin' },
    { id: 'cat-komunikasi', name: 'Komunikasi & Radio', slug: 'komunikasi-radio' },
    { id: 'cat-crowd', name: 'Crowd Control & Antrian', slug: 'crowd-control' },
    { id: 'cat-dekorasi', name: 'Dekorasi & Ambient', slug: 'dekorasi-ambient' },
    { id: 'cat-keamanan', name: 'Barikade & Pengaman', slug: 'barikade-pengaman' },
  ];

  // Clean up any empty categories to avoid unique slug/name conflicts
  db.prepare(`DELETE FROM ProductCategory WHERE id NOT IN (SELECT categoryId FROM Product)`).run();

  const insertCategory = db.prepare(`
    INSERT INTO ProductCategory (id, name, slug)
    VALUES (?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET name=excluded.name, slug=excluded.slug
  `);

  for (const cat of categories) {
    insertCategory.run(cat.id, cat.name, cat.slug);
  }
  console.log(`Upserted ${categories.length} product categories.`);

  // Products definition mapping
  const rawProducts = [
    // 1. Sound System
    {
      name: 'Paket Sound System Professional',
      slug: 'paket-sound-system-professional',
      price: 0,
      priceUnit: 'paket',
      categoryId: 'cat-sound',
      description: 'Sistem tata suara profesional lengkap (Line Array, Subwoofer, Digital Audio Console, Wireless Microphone, & Stage Monitor). Kapasitas dan watt dapat disesuaikan kebutuhan venue.',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop',
      file: 'sound-system-professional.jpg'
    },

    // 2. Lighting
    {
      name: 'Paket Stage Lighting & Effects',
      slug: 'paket-stage-lighting-effects',
      price: 0,
      priceUnit: 'paket',
      categoryId: 'cat-lighting',
      description: 'Paket tata pencahayaan panggung konser (Moving Head Beam, LED Par RGBW, Fresnel, Blinder 4-Eye, Hazer/Smoke Machine, & DMX Console Operator).',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
      file: 'lighting-panggung-effects.jpg'
    },

    // 3. Stage Rigging
    {
      name: 'Stage Rigging & Aluminium Box Truss',
      slug: 'stage-rigging-box-truss',
      price: 0,
      priceUnit: 'set',
      categoryId: 'cat-rigging',
      description: 'Konstruksi rigging panggung modular berbahan aluminium box truss standar internasional. Kuat, presisi, bersertifikat aman untuk menggantung sound line array dan lighting fixtures.',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop',
      file: 'stage-rigging-truss.jpg'
    },

    // 4. Genset
    {
      name: 'Genset Silent 40 kVA',
      slug: 'genset-silent-40-kva',
      price: 1850000,
      priceUnit: 'unit',
      categoryId: 'cat-genset',
      description: 'Genset diesel silent canopy 40 kVA hemat solar, tingkat kebisingan rendah, siap suplai daya acara indoor & outdoor skala kecil hingga sedang.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
      file: 'genset-silent-40kva.jpg'
    },
    {
      name: 'Genset Silent 60 kVA',
      slug: 'genset-silent-60-kva',
      price: 2000000,
      priceUnit: 'unit',
      categoryId: 'cat-genset',
      description: 'Genset diesel silent 60 kVA andal dan stabil untuk pameran, wedding venue, bazaar outdoor, dan back-up listrik gedung.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop',
      file: 'genset-silent-60kva.jpg'
    },
    {
      name: 'Genset Silent 80 kVA',
      slug: 'genset-silent-80-kva',
      price: 2500000,
      priceUnit: 'unit',
      categoryId: 'cat-genset',
      description: 'Genset silent 80 kVA pasokan listrik stabil untuk sistem tata lampu, tata suara, dan pendingin panggung.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
      file: 'genset-silent-80kva.jpg'
    },
    {
      name: 'Genset Silent 100 kVA',
      slug: 'genset-silent-100-kva',
      price: 3000000,
      priceUnit: 'unit',
      categoryId: 'cat-genset',
      description: 'Genset silent 100 kVA kapasitas menengah untuk festival musik, pameran expo, dan korporat gathering dengan konsumsi daya tinggi.',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop',
      file: 'genset-silent-100kva.jpg'
    },
    {
      name: 'Genset Silent 150 kVA',
      slug: 'genset-silent-150-kva',
      price: 5000000,
      priceUnit: 'unit',
      categoryId: 'cat-genset',
      description: 'Genset silent 150 kVA heavy-duty untuk konser musik panggung utama, rig pencahayaan besar, dan pendingin AC terpusat.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
      file: 'genset-silent-150kva.jpg'
    },
    {
      name: 'Genset Silent 200 kVA',
      slug: 'genset-silent-200-kva',
      price: 9000000,
      priceUnit: 'unit',
      categoryId: 'cat-genset',
      description: 'Genset silent kapasitas 200 kVA untuk mega event, konser internasional, dan kompleks expo outdoor berhari-hari.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop',
      file: 'genset-silent-200kva.jpg'
    },
    {
      name: 'Genset Silent 250 kVA',
      slug: 'genset-silent-250-kva',
      price: 10000000,
      priceUnit: 'unit',
      categoryId: 'cat-genset',
      description: 'Genset silent kapasitas maksimal 250 kVA daya super besar untuk stadion, festival multi-stage, dan pasokan utama seluruh venue.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
      file: 'genset-silent-250kva.jpg'
    },

    // 5. LED Screen Videotron
    {
      name: 'LED Screen Videotron Outdoor P3.9',
      slug: 'videotron-outdoor-p3-9',
      price: 550000,
      priceUnit: 'meter',
      categoryId: 'cat-videotron',
      description: 'Layar LED videotron outdoor P3.9 waterproof tahan hujan dan terik sinar matahari langsung. Tingkat kecerahan tinggi (5500+ nits) dengan refresh rate 3840Hz tanpa moire di kamera.',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
      file: 'videotron-outdoor-p39.jpg'
    },
    {
      name: 'LED Screen Videotron Indoor P3.9',
      slug: 'videotron-indoor-p3-9',
      price: 450000,
      priceUnit: 'meter',
      categoryId: 'cat-videotron',
      description: 'Layar LED videotron indoor P3.9 presisi tinggi dengan sudut pandang lebar 160°. Sempurna untuk visual backdrop panggung seminar, awarding night, dan pameran mall.',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
      file: 'videotron-indoor-p39.jpg'
    },

    // 6. Tenda & Kain
    {
      name: 'Tenda Plafond Standar',
      slug: 'tenda-plafond-standar',
      price: 20000,
      priceUnit: 'meter',
      categoryId: 'cat-tenda',
      description: 'Tenda semi-permanen dengan penutup langit-langit kain putih bersih rapi dan rapat. Cocok untuk acara syukuran, peresmian, dan bazaar komunitas.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      file: 'tenda-plafond-standar.jpg'
    },
    {
      name: 'Tenda Plafond Rampel VIP',
      slug: 'tenda-plafond-rampel-vip',
      price: 25000,
      priceUnit: 'meter',
      categoryId: 'cat-tenda',
      description: 'Tenda plafon dengan sentuhan dekorasi kain rempel lipat elegan aneka pilihan warna. Menghadirkan atmosfer mewah untuk acara VIP dan resepsi.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      file: 'tenda-plafond-rampel-vip.jpg'
    },
    {
      name: 'Tenda Roder Aluminium Struktur',
      slug: 'tenda-roder-aluminium-struktur',
      price: 80000,
      priceUnit: 'meter',
      categoryId: 'cat-tenda',
      description: 'Tenda bentang lebar tanpa tiang tengah (clear-span) rangka aluminium kokoh anti karat dan terpal PVC flame-retardant. Solusi ruang tertutup sementara untuk expo besar.',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop',
      file: 'tenda-roder-struktur.jpg'
    },
    {
      name: 'Tenda Sarnafil 3x3 M (Kerucut)',
      slug: 'tenda-sarnafil-3x3-m',
      price: 400000,
      priceUnit: 'unit',
      categoryId: 'cat-tenda',
      description: 'Tenda kerucut putih sarnafil 3x3 meter rangka aluminium profil tebal. Ideal untuk posko registrasi, tenda tenant makanan, stan informasi, dan tiket booth.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop',
      file: 'tenda-sarnafil-3x3.jpg'
    },
    {
      name: 'Tenda Sarnafil 5x5 M (Kerucut)',
      slug: 'tenda-sarnafil-5x5-m',
      price: 650000,
      priceUnit: 'unit',
      categoryId: 'cat-tenda',
      description: 'Tenda kerucut putih sarnafil 5x5 meter area lapang 25 m2. Pilihan utama untuk booth sponsor premium, lounge outdoor, dan posko medis lapangan.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop',
      file: 'tenda-sarnafil-5x5.jpg'
    },
    {
      name: 'Tenda Sarnafil 3x3 M Fullset (Dinding/Lantai)',
      slug: 'tenda-sarnafil-3x3-m-fullset',
      price: 500000,
      priceUnit: 'set',
      categoryId: 'cat-tenda',
      description: 'Tenda kerucut sarnafil 3x3 meter lengkap dengan dinding terpal penutup 4 sisi berresleting dan lantai flooring karpet rapi.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop',
      file: 'tenda-sarnafil-3x3-fullset.jpg'
    },
    {
      name: 'Tenda Sarnafil 5x5 M Fullset (Dinding/Lantai)',
      slug: 'tenda-sarnafil-5x5-m-fullset',
      price: 800000,
      priceUnit: 'set',
      categoryId: 'cat-tenda',
      description: 'Tenda sarnafil 5x5 meter paket lengkap mencakup dinding penutup tirai jendela mika transparan, karpet lantai, dan instalasi penerangan internal.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop',
      file: 'tenda-sarnafil-5x5-fullset.jpg'
    },
    {
      name: 'Backdrop Kain Event',
      slug: 'backdrop-kain-event',
      price: 150000,
      priceUnit: 'meter',
      categoryId: 'cat-tenda',
      description: 'Backdrop kain drapery jatuh lembut aneka warna untuk penutup dinding panggung, photobooth, atau pembatas area acara resmi.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop',
      file: 'backdrop-kain-event.jpg'
    },
    {
      name: 'Black Curtain / Tirai Hitam Event',
      slug: 'black-curtain-tirai-hitam',
      price: 150000,
      priceUnit: 'meter',
      categoryId: 'cat-tenda',
      description: 'Tirai kain beludru/blackout hitam pekat tebal penyerap cahaya untuk backstage, masking panggung, dan blackout ruangan presentasi.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop',
      file: 'black-curtain-tirai.jpg'
    },

    // 7. Kursi & Sofa
    {
      name: 'Kursi Futura Polos',
      slug: 'kursi-futura-polos',
      price: 10000,
      priceUnit: 'unit',
      categoryId: 'cat-kursi',
      description: 'Kursi banquet futura stainless steel kokoh dengan bantalan busa tebal nyaman untuk ribuan tamu acara, seminar, dan gathering.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop',
      file: 'kursi-futura-polos.jpg'
    },
    {
      name: 'Kursi Futura Cover (Hitam / Putih)',
      slug: 'kursi-futura-cover-hitam-putih',
      price: 15000,
      priceUnit: 'unit',
      categoryId: 'cat-kursi',
      description: 'Kursi futura dilapisi sarung kain ketat (stretch cover) warna hitam atau putih bersih untuk tampilan seragam dan profesional.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop',
      file: 'kursi-futura-cover.jpg'
    },
    {
      name: 'Kursi Futura Cover Pita VIP',
      slug: 'kursi-futura-cover-pita-vip',
      price: 17500,
      priceUnit: 'unit',
      categoryId: 'cat-kursi',
      description: 'Kursi futura sarung stretch lengkap dengan aksen pita satin mengkilap aneka warna untuk barisan tamu kehormatan VIP.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop',
      file: 'kursi-futura-pita-vip.jpg'
    },
    {
      name: 'Sofa Single VIP Hitam',
      slug: 'sofa-single-vip-hitam',
      price: 200000,
      priceUnit: 'unit',
      categoryId: 'cat-kursi',
      description: 'Sofa single kulit sintetis hitam premium dengan busa empuk ergonomis. Sangat cocok untuk panggung talkshow, panel diskusi, dan ruang tunggu VIP.',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop',
      file: 'sofa-single-vip-hitam.jpg'
    },
    {
      name: 'Sofa Single VIP Putih',
      slug: 'sofa-single-vip-putih',
      price: 250000,
      priceUnit: 'unit',
      categoryId: 'cat-kursi',
      description: 'Sofa single kulit putih elegan bergaya modern minimalis untuk panggung seremonial, konferensi pers, dan jamuan tamu kenegaraan.',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop',
      file: 'sofa-single-vip-putih.jpg'
    },
    {
      name: 'Bar Stool Chair / Kursi Bar',
      slug: 'bar-stool-chair-kursi-bar',
      price: 150000,
      priceUnit: 'unit',
      categoryId: 'cat-kursi',
      description: 'Kursi bar tinggi putar dengan tuas hidrolik penyesuai tinggi dan pijakan kaki chrome. Ideal untuk meja cocktail dan stan pameran kekinian.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=800&auto=format&fit=crop',
      file: 'bar-stool-chair.jpg'
    },
    {
      name: 'Bean Bag Event Nyaman',
      slug: 'bean-bag-event-nyaman',
      price: 100000,
      priceUnit: 'unit',
      categoryId: 'cat-kursi',
      description: 'Bantalan santai bean bag empuk tahan air dalam beragam pilihan warna ceria untuk festival musik, area chill-out santai, dan gathering komunitas.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1589384267710-7a25bc2f111f?q=80&w=800&auto=format&fit=crop',
      file: 'bean-bag-event.jpg'
    },

    // 8. Meja Event
    {
      name: 'High Table / Meja Cocktail 100 cm',
      slug: 'high-table-meja-cocktail-100cm',
      price: 100000,
      priceUnit: 'unit',
      categoryId: 'cat-meja',
      description: 'Meja cocktail bulat tinggi 100 cm diameter 60 cm lengkap dengan kain penutup stretch putih/hitam untuk acara standing party dan networking.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800&auto=format&fit=crop',
      file: 'high-table-cocktail.jpg'
    },
    {
      name: 'Round Table 120 cm (Meja Bulat)',
      slug: 'round-table-120cm',
      price: 50000,
      priceUnit: 'unit',
      categoryId: 'cat-meja',
      description: 'Meja bundar kayu lapis diameter 120 cm untuk kapasitas 4 hingga 6 orang. Rangka besi lipat kokoh stabil.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
      file: 'round-table-120cm.jpg'
    },
    {
      name: 'Round Table 160 cm (Meja Bulat VIP)',
      slug: 'round-table-160cm',
      price: 150000,
      priceUnit: 'unit',
      categoryId: 'cat-meja',
      description: 'Meja bundar banquet diameter 160 cm (kapasitas 8-10 kursi) lengkap dengan taplak meja kain mewah sampai lantai.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
      file: 'round-table-160cm.jpg'
    },
    {
      name: 'Round Table 180 cm (Meja Bulat Banquet)',
      slug: 'round-table-180cm',
      price: 250000,
      priceUnit: 'unit',
      categoryId: 'cat-meja',
      description: 'Meja bundar banquet ukuran besar diameter 180 cm (kapasitas 10-12 orang) standar ballroom hotel bintang 5 untuk gala dinner.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
      file: 'round-table-180cm.jpg'
    },
    {
      name: 'Skirting Meja 120x80 cm + Cover',
      slug: 'skirting-meja-120x80cm-cover',
      price: 80000,
      priceUnit: 'unit',
      categoryId: 'cat-meja',
      description: 'Meja registrasi 120x80 cm dengan balutan kain skirting lipat rempel rapi sampai lantai, melindungi kabel dan barang simpanan di bawah meja.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1431540015161-0bf866a2d407?q=80&w=800&auto=format&fit=crop',
      file: 'skirting-meja-cover.jpg'
    },
    {
      name: 'Meja IBM / Seminar 180x45 cm',
      slug: 'meja-ibm-seminar-180x45cm',
      price: 125000,
      priceUnit: 'unit',
      categoryId: 'cat-meja',
      description: 'Meja lipat seminar model IBM ukuran 180 x 45 cm praktis dan ramping untuk susunan kelas ruang konferensi, ujian, dan rapat kerja.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1431540015161-0bf866a2d407?q=80&w=800&auto=format&fit=crop',
      file: 'meja-ibm-seminar.jpg'
    },
    {
      name: 'Meja Taman Kayu Event',
      slug: 'meja-taman-kayu-event',
      price: 300000,
      priceUnit: 'unit',
      categoryId: 'cat-meja',
      description: 'Satu set meja makan kayu solid rustic menyatu dengan dua bangku panjang untuk konsep festival kuliner, gathering taman, dan pesta outdoor.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=800&auto=format&fit=crop',
      file: 'meja-taman-kayu.jpg'
    },

    // 9. Partisi R8
    {
      name: 'Booth Partisi R8 Standar',
      slug: 'booth-partisi-r8-standar',
      price: 80000,
      priceUnit: 'meter',
      categoryId: 'cat-partisi',
      description: 'Sistem partisi pameran modular aluminium R8 dengan panel laminasi putih rapi, tiang oktagonal, dan balok beam kokoh standar expo industri.',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
      file: 'booth-partisi-r8.jpg'
    },
    {
      name: 'Sekat Partisi R8 Panel',
      slug: 'sekat-partisi-r8-panel',
      price: 80000,
      priceUnit: 'meter',
      categoryId: 'cat-partisi',
      description: 'Panel sekat pembatas ruangan fleksibel sistem R8 untuk bilik ganti, ruang panitia, ruang penyimpanan sementara, dan koridor alur pameran.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
      file: 'sekat-partisi-r8.jpg'
    },

    // 10. AC Standing
    {
      name: 'AC Standing 5 PK',
      slug: 'ac-standing-5-pk',
      price: 650000,
      priceUnit: 'unit',
      categoryId: 'cat-pendingin',
      description: 'Pendingin ruangan AC standing floor kapasitas besar 5 PK pendinginan cepat bertenaga untuk tenda roder, hall tertutup, dan ballroom acara.',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop',
      file: 'ac-standing-5pk.jpg'
    },
    {
      name: 'AC Standing 3 PK',
      slug: 'ac-standing-3-pk',
      price: 600000,
      priceUnit: 'unit',
      categoryId: 'cat-pendingin',
      description: 'Unit AC standing floor 3 PK untuk ruangan transit, ruang ganti artis, holding room VIP, dan booth pameran berpenutup.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop',
      file: 'ac-standing-3pk.jpg'
    },

    // 11. Fan & Blower
    {
      name: 'Misty Fan / Kipas Embun Air',
      slug: 'misty-fan-kipas-embun',
      price: 300000,
      priceUnit: 'unit',
      categoryId: 'cat-pendingin',
      description: 'Kipas angin kabut air industrial dengan tangki penampung air internal. Menurunkan suhu area terbuka outdoor panas secara instan.',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop',
      file: 'misty-fan-embun.jpg'
    },
    {
      name: 'Blower Fan / Drum Fan Event',
      slug: 'blower-fan-drum-fan-event',
      price: 100000,
      priceUnit: 'unit',
      categoryId: 'cat-pendingin',
      description: 'Kipas blower tabung high-velocity bertenaga besar untuk sirkulasi udara panggung, pembuangan asap panggung, dan ventilasi tenda.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800&auto=format&fit=crop',
      file: 'blower-drum-fan.jpg'
    },

    // 12. HT
    {
      name: 'HT (Handie Talkie) Event',
      slug: 'ht-handie-talkie-event',
      price: 40000,
      priceUnit: 'unit',
      categoryId: 'cat-komunikasi',
      description: 'Perangkat Handy Talkie frekuensi jernih jarak jauh lengkap dengan headset earpiece spiral, charger docking, dan baterai cadangan untuk koordinasi kru.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=800&auto=format&fit=crop',
      file: 'ht-handie-talkie.jpg'
    },

    // 13. Queline
    {
      name: 'Queline Tiang Antrian Pita Sabuk',
      slug: 'queline-tiang-antrian-pita',
      price: 100000,
      priceUnit: 'unit',
      categoryId: 'cat-crowd',
      description: 'Tiang pembatas antrian stainless steel tebal dengan retractable belt pita tarik sabuk 2 meter (pilihan warna pita Merah / Biru / Hitam).',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop',
      file: 'queline-tiang-antrian.jpg'
    },

    // 14. Standrope
    {
      name: 'Standrope Tiang Antrian VIP Tali Bludru',
      slug: 'standrope-tiang-antrian-vip-bludru',
      price: 150000,
      priceUnit: 'unit',
      categoryId: 'cat-crowd',
      description: 'Tiang antrian eksklusif berlapis chrome/gold dengan kaitan tali bludru empuk mewah (Merah / Biru) untuk jalur karpet merah tamu kehormatan.',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
      file: 'standrope-tiang-bludru.jpg'
    },

    // 15. Lampu Cafe Gantung
    {
      name: 'Lampu Cafe Gantung / String Lights',
      slug: 'lampu-cafe-gantung-string-lights',
      price: 45000,
      priceUnit: 'meter',
      categoryId: 'cat-dekorasi',
      description: 'Untaian kabel lampu pijar warm white bergaya cafe/bistro vintage tahan cuaca luar ruangan. Menciptakan atmosfer hangat dan estetik di malam hari.',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop',
      file: 'lampu-cafe-gantung.jpg'
    },

    // 16. Backdrop Photowall
    {
      name: 'Backdrop Photowall Multiplex Custom',
      slug: 'backdrop-photowall-multiplex-custom',
      price: 200000,
      priceUnit: 'meter',
      categoryId: 'cat-dekorasi',
      description: 'Konstruksi dinding kayu multiplek rata kokoh siap pasang visual cetak vinyl high-resolution atau finishing cat untuk wall of fame & foto tamu.',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop',
      file: 'backdrop-photowall-multiplek.jpg'
    },

    // 17. Barricade
    {
      name: 'Barricade Konser / Pagar Pembatas Baja',
      slug: 'barricade-konser-pagar-pembatas',
      price: 60000,
      priceUnit: 'meter',
      categoryId: 'cat-keamanan',
      description: 'Barikade pagar pengaman baja/aluminium tipe mojo barricade dengan pijakan anti-tumbang untuk barisan depan panggung dan batas kerumunan konser.',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop',
      file: 'barricade-konser-baja.jpg'
    },

    // 18. Cable Protector
    {
      name: 'Cable Protector / Pelindung Kabel Lantai',
      slug: 'cable-protector-pelindung-kabel',
      price: 75000,
      priceUnit: 'meter',
      categoryId: 'cat-keamanan',
      description: 'Ramp pelindung kabel bahan karet heavy-duty berpenutup kuning cerah. Menjaga jalur kabel listrik panggung aman dari injakan massa dan kendaraan.',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800&auto=format&fit=crop',
      file: 'cable-protector-lantai.jpg'
    }
  ];

  console.log(`Starting download of ${rawProducts.length} product images...`);

  const insertProduct = db.prepare(`
    INSERT INTO Product (id, name, slug, price, priceUnit, description, image, featured, status, categoryId, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, datetime('now'), datetime('now'))
    ON CONFLICT(slug) DO UPDATE SET
      name=excluded.name,
      price=excluded.price,
      priceUnit=excluded.priceUnit,
      description=excluded.description,
      image=excluded.image,
      featured=excluded.featured,
      categoryId=excluded.categoryId,
      status='active',
      updatedAt=datetime('now')
  `);

  for (let i = 0; i < rawProducts.length; i++) {
    const p = rawProducts[i];
    const imagePath = await downloadImage(p.imageUrl, p.file);
    const id = `prod-${p.slug}`;
    insertProduct.run(
      id,
      p.name,
      p.slug,
      p.price,
      p.priceUnit,
      p.description,
      imagePath,
      p.featured ? 1 : 0,
      p.categoryId
    );
    console.log(`[${i + 1}/${rawProducts.length}] Inserted product: ${p.name}`);
  }

  const count = db.prepare('SELECT count(*) as total FROM Product').get();
  console.log(`Finished! Total products in dev.db: ${count.total}`);
}

run().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
