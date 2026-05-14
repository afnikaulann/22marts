const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.category.update({
    where: { slug: 'kebutuhan-rumah-tangga' },
    data: { thumbnail: null }
  });
  console.log('Cleared manual thumbnail for "Kebutuhan Rumah Tangga".');
}

main().finally(() => prisma.$disconnect());
