// src/components/admin/orders/Orders.jsx

import { useState } from "react";

import {
  Search,
  Download,
  MapPin,
  Receipt,
  Building2,
  ArrowUpDown,
} from "lucide-react";

function Orders() {
  const [activeStatus, setActiveStatus] =
    useState("");

  const stats = [
    {
      title: "Receipts",
      value: "",
      color:
        "border-blue-200 bg-blue-50 text-blue-600",
      activeBorder: "border-blue-600",
      activeRing: "ring-blue-200",
    },
    {
      title: "Pending",
      value: "10",
      color:
        "border-yellow-200 bg-yellow-50 text-yellow-600",
      activeBorder: "border-yellow-500",
      activeRing: "ring-yellow-200",
    },
    {
      title: "Processing",
      value: "16",
      color:
        "border-sky-200 bg-sky-50 text-sky-600",
      activeBorder: "border-sky-600",
      activeRing: "ring-sky-200",
    },
    {
      title: "Shipped",
      value: "3",
      color:
        "border-purple-200 bg-purple-50 text-purple-600",
      activeBorder: "border-purple-600",
      activeRing: "ring-purple-200",
    },
    {
      title: "Delivered",
      value: "1",
      color:
        "border-green-200 bg-green-50 text-green-600",
      activeBorder: "border-green-600",
      activeRing: "ring-green-200",
    },
    {
      title: "Cancelled",
      value: "1",
      color:
        "border-red-200 bg-red-50 text-red-600",
      activeBorder: "border-red-600",
      activeRing: "ring-red-200",
    },
  ];

  const orders = [
    {
      id: 34,
      status: "Shipped",
      amount: "₹2,05,290.00",
      date: "May 8, 2026 • 11:46 AM",
      customer: "Doe Enterprises • Jane Doe",
      address: "Store Pickup",
    },
    {
      id: 33,
      status: "Pending",
      amount: "₹8,500.00",
      date: "Apr 29, 2026 • 4:19 PM",
      customer: "Doe Enterprises • Jane Doe",
      address:
        "bada sandado sandado agarpada bhadrak, k, Bhadrak, Odisha,...",
      transaction: "Transaction ID: 9",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* TOP STATS */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {stats.map((item, i) => (
          <button
            key={i}
            onClick={() =>
              setActiveStatus(item.title)
            }
            className={`h-[48px] rounded-2xl border flex flex-col items-center justify-center transition-all duration-300 cursor-pointer
              ${item.color}
              ${
                activeStatus === item.title
                  ? `${item.activeBorder} ${item.activeRing} ring-2 scale-[1.02] shadow-sm`
                  : "hover:scale-[1.02]"
              }
            `}
          >
            {item.value && (
              <h2 className="text-[18px] font-bold leading-none">
                {item.value}
              </h2>
            )}

            <p className="text-[11px] font-medium">
              {item.title}
            </p>
          </button>
        ))}
      </div>

      {/* FILTERS */}
      <div className="flex flex-col lg:flex-row gap-3 mt-4">
        {/* SEARCH */}
        <div className="flex-1 relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by order #, customer, address..."
            className="w-full h-[40px] pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-[12px] outline-none"
          />
        </div>

        {/* STATUS */}
        <select className="h-[40px] px-4 rounded-xl border border-gray-200 bg-white text-[12px] outline-none cursor-pointer">
          <option>All statuses</option>

          <option>Pending</option>

          <option>Processing</option>

          <option>Shipped</option>

          <option>Delivered</option>

          <option>Cancelled</option>
        </select>

        {/* SORT */}
        <button className="h-[40px] px-4 rounded-xl border border-gray-200 bg-white flex items-center gap-2 text-[12px]">
          <ArrowUpDown size={13} />

          Newest first
        </button>
      </div>

      {/* COUNT */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-[11px] text-gray-500">
          34 of 34 orders
        </p>

        <button className="h-[34px] px-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center gap-2 text-[11px] font-medium hover:bg-gray-50 transition-all duration-300">
          <Download size={12} />

          Export
        </button>
      </div>

      {/* ORDER LIST */}
      <div className="space-y-4 mt-4">
        {orders.map((order, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-2xl p-4"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* LEFT */}
              <div className="flex-1 min-w-0">
                {/* TOP */}
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[24px] font-bold text-black">
                    Order #{order.id}
                  </h2>

                  <span
                    className={`h-[22px] px-2 rounded-full text-[10px] font-medium flex items-center ${
                      order.status === "Shipped"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>

                  {order.status === "Pending" && (
                    <span className="h-[22px] px-2 rounded-full text-[10px] bg-gray-100 text-gray-500 flex items-center">
                      Normal
                    </span>
                  )}
                </div>

                {/* DATE */}
                <p className="text-[11px] text-gray-500 mt-2">
                  {order.date}
                </p>

                {/* CUSTOMER */}
                <div className="flex items-center gap-2 mt-2 text-[12px] text-gray-700">
                  <Building2 size={12} />

                  {order.customer}
                </div>

                {/* ADDRESS */}
                <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-500">
                  <MapPin size={11} />

                  {order.address}
                </div>

                {/* TRANSACTION */}
                {order.transaction && (
                  <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-500">
                    <Receipt size={11} />

                    {order.transaction}
                  </div>
                )}
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-end gap-3">
                {/* PRICE */}
                <h2 className="text-[30px] font-bold text-[#3164E3]">
                  {order.amount}
                </h2>

                {/* ACTIONS */}
                <div className="flex items-center gap-2">
                  <button className="h-[34px] px-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center gap-2 text-[11px] font-medium hover:bg-gray-50 transition-all duration-300">
                    <Download size={11} />

                    Export
                  </button>

                  <select className="h-[34px] px-3 rounded-xl border border-gray-200 bg-white text-[11px] outline-none cursor-pointer">
                    <option>
                      {order.status}
                    </option>

                    <option>
                      Pending
                    </option>

                    <option>
                      Processing
                    </option>

                    <option>
                      Shipped
                    </option>

                    <option>
                      Delivered
                    </option>

                    <option>
                      Cancelled
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;