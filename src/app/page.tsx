import Image from "next/image";
import PriceUpCard from "./components/PriceUpCard";
import PriceDownCard from "./components/PriceDownCard";
import AllProducts from "./components/AllProducts";

export default function Home() {
  const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

  return (
    <div className="py-4 md:py-5">
      {/* Hero */}
      <div className="container mx-auto px-4">
        <header className="flex flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white px-4 py-6 sm:px-5 md:py-10 lg:flex-row lg:justify-between lg:gap-10">
          <div className="w-full lg:w-1/2">
            <p className="mb-2 w-fit rounded-2xl bg-blue-50 px-3 py-2 text-sm text-green-500 sm:text-base">
              {date}
            </p>
            <h2 className="my-4 text-3xl font-semibold sm:text-4xl md:my-5 md:text-5xl lg:pr-10 xl:pr-20">
              আজকের বাজারের দাম এক নজরে
            </h2>
            <p className="text-base font-semibold text-gray-700 sm:text-lg md:text-[20px]">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
              সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <button className="my-5 rounded-[10px] bg-green-500 px-4 py-2 text-lg font-semibold text-white sm:text-[20px]">
              সব পণ্য দেখুন
            </button>
          </div>

          <Image
            src={"/bazar-hero.png"}
            alt="hero image"
            width={800}
            height={800}
            loading="eager"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full max-w-[420px] object-contain sm:max-w-[500px] lg:w-1/2 lg:max-w-none"
          />
        </header>
      </div>

      {/* Price up */}
      <section className="container mx-auto my-8 px-4 md:my-10">
        <h2 className="mb-3 text-xl font-semibold sm:text-2xl">
          <span className="mr-1 text-red-600">▲</span>
          আজ দাম বেড়েছে
        </h2>
        <PriceUpCard />
      </section>

      {/* Price down */}
      <section className="container mx-auto my-8 px-4 md:my-10">
        <h2 className="mb-3 text-xl font-semibold sm:text-2xl">
          <span className="mr-1 text-green-600">▼</span>
          আজ দাম কমেছে
        </h2>
        <PriceDownCard />
      </section>

      {/* All products */}
      <section className="container mx-auto my-8 px-4 md:my-10">
        <h2 className="mb-3 text-xl font-semibold sm:text-2xl">সব পণ্য</h2>
        <AllProducts />
      </section>
    </div>
  );
}