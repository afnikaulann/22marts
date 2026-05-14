const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const pdfText = fs.readFileSync('scratch/pdf_text.txt', 'utf-8');
    const lines = pdfText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    const keywords = [
        'TEBS', 'TEH BOTOL', 'TEH KOTAK', 'TEH PUCUK', 'ULTRA MILK', 'YAKULT', 
        'YOU C1000', 'WALLS', 'WAKU WAKU', 'AQUA', 'LE MINERALE', 'MILO', 
        'FLORIDINA', 'ES KRIM', 'ICE CREAM', 'SUSU', 'COFFEE', 'KOPI', 'JUS'
    ];
    const exclude = ['BOX', 'KARTON', 'ISI ', 'DUS', 'TOPLES', 'SET '];

    const drinkProducts = [];

    for (const line of lines) {
        const match = line.match(/(.+?)\s+([\d\.]+)\s*Rp/);
        if (match) {
            const name = match[1].trim();
            const priceStr = match[2].replace(/\./g, '');
            const price = parseInt(priceStr, 10);
            
            const isDrink = keywords.some(keyword => name.toUpperCase().includes(keyword));
            const isExcluded = exclude.some(ex => name.toUpperCase().includes(ex));

            if (isDrink && !isExcluded) {
                drinkProducts.push({ name, price });
            }
        }
        if (drinkProducts.length >= 30) break;
    }

    // Get or create category
    let category = await prisma.category.findFirst({
        where: { name: { contains: 'Minuman', mode: 'insensitive' } }
    });

    if (!category) {
        category = await prisma.category.create({
            data: {
                name: 'Minuman & Es Krim',
                slug: 'minuman-es-krim',
            }
        });
        console.log("Created category: Minuman & Es Krim");
    } else {
        console.log("Using category:", category.name);
    }

    // Insert products
    let insertedCount = 0;
    for (const p of drinkProducts) {
        const name = p.name;
        const price = p.price;
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);
        
        let description = `${name} yang menyegarkan untuk melepas dahaga Anda. Pilihan tepat untuk dinikmati kapan saja, baik dingin maupun biasa.`;
        
        if (name.includes('MILK') || name.includes('SUSU')) {
            description = `Susu ${name} yang kaya akan nutrisi dan kalsium. Pilihan sehat dan lezat untuk mendukung aktivitas harian Anda dan keluarga.`;
        } else if (name.includes('ICE CREAM') || name.includes('ES KRIM') || name.includes('WALLS') || name.includes('WAKU WAKU')) {
            description = `Es krim ${name} dengan rasa yang manis dan tekstur yang lembut. Camilan dingin yang sempurna untuk mencerahkan hari Anda.`;
        } else if (name.includes('COFFEE') || name.includes('KOPI')) {
            description = `Kopi ${name} dengan aroma yang mantap dan rasa yang khas. Cocok bagi Anda pecinta kopi untuk memulai hari dengan semangat.`;
        } else if (name.includes('TEH') || name.includes('TEA')) {
            description = `Teh ${name} pilihan dengan rasa yang autentik dan menyegarkan. Nikmati sensasi teh asli di setiap tegukannya.`;
        }

        const exists = await prisma.product.findFirst({ where: { name: name } });
        if (!exists) {
            await prisma.product.create({
                data: {
                    name: name,
                    slug: slug,
                    price: price,
                    description: description,
                    stock: 200,
                    thumbnail: '/minuman/placeholder.png',
                    categoryId: category.id,
                    isActive: true
                }
            });
            console.log(`Inserted: ${name} (Rp ${price})`);
            insertedCount++;
        } else {
            console.log(`Skipped (already exists): ${name}`);
        }
    }

    console.log(`Successfully processed ${drinkProducts.length} items. Inserted ${insertedCount} new products.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
