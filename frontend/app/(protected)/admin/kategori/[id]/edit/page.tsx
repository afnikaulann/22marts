"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Tag, Loader2, Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getCategories, updateCategory } from "@/lib/api";
import Image from "next/image";

export default function EditKategoriPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    icon: "",
    thumbnail: "",
    isActive: true,
  });

  useEffect(() => {
    loadCategory();
  }, [categoryId]);

  async function loadCategory() {
    setLoading(true);
    const result = await getCategories();
    if (result.data) {
      const cat = result.data.find((c) => c.id === categoryId);
      if (cat) {
        setForm({
          name: cat.name,
          icon: cat.icon || "",
          thumbnail: cat.thumbnail || "",
          isActive: cat.isActive,
        });
        if (cat.thumbnail) {
          setPreviewUrl(cat.thumbnail);
        }
      } else {
        toast.error("Kategori tidak ditemukan");
        router.push("/admin/kategori");
      }
    }
    setLoading(false);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl(form.thumbnail || null);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const result = await updateCategory(
      categoryId,
      {
        name: form.name,
        icon: form.icon || undefined,
        isActive: form.isActive,
      },
      selectedFile || undefined
    );

    if (result.data) {
      toast.success("Kategori berhasil diupdate");
      router.refresh();
      router.push("/admin/kategori");
    } else {
      toast.error(result.error);
    }

    setSubmitting(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-900">
            <Tag className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-base font-semibold">Edit Kategori</h1>
            <p className="text-sm text-zinc-500 hidden sm:block">Perbarui informasi kategori</p>
          </div>
        </div>
        <Button className="h-9 bg-zinc-900 text-white text-sm font-medium" onClick={() => router.push("/admin/kategori")}>Kembali</Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded-lg border border-zinc-200 bg-white p-5 space-y-5">
          <h2 className="font-medium">Informasi Kategori</h2>

          <div>
            <label className="mb-2 block text-sm font-medium">Nama Kategori</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              placeholder="Contoh: Sayur & Buah"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Gambar Kategori</label>
            {!previewUrl ? (
              <div className="relative h-10 w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                />
                <div className="flex h-10 w-full items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 text-sm text-zinc-500">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Pilih Gambar
                </div>
              </div>
            ) : (
              <div className="relative inline-block overflow-hidden rounded-lg border border-zinc-200">
                <Image src={previewUrl} alt="Preview" width={80} height={80} className="h-20 w-20 object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white shadow-sm"
                >
                  <X className="h-3 w-3" />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                />
              </div>
            )}
            <p className="mt-1 text-[10px] text-zinc-500 font-medium italic">*Klik pada gambar untuk mengganti</p>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Kategori Aktif</p>
              <p className="text-xs text-zinc-500 font-medium">Kategori akan ditampilkan di toko</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-zinc-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-zinc-900 peer-checked:after:translate-x-full"></div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button type="button" className="h-10 bg-zinc-900 text-white text-sm font-medium" onClick={() => router.back()}>
            Batal
          </Button>
          <Button type="submit" className="h-10 bg-zinc-900 text-white text-sm font-medium" disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
