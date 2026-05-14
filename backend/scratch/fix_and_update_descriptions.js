const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Fix unintended updates for other categories
  const unintended = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: 'BIOAQUA', mode: 'insensitive' } },
        { name: { contains: 'INDOMIE', mode: 'insensitive' } }
      ]
    }
  });

  for (const p of unintended) {
    let desc = p.description;
    if (p.name.toUpperCase().includes('BIOAQUA')) {
      desc = 'Produk perawatan kulit berkualitas dari Bioaqua untuk menjaga kecantikan dan kesehatan kulit Anda secara optimal.';
    } else if (p.name.toUpperCase().includes('INDOMIE')) {
      desc = 'Mie instan legendaris dengan cita rasa bumbu yang khas dan menggugah selera, praktis untuk dinikmati kapan saja.';
    }
    
    await prisma.product.update({
      where: { id: p.id },
      data: { description: desc }
    });
    console.log(`Fixed: ${p.name}`);
  }

  // 2. Apply unique descriptions to Minuman & Es Krim products properly
  const categories = await prisma.category.findMany({
    where: {
      slug: { in: ['minuman-dan-eskrim', 'ice-cream'] }
    },
    include: { products: true }
  });

  const descMap = {
    'Aice Bingo Chocolate': 'Nikmati sensasi klasik es krim cokelat stik dengan balutan cokelat premium yang renyah. Tekstur creamy di dalam dan crunchy di luar membuat setiap gigitan Aice Bingo Chocolate menjadi momen yang memuaskan.',
    'Aice Chocolate Crispy': 'Kombinasi sempurna es krim cokelat lembut dengan butiran biskuit renyah yang melimpah. Ukuran yang pas untuk menemani waktu istirahat Anda dengan kelezatan ganda.',
    'Aice Chocolate Max': 'Untuk pecinta cokelat sejati, Aice Chocolate Max hadir dengan rasa cokelat yang intens dan mendalam. Setiap suapan memberikan kepuasan maksimal dengan tekstur es krim yang sangat halus.',
    'Aice Choco Malt': 'Perpaduan unik antara cokelat yang kaya dan aroma malt yang khas. Aice Choco Malt memberikan rasa manis yang tidak membosankan dan sangat menyegarkan di lidah.',
    'Aice Durian Cup': 'Hadirkan kemewahan buah durian asli dalam bentuk es krim cup yang praktis. Aroma durian yang kuat dan rasa manis legitnya akan memanjakan lidah para pecinta raja buah ini.',
    'Aice Mochi': 'Es krim mochi ikonik dari Aice dengan kulit yang sangat kenyal dan isian lumer. Sensasi unik mengunyah mochi dingin yang memberikan pengalaman rasa berbeda.',
    'Aice Strawberry': 'Kesegaran buah stroberi pilihan dalam balutan es krim yang lembut. Memberikan rasa asam manis yang seimbang, sangat cocok untuk mendinginkan hari yang terik.',
    'Paddle Pop Upin Ipin': 'Petualangan rasa seru bersama karakter favorit Upin & Ipin! Es krim stik yang ceria dengan kombinasi rasa buah yang disukai anak-anak.',
    'Paddle Pop Choco Lava': 'Temukan kejutan lelehan saus cokelat cair (lava) di tengah es krim cokelat yang lembut. Memberikan sensasi lumer di mulut yang memuaskan.',
    'Aice Semangka': 'Es krim paling ikonik dengan bentuk dan rasa semangka asli yang sangat menyegarkan. Dilengkapi butiran choco chips sebagai biji semangka.',
    'Aice Crispy Ball': 'Sensasi seru makan es krim dengan taburan bola-bola biskuit yang sangat renyah. Perpaduan es krim susu yang lembut dan lapisan cokelat tebal.',
    'Twister Grape Lychee': 'Bentuk ulir twister yang unik dengan perpaduan rasa anggur yang manis dan leci yang harum. Es krim buah yang sangat segar.',
    'Sweet Corn': 'Es krim legendaris dengan bentuk menyerupai jagung asli. Menghadirkan rasa jagung manis yang autentik dengan aroma yang menggoda.',
    'Oreo Stick': 'Kolaborasi sempurna antara es krim vanila Wall\'s dan biskuit Oreo yang legendaris. Taburan potongan Oreo di dalam dan lapisan cokelat Oreo di luar.',
    'Cornetto Silver Queen': 'Mahakarya es krim cone yang memadukan kelembutan Wall\'s dengan potongan cokelat SilverQueen dan kacang mete asli.',
    'Cornetto Mini': 'Nikmati kelezatan Cornetto dalam kemasan mini yang praktis, pas untuk camilan ringan yang menyenangkan kapan saja.',
    'Populaire': 'Es krim cup praktis dengan rasa favorit yang lembut. Dilengkapi saus lezat, cocok untuk hidangan penutup yang ringan.',
    'Pop Minion': 'Es krim cup edisi spesial Minions yang ceria! Menghadirkan rasa buah yang unik dan menyegarkan, pasti disukai anak-anak.',
    'Neopolitana': 'Pilihan tepat untuk momen berkumpul bersama keluarga. Tiga rasa favorit (Cokelat, Vanila, Stroberi) dalam satu kemasan besar.',
    'Feast Vanilla': 'Es krim stik vanila klasik dengan lapisan cokelat tebal dan taburan kacang mete yang gurih.',
    'Feast Chocolate': 'Varian favorit pecinta cokelat! Es krim cokelat yang kaya rasa, dibalut cokelat renyah dan kacang mete pilihan.',
    'Crunchy Milky Berry': 'Perpaduan istimewa rasa susu yang creamy dengan saus beri yang segar. Dilapisi cokelat putih renyah.',
    'Aice Nanas': 'Kesegaran buah nanas tropis dalam bentuk es krim stik yang ringan. Rasa manis dan sedikit asamnya sangat pas.',
    'Aice Berry Cone': 'Es krim cone dengan rasa beri yang menyegarkan. Perpaduan antara cone renyah, es krim lembut, dan saus buah.',
    'Aice Milk Melon': 'Aroma melon yang harum dan rasa susu yang lembut menyatu dalam Aice Milk Melon. Es krim yang menenangkan dan segar.',
    'Aqua': 'Air mineral murni dari sumber pegunungan alami yang terjaga keasliannya. Diproses secara higienis untuk hidrasi sehat harian Anda.',
    'ABC Lychee Juice': 'Sari buah leci asli yang menghadirkan rasa manis segar dan aroma bunga yang harum.',
    'ABC Juice Mangga': 'Nikmati kelezatan mangga tropis yang manis dan kaya vitamin. Memberikan kesegaran instan untuk aktivitas Anda.',
    'ABC Juice Sirsak': 'Kesegaran unik buah sirsak dengan rasa manis-asam yang pas. Kaya akan vitamin, cocok sebagai pelepas dahaga.',
    'ABC Kopi Mocca': 'Racikan kopi instan premium dengan perpaduan rasa kopi dan cokelat (mocca) yang seimbang.',
    'ABC Kopi Susu': 'Perpaduan sempurna biji kopi pilihan dengan krimer nabati yang gurih. Menghasilkan rasa kopi susu yang mantap.',
    'ABC Klepon': 'Inovasi rasa tradisional dalam bentuk minuman praktis. Menghadirkan rasa manis gula aren dan aroma pandan kelapa.',
    'Ades': 'Air mineral jernih yang diproses dengan teknologi tinggi. Kemasan botolnya ramah lingkungan dan mudah didaur ulang.',
    'Adem Sari Ching Ku': 'Minuman fungsional dengan ekstrak citrus dan herbal alami. Membantu meredakan panas dalam dan menyegarkan tubuh.',
    'Floridina Coco': 'Minuman kelapa menyegarkan dengan bulir jeruk asli dan air kelapa pilihan.',
    'Floridina Orange': 'Rasakan sensasi jeruk Florida asli dengan bulir jeruk asli yang melimpah (real orange pulp).',
    'Frostbite Kopi Jelly': 'Sensasi minum kopi yang seru dengan tambahan potongan jelly kenyal di dalamnya.',
    'Golda Coffee': 'Kopi siap minum dengan standar kualitas tinggi. Menghadirkan tekstur yang sangat halus dan aroma kopi yang mantap.',
    'Espresso Kopi Susu Sak': 'Permen kopi dengan rasa espresso yang kuat dan paduan susu yang lembut.'
  };

  for (const cat of categories) {
    for (const p of cat.products) {
      let bestMatch = null;
      for (const [key, val] of Object.entries(descMap)) {
        if (p.name.toUpperCase().includes(key.toUpperCase())) {
          bestMatch = val;
          break;
        }
      }

      if (bestMatch) {
        await prisma.product.update({
          where: { id: p.id },
          data: { description: bestMatch }
        });
        console.log(`Updated (${cat.name}): ${p.name}`);
      }
    }
  }

  // 3. One more check for Dahlia Toiletball
  const dahlia = await prisma.product.findFirst({
    where: { name: { contains: 'DAHLIA TOILETBALL', mode: 'insensitive' } }
  });
  if (dahlia) {
    const householdCat = await prisma.category.findUnique({ where: { slug: 'kebutuhan-rumah-tangga' } });
    await prisma.product.update({
      where: { id: dahlia.id },
      data: { 
        description: 'Kamper toilet dengan aroma kopi yang kuat untuk menghilangkan bau tidak sedap secara efektif di area kamar mandi.',
        categoryId: householdCat ? householdCat.id : dahlia.categoryId
      }
    });
    console.log(`Fixed and Moved: ${dahlia.name}`);
  }
}

main().finally(() => prisma.$disconnect());
