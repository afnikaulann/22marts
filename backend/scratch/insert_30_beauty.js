const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 1. Read the extracted products
    const allProducts = JSON.parse(fs.readFileSync('scratch/beauty_products.json', 'utf8'));
    
    // 2. Take the first 30 products
    const targetProducts = allProducts.slice(0, 30);
    
    // 3. Get or create category
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
        console.log("Created category: Perawatan Diri & Kecantikan");
    } else {
        console.log("Using category:", category.name);
    }

    // 4. Insert products
    let insertedCount = 0;
    for (const p of targetProducts) {
        const name = p.name;
        const price = p.price;
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);
        
        // Generate description
        let description = `Produk ${name} berkualitas tinggi untuk menunjang perawatan diri dan kecantikan Anda. Dirancang khusus untuk memberikan hasil yang optimal dan menjaga kesehatan kulit atau rambut Anda.`;
        
        if (name.includes('SERUM')) {
            description = `Serum ${name} dengan formula intensif yang meresap hingga ke lapisan kulit terdalam. Membantu menutrisi, mencerahkan, dan menjaga elastisitas kulit wajah Anda agar tampak lebih sehat dan bercahaya.`;
        } else if (name.includes('SOAP') || name.includes('SABUN') || name.includes('BW') || name.includes('BF')) {
            description = `Sabun pembersih ${name} yang efektif mengangkat kotoran dan kuman. Memberikan sensasi kesegaran yang tahan lama sekaligus menjaga kelembapan alami kulit agar tetap lembut dan tidak kering.`;
        } else if (name.includes('SHP') || name.includes('SHAMPOO')) {
            description = `Shampoo ${name} yang diformulasikan khusus untuk merawat kesehatan rambut dan kulit kepala. Membantu rambut tampak lebih kuat, berkilau, dan mudah diatur setiap hari.`;
        } else if (name.includes('MASK')) {
            description = `Masker wajah ${name} yang memberikan hidrasi instan dan nutrisi maksimal pada kulit. Gunakan secara rutin untuk hasil kulit yang lebih halus, segar, dan tampak lebih muda.`;
        }

        // Check if exists
        const exists = await prisma.product.findFirst({ where: { name: name } });
        if (!exists) {
            await prisma.product.create({
                data: {
                    name: name,
                    slug: slug,
                    price: price,
                    description: description,
                    stock: 50,
                    thumbnail: '/perawatan/placeholder.png', // User will replace manually
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

    console.log(`Successfully processed ${targetProducts.length} items. Inserted ${insertedCount} new products.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
