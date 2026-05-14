const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const categories = await prisma.category.findMany({
    where: {
      slug: { in: ['minuman-dan-eskrim', 'ice-cream'] }
    },
    include: {
      products: true
    }
  });

  const allProducts = [];
  for (const cat of categories) {
    cat.products.forEach(p => {
      allProducts.push({
        id: p.id,
        name: p.name,
        category: cat.name,
        description: p.description
      });
    });
  }
  
  fs.writeFileSync('scratch/products_data.json', JSON.stringify(allProducts, null, 2));
  console.log(`Saved ${allProducts.length} products to scratch/products_data.json`);
}

main().finally(() => prisma.$disconnect());
