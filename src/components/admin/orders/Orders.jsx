// src/components/admin/orders/Orders.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getOrders,
  getOrderStatus,
  updateOrderStatus,
  getStatusWiseOrders,
  getOrderStatusCount,
  getUpiOrders,
  getProductsByDate,
} from "../../../service/apiOrders";
import { Wallet, Truck, PackageCheck } from "lucide-react";

import {
  Search,
  Download,
  MapPin,
  Receipt,
  Building2,
  ArrowUpDown,
} from "lucide-react";

import { useRef } from "react";

function Orders() {
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const navigate = useNavigate();

  const [activeStatus, setActiveStatus] = useState("");
  const [orderStatuses, setOrderStatuses] = useState({});

  const [orders, setOrders] = useState([]);
  const [upiOrders, setUpiOrders] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});
  const [totalOrders, setTotalOrders] = useState(0);
  console.log("Orders:", orders);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const stats = [
    {
      title: "All Orders",
      value: totalOrders,
      color: "border-blue-200 bg-blue-50 text-blue-600",
      activeBorder: "border-blue-600",
      activeRing: "ring-blue-200",
    },
    {
      title: "Pending",
      value: statusCounts.Pending || 0,
      color: "border-yellow-200 bg-yellow-50 text-yellow-600",
      activeBorder: "border-yellow-500",
      activeRing: "ring-yellow-200",
    },
    {
      title: "Processing",
      value: statusCounts.Processing || 0,
      color: "border-sky-200 bg-sky-50 text-sky-600",
      activeBorder: "border-sky-600",
      activeRing: "ring-sky-200",
    },
    {
      title: "Confirmed",
      value: statusCounts.Confirmed || 0,
      color: "border-green-200 bg-green-50 text-green-600",
      activeBorder: "border-green-600",
      activeRing: "ring-green-200",
    },
    {
      title: "Shipped",
      value: statusCounts.Shipped || 0,
      color: "border-purple-200 bg-purple-50 text-purple-600",
      activeBorder: "border-purple-600",
      activeRing: "ring-purple-200",
    },
    {
      title: "Delivered",
      value: statusCounts.Delivered || 0,
      color: "border-green-200 bg-green-50 text-green-600",
      activeBorder: "border-green-600",
      activeRing: "ring-green-200",
    },
    {
      title: "Cancelled",
      value: statusCounts.Cancelled || 0,
      color: "border-red-200 bg-red-50 text-red-600",
      activeBorder: "border-red-600",
      activeRing: "ring-red-200",
    },
  ];
  // Fetch Orders//

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await getOrders(token);

      console.log("Orders API:", response);

      const orderData = response?.data || [];

      setOrders(orderData);

      const initialStatuses = {};

      orderData.forEach((order) => {
        initialStatuses[order.order_id] = order.status;
      });

      // Set the initial order statuses in state//

      setOrderStatuses(initialStatuses);
    } catch (error) {
      console.log("Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchOrdersByStatus = async (status) => {
    try {
      const token = localStorage.getItem("access");

      const response = await getStatusWiseOrders(status, token);

      console.log("Status Wise Orders:", response);

      const orderData = response?.data || [];

      const formattedOrders = orderData.map((order) => ({
        ...order,
        status: order.order_status,
      }));

      setOrders(formattedOrders);

      const initialStatuses = {};

      formattedOrders.forEach((order) => {
        initialStatuses[order.order_id] = order.status;
      });

      setOrderStatuses(initialStatuses);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Order Statuses//

  const fetchOrderStatuses = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await getOrderStatus(token);

      console.log("Status API:", response);

      setStatusOptions(response?.data || []);
    } catch (error) {
      console.log("Status Error:", error);
    }
  };

  // Fetch Order Status Counts//

  const fetchOrderStatusCounts = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await getOrderStatusCount(token);

      console.log("Status Count API:", response);

      const counts = {};

      response?.data?.forEach((item) => {
        counts[item.order_status] = item.count;
      });

      setStatusCounts(counts);

      setTotalOrders(response?.total_orders || 0);
    } catch (error) {
      console.log("Status Count Error:", error);
    }
  };

  // Handle Status Change//

  const handleStatusChange = async (orderId, status) => {
    try {
      const token = localStorage.getItem("access");

      await updateOrderStatus(orderId, status, token);

      setOrderStatuses((prev) => ({
        ...prev,
        [orderId]: status,
      }));

      fetchOrderStatusCounts();

      console.log("Status Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const downloadCSV = (data, filename) => {
    const headers = Object.keys(data[0]).join(",");

    const rows = data.map((row) =>
      Object.values(row)
        .map((value) => `"${value ?? ""}"`)
        .join(","),
    );

    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = filename;

    link.click();
  };

  const exportAllOrders = () => {
    const exportData = [];

    orders.forEach((order) => {
      order.products?.forEach((item) => {
        exportData.push({
          Order_ID: order.order_id,

          Customer: order.customer_name,

          Company: order.business_name,

          Product_Name: item.product?.name,

          Item_Code: item.product?.item_code,

          Quantity: item.quantity,

          Price: item.price,

          Product_Total: Number(item.quantity) * Number(item.price),

          Payment_Method: order.payment_method,

          Order_Status: order.status,

          Order_Total: order.total_amount,
        });
      });
    });

    downloadCSV(exportData, "all_orders.csv");
  };

  const exportSingleOrder = (order) => {
    const exportData = order.products?.map((item) => ({
      Order_ID: order.order_id,

      Customer: order.customer_name,

      Company: order.business_name,

      Product_Name: item.product?.name,

      Item_Code: item.product?.item_code,

      Quantity: item.quantity,

      Price: item.price,

      Product_Total: Number(item.quantity) * Number(item.price),

      Payment_Method: order.payment_method,

      Order_Status: order.status,

      Order_Total: order.total_amount,
    }));

    downloadCSV(exportData, `order_${order.order_id}.csv`);
  };
  const fetchUpiOrders = async () => {
    try {
      const response = await getUpiOrders();

      console.log("UPI Orders:", response);

      if (response?.status) {
        setUpiOrders(response.data);
      }
    } catch (error) {
      console.log("UPI Error:", error);
    }
  };

  // Use Effect to Fetch Data on Component Mount//

  useEffect(() => {
    fetchOrders();
    fetchOrderStatuses();
    fetchOrderStatusCounts();
    fetchUpiOrders();
  }, []);

  const handleDateSearch = async () => {
    try {
      if (!fromDate || !toDate) {
        alert("Please select From Date and To Date");
        return;
      }

      const token = localStorage.getItem("access");

      const response = await getProductsByDate(fromDate, toDate, token);

      console.log("Filter Response:", response);

      const filteredOrders = response.results || [];

      setOrders(
        filteredOrders.map((order) => ({
          ...order,
          status: order.order_status,
          customer_name: order.user?.username || order.user?.email || "N/A",
          business_name: order.user?.business_name || "N/A",
        })),
      );

      const statuses = {};

      filteredOrders.forEach((order) => {
        statuses[order.order_id] = order.order_status;
      });

      setOrderStatuses(statuses);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearFilter = () => {
    setFromDate("");
    setToDate("");

    fetchOrders();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        Loading orders...
      </div>
    );
  }
  const handleViewOrder = (order) => {
    navigate(`/admin/order-details/${order.order_id}`, {
      state: {
        order,
      },
    });
  };
  // Filter orders based on search
  const filteredOrders = orders.filter((order) => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return true;

    return (
      String(order.order_id).toLowerCase().includes(keyword) ||
      (order.customer_name || "").toLowerCase().includes(keyword) ||
      (order.business_name || "").toLowerCase().includes(keyword) ||
      (order.payment_method || "").toLowerCase().includes(keyword) ||
      (order.transaction_id || "").toLowerCase().includes(keyword) ||
      (order.address?.mobile_number || "").toLowerCase().includes(keyword) ||
      (order.address?.city || "").toLowerCase().includes(keyword) ||
      (order.address?.state || "").toLowerCase().includes(keyword) ||
      (order.address?.pincode || "").toString().toLowerCase().includes(keyword)
    );
  });
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* TOP STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
        {stats.map((item, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveStatus(item.title);

              if (item.title === "All Orders") {
                fetchOrders();
              } else {
                fetchOrdersByStatus(item.title);
              }
            }}
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

            <p className="text-[11px] font-medium">{item.title}</p>
          </button>
        ))}
      </div>

      {/* FILTERS */}
      <div className="flex flex-col lg:flex-row gap-3 mt-4">
        <div className="flex-1 relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order ID, Customer, Company, Mobile, City..."
            className="w-full h-[40px] pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-[12px] outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* FROM DATE */}
          {/* FROM DATE */}
          <div
            onClick={() => fromDateRef.current?.showPicker()}
            className="flex items-center gap-2 px-3 h-[40px] min-w-[170px] rounded-xl border border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 hover:shadow-sm transition-all duration-300 cursor-pointer"
          >
            <span className="text-[11px] text-gray-500 whitespace-nowrap pointer-events-none">
              From
            </span>

            <input
              ref={fromDateRef}
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="flex-1 text-[12px] outline-none bg-transparent cursor-pointer"
            />
          </div>

          <div className="text-gray-400 text-[12px] font-medium">→</div>

          {/* TO DATE */}
          <div
            onClick={() => toDateRef.current?.showPicker()}
            className="flex items-center gap-2 px-3 h-[40px] min-w-[170px] rounded-xl border border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 hover:shadow-sm transition-all duration-300 cursor-pointer"
          >
            <span className="text-[11px] text-gray-500 whitespace-nowrap pointer-events-none">
              To
            </span>

            <input
              ref={toDateRef}
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="flex-1 text-[12px] outline-none bg-transparent cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDateSearch}
              className="h-[40px] px-4 rounded-xl bg-blue-600 text-white text-[12px] hover:bg-blue-700 cursor-pointer"
            >
              Search
            </button>

            <button
              onClick={handleClearFilter}
              className="h-[40px] px-4 rounded-xl border border-red-200 bg-red-50 text-red-600 text-[12px] hover:bg-red-100 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* COUNT */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-[11px] text-gray-500">
          {filteredOrders.length} orders
        </p>

        <button
          onClick={exportAllOrders}
          className="h-[34px] px-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center gap-2 text-[11px] font-medium hover:bg-gray-50 transition-all duration-300"
        >
          <Download size={12} />
          Export
        </button>
      </div>

      {/* ORDER LIST */}
      <div className="space-y-4 mt-4">
        {filteredOrders.map((order) => {
          const paymentData = upiOrders.find(
            (item) => item.id === order.order_id,
          );
          const filteredOrders = orders.filter((order) => {
            const keyword = search.toLowerCase().trim();

            if (!keyword) return true;

            return (
              String(order.order_id).toLowerCase().includes(keyword) ||
              (order.customer_name || "").toLowerCase().includes(keyword) ||
              (order.business_name || "").toLowerCase().includes(keyword) ||
              (order.payment_method || "").toLowerCase().includes(keyword) ||
              (order.transaction_id || "").toLowerCase().includes(keyword) ||
              (order.address?.mobile_number || "")
                .toLowerCase()
                .includes(keyword) ||
              (order.address?.city || "").toLowerCase().includes(keyword) ||
              (order.address?.state || "").toLowerCase().includes(keyword) ||
              (order.address?.pincode || "").toString().includes(keyword)
            );
          });
          return (
            <div
              key={order.order_id}
              onClick={() => handleViewOrder(order)}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-blue-600 cursor-pointer transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                {/* LEFT */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-[24px] font-bold">
                      Order #{order.order_id}
                    </h2>

                    {/* Delivery Status */}
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium ${
                        (orderStatuses[order.order_id] || order.status) ===
                        "Delivered"
                          ? "bg-green-50 text-green-600"
                          : (orderStatuses[order.order_id] || order.status) ===
                              "Shipped"
                            ? "bg-blue-50 text-blue-600"
                            : (orderStatuses[order.order_id] ||
                                  order.status) === "Processing"
                              ? "bg-sky-50 text-sky-600"
                              : (orderStatuses[order.order_id] ||
                                    order.status) === "Confirmed"
                                ? "bg-purple-50 text-purple-600"
                                : (orderStatuses[order.order_id] ||
                                      order.status) === "Cancelled"
                                  ? "bg-red-50 text-red-600"
                                  : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {(orderStatuses[order.order_id] || order.status) ===
                      "Delivered" ? (
                        <PackageCheck size={12} />
                      ) : (
                        <Truck size={12} />
                      )}

                      {orderStatuses[order.order_id] || order.status}
                    </span>

                    {/* Payment Status */}
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium ${
                        paymentData?.payment_status === true
                          ? "bg-green-50 text-green-600"
                          : paymentData?.order_status === "Rejected"
                            ? "bg-red-50 text-red-600"
                            : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {paymentData?.payment_status === true ? (
                        <Wallet size={12} />
                      ) : paymentData?.order_status === "Rejected" ? (
                        <Wallet size={12} />
                      ) : (
                        <Wallet size={12} />
                      )}

                      {paymentData?.payment_status === true
                        ? "Verified"
                        : paymentData?.order_status === "Rejected"
                          ? "Rejected"
                          : "Pending"}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                    <div>
                      <p className="text-[11px] text-gray-400">Date</p>
                      <p className="text-[13px] font-medium">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] text-gray-400">Time</p>
                      <p className="text-[13px] font-medium">
                        {new Date(order.created_at).toLocaleTimeString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] text-gray-400">Company Name</p>

                      <div className="flex items-center gap-2 mt-1">
                        <Building2 size={14} className="text-gray-500" />

                        <p className="text-[13px] font-medium">
                          {order.business_name || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] text-gray-400">Customer Name</p>

                      <p className="text-[13px] font-medium mt-1">
                        {order.customer_name}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] text-gray-400">
                        Payment Method
                      </p>

                      <span
                        className={`inline-flex mt-1 px-3 py-1 rounded-full text-[11px] font-semibold ${
                          order.payment_method === "COD"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-violet-100 text-violet-600"
                        }`}
                      >
                        {order.payment_method}
                      </span>
                    </div>

                    <div>
                      <p className="text-[11px] text-gray-400">
                        Transaction ID
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <Receipt size={14} />
                        <p className="text-[13px] font-medium">
                          {order.transaction_id || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 mt-5">
                    <MapPin size={14} className="text-red-500 mt-1" />

                    <div>
                      <p className="text-[11px] text-gray-400">Address</p>

                      <p className="text-[12px] text-gray-700 leading-5">
                        {order.address?.full_name},{" "}
                        {order.address?.address_line_1},{" "}
                        {order.address?.address_line_2}, {order.address?.city},{" "}
                        {order.address?.state} - {order.address?.pincode}
                        <br />
                        Mobile: {order.address?.mobile_number}
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-end justify-between min-w-[220px]">
                  <h2 className="text-[30px] font-bold text-[#3164E3]">
                    ₹{order.total_amount}
                  </h2>

                  <div className="flex items-center gap-2 mt-4 ">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        exportSingleOrder(order);
                      }}
                      className="h-[34px] px-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center gap-2 text-[11px] font-medium hover:bg-gray-50 transition-all duration-300"
                    >
                      <Download size={11} />
                      Export
                    </button>

                    <select
                      value={orderStatuses[order.order_id] || order.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleStatusChange(order.order_id, e.target.value);
                      }}
                      className={`h-[34px] px-3 rounded-xl border text-[11px] font-medium outline-none
    ${
      (orderStatuses[order.order_id] || "") === "Delivered"
        ? "bg-green-100 text-green-600 border-green-200"
        : (orderStatuses[order.order_id] || "") === "Shipped"
          ? "bg-blue-100 text-blue-600 border-blue-200"
          : (orderStatuses[order.order_id] || "") === "Processing"
            ? "bg-sky-100 text-sky-600 border-sky-200"
            : (orderStatuses[order.order_id] || "") === "Confirmed"
              ? "bg-purple-100 text-purple-600 border-purple-200"
              : (orderStatuses[order.order_id] || "") === "Cancelled"
                ? "bg-red-100 text-red-600 border-red-200"
                : (orderStatuses[order.order_id] || "") === "Pending"
                  ? "bg-yellow-100 text-yellow-600 border-yellow-200"
                  : "bg-white border-gray-200 text-gray-500"
    }
  `}
                    >
                      {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
