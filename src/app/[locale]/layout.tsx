import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import B2BCopilot from "@/components/ui/B2BCopilot";
import InstallAppModal from "@/components/ui/InstallAppModal";
import LanguageTransition from "@/components/ui/LanguageTransition";
import { AppProvider } from "@/components/ui/AppProvider";
import React from "react";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CEDRA | High-Performance B2B E-Commerce",
  description: "Advanced B2B e-commerce platform powered by AI and sovereign technology.",
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <AppProvider locale={locale}>
          <Navbar />
          <main>
            <LanguageTransition>
              {children}
            </LanguageTransition>
          </main>
          <B2BCopilot />
          <InstallAppModal />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
