"use client";

import React from "react";
import { HeroUIProvider } from "@heroui/react";
import { MantineProvider, createTheme } from "@mantine/core";
import { CartProvider } from "@/hooks/useCart";
import { LanguageProvider } from "@/lib/i18n";
import { Locale } from "@/lib/i18n/translations";

const mantineTheme = createTheme({
  primaryColor: "red",
});

export function AppProvider({ children, locale }: { children: React.ReactNode, locale: string }) {
  return (
    <MantineProvider theme={mantineTheme} defaultColorScheme="dark">
      <HeroUIProvider>
        <LanguageProvider initialLocale={locale as Locale}>
          <CartProvider>
            {children}
          </CartProvider>
        </LanguageProvider>
      </HeroUIProvider>
    </MantineProvider>
  );
}
