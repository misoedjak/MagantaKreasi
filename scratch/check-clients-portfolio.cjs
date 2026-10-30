const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const clients = await prisma.client.findMany();
  console.log('CURRENT CLIENTS COUNT:', clients.length);
  console.log('CURRENT CLIENTS:', JSON.stringify(clients, null, 2));

  const portfolios = await prisma.portfolio.findMany({
    select: {
      id: true,
      title: true,
      client: true,
      location: true,
      year: true,
      description: true,
      category: { select: { name: true } }
    }
  });
  console.log('CURRENT PORTFOLIOS COUNT:', portfolios.length);
  console.log('PORTFOLIOS:', JSON.stringify(portfolios, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
