const https = require('https');

function getHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function findLogos() {
  try {
    const html = await getHtml('https://pergikuliner.com');
    const matches = html.match(/src="([^"]*logo[^"]*)"/gi) || [];
    console.log('Pergikuliner logo matches:', matches);
  } catch (e) {
    console.error('Pergikuliner error:', e.message);
  }

  try {
    const htmlAkurat = await getHtml('https://akurat.co');
    const matchesAkurat = htmlAkurat.match(/src="([^"]*logo[^"]*)"/gi) || [];
    console.log('Akurat logo matches:', matchesAkurat);
  } catch (e) {
    console.error('Akurat error:', e.message);
  }

  try {
    const htmlBeam = await getHtml('https://www.ridebeam.com');
    const matchesBeam = htmlBeam.match(/src="([^"]*logo[^"]*)"/gi) || [];
    console.log('Beam logo matches:', matchesBeam);
  } catch (e) {
    console.error('Beam error:', e.message);
  }
}

findLogos();
