const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Descriptions for the unintendedly updated products
const fixMap = [
  {
    names: ['BIOAQUA'],
    desc: 'Serum perawatan kulit dari Bioaqua yang membantu menjaga kelembapan dan kesehatan kulit Anda.'
  },
  {
    names: ['INDOMIE'],
    desc: 'Mie instan favorit dengan bumbu khas yang lezat dan praktis disajikan.'
  }
];

// Refined description map for Minuman & Es Krim
const descriptionMap = [
  {
    names: [/^Aice Bingo Chocolate/i, /^Aice Chocolate Crispy/i, /^Aice Chocolate Max/i, /^Aice Choco Malt/i, /^Aice Durian Cup/i, /^Aice Mochi Chocolate/i, /^AICE MOCHI COKLAT/i, /^Aice Strawberry/i],
    desc: 'Nikmati kelezatan es krim Aice dengan rasa yang unik dan tekstur yang memuaskan.' // Default for these
  },
  // I will use exact matches or better regex to avoid partial matches like 'ADE' in 'BANGLADESH'
  {
    pattern: /\bAQUA\b/i,
    desc: 'Air mineral murni dari sumber pegunungan alami yang terjaga keasliannya. Melalui proses filtrasi alami untuk memastikan setiap tetesnya memberikan hidrasi sehat bagi tubuh Anda.'
  },
  {
    pattern: /\bADES\b/i,
    desc: 'Air mineral jernih yang diproses dengan teknologi tinggi untuk menjaga kemurniannya. Kemasan botolnya yang ramah lingkungan mudah diremukkan setelah digunakan.'
  }
  // ... and so on
];

async function main() {
  // Re-run with better matching to fix and apply correct ones
  const products = await prisma.product.findMany();
  
  for (const product of products) {
    // Fix BIOAQUA and INDOMIE first
    if (product.name.toUpperCase().includes('BIOAQUA')) {
        await prisma.product.update({
            where: { id: product.id },
            data: { description: 'Produk perawatan kulit berkualitas dari Bioaqua untuk menjaga kecantikan dan kesehatan kulit Anda secara optimal.' }
        });
        console.log(`Fixed: ${product.name}`);
        continue;
    }
    if (product.name.toUpperCase().includes('INDOMIE')) {
        await prisma.product.update({
            where: { id: product.id },
            data: { description: 'Mie instan legendaris dengan cita rasa bumbu yang khas dan menggugah selera, praktis untuk dinikmati kapan saja.' }
        });
        console.log(`Fixed: ${product.name}`);
        continue;
    }
    
    // I'll just redo the specific ones for Minuman and Es Krim with better matching
  }
}

// Actually, I'll just write a cleaner script that only targets the correct categories.
