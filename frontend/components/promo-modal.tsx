"use client";

import { useState, useEffect } from "react";
import { X, Ticket, Copy, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPromos, Promo } from "@/lib/api";
import { toast } from "sonner";

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (code: string) => void;
  subtotal: number;
}

export function PromoModal({ isOpen, onClose, onApply, subtotal }: PromoModalProps) {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadPromos();
    }
  }, [isOpen]);

  async function loadPromos() {
    setLoading(true);
    try {
      const res = await getPromos();
      if (res.data) {
        // Filter active promos
        const activePromos = res.data.filter((p) => p.isActive && new Date(p.endDate) > new Date());
        setPromos(activePromos);
      }
    } catch (error) {
      console.error("Failed to load promos:", error);
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Kode promo ${code} disalin!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
          <h2 className="text-lg font-bold text-zinc-900">Promo Tersedia</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-zinc-100 transition-colors">
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-300" />
            </div>
          ) : promos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Ticket className="h-12 w-12 text-zinc-200" />
              <p className="mt-4 text-sm font-medium text-zinc-900">Belum ada promo tersedia</p>
              <p className="mt-1 text-xs text-zinc-500">Cek kembali nanti untuk promo menarik lainnya</p>
            </div>
          ) : (
            <div className="space-y-4">
              {promos.map((promo) => {
                const isApplicable = subtotal >= promo.minPurchase;
                
                return (
                  <div
                    key={promo.id}
                    className={`relative overflow-hidden rounded-xl border p-4 transition-all ${
                      isApplicable 
                        ? "border-sky-100 bg-sky-50/50 hover:border-sky-200" 
                        : "border-zinc-100 bg-zinc-50 opacity-75"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                        <Ticket className={`h-4 w-4 ${isApplicable ? "text-sky-600" : "text-zinc-400"}`} />
                      </div>
                      <div className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        isApplicable ? "bg-sky-100 text-sky-700" : "bg-zinc-200 text-zinc-500"
                      }`}>
                        {promo.discountType === "PERCENTAGE" ? `${promo.discountValue}% OFF` : `Rp ${promo.discountValue.toLocaleString()} OFF`}
                      </div>
                    </div>

                    <div className="mt-3">
                      <h3 className="text-sm font-bold text-zinc-900">{promo.code}</h3>
                      
                      {(promo.categories?.length || 0) > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {promo.categories?.map((cat) => (
                            <span key={cat.id} className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-[8px] font-medium text-zinc-600 border border-zinc-200">
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {(promo.products?.length || 0) > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {promo.products?.map((prod) => (
                            <span key={prod.id} className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[8px] font-medium text-amber-700 border border-amber-100">
                              {prod.name}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                        {promo.description || `Minimal belanja Rp ${promo.minPurchase.toLocaleString()}`}
                      </p>
                      {!isApplicable && (
                        <p className="mt-2 text-[10px] font-medium text-amber-600">
                          Tambah Rp {(promo.minPurchase - subtotal).toLocaleString()} lagi untuk pakai promo ini
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button
                        onClick={() => copyToClipboard(promo.code)}
                        variant="outline"
                        size="sm"
                        className="h-8 flex-1 gap-1.5 rounded-lg text-[11px] font-semibold bg-white"
                      >
                        {copiedCode === promo.code ? (
                          <>
                            <Check className="h-3 w-3" /> Tersalin
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> Salin Kode
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => {
                          onApply(promo.code);
                          onClose();
                        }}
                        disabled={!isApplicable}
                        size="sm"
                        className="h-8 flex-1 rounded-lg text-[11px] font-semibold bg-zinc-900 text-white hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-400"
                      >
                        Gunakan
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t border-zinc-100 bg-zinc-50 p-6 text-center">
          <p className="text-[11px] text-zinc-500">
            Syarat & ketentuan berlaku. Promo dapat berubah sewaktu-waktu.
          </p>
        </div>
      </div>
    </div>
  );
}
