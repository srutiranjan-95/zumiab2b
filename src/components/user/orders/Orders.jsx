import { useState, useEffect } from "react";
import { getMyOrders } from "../../../service/apiOrders"; // adjust path
import {
  ArrowLeft,
  CheckCircle2,
  Truck,
  Circle,
  MapPin,
  ChevronRight,
  X,
  CreditCard,
  Package,
} from "lucide-react";

export default function MyOrdersPage() {
  const [showDetails, setShowDetails] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderSteps = [
    "Pending",
    "Confirmed",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  const isRejected = selectedOrder?.status === "Rejected";

  const currentStep = Math.max(0, orderSteps.indexOf(selectedOrder?.status));

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("access");

      const response = await getMyOrders(token);

      console.log(response);

      setOrders(response?.data || []);
    } catch (error) {
      console.error("Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f7f8fa] px-3 py-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex items-center gap-2 mb-4">
        {/* <button className="flex items-center gap-1 text-xs font-medium text-black hover:opacity-80 transition">
          <ArrowLeft size={15} />
          Back
        </button> */}

        <h1 className="text-2xl font-bold text-black">My Orders</h1>
      </div>

      {/* Order Card */}
      {loading ? (
        <div className="max-w-4xl mx-auto space-y-4 animate-pulse">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex justify-between items-start">
                {/* Left */}
                <div className="space-y-3">
                  <div className="h-5 w-40 bg-gray-200 rounded"></div>

                  <div className="h-3 w-28 bg-gray-200 rounded"></div>

                  <div className="h-3 w-24 bg-gray-200 rounded"></div>

                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                </div>

                {/* Right */}
                <div className="flex flex-col items-end space-y-3">
                  <div className="h-7 w-24 bg-gray-200 rounded"></div>

                  <div className="h-6 w-20 bg-gray-200 rounded-full"></div>

                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 text-center">
          No Orders Found
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.order_id}
            onClick={() => {
              setSelectedOrder(order);
              setShowDetails(true);
            }}
            className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition mb-4"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-black">
                  Order #{order.order_id}
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  {new Date(order.created_at).toLocaleString()}
                </p>

                <div className="flex items-center gap-1 text-xs text-gray-600 mt-2">
                  <MapPin size={12} className="text-pink-500" />
                  {order.delivery_type || "Store Pickup"}
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  {order.products?.length || 0} items
                </p>
              </div>

              <div className="flex flex-col items-start lg:items-end">
                <h3 className="text-2xl font-bold text-black">
                  ₹{Number(order.total_amount || 0).toLocaleString()}
                </h3>

                <span
                  className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : order.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.status === "Rejected" ? "Canceled" : order.status}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOrder(order);
                    setShowDetails(true);
                  }}
                  className="mt-4 flex items-center gap-1 text-xs text-gray-600 hover:text-black"
                >
                  View Details
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* SIDEBAR */}
      {showDetails && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowDetails(false)}
          />

          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-full md:w-[520px] bg-white z-50 shadow-2xl overflow-y-auto slide-in-sidebar animate-[slideIn_.3s_ease-out]">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b px-5 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">
                  Order #{selectedOrder?.order_id}
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  {selectedOrder?.created_at &&
                    new Date(selectedOrder.created_at).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setShowDetails(false)}
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Status */}
              <div className="flex justify-end">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    selectedOrder?.status === "Delivered"
                      ? "bg-green-100 text-green-600 border-green-200"
                      : selectedOrder?.status === "Rejected"
                        ? "bg-red-100 text-red-600 border-red-200"
                        : selectedOrder?.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600 border-yellow-200"
                          : selectedOrder?.status === "Confirmed"
                            ? "bg-purple-100 text-purple-600 border-purple-200"
                            : selectedOrder?.status === "Processing"
                              ? "bg-sky-100 text-sky-600 border-sky-200"
                              : selectedOrder?.status === "Shipped"
                                ? "bg-blue-100 text-blue-600 border-blue-200"
                                : "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {selectedOrder?.status === "Rejected"
                    ? "Canceled"
                    : selectedOrder?.status}
                </span>
              </div>
              {isRejected && (
                <div className="border border-red-200 bg-red-50 rounded-2xl p-4">
                  <p className="text-red-600 font-semibold text-sm">
                    Order Canceled
                  </p>
                  <p className="text-red-500 text-xs mt-1">
                    This order has been canceled and will not proceed further.
                  </p>
                </div>
              )}
              {/* Tracking */}
              <div className="border border-gray-200 rounded-2xl p-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-5">
                  Order Tracking
                </h3>

                <div className="flex justify-between items-center">
                  {orderSteps.map((step, index) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-700 ${
                            isRejected
                              ? "bg-red-600 text-white"
                              : index < currentStep
                                ? "bg-blue-600 text-white"
                                : index === currentStep
                                  ? "bg-blue-600 text-white tracking-active scale-110 shadow-lg"
                                  : "border border-gray-300 text-gray-400"
                          }`}
                        >
                          {index < currentStep ? (
                            <CheckCircle2 size={14} />
                          ) : step === "Shipped" ? (
                            <Truck size={14} />
                          ) : step === "Processing" ? (
                            <Package size={14} />
                          ) : step === "Confirmed" ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <Circle size={12} />
                          )}
                        </div>

                        <span
                          className={`text-[10px] mt-2 text-center transition-all duration-500 ${
                            index <= currentStep
                              ? "text-blue-600 font-semibold"
                              : "text-gray-400"
                          }`}
                        >
                          {step}
                        </span>
                      </div>

                      {index !== orderSteps.length - 1 && (
                        <div
                          className={`flex-1 h-[3px] mx-2 rounded-full progress-line ${
                            index < currentStep ? "bg-blue-600" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Info */}
              <div className="border border-gray-200 rounded-2xl p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <MapPin size={15} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Shipping Address</p>

                    <p className="text-sm font-medium">
                      {selectedOrder?.address?.full_name}
                      {selectedOrder?.address?.address_line_1},
                      {selectedOrder?.address?.city},
                      {selectedOrder?.address?.state},
                      {selectedOrder?.address?.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <Truck size={15} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Delivery Type</p>

                    <p className="text-sm font-medium">Store Pickup</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <CreditCard size={15} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Payment Mode</p>

                    <p className="text-sm font-medium">
                      {selectedOrder?.payment_method || "Online"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="border border-gray-200 rounded-2xl p-5 bg-gradient-to-r from-white to-blue-50 shadow-sm">
                <h3 className="font-semibold mb-4">
                  Order Items ({selectedOrder?.products?.length || 0})
                </h3>

                {selectedOrder?.products?.map((item) => (
                  <div
                    key={item.order_item_id}
                    className="flex items-center justify-between py-3 border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item?.product?.image ||
                          item?.product?.images?.[0] ||
                          "/placeholder.png"
                        }
                        alt={item?.product?.name}
                        className="w-14 h-14 rounded-xl object-cover border"
                      />

                      <div>
                        <p className="text-sm font-medium">
                          {item?.product?.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <p className="font-semibold">
                      ₹{Number(item.price || 0).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border border-gray-200 rounded-2xl p-4 flex justify-between items-center">
                <span className="font-semibold">Order Total</span>

                <span className="text-sm font-bold">
                  ₹{Number(selectedOrder?.total_amount || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
