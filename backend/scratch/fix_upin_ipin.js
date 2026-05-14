const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.product.updateMany({
    where: { name: { contains: 'UPIN IPIN', mode: 'insensitive' } },
    data: { 
      description: 'Es krim favorit anak-anak dengan rasa manis lezat dan karakter Upin Ipin yang menarik. Memiliki tekstur lembut dan sensasi dingin menyegarkan, cocok dinikmati sebagai camilan seru saat bermain maupun bersantai.' 
    }
  });
  console.log('Updated Upin Ipin:', result.count);
}

main().finally(() => prisma.$disconnect());
