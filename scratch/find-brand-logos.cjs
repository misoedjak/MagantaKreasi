const https = require('https');
const http = require('http');

async function checkUrl(url, headers = {}) {
  return new Promise((resolve) => {
    try {
      const client = url.startsWith('https') ? https : http;
      const req = client.request(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0', ...headers } }, (res) => {
        resolve({ status: res.statusCode, contentType: res.headers['content-type'], url });
      });
      req.on('error', () => resolve({ status: 500, url }));
      req.setTimeout(5000, () => { req.destroy(); resolve({ status: 408, url }); });
      req.end();
    } catch (e) {
      resolve({ status: 500, url });
    }
  });
}

async function main() {
  const candidates = [
    // Brandfetch or clearbit CDN logos for brands
    'https://asset.brandfetch.io/id8yG5k4-q/idW-MvjJ6Q.svg', // Beam
    'https://asset.brandfetch.io/id8yG5k4-q/id_zG6zEeb.png',
    'https://asset.brandfetch.io/id2J-7bX_g/idyqLSmB_O.png', // PergiKuliner
    'https://pergikuliner.com/assets/logo-b94d1b8c199bb6431952a2333796d10c.png',
    'https://asset.brandfetch.io/ide-0rOa85/idD7H_p7e5.png', // Cedea
    'https://cedeaseafood.com/wp-content/uploads/2021/04/Logo-Cedea.png',
    'https://cedeaseafood.com/wp-content/themes/cedea/images/logo.png',
    'https://asset.brandfetch.io/id1oR_aFm_/idv-d4o_Yv.png', // BXc Mall / Bintaro Jaya
    'https://bintarojayaxchange.com/wp-content/uploads/2021/08/logo-bxc.png',
    'https://upload.wikimedia.org/wikipedia/commons/b/bd/TMII_Logo.svg',
    'https://upload.wikimedia.org/wikipedia/id/d/da/Universitas_Indonesia_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/8/83/OJK_Logo.png',
    'https://upload.wikimedia.org/wikipedia/commons/0/0b/Logo_Kementerian_PPN-Bappenas_%282023%29.png',
    'https://upload.wikimedia.org/wikipedia/commons/9/96/Coat_of_arms_of_the_People%27s_Representative_Council_of_Indonesia.svg',
    'https://upload.wikimedia.org/wikipedia/commons/1/14/ASTRA_international.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/42/Logo_Sinarmas_Sekuritas.png',
    'https://upload.wikimedia.org/wikipedia/commons/b/b5/InBody_logo_2.png',
    'https://upload.wikimedia.org/wikipedia/en/7/77/WTW_logo.png'
  ];

  for (const c of candidates) {
    const res = await checkUrl(c);
    console.log(`${res.status} | ${res.contentType} | ${c}`);
  }
}

main();
