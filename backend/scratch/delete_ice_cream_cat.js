const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cat = await prisma.category.findUnique({
    where: { slug: 'ice-cream' },
    include: { products: true }
  });

  if (!cat) {
    console.log('Category "ice-cream" not found.');
    return;
  }

  if (cat.products.length > 0) {
    console.log(`Warning: Category still has ${cat.products.length} products. Moving them to "minuman-dan-eskrim" first...`);
    const targetCat = await prisma.category.findUnique({ where: { slug: 'minuman-dan-eskrim' } });
    if (targetCat) {
        await prisma.product.updateMany({
            where: { categoryId: cat.id },
            data: { categoryId: targetCat.id }
        });
    }
  }

  await prisma.category.delete({
    where: { id: cat.id }
  });

  console.log('Successfully deleted "Ice Cream" category.');
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
