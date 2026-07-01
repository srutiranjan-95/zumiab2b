import {
  ArrowLeft,
  Headphones,
  BadgeCheck,
  UserCheck,
  Sofa,
  RefreshCcw,
  MessageCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Expert() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSignupClick = () => {
    navigate("/login/signup");
  };

  const highlights = [
    "Dedicated account manager for every B2B account",
    "In-house interior consultants available",
    "Product recommendation support for projects",
    "After-sales support and issue resolution",
    "WhatsApp and phone support for urgent queries",
  ];

  const features = [
    {
      title: "Dedicated Account Manager",
      desc: "Your personal point of contact who knows your preferences, manages your orders, and handles escalations end-to-end.",
      bg: "bg-violet-50",
      icon: UserCheck,
    },
    {
      title: "Interior Consulting",
      desc: "Our in-house consultants help you select the right products for your project — from style coordination to material specifications.",
      bg: "bg-blue-50",
      icon: Sofa,
    },
    {
      title: "Proactive Order Updates",
      desc: "No need to chase status — your account manager keeps you informed at every stage from confirmation to delivery.",
      bg: "bg-emerald-50",
      icon: RefreshCcw,
    },
    {
      title: "After-Sales Support",
      desc: "Warranty claims, replacements, and issue resolution are handled swiftly by our support team without lengthy back-and-forth.",
      bg: "bg-rose-50",
      icon: MessageCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6fb]">
      {/* HERO */}
      <div className="bg-[#fbf0f5] border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-8 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#ef3b7d] flex items-center justify-center shadow-lg">
              <Headphones className="text-white" size={28} />
            </div>

            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-amber-500 font-semibold mb-2">
                Premium Features
              </p>

              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Expert Support
              </h1>

              <p className="text-gray-600 max-w-2xl leading-relaxed">
                Dedicated account managers and interior consultants at your
                service.
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
            <div className="w-1 h-6 rounded-full bg-[#ef3b7d]"></div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Overview
            </h2>
          </div>

          <div className="bg-[#fff2f7] border border-[#ffd7e5] rounded-3xl p-8 shadow-sm">
            <p className="text-gray-600 leading-8">
              Every Zumia Homes B2B member gets access to a dedicated account
              manager who understands your business needs. Beyond order
              management, our team includes experienced interior consultants who
              can advise on product selection, styles, and space planning.
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 rounded-full bg-[#ef3b7d]"></div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Key Highlights
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-[#fff2f7] border border-[#ffd7e5] rounded-2xl px-5 py-4"
              >
                <div className="w-9 h-9 rounded-full bg-[#ef3b7d] flex items-center justify-center shrink-0">
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
            <div className="w-1 h-6 rounded-full bg-[#ef3b7d]"></div>

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
                  <div className="w-11 h-11 rounded-full bg-[#ef3b7d] flex items-center justify-center mb-5">
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
          <div className="bg-[#fff2f7] border border-[#ffd7e5] rounded-[32px] px-6 py-14 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#ef3b7d] flex items-center justify-center mb-6 shadow-lg">
              <Headphones className="text-white" size={28} />
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to experience this?
            </h3>

            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Register as a B2B customer and unlock all features today.
            </p>

            <button
              onClick={handleSignupClick}
              className="bg-[#ef3b7d] hover:bg-[#dc276b] transition text-white font-semibold px-8 py-4 rounded-full shadow-lg cursor-pointer"
            >
              Register as B2B Customer
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Expert;