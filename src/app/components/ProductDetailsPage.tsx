import Link from "next/link";

export type MarketType = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type ProductDetailType = {
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
  markets: MarketType[];
};

const bn = (n: number) =>
  n.toLocaleString("bn-BD", { maximumFractionDigits: 2 });

const unitLabel: Record<string, { per: string; short: string }> = {
  kg: { per: "প্রতি কেজি", short: "কেজি" },
  litre: { per: "প্রতি লিটার", short: "লিটার" },
  piece: { per: "প্রতি পিস", short: "পিস" },
  dozen: { per: "প্রতি ডজন", short: "ডজন" },
  hali: { per: "প্রতি হালি", short: "হালি" },
};

const dirStyle = {
  up: { text: "text-red-600", icon: "▲", word: "বেড়েছে" },
  down: { text: "text-green-600", icon: "▼", word: "কমেছে" },
  flat: { text: "text-gray-500", icon: "—", word: "অপরিবর্তিত আছে" },
} as const;

function StatCard({
  label,
  value,
  note,
  color,
}: {
  label: string;
  value: number;
  note: string;
  color: string;
}) {
  return (
    <div className="rounded-3xl border border-gray-200 px-8 py-6">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`mt-1 ${color}`}>
        <span className="text-3xl font-extrabold">{bn(value)}</span>{" "}
        <span className="text-lg">টাকা</span>
      </p>
      <p className="mt-1 text-sm text-gray-500">{note}</p>
    </div>
  );
}

export default function ProductDetailPage ({ p }: { p: ProductDetailType }) {
  const unit = unitLabel[p.unit] ?? { per: `প্রতি ${p.unit}`, short: p.unit };
  const d = dirStyle[p.change.dir];

  const markets = p.markets ?? [];
  const lowest = markets.length ? Math.min(...markets.map((m) => m.min)) : 0;
  const highest = markets.length ? Math.max(...markets.map((m) => m.max)) : 0;
  const avgs = markets.map((m) => (m.min + m.max) / 2);
  const average = avgs.length
    ? avgs.reduce((a, b) => a + b, 0) / avgs.length
    : 0;

  return (
    <main className="min-h-screen bg-[#f3f6f2] px-6 py-6 md:px-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-3 text-gray-900">
        <Link href="/">হোম</Link>
        <span className="text-gray-400">›</span>
        <Link href={`/category/${p.category}`}>{p.categoryNameBn}</Link>
        <span className="text-gray-400">›</span>
        <span>{p.nameBn}</span>
      </nav>

      {/* Hero */}
      <section className="mt-8 flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white/70 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gray-100 text-5xl">
            {p.image}
          </div>
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900">{p.nameBn}</h1>
            <p className="mt-1 text-gray-600">
              {unit.per} · {p.categoryNameBn}
            </p>
            <p className="mt-1 text-gray-600">
              গতকালের তুলনায় আজ দাম <b className="text-gray-900">{d.word}</b>{" "}
              {p.change.dir !== "flat" && `${bn(p.change.pct)}%`}
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-gray-100 px-10 py-5 text-center text-gray-700">
          <p>আজকের দাম</p>
          <p className="text-5xl font-extrabold text-gray-900">{bn(p.today)}</p>
          <p>টাকা / {unit.short}</p>
          <p className={`mt-1 ${d.text}`}>
            {d.icon} {bn(p.change.pct)}%
          </p>
        </div>
      </section>

      {/* Summary + table */}
      <section className="mt-6 rounded-3xl border border-gray-200 bg-white/70 p-6">
        <h2 className="text-2xl font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <StatCard
            label="সর্বনিম্ন দাম"
            value={lowest}
            note="সবচেয়ে কম দামের বাজার"
            color="text-green-700"
          />
          <StatCard
            label="সর্বাধিক দাম"
            value={highest}
            note="সবচেয়ে বেশি দামের বাজার"
            color="text-red-600"
          />
          <StatCard
            label="গড় দাম"
            value={Math.round(average)}
            note={`${unit.per}-এর হিসাবে`}
            color="text-green-700"
          />
        </div>

        <h2 className="mt-10 text-2xl font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="mt-5 overflow-x-auto rounded-3xl border border-gray-200">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="px-5 py-4 font-semibold">বাজার</th>
                <th className="px-5 py-4 font-semibold">বিভাগ</th>
                <th className="px-5 py-4 text-right font-semibold">সর্বনিম্ন</th>
                <th className="px-5 py-4 text-right font-semibold">সর্বাধিক</th>
                <th className="px-5 py-4 text-right font-semibold">গড়</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m, i) => (
                <tr
                  key={`${m.market}-${i}`}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-5 py-4 text-gray-900">{m.market}</td>
                  <td className="px-5 py-4 text-gray-500">{m.division}</td>
                  <td className="px-5 py-4 text-right">{bn(m.min)} টাকা</td>
                  <td className="px-5 py-4 text-right">{bn(m.max)} টাকা</td>
                  <td className="px-5 py-4 text-right font-bold text-gray-900">
                    {bn((m.min + m.max) / 2)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}