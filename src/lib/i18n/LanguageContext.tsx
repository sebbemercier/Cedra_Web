"use client";

import React, { createContext, useContext, useMemo, useCallback } from "react";
import { translations, Locale, TranslationKeys } from "./translations";
import { useRouter, usePathname } from "next/navigation";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children, 
  initialLocale 
}: { 
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Single source of truth: the URL locale
  const locale = initialLocale || "fr";

  const setLocale = useCallback((newLocale: Locale) => {
    if (newLocale === locale) return;
    
    // Use cookie for next server-side visit
    document.cookie = `cedra-locale=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
    
    if (pathname) {
        const segments = pathname.split('/');
        // Structure is usually ["", "locale", "rest", "of", "path"]
        segments[1] = newLocale;
        const newPath = segments.join('/') || `/${newLocale}`;
        router.push(newPath);
    }
  }, [locale, pathname, router]);

  const t = useMemo(() => {
    return translations[locale] || translations.fr;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};

export const useTranslation = () => {
  const { t, locale, setLocale } = useLanguage();
  return { t, locale, setLocale };
};
