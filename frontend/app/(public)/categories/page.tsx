"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Package, Tag, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getCategories, Category, getCategoryImage } from "@/lib/api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await getCategories();
      if (res.data) {
        setCategories(res.data.filter((c) => c.isActive));
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">Kategori Produk</h1>
            <p className="mt-4 text-lg text-slate-500">Temukan berbagai macam produk berdasarkan kategori</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </div>
          ) : categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white py-20">
              <Tag className="h-12 w-12 text-zinc-300" />
              <h3 className="mt-4 text-lg font-medium text-zinc-900">Belum ada kategori</h3>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/produk?category=${category.id}`}
                  className="group relative overflow-hidden flex flex-col rounded-2xl border border-sky-100 bg-white transition-all hover:border-sky-200 hover:shadow-lg"
                >
                  {/* Icon Kategori Emoji atau Gambar Fallback */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden flex items-center justify-center p-4">
                    {/* Prioritas: Gambar Upload (DB) -> Gambar Manual (Mapping) -> Emoji Admin -> Default Image */}
                    {category.thumbnail ? (
                      <Image 
                        src={category.thumbnail} 
                        alt={category.name} 
                        fill 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                        className="object-contain transition-transform duration-700 ease-out group-hover:scale-110 p-4" 
                      />
                    ) : getCategoryImage(category.name) !== "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&h=600&fit=crop" ? (
                      <Image 
                        src={getCategoryImage(category.name)} 
                        alt={category.name} 
                        fill 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                        className="object-contain transition-transform duration-700 ease-out group-hover:scale-110 p-4" 
                      />
                    ) : category.icon ? (
                      <div className="text-7xl transition-transform duration-700 ease-out group-hover:scale-110">
                        {category.icon}
                      </div>
                    ) : (
                      <Image 
                        src={getCategoryImage(category.name)} 
                        alt={category.name} 
                        fill 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                        className="object-contain transition-transform duration-700 ease-out group-hover:scale-110 p-4" 
                      />
                    )}
                  </div>
                  
                  {/* Info Kategori di Bawah */}
                  <div className="flex flex-col p-6">
                    <h3 className="text-xl font-bold text-slate-800">{category.name}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                        <Package className="h-4 w-4" />
                        <span>{category._count?.products || 0} Produk</span>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-300 text-yellow-950 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                        <ChevronRight className="h-4 w-4" />
                      </div>
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
