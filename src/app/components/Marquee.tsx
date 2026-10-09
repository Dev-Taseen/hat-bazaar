import Link from 'next/link';
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
import { Product } from '../types/types';



const Marquee = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
    const datas: Product[] = await res.json();
    console.log(datas);
    return (
        <div
            className="bg-white flex items-center gap-2 px-3 py-2 rounded-lg  transition-colors"
        >
            <MarqueeText direction='right' duration={12} className='max-w-7xl mx-auto'>
                {
                    datas.map(n => (
                        <Link key={n.id} href={`/product/${n.id}`}>
                            <div  className="flex items-center gap-2 pb-1  hover:border-b mx-4">
                                <span className="text-xl">{n.image}</span>
                                <span className="text-green-900">
                                    {n.nameBn} {n.today} টাকা/{n.unit}{" "}
                                    <span className={n.change.dir === "up" ? "text-red-600" : "text-green-600"}>
                                        {n.change.dir === "up" ? "▲" : "▼"} {n.change.pct}%
                                    </span>
                                </span>
                            </div>
                        </Link>
                    ))
                }

            </MarqueeText>
        </div>
    );
};

export default Marquee;
