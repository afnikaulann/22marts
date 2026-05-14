const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = [
  { name: 'Beng-Beng Choco 22 Gram', desc: 'Camilan sensasional empat lapis yang tak pernah salah. Memadukan wafer renyah, karamel kenyal, krim cokelat manis, dan taburan rice crispy garing yang dibalut cokelat susu tebal. Nikmat digigit langsung atau didinginkan di kulkas!', matches: ['BENG BENG CHOCO 22 Gram', 'BENG BENG CHOCO 22G'] },
  { name: 'Beng-Beng Choco Pack (3 x 20 Gram)', desc: 'Kemasan multipack ekonomis berisi 3 bar Beng-Beng ukuran reguler. Solusi paling pas untuk stok camilan anak, dibagikan ke teman, atau bekal manis saat bepergian.', matches: ['BENG BENG CHOCO PACK 3x20g'] },
  { name: 'Beng-Beng Maxx 32 Gram', desc: 'Sensasi makan Beng-Beng yang jauh lebih puas! Hadir dengan ukuran bar yang lebih panjang, besar, dan tebal, memberikan ekstasi perpaduan karamel, wafer, dan crispy cokelat yang lebih memanjakan mulut.', matches: ['BENG BENG MAXX 32G'] },
  { name: 'Beng-Beng Nuts Almond', desc: 'Inovasi premium dari Beng-Beng. Mengganti rice crispy biasa dengan taburan kacang almond panggang asli. Menawarkan sensasi crunchy ganda dengan profil rasa cokelat kacang yang lebih mewah, wangi, dan nutty.', matches: ['BENG BENG NUTS ALMOND'] },
  { name: 'Better Big 27 Gram', desc: 'Biskuit sandwich berukuran ekstra yang dilapisi cokelat pekat nan tebal dengan isian krim vanila lembut di tengahnya. Ukurannya yang besar menjadikannya pengganjal lapar yang pas untuk menemani secangkir teh atau kopi.' },
  { name: 'Nissin Walens Soes Blueberry 100GR', desc: 'Kue sus kering bertekstur renyah di luar dengan kejutan krim blueberry yang lumer di dalam. Memberikan perpaduan rasa gurih adonan sus dan manis-asam buah yang menyegarkan. Sangat cantik disajikan sebagai kudapan tamu.' },
  { name: 'Lotte Toppo Cocoa Chocolate 17GR', desc: 'Biskuit stik renyah bergaya Jepang dengan rongga yang diisi penuh oleh pasta cokelat hitam (cocoa) pekat. Karena cokelatnya ada di dalam stik, jari Anda dijamin tetap bersih dan tidak lengket saat asyik ngemil.' },
  { name: 'Lotte Toppo Vanilla Chocolate 17GR', desc: 'Stik pretzel panggang renyah dengan isian krim vanila dan cokelat putih yang lumer di mulut. Perpaduan gurihnya stik dan manisnya vanila bikin sesi ngemil makin asyik tanpa bikin tangan kotor.' },
  { name: 'Oreo Chocolate', desc: 'Varian Oreo khusus untuk pecinta double chocolate. Biskuit hitam renyahnya mengapit krim cokelat pekat yang manisnya pas, sangat sempurna untuk dicelup ke dalam segelas susu segar.', matches: ['OREO CHOCO 27GR', 'OREO CHOCOLATE 119.6GR'] },
  { name: 'Oreo Blueberry Ice Cream', desc: 'Biskuit Oreo legendaris dengan krim rasa es krim blueberry yang unik. Krimnya memberikan sensasi dingin (cooling effect) yang menyegarkan di lidah dengan perpaduan rasa manis dan asam buah beri yang khas.', matches: ['OREO BBERRY 36.8GR', 'OREO BERRY IC 110.6 GR'] },
  { name: 'Oreo Dark & White Cho 119.6GR', desc: 'Harmoni dua rasa dalam satu keping. Isian krimnya memadukan rasa dark chocolate yang agak pahit elegan dengan white chocolate yang manis dan creamy, menyeimbangkan rasa biskuit hitamnya dengan sempurna.' },
  { name: 'Oreo Keju Cake Kraft', desc: 'Kolaborasi epik biskuit Oreo hitam dengan isian krim keju gurih khas Kraft. Menghasilkan perpaduan rasa manis cokelat dan gurih asin keju yang lumer layaknya memakan kue cheesecake.', matches: ['OREO KEJU CAKE KRAFT', 'OREO KEJUCAKE KRAFT'] },
  { name: 'Oreo Mini Cup Strawbery 61.3GR', desc: 'Versi mini dari biskuit Oreo klasik yang bisa dinikmati dalam sekali "hap" tanpa remah berjatuhan. Kemasan cup dengan zip ini sangat ramah dibawa-bawa untuk ngemil di mobil, menonton bioskop, atau bekal sekolah anak.' },
  { name: 'Oreo Mini Chocolate 61GR POUCH', desc: 'Versi mini dari biskuit Oreo klasik yang bisa dinikmati dalam sekali "hap" tanpa remah berjatuhan. Kemasan pouch dengan zip ini sangat ramah dibawa-bawa untuk ngemil di mobil, menonton bioskop, atau bekal sekolah anak.' },
  { name: 'Chitato Sapi Panggang', desc: 'Keripik kentang bergelombang legendaris (wavy chips) dengan bumbu Sapi Panggang khas yang gurihnya meresap di tiap lekukan. Tersedia dari ukuran porsi icip-icip untuk sendiri hingga porsi besar untuk pesta bareng teman.', matches: ['CHITATO SAPI PANGGANG 19.5GR', 'CHITATO SAPI PANGGANG 35GR', 'CHITATO SAPI PANGGANG 68 GR', 'CHITATO SAPI PANGGANG 120GR'] },
  { name: 'Chitato Ayam Bumbu 68 GR', desc: 'Menawarkan rasa gurih bumbu ayam panggang tradisional yang kaya akan kaldu. Potongan keripik bergelombangnya menangkap serbuk bumbu lebih banyak, menghasilkan rasa sedap yang konsisten di tiap kepingnya.' },
  { name: 'Chitato Cheese 68GR', desc: 'Diciptakan khusus untuk cheese lovers. Potongan keripik kentang tebal berlekuk ini dibalut dengan taburan bumbu keju pekat yang memberikan sensasi rasa manis, gurih, dan sangat creamy.', matches: ['CHITATO CHESEE 68GR'] },
  { name: 'Chitato Lite BBQ 65 GR', desc: 'Evolusi Chitato dengan potongan tipe flat (datar) yang 100% tipis sempurna. Bumbu Barbeque-nya terasa lebih merata dan ringan, menghasilkan suara kriuk yang renyah dan gurih tanpa sisa minyak berlebih di tangan.' },
  { name: 'Chitato Lite Rumput Laut', desc: 'Keripik kentang setipis kertas dengan taburan serpihan nori (rumput laut) asli. Memberikan sensasi rasa umami khas laut yang ringan, salty, dan dijamin bikin nagih. Teman paling pas untuk maraton serial favorit.', matches: ['CHITATO LITE RUMPUT LITE 35GR', 'CHITATO LITE RUMPUT LAUT 68GR'] },
  { name: 'Chitato Lite Salmon 68 GR', desc: 'Varian eksklusif dengan cita rasa premium bumbu salmon teriyaki. Memadukan keripik kentang flat ekstra tipis dengan rasa gurih, manis, dan smokey hidangan seafood ala restoran Jepang.' },
  { name: 'Apetito BBQ 41 Gram', desc: 'Snack biskuit berbentuk stik panjang yang dipanggang renyah dengan bumbu barbeque. Rasanya gurih, sedikit manis, dan beraroma smokey dengan bumbu yang menempel merata di setiap batang stiknya.' },
  { name: 'Apetito Pizza 41 Gram', desc: 'Stik biskuit renyah yang membawa sensasi makan sepotong piza Italia. Kaya akan bumbu tabur beraroma tomat, keju leleh, dan rempah oregano yang kuat nan menggugah selera.' },
  { name: 'Brio Potato BBQ 49 Gram', desc: 'Biskuit berbahan dasar kentang yang diiris tipis dan dipanggang (baked, not fried) sehingga tidak berminyak di tenggorokan. Dilengkapi taburan bumbu BBQ gurih, cocok untuk ngemil santai dengan rasa yang lebih ringan.' },
  { name: 'Alpenliebe Roll 32 Gram', desc: 'Permen karamel susu klasik dalam kemasan roll yang mudah dibawa. Teksturnya yang sangat halus perlahan lumer di mulut, memberikan perpaduan rasa manis karamel pekat dan kelembutan susu yang creamy.' },
  { name: 'Big Babol Tutti Frutti', desc: 'Permen karet ikonik yang diformulasikan sangat kenyal dan lentur, dirancang khusus untuk membuat gelembung karet super besar. Hadir dengan rasa tutti frutti (buah-buahan) yang manis, menyegarkan, dan rasa yang awet dikunyah.', matches: ['BIg Babol Tutti Frutti'] }
];

async function main() {
  const allProducts = await prisma.product.findMany({
    where: { category: { slug: 'snack' } }
  });

  for (const item of updates) {
    const targets = allProducts.filter(p => {
        const name = p.name.toUpperCase();
        if (item.matches) {
            return item.matches.some(m => name.includes(m.toUpperCase()));
        }
        return name.includes(item.name.toUpperCase().trim());
    });

    for (const product of targets) {
      await prisma.product.update({
        where: { id: product.id },
        data: { description: item.desc }
      });
      console.log(`Updated: ${product.name}`);
    }
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
