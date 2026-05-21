import {
  ArrowLeft,
  IndianRupee,
  BadgeCheck,
  Percent,
  Boxes,
  Tag,
} from "lucide-react";

function Wholesale() {
  const highlights = [
    "Direct manufacturer pricing — no middlemen",
    "Rates up to 40% below retail MRP",
    "Bulk order discounts starting from 10 units",
    "Seasonal promotions exclusive to B2B members",
    "Price-match guarantee on identical products",
  ];

  const features = [
    {
      title: "Direct-from-Source Pricing",
      desc: "By cutting out distributors and middlemen, we pass on the full cost savings directly to your business.",
      bg: "bg-violet-50",
      icon: BadgeCheck,
    },
    {
      title: "Up to 40% Below MRP",
      desc: "Our B2B rates are significantly lower than retail prices, allowing you to maximize your project margins.",
      bg: "bg-blue-50",
      icon: Percent,
    },
    {
      title: "Bulk Discounts",
      desc: "Special pricing kicks in as you scale your orders — the larger your purchase, the better your rate per unit.",
      bg: "bg-emerald-50",
      icon: Boxes,
    },
    {
      title: "Transparent Pricing",
      desc: "No hidden charges, no surprise fees. What you see in your quote is what you pay — GST applicable as stated.",
      bg: "bg-rose-50",
      icon: Tag,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6fb]">
      {/* HERO */}
      <div className="bg-[#edf7f3] border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-8">
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#13b38b] flex items-center justify-center shadow-lg">
              <IndianRupee className="text-white" size={28} />
            </div>

            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-amber-500 font-semibold mb-2">
                Premium Features
              </p>

              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Best Wholesale Rates
              </h1>

              <p className="text-gray-600 max-w-2xl leading-relaxed">
                Competitive B2B pricing below retail. Special rates for bulk
                orders.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
        {/* Overview */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 rounded-full bg-[#13b38b]"></div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Overview
            </h2>
          </div>

          <div className="bg-[#eefaf5] border border-[#d6efe5] rounded-3xl p-8 shadow-sm">
            <p className="text-gray-600 leading-8">
              Zumia Homes works directly with manufacturers and authorized
              distributors to bring you the most competitive B2B rates in the
              market. Our pricing model is built around volume, loyalty, and
              long-term business relationships.
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 rounded-full bg-[#13b38b]"></div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Key Highlights
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-[#eefaf5] border border-[#d6efe5] rounded-2xl px-5 py-4"
              >
                <div className="w-9 h-9 rounded-full bg-[#13b38b] flex items-center justify-center shrink-0">
                  <BadgeCheck className="text-white" size={18} />
                </div>

                <p className="text-gray-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why It Matters */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 rounded-full bg-[#13b38b]"></div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Why It Matters
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className={`${feature.bg} border border-gray-200 rounded-3xl p-7 shadow-sm`}
                >
                  <div className="w-11 h-11 rounded-full bg-[#13b38b] flex items-center justify-center mb-5">
                    <Icon className="text-white" size={20} />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-7">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="bg-[#eefaf5] border border-[#d6efe5] rounded-[32px] px-6 py-14 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#13b38b] flex items-center justify-center mb-6 shadow-lg">
              <IndianRupee className="text-white" size={28} />
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to experience this?
            </h3>

            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Register as a B2B customer and unlock all features today.
            </p>

            <button className="bg-[#13b38b] hover:bg-[#0fa178] transition text-white font-semibold px-8 py-4 rounded-full shadow-lg">
              Register as B2B Customer
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Wholesale;