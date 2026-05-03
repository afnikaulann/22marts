"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Ticket, ChevronRight, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPromos, Promo } from "@/lib/api";
import { toast } from "sonner";
import Link from "next/link";

export function PromoSection({ initialPromos = [] }: { initialPromos?: Promo[] }) {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (initialPromos.length > 0) {
      const activePromos = initialPromos
        .filter((p) => p.isActive && new Date(p.endDate) > new Date())
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setPromos(activePromos);
    }
  }, [initialPromos]);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Kode promo ${code} berhasil disalin!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };


  return (
    <section className="pt-12 pb-4 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Promo Tersedia</h2>
            <p className="text-sm text-zinc-500 font-medium italic">Cek promo terbaru dari kami untuk belanja lebih hemat.</p>
          </div>
          <Link 
            href="/deals" 
            className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors group"
          >
            Lihat Semua Promo <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {promos.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-zinc-100 bg-zinc-50/50 py-12 text-center">
            <div className="h-12 w-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
              <Ticket className="h-6 w-6" />
            </div>
            <p className="text-zinc-500 font-medium mb-4">Belum ada promo aktif saat ini.</p>
            <Button variant="outline" size="sm" asChild className="rounded-xl border-zinc-200">
              <Link href="/deals">Cek Halaman Promo</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:max-w-4xl">
            {promos.slice(0, 2).map((promo) => (
              <div
                key={promo.id}
                className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-6 transition-all hover:border-sky-200 hover:shadow-xl hover:shadow-sky-500/5"
              >
                {/* Visual Coupon Notch */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white border border-zinc-200" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white border border-zinc-200" />

                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <Ticket className="h-5 w-5" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Potongan</p>
                    <p className="text-xl font-black text-sky-600 italic leading-none">
                      {promo.discountType === "PERCENTAGE" ? `${promo.discountValue}%` : `Rp ${promo.discountValue.toLocaleString()}`}
                    </p>
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  <h3 className="text-lg font-black text-zinc-900 tracking-tight uppercase italic">{promo.code}</h3>
                  <p className="text-xs text-zinc-500 line-clamp-1 leading-relaxed">
                    Min. belanja Rp {promo.minPurchase.toLocaleString()} • Berakhir {new Date(promo.endDate).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' })}
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(promo.code)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl h-10 text-xs font-bold transition-all ${
                      copiedCode === promo.code
                        ? "bg-green-600 text-white"
                        : "bg-zinc-900 text-white hover:bg-sky-600"
                    }`}
                  >
                    {copiedCode === promo.code ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Tersalin
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Salin Kode
                      </>
                    )}
                  </button>
                  <Button variant="ghost" size="icon" asChild className="rounded-xl bg-zinc-100 text-zinc-600 hover:bg-zinc-200 shrink-0">
                    <Link href={`/produk?promo=${promo.id}`}>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
            
            {/* If only 1 promo, show a small teaser for more */}
            {promos.length === 1 && (
              <div className="flex items-center justify-center rounded-[2rem] border border-dashed border-zinc-200 p-6 bg-zinc-50/30">
                <Link href="/deals" className="text-sm font-medium text-zinc-400 hover:text-zinc-600 transition-colors">
                  Lihat promo lainnya &rarr;
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
