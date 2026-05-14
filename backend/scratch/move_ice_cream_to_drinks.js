const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const sourceCat = await prisma.category.findUnique({
    where: { slug: 'ice-cream' }
  });

  const targetCat = await prisma.category.findUnique({
    where: { slug: 'minuman-dan-eskrim' }
  });

  if (!sourceCat || !targetCat) {
    console.error('Source or target category not found.');
    return;
  }

  const updatedProducts = await prisma.product.updateMany({
    where: { categoryId: sourceCat.id },
    data: { categoryId: targetCat.id }
  });

  console.log(`Successfully moved ${updatedProducts.count} products from "Ice Cream" to "Minuman dan Eskrim".`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
