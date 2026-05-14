const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = [
  { name: 'ABC Kecap Asin 133 ML', desc: 'Terbuat dari perasan pertama kedelai pilihan, memberikan profil rasa asin-gurih yang tajam dan otentik. Sangat ideal untuk marinasi daging, bumbu dasar masakan Chinese food, atau sekadar sebagai cocolan peningkat umami.' },
  { name: 'ABC Saos Tomat 135 ML', desc: 'Dibuat dari tomat segar berkualitas dengan keseimbangan rasa manis dan asam yang pas. Teksturnya yang kental menempel sempurna pada gorengan dan sangat cocok dijadikan bahan dasar saus asam manis.' },
  { name: 'ABC Sambal Asli', desc: 'Merupakan perpaduan cabai segar pilihan dan bawang putih asli yang digiling sempurna. Menghasilkan tingkat kepedasan yang pas dengan aroma bawang yang kuat, cocok untuk cocolan maupun penguat rasa pedas pada masakan berkuah.', matches: ['ABC Sambal Asli 130 ML', 'ABC Sambal Asli 270 ML'] },
  { name: 'ABC Kecap Inggris 195 ML', desc: 'Bumbu cair dengan aroma rempah Worcestershire yang khas dan sedikit tangy (asam gurih). Kunci utama untuk menciptakan aroma hidangan ala restoran seperti bistik sapi, ayam lada hitam, maupun saus marinasi panggangan.' },
  { name: 'ABC Kecap Extra Pedas 60 Gram', desc: 'Inovasi praktis yang memadukan karamelisasi kecap manis pekat dengan ekstrak cabai asli. Memberikan sensasi manis, gurih, dan pedas yang menendang secara bersamaan dalam satu tuangan.', matches: ['ABC Kecap Extra PDS 60 Gram'] },
  { name: 'ABC Kecap Manis', desc: 'Diramu dari kedelai hitam Mallika eksklusif, menghasilkan tekstur yang ekstra kental, warna hitam pekat alami, dan rasa manis karamel yang meresap sempurna ke dalam masakan seperti semur atau nasi goreng.', matches: ['ABC Kecap Manis 250 Gram', 'ABC Kecap Manis 825 Gram', 'ABC Kecap Manis Reff 65 Gram'] },
  { name: 'Indofood Kecap Manis 60 ML', desc: 'Kecap manis dengan tekstur yang lebih smooth dan rasa manis yang legit. Kemasan saset kecil ini sangat praktis untuk kebutuhan dapur harian, bekal, atau porsi masak sekali pakai.' },
  { name: 'Beras Anak Raja', desc: 'Beras putih favorit keluarga tanpa pemutih dan pewangi buatan. Memiliki karakter butiran yang mekar sempurna saat dimasak, menghasilkan nasi yang pulen dan mengenyangkan.', matches: ['Beras Anak Raja 3 Kg', 'Beras Anak Raja 5 KG'] },
  { name: 'Beras Lahap 5 Kg', desc: 'Beras berkualitas dengan tingkat pemekaran (volume) yang sangat baik saat dimasak. Teksturnya tidak mudah lembek, menjadikannya pilihan ideal untuk masakan harian maupun bahan dasar nasi goreng.' },
  { name: 'Beras Raja Ultima 5 Kg', desc: 'Varian beras premium dengan seleksi bulir panjang (long-grain) yang utuh dan bersih. Menghasilkan nasi dengan tingkat kepulenan ekstra, warna putih cerah alami, dan tahan lama di dalam rice cooker.' },
  { name: 'Beras Raja Platinum 5 Kg', desc: 'Beras kualitas tertinggi di kelasnya dengan aroma yang lebih wangi dan tekstur nasi yang sangat lembut. Sangat direkomendasikan untuk hidangan spesial atau konsumen yang menyukai nasi bertekstur empuk.' },
  { name: 'Beras Laris Premium 5 Kg', desc: 'Pilihan beras premium yang sangat bernilai (cost-effective). Diproses higienis untuk menghasilkan butiran beras yang bersih dari kerikil, memberikan hasil nasi pulen standar yang pas untuk berbagai lauk pauk.' },
  { name: 'Beras Superboy', desc: 'Beras harian dengan karakter bulir yang kokoh. Hasil nasinya bertekstur pas—tidak terlalu lengket namun tetap lembut saat dikunyah, cocok dikonsumsi bersama hidangan berkuah.' },
  { name: 'Beras Losari Cristal 5 Kg', desc: 'Sesuai namanya, beras ini memiliki ciri khas bulir yang bening seperti kristal dengan persentase beras patah (broken grain) yang sangat minim. Tampilan nasinya sangat cantik saat disajikan.' },
  { name: 'Beras Wanemo 5 Kg', desc: 'Beras pilihan dengan karakter lokal yang kuat, menawarkan kombinasi warna beras yang bersih dan tekstur nasi yang legit. Pilihan tepat untuk konsumsi rutin keluarga' },
  { name: 'Filma Minyak Goreng 2L', desc: 'Diproses dengan teknologi penyaringan ganda, menghasilkan minyak berwarna kuning keemasan yang sangat jernih. Tahan terhadap suhu panas tinggi sehingga minyak tidak mudah menghitam dan masakan lebih krispi.', matches: ['Minyak Goreng Filma 2L'] },
  { name: 'Bimoli Minyak Goreng 1L', desc: 'Minyak goreng kelapa sawit dengan teknologi Golden Fiesta, kaya akan Omega 9. Karakter minyaknya stabil pada titik didih tinggi, mengunci panas dengan baik agar makanan matang luar dalam tanpa menyerap terlalu banyak minyak.', matches: ['Minyak Goreng Bimoli 1L'] },
  { name: 'Kunci Mas Minyak Goreng 2L', desc: 'Minyak goreng andalan untuk hasil gorengan rumahan yang renyah dan berwarna kuning keemasan sempurna. Sangat cocok digunakan untuk menggoreng deep-fry seperti tempe mendoan atau ayam goreng.', matches: ['Minyak Goreng Kunci Mas 2L'] },
  { name: 'Sania Minyak Goreng 1L', desc: 'Minyak goreng premium bergizi yang difortifikasi dengan Vitamin E. Memiliki titik beku yang rendah sehingga tidak mudah berawan (menggumpal) di suhu dingin, menjaga kualitas makanan tetap prima.', matches: ['MINYAK GORENG SANIA 1L'] },
  { name: 'Sabrina Minyak Goreng 2L', desc: 'Pilihan minyak goreng ekonomis bermutu tinggi. Proses penyaringannya memastikan minyak tetap bening dan tidak mudah berbau tengik, ideal untuk penggunaan harian (menumis dan menggoreng).', matches: ['MINYAK GORENG SABRINA 2L'] },
  { name: 'Rose Brand Minyak Goreng', desc: 'Minyak kelapa sawit pilihan yang dikenal dengan kejernihannya. Versi cup 220ML sangat praktis untuk anak kos, piknik, atau memasak porsi tunggal, sementara versi 2L ideal untuk dapur aktif.', matches: ['MINYAK GORENG ROSE BRAND CUP 220ML', 'MINYAK ROSE BRAND 2L'] },
  { name: 'Tawon Minyak Goreng', desc: 'Minyak legendaris yang mempertahankan kualitas dan kejernihan ekstraksi kelapa sawit. Karakteristiknya ringan dan cepat mematangkan bahan masakan tanpa merusak cita rasa asli bahan baku.', matches: ['MINYAK GORENG TAWON 900ML', 'MINYAK GORENG TAWON 2L'] },
  { name: 'Sovia Minyak Goreng 2L', desc: 'Minyak goreng serbaguna yang diperkaya dengan Vitamin A and D. Menawarkan kombinasi kualitas penumisan yang baik dengan harga yang ramah di kantong konsumen keluarga.', matches: ['MINYAK GORENG SOVIA 2L'] },
  { name: 'Fortune Minyak Goreng 1L', desc: 'Minyak goreng dengan formula khusus yang mampu menghasilkan tekstur gorengan crunchy tahan lama. Cocok digunakan untuk kreasi camilan keluarga yang membutuhkan tingkat kerenyahan ekstra.', matches: ['MINYAK GORENG FORTUNE 1L'] },
  { name: 'Fitri Minyak Goreng Botol 400ML', desc: 'Minyak goreng sawit bening dalam kemasan botol yang ergonomis. Memudahkan penuangan tanpa takut tumpah, sangat efisien untuk penggunaan dapur bermeja kecil atau penyimpanan di rak.', matches: ['MINYAK GORENG FITRI BTL 400ML'] },
  { name: 'Indofood Bumbu Ayam Mentega', desc: 'Merangkum rahasia bumbu restoran dalam satu saset. Memadukan rasa gurih mentega, manisnya kecap, and aroma bawang Bombay untuk menyulap ayam goreng biasa menjadi sajian ayam mentega autentik dalam hitungan menit.' },
  { name: 'Racik Bumbu Soto', desc: 'Pasta bumbu yang kaya akan ekstrak rempah asli seperti kunyit, serai, and daun jeruk. Cukup campurkan ke dalam kaldu rebusan untuk menghasilkan kuah soto kuning yang kental, harum, and kaya rasa tanpa perlu mengulek bumbu.' },
  { name: 'Finna Bumbu Nasi Goreng 50 Gram', desc: 'Bumbu nasi goreng dengan profil rasa tradisional yang diperkuat dengan aroma terasi and bawang merah pilihan. Memastikan rasa nasi goreng merata sempurna meski dimasak dalam porsi besar.' },
  { name: 'Indofood Bumbu Racik Ikan Goreng 20 Gram', desc: 'Campuran bubuk ketumbar, kunyit, and bawang putih yang diformulasikan khusus untuk menghilangkan bau amis ikan. Memberikan warna kuning keemasan and kerak bumbu yang gurih saat ikan digoreng garing.' },
  { name: 'Indofood Racik Bumbu Ayam Goreng Rempah 30G', desc: 'Kunci praktis membuat ayam goreng ala rempah tradisional. Diperkaya dengan ekstrak lengkuas and kunyit yang akan menghasilkan butiran bumbu renyah (kremesan) alami saat digoreng.' },
  { name: 'Indofood Bumbu Racik Sayur Lodeh 25G', desc: 'Menghadirkan harmoni rasa gurih santan, terasi, and rempah lodeh rumahan. Diformulasikan agar bumbu langsung larut dalam kuah santan tanpa menggumpal, memberikan rasa lodeh masakan ibu.' },
  { name: 'Dapurasa Bumbu Nasgor Daging Kari', desc: 'Inovasi bumbu nasi goreng dengan sentuhan Timur Tengah. Mengandung aroma rempah kari yang kuat (bold) dipadukan dengan ekstrak rasa daging sapi, menciptakan nasi goreng rempah ala kedai premium.' },
  { name: 'Mr. Boem-Boe Bubuk Lada Putih 60GR', desc: '100% lada putih murni dengan tingkat kehalusan gilingan yang sempurna. Kemasan botol kaca menjaga minyak atsiri lada tidak menguap, mempertahankan aroma tajam and rasa pedas hangat alami yang maksimal.', matches: ['MR.BOEM-BOE BUBUK LADA PUTIH 60GR BTL KACA'] },
  { name: 'Mr. Boem-Boe Bubuk Cabe 50GR', desc: 'Cabai kering giling murni tanpa pewarna buatan. Memberikan tendangan rasa pedas yang konsisten, sangat praktis ditaburkan di atas mi instan, bakso, atau camilan favorit.', matches: ['MR.BOEM-BOE BUBUK CABE 50GR BTL'] },
  { name: 'Masako Sapi', desc: 'Penyedap rasa dengan ekstrak daging sapi asli yang direbus lama. Memberikan profil kaldu sapi yang pekat, sangat direkomendasikan untuk kuah bakso, sop daging, atau memperkuat rasa tumisan sayur.', matches: ['MASAKO SAPI 100GR', 'MASAKO SAPI 123GR'] },
  { name: 'Masako Ayam', desc: 'Ekstrak kaldu ayam murni yang dipadukan dengan rempah pilihan. Memberikan rasa gurih umami yang ringan and serbaguna, tidak merusak warna masakan, cocok untuk aneka tumisan, sop bening, atau marinasi.', matches: ['MASAKO AYAM 100GR', 'MASAKO AYAM 250GR'] },
  { name: 'Masako Jamur', desc: 'Alternatif penyedap umami nabati berbahan dasar ekstrak jamur pilihan. Memberikan sensasi gurih alami yang light (ringan), sangat cocok untuk hidangan vegetarian, capcay, atau kaldu bening yang lebih sehat.' },
  { name: 'Telur Ayam Ras 6 Biji', desc: 'Telur ayam segar hasil seleksi peternakan terbaik. Memiliki cangkang yang tebal, putih telur yang kental (tidak encer), and kuning telur berwarna oranye cerah yang kaya akan protein and nutrisi.' },
  { name: 'Rose Brand Gula Halus', desc: 'Gula bubuk dengan proses penggilingan ekstra halus and formula anti-gumpal (anti-caking). Sangat mudah larut dalam adonan mentega and tepung, menjadikannya pilihan utama untuk icing donat, buttercream, atau adonan kue kering.', matches: ['Gula Halus Rose Brand'] },
  { name: 'Rose Brand Gula Pasir Premium 1 Kg', desc: 'Gula kristal putih dari tebu pilihan dengan proses rafinasi tinggi. Menghasilkan butiran yang seragam, bersih, and warna putih mengkilap. Rasa manisnya murni and alami tanpa meninggalkan aftertaste pahit.', matches: ['Gula Pasir Premium Rose Brand 1 Kg'] },
  { name: 'Daun Garam Halus', desc: 'Garam meja beryodium tinggi dengan tekstur halus seperti pasir putih. Bebas kotoran and cepat larut, sehingga mencegah adanya rasa asin yang menggumpal atau tidak merata pada masakan.' },
  { name: 'ABC Sardines Bumbu Serundeng 400GR', desc: 'Inovasi kuliner yang menggabungkan ikan sarden utuh kaya protein dengan bumbu serundeng kelapa sangrai yang gurih and bertekstur. Menawarkan pengalaman makan sarden yang unik dengan cita rasa lokal yang kaya rempah.' },
  { name: 'ABC Sardines Extra Pedas 155GR', desc: 'Ikan sarden premium yang direndam dalam kuah saus tomat bercampur cabai ekstra pedas. Lauk instan yang langsung siap saji, memberikan sensasi hangat and pedas yang menantang lidah, sangat pas disajikan dengan nasi putih panas.', matches: ['ABC SARDINES EXTRA PDS 155GR'] }
];

async function main() {
  const allProducts = await prisma.product.findMany({
    where: { category: { slug: 'bahan-pokok-dan-bumbu' } }
  });

  for (const item of updates) {
    const targets = allProducts.filter(p => {
        const name = p.name.toUpperCase();
        if (item.matches) {
            return item.matches.some(m => name.includes(m.toUpperCase()));
        }
        return name.includes(item.name.toUpperCase().replace(/ABC/i, '').replace(/INDOFOOD/i, '').trim());
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
