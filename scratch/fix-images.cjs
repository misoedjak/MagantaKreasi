const fs = require('fs');
const path = require('path');
const db = require('better-sqlite3')('dev.db');

const dir = path.join(__dirname, '..', 'public', 'uploads', 'products');

if (fs.existsSync(path.join(dir, 'genset-silent-40kva.jpg'))) {
  ['genset-silent-60kva.jpg', 'genset-silent-100kva.jpg', 'genset-silent-200kva.jpg'].forEach(f => {
    fs.copyFileSync(path.join(dir, 'genset-silent-40kva.jpg'), path.join(dir, f));
  });
}
if (fs.existsSync(path.join(dir, 'round-table-160cm.jpg'))) {
  ['skirting-meja-cover.jpg', 'meja-ibm-seminar.jpg'].forEach(f => {
    fs.copyFileSync(path.join(dir, 'round-table-160cm.jpg'), path.join(dir, f));
  });
}
if (fs.existsSync(path.join(dir, 'bar-stool-chair.jpg'))) {
  fs.copyFileSync(path.join(dir, 'bar-stool-chair.jpg'), path.join(dir, 'bean-bag-event.jpg'));
}

const prods = db.prepare('SELECT id, slug, image FROM Product').all();
const update = db.prepare('UPDATE Product SET image = ? WHERE id = ?');

for (const p of prods) {
  if (p.image && p.image.startsWith('http')) {
    // Find matching local file
    const files = fs.readdirSync(dir);
    const prefix = p.slug.split('-')[0];
    const match = files.find(f => f.startsWith(prefix)) || files[0];
    update.run(`/uploads/products/${match}`, p.id);
  }
}

const count = db.prepare("SELECT count(*) as count FROM Product WHERE image LIKE '/uploads/products/%'").get();
console.log(`Local product images verified: ${count.count} of ${prods.length}`);
