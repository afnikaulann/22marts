const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = [
  { name: 'KOMPOR RINNAI 522C', desc: 'Kompor gas berkualitas dengan desain praktis dan tungku yang kokoh untuk mendukung aktivitas memasak sehari-hari. Memiliki api yang stabil dan penggunaan gas yang efisien sehingga cocok digunakan di rumah untuk memasak berbagai jenis hidangan dengan nyaman.' },
  { name: 'Kompor Portable Cosmos CGC-21 PN', desc: 'Kompor portable yang praktis digunakan untuk memasak di rumah, saat bepergian, maupun kegiatan outdoor. Dilengkapi desain ringkas dan mudah digunakan, kompor ini menghasilkan panas yang stabil sehingga cocok untuk berbagai kebutuhan memasak sehari-hari.' },
  { name: 'KOMPOR RINNAI RI 522E', desc: 'Kompor gas dengan desain modern dan kualitas tungku yang kuat untuk menunjang aktivitas memasak lebih nyaman. Memiliki nyala api yang stabil dan hemat gas sehingga cocok digunakan untuk kebutuhan dapur sehari-hari.' },
  { name: 'SETRIKA MASPION EX-1000', desc: 'Setrika listrik praktis dengan panas merata untuk membantu merapikan pakaian dengan lebih mudah. Didesain nyaman digunakan sehari-hari dengan pegangan ergonomis dan hasil setrika yang rapi untuk berbagai jenis pakaian.' },
  { name: 'SETRIKA MIYAKO EI-1009 M', desc: 'Setrika listrik dengan desain simpel dan panas yang stabil untuk membantu pakaian tetap rapi dan licin. Cocok digunakan sehari-hari dengan penggunaan yang praktis dan nyaman untuk berbagai kebutuhan rumah tangga.' },
  { name: 'SETRIKA MIYAKO EI-1008 M BK', desc: 'Setrika listrik berkualitas dengan desain modern dan panas merata untuk mempermudah proses menyetrika pakaian. Memiliki pegangan nyaman dan cocok digunakan untuk kebutuhan rumah tangga sehari-hari.' },
  { name: 'SETRIKA MASPION EX-1010', desc: 'Setrika listrik dengan performa panas yang stabil untuk membantu pakaian tampak lebih rapi dan halus. Praktis digunakan dengan desain ergonomis sehingga nyaman dipakai untuk menyetrika sehari-hari.' },
  { name: 'SETRIKA MASPION HA-140', desc: 'Setrika listrik yang dirancang untuk memberikan hasil rapi dengan panas merata pada berbagai jenis pakaian. Cocok digunakan sehari-hari dengan desain praktis dan nyaman untuk kebutuhan rumah tangga.' },
  { name: 'KIPAS ANGIN COSMOS 16 SDB', desc: 'Kipas angin dengan hembusan angin yang sejuk dan stabil untuk membantu memberikan kenyamanan saat cuaca panas. Dilengkapi desain praktis dan cocok digunakan di ruang keluarga, kamar, maupun area kerja sehari-hari.' },
  { name: 'KIPAS ANGIN KARAKTER CAR 108', desc: 'Kipas angin dengan desain karakter mobil yang menarik dan cocok digunakan untuk anak-anak maupun kebutuhan ruangan kecil. Memiliki hembusan angin yang nyaman serta desain unik yang menambah kesan menarik pada ruangan.' },
  { name: 'KIPAS ANGIN COSMOS 16 SEN', desc: 'Kipas angin praktis dengan hembusan angin yang menyegarkan dan cocok digunakan sehari-hari. Memiliki desain kokoh dan penggunaan yang mudah untuk membantu memberikan kenyamanan di berbagai ruangan.' },
  { name: 'KIPAS ANGIN COSMOS 16 XDC', desc: 'Kipas angin dengan performa hembusan yang kuat dan stabil untuk memberikan kesejukan maksimal saat beraktivitas. Cocok digunakan di rumah maupun kantor dengan desain yang praktis dan modern.' },
  { name: 'KIPAS ANGIN MIYAKO TJR-101', desc: 'Kipas angin berkualitas dengan hembusan sejuk dan penggunaan yang praktis untuk kebutuhan sehari-hari. Didesain nyaman digunakan di berbagai ruangan agar suasana tetap terasa segar dan nyaman.' },
  { name: 'BLENDER PHILIPS HR-2115', desc: 'Blender berkualitas dengan motor kuat dan pisau tajam untuk membantu menghaluskan buah, bumbu, maupun bahan makanan lainnya dengan cepat. Cocok digunakan sehari-hari untuk membuat jus, smoothie, and berbagai kebutuhan dapur lainnya.' },
  { name: 'KIPAS ANGIN KARAKTER DORAEMON WELHOME 120', desc: 'Kipas angin dengan desain karakter Doraemon yang lucu and menarik untuk mempercantik ruangan anak. Memiliki hembusan angin yang nyaman serta ukuran praktis untuk digunakan sehari-hari di rumah.' },
  { name: 'TERMOS CKF 5900', desc: 'Termos praktis untuk menyimpan minuman panas maupun dingin agar suhu tetap terjaga lebih lama. Cocok digunakan di rumah, kantor, maupun saat bepergian dengan desain yang nyaman and mudah digunakan.' },
  { name: 'TERMOS SHUMA 500ML SHP0500', desc: 'Termos berkapasitas 500 ml yang praktis digunakan untuk membawa minuman panas maupun dingin saat bepergian. Memiliki desain simpel and mudah dibawa sehingga cocok untuk aktivitas sehari-hari.' },
  { name: 'SENDOK MAKAN DOLL 403', desc: 'Sendok makan dengan desain praktis and nyaman digunakan untuk kebutuhan makan sehari-hari. Dibuat dari bahan yang kokoh and cocok digunakan di rumah maupun untuk perlengkapan dapur.' },
  { name: 'DISPENSER COSMOS 1150P', desc: 'Dispenser praktis untuk memudahkan penyajian air panas maupun dingin di rumah atau kantor. Memiliki desain modern and penggunaan yang mudah sehingga cocok menunjang kebutuhan sehari-hari keluarga.' },
  { name: 'DISPENSER MIYAKO WD-185', desc: 'Dispenser berkualitas dengan desain praktis untuk membantu kebutuhan air minum sehari-hari lebih mudah and nyaman. Cocok digunakan di rumah maupun kantor dengan penggunaan yang simpel and efisien.' },
  { name: 'SAPU GBU VIENA PC-112', desc: 'Sapu rumah tangga dengan bulu yang kuat and nyaman digunakan untuk membersihkan lantai dari debu maupun kotoran. Cocok digunakan sehari-hari agar rumah tetap bersih and rapi.' },
  { name: 'SAPU HAWAI 7129', desc: 'Sapu praktis untuk membersihkan area rumah dengan lebih mudah and nyaman. Memiliki bulu sapu yang kuat sehingga efektif membantu membersihkan debu and kotoran pada lantai.' },
  { name: 'SAPU FACTORY 2 MACAN', desc: 'Sapu rumah tangga dengan desain praktis and bulu yang kuat untuk membantu membersihkan lantai secara maksimal. Cocok digunakan sehari-hari untuk menjaga kebersihan rumah.' },
  { name: 'PANCI EKONOMI MASPION 18 CM', desc: 'Panci praktis ukuran 18 cm yang cocok digunakan untuk memasak berbagai hidangan sehari-hari. Dibuat dengan desain ringan and nyaman digunakan sehingga pas untuk kebutuhan dapur rumah tangga.' },
  { name: 'RAK BUMBU GREEN LEAF SAFRON 1499', desc: 'Rak bumbu praktis dengan desain rapi untuk membantu menyimpan berbagai perlengkapan dapur and bumbu masak lebih teratur. Cocok digunakan di dapur agar penyimpanan menjadi lebih mudah and efisien.' },
  { name: 'GALON KRAN', desc: 'Galon dengan kran praktis yang memudahkan pengambilan air tanpa perlu mengangkat galon secara langsung. Cocok digunakan di rumah maupun tempat usaha untuk kebutuhan air minum sehari-hari.' },
  { name: 'ABC Baterai Jam', desc: 'Baterai praktis untuk kebutuhan jam and perangkat elektronik kecil lainnya. Memiliki daya tahan yang baik sehingga membantu perangkat tetap berfungsi dengan optimal.' },
  { name: 'ABC 9Volt SPW', desc: 'Baterai 9 volt berkualitas untuk berbagai kebutuhan perangkat elektronik seperti remote, mainan, maupun alat elektronik lainnya. Memberikan daya yang stabil and tahan digunakan sehari-hari.' },
  { name: 'ABC Alkaline 9Volt', desc: 'Baterai alkaline 9 volt dengan daya tahan lebih lama and performa stabil untuk berbagai perangkat elektronik. Cocok digunakan untuk kebutuhan rumah tangga maupun perlengkapan elektronik lainnya.' },
  { name: 'ABC Alkaline AAA 2', desc: 'Baterai alkaline ukuran AAA isi 2 dengan daya tahan yang baik untuk berbagai perangkat elektronik sehari-hari seperti remote, jam, maupun mainan anak.' },
  { name: 'ABC Alkaline AAA 4+2', desc: 'Baterai alkaline AAA dengan kemasan praktis isi 4+2 yang ekonomis and cocok digunakan untuk berbagai kebutuhan elektronik rumah tangga. Memiliki daya tahan yang stabil and lebih awet.' },
  { name: 'ABC Alkaline AALR6 Isi 2', desc: 'Baterai alkaline AA isi 2 yang cocok digunakan untuk berbagai perangkat elektronik seperti remote, senter, and mainan. Memberikan performa daya yang stabil and tahan lama untuk penggunaan sehari-hari.' },
  { name: 'ABC Baterai Biru R14', desc: 'Baterai R14 berkualitas untuk membantu memenuhi kebutuhan daya pada berbagai perangkat elektronik rumah tangga. Memiliki performa yang stabil and praktis digunakan kapan saja.' },
  { name: 'ABC Baterai Power 9V Kotak HTM', desc: 'Baterai 9V dengan daya yang stabil untuk berbagai perangkat elektronik seperti mikrofon, remote, maupun alat elektronik lainnya. Praktis digunakan dengan kualitas daya yang tahan lama.' },
  { name: 'ABC Baterai Power A3 Isi 2', desc: 'Baterai ukuran A3 isi 2 dengan daya tahan yang baik untuk membantu perangkat elektronik bekerja optimal. Cocok digunakan pada berbagai kebutuhan rumah tangga sehari-hari.' },
  { name: 'DAHLIA TOILETBALL COFFEE 5\'S', desc: 'Toilet ball dengan aroma kopi yang menyegarkan untuk membantu menjaga toilet tetap harum and bersih. Praktis digunakan dengan wangi tahan lama sehingga membuat suasana kamar mandi terasa lebih nyaman.' }
];

async function main() {
  for (const item of updates) {
    const products = await prisma.product.findMany({
      where: {
        name: { equals: item.name, mode: 'insensitive' }
      }
    });

    for (const p of products) {
      await prisma.product.update({
        where: { id: p.id },
        data: { description: item.desc }
      });
      console.log(`Updated: ${p.name}`);
    }
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
