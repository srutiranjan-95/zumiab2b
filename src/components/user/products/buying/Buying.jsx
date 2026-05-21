import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  X,
  Zap,
  Truck,
  Minus,
  Plus,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

function BuyNow() {

  const navigate = useNavigate();

  /* PRICE */
  const productPrice = 1234;

  /* QUANTITY */
  const [quantity, setQuantity] = useState(12);

  /* DELIVERY */
  const [deliveryType, setDeliveryType] = useState("normal");

  /* DELIVERY CHARGE */
  const deliveryCharge =
    deliveryType === "urgent" ? 499 : 149;

  /* SUBTOTAL */
  const subtotal = productPrice * quantity;

  /* GST */
  const gst = Math.floor(subtotal * 0.18);

  /* TOTAL */
  const total = subtotal + gst + deliveryCharge;

  /* FORMAT */
  const formatPrice = (price) => {
    return price.toLocaleString("en-IN");
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center p-2 sm:p-3">

      {/* MODAL */}
      <div className="w-full max-w-[760px] bg-white rounded-[18px] shadow-lg p-3 sm:p-4 lg:p-5">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-3">

          <div>

            {/* TITLE */}
            <h1 className="text-sm sm:text-base font-bold text-black">
              Buy Now
            </h1>

            {/* STEPS */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">

              {/* STEP 1 */}
              <div className="flex items-center gap-1.5">

                <div className="w-5 h-5 rounded-full bg-[#3164E3] text-white text-[8px] font-semibold flex items-center justify-center">
                  1
                </div>

                <span className="text-[#3164E3] font-semibold text-[9px] sm:text-[10px]">
                  Qty
                </span>

              </div>

              <div className="w-5 sm:w-7 h-[1px] bg-gray-300" />

              {/* STEP 2 */}
              <div className="flex items-center gap-1.5">

                <div className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-[8px] font-semibold flex items-center justify-center">
                  2
                </div>

                <span className="text-gray-500 font-medium text-[9px] sm:text-[10px]">
                  Address
                </span>

              </div>

              <div className="w-5 sm:w-7 h-[1px] bg-gray-300" />

              {/* STEP 3 */}
              <div className="flex items-center gap-1.5">

                <div className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-[8px] font-semibold flex items-center justify-center">
                  3
                </div>

                <span className="text-gray-500 font-medium text-[9px] sm:text-[10px]">
                  Payment
                </span>

              </div>

            </div>

          </div>

          {/* CLOSE */}
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-black transition-all cursor-pointer"
          >

            <X size={16} />

          </button>

        </div>

        {/* PRODUCT CARD */}
        <div className="mt-4 bg-[#F8FAFD] rounded-[14px] p-3 flex items-center gap-3">

          {/* IMAGE */}
          <div className="w-[52px] h-[52px] rounded-xl overflow-hidden bg-white flex-shrink-0">

            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop"
              alt="product"
              className="w-full h-full object-cover"
            />

          </div>

          {/* PRODUCT INFO */}
          <div>

            <h2 className="text-xs sm:text-sm font-bold text-black leading-tight">
              8112-600X800
            </h2>

            <p className="text-gray-500 text-[9px] sm:text-[10px]">
              Indoor Lighting
            </p>

            <h3 className="text-[#3164E3] text-sm sm:text-lg font-bold mt-1">
              ₹{formatPrice(productPrice)}
            </h3>

          </div>

        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">

          {/* LEFT */}
          <div>

            {/* QUANTITY */}
            <div>

              <h3 className="text-xs sm:text-sm font-bold text-black">
                Quantity
              </h3>

              {/* QTY BOX */}
              <div className="mt-3 w-[135px] sm:w-[150px] h-[40px] rounded-xl border border-gray-200 overflow-hidden flex items-center">

                {/* MINUS */}
                <button
                  onClick={() =>
                    setQuantity(quantity > 1 ? quantity - 1 : 1)
                  }
                  className="w-[40px] h-full flex items-center justify-center hover:bg-gray-100 transition-all cursor-pointer"
                >

                  <Minus size={13} />

                </button>

                {/* NUMBER */}
                <div className="flex-1 text-center text-sm sm:text-base font-bold">

                  {quantity}

                </div>

                {/* PLUS */}
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-[40px] h-full border-l border-gray-200 flex items-center justify-center text-[#3164E3] hover:bg-[#EEF3FF] transition-all cursor-pointer"
                >

                  <Plus size={13} />

                </button>

              </div>

            </div>

            {/* DELIVERY */}
            <div className="mt-5">

              <h3 className="text-xs sm:text-sm font-bold text-black">
                Delivery Type
              </h3>

              {/* OPTIONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">

                {/* URGENT */}
                <button
                  onClick={() => setDeliveryType("urgent")}
                  className={`h-[64px] rounded-[14px] px-3 flex items-center justify-between transition-all cursor-pointer border-2 ${
                    deliveryType === "urgent"
                      ? "border-[#F59E0B] bg-[#FFF9F0]"
                      : "border-gray-200 bg-white hover:border-[#F59E0B]"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        deliveryType === "urgent"
                          ? "bg-[#F59E0B] text-white"
                          : "bg-[#FFF4E5] text-[#F59E0B]"
                      }`}
                    >

                      <Zap size={13} />

                    </div>

                    <div className="text-left">

                      <h4
                        className={`font-bold text-[11px] sm:text-xs ${
                          deliveryType === "urgent"
                            ? "text-[#F59E0B]"
                            : "text-black"
                        }`}
                      >
                        Urgent
                      </h4>

                      <p className="text-gray-500 text-[9px]">
                        ₹499 Delivery
                      </p>

                    </div>

                  </div>

                  {deliveryType === "urgent" && (
                    <CheckCircle2
                      size={14}
                      className="text-[#F59E0B]"
                    />
                  )}

                </button>

                {/* NORMAL */}
                <button
                  onClick={() => setDeliveryType("normal")}
                  className={`h-[64px] rounded-[14px] px-3 flex items-center justify-between transition-all cursor-pointer border-2 ${
                    deliveryType === "normal"
                      ? "border-[#3164E3] bg-[#F5F8FF]"
                      : "border-gray-200 bg-white hover:border-[#3164E3]"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        deliveryType === "normal"
                          ? "bg-[#3164E3] text-white"
                          : "bg-[#EEF3FF] text-[#3164E3]"
                      }`}
                    >

                      <Truck size={13} />

                    </div>

                    <div className="text-left">

                      <h4
                        className={`font-bold text-[11px] sm:text-xs ${
                          deliveryType === "normal"
                            ? "text-[#3164E3]"
                            : "text-black"
                        }`}
                      >
                        Normal
                      </h4>

                      <p className="text-gray-500 text-[9px]">
                        ₹149 Delivery
                      </p>

                    </div>

                  </div>

                  {deliveryType === "normal" && (
                    <CheckCircle2
                      size={14}
                      className="text-[#3164E3]"
                    />
                  )}

                </button>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div>

            {/* PRICE CARD */}
            <div className="bg-[#F8FAFD] rounded-[16px] p-4">

              {/* ROW */}
              <div className="flex items-center justify-between">

                <span className="text-[11px] text-gray-500">
                  Product Price
                </span>

                <span className="text-[11px] font-semibold">
                  ₹{formatPrice(productPrice)}
                </span>

              </div>

              {/* ROW */}
              <div className="flex items-center justify-between mt-3">

                <span className="text-[11px] text-gray-500">
                  Quantity
                </span>

                <span className="text-[11px] font-semibold">
                  x{quantity}
                </span>

              </div>

              {/* ROW */}
              <div className="flex items-center justify-between mt-3">

                <span className="text-[11px] text-gray-500">
                  Subtotal
                </span>

                <span className="text-[11px] font-semibold">
                  ₹{formatPrice(subtotal)}
                </span>

              </div>

              {/* ROW */}
              <div className="flex items-center justify-between mt-3">

                <span className="text-[11px] text-gray-500">
                  GST (18%)
                </span>

                <span className="text-[11px] font-semibold">
                  ₹{formatPrice(gst)}
                </span>

              </div>

              {/* ROW */}
              <div className="flex items-center justify-between mt-3">

                <span className="text-[11px] text-gray-500">
                  Delivery Charge
                </span>

                <span className="text-[11px] font-semibold">
                  ₹{formatPrice(deliveryCharge)}
                </span>

              </div>

              {/* LINE */}
              <div className="w-full h-[1px] bg-gray-200 my-4" />

              {/* TOTAL */}
              <div className="flex items-center justify-between">

                <h3 className="text-sm sm:text-base font-bold text-gray-700">
                  Total
                </h3>

                <h2 className="text-lg sm:text-xl font-bold text-[#3164E3]">
                  ₹{formatPrice(total)}
                </h2>

              </div>

            </div>

            {/* CONTINUE BUTTON */}
            <button
              onClick={() => navigate("/user/address")}
              className="mt-4 h-[44px] w-full rounded-[14px] bg-[#3164E3] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#1E4FD8] transition-all cursor-pointer"
            >

              Continue

              <ChevronRight size={16} />

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BuyNow;