"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type ProductType = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
};

const bn = (n: number | string) =>
  Number(n).toLocaleString("bn-BD", { maximumFractionDigits: 1 });

const unitLabel: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  piece: "প্রতি পিস",
  dozen: "প্রতি ডজন",
  hali: "প্রতি হালি",
};

type SortKey = "default" | "low" | "high" | "change";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "default", label: "ডিফল্ট" },
  { key: "low", label: "দাম: কম থেকে বেশি" },
  { key: "high", label: "দাম: বেশি থেকে কম" },
  { key: "change", label: "সবচেয়ে বেশি পরিবর্তন" },
];

function ChangeBadge({ dir, pct }: { dir: "up" | "down" | "flat"; pct: number }) {
  const styles = {
    up: "bg-red-50 text-red-600",
    down: "bg-green-50 text-green-600",
    flat: "bg-gray-100 text-gray-600",
  }[dir];
  const icon = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium ${styles}`}
    >
      {icon} {bn(pct)}%
    </span>
  );
}

function ProductCard({ p }: { p: ProductType }) {
  return (
    <Link href={`/product/${p.id}`} className="rounded-3xl border border-gray-200 bg-white/70 p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-gray-100 text-3xl">
          {p.image}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{p.nameBn}</h3>
          <p className="text-gray-500">{unitLabel[p.unit] ?? `প্রতি ${p.unit}`}</p>
        </div>
      </div>

      <p className="mt-6 text-gray-500">আজকের দাম</p>
      <div className="mt-1 flex items-center justify-between">
        <p className="text-gray-900">
          <span className="text-3xl font-extrabold">{bn(p.today)}</span>{" "}
          <span className="text-lg">টাকা</span>
        </p>
        <ChangeBadge dir={p.change.dir} pct={p.change.pct} />
      </div>
    </Link>
  );
}

export default function CategoryProducts({ products }: { products: ProductType[] }) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "low") list.sort((a, b) => a.today - b.today);
    if (sort === "high") list.sort((a, b) => b.today - a.today);
    if (sort === "change") list.sort((a, b) => b.change.pct - a.change.pct);
    return list;
  }, [products, sort]);

  const first = products[0];

  return (
    <main className="min-h-screen bg-[#f3f6f2] p-6 md:p-10">
      {/* Header */}
      <section className="flex items-center gap-5 rounded-3xl border border-gray-200 bg-white/70 p-8">
        <div className="text-5xl">{first?.categoryIcon}</div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {first?.categoryNameBn}
          </h1>
          <p className="text-gray-500">
            {bn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-gray-600">
          মোট {bn(sorted.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <label className="flex items-center gap-3 text-gray-600">
          সাজান
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-gray-900 outline-none"
          >
            {sortOptions.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Grid */}
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </main>
  );
}