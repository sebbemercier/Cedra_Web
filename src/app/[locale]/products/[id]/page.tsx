import { Metadata } from "next";
import ProductDetail from "@/components/pages/products/ProductDetail";
import { api } from "@/lib/api";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

// Configuration ISR : La page sera régénérée au maximum toutes les heures
export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  
  try {
    // Utilisation de tags pour permettre la revalidation à la demande via Valkey
    const products = await api.products.search(id);
    const product = products.find((p) => p.id === id) || products[0];

    if (!product) {
      return {
        title: "Product Not Found | CEDRA",
      };
    }

    const productName = typeof product.name === 'string' ? product.name : (product.name[locale] || product.name['en'] || Object.values(product.name)[0] || "Product");
    const title = `${productName} | CEDRA`;
    
    const rawDescription = typeof product.description === 'string' 
      ? product.description 
      : (product.description[locale] || product.description['en'] || Object.values(product.description)[0] || "");
      
    const description = rawDescription.substring(0, 160) + (rawDescription.length > 160 ? "..." : "");
    const images = product.images && product.images.length > 0 ? product.images : ["/og-image.jpg"];

    return {
      title: title,
      description: description,
      openGraph: {
        title: title,
        description: description,
        images: images.map(url => ({
          url,
          alt: productName,
        })),
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: images,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "CEDRA | High-Performance B2B E-Commerce",
    };
  }
}

export default async function Page({ params }: Props) {
  const { id, locale } = await params;
  
  let initialProduct = null;
  try {
    // On passe le tag 'products' qui sera intercepté par notre cache-handler.js
    const products = await api.products.search(id);
    initialProduct = products.find((p) => p.id === id) || products[0];
  } catch (error) {
    console.error("Error fetching product for page:", error);
  }

  return <ProductDetail initialProduct={initialProduct} />;
}