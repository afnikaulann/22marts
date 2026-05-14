const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = [
  { name: 'KOMPOR RINNAI 522C', desc: 'Kompor gas berkualitas dengan desain praktis dan tungku yang kokoh untuk mendukung aktivitas memasak sehari-hari. Memiliki api yang stabil dan penggunaan gas yang efisien sehingga cocok digunakan di rumah untuk memasak berbagai jenis hidangan dengan nyaman.' },
  { name: 'KOMPOR RINNAI RI 522E', desc: 'Kompor gas dengan desain modern dan kualitas tungku yang kuat untuk menunjang aktivitas memasak lebih nyaman. Memiliki nyala api yang stabil dan hemat gas sehingga cocok digunakan untuk kebutuhan dapur sehari-hari.' },
  { name: 'KIPAS ANGIN COSMOS 16 SDB', desc: 'Kipas angin dengan hembusan angin yang sejuk dan stabil untuk membantu memberikan kenyamanan saat cuaca panas. Dilengkapi desain praktis dan cocok digunakan di ruang keluarga, kamar, maupun area kerja sehari-hari.' },
  { name: 'KIPAS ANGIN KARAKTER DORAEMON WELHOME 120', desc: 'Kipas angin dengan desain karakter Doraemon yang lucu and menarik untuk mempercantik ruangan anak. Memiliki hembusan angin yang nyaman serta ukuran praktis untuk digunakan sehari-hari di rumah.' },
  { name: 'TERMOS CKF 5900', desc: 'Termos praktis untuk menyimpan minuman panas maupun dingin agar suhu tetap terjaga lebih lama. Cocok digunakan di rumah, kantor, maupun saat bepergian dengan desain yang nyaman and mudah digunakan.' },
  { name: 'SAPU HAWAI 7129', desc: 'Sapu praktis untuk membersihkan area rumah dengan lebih mudah and nyaman. Memiliki bulu sapu yang kuat sehingga efektif membantu membersihkan debu and kotoran pada lantai.' },
  { name: 'RAK BUMBU GREEN LEAF SAFRON 1499', desc: 'Rak bumbu praktis dengan desain rapi untuk membantu menyimpan berbagai perlengkapan dapur and bumbu masak lebih teratur. Cocok digunakan di dapur agar penyimpanan menjadi lebih mudah and efisien.' },
  { name: 'GALON KRAN', desc: 'Galon dengan kran praktis yang memudahkan pengambilan air tanpa perlu mengangkat galon secara langsung. Cocok digunakan di rumah maupun tempat usaha untuk kebutuhan air minum sehari-hari.' }
];

async function main() {
  for (const item of updates) {
    const products = await prisma.product.findMany({
      where: {
        name: { contains: item.name.trim(), mode: 'insensitive' }
      }
    });

    for (const p of products) {
      // Direct name check after trimming to avoid partial matches on other things
      if (p.name.trim().toUpperCase() === item.name.trim().toUpperCase()) {
          await prisma.product.update({
            where: { id: p.id },
            data: { description: item.desc }
          });
          console.log(`Updated trimmed: ${p.name}`);
      }
    }
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
