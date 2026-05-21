import {
  ArrowLeft,
  BadgeCheck,
  ShieldCheck,
  FileCheck,
  SearchCheck,
  Award,
} from "lucide-react";

function Quality() {
  const highlights = [
    "ISI, BIS, and international quality certifications",
    "Full manufacturer warranty on all products",
    "Pre-shipment quality inspection for bulk orders",
    "No grey-market or counterfeit products",
    "Dedicated quality escalation team",
  ];

  const features = [
    {
      title: "Certified Standards",
      desc: "Products carry ISI, BIS, CE, or equivalent certifications depending on category — documentation available on request.",
      bg: "bg-violet-50",
      icon: BadgeCheck,
    },
    {
      title: "Manufacturer Warranty",
      desc: "Every product comes with a full manufacturer warranty. Claims are coordinated by our after-sales team on your behalf.",
      bg: "bg-blue-50",
      icon: ShieldCheck,
    },
    {
      title: "Pre-Shipment Inspection",
      desc: "For bulk orders, our QC team performs pre-shipment inspections to verify quantity, condition, and specifications before dispatch.",
      bg: "bg-emerald-50",
      icon: SearchCheck,
    },
    {
      title: "Authentic Products Only",
      desc: "We work exclusively with authorized distributors and brand-direct channels. No grey imports, no unauthorized third-party sellers.",
      bg: "bg-rose-50",
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6fb]">
      {/* HERO */}
      <div className="bg-[#faf5e8] border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-8">
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#e59b00] flex items-center justify-center shadow-lg">
              <Award className="text-white" size={28} />
            </div>

            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-amber-500 font-semibold mb-2">
                Premium Features
              </p>

              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Certified Quality
              </h1>

              <p className="text-gray-600 max-w-2xl leading-relaxed">
                All products meet international standards with full
                manufacturer warranties.
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
            <div className="w-1 h-6 rounded-full bg-[#e59b00]"></div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Overview
            </h2>
          </div>

          <div className="bg-[#fff9ed] border border-[#ffe3ad] rounded-3xl p-8 shadow-sm">
            <p className="text-gray-600 leading-8">
              Quality is non-negotiable at Zumia Homes. Every product in our
              catalog has passed a rigorous quality check and is backed by
              official manufacturer warranties. We only partner with brands and
              suppliers who meet international quality and safety standards.
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 rounded-full bg-[#e59b00]"></div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Key Highlights
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-[#fff9ed] border border-[#ffe3ad] rounded-2xl px-5 py-4"
              >
                <div className="w-9 h-9 rounded-full bg-[#e59b00] flex items-center justify-center shrink-0">
                  <FileCheck className="text-white" size={18} />
                </div>

                <p className="text-gray-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why It Matters */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 rounded-full bg-[#e59b00]"></div>

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
                  <div className="w-11 h-11 rounded-full bg-[#e59b00] flex items-center justify-center mb-5">
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
          <div className="bg-[#fff9ed] border border-[#ffe3ad] rounded-[32px] px-6 py-14 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#e59b00] flex items-center justify-center mb-6 shadow-lg">
              <Award className="text-white" size={28} />
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to experience this?
            </h3>

            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Register as a B2B customer and unlock all features today.
            </p>

            <button className="bg-[#e59b00] hover:bg-[#cb8900] transition text-white font-semibold px-8 py-4 rounded-full shadow-lg">
              Register as B2B Customer
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Quality;