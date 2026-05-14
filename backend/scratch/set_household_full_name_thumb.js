const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.category.update({
    where: { slug: 'kebutuhan-rumah-tangga' },
    data: { thumbnail: '/kebutuhan rumah tangga.png' }
  });
  console.log('Successfully set "Kebutuhan Rumah Tangga" to "/kebutuhan rumah tangga.png".');
}

main().finally(() => prisma.$disconnect());
