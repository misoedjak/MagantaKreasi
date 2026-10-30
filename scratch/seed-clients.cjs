const Database = require('better-sqlite3');
const { randomUUID } = require('crypto');
const db = new Database('dev.db');

const clientsData = [
  {
    name: 'Universitas Indonesia',
    logoUrl: '/uploads/logos/ui_official.svg',
    order: 1,
    event: 'OKK UI & The 13th UI Music Fair',
    type: 'Festival & Concert Stage',
    feedback: 'Fabrikasi panggung konser akbar dan entrance gate gantry raksasa untuk menyambut ribuan mahasiswa dikerjakan dengan presisi tinggi, tepat jadwal, dan kokoh sesuai standar keamanan tertinggi kampus.',
    stat: '9.000+ Audience Capacity'
  },
  {
    name: 'Bintaro Jaya Xchange Mall',
    logoUrl: '/uploads/logos/bxc_official.svg',
    order: 2,
    event: 'Christmas Symphony Festival',
    type: '75 Custom Exhibition Booths',
    feedback: 'Pembangunan 75 booth pameran kuliner outdoor di BXc Park selesai sebelum jadwal pembukaan festival. Kualitas material kayu kokoh, instalasi kelistrikan aman, dan tahan cuaca selama 3 minggu event.',
    stat: '75 Custom Booths Installed'
  },
  {
    name: 'Otoritas Jasa Keuangan (OJK)',
    logoUrl: '/uploads/logos/ojk_official.png',
    order: 3,
    event: 'Diskusi Kelembagaan OJK & Komisi XI DPR RI',
    type: 'Giant Photowall & Stage Backdrop',
    feedback: 'Instalasi Giant Photowall Back-to-Back di Ballroom Park Hyatt Jakarta terpasang tegang sempurna tanpa kerutan dan mencerminkan kredibilitas institusi negara.',
    stat: 'Zero-Wrinkle Tension Fabric'
  },
  {
    name: 'DPR RI',
    logoUrl: '/uploads/logos/dpr_ri_official.svg',
    order: 4,
    event: 'Diskusi Kelembagaan OJK & DPR RI',
    type: 'State Institutional Forum',
    feedback: 'Eksekusi tata ruang dan backdrop panggung institusional berstandar VVIP dengan koordinasi lapangan yang responsif.',
    stat: 'VVIP Protocol Compliance'
  },
  {
    name: 'PT Astra Agro Lestari Tbk',
    logoUrl: '/uploads/logos/astra_official.svg',
    order: 5,
    event: 'HUT Ke-36 Astra Agro Gathering',
    type: 'Corporate Stage & Heavy Production',
    feedback: 'Proses technical check dan leveling konstruksi panggung berjalan sangat teliti. Eksekusi lighting dan visual megah menyempurnakan perayaan ulang tahun ke-36 perusahaan.',
    stat: '36th Anniversary Milestone'
  },
  {
    name: 'CEDEA Seafood',
    logoUrl: '/uploads/logos/cedea_official.png',
    order: 6,
    event: 'CEDEA 20th Anniversary "Together in Unity"',
    type: 'All-in-One Heavy Production',
    feedback: 'Maganta Kreasi membuktikan profesionalitas tinggi dalam membangun panggung utama dan seluruh totem signage dalam timeline yang sangat ketat dengan hasil berkelas.',
    stat: '20th Anniversary Stage'
  },
  {
    name: 'Sinarmas Sekuritas',
    logoUrl: '/uploads/logos/sinarmas_sekuritas_official.png',
    order: 7,
    event: 'SimInvest Fun Bike & Corporate Gathering',
    type: 'Start/Finish Gantry & Backdrop',
    feedback: 'Gerbang start/finish gantry megah di QBig BSD City sangat kokoh dan aman bagi ribuan pesepeda. Kemitraan jangka panjang bersama Maganta Kreasi selalu memuaskan.',
    stat: '3+ Annual Flagship Events'
  },
  {
    name: 'Kementerian PPN / Bappenas RI',
    logoUrl: '/uploads/logos/bappenas_official.png',
    order: 8,
    event: 'Musrenbangnas 2024 UMKM Expo',
    type: 'Expo Booth Construction & Landmark',
    feedback: 'Fabrikasi booth pameran UMKM nasional dan landmark panggung di Jakarta Convention Center (JCC) Senayan terselesaikan tepat waktu dengan kepatuhan standar protokoler ketat.',
    stat: 'National Ministry Expo'
  },
  {
    name: 'PergiKuliner',
    logoUrl: '/uploads/logos/pergikuliner_official.png',
    order: 9,
    event: 'Christmas Symphony Culinary Market',
    type: 'Culinary Festival Fabrication',
    feedback: 'Mitra fabrikasi terpercaya untuk rangkaian festival kuliner kami. Struktur tenda dan booth kayu mampu mengakomodasi kebutuhan puluhan tenant kuliner ternama dengan estetika hangat.',
    stat: '100+ Tenant Accommodated'
  },
  {
    name: 'Willis Towers Watson (WTW)',
    logoUrl: '/uploads/logos/wtw_official.png',
    order: 10,
    event: 'Indonesia Retirement Conference 2024',
    type: 'High-Level Conference Backdrop',
    feedback: 'Instalasi visual backdrop konferensi resmi dan landmark panggung di Park Hyatt Jakarta sangat rapi dan merefleksikan standar korporat konsultan global.',
    stat: 'Global Corporate Standard'
  },
  {
    name: 'InBody Indonesia',
    logoUrl: '/uploads/logos/inbody_official.png',
    order: 11,
    event: 'ISFEX 2024 @ JIExpo Kemayoran',
    type: 'Custom Exhibition Booth',
    feedback: 'Desain dan fabrikasi custom booth pameran kami di JIExpo Kemayoran tampil bersih, futuristik, dan sukses mengundang antrean panjang calon mitra industri kebugaran.',
    stat: 'Featured Expo Exhibitor'
  },
  {
    name: 'Sinemaku Pictures',
    logoUrl: '/uploads/logos/sinemaku_official.jpg',
    order: 12,
    event: 'Film "Perayaan Mati Rasa"',
    type: 'Artistic Circle Stage Set',
    feedback: 'Konstruksi Circle Stage untuk set film layar lebar memiliki presisi geometris dan detail finishing kayu yang sangat indah saat ditangkap oleh lensa kamera bioskop.',
    stat: 'Feature Film Studio Set'
  },
  {
    name: 'Indonesia International Motor Show (IIMS)',
    logoUrl: '/uploads/logos/iims_official.png',
    order: 13,
    event: 'IIMS 2026 @ JIExpo Kemayoran',
    type: 'Monumental Entrance Gate',
    feedback: 'Gerbang portal utama program resmi IIMS di JIExpo Kemayoran dibangun kokoh dan atraktif untuk menyambut ratusan ribu pengunjung pameran otomotif terbesar di Indonesia.',
    stat: 'National Auto Show Gate'
  },
  {
    name: 'Beam Mobility Indonesia',
    logoUrl: '/uploads/logos/beam_official.webp',
    order: 14,
    event: 'Launching Armada Beam Rover UI',
    type: 'Eco-Mobility Backdrop Frame',
    feedback: 'Backdrop pop-out bergradasi warna futuristik memperkuat citra modern armada sepeda listrik ramah lingkungan di lingkungan kampus UI.',
    stat: 'Sustainable Mobility Launch'
  },
  {
    name: 'Taman Mini Indonesia Indah (TMII)',
    logoUrl: '/uploads/logos/tmii_official.svg',
    order: 15,
    event: 'Revitalisasi Anjungan Papua TMII',
    type: 'Cultural Space Installation & Signage',
    feedback: 'Instalasi kayu alami berornamen etnik dan tata pencahayaan hangat menghidupkan kembali pesona budaya nusantara dengan sangat memukau.',
    stat: 'National Cultural Landmark'
  },
  {
    name: 'Asosiasi Kurator dan Pengurus Indonesia (AKPI)',
    logoUrl: '/uploads/logos/akpi_official.svg',
    order: 16,
    event: 'Seminar Nasional Restrukturisasi',
    type: 'Legal Seminar Stage & Photowall',
    feedback: 'Backdrop panggung utama dan photowall registrasi peserta tertata formal dan bersih untuk pertemuan advokat & kurator se-Indonesia.',
    stat: 'National Legal Summit'
  },
  {
    name: 'Akurat.co',
    logoUrl: '/uploads/logos/akurat_official.png',
    order: 17,
    event: 'Akurat Fest 2024 @ Pusenif Bandung',
    type: 'Festival Stage & Lighting Rigging',
    feedback: 'Panggung konser akbar dan rigging lighting outdoor di Lapangan Pusenif Bandung kokoh menghadapi cuaca ekstrem dan getaran sound bertenaga.',
    stat: 'Mega Outdoor Concert Stage'
  }
];

// Clean existing clients
db.prepare('DELETE FROM Client').run();

const insertStmt = db.prepare(`
  INSERT INTO Client (id, name, logoUrl, "order", event, type, feedback, stat, createdAt)
  VALUES (@id, @name, @logoUrl, @order, @event, @type, @feedback, @stat, @createdAt)
`);

const insertMany = db.transaction((clients) => {
  for (const c of clients) {
    insertStmt.run({
      id: randomUUID(),
      name: c.name,
      logoUrl: c.logoUrl,
      order: c.order,
      event: c.event,
      type: c.type,
      feedback: c.feedback,
      stat: c.stat,
      createdAt: new Date().toISOString()
    });
  }
});

insertMany(clientsData);

const count = db.prepare('SELECT count(*) as total FROM Client').get();
console.log(`Successfully seeded ${count.total} authentic official clients into dev.db!`);
