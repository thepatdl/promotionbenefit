"use client";

import { useEffect, useMemo, useState } from "react";

type BenefitItem = {
  id: string;
  category: string;
  cardName: string;
  bank: string;
  bankLogoUrl?: string;
  brand: string;
  location: string;
  benefit: string;
  pricing: "free" | "paid";
  promoUrl: string;
  isActive: boolean;
};

type BenefitsResponse = {
  updatedAt: string;
  items: BenefitItem[];
};

const defaultData: BenefitsResponse = {
  updatedAt: "",
  items: [],
};

function SortButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        active
          ? "border-black bg-black text-white"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

export default function CreditCardBenefitsUI() {
  const [data, setData] = useState<BenefitsResponse>(defaultData);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [locationFilter, setLocationFilter] = useState("all");
  const [pricingFilter, setPricingFilter] = useState("all");
  const [sortBy, setSortBy] = useState<
    "cardName" | "brand" | "location" | "pricing"
  >("cardName");

  useEffect(() => {
    async function loadBenefits() {
      try {
        const res = await fetch("/api/benefits", { cache: "no-store" });
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch benefits:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBenefits();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(data.items.map((item) => item.category)));
    return ["All", ...unique];
  }, [data.items]);

  const locations = useMemo(() => {
    const unique = Array.from(new Set(data.items.map((item) => item.location)));
    return ["all", ...unique];
  }, [data.items]);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();

    const filtered = data.items.filter((item) => {
      const matchCategory = category === "All" || item.category === category;
      const matchLocation =
        locationFilter === "all" || item.location === locationFilter;
      const matchPricing =
        pricingFilter === "all" || item.pricing === pricingFilter;

      const matchSearch =
        q.length === 0 ||
        item.cardName.toLowerCase().includes(q) ||
        item.bank.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.benefit.toLowerCase().includes(q);

      return matchCategory && matchLocation && matchPricing && matchSearch;
    });

    return filtered.sort((a, b) => {
      const left = String(a[sortBy]).toLowerCase();
      const right = String(b[sortBy]).toLowerCase();
      return left.localeCompare(right);
    });
  }, [data.items, search, category, locationFilter, pricingFilter, sortBy]);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="mb-2 inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600">
            Promotion Benefit Directory
          </div>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            สิทธิประโยชน์บัตรเครดิต
          </h1>
          <p className="mt-2 text-gray-600">
            ค้นหาและเปรียบเทียบสิทธิพิเศษจากธนาคารต่าง ๆ แยกตามหมวดหมู่
            พร้อมลิงก์ไปหน้าโปรจริง
          </p>
          <p className="mt-2 text-sm text-gray-500">
            อัปเดตล่าสุด:{" "}
            {data.updatedAt
              ? new Date(data.updatedAt).toLocaleString("th-TH")
              : "-"}
          </p>
        </div>

        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                ค้นหา
              </label>
              <input
                type="text"
                placeholder="ค้นหาชื่อบัตร, ธนาคาร, แบรนด์, สถานที่"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Location
              </label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "all" ? "ทั้งหมด" : loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                ฟรี / เสียเงิน
              </label>
              <select
                value={pricingFilter}
                onChange={(e) =>
                  setPricingFilter(e.target.value as "all" | "free" | "paid")
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              >
                <option value="all">ทั้งหมด</option>
                <option value="free">ฟรี</option>
                <option value="paid">เสียเงิน</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | "cardName"
                      | "brand"
                      | "location"
                      | "pricing"
                  )
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              >
                <option value="cardName">บัตรเครดิต</option>
                <option value="brand">ชื่อแบรนด์</option>
                <option value="location">Location</option>
                <option value="pricing">ฟรี / เสียเงิน</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((item) => (
              <SortButton
                key={item}
                label={item}
                active={category === item}
                onClick={() => setCategory(item)}
              />
            ))}
          </div>
        </section>

        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            ทั้งหมด {filteredItems.length} รายการ
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            กำลังโหลดข้อมูล...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            ไม่พบข้อมูลที่ตรงเงื่อนไข
          </div>
        ) : (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white">
                    {item.bankLogoUrl ? (
                      <img
                        src={item.bankLogoUrl}
                        alt={item.bank}
                        className="h-10 w-10 object-contain"
                      />
                    ) : (
                      <span className="text-xs font-bold text-gray-500">
                        {item.bank.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="mb-2 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {item.category}
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {item.cardName}
                    </h2>
                    <p className="text-sm text-gray-500">{item.bank}</p>
                  </div>
                </div>

                <div className="mb-4 rounded-xl bg-gray-50 p-4">
                  <div className="text-sm font-semibold text-gray-900">
                    {item.brand}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {item.benefit}
                  </p>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-gray-200 p-3">
                    <div className="text-xs text-gray-500">Location</div>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                      {item.location}
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-3">
                    <div className="text-xs text-gray-500">Cost Type</div>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                      {item.pricing === "free" ? "ฟรี" : "เสียเงิน"}
                    </div>
                  </div>
                </div>

                <a
                  href={item.promoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  ดูโปรจริง
                </a>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
