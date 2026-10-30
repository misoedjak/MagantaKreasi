const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'uploads', 'logos');

function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(targetDir, filename);
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'MagantaKreasiAssetDownloader/1.0 (https://magantakreasi.com; contact: dev@magantakreasi.com) Node.js/24.16',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': 'https://id.wikipedia.org/'
      }
    }, (res) => {
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
  });
}

const batch = [
  {
    name: 'CEDEA Seafood',
    file: 'cedea_official.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Logo_Cedea_Food.png'
  },
  {
    name: 'Willis Towers Watson (WTW)',
    file: 'wtw_official.png',
    url: 'https://upload.wikimedia.org/wikipedia/en/7/77/WTW_logo.png'
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
  for (const item of batch) {
    // Wait 3.5 seconds to ensure rate limit resets
    await new Promise(r => setTimeout(r, 3500));
    try {
      await downloadFile(item.url, item.file);
    } catch (e) {
      console.error(`[ERROR] ${item.name}: ${e.message}`);
    }
  }
}

run();
