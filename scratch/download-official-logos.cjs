const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'uploads', 'logos');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(targetDir, filename);
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': 'https://www.google.com/'
      }
    }, (res) => {
      // Handle redirect
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const u = new URL(url);
          redirectUrl = `${u.protocol}//${u.host}${redirectUrl}`;
        }
        return downloadFile(redirectUrl, filename).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: HTTP ${res.statusCode}`));
      }

      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        const stat = fs.statSync(dest);
        console.log(`[SUCCESS] Downloaded ${filename} (${stat.size} bytes) from ${url}`);
        resolve({ filename, size: stat.size, url });
      });
      fileStream.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

// Download list with delays to avoid 429
const downloads = [
  {
    name: 'Universitas Indonesia',
    file: 'ui_official.svg',
    url: 'https://upload.wikimedia.org/wikipedia/id/d/da/Universitas_Indonesia_logo.svg'
  },
  {
    name: 'Otoritas Jasa Keuangan (OJK)',
    file: 'ojk_official.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/83/OJK_Logo.png'
  },
  {
    name: 'Kementerian PPN / Bappenas RI',
    file: 'bappenas_official.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Logo_Kementerian_PPN-Bappenas_%282023%29.png'
  },
  {
    name: 'DPR RI (Dewan Perwakilan Rakyat RI)',
    file: 'dpr_ri_official.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Coat_of_arms_of_the_People%27s_Representative_Council_of_Indonesia.svg'
  },
  {
    name: 'Astra International / Astra Agro',
    file: 'astra_official.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/ASTRA_international.svg'
  },
  {
    name: 'Sinarmas Sekuritas / SimInvest',
    file: 'sinarmas_sekuritas_official.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Logo_Sinarmas_Sekuritas.png'
  },
  {
    name: 'InBody Indonesia',
    file: 'inbody_official.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/InBody_logo_2.png'
  },
  {
    name: 'Willis Towers Watson (WTW)',
    file: 'wtw_official.png',
    url: 'https://upload.wikimedia.org/wikipedia/en/7/77/WTW_logo.png'
  },
  {
    name: 'CEDEA Seafood',
    file: 'cedea_official.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Logo_Cedea_Food.png'
  },
  {
    name: 'Taman Mini Indonesia Indah (TMII)',
    file: 'tmii_official.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/TMII_Logo.svg'
  },
  {
    name: 'Sinemaku Pictures',
    file: 'sinemaku_official.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/id/7/75/Sinemaku_Pictures_Logo.jpg'
  }
];

async function run() {
  for (const item of downloads) {
    try {
      await downloadFile(item.url, item.file);
    } catch (e) {
      console.error(`[ERROR] ${item.name}: ${e.message}`);
    }
    // sleep 600ms between downloads to avoid rate limits
    await new Promise(r => setTimeout(r, 600));
  }
}

run();
