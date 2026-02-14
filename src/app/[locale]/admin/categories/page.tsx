"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { ListTree, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { Category } from "@/types";
import { CategoryForm } from "@/components/pages/admin/categories/CategoryForm";
import { CategoryList } from "@/components/pages/admin/categories/CategoryList";

export default function AdminCategoriesPage() {
  const { locale } = useTranslation();
  const router = useRouter();
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [parentId, setParentId] = useState<string>("");
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
        fetchCategories();
      } catch (e) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  const fetchCategories = async () => {
    try {
      const tree = await api.categories.getTree();
      setCategories(tree);
    } catch (e) {
      console.error("Failed to fetch categories", e);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatSlug) return alert("Slug is required");
    setIsSaving(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await api.categories.create(token, {
        slug: newCatSlug,
        name: newCatName,
        parent_id: parentId || undefined,
        is_active: true,
      });
      setNewCatName("");
      setNewCatSlug("");
      setParentId("");
      fetchCategories();
      alert("Category Created!");
    } catch (e) {
      const error = e as Error;
      alert(`Failed to create category: ${error.message}`);
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
    <div className="min-h-screen pt-32 pb-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-cedra-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              <ListTree size={14} />
              <span>Taxonomy Management</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-outfit tracking-tighter italic uppercase text-white">
              Product <span className="text-cedra-500">Hierarchy</span>
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <CategoryForm
            parentId={parentId}
            setParentId={setParentId}
            newCatSlug={newCatSlug}
            setNewCatSlug={setNewCatSlug}
            newCatName={newCatName}
            setNewCatName={setNewCatName}
            handleCreate={handleCreate}
            isSaving={isSaving}
            categories={categories}
          />
          <CategoryList categories={categories} locale={locale} />
        </div>
      </div>
    </div>
  );
}