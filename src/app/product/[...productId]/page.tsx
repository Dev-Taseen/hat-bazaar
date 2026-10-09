// app/product/[id]/page.tsx
import ProductDetailPage, { ProductDetailType } from "@/app/components/ProductDetailsPage";


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

export default async function Page({ params, }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;
    const product = await getProduct(productId);

    if (!product) {
        return <p className="p-10 text-center text-gray-600">totto pawa jaini</p>;
    }

    return <ProductDetailPage p={product} />;

}