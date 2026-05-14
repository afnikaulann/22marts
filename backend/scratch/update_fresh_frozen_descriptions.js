const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = [
  { name: 'Kanzler Sosis Original 65 GR', desc: 'Sosis siap makan premium yang terbuat dari daging sapi dan ayam pilihan berkualitas tinggi. Memiliki tekstur daging yang padat, juicy, dan kulit sosis renyah yang memberikan sensasi kress saat digigit tanpa perlu dikupas.' },
  { name: 'Kanzler Singles Hot 60GR', desc: 'Inovasi sosis siap makan dengan perpaduan daging premium dan racikan bumbu pedas yang meresap sempurna. Cocok untuk camilan instan atau pendamping mi instan bagi pecinta rasa pedas yang praktis.' },
  { name: 'Kanzler Singles Gochujang 60GR', desc: 'Menghadirkan sensasi cita rasa Korea dalam satu gigitan. Sosis premium siap makan ini dibalut dengan saus gochujang autentik yang menawarkan keseimbangan rasa pedas, manis, dan gurih yang adiktif.' },
  { name: 'Kanzler Singles Bakso Hot 55GR', desc: 'Bakso siap santap pertama di Indonesia dengan tekstur meaty (berdaging) yang sangat terasa. Dilengkapi dengan saus sambal pedas di dalam kemasannya, siap dinikmati kapan saja sebagai pengganjal lapar.' },
  { name: 'Kanzler Single Bakso Keju 48 GR', desc: 'Kombinasi sempurna antara bakso daging premium yang kenyal dengan isian keju lumer di dalamnya. Menawarkan sensasi gurih berlapis yang praktis dinikmati langsung tanpa perlu dipanaskan.' },
  { name: 'Fiesta Sosis Cheesy Melts 65 GR', desc: 'Sosis siap santap dengan keju cheddar berkualitas yang meleleh di setiap gigitan. Praktis untuk bekal, camilan, atau tambahan topping hidangan dengan rasa gurih keju yang creamy.' },
  { name: 'Kanzler Crispy Chicken Nugget Crumble 450 GR', desc: 'Nugget ayam level premium yang dilapisi dengan bubble crumb (tepung roti gelembung) ekstra garing. Memberikan sensasi renyah yang tahan lama di luar, namun tetap juicy dan lembut daging ayamnya di dalam.' },
  { name: 'Kanzler Crispy Chicken Nugget 250 GR', desc: 'Versi kemasan ekonomis dari nugget bubble crumb ikonik Kanzler. Pilihan pas untuk kebutuhan keluarga kecil yang menginginkan kualitas nugget ayam ekstra renyah setara hidangan kafe.' },
  { name: 'Kanzler Ngget Crspy Spicy 450 GR', desc: 'Nugget crispy premium berbalut bubble crumb dengan tambahan sensasi pedas dari dalam adonan dagingnya. Sangat cocok bagi pecinta makanan pedas yang menginginkan tekstur garing maksimal.' },
  { name: 'Kanzler Crispy Chicken Stick 450 GR', desc: 'Olahan daging ayam giling premium yang dibentuk menyerupai stik memanjang, dilapisi tepung crispy andalan Kanzler. Mudah digenggam dan dicocol, menjadikannya camilan favorit anak hingga dewasa.' },
  { name: 'Kanzler Beef Cocktail Sausage 250 GR', desc: 'Sosis sapi mini gaya Eropa dengan kandungan daging sapi yang sangat dominan dan cita rasa pengasapan ( smoked) yang kuat. Ideal untuk isian roti, campuran sup merah, atau menu sarapan ala hotel.' },
  { name: 'Bakso Mercon Aroma Jaya', desc: 'Bakso beku dengan isian cabai rawit merah melimpah yang siap meledak di mulut. Terbuat dari adonan daging sapi berkualitas dengan tekstur urat yang pas, cocok untuk disajikan berkuah maupun dibakar.' },
  { name: 'Fiesta Chicken Nuget 400 GR', desc: 'Nugget legendaris favorit keluarga yang terbuat dari dada ayam cincang pilihan tanpa tambahan MSG berlebih. Memiliki tekstur daging yang seratnya terasa dan rasa gurih kaldu yang autentik.' },
  { name: 'Fiesta Chicken Nuget Stikie 400 GR', desc: 'Nugget ayam Fiesta dalam bentuk stik yang ramping dan panjang. Sangat praktis untuk digoreng cepat dan pas di kotak bekal anak, dengan kualitas rasa dada ayam premium yang konsisten.' },
  { name: 'Fiesta Siomay', desc: 'Siomay ayam frozen bertekstur padat dan lembut dengan aroma minyak wijen yang menggugah selera. Praktis dikukus atau digoreng untuk menghadirkan sajian dimsum ala restoran di rumah.' },
  { name: 'So Good Crispy Chicken Nugget 400G', desc: 'Nugget ayam dengan balutan tepung roti renyah klasik. Diformulasikan khusus agar tetap gurih dan krispi meski sudah dingin, menjadikannya pilihan andalan untuk lauk makan sehari-hari.' },
  { name: 'So Good Spicy Wings 400G', desc: 'Potongan sayap ayam pilihan yang sudah dimarinasi dengan bumbu pedas manis meresap hingga ke tulang. Tinggal digoreng atau di- air fryer untuk mendapatkan tekstur karamelisasi bumbu yang lezat.' },
  { name: 'So Good Sosis Jepang Hot', desc: 'Sosis ayam dan sapi dengan selongsong kolagen yang aman dimakan, menghasilkan tekstur crunchy saat digigit layaknya sosis premium Jepang, ditambah sentuhan rasa pedas yang pas.' },
  { name: 'So Good Dinobites', desc: 'Nugget ayam dengan bentuk dinosaurus yang lucu dan menyenangkan. Terbuat dari olahan daging ayam bergizi yang dirancang khusus untuk meningkatkan nafsu makan anak-anak saat jam makan.' },
  { name: 'So Good Alphabet 400 GR', desc: 'Nugget ayam edukatif berbentuk huruf-huruf abjad. Menggabungkan nutrisi protein ayam yang baik dengan pengalaman makan yang interaktif dan menyenangkan untuk si kecil.' },
  { name: 'Belfoods Chicken Nugget Crunchy', desc: 'Nugget ayam dengan tekstur tepung pelapis yang diformulasikan untuk ekstra garing. Memberikan suara kriuk yang renyah di setiap gigitan dengan rasa daging ayam yang gurih.' },
  { name: 'Belfoods Chicken Ngt Corn 450 Gram', desc: 'Inovasi nugget ayam yang lapisan luarnya menggunakan serpihan jagung (corn flakes). Menghasilkan tekstur kerenyahan yang berbeda, lebih ringan, dan sedikit sentuhan rasa manis jagung panggang.' },
  { name: 'Fundoh Nugget', desc: 'Pilihan nugget ayam ekonomis yang praktis dan ramah di kantong. Cocok untuk persediaan lauk harian yang cepat disajikan dengan rasa gurih yang tetap disukai keluarga.' },
  { name: 'Anggur Hijau', desc: 'Anggur hijau segar pilihan dengan tekstur daging buah yang renyah ( garing ) dan rasa manis menyegarkan. Praktis dikonsumsi langsung sebagai camilan sehat yang kaya akan vitamin C dan antioksidan alami.' }
];

async function main() {
  const allProducts = await prisma.product.findMany({
    where: { category: { slug: 'fresh-frozen-food' } }
  });

  for (const item of updates) {
    const product = allProducts.find(p => {
        const dbName = p.name.toUpperCase().trim();
        const reqName = item.name.toUpperCase().trim();
        // Check for direct match or keyword match (e.g. Ngt Corn vs NGT CORN)
        return dbName === reqName || dbName.includes(reqName.replace(/Chicken /i, '').replace(/Nuget/i, 'NGT')) || reqName.includes(dbName);
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
