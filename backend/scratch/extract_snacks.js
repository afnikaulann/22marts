const fs = require('fs');

const pdfText = fs.readFileSync('scratch/pdf_text.txt', 'utf-8');
const lines = pdfText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const keywords = [
    'SNACK', 'KERIPIK', 'BISKUIT', 'COKELAT', 'CHIPS', 'KUE', 'PERMEN', 'GUMMY', 
    'KACANG', 'POTABEE', 'CHITATO', 'LAY', 'OREO', 'TANGO', 'QTELA', 'CORN', 
    'STICKS', 'WAFER', 'CHIKI', 'POCKY', 'BENG BENG', 'SILVERQUEEN', 'KUSUKA',
    'MAMA SUKA', 'PIATTOS', 'MISTER POTATO', 'KINDER JOY', 'TIC TAC', 'YUPI'
];
const exclude = ['BOX', 'KARTON', 'ISI ', 'DUS'];

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
}

fs.writeFileSync('scratch/snack_products.json', JSON.stringify(snackProducts, null, 2));
console.log(`Extracted ${snackProducts.length} snack products.`);
