const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'uploads', 'logos');

function download(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
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
    await download('https://upload.wikimedia.org/wikipedia/commons/b/b8/Bintaro-jaya-logo.svg', 'bxc_official.svg');
    console.log('Downloaded bxc_official.svg');
  } catch (e) {
    console.error('BXc error:', e.message);
  }

  try {
    await download('https://iims-23.s3.ap-southeast-1.amazonaws.com/2024/image/LOGO+IIMS-01.png', 'iims_official.png');
    console.log('Downloaded iims_official.png');
  } catch (e) {
    console.error('IIMS error:', e.message);
  }

  try {
    await download('https://akpi.or.id/_next/static/media/logo-akpi-blue.2kt8tprxlwji7.svg', 'akpi_official.svg');
    console.log('Downloaded akpi_official.svg');
  } catch (e) {
    console.error('AKPI error:', e.message);
  }
}

run();
