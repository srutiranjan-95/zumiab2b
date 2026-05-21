/* eslint-disable no-unused-vars */
import {
  ArrowLeft,
  X,
  MapPin,
  ChevronRight,
  QrCode,
  Wallet,
  Upload,
  Clock3,
  ImagePlus,
  CheckCircle2,
  PackageCheck,
  AlertTriangle,
  Home,
} from "lucide-react";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function PaymentCheckout() {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [step, setStep] = useState("payment");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const [uploadedImage, setUploadedImage] = useState(null);

  const [loadingPayment, setLoadingPayment] = useState(false);

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const [showWarning, setShowWarning] = useState(false);

  const [showTransactionWarning, setShowTransactionWarning] =
    useState(false);

  const orderData = {
    customer: "Srutiranjan Nayak",
    phone: "0637277177",
    address:
      "Bada Sandado Sandado Agarpada Bhadrak, Odisha, 756115",
    amount: "₹14,808.00",
    product: "8112-600X800",
    qty: 12,
  };

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setUploadedImage(imageUrl);

      setShowWarning(false);
    }
  };

  // PAYMENT CONFIRM
  const handleConfirmPayment = () => {
    // UPI VALIDATION
    if (step === "upi") {
      // SCREENSHOT CHECK
      if (!uploadedImage) {
        setShowWarning(true);

        setTimeout(() => {
          setShowWarning(false);
        }, 3000);

        return;
      }

      // TRANSACTION ID CHECK
      if (!transactionId.trim()) {
        setShowTransactionWarning(true);

        setTimeout(() => {
          setShowTransactionWarning(false);
        }, 3000);

        return;
      }
    }

    setLoadingPayment(true);

    setTimeout(() => {
      setLoadingPayment(false);

      setOrderConfirmed(true);
    }, 3500);
  };

  // ORDER SUCCESS SCREEN
  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-[560px] text-center">
          <div className="w-28 h-28 rounded-full bg-[#EEF8F1] flex items-center justify-center mx-auto mb-8">
            <CheckCircle2
              size={58}
              className="text-[#16A34A]"
            />
          </div>

          <h1 className="text-[28px] sm:text-[38px] font-bold text-[#111827]">
            Order Confirmed
          </h1>

          <p className="text-[14px] sm:text-[16px] text-gray-500 mt-4 leading-relaxed max-w-[500px] mx-auto">
            Your payment has been successfully submitted.
            Your B2B order is now confirmed and processing.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            {/* HOME BUTTON */}
            <button
              onClick={() => navigate("/user")}
              className="h-[44px] px-6 rounded-[16px] border border-[#DCE5F2] bg-white text-[#111827] text-[14px] font-semibold inline-flex items-center justify-center gap-2 hover:bg-[#F5F7FB] transition-all duration-300 w-full sm:w-auto cursor-pointer"
            >
              <Home size={14} />

              Home
            </button>

            {/* ORDERS BUTTON */}
            <button
              onClick={() => navigate("/orders")}
              className="h-[44px] px-6 rounded-[16px] bg-[#2F66E3] text-white text-[14px    ] font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 w-full sm:w-auto cursor-pointer"
            >
              <PackageCheck size={14} />

              Go to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEF3FA] flex items-center justify-center px-3 py-10">
      {/* LOADING SCREEN */}
      {loadingPayment && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-[4px] border-[#D9E4FF] border-t-[#2F66E3] rounded-full animate-spin mx-auto mb-5" />

            <h2 className="text-[22px] font-bold text-[#111827]">
              Confirming Payment
            </h2>

            <p className="text-[14px] text-gray-500 mt-2">
              Please wait while we verify your order...
            </p>
          </div>
        </div>
      )}

      {/* SCREENSHOT WARNING */}
      {showWarning && (
        <div className="fixed top-5 right-5 z-50 bg-white border border-red-200 shadow-lg rounded-[14px] px-4 py-3 flex items-start gap-3 animate-in slide-in-from-top duration-300">
          <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <AlertTriangle
              size={18}
              className="text-red-500"
            />
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-[#111827]">
              Upload Required
            </h3>

            <p className="text-[12px] text-gray-500 mt-1">
              Upload the payment screenshot to proceed.
            </p>
          </div>
        </div>
      )}

      {/* TRANSACTION WARNING */}
      {showTransactionWarning && (
        <div className="fixed top-24 right-5 z-50 bg-white border border-red-200 shadow-lg rounded-[14px] px-4 py-3 flex items-start gap-3 animate-in slide-in-from-top duration-300">
          <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <AlertTriangle
              size={18}
              className="text-red-500"
            />
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-[#111827]">
              Transaction ID Required
            </h3>

            <p className="text-[12px] text-gray-500 mt-1">
              Enter the UPI transaction ID to proceed.
            </p>
          </div>
        </div>
      )}

      {/* MAIN MODAL */}
      <div className="w-full max-w-[980px] bg-white rounded-[22px] border border-[#E6ECF5] shadow-[0_10px_40px_rgba(15,23,42,0.06)] overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-[#EEF2F7]">
          <div className="flex items-center gap-3">
            {/* BACK */}
            <button
              onClick={() => {
                if (step === "upi" || step === "cod") {
                  setStep("payment");
                  setPaymentMethod("");
                } else {
                  navigate(-1);
                }
              }}
              className="w-9 h-9 rounded-full bg-[#F5F7FB] flex items-center justify-center hover:bg-[#E9EEF8] transition-all duration-300"
            >
              <ArrowLeft size={17} className="text-gray-700" />
            </button>

            <div>
              <h1 className="text-[16px] sm:text-[18px] font-bold text-[#111827] leading-none">
                Payment Checkout
              </h1>

              <p className="text-[11px] text-gray-500 mt-1">
                Secure B2B payment workflow
              </p>
            </div>
          </div>

          {/* CLOSE */}
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-[#F5F7FB] flex items-center justify-center hover:bg-[#E9EEF8] transition-all duration-300"
          >
            <X size={17} className="text-gray-700" />
          </button>
        </div>

        {/* STEPS */}
        <div className="px-4 sm:px-5 pt-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-6 h-6 rounded-full bg-[#2F66E3] text-white text-[10px] font-semibold flex items-center justify-center">
                1
              </div>

              <span className="text-[11px] font-semibold text-[#2F66E3]">
                Quantity
              </span>
            </div>

            <div className="w-8 h-[2px] bg-[#2F66E3]" />

            <div className="flex items-center gap-2 shrink-0">
              <div className="w-6 h-6 rounded-full bg-[#2F66E3] text-white text-[10px] font-semibold flex items-center justify-center">
                2
              </div>

              <span className="text-[11px] font-semibold text-[#2F66E3]">
                Address
              </span>
            </div>

            <div className="w-8 h-[2px] bg-[#2F66E3]" />

            <div className="flex items-center gap-2 shrink-0">
              <div className="w-6 h-6 rounded-full bg-[#2F66E3] text-white text-[10px] font-semibold flex items-center justify-center">
                3
              </div>

              <span className="text-[11px] font-semibold text-[#2F66E3]">
                Payment
              </span>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-4 sm:p-5">
          {/* PAYMENT MENU */}
          {step === "payment" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* LEFT */}
              <div className="lg:col-span-8">
                {/* ADDRESS */}
                <div className="bg-[#F5F7FB] rounded-[16px] p-3 flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-[#2F66E3]" />
                  </div>

                  <div>
                    <h2 className="text-[15px] sm:text-[17px] font-bold text-[#111827] leading-snug">
                      {orderData.customer}

                      <span className="text-gray-500 font-medium">
                        {" "}
                        · {orderData.phone}
                      </span>
                    </h2>

                    <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">
                      {orderData.address}
                    </p>
                  </div>
                </div>

                {/* AMOUNT */}
                <div className="bg-[#F5F7FB] rounded-[16px] p-4 flex items-center justify-between mb-4">
                  <span className="text-[14px] font-semibold text-gray-500">
                    Amount to Pay
                  </span>

                  <span className="text-[22px] sm:text-[28px] font-bold text-[#2F66E3]">
                    {orderData.amount}
                  </span>
                </div>

                {/* PAYMENT OPTIONS */}
                <div className="space-y-3">
                  {/* UPI */}
                  <button
                    onClick={() => {
                      setPaymentMethod("upi");
                      setStep("upi");
                    }}
                    className="w-full bg-white border border-[#DCE5F2] rounded-[16px] p-3 flex items-center justify-between hover:border-[#2F66E3] transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-[12px] bg-[#EEF4FF] flex items-center justify-center">
                        <QrCode size={20} className="text-[#2F66E3]" />
                      </div>

                      <div className="text-left">
                        <h3 className="text-[15px] sm:text-[17px] font-bold text-[#111827] ">
                          UPI / QR Payment
                        </h3>
                    
                        <p className="text-[11px] sm:text-[12px] text-gray-500 mt-1">
                          Scan & pay instantly using any UPI app
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={20}
                      className="text-gray-400"
                    />
                  </button>

                  {/* COD */}
                  <button
                    onClick={() => {
                      setPaymentMethod("cod");
                      setStep("cod");
                    }}
                    className="w-full bg-white border border-[#DCE5F2] rounded-[16px] p-3 flex items-center justify-between hover:border-[#2F66E3] transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-[12px] bg-[#E6F8EA] flex items-center justify-center">
                        <Wallet size={20} className="text-[#1EA84A]" />
                      </div>

                      <div className="text-left">
                        <h3 className="text-[15px] sm:text-[17px] font-bold text-[#111827]">
                          Cash on Delivery
                        </h3>

                        <p className="text-[11px] sm:text-[12px] text-gray-500 mt-1">
                          Pay with cash when your order is delivered
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={20}
                      className="text-gray-400"
                    />
                  </button>
                </div>
              </div>

              {/* SUMMARY */}
              <div className="lg:col-span-4">
                <div className="bg-[#071330] rounded-[18px] p-4 text-white h-full">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[17px] font-bold">
                      Order Summary
                    </h3>

                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                      <Clock3 size={16} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-white/60 text-[10px] mb-1">
                        Product
                      </p>

                      <h4 className="text-[14px] font-semibold">
                        {orderData.product}
                      </h4>
                    </div>

                    <div>
                      <p className="text-white/60 text-[10px] mb-1">
                        Quantity
                      </p>

                      <h4 className="text-[14px] font-semibold">
                        {orderData.qty} Units
                      </h4>

                    </div>

                    <div>
                      <p className="text-white/60 text-[10px] mb-1">
                        Delivery
                      </p>

                      <h4 className="text-[14px] font-semibold">
                        Express B2B Shipping
                      </h4>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <p className="text-white/60 text-[10px] mb-2">
                        Total Payable
                      </p>

                      <h2 className="text-[24px] sm:text-[30px] font-bold">
                        {orderData.amount}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* UPI SCREEN */}
          {step === "upi" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* QR */}
              <div className="lg:col-span-4">
                <div className="bg-white border border-[#DCE5F2] rounded-[16px] p-3">
                  <h2 className="text-[16px] font-bold text-[#111827] mb-3">
                    Scan to Pay
                  </h2>

                  <div className="bg-[#F5F7FB] rounded-[14px] p-3">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=ZUMIA-B2B-PAYMENT"
                      alt="QR"
                      className="w-full max-w-[220px] mx-auto rounded-[10px]"
                    />
                  </div>
                </div>
              </div>

              {/* PAYMENT */}
              <div className="lg:col-span-5">
                <div className="bg-[#F5F7FB] rounded-[16px] p-4 h-full">
                  <p className="text-[10px] uppercase text-gray-500 font-semibold">
                    Amount to Pay
                  </p>

                  <h1 className="text-[28px] sm:text-[36px] font-bold text-[#2F66E3] leading-none mt-2">
                    {orderData.amount}
                  </h1>

                  <div className="mt-4 bg-white rounded-[14px] p-3 flex items-center justify-between">
                    <span className="text-[12px] text-gray-500">
                      Items
                    </span>

                    <span className="text-[13px] font-semibold">
                      {orderData.product}
                    </span>
                  </div>

                  <div className="mt-4">
                    <label className="text-[12px] text-gray-500 font-medium flex items-center gap-1">
                      Transaction ID / UPI Ref No.
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) =>
                        setTransactionId(e.target.value)
                      }
                      placeholder="Enter transaction ID after payment"
                      className={`w-full h-[44px] px-4 rounded-[12px] border bg-white mt-2 text-[13px] outline-none transition-all duration-300 ${
                        !transactionId.trim() &&
                        showTransactionWarning
                          ? "border-red-400"
                          : "border-[#D5DEEA] focus:border-[#2F66E3]"
                      }`}
                    />
                  </div>

                  <div className="mt-4 bg-white rounded-[12px] px-3 py-3 flex items-center gap-2">
                    <Clock3
                      size={14}
                      className="text-gray-500 shrink-0"
                    />

                    <span className="text-[11px] text-gray-500">
                      Scan the QR code, pay, then upload screenshot
                    </span>
                  </div>
                </div>
              </div>

              {/* UPLOAD */}
              <div className="lg:col-span-3">
                <div className="border-2 border-dashed border-[#D5DEEA] rounded-[16px] p-4 h-full flex flex-col justify-between">
                  <div className="text-center">
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    <div
                      onClick={() => fileInputRef.current.click()}
                      className="cursor-pointer"
                    >
                      {!uploadedImage ? (
                        <>
                          <div className="w-14 h-14 rounded-full bg-[#F5F7FB] flex items-center justify-center mx-auto mb-3">
                            <Upload
                              size={22}
                              className="text-gray-500"
                            />
                          </div>

                          <h3 className="text-[17px] font-bold text-[#111827]">
                            Upload Screenshot
                          </h3>

                          <p className="text-[12px] text-gray-500 mt-2">
                            Tap to choose payment proof
                          </p>
                        </>
                      ) : (
                        <div>
                          <img
                            src={uploadedImage}
                            alt="Uploaded"
                            className="w-full h-[180px] object-cover rounded-[14px] border border-[#DCE5F2]"
                          />

                          <p className="text-[12px] text-[#2F66E3] font-medium mt-3">
                            Click to change screenshot
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmPayment}
                    className={`w-full h-[46px] rounded-[12px] text-white text-[14px] font-semibold flex items-center justify-center gap-2 mt-5 transition-all duration-300 ${
                      uploadedImage && transactionId.trim()
                        ? "bg-[#2F66E3] hover:opacity-90 cursor-pointer"
                        : "bg-[#AEBEDC] cursor-not-allowed"
                    }`}
                  >
                    <ImagePlus size={16} />

                    Confirm Payment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* COD SCREEN */}
          {step === "cod" && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-[18px] border border-[#DCE5F2] p-4">
                <div className="w-20 h-20 rounded-full bg-[#E6F8EA] flex items-center justify-center mx-auto mb-5">
                  <Wallet size={34} className="text-[#1EA84A]" />
                </div>

                <div className="bg-[#F5F7FB] rounded-[14px] p-3 flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-[#2F66E3]" />
                  </div>

                  <div>
                    <h2 className="text-[15px] sm:text-[17px] font-bold text-[#111827]">
                      {orderData.customer}

                      <span className="text-gray-500 font-medium">
                        {" "}
                        · {orderData.phone}
                      </span>
                    </h2>

                    <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">
                      {orderData.address}
                    </p>
                  </div>
                </div>

                <div className="bg-[#F5F7FB] rounded-[14px] p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[13px] text-gray-500">
                      Amount
                    </span>

                    <span className="text-[12px] sm:text-[20px] font-bold text-[#2F66E3]">
                      {orderData.amount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[13px] text-gray-500">
                      Product
                    </span>

                    <span className="text-[14px] sm:text-[16px] font-semibold">
                      {orderData.product}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-gray-500">
                      Quantity
                    </span>

                    <span className="text-[14px] sm:text-[16px] font-semibold">
                      {orderData.qty}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleConfirmPayment}
                  className="w-full h-[50px] rounded-[14px] bg-[#2F66E3] text-white text-[15px] sm:text-[14px] font-bold hover:opacity-90 transition-all duration-300 cursor-pointer"
                >
                  Confirm — Pay on Delivery
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentCheckout;