const db = require('better-sqlite3')('dev.db');
const portfolios = db.prepare("SELECT client, slug, title FROM Portfolio WHERE status = 'published'").all();
const clients = [
  'Universitas Indonesia',
  'Bintaro Jaya Xchange Mall',
  'Otoritas Jasa Keuangan (OJK)',
  'DPR RI',
  'PT Astra Agro Lestari Tbk',
  'CEDEA Seafood',
  'Sinarmas Sekuritas',
  'Kementerian PPN / Bappenas RI',
  'PergiKuliner',
  'Willis Towers Watson (WTW)',
  'InBody Indonesia',
  'Sinemaku Pictures',
  'Indonesia International Motor Show (IIMS)',
  'Beam Mobility Indonesia',
  'Taman Mini Indonesia Indah (TMII)',
  'Asosiasi Kurator dan Pengurus Indonesia (AKPI)',
  'Akurat.co'
];

for (const c of clients) {
  const cLower = c.toLowerCase();
  const match = portfolios.find(p => {
    if (!p.client) return false;
    const pLower = p.client.toLowerCase();
    return pLower === cLower || pLower.includes(cLower) || cLower.includes(pLower);
  });
  console.log(c, '=>', match ? `${match.slug} (${match.title})` : 'NO MATCH');
}
