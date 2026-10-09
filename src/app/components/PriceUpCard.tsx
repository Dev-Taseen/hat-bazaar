
import { Product } from "../types/types";
import ProductCard from "./ProductCard";


const PriceUpCard = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
    const products: Product[] = await res.json();
    const filteredProducts = products.filter((product) => product.change.dir === "up"
    ).sort((a, b) => b.change.pct - a.change.pct).slice(0, 6);;
    console.log(filteredProducts);
    return (
        <div className="m-3">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {filteredProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
};

export default PriceUpCard;