// import React from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Truck,
  Circle,
  MapPin,
  ChevronRight,
} from "lucide-react";

export default function MyOrdersPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] px-4 py-5">
      {/* Header */}
      <div className="max-w-5xl mx-auto flex items-center gap-3 mb-5">
        <button className="flex items-center gap-1 text-sm font-medium text-black hover:opacity-80 transition">
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-black">
          My Orders
        </h1>
      </div>

      {/* Order Card */}
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
          {/* Left */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-black mb-1">
              Order #34
            </h2>

            <p className="text-sm text-gray-500 mb-2">
              May 8, 2026 • 11:46 AM
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <MapPin size={14} className="text-pink-500" />
              Store Pickup
            </div>

            <p className="text-sm text-gray-500 mb-7">
              3 items
            </p>

            {/* Tracking */}
            <div className="flex items-center w-full max-w-xl">
              {/* Step 1 */}
              <div className="flex flex-col items-center min-w-[70px]">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <CheckCircle2 size={16} />
                </div>

                <span className="text-[12px] mt-2 font-medium text-blue-600 text-center">
                  Order Placed
                </span>
              </div>

              <div className="flex-1 h-[3px] bg-blue-600 rounded-full mb-5 mx-2" />

              {/* Step 2 */}
              <div className="flex flex-col items-center min-w-[70px]">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <CheckCircle2 size={16} />
                </div>

                <span className="text-[12px] mt-2 font-medium text-blue-600 text-center">
                  Processing
                </span>
              </div>

              <div className="flex-1 h-[3px] bg-blue-600 rounded-full mb-5 mx-2" />

              {/* Step 3 */}
              <div className="flex flex-col items-center min-w-[70px]">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center border-4 border-blue-200">
                  <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <Truck size={15} />
                  </div>
                </div>

                <span className="text-[12px] mt-2 font-semibold text-blue-600 text-center">
                  Shipped
                </span>
              </div>

              <div className="flex-1 h-[3px] bg-gray-200 rounded-full mb-5 mx-2" />

              {/* Step 4 */}
              <div className="flex flex-col items-center min-w-[70px]">
                <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-300">
                  <Circle size={14} />
                </div>

                <span className="text-[12px] mt-2 font-medium text-gray-300 text-center">
                  Delivered
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-start lg:items-end">
            <h3 className="text-3xl font-bold text-black mb-3">
              ₹2,05,290.00
            </h3>

            <span className="px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-semibold border border-sky-200">
              Shipped
            </span>

            <button className="mt-5 flex items-center gap-1 text-sm text-gray-600 hover:text-black transition">
              View details
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}