const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    where: {
      name: { contains: 'Frostbite', mode: 'insensitive' }
    }
  });

  for (const p of products) {
    if (p.name.toUpperCase().includes('KOPI JELLY GULA AREN')) {
      await prisma.product.update({
        where: { id: p.id },
        data: {
          description: 'Minuman kopi dengan kombinasi jelly dan manis gula aren yang memberikan sensasi unik dan menyegarkan di setiap tegukan. Cocok dinikmati dingin sebagai teman santai maupun pelepas dahaga saat beraktivitas.'
        }
      });
      console.log(`Updated Frostbite: ${p.name}`);
    }
  }
}

main().finally(() => prisma.$disconnect());
