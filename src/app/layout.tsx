import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";  
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CEDRA | High-Performance B2B E-Commerce",
  description: "Advanced B2B e-commerce platform powered by AI and sovereign technology.",
};

import { CartProvider } from "@/hooks/useCart";
import B2BCopilot from "@/components/ui/B2BCopilot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased selection:bg-cedra-500 selection:text-white`}
      >
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <B2BCopilot />
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
