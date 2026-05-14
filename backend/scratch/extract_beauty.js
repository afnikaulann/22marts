const fs = require('fs');

const pdfText = fs.readFileSync('scratch/pdf_text.txt', 'utf-8');
const lines = pdfText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const keywords = ['SKINTIFIC', 'BIOAQUA', 'BIORE', 'WARDAH', 'FACIAL', 'SERUM', 'ZINC', 'ZWITSAL', 'PANTENE', 'CLEAR', 'SUNSILK', 'DOVE', 'LIFEBUOY', 'SABUN', 'SOAP', 'CLEANSING', 'MOISTURIZER', 'TONER', 'SHAMPO', 'SHAMPOO', 'BODY WASH', 'BODYWASH'];
const exclude = ['TAPE', 'BOX', 'MOBIL', 'MOTOR', 'CAR', 'WAX', 'KIT ', 'PANCI', 'TERMOS', 'TISSUE', 'GILINGAN'];

const beautyProducts = [];

for (const line of lines) {
    const match = line.match(/(.+?)\s+([\d\.]+)\s*Rp/);
    if (match) {
        const name = match[1].trim();
        const priceStr = match[2].replace(/\./g, '');
        const price = parseInt(priceStr, 10);
        
        const isBeauty = keywords.some(keyword => name.toUpperCase().includes(keyword));
        const isExcluded = exclude.some(ex => name.toUpperCase().includes(ex));

        if (isBeauty && !isExcluded) {
            beautyProducts.push({ name, price });
        }
    }
}

fs.writeFileSync('scratch/beauty_products.json', JSON.stringify(beautyProducts, null, 2));
console.log(`Extracted ${beautyProducts.length} beauty products.`);
