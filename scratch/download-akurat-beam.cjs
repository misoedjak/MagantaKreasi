const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'uploads', 'logos');

function download(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, filename).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`${url} status ${res.statusCode}`));
      const file = fs.createWriteStream(path.join(targetDir, filename));
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(filename); });
    }).on('error', reject);
  });
}

async function run() {
  try {
    await download('https://akurat.sgp1.cdn.digitaloceanspaces.com/dev-sites/20260201-21557452793-0-akurat-logo.png', 'akurat_official.png');
    console.log('Downloaded akurat_official.png');
  } catch (e) {
    console.error('Akurat error:', e.message);
  }

  try {
    await download('https://cdn.prod.website-files.com/6359ec4f04fcf66992b2006a/6359eec91f520c24c94cba4e_beam-logo%402x.webp', 'beam_official.webp');
    console.log('Downloaded beam_official.webp');
  } catch (e) {
    console.error('Beam error:', e.message);
  }
}

run();
