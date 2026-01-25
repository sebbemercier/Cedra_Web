"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Menu,
  MapPin,
  Zap,
  ChevronDown,
  Plus,
  Hammer,
  Lightbulb,
  Power,
  Package,
  Search,
  X,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import LanguageSelector from "@/components/ui/LanguageSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

import StoreMap from "@/components/ui/StoreMap";
import { api } from "@/lib/api";
import { User } from "@/types";
import CategoryMenuComponent from "./CategoryMenu";

export default function Navbar() {
  const pathname = usePathname();
  const { t, setLocale, locale } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Check auth
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await api.auth.me(token);
          setUser(userData);
        } catch (e) {
          console.error("Navbar auth check failed", e);
          localStorage.removeItem("token");
        }
      }
    };
    checkAuth();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Main Navbar */}
        <div
          className={cn(
            "flex items-center px-4 md:px-8 gap-4 transition-all duration-300 border-b border-white/5 relative z-50",
            isScrolled ? "bg-void/80 backdrop-blur-2xl h-14" : "bg-void h-16",
          )}
        >
          {/* MOBILE: Left - Hamburger */}
          <div className="lg:hidden shrink-0">
            <Sheet modal={false}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 -ml-2"
                  aria-label="Open menu"
                >
                  <Menu size={24} strokeWidth={1.5} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-white/3 backdrop-blur-3xl border-r border-white/10 w-[85vw] sm:w-87.5 p-0 flex flex-col"
              >
                {/* Mobile Menu Header */}
                <div className="p-6 border-b border-white/10 bg-white/2">
                  <div className="flex items-center justify-between mb-2">
                    <SheetTitle className="text-white flex items-center gap-3">
                      <div className="w-8 h-8 bg-cedra-500 rounded flex items-center justify-center text-black font-bold text-xl">
                        C
                      </div>
                      CEDRA
                    </SheetTitle>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-zinc-400 hover:text-white"
                      >
                        <X size={20} />
                      </Button>
                    </SheetClose>
                  </div>
                  <SheetDescription className="text-zinc-400 text-xs">
                    {t.nav.browseCategories}
                  </SheetDescription>

                  {/* Quick Auth Actions in Menu */}
                  <div className="mt-6 flex gap-3">
                    {user ? (
                      <>
                        <Link href="/dashboard" className="flex-1">
                          <Button className="w-full bg-white text-black hover:bg-zinc-200 h-9 text-[10px] font-black uppercase tracking-wide rounded-xl">
                            {t.dashboard.title}
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          onClick={() => {
                            localStorage.removeItem("token");
                            window.location.reload();
                          }}
                          className="flex-1 border-red-500/20 text-red-500 hover:bg-red-500/10 h-9 text-[10px] font-black uppercase tracking-wide rounded-xl"
                        >
                          {t.dashboard.logout}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" className="flex-1">
                          <Button className="w-full bg-white text-black hover:bg-zinc-200 h-9 text-[10px] font-black uppercase tracking-wide rounded-xl">
                            {t.nav.signIn}
                          </Button>
                        </Link>
                        <Link href="/register" className="flex-1">
                          <Button
                            variant="outline"
                            className="w-full border-white/20 text-white hover:bg-white/10 h-9 text-[10px] font-black uppercase tracking-wide rounded-xl"
                          >
                            Register
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto py-6 px-6">
                  <div className="space-y-6">
                    {/* Categories */}
                    <div className="space-y-1">
                      <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 pl-2">
                        {t.nav.categories}
                      </h3>
                      <MobileMenuLink
                        icon={<Zap size={18} />}
                        label={t.nav.circuitProtection}
                      />
                      <MobileMenuLink
                        icon={<Lightbulb size={18} />}
                        label={t.nav.lightingSolutions}
                      />
                      <MobileMenuLink
                        icon={<Power size={18} />}
                        label={t.nav.socketsAndSwitches}
                      />
                      <MobileMenuLink
                        icon={<Hammer size={18} />}
                        label={t.nav.industrialTools}
                      />
                      <MobileMenuLink
                        icon={<Package size={18} />}
                        label={t.nav.cablesAndWiring}
                      />
                    </div>

                    <Separator className="bg-white/10" />

                    {/* Services */}
                    <div className="space-y-1">
                      <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 pl-2">
                        Services
                      </h3>
                      <MobileMenuLink
                        icon={<MapPin size={18} />}
                        label={t.nav.stores}
                      />
                      <MobileMenuLink
                        icon={<Plus size={18} />}
                        label={t.nav.quickOrder}
                      />
                      <MobileMenuLink
                        icon={<Zap size={18} />}
                        label={t.nav.aiDashboard}
                        className="text-cedra-500 font-bold"
                      />
                    </div>

                    <Separator className="bg-white/10" />

                    {/* Settings / Language */}
                    <div className="space-y-1">
                      <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 pl-2">
                        Configuration
                      </h3>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <Button
                          variant="outline"
                          onClick={() => setLocale("fr")}
                          className={cn(
                            "h-8 text-xs border-white/10 rounded-lg",
                            locale === "fr"
                              ? "bg-cedra-500 text-white border-cedra-500"
                              : "text-zinc-400 bg-transparent",
                          )}
                        >
                          🇫🇷 FR
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setLocale("en")}
                          className={cn(
                            "h-8 text-xs border-white/10 rounded-lg",
                            locale === "en"
                              ? "bg-cedra-500 text-white border-cedra-500"
                              : "text-zinc-400 bg-transparent",
                          )}
                        >
                          🇬🇧 EN
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setLocale("nl")}
                          className={cn(
                            "h-8 text-xs border-white/10 rounded-lg",
                            locale === "nl"
                              ? "bg-cedra-500 text-white border-cedra-500"
                              : "text-zinc-400 bg-transparent",
                          )}
                        >
                          🇳🇱 NL
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 bg-white/1 text-center">
                  <p className="text-[10px] text-zinc-600">© 2026 CEDRA Inc.</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Center - Logo */}
          <Link href="/" className="shrink-0 transition-all mx-auto lg:mx-0">
            <Image
              src="/logo.svg"
              alt="CEDRA"
              width={48}
              height={48}
              className={cn(
                "transition-all w-auto",
                isScrolled ? "h-8" : "h-10 md:h-12",
              )}
            />
          </Link>

          {/* Desktop: Departments Dropdown */}
          <div className="hidden lg:block ml-4">
            <CategoryMenuComponent />
          </div>

          {/* Desktop Search Bar */}
          <div className="flex-1 max-w-2xl hidden lg:block mx-8">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 group-focus-within:text-cedra-500 transition-colors" />
              <Input
                placeholder={t.nav.search}
                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-cedra-500/50 pl-10 h-10 text-sm transition-all hover:bg-white/10 rounded-xl"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* MOBILE: Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10 rounded-full"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              aria-label="Toggle search"
            >
              <Search size={20} strokeWidth={1.5} />
            </Button>

            {/* Desktop: Locations */}
            <div className="hidden lg:block">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="gap-2 text-zinc-300 hover:text-white hover:bg-white/10 px-3 h-9 text-xs"
                  >
                    <MapPin size={14} />
                    <span className="hidden xl:inline">{t.nav.stores}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent
                  hideCloseButton={true}
                  className="bg-white/3 backdrop-blur-3xl border-white/10 text-white rounded-4xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] sm:max-w-4xl w-[95vw] h-[80vh] md:h-150 flex flex-col p-0 overflow-hidden"
                >
                  <div className="p-6 pb-0 z-10 relative">
                    <DialogHeader className="flex flex-row items-start justify-between">
                      <div className="space-y-1 text-left">
                        <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">
                          {t.stores.title}
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400">
                          {t.stores.subtitle}
                        </DialogDescription>
                      </div>
                      <DialogClose asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-full -mt-2 -mr-2"
                        >
                          <X size={20} />
                        </Button>
                      </DialogClose>
                    </DialogHeader>
                  </div>

                  <div className="flex-1 w-full h-full p-4 relative">
                    <StoreMap />
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Desktop: Quick Order */}
            <div className="hidden xl:block">
              <Button
                variant="ghost"
                className="gap-2 text-zinc-300 hover:text-white hover:bg-white/10 px-3 h-9 text-xs"
              >
                <Plus size={14} />
                {t.nav.quickOrder}
              </Button>
            </div>

            {/* Desktop: Sign In / Dashboard */}
            <div className="hidden lg:block">
              {user ? (
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="gap-2 text-cedra-500 hover:text-white hover:bg-cedra-500/10 px-3 h-9 text-xs font-black uppercase tracking-widest"
                  >
                    <Zap size={14} className="animate-pulse" />
                    {t.dashboard.title}
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="gap-2 text-zinc-300 hover:text-white hover:bg-white/10 px-3 h-9 text-xs"
                  >
                    {t.nav.signIn}
                  </Button>
                </Link>
              )}
            </div>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Cart - Visible on Mobile & Desktop */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/cart"
                    aria-label={`View cart, ${itemCount} items`}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative text-white hover:bg-white/10 h-10 w-10 md:h-9 md:w-9 rounded-full"
                    >
                      <ShoppingCart
                        size={20}
                        strokeWidth={1.5}
                        className="md:w-4.5 md:h-4-5"
                      />
                      <Badge
                        className={cn(
                          "absolute top-0 right-0 md:-top-1 md:-right-1 h-4 min-w-4 md:h-5 md:min-w-5 flex items-center justify-center p-0 px-1 text-white border-2 border-background text-[9px] md:text-[10px] font-bold transition-all rounded-full",
                          itemCount > 0
                            ? "bg-cedra-500 hover:bg-cedra-600 scale-100"
                            : "bg-zinc-700 scale-90",
                        )}
                      >
                        {itemCount}
                      </Badge>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {itemCount}{" "}
                    {itemCount === 1 ? t.nav.itemInCart : t.nav.itemsInCart}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {showMobileSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-background/60 backdrop-blur-3xl border-b border-white/10 overflow-hidden"
            >
              <div className="p-4 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                  <Input
                    autoFocus
                    placeholder={t.nav.search}
                    className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-cedra-500 pl-10 h-11 text-sm w-full rounded-xl"
                  />
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setShowMobileSearch(false)}
                  className="text-zinc-400 font-bold text-xs uppercase tracking-widest"
                >
                  {t.common.cancel}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sub Navigation - Scrollable on Mobile */}
        <div className="bg-surface/60 backdrop-blur-3xl h-10 flex items-center px-4 md:px-8 gap-6 md:gap-8 overflow-x-auto no-scrollbar border-t border-white/5 mask-gradient-right">
          <SubNavLink href="/" isActive={pathname === "/"}>
            {t.nav.home}
          </SubNavLink>
          <SubNavLink
            href="/products?cat=Promotions"
            isActive={pathname.includes("Promotions")}
          >
            {t.nav.flashDeals}
          </SubNavLink>
          <SubNavLink href="/expertises" isActive={pathname === "/expertises"}>
            {t.nav.expertise}
          </SubNavLink>
          <SubNavLink href="/orders" isActive={pathname === "/orders"}>
            {t.hero.trackOrder}
          </SubNavLink>
          <SubNavLink
            href="/dashboard"
            className="text-cedra-500 font-bold flex items-center gap-1.5 ml-auto pl-4"
            isActive={pathname === "/dashboard"}
          >
            <Zap size={12} />{" "}
            <span className="whitespace-nowrap">{t.nav.aiDashboard}</span>
          </SubNavLink>
        </div>
      </nav>
      {/* Spacer for Fixed Navbar */}
      <div className="h-26 md:h-26" />
    </>
  );
}

function SubNavLink({
  href,
  children,
  className,
  isActive = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-[10px] md:text-[11px] font-bold uppercase tracking-wide h-full flex items-center transition-all whitespace-nowrap hover:text-white shrink-0",
        isActive ? "text-white" : "text-white/50",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function MobileMenuLink({
  icon,
  label,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start text-zinc-300 hover:text-white hover:bg-white/5 h-12 gap-4 pl-2 text-sm rounded-xl transition-all",
        className,
      )}
    >
      <span className="text-zinc-500">{icon}</span>
      {label}
    </Button>
  );
}
