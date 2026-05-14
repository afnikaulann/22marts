const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = [
  { name: 'Pop Mie Cup Ayam Bawang 75 Gram', desc: 'Solusi lapar praktis dengan kuah kaldu ayam yang gurih dan aroma minyak bawang yang khas. Sangat pas dinikmati saat cuaca dingin atau sebagai teman perjalanan tanpa perlu repot memasak.' },
  { name: 'Pop Mie Cup Soto Ayam 77 Gram', desc: 'Menghadirkan kesegaran kuah soto ayam tradisional dengan sentuhan rasa jeruk nipis yang ringan. Dilengkapi dengan sayuran kering yang kembali segar saat diseduh air panas.', matches: ['POP MIE CUP SOTO AYAM 77 GR'] },
  { name: 'Pop Mie Cup Kari Ayam 75 Gram', desc: 'Varian kuah kari yang lebih kental dan kaya rempah. Memberikan sensasi rasa gurih yang mendalam dan aroma rempah kari yang langsung membangkitkan selera makan.', matches: ['POP MIE CUP KARI AYAM 75GR'] },
  { name: 'Pop Mie Cup Baso Sapi', desc: 'Mi seduh praktis dengan kuah kaldu sapi yang pekat. Menawarkan perpaduan rasa gurih kaldu dan tekstur mi keriting yang kenyal, lengkap dengan pelengkap rasa bakso yang nikmat.', matches: ['ABC Mie Cup Baso Sapi'] },
  { name: 'ABC Mie Cup Kari Ayam 60 Gram', desc: 'Pilihan mi cup ekonomis dengan bumbu kari yang kuat. Kuahnya beraroma rempah pekat yang pas untuk mengganjal perut di sela-sela aktivitas padat.' },
  { name: 'Pop Mie Cup Goreng 80 Gram', desc: 'Versi mi goreng praktis dalam cup. Menyajikan rasa mi goreng manis-gurih legendaris yang bisa langsung ditiriskan dan dinikmati tanpa perlu piring atau kompor.', matches: ['POP MIE CUP GORENG 80G'] },
  { name: 'Pop Mie Cup Goreng Pds Gledek 75 Gram', desc: 'Sesuai namanya, varian mi goreng ini menyimpan "sambaran" pedas yang ekstrem. Cocok bagi penantang rasa pedas yang mencari sensasi terbakar di lidah dalam format mi kering yang praktis.', matches: ['POP MIE CUP GORENG PDS GLEDEK 75G'] },
  { name: 'Pop Mie Cup Pedas Dower 75 Gram', desc: 'Versi kuah untuk pecinta pedas level dewa. Kuah merah meronanya memberikan sensasi pedas menyengat yang bikin bibir "dower", dipadukan dengan kaldu gurih yang bikin ketagihan.', matches: ['POP MIE CUP PEDAS DOWER 75G'] },
  { name: 'Pop Mie Cup Tori Miso 77 Gram', desc: 'Menghadirkan cita rasa ramen autentik Jepang dalam segenggam cup. Kuah misonya bertekstur creamy dan gurih, berpadu sempurna dengan aroma rumput laut dan kaldu ayam.', matches: ['POP MIE CUP TORI MISO 77 G'] },
  { name: 'Pop Mie Tori Kara 70 Gram', desc: 'Ramen instan ala Jepang dengan kuah kaldu ayam pedas (spicy chicken). Memberikan sensasi gurih, creamy, dan pedas yang menghangatkan tenggorokan.', matches: ['POP MIE TORI KARA 70G'] },
  { name: 'Pop Mie Ramyeon Spicy Cup', desc: 'Inovasi mi cup dengan inspirasi Ramyeon Korea. Memiliki tekstur mi yang lebih tebal dan kenyal, direndam dalam kuah merah pedas gurih ala drakor favorit Anda.', matches: ['POP MIE RAMYEON SPICY CUP'] },
  { name: 'Pop Spagheti Bolognese 84 Gram', desc: 'Pasta spageti instan pertama dalam cup. Dilengkapi dengan saus tomat khas Bolognese yang asam manis segar dan taburan daging cincang tiruan untuk pengalaman makan pasta dalam 3 menit.', matches: ['POP SPAGHETI BOLOGNESE 84G'] },
  { name: 'Pop Spagheti Carbonara 80 Gram', desc: 'Sajian spageti cup dengan saus Carbonara putih yang super creamy. Perpaduan rasa keju, susu, dan bumbu gurih yang meleleh di mulut, sangat cocok untuk penggemar pasta bernuansa milky.', matches: ['POP SPAGHETI CARBONARA 80 G'] },
  { name: 'Indomie Goreng 80 Gram', desc: 'Mi goreng legendaris kebanggaan Indonesia. Memiliki keseimbangan rasa yang sempurna antara manisnya kecap, gurihnya minyak bumbu, dan taburan bawang goreng renyah yang tak tergantikan.', matches: ['INDOMIE GORENG 80 GR'] },
  { name: 'Indomie Goreng Pedas 79 Gram', desc: 'Varian klasik mi goreng dengan tambahan ekstra cabai di dalam minyak bumbunya. Menghasilkan perpaduan rasa manis, gurih, dan pedas yang pas untuk dinikmati kapan saja.', matches: ['INDOMIE GORENG PEDAS 79GR'] },
  { name: 'Indomie Goreng Rendang 85 Gram', desc: 'Membawa kekayaan bumbu Rendang asli Minang ke dalam sajian mi goreng. Aroma rempah kelapa sangrai dan bumbu dagingnya sangat pekat, memberikan pengalaman makan mewah nan praktis.', matches: ['INDOMIE GORENG RENDANG 85G'] },
  { name: 'Indomie Goreng Aceh', desc: 'Mi goreng dengan helaian mi yang lebih tebal dan kenyal. Bumbunya diadaptasi dari mi goreng Aceh yang kaya akan kapulaga, jintan, dan rempah kuat lainnya dengan sedikit rasa pedas hangat.' },
  { name: 'Indomie Goreng Ayam Geprek 85 Gram', desc: 'Tren ayam geprek dalam seporsi mi. Bumbunya sangat menonjolkan aroma bawang putih mentah dan cabai rawit merah pedas yang langsung menyengat sejak gigitan pertama.', matches: ['INDOMIE GORENG AYAM GEPREK 85G'] },
  { name: 'Indomie Mie Nyemek Bangladesh', desc: 'Mengadaptasi menu mi "warkop" viral. Bumbunya kaya akan rempah sangrai ala bumbu Bangladesh, dirancang untuk dimasak sedikit berkuah (nyemek) agar tekstur bumbu mengental dan membalut mi dengan sempurna.' },
  { name: 'Indomie Kaldu 75 Gram', desc: 'Mi instan dengan rasa kaldu ayam bening yang paling mild (lembut). Pilihan tepat untuk menenangkan perut saat sedang kurang enak badan atau untuk menu makan malam yang ringan.', matches: ['INDOMIE KALDU 75GR'] },
  { name: 'Indomie Soto Mie 70 Gram', desc: 'Menyajikan rasa soto khas Jakarta dengan kuah kaldu yang segar dan sedikit rasa asam. Cocok dinikmati bersama irisan tomat segar dan telur rebus.', matches: ['INDOMIE SOTO MIE 70 GR'] },
  { name: 'Indomie Soto Lamongan', desc: 'Hadir dengan bumbu soto Jawa Timur yang khas. Dilengkapi dengan bubuk koya (kerupuk udang dan bawang putih) rahasia yang membuat kuahnya menjadi kental, gurih, dan beraroma khas.' },
  { name: 'Indomie Soto Banjar 75 Gram', desc: 'Menghadirkan keunikan soto khas Kalimantan Selatan. Kuahnya bening beraroma rempah kapulaga, cengkeh, dan kayu manis dengan sentuhan akhir perasan jeruk limau yang menyegarkan.', matches: ['INDOMIE SOTO BANJAR 75GR'] },
  { name: 'Indomie Mie Rawon Pedas 75 Gram', desc: 'Inovasi mi berkuah hitam legam khas Jawa Timur. Mengandung ekstrak kluwek asli yang memberikan rasa gurih (earthy) yang mendalam, berpadu dengan sensasi pedas yang membakar lidah.', matches: ['INDOMIE MIE RAWON PEDAS 75GR'] },
  { name: 'Indomie Hype Seblak 75 Gram', desc: 'Membawa sensasi jajanan khas Bandung ke rumah. Cita rasanya sangat identik dengan kuah seblak asli: aroma kencur yang kuat dipadukan dengan level pedas yang menantang.', matches: ['INDOMIE HYPE SEBLAK 75G'] },
  { name: 'Mie ABC Soto Ayam', desc: 'Soto ayam instan dengan kuah berwarna kuning cerah. Memiliki karakter kaldu yang ringan dengan sensasi segar jeruk nipis, sangat bersahabat di lidah semua kalangan.' },
  { name: 'Megah Mie Kaldu', desc: 'Mi instan porsi pas dengan harga yang sangat bersahabat. Menyajikan kuah kaldu sederhana yang klasik dan nikmat, cocok sebagai stok kebutuhan akhir bulan.', matches: ['MEGAH MIE KALDU'] },
  { name: 'ABC Mie Selera Ayam Gulai Pedas', desc: 'Perpaduan kuah santan gulai yang creamy dan kental dengan bumbu cabai yang nendang. Sensasi makan masakan Padang pedas dalam bentuk mi instan berkuah.' },
  { name: 'ABC Mie Selera Pedas Sup Tomat 70 Gram', desc: 'Kombinasi unik antara kuah sup tomat yang asam-manis menyegarkan dengan sengatan rasa pedas cabai asli. Kuahnya merah menggoda dan sangat pas diseruput hangat-hangat.', matches: ['ABC MIE SELERA PEDAS SUP TOMAT 70GR', 'ABC Mie Selera Pedas Sup Tomat 70 Gram'] },
  { name: 'ABC Mie Selera Pedas Nampol', desc: 'Diciptakan khusus untuk chili head (pecinta pedas). Kuahnya didominasi oleh ekstrak cabai pekat yang langsung memanaskan kerongkongan sejak suapan pertama.' },
  { name: 'Indomie Spicy Ramyeon 83 Gram', desc: 'Mi instan premium berkuah merah ala Korea. Memiliki helai mi yang lebih tebal dan chewy dengan profil kuah pedas gurih yang bold, setara dengan kualitas mi impor.', matches: ['INDOMIE SPICY RAMYEON 83 GR'] },
  { name: 'Lemonilo Mie Goreng 80 Gram', desc: 'Mi sehat berwarna hijau alami dari ekstrak saripati bayam. Proses pembuatannya dipanggang (bukan digoreng), sehingga bebas lemak trans dan memiliki rasa bumbu tanpa penguat rasa berlebih yang aman untuk keluarga.' },
  { name: 'Lemonilo Mie Pedas Korea 85 Gram', desc: 'Versi sehat untuk ngidam mi pedas Korea. Mienya dibuat tanpa melalui proses penggorengan, disajikan dengan bumbu pedas manis Korea yang nikmat tanpa membuat guilty pleasure berlebihan.', matches: ['LEMONILO MIE PEDAS KOREA 85G'] },
  { name: 'Mie Gelas Kari Ayam 28 Gram', desc: 'Solusi lapar tanggung yang sangat praktis. Cukup seduh di dalam gelas (mug) dengan air panas. Porsi mininya menghadirkan kuah kari gurih yang pas untuk sarapan kilat atau camilan sore.', matches: ['MIE GELAS KARI AYAM 28G'] },
  { name: 'Mie Gelas Baso Sapi 28 Gram', desc: 'Mi porsi seduh gelas dengan cita rasa kuah kaldu bakso sapi kesukaan anak-anak. Dilengkapi pelengkap protein nabati kecil-kecil yang bikin acara mengemil jadi lebih seru.', matches: ['MIE GELAS BASO SAPI 28G'] },
  { name: 'Mie Indomie Ayam Bawang 69 Gram', desc: 'Mi kuah klasik yang selalu menjadi comfort food andalan keluarga. Menawarkan racikan kaldu ayam bening yang ringan namun sangat gurih, dipadukan dengan minyak bawang merah murni yang memberikan aroma harum yang khas dan efek menghangatkan di perut. Sangat pas untuk cuaca dingin.', matches: ['MIE INDOMIE AYAM BAWANG 69 GR'] },
  { name: 'Mie Sedaap Ayam Bawang', desc: 'Sajian mi kuah dengan profil kaldu ayam dan aroma bawang yang lebih bold (kuat). Bumbunya diracik khusus untuk memberikan sensasi gurih ekstra yang lebih nendang di lidah, berpadu sempurna dengan tekstur mi kenyal khas Mie Sedaap. Pilihan tepat bagi yang menyukai cita rasa kuah yang lebih pekat dan berani.' }
];

async function main() {
  const allProducts = await prisma.product.findMany({
    where: { category: { slug: 'mie-instan' } }
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
