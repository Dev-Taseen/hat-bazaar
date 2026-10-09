import Link from "next/link";

import { IoIosHome } from "react-icons/io";
export interface categoryType {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}


const CategoryList = async () => {
  let categories: categoryType[] = [];
  let errorMsg = "";

  try {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    categories = await res.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    errorMsg = "totto pawa jaii";
  }

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 container mx-auto my-2 px-2">
      <Link

        href={`/`}
        className="flex gap-2 items-center group px-3 py-1.5 rounded-[10px] cursor-pointer bg-green-50 text-green-800 hover:bg-green-600 hover:text-white hover:shadow-md transition-all duration-200"
      >
        <span className="text-green-600 group-hover:text-white"><IoIosHome/></span>{" "}
        <span>Home</span>
      </Link>

      {categories.map((n) => (
        <Link
          key={n.id}
          href={`/category/${n.slug}`}
          className="group px-3 py-1.5 rounded-[10px] cursor-pointer bg-green-50 text-green-800 hover:bg-green-600 hover:text-white hover:shadow-md transition-all duration-200"
        >
          <span className="text-green-600 group-hover:text-white">{n.icon}</span>{" "}
          <span>{n.nameBn}</span>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;