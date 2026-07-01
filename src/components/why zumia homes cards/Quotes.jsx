import {
  ArrowLeft,
  Clock3,
  BadgeCheck,
  FileText,
  PackageSearch,
  ClipboardCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Quotes() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSignupClick = () => {
    navigate("/login/signup");
  };

  const highlights = [
    "Quote requests processed within 2–4 business hours",
    "Custom product sourcing available",
    "Bulk quote tool for large project BOQs",
    "PDF quote export for internal approvals",
    "Quote history saved for repeat orders",
  ];

  const features = [
    {
      title: "Rapid Response",
      desc: "Our sourcing team responds to every quote request within 2–4 hours during business days — no waiting days for a callback.",
      bg: "bg-violet-50",
      icon: Clock3,
    },
    {
      title: "Custom Sourcing",
      desc: "Can't find what you need in our catalog? We'll source it. Our team works with 100+ supplier partners to fulfill custom requirements.",
      bg: "bg-blue-50",
      icon: PackageSearch,
    },
    {
      title: "BOQ Support",
      desc: "Upload your full Bill of Quantities and we'll prepare a comprehensive quote covering every line item with our best B2B pricing.",
      bg: "bg-emerald-50",
      icon: ClipboardCheck,
    },
    {
      title: "Approval-Ready PDFs",
      desc: "Every quote is generated as a professional PDF with pricing, GST breakdown, and delivery terms — ready to share with your clients.",
      bg: "bg-rose-50",
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6fb]">
      {/* HERO */}
      <div className="bg-[#f8f3e8] border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-8 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#ff8a00] flex items-center justify-center shadow-lg">
              <Clock3 className="text-white" size={28} />
            </div>

            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-amber-500 font-semibold mb-2">
                Premium Feature
              </p>

              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Quick Quotes
              </h1>

              <p className="text-gray-600 max-w-2xl leading-relaxed">
                Get instant pricing on custom or out-of-stock items. Fast
                response guaranteed.
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
            <div className="w-1 h-6 rounded-full bg-[#ff8a00]"></div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Overview
            </h2>
          </div>

          <div className="bg-[#fff8ee] border border-[#ffe3ba] rounded-3xl p-8 shadow-sm">
            <p className="text-gray-600 leading-8">
              Need a price on something you cannot find in our catalog? Submit
              a quote request in seconds and get a detailed response from our
              team within hours. Our quote system is built for the fast-paced
              demands of B2B procurement.
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 rounded-full bg-[#ff8a00]"></div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Key Highlights
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-[#fff8ee] border border-[#ffe3ba] rounded-2xl px-5 py-4"
              >
                <div className="w-9 h-9 rounded-full bg-[#ff8a00] flex items-center justify-center shrink-0">
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
            <div className="w-1 h-6 rounded-full bg-[#ff8a00]"></div>

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
                  <div className="w-11 h-11 rounded-full bg-[#ff8a00] flex items-center justify-center mb-5">
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
          <div className="bg-[#fff8ee] border border-[#ffe3ba] rounded-[32px] px-6 py-14 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#ff8a00] flex items-center justify-center mb-6 shadow-lg">
              <Clock3 className="text-white" size={28} />
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to experience this?
            </h3>

            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Register as a B2B customer and unlock all features today.
            </p>

            <button
              onClick={handleSignupClick}
              className="bg-[#ff8a00] hover:bg-[#eb7d00] transition text-white font-semibold px-8 py-4 rounded-full shadow-lg cursor-pointer"
            >
              Register as B2B Customer
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Quotes;