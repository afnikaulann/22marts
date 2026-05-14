const fs = require('fs');
const https = require('https');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

async function main() {
    // 1. Create directory if not exists
    const dir = path.join(__dirname, '../../frontend/public/perawatan');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    const productName = "SKINTIFIC 3% TRANEXAMIE SERUM";
    const price = 151000;
    const fileName = `${productName}.png`;
    const filePath = path.join(dir, fileName);

    console.log(`Downloading dummy image for ${productName}...`);
    // Download a placeholder image with the product name written on it
    const url = `https://placehold.co/500x500/fca5a5/white.png?text=SKINTIFIC%5CnSERUM`;
    
    await new Promise((resolve, reject) => {
        https.get(url, (res) => {
            const fileStream = fs.createWriteStream(filePath);
            res.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                console.log('Image downloaded successfully.');
                resolve();
            });
        }).on('error', (err) => {
            console.error('Error downloading:', err);
            reject(err);
        });
    });

    // 2. Database Insertion
    console.log("Preparing database insertion...");
    
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
        console.log("Created new category:", category.name);
    } else {
        console.log("Found existing category:", category.name);
    }

    const slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
    const desc = "Serum Skintific dengan kandungan Tranexamic Acid 3%. Membantu mencerahkan kulit wajah secara optimal dan memudarkan noda hitam. Cocok untuk perawatan harian Anda agar kulit tampak bersinar.";

    // Ensure we don't insert duplicate
    const existing = await prisma.product.findFirst({
        where: { name: productName }
    });

    if (existing) {
        console.log(`Product ${productName} already exists! Skipping insertion.`);
    } else {
        await prisma.product.create({
            data: {
                name: productName,
                slug: slug,
                price: price,
                description: desc,
                stock: 10,
                thumbnail: `/perawatan/${fileName}`,
                categoryId: category.id,
                isActive: true
            }
        });
        console.log(`Successfully inserted: ${productName} (Rp ${price})`);
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
