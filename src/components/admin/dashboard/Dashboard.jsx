import { useState, useEffect } from "react";
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
  // Package,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  getCustomerStatusCount,
  getProductCount,
  getOrderStatusSummary,
  getCustomerStatusSummary,
  getDeliveredOrderSummary,
  getPendingUpiOrderCount,
} from "../../../service/apiDashboard";

import { getOrderStatusCount } from "../../../service/apiOrders";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const [revenueFilter, setRevenueFilter] = useState("6M");
  const [orderFilter, setOrderFilter] = useState("6M");
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const [orderCounts, setOrderCounts] = useState({});

  const [orderStatusChart, setOrderStatusChart] = useState([]);

  const [customerStatusChart, setCustomerStatusChart] = useState([]);

  const [pendingApproval, setPendingApproval] = useState(0);

  const [totalProducts, setTotalProducts] = useState(0);

  const [activeProducts, setActiveProducts] = useState(0);

  const [deliveredOrders, setDeliveredOrders] = useState(0);

  const [deliveredAmount, setDeliveredAmount] = useState(0);

  const [deliveredCustomers, setDeliveredCustomers] = useState(0);

  const [pendingReceipts, setPendingReceipts] = useState(0);

  // Fetch Customer Status Count

  const fetchCustomerStatusCount = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await getCustomerStatusCount(token);
      console.log("Customer Status Count:", response);

      const approvedCustomer = response?.data?.find(
        (item) => item.status === "approved",
      );

      setTotalCustomers(approvedCustomer?.count || 0);

      setPendingApproval(response?.pending_approval || 0);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Order Status Counts

  const fetchOrderStatusCounts = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await getOrderStatusCount(token);

      console.log("Order Status Count:", response);

      const counts = {};

      response?.data?.forEach((item) => {
        counts[item.order_status] = item.count;
      });

      setOrderCounts(counts);

      setTotalOrders(response?.total_orders || 0);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Order Status Summary

  const fetchOrderStatusSummary = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await getOrderStatusSummary(token);

      const colors = {
        Pending: "#8b5cf6",
        Processing: "#d98b14",
        Shipped: "#e2b84d",
        Delivered: "#10b981",
        Cancelled: "#ef4444",
      };

      const chartData = Object.entries(response?.data || {}).map(
        ([name, value]) => ({
          name,
          value: value.percentage,
          color: colors[name],
        }),
      );

      setOrderStatusChart(chartData);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Customer Status Summary//

  const fetchCustomerStatusSummary = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await getCustomerStatusSummary(token);

      const colors = {
        Approved: "#10b981",
        Pending: "#8b5cf6",
        Rejected: "#ef4444",
      };

      const chartData = Object.entries(response?.data || {}).map(
        ([name, value]) => ({
          name,
          value: value.percentage,
          color: colors[name],
        }),
      );

      setCustomerStatusChart(chartData);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Product Count//

  const fetchProductCount = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await getProductCount(token);

      console.log("Product Count:", response);

      setTotalProducts(response?.total_products || 0);

      setActiveProducts(response?.active_products || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDeliveredOrderSummary = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await getDeliveredOrderSummary(token);

      console.log("Delivered Summary:", response);

      setDeliveredOrders(response?.total_delivered_orders || 0);

      setDeliveredAmount(response?.total_delivered_amount || 0);

      setDeliveredCustomers(response?.total_customers || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPendingReceipts = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await getPendingUpiOrderCount(token);

      console.log("Pending Receipts:", response);

      setPendingReceipts(response?.pending_upi_orders || 0);
    } catch (error) {
      console.log(error);
    }
  };

  // Use Effect to Fetch Data on Component Mount//

  useEffect(() => {
    fetchCustomerStatusCount();
    fetchOrderStatusCounts();
    fetchOrderStatusSummary();
    fetchCustomerStatusSummary();
    fetchProductCount();
    fetchDeliveredOrderSummary();
    fetchPendingReceipts();
  }, []);

  const revenueData = [
    { name: "Jan 24", value: 25000 },
    { name: "Mar 24", value: 25000 },
    { name: "Apr 24", value: 110000 },
    { name: "May 24", value: 210000 },
    { name: "Jun 24", value: 0 },
  ];

  const monthlyOrders = [
    { name: "Jan 24", value: 2 },
    { name: "Mar 24", value: 3 },
    { name: "Apr 24", value: 23 },
    { name: "May 24", value: 1 },
    { name: "Jun 24", value: 0 },
  ];

  // Top Cards Data//

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${deliveredAmount}`,
      sub: `${deliveredOrders} delivered orders`,
      icon: IndianRupee,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      // sub: "9 pending",
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Customers",
      value: totalCustomers,
      sub: `${pendingApproval} pending approval`,
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Products",
      value: totalProducts,
      sub: `${activeProducts} active`,
      icon: Boxes,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Pending Receipts",
      value: pendingReceipts,
      sub: "Awaiting verification",
      icon: Clock3,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  // Status Cards Data//

  const statusCards = [
    {
      label: "Pending",
      value: orderCounts.Pending || 0,
      icon: Clock3,
      bg: "bg-yellow-50",
      border: "border-yellow-300",
      text: "text-yellow-700",
    },
    {
      label: "Processing",
      value: orderCounts.Processing || 0,
      icon: RefreshCw,
      bg: "bg-blue-50",
      border: "border-blue-300",
      text: "text-blue-700",
    },
    {
      label: "Shipped",
      value: orderCounts.Shipped || 0,
      icon: Truck,
      bg: "bg-purple-50",
      border: "border-purple-300",
      text: "text-purple-700",
    },
    {
      label: "Delivered",
      value: orderCounts.Delivered || 0,
      icon: CheckCircle2,
      bg: "bg-green-50",
      border: "border-green-300",
      text: "text-green-700",
    },
    {
      label: "Cancelled",
      value: orderCounts.Cancelled || 0,
      icon: XCircle,
      bg: "bg-red-50",
      border: "border-red-300",
      text: "text-red-700",
    },
  ];

  const products = [
    { name: "Crystal Prism Cylinder Wall Sconce", units: 88 },
    { name: "B12-600X800", units: 55 },
    { name: "WWWWWW", units: 50 },
    { name: "TV SIDE TABLE", units: 6 },
  ];

  const orders = [
    { id: "#34", amount: "₹2,05,290", status: "Processing" },
    { id: "#33", amount: "₹8,500", status: "Shipped" },
    { id: "#32", amount: "₹14,808", status: "Processing" },
    { id: "#31", amount: "₹12,000", status: "Processing" },
  ];

  const FilterButtons = ({ value, setValue }) => (
    <div className="flex gap-1">
      {["1M", "6M", "1Y", "2Y", "All"].map((item) => (
        <button
          key={item}
          onClick={() => setValue(item)}
          className={`px-2 py-1 text-[10px] rounded-full transition-all ${
            value === item
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );

  return (
    <div className="p-4 bg-[#f7f8fc] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-lg font-bold">Business Overview</h1>
            <p className="text-xs text-gray-500">Last updated 11:10:52 AM</p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition hover:cursor-pointer hover:bg-green-50"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        {/* Top Cards */}
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-3">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="bg-white rounded-2xl p-4 shadow-sm"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase">
                    {card.title}
                  </p>

                  <h2 className="text-xl font-bold mt-1">{card.value}</h2>

                  <p
                    className={`text-[10px] mt-1 ${
                      card.title === "Customers"
                        ? "text-red-400 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {card.sub}
                  </p>
                </div>

                <div className="relative">
                  <div className="relative">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${card.color}`}
                    >
                      <card.icon size={16} />
                    </div>

                    {/* Customer Pending Approval */}
                    {card.title === "Customers" && pendingApproval > 0 && (
                      <div className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center shadow-md">
                        {pendingApproval > 99 ? "99+" : pendingApproval}
                      </div>
                    )}

                    {/* Pending Receipts */}
                    {card.title === "Pending Receipts" &&
                      pendingReceipts > 0 && (
                        <div className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-orange-500 text-white text-[9px] font-bold flex items-center justify-center shadow-md">
                          {pendingReceipts > 99 ? "99+" : pendingReceipts}
                        </div>
                      )}
                  </div>

                  {card.title === "Customers" && pendingApproval > 0 && (
                    <div className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center shadow-md">
                      {pendingApproval}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Status Cards */}
        <div className="grid lg:grid-cols-5 grid-cols-2 gap-3 mt-3">
          {statusCards.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                whileHover={{
                  y: -2,
                  scale: 1.02,
                }}
                className={`${item.bg} ${item.border} border rounded-xl p-3`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-bold text-sm ${item.text}`}>
                      {item.value}
                    </h3>

                    <p className="text-[10px] text-gray-600 mt-1">
                      {item.label}
                    </p>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full bg-white flex items-center justify-center ${item.text}`}
                  >
                    <Icon size={14} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Revenue + Order Status */}
        <div className="grid lg:grid-cols-3 gap-4 mt-4">
          <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold text-sm flex items-center gap-2">
                <TrendingUp size={14} />
                Revenue Trend
              </h2>

              <FilterButtons
                value={revenueFilter}
                setValue={setRevenueFilter}
              />
            </div>

            <div className="h-[250px]">
              <ResponsiveContainer>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-sm mb-4">Order Status</h2>

            <div className="h-[220px]">
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip formatter={(value) => `${value}%`} />

                  <Pie
                    data={orderStatusChart}
                    innerRadius={55}
                    outerRadius={80}
                    dataKey="value"
                    animationDuration={2000}
                  >
                    {orderStatusChart.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              {orderStatusChart.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />

                  <span className="text-[11px] text-gray-600 font-medium">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Orders */}
        <div className="grid lg:grid-cols-3 gap-4 mt-4">
          <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold text-sm">Monthly Orders</h2>

              <FilterButtons value={orderFilter} setValue={setOrderFilter} />
            </div>

            <div className="h-[250px]">
              <ResponsiveContainer>
                <BarChart data={monthlyOrders}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-sm mb-4">Customer Status</h2>

            <div className="h-[220px]">
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip formatter={(value) => `${value}%`} />

                  <Pie
                    data={customerStatusChart}
                    innerRadius={55}
                    outerRadius={80}
                    dataKey="value"
                    animationDuration={2000}
                  >
                    {customerStatusChart.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Customer Status Legend */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              {customerStatusChart.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />

                  <span className="text-[11px] text-gray-600 font-medium">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="grid lg:grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-sm mb-4">Recent Orders</h2>

            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between items-center border-b border-gray-100 pb-3"
                >
                  <div>
                    <h3 className="font-medium text-sm">{order.id}</h3>

                    <p className="text-xs text-gray-500">Normal Delivery</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px]">
                      {order.status}
                    </span>

                    <span className="font-semibold text-sm">
                      {order.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-sm mb-4">Top Products</h2>

            <div className="space-y-5">
              {products.map((product, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-2">
                    <span>
                      {i + 1}. {product.name}
                    </span>

                    <span>{product.units} units</span>
                  </div>

                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${product.units}%`,
                      }}
                      transition={{ duration: 1 }}
                      className="h-full bg-blue-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
