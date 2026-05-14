const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const snackDir = path.join(__dirname, '../../frontend/public/snack');
    const files = fs.readdirSync(snackDir);
    
    console.log(`Found ${files.length} files in snack folder.`);

    let updatedCount = 0;
    for (const fileName of files) {
        // Ignore hidden files
        if (fileName.startsWith('.')) continue;

        // Strip extension
        const productNamePart = path.parse(fileName).name;
        
        // Search for product in DB that closely matches this filename
        // We'll look for a product whose name is contained in or contains the filename part
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: productNamePart, mode: 'insensitive' } },
                    { name: { equals: productNamePart, mode: 'insensitive' } }
                ]
            }
        });

        if (products.length > 0) {
            for (const product of products) {
                await prisma.product.update({
                    where: { id: product.id },
                    data: { thumbnail: `/snack/${fileName}` }
                });
                console.log(`Updated ${product.name} with image ${fileName}`);
                updatedCount++;
            }
        } else {
            // Try matching by removing some words or adjusting
            console.log(`No direct match found for file: ${fileName}`);
        }
    }

    console.log(`Finished updating ${updatedCount} snack images.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
