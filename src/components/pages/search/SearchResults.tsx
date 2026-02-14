import React from "react";
import { Product } from "@/types";
import ProductCard from "@/components/pages/products/ProductCard";
import { Loader2, Search } from "lucide-react";

interface SearchResultsProps {
  products: Product[];
  loading: boolean;
  query: string;
  t: any;
}

export function SearchResults({
  products,
  loading,
  query,
  t,
}: SearchResultsProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-12 h-12 text-cedra-500 animate-spin" />
        <p className="text-zinc-500 font-bold uppercase tracking-widest animate-pulse">
          {t.common.loading}
        </p>
      </div>
    );
  }

  if (products.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            category={product.category_id || "Uncategorized"}
            sku={product.sku}
            image={product.images?.[0]}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
        <Search className="w-10 h-10 text-zinc-600" />
      </div>
      <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-2">
        {t.common.noResults} &quot;{query}&quot;
      </h2>
      <p className="text-zinc-500 max-w-md">{t.catalog.trySearch}</p>
    </div>
  );
}
