const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const humanizedMap = [
  { name: 'Aice Bingo Chocolate', desc: 'Es krim stik dengan lapisan cokelat yang renyah di luar dan lembut di dalam. Pas banget buat nemenin waktu santai kamu!' },
  { name: 'Aice Chocolate Crispy', desc: 'Sensasi kriuk biskuitnya berpadu sempurna dengan es krim cokelat yang creamy. Camilan dingin yang nggak bakal ngebosenin.' },
  { name: 'Aice Chocolate Max', desc: 'Buat kamu pecinta cokelat sejati, rasakan kelezatan cokelat yang intens dan melimpah dalam setiap gigitannya.' },
  { name: 'Aice Choco Malt', desc: 'Paduan rasa malt yang khas dan cokelat yang manisnya pas. Ringan di lidah dan bener-bener nyegerin.' },
  { name: 'Aice Durian Cup', desc: 'Aroma duriannya dapet banget! Es krim cup praktis dengan rasa durian yang legit dan autentik.' },
  { name: 'Aice Mochi Chocolate', desc: 'Kenyal di luar, lumer di dalam! Mochi dingin dengan isian cokelat ini memberikan sensasi ngemil yang beda dari biasanya.' },
  { name: 'Aice Mochi Coklat', desc: 'Kulit mochi yang lembut dan kenyal berpadu dengan es krim cokelat yang dingin. Unik dan bikin ketagihan!' },
  { name: 'Aice Strawberry', desc: 'Rasa stroberinya seger banget dengan paduan manis dan sedikit asam yang pas. Mood booster buat hari yang panas.' },
  { name: 'Aice Semangka', desc: 'Bentuknya lucu kayak potongan semangka beneran! Seger banget dan ada butiran cokelat renyah sebagai bijinya.' },
  { name: 'Aice Crispy Ball', desc: 'Seru banget makan es krim yang ada bola-bola biskuit renyahnya. Tekstur crunchy-nya bener-bener juara!' },
  { name: 'Aice Nanas', desc: 'Segernya buah nanas tropis dalam setiap gigitan. Cocok buat kamu yang pengen yang dingin dan buah banget.' },
  { name: 'Aice Berry Cone', desc: 'Cone renyah dengan es krim rasa beri yang manis dan segar. Ada saus buahnya juga di tengah, makin mantap!' },
  { name: 'Aice Milk Melon', desc: 'Harum melonnya kerasa banget dipadu dengan lembutnya susu. Es krim yang bikin suasana hati jadi adem.' },
  { name: 'Paddle Pop Upin Ipin', desc: 'Es krim favorit anak-anak dengan karakter Upin & Ipin yang ceria. Rasanya manis dan pastinya disukai si kecil.' },
  { name: 'Paddle Pop Choco Lava', desc: 'Hati-hati ketagihan sama lelehan cokelat di dalemnya! Es krim cokelat yang lumer banget pas digigit.' },
  { name: 'Walls Twister Grape Lychee', desc: 'Ulir warna-warni dengan rasa anggur dan leci yang super seger. Pilihan paling oke buat mendinginkan suasana.' },
  { name: 'Walls Sweet Corn', desc: 'Bentuknya unik kayak jagung, rasanya pun jagung manis banget. Dibungkus wafer lembut yang enak dimakan.' },
  { name: 'Walls Oreo Stick', desc: 'Es krim vanila lembut dengan potongan biskuit Oreo asli. Dilapis cokelat tebal yang juga ada remahan Oreo-nya.' },
  { name: 'Walls Cornetto Silver Queen', desc: 'Perpaduan mewah es krim Wall\'s dengan potongan cokelat SilverQueen dan kacang mete. Kelezatan kelas atas dalam satu cone!' },
  { name: 'Walls Cornetto Mini', desc: 'Ukurannya imut tapi rasanya maksimal. Pas banget buat camilan cepat yang bikin happy.' },
  { name: 'Walls Populaire', desc: 'Es krim cup klasik dengan saus stroberi atau cokelat di atasnya. Teksturnya lembut banget, favorit sepanjang masa.' },
  { name: 'Walls Pop Minion', desc: 'Es krim cup edisi Minion yang lucu dan rasanya nyegerin. Anak-anak pasti suka sama perpaduan warnanya.' },
  { name: 'Walls Neopolitana', desc: 'Satu wadah dapet tiga rasa langsung: Cokelat, Vanila, dan Stroberi. Paling pas buat dinikmati bareng-bareng keluarga.' },
  { name: 'Walls Feast', desc: 'Klasik banget! Es krim stik dengan lapisan cokelat kacang yang gurih dan renyah. Selalu jadi pilihan favorit.' },
  { name: 'Walls Crunchy Milky Berry', desc: 'Gurihnya susu ketemu seger stroberi, dibalut cokelat putih yang renyah. Mewah dan unik rasanya!' },
  { name: 'Aqua', desc: 'Air mineral dari sumber pegunungan alami. Bener-bener murni dan seger buat balikin hidrasi tubuh kamu.' },
  { name: 'Ades', desc: 'Air minum yang jernih dan berkualitas. Botolnya juga gampang diremukkan, jadi lebih ramah lingkungan.' },
  { name: 'ABC Juice', desc: 'Sari buah asli yang rasanya seger dan manisnya pas. Praktis dibawa-bawa buat nemenin aktivitas seharian.' },
  { name: 'ABC Kopi Mocca', desc: 'Kopi instan dengan rasa cokelat mocca yang nikmat. Cocok buat nemenin kerja atau sekadar santai sore.' },
  { name: 'ABC Kopi Susu', desc: 'Mantapnya kopi berpadu dengan krimer yang gurih. Bikin semangat balik lagi setelah tegukan pertama.' },
  { name: 'ABC Klepon', desc: 'Unik banget! Minuman dengan rasa kue tradisional klepon, lengkap dengan aroma pandan dan gula aren.' },
  { name: 'Adem Sari Ching Ku', desc: 'Segernya lemon dipadu herbal alami. Pas banget diminum pas lagi gerah atau buat ngeredain panas dalam.' },
  { name: 'Floridina Coco', desc: 'Segernya air kelapa ketemu bulir jeruk asli. Kombinasi tropis yang bener-bener bikin haus ilang seketika.' },
  { name: 'Floridina Orange', desc: 'Ada bulir jeruk aslinya yang "kres" di mulut! Seger banget, apalagi diminum pas lagi dingin-dinginnya.' },
  { name: 'Frostbite Kopi Jelly', desc: 'Seru banget minum kopi yang ada potongan jelly kenyalnya. Kopi gula arennya berasa, teksturnya dapet.' },
  { name: 'Golda Coffee', desc: 'Kopi cappuccino siap minum yang teksturnya halus banget. Aromanya wangi, bikin mood langsung naik.' },
  { name: 'Espresso Kopi Susu Sak', desc: 'Permen kopi dengan rasa espresso yang kuat tapi tetep lembut karena ada campuran susunya. Penyelamat saat ngantuk!' }
];

async function main() {
  const categories = await prisma.category.findMany({
    where: { slug: { in: ['minuman-dan-eskrim', 'ice-cream'] } },
    include: { products: true }
  });

  let totalUpdated = 0;

  for (const cat of categories) {
    for (const p of cat.products) {
      const match = humanizedMap.find(h => p.name.toUpperCase().includes(h.name.toUpperCase()));
      if (match) {
        await prisma.product.update({
          where: { id: p.id },
          data: { description: match.desc }
        });
        console.log(`Updated: ${p.name} -> ${match.desc}`);
        totalUpdated++;
      }
    }
  }

  console.log(`\nSuccess! Updated ${totalUpdated} products with humanized descriptions.`);
}

main().finally(() => prisma.$disconnect());
