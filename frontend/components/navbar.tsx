"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  ChevronRight,
  Heart,
  ChevronDown,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useFavorite } from "@/lib/favorite-context";
import { toast } from "sonner";

const navLinks = [
  { href: "/produk", label: "Produk" },
  { href: "/categories", label: "Kategori" },
  { href: "/deals", label: "Promo" },
  { href: "/new-arrivals", label: "Produk Baru" },
  { href: "/best-sellers", label: "Terlaris" },
];

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function Navbar({ hideMenu = false }: { hideMenu?: boolean }) {
  const router = useRouter();
  const { count: cartCount } = useCart();
  const { count: favoriteCount } = useFavorite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    toast.success("Berhasil keluar");
    router.push("/");
  }

  function handleSearch() {
    if (searchQuery.trim()) {
      router.push(`/produk?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  }

  const dashboardHref = user?.role === "ADMIN" ? "/admin/dashboard" : "/dashboard";
  const settingsHref = "/pengaturan-akun";

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main Nav */}
      <nav className="relative border-b border-zinc-200 bg-white shadow-sm">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/logobaru.png"
              alt="22Mart"
              width={140}
              height={48}
              className="h-11 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          {!hideMenu && (
            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Desktop Actions */}
          <div className="hidden items-center gap-1 lg:flex">
            {!hideMenu && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-black hover:bg-zinc-100"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative text-black hover:bg-zinc-100">
                <Heart className="h-5 w-5" />
                {favoriteCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {favoriteCount > 99 ? "99+" : favoriteCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/keranjang">
              <Button variant="ghost" size="icon" className="relative text-black hover:bg-zinc-100">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <div className="mx-2 h-5 w-px bg-zinc-200" />

            {user ? (
              /* Logged In - User Dropdown */
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-zinc-100"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-medium text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium leading-tight text-zinc-900">{user.name}</p>
                    <p className="text-xs leading-tight text-zinc-500">{user.email}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-zinc-400" />
                </button>

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-zinc-200 bg-white py-1 shadow-lg">
                      <div className="border-b border-zinc-100 px-4 py-3">
                        <p className="text-sm font-medium text-zinc-900">{user.name}</p>
                        <p className="text-xs text-zinc-500">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href={dashboardHref}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>
                        <Link
                          href={settingsHref}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50"
                        >
                          <Settings className="h-4 w-4" />
                          Pengaturan Akun
                        </Link>
                      </div>
                      <div className="border-t border-zinc-100 py-1">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Keluar
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Not Logged In */
              <Button className="ml-1 h-9 rounded-full bg-yellow-300 px-5 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-yellow-400" asChild>
                <Link href="/masuk">Masuk</Link>
              </Button>
            )}
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            {!hideMenu && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-black hover:bg-zinc-100"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Link href="/keranjang">
                  <Button variant="ghost" size="icon" className="relative text-black hover:bg-zinc-100">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-black hover:bg-zinc-100">
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute inset-0 flex items-center bg-white px-4 sm:px-6 lg:px-8 gap-4 animate-in fade-in duration-200 z-50">
            <div className="relative flex-1 max-w-2xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  placeholder="Cari produk di 22Mart..."
                  className="h-11 w-full rounded-full border border-zinc-200 bg-zinc-50 pl-11 pr-4 text-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  autoFocus
                />
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(false)} 
                className="rounded-full"
              >
                <X className="h-5 w-5 text-zinc-500" />
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[65px] bottom-0 z-50 overflow-y-auto bg-white lg:hidden">
          <div className="px-4 py-6">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-zinc-900 hover:bg-zinc-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4 text-zinc-400" />
                </Link>
              ))}
            </div>

            <div className="mt-6 border-t border-zinc-200 pt-6">
              {user ? (
                <div className="space-y-1">
                  {/* User Info */}
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-900">{user.name}</p>
                      <p className="text-xs text-zinc-500">{user.email}</p>
                    </div>
                  </div>

                  <Link
                    href={dashboardHref}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-zinc-900 hover:bg-zinc-50"
                  >
                    Dashboard
                    <ChevronRight className="h-4 w-4 text-zinc-400" />
                  </Link>
                  <Link
                    href={settingsHref}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-zinc-900 hover:bg-zinc-50"
                  >
                    Pengaturan Akun
                    <ChevronRight className="h-4 w-4 text-zinc-400" />
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Keluar
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="grid gap-3">
                  <Button variant="outline" className="h-12 justify-center gap-2 rounded-xl border-zinc-200 bg-white">
                    <Heart className="h-4 w-4" />
                    Wishlist
                  </Button>
                  <Button className="h-12 rounded-xl bg-yellow-300 font-semibold text-zinc-900 shadow-sm hover:bg-yellow-400" asChild>
                    <Link href="/masuk">Masuk</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
