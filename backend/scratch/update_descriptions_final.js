const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const descriptionMap = [
  {
    names: ['Aice Bingo Chocolate'],
    desc: 'Nikmati sensasi klasik es krim cokelat stik dengan balutan cokelat premium yang renyah. Tekstur creamy di dalam dan crunchy di luar membuat setiap gigitan Aice Bingo Chocolate menjadi momen yang memuaskan.'
  },
  {
    names: ['Aice Chocolate Crispy'],
    desc: 'Kombinasi sempurna es krim cokelat lembut dengan butiran biskuit renyah yang melimpah. Ukuran yang pas untuk menemani waktu istirahat Anda dengan kelezatan ganda.'
  },
  {
    names: ['Aice Chocolate Max'],
    desc: 'Untuk pecinta cokelat sejati, Aice Chocolate Max hadir dengan rasa cokelat yang intens dan mendalam. Setiap suapan memberikan kepuasan maksimal dengan tekstur es krim yang sangat halus.'
  },
  {
    names: ['Aice Choco Malt'],
    desc: 'Perpaduan unik antara cokelat yang kaya dan aroma malt yang khas. Aice Choco Malt memberikan rasa manis yang tidak membosankan dan sangat menyegarkan di lidah.'
  },
  {
    names: ['Aice Durian Cup'],
    desc: 'Hadirkan kemewahan buah durian asli dalam bentuk es krim cup yang praktis. Aroma durian yang kuat dan rasa manis legitnya akan memanjakan lidah para pecinta raja buah ini.'
  },
  {
    names: ['Aice Mochi Chocolate', 'AICE MOCHI COKLAT'],
    desc: 'Es krim mochi ikonik dari Aice dengan kulit yang sangat kenyal dan isian cokelat lumer. Sensasi unik mengunyah mochi dingin yang memberikan pengalaman rasa berbeda dari es krim biasa.'
  },
  {
    names: ['Aice Strawberry'],
    desc: 'Kesegaran buah stroberi pilihan dalam balutan es krim yang lembut. Memberikan rasa asam manis yang seimbang, sangat cocok untuk mendinginkan hari yang terik.'
  },
  {
    names: ['PADLE POP UPIN IPIN', 'PADDLE POP UPIN IPIN'],
    desc: 'Petualangan rasa seru bersama karakter favorit Upin & Ipin! Es krim stik yang ceria dengan kombinasi rasa buah yang disukai anak-anak, aman dan higienis untuk dikonsumsi setiap hari.'
  },
  {
    names: ['WALLS PADDLE POP CHOCO LAVA'],
    desc: 'Temukan kejutan lelehan saus cokelat cair (lava) di tengah es krim cokelat yang lembut. Paddle Pop Choco Lava memberikan sensasi lumer di mulut yang akan membuat siapa saja ketagihan.'
  },
  {
    names: ['AICE SEMANGKA'],
    desc: 'Es krim paling ikonik dengan bentuk dan rasa semangka asli yang sangat menyegarkan. Dilengkapi butiran choco chips sebagai biji semangka, memberikan tekstur renyah di setiap gigitan.'
  },
  {
    names: ['AICE CRISPY BALL'],
    desc: 'Sensasi seru makan es krim dengan taburan bola-bola biskuit yang sangat renyah. Perpaduan es krim susu yang lembut dan lapisan cokelat tebal yang memberikan kepuasan di setiap gigitan.'
  },
  {
    names: ['WALLS TWISTER GRAPE LYCHEE'],
    desc: 'Bentuk ulir twister yang unik dengan perpaduan rasa anggur yang manis dan leci yang harum. Es krim buah yang sangat segar dan memberikan sensasi menyegarkan di lidah.'
  },
  {
    names: ['WALLS SWEET CORN'],
    desc: 'Es krim legendaris dengan bentuk menyerupai jagung asli. Menghadirkan rasa jagung manis yang autentik dengan aroma yang menggoda, dibalut wafer lembut yang nikmat.'
  },
  {
    names: ['WALLS OREO STICK'],
    desc: 'Kolaborasi sempurna antara es krim vanila Wall\'s dan biskuit Oreo yang legendaris. Taburan potongan Oreo di dalam dan lapisan cokelat Oreo di luar memberikan kepuasan maksimal.'
  },
  {
    names: ['WALLS CORNETTO SILVER QUEEN'],
    desc: 'Mahakarya es krim cone yang memadukan kelembutan Wall\'s dengan potongan cokelat SilverQueen dan kacang mete asli. Kemewahan cokelat dalam setiap gigitan hingga ke ujung cone.'
  },
  {
    names: ['WALLS CORNETTO MINI OREO'],
    desc: 'Porsi mini namun rasa maksimal! Nikmati kelezatan Oreo dalam kemasan cone mini yang praktis, pas untuk camilan ringan yang menyenangkan kapan saja.'
  },
  {
    names: ['WALLS CORNETTO MINI CHOCOLATE'],
    desc: 'Kombinasi klasik cokelat dan vanila dalam ukuran mini yang pas. Cone renyah dengan kejutan cokelat di ujungnya, favorit semua anggota keluarga.'
  },
  {
    names: ['WALLS POPULAIRE STRAWBERRY'],
    desc: 'Es krim cup praktis dengan rasa stroberi yang segar dan vanila yang lembut. Dilengkapi saus stroberi yang manis, cocok untuk hidangan penutup yang ringan.'
  },
  {
    names: ['WALLS POPULAIRE COKLAT'],
    desc: 'Kemewahan rasa cokelat dan vanila dalam satu cup. Tekstur es krim yang sangat lembut dengan siraman saus cokelat yang kaya rasa.'
  },
  {
    names: ['WALLS POP MINION'],
    desc: 'Es krim cup edisi spesial Minions yang ceria! Menghadirkan rasa buah yang unik dan menyegarkan, pasti disukai anak-anak dan kolektor pernak-pernik Minions.'
  },
  {
    names: ['WALLS PADDLE POP TWISTER MAGIC'],
    desc: 'Es krim twister dengan warna-warni "ajaib" yang menarik. Menawarkan ledakan rasa buah yang segar dalam setiap putaran ulirnya.'
  },
  {
    names: ['WALLS NEOPOLITANA'],
    desc: 'Pilihan tepat untuk momen berkumpul bersama keluarga. Tiga rasa favorit (Cokelat, Vanila, Stroberi) dalam satu kemasan besar yang siap memeriahkan suasana rumah Anda.'
  },
  {
    names: ['WALLS FEAST VANILLA'],
    desc: 'Es krim stik vanila klasik dengan lapisan cokelat tebal dan taburan kacang mete yang gurih. Memberikan sensasi "pesta" rasa di setiap gigitan.'
  },
  {
    names: ['WALLS FEAST CHOCOLATE'],
    desc: 'Varian favorit pecinta cokelat! Es krim cokelat yang kaya rasa, dibalut cokelat renyah dan kacang mete pilihan yang menggugah selera.'
  },
  {
    names: ['WALLS CRUNCHY MILKY BERRY'],
    desc: 'Perpaduan istimewa rasa susu yang creamy dengan saus beri yang segar. Dilapisi cokelat putih renyah yang memberikan sensasi rasa mewah.'
  },
  {
    names: ['AICE NANAS'],
    desc: 'Kesegaran buah nanas tropis dalam bentuk es krim stik yang ringan. Rasa manis dan sedikit asamnya sangat pas untuk mendinginkan tubuh di siang hari yang terik.'
  },
  {
    names: ['AICE BERRY CONE'],
    desc: 'Es krim cone dengan rasa beri yang menyegarkan. Perpaduan antara cone renyah, es krim lembut, dan saus buah yang memberikan keseimbangan rasa yang sempurna.'
  },
  {
    names: ['AICE MILK MELON'],
    desc: 'Aroma melon yang harum dan rasa susu yang lembut menyatu dalam Aice Milk Melon. Es krim yang menenangkan dan memberikan kesegaran alami.'
  },
  {
    names: ['Aqua', 'AQUA'],
    desc: 'Air mineral murni dari sumber pegunungan alami yang terjaga keasliannya. Melalui proses filtrasi alami untuk memastikan setiap tetesnya memberikan hidrasi sehat bagi tubuh Anda.'
  },
  {
    names: ['ABC Lechee Juice', 'ABC Lychee Juice'],
    desc: 'Sari buah leci asli yang menghadirkan rasa manis segar dan aroma bunga yang harum. Dikemas secara higienis untuk menjaga kesegaran alami buah leci pilihan.'
  },
  {
    names: ['ABC Juice Mangga'],
    desc: 'Nikmati kelezatan mangga tropis yang manis dan kaya vitamin. Sari buah mangga ABC memberikan kesegaran instan dan energi tambahan untuk aktivitas Anda.'
  },
  {
    names: ['ABC Juice Sirsak'],
    desc: 'Kesegaran unik buah sirsak dengan rasa manis-asam yang pas. Kaya akan serat alami dan vitamin, cocok sebagai pelepas dahaga yang menyehatkan.'
  },
  {
    names: ['ABC Kopi Mocca', 'ABC KOPI MOCCA'],
    desc: 'Racikan kopi instan premium dengan perpaduan rasa kopi dan cokelat (mocca) yang seimbang. Aromanya yang harum akan membangkitkan semangat Anda di pagi hari.'
  },
  {
    names: ['ABC Kopi Susu', 'ABC KOPI SUSU'],
    desc: 'Perpaduan sempurna biji kopi pilihan dengan krimer nabati yang gurih. Menghasilkan rasa kopi susu yang mantap dan tekstur yang creamy di lidah.'
  },
  {
    names: ['ABC Klepon'],
    desc: 'Inovasi rasa tradisional dalam bentuk minuman praktis. Menghadirkan rasa manis gula aren dan aroma pandan kelapa khas klepon yang autentik.'
  },
  {
    names: ['Ades'],
    desc: 'Air mineral jernih yang diproses dengan teknologi tinggi untuk menjaga kemurniannya. Kemasan botolnya yang ramah lingkungan mudah diremukkan setelah digunakan.'
  },
  {
    names: ['Adem Sari Ching Ku'],
    desc: 'Minuman fungsional dengan ekstrak citrus dan herbal alami. Membantu meredakan gejala panas dalam dan memberikan kesegaran ekstra bagi tubuh Anda.'
  },
  {
    names: ['FLORIDINA COCO'],
    desc: 'Minuman kelapa menyegarkan dengan bulir jeruk asli dan air kelapa pilihan. Perpaduan rasa tropis yang unik untuk hidrasi yang lebih menyenangkan.'
  },
  {
    names: ['FLORIDINA ORANGE'],
    desc: 'Rasakan sensasi jeruk Florida asli dengan bulir jeruk asli yang melimpah (real orange pulp). Minuman kaya Vitamin C untuk menjaga daya tahan tubuh setiap hari.'
  },
  {
    names: ['FROSTBITE KOPI JELLY'],
    desc: 'Sensasi minum kopi yang seru dengan tambahan potongan jelly kenyal di dalamnya. Perpaduan kopi gula aren yang aromatik dan tekstur jelly yang menyenangkan.'
  },
  {
    names: ['GOLDA COFFEE'],
    desc: 'Kopi siap minum dengan standar kualitas Italia. Menghadirkan tekstur cappuccino yang sangat halus (smooth) dan aroma kopi yang membangkitkan energi seketika.'
  },
  {
    names: ['DAHLIA TOILETBALL'],
    desc: 'Kamper toilet dengan aroma kopi yang kuat untuk menghilangkan bau tidak sedap secara efektif. Memberikan kesegaran tahan lama di area kamar mandi Anda.',
    moveCategory: 'kebutuhan-rumah-tangga'
  },
  {
    names: ['ESPRESSO KOPI SUSU SAK'],
    desc: 'Permen kopi dengan rasa espresso yang kuat dan paduan susu yang lembut. Pilihan tepat bagi pecinta kopi untuk dinikmati di mana saja dan kapan saja.'
  }
];

async function main() {
  const products = await prisma.product.findMany({
    include: { category: true }
  });

  const categories = await prisma.category.findMany();
  const householdCat = categories.find(c => c.slug === 'kebutuhan-rumah-tangga');

  let updatedCount = 0;

  for (const product of products) {
    const match = descriptionMap.find(item => 
      item.names.some(name => product.name.toUpperCase().includes(name.toUpperCase()))
    );

    if (match) {
      const updateData = { description: match.desc };
      
      if (match.moveCategory && householdCat) {
        updateData.categoryId = householdCat.id;
        console.log(`Moving ${product.name} to Kebutuhan Rumah Tangga`);
      }

      await prisma.product.update({
        where: { id: product.id },
        data: updateData
      });
      console.log(`Updated: ${product.name}`);
      updatedCount++;
    }
  }

  console.log(`\nFinished! Total products updated: ${updatedCount}`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
