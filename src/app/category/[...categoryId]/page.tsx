import CategoryProducts from "@/app/components/CategoryProducts";


const toBnDigits = (input: string | number) => {
  const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(input).replace(/[0-9]/g, (d) => bn[Number(d)]);
};

const formatBn = (num: number, decimals = 1) =>
  toBnDigits(Number(num).toFixed(decimals));

const unitLabelsBn: Record<string, string> = {
  kg: "কেজি",
  gm: "গ্রাম",
  g: "গ্রাম",
  l: "লিটার",
  ml: "মিলি",
  pcs: "পিস",
  pc: "পিস",
  dozen: "ডজন",
};

type Props = {
    params: Promise<{
        categoryId: string;
    }>;
};
const CategoryPage = async ({ params }: Props) => {
    const { categoryId } = await params;
    const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`);
    const products = await res.json();
    return (
        <div className="block rounded border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5">
           <CategoryProducts products={products} />;
        </div>
    );
};

export default CategoryPage;