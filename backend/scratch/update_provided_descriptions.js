const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = [
  {
    name: 'Aqua 330 ML',
    desc: 'Air mineral kemasan 330 ml yang praktis dibawa ke mana saja dan cocok menemani aktivitas harian. Dengan kualitas air yang terjaga dan rasa yang menyegarkan, produk ini pas dikonsumsi saat bekerja, belajar, olahraga, maupun bepergian agar tubuh tetap terhidrasi dengan baik.'
  },
  {
    name: 'Aqua 600 ML',
    desc: 'Air mineral segar dalam kemasan 600 ml yang praktis untuk kebutuhan minum sehari-hari. Cocok dikonsumsi kapan saja dengan kualitas air yang higienis dan menyegarkan, membantu memenuhi kebutuhan cairan tubuh saat beraktivitas di rumah, sekolah, kantor, maupun perjalanan.'
  },
  {
    name: 'Aqua Gelas 220 ML',
    desc: 'Air mineral dalam kemasan gelas 220 ml yang praktis disajikan untuk berbagai kebutuhan acara, rapat, maupun konsumsi sehari-hari. Memiliki kualitas air yang higienis dan rasa segar, sehingga nyaman dinikmati kapan saja untuk membantu menjaga kebutuhan cairan tubuh.'
  },
  {
    name: 'Ades 600 ML',
    desc: 'Air mineral kemasan 600 ml dengan rasa segar dan kualitas yang terjaga untuk membantu memenuhi kebutuhan hidrasi sehari-hari. Dikemas praktis sehingga mudah dibawa saat bekerja, sekolah, olahraga, maupun bepergian agar tubuh tetap terasa segar sepanjang hari.'
  },
  {
    name: 'ABC Juice Mangga 250 ML',
    desc: 'Minuman jus mangga dengan rasa manis dan segar dari buah mangga pilihan yang nikmat di setiap tegukan. Dikemas praktis dalam ukuran 250 ml sehingga cocok dinikmati kapan saja untuk menemani aktivitas harian maupun saat bersantai bersama keluarga dan teman.'
  },
  {
    name: 'ABC Juice Sirsak 250 ML',
    desc: 'Minuman jus sirsak dengan perpaduan rasa manis dan segar yang cocok dinikmati saat cuaca panas maupun waktu santai. Memiliki aroma buah yang khas dan kemasan praktis 250 ml sehingga mudah dibawa dan dinikmati kapan saja.'
  },
  {
    name: 'ABC Lechee Juice 250 ML',
    desc: 'Minuman jus leci dengan rasa manis segar dan aroma buah yang khas, memberikan sensasi menyegarkan di setiap tegukan. Dikemas praktis ukuran 250 ml sehingga cocok menjadi pilihan minuman sehari-hari saat beraktivitas maupun bersantai.'
  },
  {
    name: 'ABC Kopi Mocca 27 Gram',
    desc: 'Kopi instan varian mocca dengan perpaduan rasa kopi dan cokelat yang lembut serta aroma yang nikmat. Praktis diseduh kapan saja untuk menemani waktu santai maupun aktivitas harian, dengan cita rasa manis yang pas dan tekstur minuman yang creamy.'
  },
  {
    name: 'ABC KOPI MOCCA 27GR',
    desc: 'Minuman kopi instan rasa mocca yang memadukan aroma kopi khas dengan rasa cokelat yang lembut dan nikmat. Cocok dinikmati hangat maupun dingin sebagai teman bersantai atau menemani aktivitas sehari-hari dengan penyajian yang praktis.'
  },
  {
    name: 'ABC Kopi Susu Btl 200 ML',
    desc: 'Minuman kopi susu siap minum dengan perpaduan rasa kopi dan susu yang creamy serta nikmat di setiap tegukan. Dikemas dalam botol praktis 200 ml sehingga mudah dibawa dan cocok dinikmati kapan saja saat bekerja, belajar, maupun bersantai.'
  },
  {
    name: 'ABC KOPI SUSU BTL 200ML',
    desc: 'Kopi susu siap minum dengan rasa lembut dan aroma kopi yang khas, cocok untuk menemani aktivitas sehari-hari. Memiliki tekstur creamy yang nikmat dan kemasan praktis sehingga mudah dinikmati kapan saja dalam keadaan dingin maupun suhu normal.'
  },
  {
    name: 'ABC KOPI SUSU 30GR - Seduh',
    desc: 'Kopi susu instan yang praktis diseduh dengan rasa creamy dan aroma kopi yang khas. Cocok dinikmati saat pagi hari maupun waktu santai untuk memberikan sensasi hangat dan rasa nikmat di setiap tegukan.'
  },
  {
    name: 'ABC KOPI SUSU GULA AREN 27GR',
    desc: 'Kopi susu instan dengan perpaduan rasa kopi dan manis alami gula aren yang khas dan menggugah selera. Memiliki aroma yang nikmat dan praktis disajikan, cocok dinikmati kapan saja sebagai teman santai maupun saat beraktivitas.'
  },
  {
    name: 'ABC Klepon 25 Gram',
    desc: 'Minuman instan rasa klepon dengan perpaduan manis gula aren dan aroma khas yang menggugah selera. Memberikan sensasi rasa tradisional yang unik dan cocok dinikmati hangat saat bersantai bersama keluarga maupun teman.'
  },
  {
    name: 'Adem Sari Ching Ku Herbal Lemon 320 ML',
    desc: 'Minuman herbal rasa lemon yang memberikan sensasi segar dan nyaman di tenggorokan. Cocok dinikmati dingin saat cuaca panas maupun setelah beraktivitas, dengan perpaduan rasa lemon yang menyegarkan dan praktis dikonsumsi kapan saja.'
  },
  {
    name: 'Floridina Coco 350ML',
    desc: 'Minuman rasa kelapa yang menyegarkan dengan perpaduan rasa manis yang pas di setiap tegukan. Cocok dinikmati dingin untuk menemani aktivitas harian maupun saat bersantai bersama keluarga dan teman.'
  },
  {
    name: 'Floridina Orange 350ML',
    desc: 'Minuman jeruk segar dengan rasa manis dan aroma buah yang khas, memberikan sensasi menyegarkan saat diminum. Dikemas praktis ukuran 350 ml sehingga cocok dinikmati kapan saja untuk membantu melepas dahaga.'
  },
  {
    name: 'Golda Coffee Cappuccino',
    desc: 'Minuman kopi cappuccino siap minum dengan perpaduan rasa kopi dan susu yang creamy serta aroma yang menggugah selera. Cocok dinikmati dingin untuk menemani aktivitas sehari-hari maupun saat bersantai agar suasana terasa lebih nikmat.'
  },
  {
    name: 'Frostbite Kopi Jelly Gula Aren 60ML',
    desc: 'Minuman kopi dengan kombinasi jelly dan manis gula aren yang memberikan sensasi unik dan menyegarkan di setiap tegukan. Cocok dinikmati dingin sebagai teman santai maupun pelepas dahaga saat beraktivitas.'
  },
  {
    name: 'Espresso Kopi Susu Sak 135G',
    desc: 'Kopi susu instan dengan rasa creamy dan aroma kopi yang khas, cocok dinikmati kapan saja sebagai teman santai maupun aktivitas harian. Praktis disajikan dengan cita rasa yang lembut dan nikmat di setiap seduhan.'
  }
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
      console.log(`Updated description for: ${p.name}`);
    }
  }
  console.log('\nAll descriptions updated successfully.');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
