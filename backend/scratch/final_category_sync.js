const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updates = [
    { slug: 'kebutuhan-rumah-tangga', thumb: '/rt.png' },
    { slug: 'minuman-dan-eskrim', thumb: '/minuman dan eskrim.png' },
    { slug: 'perawatan-diri-dan-kecantikan', thumb: '/perawatan diri dan kecantikan.png' },
    { slug: 'kebutuhan-bayi', thumb: '/kebutuhanbayi.png' },
    { slug: 'fresh-frozen-food', thumb: '/fresh.png' }
  ];

  for (const item of updates) {
    await prisma.category.updateMany({
      where: { slug: item.slug },
      data: { thumbnail: item.thumb }
    });
    console.log(`Updated ${item.slug} to ${item.thumb}`);
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
