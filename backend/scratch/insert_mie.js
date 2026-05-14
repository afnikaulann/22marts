const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 1. Get images
    const imagesDir = '../frontend/public/mie';
    const images = fs.readdirSync(imagesDir);

    // 2. Read PDF text from file
    console.log("Reading PDF text...");
    const pdfText = fs.readFileSync('scratch/pdf_text.txt', 'utf-8');
    const lines = pdfText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    // Parse lines into products (Name + Price)
    const dbProducts = [];
    for (const line of lines) {
        const match = line.match(/(.+?)\s+([\d\.]+)\s*Rp/);
        if (match) {
            const name = match[1].trim();
            const priceStr = match[2].replace(/\./g, '');
            const price = parseInt(priceStr, 10);
            dbProducts.push({ name, price });
        }
    }

    console.log(`Found ${dbProducts.length} items in PDF.`);

    // 3. Get category "Mie Instan" (without t)
    const category = await prisma.category.findFirst({
        where: { name: { contains: 'Mie Instan', mode: 'insensitive' } }
    });

    if (!category) {
        console.log("Could not find category 'Mie Instan'");
        return;
    }

    // Get existing products in this category to avoid duplicates
    const existingDbProducts = await prisma.product.findMany({
        where: { categoryId: category.id }
    });
    const existingNames = existingDbProducts.map(p => p.name.toUpperCase());

    let insertedCount = 0;

    // 4. Match images to prices and generate description
    for (const image of images) {
        const nameWithoutExt = image.replace(/\.[^/.]+$/, ""); // remove extension
        
        // Skip if already in database
        if (existingNames.includes(nameWithoutExt.toUpperCase())) {
            continue;
        }
        
        // Find best match in DB
        let matchedProduct = dbProducts.find(p => p.name.toUpperCase() === nameWithoutExt.toUpperCase());
        
        if (!matchedProduct) {
            matchedProduct = dbProducts.find(p => nameWithoutExt.toUpperCase().includes(p.name.toUpperCase()) || p.name.toUpperCase().includes(nameWithoutExt.toUpperCase()));
        }

        const price = matchedProduct ? matchedProduct.price : 0;
        
        let desc = `Lezatnya ${nameWithoutExt} yang siap menemani waktu santai Anda. Hadir dengan cita rasa khas dan bumbu pilihan yang menggugah selera. Cocok untuk dinikmati kapan saja sebagai pilihan praktis nan mengenyangkan.`;
        if (nameWithoutExt.toLowerCase().includes('goreng')) {
            desc = `Nikmati kelezatan ${nameWithoutExt} dengan tekstur mie yang kenyal dan bumbu pedas gurih yang meresap sempurna. Pilihan pas untuk Anda pencinta mie goreng dengan sensasi rasa yang kuat.`;
        } else if (nameWithoutExt.toLowerCase().includes('soto') || nameWithoutExt.toLowerCase().includes('kaldu')) {
            desc = `Rasakan hangatnya kuah ${nameWithoutExt} yang kaya akan rempah pilihan. Menghadirkan sensasi kuah segar yang lezat, sangat cocok disantap saat cuaca dingin atau untuk menghangatkan suasana.`;
        } else if (nameWithoutExt.toLowerCase().includes('pedas') || nameWithoutExt.toLowerCase().includes('seblak')) {
            desc = `Tantang selera pedasmu dengan ${nameWithoutExt}! Perpaduan tekstur mie yang pas dengan tingkat kepedasan ekstra siap memberikan sensasi yang tak terlupakan di setiap gigitannya.`;
        }
        
        console.log(`Processing NEW: ${nameWithoutExt} | Price: Rp ${price} | Img: ${image}`);

        const slug = nameWithoutExt.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);

        await prisma.product.create({
            data: {
                name: nameWithoutExt,
                slug: slug,
                price: price,
                description: desc,
                stock: 100,
                thumbnail: `/mie/${image}`,
                categoryId: category.id,
                isActive: true
            }
        });

        insertedCount++;
    }

    if (insertedCount === 0) {
        console.log("No new products to insert. All images in folder are already in the database.");
    } else {
        console.log(`Successfully inserted ${insertedCount} NEW products!`);
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
