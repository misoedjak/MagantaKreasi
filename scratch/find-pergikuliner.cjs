const https = require('https');

https.get('https://pergikuliner.com', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    // find link rel or script or img
    const regex = /([^"'\s]+\.(png|svg|jpg|jpeg|webp))/gi;
    const matches = [...new Set(d.match(regex) || [])];
    console.log('Images on pergikuliner.com:');
    console.log(matches.filter(m => m.includes('logo') || m.includes('brand') || m.includes('header')));
  });
});
