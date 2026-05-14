const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.category.update({
    where: { slug: 'kebutuhan-rumah-tangga' },
    data: { thumbnail: '/rt.png' }
  });
  console.log('Successfully set "Kebutuhan Rumah Tangga" to "/rt.png".');
}

main().finally(() => prisma.$disconnect());
