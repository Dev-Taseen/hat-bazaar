
import { Product } from "../types/types";
import ProductCard from "./ProductCard";


const AllProducts = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
    const products: Product[] = await res.json();
    return (
        <div className="my-3">
            <p className="my-4 text-gray-400">মোট {products.length}টি পণ্য দেখানো হচ্ছে</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {
                    products.map((p, i) => (
                        <ProductCard key={i} product={p} />
                    ))
                }
            </div>
        </div>
    );
};

export default AllProducts;