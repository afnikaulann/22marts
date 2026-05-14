"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, ShoppingBag, ImageIcon } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { getProducts, Product } from "@/lib/api";

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await getProducts();
      if (res.data) {
        // Sort by newest first (assuming createdAt exists, or just reverse)
        const activeProducts = res.data.filter((p) => p.isActive);
        const sorted = activeProducts.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setProducts(sorted);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  function formatPrice(price: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Produk Baru</h1>
            <p className="mt-4 text-lg text-zinc-500">Koleksi produk terbaru yang baru saja tiba</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white py-20">
              <ShoppingBag className="h-12 w-12 text-zinc-300" />
              <h3 className="mt-4 text-lg font-medium text-zinc-900">Belum ada produk baru</h3>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {products.map((product) => (
                <Link key={product.id} href={`/produk/${product.slug || product.id}`} className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:border-zinc-300 hover:shadow-md">
                  <div className="relative aspect-square bg-white border-b border-zinc-100">
                    {product.thumbnail ? (
                      <img src={product.thumbnail} alt={product.name} className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ImageIcon className="h-10 w-10 text-zinc-300" />
                      </div>
                    )}
                    <div className="absolute left-3 top-3 rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white">
                      Baru
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-medium text-zinc-900 line-clamp-2">{product.name}</h3>
                    <p className="mt-1 text-sm text-zinc-500">{product.category?.name}</p>
                    <div className="mt-auto pt-4">
                      <p className="text-lg font-bold text-zinc-900">{formatPrice(product.price)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
