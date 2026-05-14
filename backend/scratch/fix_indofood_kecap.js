const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.product.updateMany({
    where: { name: { contains: 'KECAP MANIS 60ML', mode: 'insensitive' } },
    data: { 
      description: 'Kecap manis dengan tekstur yang lebih smooth dan rasa manis yang legit. Kemasan saset kecil ini sangat praktis untuk kebutuhan dapur harian, bekal, atau porsi masak sekali pakai.' 
    }
  });
  console.log('Updated Indofood Kecap Manis 60ML:', result.count);
}

main().finally(() => prisma.$disconnect());
