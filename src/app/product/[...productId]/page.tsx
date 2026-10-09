// app/product/[id]/page.tsx
import ProductDetailPage, { ProductDetailType } from "@/app/components/ProductDetailsPage";
import { Metadata } from "next";


async function getProduct(productId: string): Promise<ProductDetailType | null> {
    try {
        const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${productId}`,
            { cache: "no-store" }
        );
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

export async function generateMetadata({params,}:{params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${productId}`);
  if (!res.ok) return { title: "পণ্য পাওয়া যায়নি" };
  const p = await res.json();
  return {
    title: p.nameBn,
    description: `${p.nameBn}-এর আজকের দাম ${p.today} টাকা।`,
  };
}


export default async function Page({ params, }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;
    const product = await getProduct(productId);

    if (!product) {
        return <p className="p-10 text-center text-gray-600">totto pawa jaini</p>;
    }

    return <ProductDetailPage p={product} />;

}