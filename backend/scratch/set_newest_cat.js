const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.category.update({
    where: { slug: 'minuman-dan-eskrim' },
    data: { createdAt: new Date() }
  });
  console.log('Successfully set "Minuman dan Eskrim" as the newest category.');
}

main().finally(() => prisma.$disconnect());
