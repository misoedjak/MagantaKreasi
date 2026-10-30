const https = require('https');

https.get('https://play.google.com/store/apps/details?id=com.androidpk.pergikuliner', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/https:\/\/play-lh\.googleusercontent\.com\/[^"'\s=]+/g) || [];
    console.log('Matches:', [...new Set(matches)]);
  });
});
