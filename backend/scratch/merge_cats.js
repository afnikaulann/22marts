const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const sourceCategoryId = 'cmp3qogtp0000y940am8ichi9'; // Mie Instant (new)
  const targetCategoryId = 'cmo8u3zk0000e59doijz8m0h5'; // Mie Instan (old)

  console.log("Moving products...");
  
  // Update products
  const updateResult = await prisma.product.updateMany({
    where: { categoryId: sourceCategoryId },
    data: { categoryId: targetCategoryId }
  });

  console.log(`Moved ${updateResult.count} products from 'Mie Instant' to 'Mie Instan'.`);

  // Delete the newly created category
  await prisma.category.delete({
    where: { id: sourceCategoryId }
  });

  console.log("Deleted duplicate 'Mie Instant' category.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
