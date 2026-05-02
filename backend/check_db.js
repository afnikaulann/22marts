const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const promos = await prisma.promo.findMany({
      include: { products: true }
    });
    console.log('Success! Products relation exists.');
  } catch (e) {
    console.error('Error! Products relation likely missing or DB error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
