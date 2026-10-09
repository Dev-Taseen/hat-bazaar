import Image from "next/image";
import CategoryList from "./category";

const Navbar = () => {
    const fullDate = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });
    const shortDate = new Date().toLocaleDateString("bn-BD", { dateStyle: "medium" });

    return (
        <div className="flex flex-col">
            <div className="container mx-auto my-3 flex items-center justify-between gap-3 px-4 md:my-4">
                {/* Logo + title */}
                <div className="flex min-w-0 items-center gap-2 sm:gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-green-600 sm:h-12 sm:w-12 sm:rounded-2xl">
                        <span className="text-xl leading-none sm:text-3xl">🛒</span>
                    </div>
                    {/* <Image
                        src={"/logo-icon.png"}
                        alt="logo"
                        height={40}
                        width={45}
                        className="h-9 w-9 shrink-0 rounded-xl bg-green-600 p-1 sm:h-10 sm:w-[45px] sm:rounded-2xl"
                    /> */}
                    <div className="min-w-0">
                        <h2 className="truncate text-base font-semibold sm:text-[20px]">
                            বাজার দর
                        </h2>
                        {/* short date on mobile, full date from sm up */}
                        <p className="truncate text-xs text-gray-600 sm:hidden">{shortDate}</p>
                        <p className="hidden truncate text-sm text-gray-600 sm:block md:text-base">
                            {fullDate}
                        </p>
                    </div>
                </div>

                {/* Auth buttons */}
                <div className="flex shrink-0 gap-2 text-sm font-semibold sm:gap-2.5 sm:text-[16px]">
                    <button className="cursor-pointer whitespace-nowrap rounded border border-gray-400 px-2 py-1 sm:px-2.5 sm:py-1.5">
                        সাইন ইন
                    </button>
                    <button className="cursor-pointer whitespace-nowrap rounded border border-gray-500 bg-green-700 px-2 py-1 text-white sm:px-2.5 sm:py-1.5">
                        সাইন আপ
                    </button>
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                <CategoryList />
            </div>
        </div>
    );
};

export default Navbar;