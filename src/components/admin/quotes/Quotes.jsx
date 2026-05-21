// src/components/admin/quotes/Quotes.jsx

import {
  Search,
  Download,
  Building2,
  Mail,
  Phone,
  Package,
  MessageSquare,
} from "lucide-react";

function Quotes() {

  const quotes = [
    {
      id: 8,
      company: "Doe Enterprises",
      email: "customer@gmail.com",
      phone: "+1 (555) 987-6543",
      product:
        "Crystal Prism Cylinder Wall Sconce",
      qty: 1,
    },
    {
      id: 9,
      company: "Doe Enterprises",
      email: "customer@gmail.com",
      phone: "+1 (555) 987-6543",
      product:
        "Crystal Prism Cylinder Wall Sconce",
      qty: 1,
    },
    {
      id: 10,
      company: "Doe Enterprises",
      email: "customer@gmail.com",
      phone: "+1 (555) 987-6543",
      product:
        "Crystal Prism Cylinder Wall Sconce",
      qty: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA]">

      {/* TOP */}
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between mb-4">

        {/* SEARCH */}
        <div className="flex-1 relative">

          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by customer, company, product..."
            className="w-full h-[38px] pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-[12px] outline-none"
          />

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">

          <div className="h-[38px] px-4 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-[11px] font-semibold shadow-sm">

            3 total

          </div>

          <button className="h-[38px] px-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center gap-2 text-[11px] font-medium hover:bg-gray-50 transition-all duration-300">

            <Download size={12} />

            Export

          </button>

        </div>

      </div>

      {/* LIST */}
      <div className="space-y-4">

        {quotes.map((quote, index) => (

          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-4"
          >

            <div className="flex flex-col lg:flex-row gap-4 lg:justify-between">

              {/* LEFT */}
              <div className="flex-1 min-w-0">

                {/* TOP */}
                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="text-[22px] font-bold text-black">

                    Quote #{quote.id}

                  </h2>

                  <span className="h-[22px] px-2 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-600 text-[10px] font-medium flex items-center">

                    Quote Requested

                  </span>

                </div>

                {/* DATE */}
                <p className="text-[11px] text-gray-500 mt-2">

                  Date unknown

                </p>

                {/* COMPANY */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">

                  <div className="flex items-center gap-1 text-[12px] text-gray-700">

                    <Building2 size={11} />

                    {quote.company}

                  </div>

                  <div className="flex items-center gap-1 text-[12px] text-gray-700">

                    <Mail size={11} />

                    {quote.email}

                  </div>

                  <div className="flex items-center gap-1 text-[12px] text-gray-700">

                    <Phone size={11} />

                    {quote.phone}

                  </div>

                </div>

                {/* REQUEST BOX */}
                <div className="mt-4 bg-[#F6F7F9] rounded-xl p-4">

                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">

                    Quote Request

                  </p>

                  <div className="mt-2">

                    <p className="text-[12px] text-gray-700">

                      Product: {quote.product}

                    </p>

                    <p className="text-[12px] text-gray-700 mt-1">

                      Qty: {quote.qty}

                    </p>

                  </div>

                </div>

              </div>

              {/* RIGHT */}
              <div className="flex lg:flex-col gap-2 lg:w-[120px]">

                {/* EXPORT */}
                <button className="flex-1 lg:flex-none h-[36px] px-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-center gap-2 text-[11px] font-medium hover:bg-gray-50 transition-all duration-300">

                  <Download size={11} />

                  Export

                </button>

                {/* PRODUCTS */}
                <button className="flex-1 lg:flex-none h-[36px] px-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-center gap-2 text-[11px] font-medium hover:bg-gray-50 transition-all duration-300">

                  <Package size={11} />

                  Products

                </button>

                {/* RESPOND */}
                <button className="flex-1 lg:flex-none h-[36px] px-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-center gap-2 text-[11px] font-medium hover:bg-gray-50 transition-all duration-300">

                  <MessageSquare size={11} />

                  Respond

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Quotes;