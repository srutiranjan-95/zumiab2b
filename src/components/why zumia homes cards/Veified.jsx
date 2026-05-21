import {
  ShieldCheck,
  BadgeCheck,
  CircleDollarSign,
  PackageCheck,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

function VerifiedB2BOnly() {
  const highlights = [
    "Manual verification of every business account",
    "No public retail access — B2B pricing stays protected",
    "Volume discount tiers based on order value",
    "Wholesale pricing on all product categories",
    "Priority access to new collections and limited stock",
  ];

  const features = [
    {
      title: "Trusted Community",
      desc: "Every account goes through a vetting process so you only deal with verified businesses and genuine procurement teams.",
      bg: "bg-violet-50",
    },
    {
      title: "Protected Wholesale Pricing",
      desc: "Our B2B-only access model ensures retail customers never see your supplier pricing, protecting your business margins.",
      bg: "bg-blue-50",
    },
    {
      title: "Volume Discount Tiers",
      desc: "The more you order, the more you save. Our tiered discount structure rewards loyal buyers with increasing savings.",
      bg: "bg-emerald-50",
    },
    {
      title: "Dedicated B2B Support",
      desc: "A dedicated account manager is assigned to every approved business for smooth ordering and after-sales assistance.",
      bg: "bg-rose-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6fb]">
      {/* Hero Section */}
      <div className="bg-[#eef0f8] border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-8">
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-lg">
              <ShieldCheck className="text-white" size={30} />
            </div>

            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-amber-500 font-semibold mb-2">
                Premium Features
              </p>

              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Verified B2B Only
              </h1>

              <p className="text-gray-600 max-w-2xl leading-relaxed">
                Exclusive access for approved businesses with volume discounts
                and wholesale pricing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
        {/* Overview */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 rounded-full bg-violet-600"></div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Overview
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
            <p className="text-gray-600 leading-8">
              Zumia Home is a strictly B2B platform designed exclusively for
              businesses — interior designers, contractors, hospitality
              companies, real estate developers, and procurement teams. Every
              member is manually verified to ensure a trusted, professional
              community.
            </p>
          </div>
        </section>

        {/* Key Highlights */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 rounded-full bg-violet-600"></div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Key Highlights
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-[#f6f4ff] border border-violet-100 rounded-2xl px-5 py-4"
              >
                <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
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
            <div className="w-1 h-6 rounded-full bg-violet-600"></div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Why It Matters
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.bg} border border-gray-200 rounded-3xl p-7 shadow-sm`}
              >
                <div className="w-11 h-11 rounded-full bg-violet-600 flex items-center justify-center mb-5">
                  {index === 0 && (
                    <ShieldCheck className="text-white" size={20} />
                  )}
                  {index === 1 && (
                    <CircleDollarSign className="text-white" size={20} />
                  )}
                  {index === 2 && (
                    <PackageCheck className="text-white" size={20} />
                  )}
                  {index === 3 && (
                    <Sparkles className="text-white" size={20} />
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-7">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="bg-[#eef0fb] border border-gray-200 rounded-[32px] px-6 py-14 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center mb-6 shadow-lg">
              <ShieldCheck className="text-white" size={28} />
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to experience this?
            </h3>

            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Register as a B2B customer and unlock wholesale pricing,
              exclusive collections, and dedicated support.
            </p>

            <button className="bg-violet-600 hover:bg-violet-700 transition text-white font-semibold px-8 py-4 rounded-full shadow-lg">
              Register as B2B Customer
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default VerifiedB2BOnly;