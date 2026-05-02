import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.category.update({
    where: { slug: 'ice-cream' },
    data: { 
      thumbnail: null
    }
  });
  console.log('Reset Ice Cream category thumbnail to null:', result.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
