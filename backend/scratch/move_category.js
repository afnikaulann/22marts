const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany();
  
  const sourceCategory = categories.find(c => c.name.toLowerCase().includes('aksesoris elektronik') || c.name.toLowerCase().includes('elektronik'));
  const targetCategory = categories.find(c => c.name.toLowerCase().includes('kebutuhan rumah tangga') || c.name.toLowerCase().includes('rumah tangga'));

  if (!sourceCategory) {
    console.log("Could not find source category (aksesoris elektronik). Available categories:");
    console.log(categories.map(c => c.name).join(', '));
    return;
  }

  if (!targetCategory) {
    console.log("Could not find target category (kebutuhan rumah tangga). Available categories:");
    console.log(categories.map(c => c.name).join(', '));
    return;
  }

  console.log(`Moving products from '${sourceCategory.name}' (${sourceCategory.id}) to '${targetCategory.name}' (${targetCategory.id})`);

  // Count products before moving
  const productsToMove = await prisma.product.count({
    where: { categoryId: sourceCategory.id }
  });

  console.log(`Found ${productsToMove} products to move.`);

  if (productsToMove > 0) {
    const updateResult = await prisma.product.updateMany({
      where: { categoryId: sourceCategory.id },
      data: { categoryId: targetCategory.id }
    });
    console.log(`Successfully moved ${updateResult.count} products.`);
  } else {
    console.log("No products to move.");
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
