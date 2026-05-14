const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const pdfText = fs.readFileSync('scratch/pdf_text.txt', 'utf-8');
    const lines = pdfText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    const keywords = [
        'TIC TAC', 'TINI WINI BITI', 'TOBELO', 'TOFU', 'TOGO', 'TOP DELFI', 
        'TOP WAFER', 'TOPPO', 'TRICKS', 'TWISTER', 'WALENS', 'YUPI', 'OREO',
        'CHITATO', 'POTABEE', 'QTELA', 'TANGO', 'BENG BENG', 'SILVERQUEEN'
    ];
    const exclude = ['BOX', 'KARTON', 'ISI ', 'DUS', 'TOPLES'];

    const snackProducts = [];

    for (const line of lines) {
        const match = line.match(/(.+?)\s+([\d\.]+)\s*Rp/);
        if (match) {
            const name = match[1].trim();
            const priceStr = match[2].replace(/\./g, '');
            const price = parseInt(priceStr, 10);
            
            const isSnack = keywords.some(keyword => name.toUpperCase().includes(keyword));
            const isExcluded = exclude.some(ex => name.toUpperCase().includes(ex));

            if (isSnack && !isExcluded) {
                snackProducts.push({ name, price });
            }
        }
        if (snackProducts.length >= 30) break;
    }

    // Get or create category
    let category = await prisma.category.findFirst({
        where: { name: { contains: 'Snack', mode: 'insensitive' } }
    });

    if (!category) {
        category = await prisma.category.create({
            data: {
                name: 'Snack',
                slug: 'snack',
            }
        });
        console.log("Created category: Snack");
    } else {
        console.log("Using category:", category.name);
    }

    // Insert products
    let insertedCount = 0;
    for (const p of snackProducts) {
        const name = p.name;
        const price = p.price;
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);
        
        let description = `Camilan ${name} yang lezat dan renyah. Sangat cocok menemani waktu santai Anda bersama teman dan keluarga.`;
        
        if (name.includes('COKELAT') || name.includes('CHOCO')) {
            description = `Nikmati manisnya ${name} dengan cokelat pilihan yang lumer di mulut. Camilan favorit untuk membangkitkan mood Anda setiap hari.`;
        } else if (name.includes('KERIPIK') || name.includes('CHIPS')) {
            description = `Keripik ${name} yang gurih dan garing. Dibuat dari bahan pilihan dengan bumbu yang meresap sempurna di setiap kepingnya.`;
        } else if (name.includes('PERMEN') || name.includes('YUPI') || name.includes('GUMMY')) {
            description = `Permen ${name} dengan tekstur kenyal dan rasa buah yang segar. Camilan manis yang disukai anak-anak maupun dewasa.`;
        }

        const exists = await prisma.product.findFirst({ where: { name: name } });
        if (!exists) {
            await prisma.product.create({
                data: {
                    name: name,
                    slug: slug,
                    price: price,
                    description: description,
                    stock: 100,
                    thumbnail: '/snack/placeholder.png',
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

    console.log(`Successfully processed ${snackProducts.length} items. Inserted ${insertedCount} new products.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
