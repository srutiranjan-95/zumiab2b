import {
  ArrowLeft,
  Truck,
  BadgeCheck,
  Clock3,
  MapPinned,
  PackageCheck,
} from "lucide-react";

function Delivery() {
  const highlights = [
    "City-wide coverage with same-day slots available",
    "Express delivery for urgent project requirements",
    "Multi-location delivery in a single order",
    "Real-time shipment tracking",
    "Dedicated logistics team for large or fragile items",
  ];

  const features = [
    {
      title: "On-Time Delivery",
      desc: "Our logistics partners are held to strict SLAs — deliveries arrive within the committed window, every time.",
      bg: "bg-violet-50",
      icon: Clock3,
    },
    {
      title: "Express Options",
      desc: "Need something urgently? Our express delivery slots get your order to the site within hours of dispatch.",
      bg: "bg-blue-50",
      icon: Truck,
    },
    {
      title: "Multi-Site Deliveries",
      desc: "Place one order and split delivery across multiple project sites — perfect for developers managing multiple properties.",
      bg: "bg-emerald-50",
      icon: MapPinned,
    },
    {
      title: "White-Glove Handling",
      desc: "Fragile and high-value items are handled by our trained team with protective packaging and careful installation support.",
      bg: "bg-rose-50",
      icon: PackageCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6fb]">
      {/* HERO */}
      <div className="bg-[#eef3fb] border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-8">
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#1d7df2] flex items-center justify-center shadow-lg">
              <Truck className="text-white" size={28} />
            </div>

            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-amber-500 font-semibold mb-2">
                Premium Features
              </p>

              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                City-Wide Delivery
              </h1>

              <p className="text-gray-600 max-w-2xl leading-relaxed">
                Fast reliable shipping across the city with express delivery
                available.
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
            <div className="w-1 h-6 rounded-full bg-[#1d7df2]"></div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Overview
            </h2>
          </div>

          <div className="bg-[#eef5ff] border border-[#d7e6ff] rounded-3xl p-8 shadow-sm">
            <p className="text-gray-600 leading-8">
              Our logistics network covers the entire city with scheduled,
              reliable deliveries designed for business timelines. Whether you
              need items for a single project site or multiple locations, Zumia
              Homes ensures on-time delivery with real-time tracking.
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 rounded-full bg-[#1d7df2]"></div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Key Highlights
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-[#eef5ff] border border-[#d7e6ff] rounded-2xl px-5 py-4"
              >
                <div className="w-9 h-9 rounded-full bg-[#1d7df2] flex items-center justify-center shrink-0">
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
            <div className="w-1 h-6 rounded-full bg-[#1d7df2]"></div>

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
                  <div className="w-11 h-11 rounded-full bg-[#1d7df2] flex items-center justify-center mb-5">
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
          <div className="bg-[#eef5ff] border border-[#d7e6ff] rounded-[32px] px-6 py-14 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#1d7df2] flex items-center justify-center mb-6 shadow-lg">
              <Truck className="text-white" size={28} />
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to experience this?
            </h3>

            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Register as a B2B customer and unlock all features today.
            </p>

            <button className="bg-[#1d7df2] hover:bg-[#1367cd] transition text-white font-semibold px-8 py-4 rounded-full shadow-lg">
              Register as B2B Customer
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Delivery;