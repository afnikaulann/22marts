const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const data = JSON.parse(fs.readFileSync('scratch/beauty_batch.json', 'utf8'));

    // Get or create category
    let category = await prisma.category.findFirst({
        where: { name: { contains: 'Perawatan Diri', mode: 'insensitive' } }
    });

    if (!category) {
        category = await prisma.category.create({
            data: {
                name: 'Perawatan Diri & Kecantikan',
                slug: 'perawatan-diri-kecantikan',
            }
        });
    }

    // Insert
    let count = 0;
    for (const p of data) {
        if (!p.image_path) continue; // skip if no image

        const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
        
        // Ensure not exist
        const exists = await prisma.product.findFirst({ where: { name: p.name } });
        if (!exists) {
            await prisma.product.create({
                data: {
                    name: p.name,
                    slug: slug,
                    price: p.price,
                    description: `Pilihan terbaik untuk perawatan Anda. ${p.name} kini tersedia untuk membantu menjaga penampilan dan kesehatan kulit/tubuh Anda setiap hari.`,
                    stock: 50,
                    thumbnail: p.image_path,
                    categoryId: category.id,
                    isActive: true
                }
            });
            count++;
        }
    }
    console.log(`Inserted ${count} real beauty products!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
