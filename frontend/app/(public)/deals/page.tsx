"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Loader2, 
  Ticket, 
  Copy, 
  Check, 
  Calendar, 
  ShoppingBag,
  ArrowRight,
  Info,
  Sparkles
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { getPromos, Promo } from "@/lib/api";
import { toast } from "sonner";

export default function DealsPage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getPromos();
        if (res.data) {
          const activePromos = res.data.filter(p => p.isActive && new Date(p.endDate) > new Date());
          setPromos(activePromos);
        }
      } catch (error) {
        console.error("Failed to load deals:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Kode promo ${code} berhasil disalin!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatValue = (p: Promo) => {
    return p.discountType === "PERCENTAGE" ? `${p.discountValue}%` : `Rp ${p.discountValue.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-900" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50/50">
      <Navbar />

      <main className="flex-1 py-16 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-100/30 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-50/30 rounded-full blur-3xl -z-10" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Header */}
          <div className="mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-sky-600 shadow-sm border border-sky-100/50">
              <Sparkles className="h-3 w-3" />
              Penawaran Terbatas
            </div>
            <h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
              Promo <span className="text-sky-600">Spesial</span>
            </h1>
            <p className="max-w-2xl text-lg text-zinc-500 font-medium">
              Temukan berbagai penawaran menarik yang telah disiapkan khusus untuk Anda. Belanja lebih hemat setiap hari di 22Mart.
            </p>
          </div>

          {promos.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-zinc-200 bg-white/80 backdrop-blur-sm py-24 text-center shadow-xl shadow-zinc-200/20">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-50 text-zinc-300 mb-6 border border-zinc-100">
                <Ticket className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 tracking-tight">Belum ada promo aktif</h3>
              <p className="text-zinc-500 mt-2 max-w-xs mx-auto">Silakan cek kembali nanti untuk penawaran terbaru kami yang akan datang.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2">
              {promos.map((promo) => (
                <div 
                  key={promo.id}
                  className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white transition-all duration-500 hover:border-sky-300 hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-1"
                >
                  {/* Visual "Coupon" Notch Effect */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 h-6 w-6 rounded-full bg-zinc-50 border border-zinc-200 z-10 hidden sm:block" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 h-6 w-6 rounded-full bg-zinc-50 border border-zinc-200 z-10 hidden sm:block" />

                  <div className="flex flex-1 p-8">
                    <div className="flex-1 space-y-6">
                      {/* Badge & Discount */}
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 rounded-xl bg-sky-50/50 px-3 py-1.5 text-[10px] font-bold text-sky-600 border border-sky-100 transition-colors group-hover:bg-sky-50">
                          <Ticket className="h-3.5 w-3.5" />
                          Voucher 22Mart
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Diskon</p>
                          <p className="text-3xl font-black text-sky-600 italic tracking-tighter leading-none">
                            {formatValue(promo)}
                          </p>
                        </div>
                      </div>

                      {/* Promo Info */}
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-zinc-900 tracking-tight uppercase italic group-hover:text-sky-700 transition-colors">{promo.code}</h3>
                        <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed font-medium">
                          {promo.description || `Dapatkan potongan harga spesial senilai ${formatValue(promo)} untuk pembelanjaan produk pilihan Anda hari ini.`}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-dashed border-zinc-200 w-full" />

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Min. Belanja</p>
                          <p className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                            <ShoppingBag className="h-4 w-4 text-zinc-400" />
                            Rp {promo.minPurchase.toLocaleString()}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Masa Berlaku</p>
                          <p className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-zinc-400" />
                            {new Date(promo.endDate).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      </div>

                      {/* Applicable tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {promo.categories?.slice(0, 3).map(c => (
                          <span key={c.id} className="rounded-lg bg-zinc-50 px-2.5 py-1 text-[10px] font-bold text-zinc-600 border border-zinc-100 uppercase tracking-wider">
                            {c.name}
                          </span>
                        ))}
                        {promo.products?.slice(0, 2).map(p => (
                          <span key={p.id} className="rounded-lg bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-600 border border-amber-100 uppercase tracking-wider">
                            {p.name}
                          </span>
                        ))}
                        {!promo.categories?.length && !promo.products?.length && (
                          <span className="rounded-lg bg-zinc-50 px-2.5 py-1 text-[10px] font-bold text-zinc-400 italic tracking-wider">
                            Berlaku Semua Produk
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex bg-zinc-50/50 p-6 pt-2 gap-4">
                    <button 
                      onClick={() => copyToClipboard(promo.code)}
                      className={`flex flex-[1.5] items-center justify-center gap-3 rounded-2xl h-14 text-sm font-black uppercase tracking-widest transition-all duration-300 active:scale-95 ${
                        copiedCode === promo.code
                          ? "bg-green-600 text-white shadow-lg shadow-green-200"
                          : "bg-white border-2 border-zinc-200 text-zinc-700 hover:border-zinc-900 hover:text-zinc-900 shadow-sm"
                      }`}
                    >
                      {copiedCode === promo.code ? (
                        <>
                          <Check className="h-5 w-5" />
                          Tersalin
                        </>
                      ) : (
                        <>
                          <Copy className="h-5 w-5" />
                          Salin Kode
                        </>
                      )}
                    </button>
                    <Link 
                      href={`/produk?promo=${promo.id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl h-14 bg-zinc-900 text-white text-sm font-black uppercase tracking-widest hover:bg-sky-600 transition-all duration-300 shadow-lg shadow-zinc-900/10 active:scale-95"
                    >
                      Produk <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Elegant Info Box */}
          <div className="mt-20 group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-sky-600 to-indigo-700 p-[1px] shadow-2xl shadow-sky-600/20">
            <div className="relative bg-white rounded-[2.45rem] p-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-sky-50 text-sky-600 shadow-inner group-hover:scale-110 transition-transform duration-500">
                <Info className="h-10 w-10" />
              </div>
              <div className="space-y-2 text-center md:text-left">
                <h4 className="text-xl font-black text-zinc-900 tracking-tight italic uppercase">Cara Belanja Hemat</h4>
                <p className="text-zinc-500 leading-relaxed font-medium">
                  Salin kode promo yang Anda inginkan di atas, lalu tempelkan (paste) pada kolom kode promo di halaman checkout saat melakukan pembayaran. Pastikan pesanan Anda memenuhi syarat minimum belanja agar diskon otomatis terpotong.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
