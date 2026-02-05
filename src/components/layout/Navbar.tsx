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

import dynamic from "next/dynamic";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const StoreMap = dynamic(() => import("@/components/ui/StoreMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-zinc-900 animate-pulse rounded-2xl" />
  ),
});

import { api } from "@/lib/api";
import { User } from "@/types";
import CategoryMenuComponent from "./CategoryMenu";
import { User as UserIcon } from "lucide-react";

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
    window.addEventListener("scroll", handleScroll, { passive: true });

    const checkAuth = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        try {
          const userData = await api.auth.me(token);
          setUser(userData);
        } catch (e) {
          // Silent fail - token might be expired
          if (typeof window !== "undefined") localStorage.removeItem("token");
        }
      }
    };
    checkAuth();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const isProOrAdmin = user && (user.role === 'admin' || user.role === 'company_admin' || user.is_linked_to_company);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <div
            className={cn(
              "flex items-center px-4 md:px-8 gap-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-50 border-b",
              isScrolled 
                ? "bg-void/60 backdrop-blur-xl h-16 border-white/5 shadow-2xl py-0" 
                : "bg-transparent h-20 md:h-24 border-transparent py-2",
            )}
          >
          {/* MOBILE: Menu */}
          <div className="lg:hidden shrink-0">
            <Sheet modal={false}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 -ml-2 rounded-xl"
                >
                  <Menu size={24} strokeWidth={1.5} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-zinc-950/95 backdrop-blur-3xl border-r border-white/10 w-[85vw] sm:w-87.5 p-0 flex flex-col"
              >
                <div className="p-8 border-b border-white/10 bg-gradient-to-br from-cedra-500/10 to-transparent">
                  <div className="flex items-center justify-between mb-4">
                    <SheetTitle className="text-white flex items-center gap-3 font-display font-black italic tracking-tighter text-2xl">
                      <div className="w-10 h-10 bg-cedra-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(230,0,35,0.4)]">
                        C
                      </div>
                      CEDRA
                    </SheetTitle>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white rounded-full">
                        <X size={20} />
                      </Button>
                    </SheetClose>
                  </div>
                  <div className="mt-8 flex gap-3">
                    {user ? (
                      <>
                        <Link href={isProOrAdmin ? "/dashboard" : "/dashboard/profile"} className="flex-1">
                          <Button className="w-full bg-white text-black hover:bg-cedra-500 hover:text-white h-11 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg">
                            {t.dashboard.title}
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          onClick={handleLogout}
                          className="border border-white/10 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 h-11 px-3 rounded-xl"
                        >
                          <Power size={16} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" className="flex-1">
                          <Button className="w-full bg-white text-black hover:bg-cedra-500 hover:text-white h-11 text-[11px] font-black uppercase tracking-widest rounded-xl shadow-lg">
                            {t.nav.signIn}
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto py-8 px-6 no-scrollbar">
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h3 className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4 pl-4">{t.nav.categories}</h3>
                      <MobileMenuLink icon={<Zap size={18} />} label={t.nav.circuitProtection} />
                      <MobileMenuLink icon={<Lightbulb size={18} />} label={t.nav.lightingSolutions} />
                      <MobileMenuLink icon={<Power size={18} />} label={t.nav.socketsAndSwitches} />
                      <MobileMenuLink icon={<Hammer size={18} />} label={t.nav.industrialTools} />
                      <MobileMenuLink icon={<Package size={18} />} label={t.nav.cablesAndWiring} />
                    </div>
                    <Separator className="bg-white/5 mx-4" />
                    <div className="space-y-2">
                      <h3 className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4 pl-4">Services</h3>
                      <MobileMenuLink icon={<MapPin size={18} />} label={t.nav.stores} />
                      <MobileMenuLink icon={<Plus size={18} />} label={t.nav.quickOrder} />
                      <MobileMenuLink icon={<Zap size={18} />} label={t.nav.aiDashboard} className="text-cedra-500 font-black bg-cedra-500/5 border border-cedra-500/20" />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="shrink-0 transition-all mx-auto lg:mx-0 group">
            <div className="relative">
              <Image
                src="/logo-full.svg"
                alt="CEDRA"
                width={120}
                height={48}
                className={cn("transition-all duration-500 object-contain", isScrolled ? "h-7 md:h-8" : "h-10 md:h-14")}
              />
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cedra-500 transition-all duration-500 group-hover:w-full"></div>
            </div>
          </Link>

          <div className="hidden lg:block ml-8">
            <CategoryMenuComponent />
          </div>

          <div className="flex-1 max-w-xl hidden lg:block mx-8">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 group-focus-within:text-cedra-500 transition-all" />
              <Input
                placeholder={t.nav.search}
                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-cedra-500/50 pl-11 h-11 text-sm transition-all hover:bg-white/10 rounded-2xl border-transparent focus:border-white/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10 rounded-xl"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <Search size={22} strokeWidth={1.5} />
            </Button>

            <div className="hidden lg:block">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="gap-2 text-zinc-400 hover:text-white hover:bg-white/10 px-4 h-11 rounded-xl text-[11px] font-black uppercase tracking-widest">
                    <MapPin size={16} />
                    <span className="hidden xl:inline">{t.nav.stores}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent hideCloseButton={true} className="bg-zinc-950/80 backdrop-blur-3xl border-white/10 text-white rounded-[40px] shadow-2xl sm:max-w-5xl w-[95vw] h-[85vh] flex flex-col p-0 overflow-hidden">
                  <div className="p-8 pb-0 z-10 relative flex justify-between items-start">
                    <div className="space-y-1">
                      <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter font-display">{t.stores.title}</DialogTitle>
                      <DialogDescription className="text-zinc-500 font-medium">{t.stores.subtitle}</DialogDescription>
                    </div>
                    <DialogClose asChild>
                      <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white w-12 h-12"><X size={24} /></Button>
                    </DialogClose>
                  </div>
                  <div className="flex-1 w-full h-full p-6 relative">
                    <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative z-10">
                      <StoreMap />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="hidden lg:block">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="gap-2 bg-white text-black hover:bg-cedra-500 hover:text-white px-5 h-11 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-white/5">
                      <UserIcon size={16} className="fill-current" />
                      {user.first_name || "Compte"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="cursor-pointer">
                        Vos commandes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile" className="cursor-pointer">
                        Vos retours
                      </Link>
                    </DropdownMenuItem>
                    {isProOrAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="text-cedra-500 focus:text-cedra-500">
                          <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                            <Zap size={14} fill="currentColor" />
                            Tableau de bord
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer">
                      <Power size={14} className="mr-2" />
                      Se déconnecter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" className="gap-2 text-zinc-400 hover:text-white px-5 h-11 text-[11px] font-black uppercase tracking-widest">
                    <UserIcon size={16} />
                    {t.nav.signIn}
                  </Button>
                </Link>
              )}
            </div>

            <LanguageSelector />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/cart" className="group relative">
                    <Button variant="ghost" size="icon" className="relative text-white hover:bg-cedra-500 hover:text-white h-11 w-11 rounded-xl transition-all border border-white/5">
                      <ShoppingCart size={20} strokeWidth={2} />
                      {itemCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center bg-cedra-500 text-white border-2 border-void text-[10px] font-black rounded-lg">
                          {itemCount}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-zinc-900 border-white/10 text-white rounded-lg">
                  <p className="font-bold text-[10px] uppercase tracking-widest">{itemCount} {itemCount === 1 ? t.nav.itemInCart : t.nav.itemsInCart}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className={cn(
          "transition-all duration-500 flex items-center px-4 md:px-8 gap-8 overflow-x-auto no-scrollbar border-t border-white/5",
          isScrolled ? "h-0 opacity-0 pointer-events-none" : "h-11 bg-zinc-900/40 backdrop-blur-md opacity-100"
        )}>
          <SubNavLink href="/" isActive={pathname === "/"}>{t.nav.home}</SubNavLink>
          <SubNavLink href="/products?cat=Promotions" isActive={pathname.includes("Promotions")}>{t.nav.flashDeals}</SubNavLink>
          <SubNavLink href="/expertises" isActive={pathname === "/expertises"}>{t.nav.expertise}</SubNavLink>
          <SubNavLink href="/orders" isActive={pathname === "/orders"}>{t.hero.trackOrder}</SubNavLink>
          <SubNavLink href="/dashboard" className="text-cedra-500 font-black italic flex items-center gap-2 ml-auto pl-6 border-l border-white/5" isActive={pathname === "/dashboard"}>
            <Zap size={14} className="fill-current animate-pulse" />
            <span className="whitespace-nowrap tracking-tighter">{t.nav.aiDashboard}</span>
          </SubNavLink>
        </div>
        </div>
      </nav>
      <div className={cn("transition-all duration-500", isScrolled ? "h-14" : "h-31 md:h-35")} />
    </>
  );
}

function SubNavLink({ href, children, className, isActive = false }: { href: string; children: React.ReactNode; className?: string; isActive?: boolean; }) {
  return (
    <Link
      href={href}
      className={cn(
        "text-[10px] md:text-[11px] font-black uppercase tracking-widest h-full flex items-center transition-all whitespace-nowrap hover:text-cedra-500 shrink-0 border-b-2 border-transparent",
        isActive ? "text-white border-cedra-500" : "text-zinc-500",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function MobileMenuLink({ icon, label, className }: { icon: React.ReactNode; label: string; className?: string; }) {
  return (
    <Button
      variant="ghost"
      className={cn("w-full justify-start text-zinc-400 hover:text-white hover:bg-cedra-500/10 h-14 gap-4 pl-4 text-xs font-bold uppercase tracking-widest rounded-2xl transition-all border border-transparent hover:border-cedra-500/20", className)}
    >
      <span className="text-zinc-600 group-hover:text-cedra-500 transition-colors">{icon}</span>
      {label}
    </Button>
  );
}