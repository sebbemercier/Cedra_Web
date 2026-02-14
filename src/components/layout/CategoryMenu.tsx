"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Zap, ChevronRight, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import { Category, SubCategory } from "@/types";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function CategoryMenu() {
  const { t, locale } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await api.categories.getTree();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  if (loading) return (
    <div className="h-9 w-32 bg-white/5 animate-pulse rounded-md" />
  );

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10 border-white/20 px-4 rounded-md font-bold uppercase tracking-wide text-[11px] h-9 gap-2 transition-all">
            <Zap size={14} className="text-cedra-500" />
            {t.nav.departments}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[600px] lg:w-[800px] p-6 bg-void/95 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl">
              <div className="grid grid-cols-3 gap-8">
                {categories.map((category) => {
                  const catName = category.name?.[locale] || category.name?.['fr'] || category.name?.['en'] || category.slug;
                  return (
                    <div key={category.id} className="space-y-4">
                      <Link
                        href={`/products?category=${category.id}`}
                        className="flex items-center gap-2 text-cedra-500 font-black text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors group"
                      >
                        <Package size={12} className="group-hover:scale-110 transition-transform" />
                        {catName}
                      </Link>
                      
                      <ul className="space-y-2">
                        {category.sub_categories?.map((sub) => {
                          const subName = sub.name?.[locale] || sub.name?.['fr'] || sub.name?.['en'] || sub.slug;
                          return (
                            <li key={sub.id}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={`/products?category=${sub.id}`}
                                  className="text-zinc-400 hover:text-white text-sm block py-1 transition-colors flex items-center justify-between group/item"
                                >
                                  <span>{subName}</span>
                                  <ChevronRight size={12} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-cedra-500" />
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                  {categories.length} Secteurs d&apos;activité disponibles
                </p>
                <Link 
                  href="/products" 
                  className="text-xs font-black text-white hover:text-cedra-500 transition-colors uppercase tracking-tighter italic"
                >
                  Voir tout le catalogue →
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
