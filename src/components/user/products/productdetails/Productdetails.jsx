import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ShoppingCart,
  Zap,
  Minus,
  Plus,
  CheckCircle2,
  ScanBarcode,
  Search,
} from "lucide-react";

function ProductDetails() {

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-[#F4F7FB] px-2 sm:px-3 lg:px-5 py-3">

      {/* CONTAINER */}
      <div className="max-w-5xl mx-auto">

        {/* BACK BUTTON */}
        <button
  onClick={() => navigate(-1)}
  className="flex items-center gap-2 text-gray-600 hover:text-black transition-all text-[11px] sm:text-xs font-medium cursor-pointer"
>

          <ArrowLeft size={13} />

          Back to Products

        </button>

        {/* MAIN SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 mt-4">

          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div className="bg-white rounded-[18px] border border-gray-200 overflow-hidden">

            {/* IMAGE */}
            <div className="relative">

              <img
                src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop"
                alt="product"
                className="w-full h-[260px] sm:h-[360px] lg:h-[480px] object-cover"
              />

              {/* NEW */}
              <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-[#3164E3] text-white text-[8px] font-semibold">
                New
              </div>

              {/* DISCOUNT */}
              <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-[#EF4444] text-white text-[8px] font-semibold">
                57% OFF
              </div>

              {/* ZOOM */}
              <button className="absolute inset-0 m-auto w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center hover:scale-105 transition-all">

                <Search size={14} className="text-gray-700" />

              </button>

            </div>

          </div>

          {/* ================================================= */}
          {/* RIGHT SIDE */}
          {/* ================================================= */}

          <div className="flex flex-col">

            {/* TAGS */}
            <div className="flex flex-wrap items-center gap-2">

              <div className="px-2.5 py-1 rounded-full bg-[#F4F6FA] text-black text-[9px] font-semibold flex items-center gap-1">

                <ShoppingCart size={10} />

                Indoor Lighting

              </div>

              <span className="text-gray-500 text-[10px] sm:text-[11px]">
                ZUMIA
              </span>

              <div className="px-2.5 py-1 rounded-full bg-[#F59E0B] text-white text-[9px] font-semibold">
                B2B
              </div>

            </div>

            {/* TITLE */}
            <h1 className="mt-3 text-lg sm:text-xl lg:text-[26px] leading-tight font-bold text-black">

              Crystal Prism Cylinder Wall Sconce

            </h1>

            {/* DESCRIPTION */}
            <p className="mt-3 text-[11px] sm:text-xs text-gray-500 leading-relaxed">

              Ornate brass-finish sconce with faceted crystal grid delivers
              sparkling ambient light. Ideal for hotels, lounges and upscale
              residential interiors.

            </p>

            {/* PRICE CARD */}
            <div className="mt-4 bg-white border border-gray-200 rounded-[16px] p-3 sm:p-4">

              {/* PRICE */}
              <div className="flex flex-wrap items-center gap-2">

                <h2 className="text-[#3164E3] text-2xl sm:text-3xl font-bold">
                  ₹850
                </h2>

                <span className="text-gray-400 line-through text-xs sm:text-sm">
                  ₹2,000
                </span>

                <div className="px-2 py-1 rounded-full bg-[#FFF1F2] text-[#EF4444] text-[9px] font-semibold">
                  57% off
                </div>

              </div>

              {/* STOCK */}
              <div className="flex items-center gap-2 mt-3 text-[#16A34A]">

                <CheckCircle2 size={14} />

                <span className="text-[11px] sm:text-xs font-medium">
                  12 in stock
                </span>

              </div>

            </div>

            {/* SKU */}
            <div className="flex flex-wrap items-center gap-5 mt-4 text-[11px] sm:text-xs">

              <div className="flex items-center gap-2 text-gray-500">

                <ScanBarcode size={14} />

                SKU:
                <span className="font-semibold text-black">
                  7654567
                </span>

              </div>

              <div className="text-gray-500">

                Code:

                <span className="ml-1 font-semibold text-black">
                  1221212
                </span>

              </div>

            </div>

            {/* BADGE */}
            <div className="mt-4">

              <span className="px-2.5 py-1 rounded-full bg-[#3164E3] text-white text-[9px] font-semibold">
                New
              </span>

            </div>

            {/* QUANTITY */}
            <div className="mt-5">

              <h3 className="text-[11px] sm:text-xs font-bold text-black mb-2">
                Quantity
              </h3>

              {/* QTY BOX */}
              <div className="w-[125px] h-[38px] rounded-lg border border-gray-200 overflow-hidden flex items-center bg-white">

                {/* MINUS */}
                <button
                  onClick={() =>
                    setQuantity(quantity > 1 ? quantity - 1 : 1)
                  }
                  className="w-[38px] h-full flex items-center justify-center hover:bg-gray-100 transition-all cursor-pointer"
                >

                  <Minus size={12} />

                </button>

                {/* NUMBER */}
                <div className="flex-1 text-center text-sm font-bold">

                  {quantity}

                </div>

                {/* PLUS */}
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-[38px] h-full border-l border-gray-200 flex items-center justify-center text-[#3164E3] hover:bg-[#EEF3FF] transition-all cursor-pointer"
                >

                  <Plus size={12} />

                </button>

              </div>

            </div>

            {/* BUTTONS */}
            <div className="mt-auto pt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">

              {/* CART */}
              <button className="h-[42px] rounded-[14px] border border-gray-200 bg-white flex items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold hover:border-[#3164E3] hover:text-[#3164E3] transition-all cursor-pointer">

                <ShoppingCart size={14} />

                Add to Cart

              </button>

              {/* BUY */}
              <button
                onClick={() => navigate("/user/buying")}
                className="h-[42px] rounded-[14px] bg-[#3164E3] text-white flex items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold hover:bg-[#1E4FD8] transition-all cursor-pointer"
              >

                <Zap size={14} />

                Buy Now

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;