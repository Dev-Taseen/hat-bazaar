// components/ProductCard.tsx
"use client";

import Link from "next/link";
import { Product } from "../types/types";


// ---- Helpers ----
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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { nameBn, image, today, unit, change } = product;

  const isUp = change.dir === "up";
  const unitBn = unitLabelsBn[unit] || unit;

  return (
    <Link
      href={`/product/${product.id}`}
      className="block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5"
    >
      {/* Top row: icon + name */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl shrink-0">
          {image}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-base sm:text-lg text-gray-900 leading-tight truncate">
            {nameBn}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            প্রতি {unitBn}
          </p>
        </div>
      </div>

      {/* Bottom row: label + price + change badge */}
      <div className="flex items-end justify-between mt-4 sm:mt-5">
        <div>
          <p className="text-sm text-gray-500 mb-1">আজকের দাম</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 leading-none">
            {toBnDigits(today)}{" "}
            <span className="text-base sm:text-lg font-medium text-gray-700">
              টাকা
            </span>
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-semibold ${
            isUp
              ? "bg-red-50 text-red-600"
              : "bg-green-50 text-green-600"
          }`}
        >
          <span className="text-xs">{isUp ? "▲" : "▼"}</span>
          {formatBn(change.pct)}%
        </span>
      </div>
    </Link>
  );
}