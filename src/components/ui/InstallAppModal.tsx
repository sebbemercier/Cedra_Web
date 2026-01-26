"use client";

import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Smartphone, Apple, PlayCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type OS = "ios" | "android" | "other";

export default function InstallAppModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [os, setOs] = useState<OS>("other");
  const { t } = useLanguage();

  useEffect(() => {
    // Detect OS
    const userAgent = typeof window !== "undefined" ? window.navigator.userAgent.toLowerCase() : "";
    let detectedOs: OS = "other";
    
    if (/iphone|ipad|ipod/.test(userAgent)) {
      detectedOs = "ios";
    } else if (/android/.test(userAgent)) {
      detectedOs = "android";
    }

    setOs(detectedOs);

    // Only show on mobile devices (iOS or Android)
    if (detectedOs !== "other") {
      const hasDismissed = localStorage.getItem("cedra-app-dismissed");
      if (!hasDismissed) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem("cedra-app-dismissed", "true");
  };

  const handleInstall = () => {
    if (os === "ios") {
      window.open("https://apps.apple.com", "_blank"); // À remplacer par votre lien réel
    } else if (os === "android") {
      window.open("https://play.google.com", "_blank"); // À remplacer par votre lien réel
    }
    handleDismiss();
  };

  if (os === "other") return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-void border-white/10">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 bg-cedra-500/10 rounded-xl flex items-center justify-center mb-4">
            <Smartphone className="w-6 h-6 text-cedra-500" />
          </div>
          <DialogTitle className="text-center text-xl font-display text-white">
            {t.pwa.title}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400">
            {t.pwa.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center py-6">
          {os === "ios" ? (
            <div className="flex flex-col items-center p-6 rounded-2xl bg-surface border border-white/10 w-full">
              <Apple className="w-12 h-12 mb-3 text-white" />
              <span className="text-sm font-medium text-white text-center">Disponible sur l'App Store</span>
            </div>
          ) : (
            <div className="flex flex-col items-center p-6 rounded-2xl bg-surface border border-white/10 w-full">
              <PlayCircle className="w-12 h-12 mb-3 text-white" />
              <span className="text-sm font-medium text-white text-center">Disponible sur Google Play</span>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-3">
          <Button 
            variant="ghost" 
            onClick={handleDismiss}
            className="text-gray-500 hover:text-white"
          >
            {t.pwa.later}
          </Button>
          <Button 
            onClick={handleInstall}
            className="flex-1 bg-cedra-500 hover:bg-cedra-600 text-white h-12 rounded-xl text-lg font-medium"
          >
            {os === "ios" ? "Ouvrir l'App Store" : "Ouvrir le Play Store"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}