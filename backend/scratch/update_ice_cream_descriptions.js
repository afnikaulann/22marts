const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = [
  { name: 'Aice Bingo Chocolate 40 Gram', desc: 'Es krim cokelat dengan perpaduan lapisan cokelat dan tekstur renyah yang nikmat di setiap gigitan. Memiliki rasa manis yang pas dan sensasi dingin menyegarkan, cocok dinikmati saat santai maupun sebagai camilan favorit sehari-hari.' },
  { name: 'Aice Chocolate Crispy 60 Gram', desc: 'Es krim cokelat dengan lapisan crispy renyah yang memberikan sensasi lezat di setiap gigitan. Perpaduan rasa cokelat yang creamy dan tekstur renyah membuat es krim ini cocok dinikmati kapan saja bersama keluarga maupun teman.' },
  { name: 'Aice Chocolate Max', desc: 'Es krim cokelat dengan rasa creamy dan manis yang nikmat, cocok untuk pecinta cokelat. Memberikan sensasi dingin menyegarkan dengan perpaduan tekstur lembut yang pas untuk dinikmati saat santai maupun cuaca panas.' },
  { name: 'Aice Choco Malt 49 ML', desc: 'Es krim cokelat dengan kombinasi rasa malt yang lezat dan tekstur lembut yang creamy. Cocok dinikmati sebagai camilan menyegarkan dengan rasa manis yang pas and sensasi cokelat yang menggugah selera.' },
  { name: 'Aice Durian Cup', desc: 'Es krim cup rasa durian dengan aroma khas and tekstur lembut yang creamy di setiap suapan. Cocok untuk pecinta durian yang ingin menikmati sensasi manis and segar dalam bentuk es krim praktis.' },
  { name: 'Aice Mochi Chocolate 45 ML', desc: 'Es krim mochi rasa cokelat dengan lapisan mochi yang kenyal and isian es krim lembut di dalamnya. Memberikan sensasi unik and nikmat di setiap gigitan, cocok dinikmati saat santai maupun sebagai camilan favorit.' },
  { name: 'Aice Strawberry', desc: 'Es krim rasa stroberi dengan perpaduan rasa manis and segar yang menyenangkan di setiap gigitan. Memiliki tekstur lembut and sensasi dingin yang cocok dinikmati kapan saja untuk menemani waktu santai.' },
  { name: 'Aice Strawberry Cup', desc: 'Es krim cup rasa stroberi dengan tekstur creamy and rasa buah yang segar serta manis. Dikemas praktis sehingga cocok dinikmati saat santai bersama keluarga maupun teman.' },
  { name: 'Aice Semangka 65GR', desc: 'Es krim rasa semangka dengan sensasi segar and manis yang cocok dinikmati saat cuaca panas. Memiliki rasa buah yang menyegarkan and tekstur lembut untuk menemani aktivitas maupun waktu santai.' },
  { name: 'Aice Crispy Ball', desc: 'Es krim dengan kombinasi rasa manis creamy and topping crispy ball renyah yang menambah kenikmatan di setiap gigitan. Cocok dijadikan camilan dingin favorit untuk dinikmati bersama keluarga maupun teman.' },
  { name: 'Aice Mochi Coklat Pack', desc: 'Es krim mochi rasa cokelat dalam kemasan praktis dengan tekstur mochi kenyal and isian es krim lembut yang lezat. Cocok dinikmati bersama keluarga sebagai camilan dingin dengan sensasi unik and menyenangkan.' },
  { name: 'Aice Nanas 65GR', desc: 'Es krim rasa nanas dengan perpaduan rasa manis and segar yang menyenangkan di setiap gigitan. Memberikan sensasi dingin menyegarkan and cocok dinikmati kapan saja saat cuaca panas maupun waktu santai.' },
  { name: 'Aice Berry Cone', desc: 'Es krim cone dengan rasa berry yang segar dipadukan cone renyah yang nikmat. Memiliki tekstur creamy and rasa buah yang manis sehingga cocok dinikmati sebagai camilan favorit sehari-hari.' },
  { name: 'Aice Milk Melon 50GR', desc: 'Es krim rasa susu and melon dengan perpaduan rasa manis lembut yang menyegarkan. Tekstur creamy and aroma melon yang khas membuat es krim ini cocok dinikmati kapan saja bersama keluarga.' },
  { name: 'Wall\'s Paddle Pop Upin Ipin', desc: 'Es krim favorit anak-anak dengan rasa manis lezat and karakter Upin Ipin yang menarik. Memiliki tekstur lembut and sensasi dingin menyegarkan, cocok dinikmati sebagai camilan seru saat bermain maupun bersantai.' },
  { name: 'Wall\'s Paddle Pop Choco Lava 50ML', desc: 'Es krim cokelat dengan isian choco lava yang lumer and nikmat di setiap gigitan. Perpaduan rasa creamy and sensasi cokelat yang kaya membuat es krim ini cocok untuk pecinta cokelat segala usia.' },
  { name: 'Wall\'s Twister Grape Lychee', desc: 'Es krim dengan kombinasi rasa anggur and leci yang segar serta manis di setiap gigitan. Memberikan sensasi buah yang menyegarkan and cocok dinikmati saat cuaca panas maupun waktu santai.' },
  { name: 'Wall\'s Sweet Corn', desc: 'Es krim rasa jagung manis dengan tekstur lembut and rasa creamy yang unik serta lezat. Cocok dinikmati sebagai camilan dingin dengan sensasi manis khas jagung yang menggugah selera.' },
  { name: 'Wall\'s Oreo Stick 80ML', desc: 'Es krim stik dengan perpaduan rasa creamy and biskuit Oreo yang lezat di setiap gigitan. Memiliki tekstur lembut dengan sensasi renyah dari potongan biskuit yang cocok dinikmati kapan saja.' },
  { name: 'Wall\'s Cornetto Silver Queen', desc: 'Es krim cone premium dengan perpaduan cokelat Silver Queen yang lezat and cone renyah yang nikmat. Memiliki rasa cokelat yang kaya and tekstur creamy sehingga cocok dinikmati sebagai camilan favorit.' },
  { name: 'Wall\'s Cornetto Mini Oreo Choco Vanilla', desc: 'Es krim cone mini dengan kombinasi rasa cokelat, vanila, and topping Oreo yang lezat. Memiliki tekstur creamy dengan cone renyah yang cocok dinikmati saat santai bersama keluarga.' },
  { name: 'Wall\'s Cornetto Mini Chocolate Vanilla', desc: 'Es krim cone mini dengan perpaduan rasa cokelat and vanila yang lembut and nikmat. Ukurannya praktis dengan cone renyah sehingga cocok menjadi camilan manis kapan saja.' },
  { name: 'Wall\'s Populaire Strawberry Vanilla Cup', desc: 'Es krim cup dengan kombinasi rasa stroberi and vanila yang lembut serta menyegarkan. Cocok dinikmati saat santai dengan perpaduan rasa manis buah and creamy yang pas di lidah.' },
  { name: 'Wall\'s Populaire Coklat Vanila Cup', desc: 'Es krim cup dengan perpaduan rasa cokelat and vanila yang creamy and lezat. Memberikan sensasi dingin menyegarkan and cocok dinikmati bersama keluarga kapan saja.' },
  { name: 'Wall\'s Pop Minion Cup 90ML', desc: 'Es krim cup dengan karakter Minion yang menarik and rasa manis yang disukai anak-anak. Memiliki tekstur lembut and sensasi dingin menyegarkan untuk menemani waktu santai maupun bermain.' },
  { name: 'Wall\'s Paddle Pop Twister Magic 55ML', desc: 'Es krim dengan perpaduan warna and rasa buah yang menyegarkan serta tampilan menarik. Memberikan sensasi dingin yang nikmat and cocok dinikmati anak-anak maupun keluarga saat cuaca panas.' },
  { name: 'Wall\'s Neopolitana 350ML', desc: 'Es krim keluarga dengan kombinasi rasa cokelat, stroberi, and vanila dalam satu kemasan praktis. Memiliki tekstur creamy yang lembut and cocok dinikmati bersama keluarga saat bersantai.' },
  { name: 'Wall\'s Feast Vanilla 65ML', desc: 'Es krim vanila dengan lapisan cokelat yang lezat and tekstur creamy yang nikmat di setiap gigitan. Cocok dinikmati sebagai camilan dingin favorit untuk menemani waktu santai.' },
  { name: 'Wall\'s Feast Chocolate 65ML', desc: 'Es krim cokelat dengan rasa manis yang kaya and lapisan cokelat lezat di bagian luar. Memberikan sensasi creamy and dingin yang cocok dinikmati pecinta cokelat kapan saja.' },
  { name: 'Wall\'s Crunchy Milky Berry', desc: 'Es krim dengan perpaduan rasa susu and berry yang segar serta topping renyah yang nikmat. Memiliki tekstur creamy dengan sensasi crunchy di setiap gigitan sehingga cocok dinikmati saat santai maupun berkumpul bersama keluarga' }
];

async function main() {
  for (const item of updates) {
    // Standardize search (remove spaces/special chars) or just use contains
    const products = await prisma.product.findMany({
      where: {
        name: { contains: item.name.replace(/Wall's/i, '').trim(), mode: 'insensitive' }
      }
    });

    for (const p of products) {
        // Double check if name really matches (handle Wall's specifically)
        if (p.name.toUpperCase().includes(item.name.replace(/Wall's/i, '').trim().toUpperCase())) {
            await prisma.product.update({
                where: { id: p.id },
                data: { description: item.desc }
            });
            console.log(`Updated Ice Cream: ${p.name}`);
        }
    }
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
