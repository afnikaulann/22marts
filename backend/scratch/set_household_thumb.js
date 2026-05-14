const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.category.update({
    where: { slug: 'kebutuhan-rumah-tangga' },
    data: { thumbnail: '/rumahtangga.png' }
  });
  console.log('Successfully set "Kebutuhan Rumah Tangga" to "/rumahtangga.png".');
}

main().finally(() => prisma.$disconnect());
