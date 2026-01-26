"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Sparkles, Save, Package, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category } from "@/types";

export default function CreateProductPage() {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [flattenedCategories, setFlattenedCategories] = useState<{id: string, label: string}[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const user = await api.auth.me(token);
        if (user.role !== "admin") {
          router.push("/dashboard");
          return;
        }
        setIsLoadingAuth(false);
        
        // Load categories as a tree
        const tree = await api.categories.getTree();
        
        // Flatten the tree for the dropdown with "Parent > Child" labels
        const flattened: {id: string, label: string}[] = [];
        const flatten = (cats: any[], prefix = "") => {
          cats.forEach(c => {
            const currentName = typeof c.name === 'object' ? (c.name[locale] || c.name['fr'] || c.name['en'] || c.slug || c.id) : (c.name || c.slug || c.id);
            const label = prefix ? `${prefix} > ${currentName}` : currentName;
            flattened.push({ id: c.id, label });
            if (c.sub_categories && c.sub_categories.length > 0) {
              flatten(c.sub_categories, label);
            }
          });
        };
        flatten(tree);
        setFlattenedCategories(flattened);
        if (flattened.length > 0) setCategoryId(flattened[0].id);
      } catch (e) {
        console.error("Auth check failed", e);
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  const handleGenerateAI = async () => {
    if (!name) return alert("Please enter a product name first.");
    setIsGenerating(true);
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    try {
      const res = await api.ai.generateDescription(token, {
        product_name: name,
        features: [sku, "high performance", "industrial"],
        tone: "professional",
        language: locale,
      });
      setDescription(res.description);
    } catch (e) {
      alert("AI Generation Failed");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!categoryId) return alert("Please select a category.");
    setIsSaving(true);
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    try {
      await api.products.create(token, {
        name: { [locale]: name },
        description: { [locale]: description },
        sku,
        price: parseFloat(price),
        cost: parseFloat(price) * 0.7,
        currency: "EUR",
        stock: 100,
        category_id: categoryId,
        image_urls: [],
        low_stock_threshold: 10,
        weight: 0,
        tags: []
      });
      alert("Product Created!");
      router.push("/products");
    } catch (e: any) {
      alert(`Failed to create product: ${e.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-cedra-500" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-cedra-500/10 rounded-[2rem] flex items-center justify-center text-cedra-500 mx-auto mb-6 border border-cedra-500/20 shadow-2xl">
            <Package size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-4">
            {t.admin.newAsset}{" "}
            <span className="text-cedra-500">{t.admin.newAssetAccent}</span>
          </h1>
          <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest">
            {t.admin.registerStock}
          </p>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-10 rounded-[3rem] space-y-8 shadow-2xl">
          <div className="space-y-2">
            <Label className="pl-2 text-[10px] uppercase font-black text-zinc-500">
              {t.admin.productName}
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-cedra-500/50 outline-none transition-all h-14 font-bold text-lg"
              placeholder="e.g. Rack Server 4U"
            />
          </div>

          <div className="space-y-2">
            <Label className="pl-2 text-[10px] uppercase font-black text-zinc-500">
              Category
            </Label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-4 py-4 text-white focus:border-cedra-500/50 outline-none transition-all h-14 font-bold text-sm"
            >
              {flattenedCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
              {flattenedCategories.length === 0 && (
                <option value="">No categories available</option>
              )}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="pl-2 text-[10px] uppercase font-black text-zinc-500">
                {t.admin.sku}
              </Label>
              <Input
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-cedra-500/50 outline-none transition-all h-14 font-mono font-bold"
                placeholder="PROD-001"
              />
            </div>
            <div className="space-y-2">
              <Label className="pl-2 text-[10px] uppercase font-black text-zinc-500">
                {t.admin.price}
              </Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-cedra-500/50 outline-none transition-all h-14 font-bold"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="relative space-y-2">
            <div className="flex justify-between items-end mb-2">
              <Label className="pl-2 text-[10px] uppercase font-black text-zinc-500">
                {t.admin.description}
              </Label>
              <button
                onClick={handleGenerateAI}
                disabled={isGenerating || !name}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cedra-500 hover:text-white transition-all disabled:opacity-20"
              >
                <Sparkles
                  size={14}
                  className={isGenerating ? "animate-spin" : ""}
                />{" "}
                {isGenerating ? t.admin.generating : t.admin.generateAI}
              </button>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white min-h-[200px] focus:border-cedra-500/50 outline-none transition-all font-medium leading-relaxed placeholder:text-white/5"
              placeholder="Detailed technical specification..."
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full h-20 bg-white text-black rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm hover:bg-cedra-500 hover:text-white transition-all flex items-center justify-center gap-3 mt-4 shadow-2xl"
          >
            {isSaving ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Save size={20} /> {t.admin.saveProduct}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}