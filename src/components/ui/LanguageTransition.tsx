"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * LanguageTransition uses the pathname as key to trigger
 * animations when the locale (part of the path) changes.
 */
export default function LanguageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Use the first segment of the path (the locale) as key
  const localeKey = pathname?.split('/')[1] || 'fr';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={localeKey}
        initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
