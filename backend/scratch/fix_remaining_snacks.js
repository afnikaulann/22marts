const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Fix Salmon
  await prisma.product.updateMany({
    where: { name: { contains: 'SALMON68', mode: 'insensitive' } },
    data: { description: 'Varian eksklusif dengan cita rasa premium bumbu salmon teriyaki. Memadukan keripik kentang flat ekstra tipis dengan rasa gurih, manis, dan smokey hidangan seafood ala restoran Jepang.' }
  });

  // Fix Oreo Berry 110
  await prisma.product.updateMany({
    where: { name: { contains: 'BERRY IC 110', mode: 'insensitive' } },
    data: { description: 'Biskuit Oreo legendaris dengan krim rasa es krim blueberry yang unik. Krimnya memberikan sensasi dingin (cooling effect) yang menyegarkan di lidah dengan perpaduan rasa manis dan asam buah beri yang khas.' }
  });

  // Fix Beng Beng Choco (check if another one exists)
  await prisma.product.updateMany({
    where: { name: { contains: 'Beng-Beng Choco 22 Gram', mode: 'insensitive' } },
    data: { description: 'Camilan sensasional empat lapis yang tak pernah salah. Memadukan wafer renyah, karamel kenyal, krim cokelat manis, dan taburan rice crispy garing yang dibalut cokelat susu tebal. Nikmat digigit langsung atau didinginkan di kulkas!' }
  });

  console.log('Fixed remaining snacks.');
}

main().finally(() => prisma.$disconnect());
