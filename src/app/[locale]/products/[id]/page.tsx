import { Metadata } from "next";
import ProductContent from "./ProductContent";
import { api } from "@/lib/api";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const products = await api.products.search(id);
    const product = products.find((p) => p.id === id) || products[0];

    if (!product) {
      return {
        title: "Product Not Found | CEDRA",
      };
    }

    const title = `${product.name} | CEDRA`;
    const description = product.description.substring(0, 160) + (product.description.length > 160 ? "..." : "");
    const images = product.images && product.images.length > 0 ? product.images : ["/og-image.jpg"];

    return {
      title: title,
      description: description,
      openGraph: {
        title: title,
        description: description,
        images: images.map(url => ({
          url,
          alt: product.name,
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
  const { id } = await params;
  
  let initialProduct = null;
  try {
    const products = await api.products.search(id);
    initialProduct = products.find((p) => p.id === id) || products[0];
  } catch (error) {
    console.error("Error fetching product for page:", error);
  }

  return <ProductContent initialProduct={initialProduct} />;
}
