import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Suspense } from "react";
import Marquee from "./components/Marquee";
import Footer from "./components/Footer";


const NotoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin","bengali"],
});


export const metadata: Metadata = {
  title: {
    default: "বাজার দর",
    template: "%s | বাজার দর",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${NotoSerifBengali.className}  h-full antialiased`}
    >
      <body>
        <Suspense fallback={<div>Loading…</div>}>
        <Navbar/>
        </Suspense>
        <Suspense fallback={<div>Loading…</div>}>
          <Marquee></Marquee>
        </Suspense>
        <main className="bg-gray-100 flex-1">
        {children}
        </main>

        <Footer/>
        </body>
    </html>
  );
}
