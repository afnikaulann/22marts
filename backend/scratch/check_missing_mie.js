const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const pdfText = fs.readFileSync('scratch/pdf_text.txt', 'utf-8');
    const lines = pdfText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    const pdfProducts = [];
    const mieKeywords = ['MIE ', 'INDOMIE', 'SEDAAP', 'SARIMI', 'POP MIE', 'SUPERMI', 'LEMONILO', 'MEGAH MIE', 'MIE GELAS'];

    for (const line of lines) {
        const match = line.match(/(.+?)\s+([\d\.]+)\s*Rp/);
        if (match) {
            const name = match[1].trim();
            const isMie = mieKeywords.some(keyword => name.toUpperCase().includes(keyword));
            if (isMie) {
                const priceStr = match[2].replace(/\./g, '');
                const price = parseInt(priceStr, 10);
                pdfProducts.push({ name, price });
            }
        }
    }

    // Get all products from DB
    const dbProducts = await prisma.product.findMany();
    
    const missingProducts = [];

    for (const pdfItem of pdfProducts) {
        // Check if this item exists in DB (case insensitive, approximate match)
        const exists = dbProducts.some(dbP => {
            const dbName = dbP.name.toUpperCase();
            const pdfName = pdfItem.name.toUpperCase();
            // Checking if pdf name is similar to db name
            // Removing grams and sizes to make matching easier
            const cleanDbName = dbName.replace(/\d+\s*(G|GR|ML)/g, '').trim();
            const cleanPdfName = pdfName.replace(/\d+\s*(G|GR|ML)/g, '').trim();
            
            return dbName.includes(cleanPdfName) || cleanPdfName.includes(cleanDbName);
        });

        if (!exists) {
            missingProducts.push(pdfItem);
        }
    }

    // Output missing products
    if (missingProducts.length > 0) {
        console.log(`\nFound ${missingProducts.length} Missing Mie Products:\n`);
        missingProducts.forEach(p => {
            console.log(`- ${p.name} (Rp ${p.price})`);
        });
    } else {
        console.log("\nNo missing Mie products found. All are in the database.");
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
