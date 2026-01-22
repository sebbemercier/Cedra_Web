"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import Image from "next/image";

export default function InstallAppModal() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Detect mobile device (simple check via window width for this example)
    const isMobile = window.innerWidth < 768;
    // Check if previously dismissed
    const isDismissed = localStorage.getItem("cedra-pwa-dismissed");

    if (isMobile && !isDismissed) {
      // Show after a small delay
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem("cedra-pwa-dismissed", "true");
  };

  const handleInstall = () => {
    // In a real PWA, you would trigger the 'beforeinstallprompt' event here.
    // For this prototype, we'll just close it or show instructions.
    alert("Installation triggered (PWA Flow)");
    handleDismiss();
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm md:hidden"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[100] bg-zinc-900 border-t border-white/10 rounded-t-3xl p-6 md:hidden shadow-2xl safe-area-bottom"
          >
            {/* Handle bar for visual cue */}
            <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-6" />

            <div className="flex gap-4">
              <div className="flex-shrink-0 relative w-16 h-16 bg-black rounded-2xl border border-white/10 p-2 overflow-hidden shadow-lg">
                <Image 
                    src="/logo.svg" 
                    alt="App Icon" 
                    width={64} 
                    height={64} 
                    className="object-contain w-full h-full"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-1">{t.pwa.title}</h3>
                <p className="text-zinc-400 text-sm leading-snug">
                  {t.pwa.description}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button 
                variant="ghost" 
                onClick={handleDismiss}
                className="flex-1 text-zinc-400 hover:text-white hover:bg-white/5"
              >
                {t.pwa.later}
              </Button>
              <Button 
                onClick={handleInstall}
                className="flex-1 bg-cedra-500 hover:bg-cedra-600 text-white font-bold shadow-lg shadow-cedra-500/25"
              >
                <Download size={18} className="mr-2" />
                {t.pwa.install}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
