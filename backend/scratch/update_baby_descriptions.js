const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = [
  { name: 'Mitu Baby SBN Honey & Milk 400 ML', desc: 'Sabun mandi bayi dengan perpaduan madu dan susu yang membantu membersihkan kulit si kecil dengan lembut sekaligus menjaga kelembapannya. Memiliki aroma yang lembut dan busa halus sehingga nyaman digunakan setiap hari untuk membantu kulit bayi tetap bersih, lembut, dan segar.' },
  { name: 'My Baby PWD Telon Plus 75+19 Gram', desc: 'Bedak bayi dengan kandungan telon plus yang membantu memberikan rasa hangat dan nyaman pada kulit si kecil. Memiliki tekstur halus dan aroma lembut sehingga cocok digunakan sehari-hari untuk membantu menjaga kulit bayi tetap segar dan nyaman.' },
  { name: 'Johnson\'s Baby Cream Milk & Rice 50 Gram', desc: 'Krim bayi dengan kandungan milk dan rice yang membantu menjaga kelembapan kulit agar tetap lembut dan halus. Memiliki tekstur ringan yang mudah meresap sehingga nyaman digunakan setiap hari untuk merawat kulit bayi yang sensitif.' },
  { name: 'Baby Happy Pants L20', desc: 'Popok celana bayi ukuran L isi 20 pcs dengan daya serap tinggi untuk membantu menjaga kulit bayi tetap kering dan nyaman lebih lama. Didesain pas di badan sehingga si kecil tetap bebas bergerak saat bermain maupun tidur.' },
  { name: 'Dodo Baby Cotton Bud Extra Fine 133', desc: 'Cotton bud dengan ujung kapas lembut yang dirancang khusus untuk membantu membersihkan area sensitif bayi dengan aman dan nyaman. Dikemas higienis dan praktis digunakan sehari-hari untuk kebutuhan perawatan si kecil.', keywords: ['Dodo', 'Cotton Bud'] },
  { name: 'SGM Eksplor 3+ Coklat 400G', desc: 'Susu pertumbuhan rasa cokelat untuk anak usia 3 tahun ke atas dengan rasa lezat yang disukai anak-anak. Diperkaya nutrisi penting untuk membantu mendukung aktivitas dan tumbuh kembang si kecil setiap hari.', keywords: ['SGM', 'EKSPLOR', '3+', 'COKLAT', '400'] },
  { name: 'SGM Eksplor 3+ Cokelat 900G', desc: 'Susu pertumbuhan rasa cokelat dengan kandungan nutrisi yang membantu mendukung kebutuhan gizi anak usia 3 tahun ke atas. Memiliki rasa cokelat yang nikmat dan cocok dikonsumsi setiap hari untuk menemani aktivitas si kecil.', keywords: ['SGM', 'EKSPLOR', '3+', 'COKELAT', '900'] },
  { name: 'SGM Ananda 6-12 Bulan 150G', desc: 'Susu formula untuk bayi usia 6-12 bulan yang diformulasikan untuk membantu memenuhi kebutuhan nutrisi harian si kecil. Memiliki kandungan gizi yang sesuai untuk mendukung masa pertumbuhan bayi.', keywords: ['SGM', 'ANANDA', '6-12', '150'] },
  { name: 'SGM Ananda 6-12 Bulan 1000G', desc: 'Susu formula bayi usia 6-12 bulan dengan kandungan nutrisi penting untuk membantu mendukung tumbuh kembang optimal si kecil. Dikemas praktis dengan ukuran besar untuk kebutuhan harian bayi.', keywords: ['SGM', 'ANANDA', '6-12', '1000'] },
  { name: 'SGM Ananda 0-6BLN 400G', desc: 'Susu formula untuk bayi usia 0-6 bulan yang diformulasikan untuk membantu memenuhi kebutuhan nutrisi awal bayi. Memiliki kandungan gizi yang disesuaikan untuk mendukung pertumbuhan si kecil di masa awal kehidupannya.', keywords: ['SGM', 'ANANDA', '0-6', '400'] },
  { name: 'Vidoran UHT Strawberry 110ML', desc: 'Minuman susu UHT rasa stroberi dengan rasa manis dan segar yang disukai anak-anak. Dikemas praktis ukuran 110 ml sehingga mudah dibawa dan cocok dinikmati kapan saja.' },
  { name: 'Vidoran My Baby 6-12 125 GR', desc: 'Susu formula bayi usia 6-12 bulan dengan kandungan nutrisi yang membantu memenuhi kebutuhan gizi harian si kecil. Cocok dikonsumsi untuk mendukung pertumbuhan dan aktivitas bayi setiap hari.' },
  { name: 'Vidoran My Baby 0-6BLN 350GR', desc: 'Susu formula untuk bayi usia 0-6 bulan yang diformulasikan dengan nutrisi penting untuk membantu mendukung tumbuh kembang awal bayi. Memiliki kandungan gizi yang sesuai untuk kebutuhan harian si kecil.' },
  { name: 'My Baby Powder Telon Plus', desc: 'Bedak bayi dengan kandungan telon plus yang membantu memberikan rasa nyaman dan hangat pada kulit bayi. Memiliki tekstur lembut dan aroma khas yang cocok digunakan sehari-hari setelah mandi.' },
  { name: 'My Baby PWD Sweet Floral 100GR', desc: 'Bedak bayi dengan aroma floral yang lembut untuk membantu menjaga kulit bayi tetap segar dan nyaman. Memiliki tekstur halus sehingga nyaman digunakan setiap hari pada kulit si kecil.' },
  { name: 'My Baby Minyak Telon Plus Longer 150ML', desc: 'Minyak telon dengan formula hangat yang membantu memberikan kenyamanan pada tubuh bayi serta aroma lembut yang tahan lebih lama. Cocok digunakan setelah mandi maupun saat cuaca dingin untuk membantu menjaga kehangatan si kecil.' },
  { name: 'My Baby Face & Body Cream Calm 50G', desc: 'Krim wajah dan tubuh bayi dengan tekstur lembut yang membantu menjaga kelembapan kulit si kecil agar tetap halus dan nyaman. Mudah meresap dan cocok digunakan sehari-hari untuk merawat kulit bayi.', keywords: ['Face', 'Body', 'Cream', 'Calm'] },
  { name: 'Mitu Baby Wipes F&C Pink BOGOF 40S', desc: 'Tisu basah bayi dengan formula lembut yang membantu membersihkan kulit bayi secara praktis dan higienis. Memiliki aroma segar dan nyaman digunakan untuk membersihkan tangan, wajah, maupun area tubuh bayi sehari-hari.' },
  { name: 'Mitu Baby Powder Floral 150GR', desc: 'Bedak bayi dengan aroma floral lembut yang membantu menjaga kulit tetap segar dan nyaman sepanjang hari. Memiliki tekstur halus sehingga cocok digunakan setelah mandi maupun saat mengganti popok.' },
  { name: 'My Baby Sunblock SPF30 85 ML', desc: 'Sunblock untuk anak dengan perlindungan SPF30 yang membantu melindungi kulit dari paparan sinar matahari saat beraktivitas di luar ruangan. Memiliki tekstur ringan dan nyaman digunakan sehari-hari.' },
  { name: 'My Baby Soap Fresh Fruity 60GR', desc: 'Sabun bayi dengan aroma fruity segar yang membantu membersihkan kulit dengan lembut tanpa membuatnya kering. Cocok digunakan setiap hari agar kulit si kecil tetap bersih dan harum.' },
  { name: 'My Baby Powder Cornstarch 100G', desc: 'Bedak bayi dengan kandungan cornstarch yang membantu menjaga kulit tetap halus, segar, dan nyaman digunakan sehari-hari. Memiliki tekstur lembut yang cocok untuk kulit bayi yang sensitif.' },
  { name: 'My Baby Multipurpose Liquid Cleanser 300ML', desc: 'Pembersih cair serbaguna untuk perlengkapan bayi seperti botol susu, mainan, dan peralatan makan. Membantu membersihkan dengan lebih praktis dan higienis sehingga aman digunakan untuk kebutuhan si kecil.' },
  { name: 'My Baby Minyak Telon Lavender 90ML', desc: 'Minyak telon dengan aroma lavender lembut yang membantu memberikan rasa hangat dan nyaman pada tubuh bayi. Cocok digunakan setelah mandi maupun sebelum tidur agar si kecil terasa lebih rileks.' },
  { name: 'My Baby Kids Shampoo Biru 180ML', desc: 'Shampo anak dengan formula lembut yang membantu membersihkan rambut dan kulit kepala tanpa membuat mata perih. Memiliki aroma segar dan cocok digunakan setiap hari agar rambut anak tetap bersih dan lembut.' },
  { name: 'My Baby Kids Hair & Body Cologne 55 ML', desc: 'Cologne anak dengan aroma lembut dan menyegarkan yang cocok digunakan setelah mandi maupun saat beraktivitas. Membantu memberikan kesegaran lebih lama sehingga si kecil tetap harum sepanjang hari.', keywords: ['Kids', 'Hair', 'Body', 'Cologne'] },
  { name: 'My Baby Hair & Body Wash Calm Relax 150+50', desc: 'Sabun dan shampo bayi 2 in 1 dengan formula lembut yang membantu membersihkan rambut dan tubuh sekaligus memberikan sensasi relaksasi. Memiliki aroma menenangkan dan cocok digunakan sehari-hari untuk menjaga kebersihan si kecil.', keywords: ['Hair', 'Body', 'Wash', 'Calm'] },
  { name: 'Cussons Kids H&B Cologne Strawberry Smoothies', desc: 'Hair & body cologne anak dengan aroma strawberry smoothies yang manis dan segar untuk membantu tubuh dan rambut tetap harum sepanjang hari. Cocok digunakan setelah mandi maupun sebelum beraktivitas agar si kecil terasa lebih segar dan percaya diri.', keywords: ['Cussons', 'Cologne', 'Strawberry'] }
];

async function main() {
  const allProducts = await prisma.product.findMany({
    where: { category: { slug: 'kebutuhan-bayi' } }
  });

  for (const item of updates) {
    const product = allProducts.find(p => {
        const name = p.name.toUpperCase();
        if (item.keywords) {
            return item.keywords.every(k => name.includes(k.toUpperCase()));
        }
        return name.includes(item.name.toUpperCase().replace(/Johnson's/i, '').trim());
    });

    if (product) {
      await prisma.product.update({
        where: { id: product.id },
        data: { description: item.desc }
      });
      console.log(`Updated: ${product.name}`);
    } else {
        console.warn(`Not found: ${item.name}`);
    }
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
