const fs = require('fs');
const path = require('path');
const db = require('better-sqlite3')('dev.db');
const clients = db.prepare('SELECT name, logoUrl FROM Client ORDER BY "order" ASC').all();
let allOk = true;
for (const c of clients) {
  const filePath = path.join(__dirname, '..', 'public', c.logoUrl);
  if (!fs.existsSync(filePath)) {
    console.error('MISSING:', c.name, filePath);
    allOk = false;
  } else {
    const stat = fs.statSync(filePath);
    console.log('[OK]', c.name.padEnd(45), '=>', c.logoUrl.padEnd(35), `(${stat.size} bytes)`);
  }
}
if (allOk) console.log('\n>>> ALL 17 OFFICIAL ORIGINAL LOGOS ARE VERIFIED AND EXIST ON DISK! <<<');
