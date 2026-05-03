import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { CartProvider } from "@/lib/cart-context";
import { FavoriteProvider } from "@/lib/favorite-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap', // Mencegah Layout Shift
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: 'swap', // Mencegah Layout Shift
});

export const metadata: Metadata = {
  title: "22Mart - Supermarket Online Favorit Anda",
  description:
    "Belanja kebutuhan harian jadi lebih praktis. Sayur segar, buah pilihan, dan semua kebutuhan rumah tangga diantar langsung ke rumah Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://pqcexuqenjfudrwefnql.supabase.co" />
        <link rel="dns-prefetch" href="https://pqcexuqenjfudrwefnql.supabase.co" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <CartProvider>
          <FavoriteProvider>
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: "#18181b",
                  color: "#ffffff",
                  border: "none",
                },
              }}
            />
          </FavoriteProvider>
        </CartProvider>
      </body>
    </html>
  );
}
