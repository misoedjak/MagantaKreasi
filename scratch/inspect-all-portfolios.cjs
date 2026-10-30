const Database = require('better-sqlite3');
const db = new Database('dev.db');

const portfolios = db.prepare('SELECT id, title, slug, client, location, description FROM Portfolio').all();
console.log('TOTAL PORTFOLIOS:', portfolios.length);
portfolios.forEach((p, i) => {
  console.log(`[${i+1}] Title: ${p.title}`);
  console.log(`    Slug: ${p.slug}`);
  console.log(`    Client: ${p.client}`);
  console.log(`    Location: ${p.location}`);
  console.log(`    Description: ${p.description.substring(0, 100)}...`);
});
