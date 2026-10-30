const Database = require('better-sqlite3');
const db = new Database('dev.db');

console.log('--- ALL PORTFOLIOS ---');
const portfolios = db.prepare('SELECT id, title, slug, client, location, description FROM Portfolio').all();
console.log(JSON.stringify(portfolios, null, 2));

console.log('--- CLIENTS FROM PORTFOLIO ---');
const clientsInPortfolio = db.prepare('SELECT DISTINCT client FROM Portfolio WHERE client IS NOT NULL').all();
console.log(clientsInPortfolio);
