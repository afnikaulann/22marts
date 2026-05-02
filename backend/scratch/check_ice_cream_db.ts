import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.findUnique({
    where: { slug: 'ice-cream' }
  });
  console.log('Current Ice Cream Category in DB:', JSON.stringify(category, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
