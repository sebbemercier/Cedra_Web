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

import { translations, Locale } from "@/lib/i18n/translations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = translations[locale as Locale] || translations.en;

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL || "https://cedra-shop.be",
    ),
    title: {
      default: t.metadata.title,
      template: "%s | CEDRA",
    },
    description: t.metadata.description,
    manifest: "/manifest.json",
    themeColor: "#E60023",
    icons: {
      icon: "/logo-caddie.svg",
      apple: "/logo-caddie.svg",
    },
    openGraph: {
      title: t.metadata.ogTitle,
      description: t.metadata.description,
      url: `https://cedra.com/${locale}`,
      siteName: "CEDRA",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "CEDRA B2B Platform",
        },
      ],
      locale: locale === "fr" ? "fr_FR" : locale === "nl" ? "nl_BE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.metadata.ogTitle,
      description: t.metadata.description,
      images: ["/og-image.jpg"],
    },
  };
}

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
            <LanguageTransition>{children}</LanguageTransition>
          </main>
          <B2BCopilot />
          <InstallAppModal />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
