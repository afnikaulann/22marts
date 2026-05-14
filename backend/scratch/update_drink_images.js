const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const drinkDir = path.join(__dirname, '../../frontend/public/minuman dan eskrim');
    const files = fs.readdirSync(drinkDir);
    
    console.log(`Found ${files.length} files in drinks folder.`);

    let updatedCount = 0;
    for (const fileName of files) {
        if (fileName.startsWith('.')) continue;

        const productNamePart = path.parse(fileName).name;
        
        // Search for product in DB
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
                    data: { thumbnail: `/minuman dan eskrim/${fileName}` }
                });
                console.log(`Updated ${product.name} with image ${fileName}`);
                updatedCount++;
            }
        } else {
            console.log(`No direct match found for file: ${fileName}`);
        }
    }

    console.log(`Finished updating ${updatedCount} drink images.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
