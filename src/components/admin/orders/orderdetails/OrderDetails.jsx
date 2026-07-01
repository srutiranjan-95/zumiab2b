import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Order Not Found</h2>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-600";

      case "Shipped":
        return "bg-blue-50 text-blue-600";

      case "Processing":
        return "bg-sky-50 text-sky-600";

      case "Confirmed":
        return "bg-purple-50 text-purple-600";

      case "Cancelled":
      case "Rejected":
        return "bg-red-50 text-red-600";

      default:
        return "bg-yellow-50 text-yellow-600";
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-5"
        >
          ← Back to Orders
        </button>

        {/* Order Header */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Order #{order.order_id}
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                  order.status,
                )}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        </div>

        {/* Customer Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-4">
            Customer
          </h3>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              👤
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                {order.customer_name}
              </p>

              <p className="text-sm text-gray-500">
                {order.business_name || "N/A"}
              </p>

              <p className="text-xs text-gray-400">{order.email}</p>

              <p className="text-xs text-gray-400">{order.phone}</p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-5">
            Order Details
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <p className="text-xs text-gray-500 mb-1">Shipping Address</p>

              <p className="font-medium text-sm leading-6">
                {order.address?.full_name}
                <br />
                {order.address?.address_line_1}, {order.address?.address_line_2}
                <br />
                {order.address?.city}, {order.address?.state}
                <br />
                PIN :{order.address?.pincode}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Payment Method</p>

              <p className="font-medium text-sm">{order.payment_method}</p>

              <p className="text-xs text-gray-500 mt-4 mb-1">Transaction ID</p>

              <p className="font-medium text-sm">
                {order.transaction_id || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-5">
            Order Items ({order.products?.length || 0})
          </h3>

          <div className="space-y-4">
            {order.products?.map((item) => (
              <div
                key={item.order_item_id}
                className="flex items-center gap-4 bg-gray-50 rounded-xl p-3"
              >
                <img
                  src={
                    item.product?.images?.[0] ||
                    item.product?.image ||
                    "https://via.placeholder.com/100"
                  }
                  alt={item.product?.name}
                  className="w-16 h-16 rounded-xl object-cover border"
                />

                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-900">
                    {item.product?.name}
                  </h4>

                  <p className="text-xs text-gray-500 mt-1">
                    Item Code : {item.product?.item_code}
                  </p>

                  <p className="text-xs text-gray-500">Qty : {item.quantity}</p>

                  <p className="text-xs text-gray-400">
                    Unit Price : ₹{item.price}
                  </p>
                </div>

                <div className="font-bold text-blue-600 text-sm">
                  ₹{(Number(item.price) * Number(item.quantity)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-700">Order Total</h3>

            <span className="text-3xl font-bold text-blue-600">
              ₹{order.total_amount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
