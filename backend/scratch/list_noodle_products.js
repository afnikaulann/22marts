const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.findUnique({
    where: { slug: 'mie-instan' },
    include: { products: true }
  });

  if (!category) {
    console.log('Category "Mie Instant" not found.');
    return;
  }

  console.log(`\nProducts in "${category.name}":`);
  category.products.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name}`);
  });
}

main().finally(() => prisma.$disconnect());
