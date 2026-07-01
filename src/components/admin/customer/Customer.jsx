// src/components/admin/customer/Customer.jsx

import { useEffect, useState } from "react";

import {
  ChevronRight,
  Download,
  Phone,
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
  Mail,
  Building2,
  Tag,
  CreditCard,
  X,
  Loader2,
} from "lucide-react";

import { getAllUsers, updateUserStatus } from "../../../service/apiCustomer";

function Customer() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [showVisitingCard, setShowVisitingCard] = useState(false);

  const [approveLoading, setApproveLoading] = useState(false);

  const [rejectLoading, setRejectLoading] = useState(false);

  const [customers, setCustomers] = useState([]);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState(null);

  // FILTER STATE
  const [filterStatus, setFilterStatus] = useState("all");

  const limit = 10;

  const exportToCSV = async () => {
    try {
      const response = await getAllUsers(1, 10000, filterStatus);

      const users = response?.data?.data || [];

      const csvData = users.map((user) => ({
        ID: user.id,
        Name: user.username || "",
        Email: user.email || "",
        Phone: user.mobile || "",
        Company: user.business_name || "",
        Category: user.business_category || "",
        Location: user.location || "",
        Status: user.status || "",
        Registered: user.created_at || "",
      }));

      const headers = Object.keys(csvData[0]).join(",");

      const rows = csvData.map((row) =>
        Object.values(row)
          .map((value) => `"${value}"`)
          .join(","),
      );

      const csvContent = [headers, ...rows].join("\n");

      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      const link = document.createElement("a");

      link.href = URL.createObjectURL(blob);

      link.download = `customers_${new Date().toISOString().split("T")[0]}.csv`;

      link.click();
    } catch (error) {
      console.error("Export Error:", error);
    }
  };

  // ================= GET USERS =================

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers(page, limit, filterStatus);

      const users = response?.data?.data || [];

      setPagination(response?.data?.pagination);

      const formattedUsers = users.map((user) => ({
        id: user.id,

        name: user.username || "No Name",

        email: user.email || "No Email",

        phone: user.mobile || "",

        location: user.location || "",

        category: user.business_category || "",

        registered: user.created_at || "",

        company: user.business_name || "",

        role: user.role || "Customer",

        status: user.status
          ? user.status.charAt(0).toUpperCase() + user.status.slice(1)
          : "Pending",

        // REMOVE IMAGE FROM PROFILE
        image: null,

        // VISITING CARD IMAGE
        visitingCard: user.image || null,

        statusColor:
          user.status === "approved"
            ? "bg-green-50 text-green-600 border-green-200"
            : user.status === "rejected"
              ? "bg-red-50 text-red-500 border-red-200"
              : "bg-yellow-50 text-yellow-600 border-yellow-200",
      }));

      setCustomers(formattedUsers);
    } catch (error) {
      console.error("Fetch Users Error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, filterStatus]);

  // ================= APPROVE CUSTOMER =================

  const handleApprove = async () => {
    try {
      setApproveLoading(true);

      await updateUserStatus(selectedCustomer.id, "approved");

      const updatedCustomers = customers.map((customer) => {
        if (customer.id === selectedCustomer.id) {
          return {
            ...customer,
            status: "Approved",
            statusColor: "bg-green-50 text-green-600 border-green-200",
          };
        }

        return customer;
      });

      setCustomers(updatedCustomers);

      setSelectedCustomer({
        ...selectedCustomer,
        status: "Approved",
        statusColor: "bg-green-50 text-green-600 border-green-200",
      });
    } catch (error) {
      console.error("Approve Error:", error);
    } finally {
      setApproveLoading(false);
    }
  };

  // ================= REJECT CUSTOMER =================

  const handleReject = async () => {
    try {
      setRejectLoading(true);

      await updateUserStatus(selectedCustomer.id, "rejected");

      const updatedCustomers = customers.map((customer) => {
        if (customer.id === selectedCustomer.id) {
          return {
            ...customer,
            status: "Rejected",
            statusColor: "bg-red-50 text-red-500 border-red-200",
          };
        }

        return customer;
      });

      setCustomers(updatedCustomers);

      setSelectedCustomer({
        ...selectedCustomer,
        status: "Rejected",
        statusColor: "bg-red-50 text-red-500 border-red-200",
      });
    } catch (error) {
      console.error("Reject Error:", error);
    } finally {
      setRejectLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F7F8FA]">
      {/* TOP */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => {
              setPage(1);

              setFilterStatus(e.target.value);
            }}
            className="h-[36px] px-3 rounded-xl border border-gray-200 bg-white text-[12px] outline-none cursor-pointer"
          >
            <option value="all">All</option>

            <option value="approved">Approved</option>

            <option value="pending">Pending</option>

            {/* <option value="rejected">
              Rejected
            </option> */}
          </select>

          <p className="text-[12px] text-gray-500">
            {pagination?.total_users || customers.length} customers
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="h-[36px] px-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center gap-2 text-[11px] font-medium hover:bg-gray-50 transition-all duration-300"
        >
          <Download size={13} />
          Export CSV
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {customers.map((customer, index) => (
          <div
            key={index}
            onClick={() => setSelectedCustomer(customer)}
            className="bg-white border border-gray-200 rounded-2xl px-4 py-4 hover:shadow-sm transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              {/* LEFT */}
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {/* AVATAR */}
                <div className="w-9 h-9 rounded-full bg-[#EEF2FF] overflow-hidden flex items-center justify-center text-[#3164E3] text-[12px] font-bold shrink-0">
                  {customer.name.charAt(0)}
                </div>

                {/* CONTENT */}
                <div className="min-w-0">
                  {/* TOP */}
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-[15px] font-semibold text-black truncate">
                      {customer.name}
                    </h2>

                    {customer.status && (
                      <div
                        className={`h-[22px] px-2 rounded-full border flex items-center gap-1 text-[10px] font-medium ${customer.statusColor}`}
                      >
                        {customer.status === "Approved" ? (
                          <CheckCircle2 size={10} />
                        ) : customer.status === "Pending" ? (
                          <Clock3 size={10} />
                        ) : (
                          <XCircle size={10} />
                        )}

                        {customer.status}
                      </div>
                    )}
                  </div>

                  {/* EMAIL */}
                  <p className="text-[12px] text-gray-500 mt-1 break-all">
                    {customer.email}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              {/* RIGHT */}
              <div
                className="flex items-center gap-2 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                {customer.status === "Pending" && (
                  <>
                    <button
                      onClick={async () => {
                        try {
                          await updateUserStatus(customer.id, "approved");

                          fetchUsers();
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                      className="h-[30px] px-3 rounded-lg bg-green-600 hover:bg-green-700 text-white text-[11px] font-medium flex items-center gap-1"
                    >
                      <CheckCircle2 size={12} />
                      Approve
                    </button>

                    <button
                      onClick={async () => {
                        try {
                          await updateUserStatus(customer.id, "rejected");

                          fetchUsers();
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                      className="h-[30px] px-3 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[11px] font-medium flex items-center gap-1"
                    >
                      <XCircle size={12} />
                      Reject
                    </button>
                  </>
                )}

                <button
                  onClick={() => setSelectedCustomer(customer)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  <ChevronRight size={15} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          disabled={!pagination?.has_previous}
          onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
          className="h-[36px] px-4 rounded-xl border border-gray-200 bg-white text-[12px] font-medium disabled:opacity-50"
        >
          Previous
        </button>

        <div className="h-[36px] min-w-[36px] px-3 rounded-xl bg-[#3164E3] text-white flex items-center justify-center text-[12px] font-medium">
          {pagination?.current_page || page}
        </div>

        <button
          disabled={!pagination?.has_next}
          onClick={() => setPage((prev) => prev + 1)}
          className="h-[36px] px-4 rounded-xl border border-gray-200 bg-white text-[12px] font-medium disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-all duration-300 ${
          selectedCustomer ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSelectedCustomer(null)}
      ></div>

      {/* SLIDE PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[390px] bg-white z-50 shadow-2xl transition-all duration-500 overflow-y-auto
        ${selectedCustomer ? "translate-x-0" : "translate-x-full"}`}
      >
        {selectedCustomer && (
          <div className="p-5">
            {/* TOP */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-[#EEF2FF] overflow-hidden flex items-center justify-center text-[#3164E3] text-[14px] font-bold">
                  {selectedCustomer.name.charAt(0)}
                </div>

                <div>
                  <h2 className="text-[20px] font-semibold leading-tight">
                    {selectedCustomer.name}
                  </h2>

                  <div
                    className={`mt-2 inline-flex items-center gap-1 h-[22px] px-2 rounded-full border text-[10px] font-medium ${selectedCustomer.statusColor}`}
                  >
                    {selectedCustomer.status === "Approved" ? (
                      <CheckCircle2 size={10} />
                    ) : selectedCustomer.status === "Pending" ? (
                      <Clock3 size={10} />
                    ) : (
                      <XCircle size={10} />
                    )}

                    {selectedCustomer.status}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all duration-300"
              >
                <X size={15} />
              </button>
            </div>

            {/* ACTION BUTTONS */}
            {selectedCustomer.status === "Pending" && (
              <div className="grid grid-cols-2 gap-3 mt-5">
                {/* APPROVE */}
                <button
                  onClick={handleApprove}
                  disabled={approveLoading}
                  className="h-[42px] rounded-2xl bg-green-600 hover:bg-green-700 text-white text-[12px] font-medium flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70"
                >
                  {approveLoading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Approving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={14} />
                      Approve
                    </>
                  )}
                </button>

                {/* REJECT */}
                <button
                  onClick={handleReject}
                  disabled={rejectLoading}
                  className="h-[42px] rounded-2xl bg-red-500 hover:bg-red-600 text-white text-[12px] font-medium flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70"
                >
                  {rejectLoading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Rejecting...
                    </>
                  ) : (
                    <>
                      <XCircle size={14} />
                      Reject
                    </>
                  )}
                </button>
              </div>
            )}

            {/* DETAILS */}
            <div className="mt-6">
              <h3 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide">
                Customer Details
              </h3>

              <div className="mt-4 space-y-3">
                {[
                  {
                    icon: <Mail size={15} />,
                    label: "Email",
                    value: selectedCustomer.email,
                  },
                  {
                    icon: <Phone size={15} />,
                    label: "Phone",
                    value: selectedCustomer.phone || "N/A",
                  },
                  {
                    icon: <Building2 size={15} />,
                    label: "Company",
                    value: selectedCustomer.company || "N/A",
                  },
                  {
                    icon: <Tag size={15} />,
                    label: "Business Category",
                    value: selectedCustomer.category || "N/A",
                  },
                  {
                    icon: <CalendarDays size={15} />,
                    label: "Registered",
                    value: new Date(
                      selectedCustomer.registered,
                    ).toLocaleString(),
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#F8F9FC] rounded-2xl p-3 flex items-start gap-3"
                  >
                    <div className="text-gray-500 mt-0.5">{item.icon}</div>

                    <div>
                      <p className="text-[11px] text-gray-500">{item.label}</p>

                      <h3 className="text-[14px] font-medium mt-1 break-all text-black">
                        {item.value}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* BUTTON */}
              <button
                onClick={() => setShowVisitingCard(true)}
                className="mt-4 h-[44px] w-full rounded-2xl border border-blue-200 bg-blue-50 text-blue-600 text-[13px] font-medium flex items-center justify-center gap-2 hover:bg-blue-100 transition-all duration-300"
              >
                <CreditCard size={15} />
                View Visiting Card
              </button>
            </div>
          </div>
        )}
      </div>

      {/* VISITING CARD MODAL */}
      {showVisitingCard && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setShowVisitingCard(false)}
        >
          <div
            className="relative bg-white rounded-3xl p-3 max-w-[320px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVisitingCard(false)}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <X size={14} />
            </button>

            {selectedCustomer?.visitingCard ? (
              <img
                src={selectedCustomer.visitingCard}
                alt="Visiting Card"
                className="w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="h-[220px] flex items-center justify-center text-gray-500 text-[13px]">
                No Visiting Card Available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Customer;
