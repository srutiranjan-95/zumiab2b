import {
  Search,
  CalendarDays,
  // ChevronDown,
  Building2,
  CreditCard,
  Hash,
  CheckCircle2,
  XCircle,
  Receipt,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import {
  getMyUpiOrders,
  getUpiOrdersByDate,
  updateUpiOrderStatus,
} from "../../../../service/apiReceipts";

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(""); // verify | reject
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);
  const fetchReceipts = async () => {
    try {
      const res = await getMyUpiOrders();

      console.log("FULL RESPONSE:", res);

      if (res?.status === true) {
        setReceipts(Array.isArray(res.data) ? res.data : []);
      }
    } catch (error) {
      console.log("Receipt Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  const openModal = (type, receipt) => {
    setActionType(type);
    setSelectedReceipt(receipt);
    setShowModal(true);
  };

  const openDetails = (item) => {
    setSelectedOrder(item);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedOrder(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReceipt(null);
    setActionType("");
  };

  const handleConfirmAction = async () => {
    try {
      const action = actionType === "verify" ? "verified" : "Rejected";

      const res = await updateUpiOrderStatus(selectedReceipt.order_id, action);

      console.log("API Response:", res);

      if (res?.status) {
        closeModal();

        // Refresh list
        await fetchReceipts();
      }
    } catch (error) {
      console.log("Status Update Error:", error);
    }
  };

  const pendingCount = receipts.filter(
    (item) =>
      item?.payment?.payment_status === false &&
      item?.order?.order_status !== "Rejected",
  ).length;

  const verifiedCount = receipts.filter(
    (item) => item?.payment?.payment_status === true,
  ).length;

  // const uploadedCount = receipts.filter(
  //   (item) => item?.payment?.transaction_screenshot
  // ).length;

  const rejectedCount = receipts.filter(
    (item) => item?.order?.order_status === "Rejected",
  ).length;

  const filteredReceipts = receipts.filter((item) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      item?.order_id?.toString().includes(search) ||
      item?.user?.username?.toLowerCase().includes(search) ||
      item?.user?.business_name?.toLowerCase().includes(search) ||
      item?.address?.full_name?.toLowerCase().includes(search) ||
      item?.payment?.transaction_id?.toLowerCase().includes(search);

    const matchesStatus =
      activeFilter === "all"
        ? true
        : activeFilter === "pending"
          ? item?.payment?.payment_status === false &&
            item?.order?.order_status !== "Rejected"
          : activeFilter === "verified"
            ? item?.payment?.payment_status === true
            : item?.order?.order_status === "Rejected";

    return matchesSearch && matchesStatus;
  });

  const handleSearch = async () => {
  try {
    if (!fromDate || !toDate) {
      return;
    }

    setLoading(true);

    const res = await getUpiOrdersByDate(
      fromDate,
      toDate
    );

    console.log("Date Filter Response:", res);

    if (res?.status) {
      setReceipts(res.data || []);
    }
  } catch (error) {
    console.log("Date Filter Error:", error);
  } finally {
    setLoading(false);
  }
};

  const handleClearFilter = async () => {
    setFromDate("");
    setToDate("");

    await fetchReceipts();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Receipts...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="flex items-center gap-2">
            <Receipt size={18} className="text-indigo-600" />
            <h1 className="text-lg font-semibold">Receipts</h1>
          </div>

          {/* All Receipts */}
          <StatusBadge
            text={`${receipts.length} All`}
            bg={activeFilter === "all" ? "bg-indigo-100" : "bg-indigo-50"}
            textColor="text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 hover:border-indigo-300 hover:cursor-pointer"
            onClick={() => setActiveFilter("all")}
          />

          {/* Pending */}
          <StatusBadge
            text={`${pendingCount} Pending`}
            bg={activeFilter === "pending" ? "bg-yellow-100" : "bg-yellow-50"}
            textColor="text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800 hover:border-yellow-300 hover:cursor-pointer"
            onClick={() => setActiveFilter("pending")}
          />

          {/* Verified */}
          <StatusBadge
            text={`${verifiedCount} Verified`}
            bg={activeFilter === "verified" ? "bg-green-100" : "bg-green-50"}
            textColor="text-green-700 hover:bg-green-100 hover:text-green-800 hover:border-green-300 hover:cursor-pointer"
            onClick={() => setActiveFilter("verified")}
          />

          {/* Rejected */}
          <StatusBadge
            text={`${rejectedCount} Rejected`}
            bg={activeFilter === "rejected" ? "bg-red-100" : "bg-red-50"}
            textColor="text-red-700 hover:bg-red-100 hover:text-red-800 hover:border-red-300 hover:cursor-pointer"
            onClick={() => setActiveFilter("rejected")}
          />
        </div>

        {/* Search */}
        <div className="flex flex-col lg:flex-row gap-3 mb-5">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by order #, customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-200 bg-white text-sm outline-none"
            />
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-2">
            {/* From Date */}
            {/* From Date */}
            <div
              onClick={() => fromDateRef.current?.showPicker()}
              className="relative w-[180px] h-11 flex items-center rounded-xl border border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
            >
              <CalendarDays
                size={16}
                className="absolute left-3 text-gray-400 pointer-events-none"
              />

              <input
                ref={fromDateRef}
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full h-full pl-10 pr-3 bg-transparent text-sm outline-none cursor-pointer"
              />
            </div>

            {/* Arrow */}
            <span className="text-gray-400 font-medium">→</span>

            {/* To Date */}
            <div
              onClick={() => toDateRef.current?.showPicker()}
              className="relative w-[180px] h-11 flex items-center rounded-xl border border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
            >
              <CalendarDays
                size={16}
                className="absolute left-3 text-gray-400 pointer-events-none"
              />

              <input
                ref={toDateRef}
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full h-full pl-10 pr-3 bg-transparent text-sm outline-none cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSearch}
              className="h-11 px-5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 cursor-pointer"
            >
              Search
            </button>

            <button
              onClick={handleClearFilter}
              className="h-11 px-5 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          {filteredReceipts.length} Receipts
        </p>

        <div className="space-y-4">
          {filteredReceipts.length > 0 ? (
            filteredReceipts.map((item) => (
              <div
                key={item.order_id}
                onClick={() => openDetails(item)}
                className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-blue-300 hover:shadow-md transition"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  {/* Left */}
                  <div className="flex gap-4">
                    <img
                      src={
                        item?.payment?.transaction_screenshot ||
                        "https://via.placeholder.com/150"
                      }
                      alt="receipt"
                      className="w-24 h-24 rounded-xl object-cover border"
                    />

                    <div>
                      <div className="flex flex-wrap gap-2 items-center mb-1">
                        <h2 className="font-semibold text-lg">
                          Order #{item.order_id}
                        </h2>

                        {item?.order?.order_status === "Rejected" ? (
                          <span className="px-3 py-1 rounded-full text-xs bg-red-50 text-red-700 border border-red-200">
                            Rejected
                          </span>
                        ) : item?.payment?.payment_status === true ? (
                          <span className="px-3 py-1 rounded-full text-xs bg-green-50 text-green-700 border border-green-200">
                            Verified
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs bg-yellow-50 text-yellow-700 border border-yellow-200">
                            Pending Verification
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(item?.order?.created_at).toLocaleString()}
                      </p>

                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Building2 size={14} />
                          {item?.user?.business_name}
                          <span>•</span>
                          {item?.address?.full_name}
                        </div>

                        <div className="flex items-center gap-2">
                          <CreditCard size={14} />
                          {item?.payment?.payment_method}
                        </div>

                        <div className="flex items-center gap-2">
                          <Hash size={14} />
                          {item?.payment?.transaction_id}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-xl font-bold text-blue-600">
                      ₹{item?.order?.total_amount}
                    </div>

                    {item?.payment?.payment_status === false &&
                      item?.order?.order_status !== "Rejected" && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal("verify", item);
                            }}
                            className="h-10 px-5 rounded-xl bg-green-600 text-white flex items-center gap-2 hover:bg-green-700 hover:cursor-pointer"
                          >
                            <CheckCircle2 size={16} />
                            Verify
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal("reject", item);
                            }}
                            className="h-10 px-5 rounded-xl border border-red-200 text-red-600 flex items-center gap-2 hover:bg-red-100 hover:text-red-800 hover:border-red-300 hover:cursor-pointer"
                          >
                            <XCircle size={16} />
                            Reject
                          </button>
                        </>
                      )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className=" p-10 text-center">No Receipts Found</div>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">
            <div className="relative z-[101] bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
              <div className="flex justify-center mb-4">
                {actionType === "verify" ? (
                  <CheckCircle2 className="w-14 h-14 text-green-500" />
                ) : (
                  <XCircle className="w-14 h-14 text-red-500" />
                )}
              </div>

              <h2 className="text-xl font-semibold text-center mb-2">
                {actionType === "verify"
                  ? "Verify Payment?"
                  : "Reject Payment?"}
              </h2>

              <p className="text-sm text-gray-500 text-center mb-6">
                {actionType === "verify"
                  ? `Are you sure you want to verify Order #${selectedReceipt?.order_id}?`
                  : `Are you sure you want to reject Order #${selectedReceipt?.order_id}?`}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 h-11 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 hover:cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirmAction}
                  className={`flex-1 h-11 rounded-xl text-white ${
                    actionType === "verify"
                      ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                      : "bg-red-600 hover:bg-red-700 cursor-pointer"
                  }`}
                >
                  {actionType === "verify" ? "Yes, Verify" : "Yes, Reject"}
                </button>
              </div>
            </div>
          </div>
        )}
        {showDetails && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={closeDetails}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full lg:w-[800px] bg-white z-50 shadow-2xl overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b px-5 py-4 flex items-center justify-between z-10">
                <h2 className="text-xl font-semibold">
                  Receipt — Order #{selectedOrder?.order_id}
                </h2>

                <button
                  onClick={closeDetails}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
              </div>

              <div className="p-5">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium mb-5">
                  📷 Receipt Uploaded
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* LEFT */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      Payment Screenshot
                    </h3>

                    <div className="border border-gray-100 rounded-xl p-3">
                      <img
                        src={selectedOrder?.payment?.transaction_screenshot}
                        alt=""
                        className="w-full h-[280px] rounded-lg border border-gray-300 object-cover"
                      />

                      <a
                        href={selectedOrder?.payment?.transaction_screenshot}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 h-10 border border-gray-300 rounded-lg flex items-center justify-center text-sm hover:bg-gray-50"
                      >
                        🔍 View Full Receipt
                      </a>
                    </div>

                    {/* Items */}
                    <div className="mt-5">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Items ({selectedOrder?.products?.length || 0})
                      </h3>

                      <div className="border border-gray-300 rounded-xl overflow-hidden">
                        {selectedOrder?.products?.map((item) => (
                          <div
                            key={item.order_item_id}
                            className="flex justify-between items-center p-3 border-b border-gray-200 last:border-b-0"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={
                                  item?.product?.images?.[0] ||
                                  "https://via.placeholder.com/80?text=Product"
                                }
                                alt={item?.product?.name}
                                className="w-10 h-10 rounded-lg border border-gray-200 object-cover"
                              />

                              <div>
                                <p className="text-sm font-medium">
                                  {item?.product?.name}
                                </p>

                                <p className="text-xs text-gray-500">
                                  Qty × {item?.quantity}
                                </p>
                              </div>
                            </div>

                            <p className="font-semibold text-sm">
                              ₹{Number(item?.price || 0).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div>
                    {/* Order Details */}
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      Order Details
                    </h3>

                    <div className="border border-gray-300 rounded-xl p-4 mb-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Order #</span>
                        <span className="font-medium">
                          {selectedOrder?.order_id}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Date</span>
                        <span>
                          {new Date(
                            selectedOrder?.order?.created_at,
                          ).toLocaleString()}
                        </span>
                      </div>

                      {/* <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>

                <span
  className={`px-2 py-1 rounded-md text-xs ${
    selectedOrder?.order?.order_status === "Rejected"
      ? "bg-red-100 text-red-700"
      : selectedOrder?.payment?.payment_status
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700"
  }`}
>
  {selectedOrder?.order?.order_status}
</span>
              </div> */}

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Payment Mode</span>

                        <span>{selectedOrder?.payment?.payment_method}</span>
                      </div>

                      <hr />

                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>

                        <span className="text-blue-600">
                          ₹ ₹
                          {Number(
                            selectedOrder?.order?.total_amount || 0,
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Customer */}
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      Customer
                    </h3>

                    <div className="border border-gray-300 rounded-xl p-4 mb-4">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          👤
                        </div>

                        <div>
                          <h4 className="font-semibold">
                            {selectedOrder?.user?.username}
                          </h4>

                          <p className="text-sm text-gray-500">
                            {selectedOrder?.user?.business_name}
                          </p>

                          <p className="text-sm text-gray-500">
                            {selectedOrder?.user?.email}
                          </p>

                          <p className="text-sm text-gray-500">
                            {selectedOrder?.address?.mobile_number}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Summary */}
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      Payment Summary
                    </h3>

                    <div className="border border-gray-300   rounded-xl p-4 mb-5 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Method</span>

                        <span>{selectedOrder?.payment?.payment_method}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Transaction ID</span>

                        <span className="break-all text-right max-w-[180px]">
                          {selectedOrder?.payment?.transaction_id}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Status</span>

                        <span
                          className={`px-2 py-1 rounded-md text-xs ${
                            selectedOrder?.payment?.payment_status
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {selectedOrder?.payment?.payment_status
                            ? "Verified"
                            : "Rejected"}
                        </span>
                      </div>

                      <div className="flex justify-between font-semibold">
                        <span>Amount Paid</span>

                        <span>
                          ₹
                          {Number(
                            selectedOrder?.order?.total_amount || 0,
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    {selectedOrder?.payment?.payment_status === false &&
                      selectedOrder?.order?.order_status !== "Rejected" && (
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => {
                              setShowDetails(false);
                              openModal("verify", selectedOrder);
                            }}
                            className="h-11 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700"
                          >
                            ✓ Verify
                          </button>

                          <button
                            onClick={() => {
                              setShowDetails(false);
                              openModal("reject", selectedOrder);
                            }}
                            className="h-11 rounded-lg border border-red-300 text-red-600 text-sm font-medium hover:bg-red-50"
                          >
                            ✕ Reject
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ text, bg, textColor, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-medium border border-gray-200 cursor-pointer ${bg} ${textColor} hover:bg-gray-100 hover:cursor-pointer`}
    >
      {text}
    </button>
  );
}
