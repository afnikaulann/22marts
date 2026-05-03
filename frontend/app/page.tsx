import Link from "next/link";
import Image from "next/image";
import {
  Truck,
  ShieldCheck,
  Clock,
  ArrowRight,
  ShoppingBag,
  Star,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";

// Lazy loading komponen di bawah fold
const PromoSection = dynamic(() => import("@/components/promo-section").then(mod => mod.PromoSection), { ssr: true });
const WaBanner = dynamic(() => import("@/components/wa-banner").then(mod => mod.WaBanner), { ssr: true });
const Footer = dynamic(() => import("@/components/footer").then(mod => mod.Footer), { ssr: true });

import { getCategories, getProducts, getPromos, getCategoryImage } from "@/lib/api";
import { ImageIcon } from "lucide-react";

export default async function Home() {
  const [categoriesRes, productsRes, promosRes] = await Promise.all([
    getCategories(),
    getProducts(),
    getPromos()
  ]);
  
  const dbCategories = categoriesRes.data || [];
  // Mengambil 4 produk terbaru/terlaris yang aktif
  const dbProducts = productsRes.data?.filter(p => p.isActive).slice(0, 4) || [];
  const activePromos = promosRes.data?.filter(p => p.isActive && new Date(p.endDate) > new Date()) || [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-4 lg:pt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-8 py-8 lg:grid-cols-2 lg:gap-16">
              <div className="order-2 lg:order-1">
                <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                  Pengiriman hari ini
                </span>

                <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
                  Belanja Kebutuhan Harian,
                  <br />
                  <span className="text-black">Cepat & Tanpa Ribet.</span>
                </h1>

                <p className="mt-6 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg">
                  Temukan ribuan produk dari sembako hingga camilan favorit di Toko 22Mart. Pesan sekarang, belanjaan langsung diantar ke depan pintu Anda dalam hitungan menit!
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" className="h-12 gap-2 rounded-full bg-yellow-300 px-6 font-semibold text-yellow-950 shadow-md hover:bg-yellow-400" asChild>
                    <Link href="/produk">
                      Belanja Sekarang
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

              </div>

              <div className="relative order-1 lg:order-2">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] lg:aspect-square">
                  <Image
                    src="/gambarutama.jpeg"
                    alt="Fresh groceries"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 left-4 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-sky-100 sm:bottom-8 sm:left-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Gratis Ongkir</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-t border-sky-100 bg-sky-50 pt-8 pb-16 sm:pt-12 sm:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Kategori</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">Jelajahi Produk</h2>
              </div>
              <Link href="/categories" className="group hidden items-center gap-1 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-800 sm:flex">
                Lihat Semua <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
              {dbCategories.slice(0, 4).map((category) => (
                <Link
                  key={category.id}
                  href={`/produk?category=${category.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm transition-all hover:border-sky-200 hover:shadow-lg"
                >
                  <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden p-4">
                    {/* Prioritas: Gambar Upload (DB) -> Gambar Manual (Mapping) -> Emoji Admin -> Default Image */}
                    {category.thumbnail ? (
                      <Image 
                        src={category.thumbnail} 
                        alt={category.name} 
                        fill 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                        className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-110" 
                      />
                    ) : getCategoryImage(category.name) !== "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&h=600&fit=crop" ? (
                      <Image 
                        src={getCategoryImage(category.name)} 
                        alt={category.name} 
                        fill 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                        className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-110" 
                      />
                    ) : category.icon ? (
                      <div className="text-6xl transition-transform duration-700 ease-out group-hover:scale-110">
                        {category.icon}
                      </div>
                    ) : (
                      <Image 
                        src={getCategoryImage(category.name)} 
                        alt={category.name} 
                        fill 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                        className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-110" 
                      />
                    )}
                  </div>
                  <div className="flex flex-col p-6 pt-0">
                    <h3 className="text-xl font-bold text-slate-800">{category.name}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-500">{category._count?.products || 0} produk</p>
                      <div className="flex h-8 w-8 -translate-x-2 items-center justify-center rounded-full bg-yellow-300 text-yellow-950 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Mobile View All Button */}
            <div className="mt-8 flex justify-center sm:hidden">
               <Button variant="outline" className="w-full rounded-full border-sky-200 text-slate-700 hover:bg-sky-50 hover:text-slate-900" asChild>
                  <Link href="/categories">Lihat Semua Kategori</Link>
               </Button>
            </div>
          </div>
        </section>

        <PromoSection initialPromos={promosRes.data || []} />

        {/* Products */}
        <section className="pb-16 sm:pb-24 pt-8 sm:pt-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Pilihan Minggu Ini</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">Produk Populer</h2>
              </div>
              <Link href="/produk" className="group hidden items-center gap-1 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-800 sm:flex">
                Lihat semua <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
              {dbProducts.map((product) => (
                <Link key={product.id} href={`/produk/${product.slug}`} className="group">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-sky-50">
                    {product.thumbnail ? (
                      <Image 
                        src={product.thumbnail} 
                        alt={product.name} 
                        fill 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                        className="object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-zinc-300" />
                      </div>
                    )}
                    
                    {product.stock <= 5 && product.stock > 0 && (
                      <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white">Sisa {product.stock}</span>
                    )}
                    {product.stock === 0 && (
                      <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">Habis</span>
                    )}

                    {activePromos.some(p => 
                      (p.categories?.some(c => c.id === product.categoryId)) || 
                      (p.products?.some(prod => prod.id === product.id)) ||
                      (!p.categories?.length && !p.products?.length)
                    ) && (
                      <span className="absolute right-3 top-3 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">Promo</span>
                    )}
                    <button className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-800 opacity-0 shadow-lg transition-all group-hover:opacity-100 hover:bg-sky-100 hover:text-sky-900">
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-medium text-slate-800 line-clamp-1">{product.name}</h3>
                    <p className="mt-0.5 text-slate-500">
                      <span className="font-semibold text-slate-900">{formatPrice(product.price)}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-y border-sky-100 bg-sky-50 py-16 text-slate-800 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 sm:grid-cols-3">
              {[
                { icon: Truck, title: "Pengiriman Cepat", desc: "Pesan sebelum jam 2 siang, sampai hari yang sama." },
                { icon: ShieldCheck, title: "Kualitas Terjamin", desc: "Setiap produk selalu dicek kondisi dan masa kedaluwarsanya sebelum dikirim." },
                { icon: Clock, title: "Kebutuhan Harian Lengkap", desc: "Dari sembako hingga alat kebersihan, semua kebutuhan keluarga tersedia." },
              ].map((f) => (
                <div key={f.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary shadow-sm">
                    <f.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{f.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WhatsApp Banner */}
        <WaBanner />
      </main>

      <Footer />
    </div>
  );
}
