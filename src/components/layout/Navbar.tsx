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
    Bell, 
    ChevronDown, 
    Plus, 
    Hammer, 
    Lightbulb, 
    Power,
    Package
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
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
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const { itemCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            {/* Main Navbar */}
            <div className={cn(
                "h-16 flex items-center px-8 gap-8 transition-all duration-300 border-b border-white/5",
                isScrolled ? "bg-black/95 backdrop-blur-xl h-14" : "bg-black"
            )}>
                {/* Logo */}
                <Link 
                    href="/" 
                    className="flex-shrink-0 transition-all"
                >
                    <Image 
                        src="/logo.svg" 
                        alt="CEDRA"
                        width={64}
                        height={64}
                        className={cn(
                            "transition-all",
                            isScrolled ? "w-24 h-24" : "w-30 h-30"
                        )}
                    />
                </Link>

                {/* Desktop: Departments Dropdown */}
                <div className="hidden lg:block">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="outline" 
                                className="gap-2 bg-transparent text-white hover:bg-white/10 border-white/20 px-4 rounded-md font-bold uppercase tracking-wide text-[11px] h-9"
                            >
                                <Menu size={14} strokeWidth={2.5} />
                                DEPARTMENTS
                                <ChevronDown size={14} strokeWidth={2.5} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64 bg-zinc-950 border-white/10">
                            <DropdownMenuLabel className="text-white/60">Product Categories</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem className="flex items-center gap-3 text-white hover:bg-white/10 cursor-pointer">
                                <Zap size={16} className="text-zinc-400" />
                                <span>Circuit Protection</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-3 text-white hover:bg-white/10 cursor-pointer">
                                <Lightbulb size={16} className="text-zinc-400" />
                                <span>Lighting Solutions</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-3 text-white hover:bg-white/10 cursor-pointer">
                                <Power size={16} className="text-zinc-400" />
                                <span>Sockets & Switches</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-3 text-white hover:bg-white/10 cursor-pointer">
                                <Hammer size={16} className="text-zinc-400" />
                                <span>Industrial Tools</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-3 text-white hover:bg-white/10 cursor-pointer">
                                <Package size={16} className="text-zinc-400" />
                                <span>Cables & Wiring</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem className="text-cedra-500 font-bold cursor-pointer">
                                View All Categories →
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Mobile: Menu Sheet */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button 
                                variant="outline" 
                                size="icon"
                                className="bg-transparent border-white/20 text-white hover:bg-white/10"
                            >
                                <Menu size={18} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-zinc-950 border-white/10 w-80">
                            <SheetHeader>
                                <SheetTitle className="text-white">Menu</SheetTitle>
                                <SheetDescription>Browse our categories and pages</SheetDescription>
                            </SheetHeader>
                            <div className="mt-6 space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-white/60 text-xs font-bold uppercase tracking-wider mb-3">Categories</h3>
                                    <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-3">
                                        <Zap size={16} className="text-zinc-400" />
                                        Circuit Protection
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-3">
                                        <Lightbulb size={16} className="text-zinc-400" />
                                        Lighting Solutions
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-3">
                                        <Power size={16} className="text-zinc-400" />
                                        Sockets & Switches
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-3">
                                        <Hammer size={16} className="text-zinc-400" />
                                        Industrial Tools
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-3">
                                        <Package size={16} className="text-zinc-400" />
                                        Cables & Wiring
                                    </Button>
                                </div>
                                <Separator className="bg-white/10" />
                                <div className="space-y-2">
                                    <h3 className="text-white/60 text-xs font-bold uppercase tracking-wider mb-3">Quick Links</h3>
                                    <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                                        Home
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                                        Flash Deals
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                                        Expertise
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-cedra-500 hover:bg-white/10 font-bold">
                                        <Zap size={14} className="mr-2" />
                                        AI Dashboard
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-2xl hidden md:block">
                    <Input 
                        placeholder="Search for products, brands, or references..." 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-cedra-500/50 h-9 text-sm"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Locations */}
                    <div className="hidden md:block">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    className="gap-2 text-white/70 hover:text-white hover:bg-white/10 px-3 h-9 text-xs"
                                >
                                    <MapPin size={14} />
                                    <span className="hidden xl:inline">LOCATIONS</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-zinc-950 border-white/10 text-white">
                                <DialogHeader>
                                    <DialogTitle>Our Store Locations</DialogTitle>
                                    <DialogDescription>Find a CEDRA store near you</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                                        <div className="flex items-start gap-3">
                                            <MapPin size={20} className="text-cedra-500 mt-0.5" />
                                            <div>
                                                <h4 className="font-bold text-white mb-1">Brussels Central</h4>
                                                <p className="text-sm text-white/60">Rue de la Loi 123, 1000 Brussels</p>
                                                <p className="text-xs text-white/40 mt-2">Mon-Fri: 8:00-18:00 | Sat: 9:00-14:00</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                                        <div className="flex items-start gap-3">
                                            <MapPin size={20} className="text-zinc-400 mt-0.5" />
                                            <div>
                                                <h4 className="font-bold text-white mb-1">Antwerp North</h4>
                                                <p className="text-sm text-white/60">Mechelsesteenweg 456, 2018 Antwerp</p>
                                                <p className="text-xs text-white/40 mt-2">Mon-Fri: 8:00-18:00 | Sat: 9:00-14:00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                                        View All Locations
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Quick Order */}
                    <div className="hidden 2xl:block">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    className="gap-2 text-white/70 hover:text-white hover:bg-white/10 px-3 h-9 text-xs"
                                >
                                    <Plus size={14} />
                                    QUICK ORDER
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-zinc-950 border-white/10 text-white">
                                <DialogHeader>
                                    <DialogTitle>Quick Order</DialogTitle>
                                    <DialogDescription>Enter product references for bulk ordering</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="ref">Product Reference</Label>
                                        <Input 
                                            id="ref"
                                            placeholder="e.g., MCB-C16-1P" 
                                            className="bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="qty">Quantity</Label>
                                        <Input 
                                            id="qty"
                                            type="number"
                                            placeholder="1" 
                                            className="bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button className="bg-cedra-500 hover:bg-cedra-600 text-white">
                                        Add to Cart
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Sign In */}
                    <div className="hidden sm:block">
                        <Button 
                            variant="ghost" 
                            className="gap-2 text-white/70 hover:text-white hover:bg-white/10 px-3 h-9 text-xs"
                        >
                            SIGN IN
                        </Button>
                    </div>

                    {/* Cart */}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/cart">
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        className="relative text-white hover:bg-white/10 h-9 w-9"
                                    >
                                        <ShoppingCart size={18} />
                                        {itemCount > 0 && (
                                            <Badge 
                                                className="absolute -top-1 -right-1 h-5 min-w-[20px] flex items-center justify-center p-0 px-1 bg-cedra-500 hover:bg-cedra-500 text-white border-0 text-[10px] font-bold"
                                            >
                                                {itemCount}
                                            </Badge>
                                        )}
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{itemCount} items in cart</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            {/* Sub Navigation */}
            <div className="bg-zinc-950 h-10 flex items-center px-8 gap-8 overflow-x-auto no-scrollbar border-t border-white/5">
                <SubNavLink href="/" isActive={pathname === "/"}>
                    HOME
                </SubNavLink>
                <SubNavLink href="/products?cat=Promotions" isActive={pathname.includes("Promotions")}>
                    FLASH DEALS
                </SubNavLink>
                <SubNavLink href="/expertises" isActive={pathname === "/expertises"}>
                    EXPERTISE
                </SubNavLink>
                <SubNavLink 
                    href="/dashboard" 
                    className="text-cedra-500 font-bold flex items-center gap-1.5 ml-auto"
                    isActive={pathname === "/dashboard"}
                >
                    <Zap size={12} /> AI DASHBOARD
                </SubNavLink>
            </div>
        </nav>
    );
}

function SubNavLink({ 
    href, 
    children, 
    className, 
    isActive = false 
}: { 
    href: string; 
    children: React.ReactNode; 
    className?: string; 
    isActive?: boolean 
}) {
    return (
        <Link
            href={href}
            className={cn(
                "text-[11px] font-bold uppercase tracking-wide px-2 h-full flex items-center transition-all whitespace-nowrap hover:text-white",
                isActive ? "text-white" : "text-white/50",
                className
            )}
        >
            {children}
        </Link>
    );
}
