// src/components/admin/AdminDashboard.jsx

import {
  IndianRupee,
  ShoppingBag,
  Users,
  Boxes,
  Clock3,
  RefreshCw,
  Truck,
  CheckCircle2,
  XCircle,
  TrendingUp,
} from "lucide-react";

function AdminDashboard() {

  const cards = [
    {
      title: "Total Revenue",
      value: "₹3,24,527",
      sub: "Excluding cancelled",
      icon: <IndianRupee size={14} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Orders",
      value: "34",
      sub: "10 pending",
      icon: <ShoppingBag size={14} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Customers",
      value: "3",
      sub: "1 pending approval",
      icon: <Users size={14} />,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Products",
      value: "5",
      sub: "5 active",
      icon: <Boxes size={14} />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Pending Receipts",
      value: "2",
      sub: "Awaiting verification",
      icon: <Clock3 size={14} />,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const orderStats = [
    {
      title: "Pending",
      value: 10,
      icon: <Clock3 size={13} />,
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      color: "text-yellow-600",
    },
    {
      title: "Processing",
      value: 16,
      icon: <RefreshCw size={13} />,
      bg: "bg-blue-50",
      border: "border-blue-200",
      color: "text-blue-600",
    },
    {
      title: "Shipped",
      value: 3,
      icon: <Truck size={13} />,
      bg: "bg-purple-50",
      border: "border-purple-200",
      color: "text-purple-600",
    },
    {
      title: "Delivered",
      value: 1,
      icon: <CheckCircle2 size={13} />,
      bg: "bg-green-50",
      border: "border-green-200",
      color: "text-green-600",
    },
    {
      title: "Cancelled",
      value: 1,
      icon: <XCircle size={13} />,
      bg: "bg-red-50",
      border: "border-red-200",
      color: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] p-3">

      {/* TOP */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-[18px] font-bold">
            Business Overview
          </h1>

          <p className="text-[10px] text-gray-500 mt-1">
            Last updated 12:24 PM
          </p>
        </div>

        <button className="h-[30px] px-3 rounded-lg border border-gray-200 bg-white flex items-center gap-2 text-[11px] font-medium shadow-sm">
          <RefreshCw size={12} />
          Refresh
        </button>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 mt-4">

        {cards.map((card, i) => (

          <div
            key={i}
            className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm"
          >

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[9px] uppercase tracking-wide text-gray-500 font-semibold">
                  {card.title}
                </p>

                <h2 className="text-[22px] font-bold mt-2">
                  {card.value}
                </h2>

                <p className="text-[10px] text-gray-500 mt-1">
                  {card.sub}
                </p>

              </div>

              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${card.bg} ${card.color}`}
              >
                {card.icon}
              </div>

            </div>

          </div>

        ))}

      </div>

      {/* ORDER STATUS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 mt-3">

        {orderStats.map((item, i) => (

          <div
            key={i}
            className={`${item.bg} ${item.border} border rounded-2xl px-3 py-3`}
          >

            <div className="flex items-center gap-2">

              <div className={item.color}>
                {item.icon}
              </div>

              <div>

                <h3 className="text-[18px] font-bold leading-none">
                  {item.value}
                </h3>

                <p className="text-[10px] text-gray-600 mt-1">
                  {item.title}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-3">

        {/* REVENUE */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-3">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
              <TrendingUp
                size={13}
                className="text-blue-600"
              />

              <h2 className="text-[12px] font-bold">
                Revenue Trend
              </h2>
            </div>

            <div className="flex items-center gap-1">

              {["1M", "6M", "1Y", "2Y", "All"].map((item, i) => (

                <button
                  key={i}
                  className={`px-2 py-1 rounded-full text-[9px] font-medium ${
                    item === "6M"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          {/* FAKE GRAPH */}
          <div className="h-[210px] mt-3 rounded-xl border border-dashed border-gray-200 bg-gradient-to-t from-blue-50 to-white p-4 flex items-end">

            <div className="w-full h-[2px] bg-blue-500 relative rounded-full">

              <div className="absolute left-[20%] -top-[18px] w-[25%] h-[2px] bg-blue-500 rotate-[5deg]" />

              <div className="absolute left-[45%] -top-[48px] w-[25%] h-[2px] bg-blue-500 rotate-[10deg]" />

              <div className="absolute right-0 -top-1.5 w-3 h-3 bg-blue-500 rounded-full" />

            </div>

          </div>

        </div>

        {/* ORDER STATUS */}
        <div className="bg-white border border-gray-200 rounded-2xl p-3">

          <h2 className="text-[12px] font-bold">
            Order Status
          </h2>

          <div className="flex items-center justify-center h-[210px]">

            <div className="w-32 h-32 rounded-full border-[16px] border-orange-500 relative">

              <div className="absolute inset-0 border-[16px] border-transparent border-t-gray-400 rounded-full rotate-45"></div>

              <div className="absolute inset-0 border-[16px] border-transparent border-r-yellow-500 rounded-full rotate-12"></div>

              <div className="absolute inset-5 bg-white rounded-full"></div>

            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-3">

        {/* RECENT ORDERS */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-3">

          <h2 className="text-[12px] font-bold mb-3">
            Recent Orders
          </h2>

          <div className="space-y-2">

            {[1,2,3,4,5,6,7].map((item) => (

              <div
                key={item}
                className="flex items-center justify-between border border-gray-100 rounded-xl px-3 py-2"
              >

                <div>

                  <h3 className="text-[11px] font-semibold">
                    #2{item}
                  </h3>

                  <p className="text-[9px] text-gray-500 mt-1">
                    Store Pickup • Online
                  </p>

                </div>

                <div className="flex items-center gap-4">

                  <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">
                    Processing
                  </span>

                  <h4 className="text-[11px] font-semibold">
                    ₹12,000
                  </h4>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* TOP PRODUCTS */}
        <div className="bg-white border border-gray-200 rounded-2xl p-3">

          <h2 className="text-[12px] font-bold mb-4">
            Top Products
          </h2>

          <div className="space-y-4">

            {[
              "Crystal Prism Cylinder Wall Scones",
              "#112-600X600",
              "WWWW",
              "TV SIDE TABLE",
            ].map((item, i) => (

              <div key={i}>

                <div className="flex items-center justify-between">

                  <h3 className="text-[10px] font-medium">
                    {item}
                  </h3>

                  <span className="text-[9px] text-gray-500">
                    {50 - i * 10} units
                  </span>

                </div>

                <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">

                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${90 - i * 20}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;