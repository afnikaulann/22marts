import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.category.update({
    where: { slug: 'ice-cream' },
    data: { 
      icon: null,
      thumbnail: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&h=600&fit=crop'
    }
  });
  console.log('Successfully updated Ice Cream category with realistic thumbnail:', result.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
