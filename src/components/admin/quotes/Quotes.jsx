// src/components/admin/quotes/Quotes.jsx
import { useEffect, useState } from "react";
import {
  Search,
  Download,
  Building2,
  Mail,
  Phone,
  Calendar,
  Clock3,
  FileText,
  Reply,
} from "lucide-react";

import { getLastOrderDetails } from "../../../service/apiNotes";
import { getOrders } from "../../../service/apiOrders";

import * as XLSX from "xlsx";

function Quotes() {
  const [quotes, setQuotes] = useState([]);

  const [search, setSearch] = useState("");

  const [showDetails, setShowDetails] = useState(false);

  const [selectedQuote, setSelectedQuote] = useState(null);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await getLastOrderDetails();

      console.log("API Response:", response);

      if (response.status) {
        const updatedQuotes = response.data.map((quote) => ({
          ...quote,
          status: "Quote Requested",
        }));

        setQuotes(updatedQuotes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrderProducts = async (orderId) => {
  try {
    const token = localStorage.getItem("access");

    const response = await getOrders(token);

    if (response.status) {
      const order = response.data.find(
        (item) => item.id === orderId
      );

      if (order) {
        setProducts(order.products || []);
      } else {
        setProducts([]);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

  const handleRespond = (quote) => {
    const subject = `Quotation Response - Order #${quote.order_id}`;

    const body = `Dear ${quote.company_name},

Thank you for your quotation request.

Order ID: ${quote.order_id}

Your Remarks:
${quote.remarks}

Regards,
Zumia Team`;

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${encodeURIComponent(quote.email)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank");
  };

  const handleExport = () => {
  const exportData = quotes.map((quote) => ({
    "Order ID": quote.order_id,
    "Status": quote.status,
    "Company Name": quote.company_name,
    "Email": quote.email,
    "Mobile": quote.mobile,
    "Remarks": quote.remarks,
    "Date": new Date(quote.created_at).toLocaleDateString("en-IN"),
    "Time": new Date(quote.created_at).toLocaleTimeString("en-IN"),
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Quotes");

  XLSX.writeFile(
    workbook,
    `Quote_Requests_${new Date().toISOString().split("T")[0]}.xlsx`
  );
};

  const handleStatusChange = (orderId) => {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) =>
        quote.order_id === orderId
          ? {
              ...quote,
              status:
                quote.status === "Quote Requested"
                  ? "Responded"
                  : "Quote Requested",
            }
          : quote,
      ),
    );
  };

  const filteredQuotes = quotes.filter((quote) => {
    const keyword = search.toLowerCase();

    return (
      quote.company_name?.toLowerCase().includes(keyword) ||
      quote.email?.toLowerCase().includes(keyword) ||
      quote.mobile?.toLowerCase().includes(keyword) ||
      quote.remarks?.toLowerCase().includes(keyword) ||
      String(quote.order_id).includes(keyword)
    );
  });
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* TOP */}
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between mb-4">
        {/* SEARCH */}
        <div className="flex-1 relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Company, Email, Mobile, Order ID..."
            className="w-full h-[38px] pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-[12px] outline-none"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          <div className="h-[38px] px-4 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-[11px] font-semibold shadow-sm">
            {filteredQuotes.length} Total
          </div>

          <button
  onClick={handleExport}
  className="h-[38px] px-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center gap-2 text-[11px] font-medium hover:bg-gray-50 transition-all duration-300 cursor-pointer"
>
  <Download size={12} />
  Export
</button>
        </div>
      </div>

      {/* QUOTES */}
      <div className="space-y-4">
        {filteredQuotes.map((quote) => (
          <div
            key={quote.id}
            className="bg-white border border-gray-200 rounded-2xl p-4"
          >
            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              {/* LEFT */}
              <div className="flex-1">
                {/* ID */}
                <div className="flex items-center gap-2">
                  <h2 className="text-[22px] font-bold text-black">
                    #{quote.order_id}
                  </h2>

                  <button
                    onClick={() => handleStatusChange(quote.order_id)}
                    className={`px-3 py-1 rounded-full border text-[10px] font-semibold transition-all duration-300 cursor-pointer ${
                      quote.status === "Responded"
                        ? "bg-green-50 border-green-200 text-green-600"
                        : "bg-yellow-50 border-yellow-200 text-yellow-600"
                    }`}
                  >
                    {quote.status}
                  </button>
                </div>

                {/* DATE & TIME */}
                <div className="flex flex-wrap items-center gap-4 mt-2 text-[11px] text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(quote.created_at).toLocaleDateString("en-IN")}
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock3 size={12} />
                    {new Date(quote.created_at).toLocaleTimeString("en-IN")}
                  </div>
                </div>

                {/* COMPANY DETAILS */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 text-[12px] text-gray-700">
                    <Building2 size={13} className="text-[#3164E3]" />
                    <span>{quote.company_name}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[12px] text-gray-700">
                    <Mail size={13} className="text-[#3164E3]" />
                    <span>{quote.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[12px] text-gray-700">
                    <Phone size={13} className="text-[#3164E3]" />
                    <span>{quote.mobile}</span>
                  </div>
                </div>

                {/* REMARKS */}
                <div className="mt-5 rounded-xl border border-gray-200 bg-[#F8F9FB] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={14} className="text-[#3164E3]" />

                    <h3 className="text-[12px] font-semibold text-gray-800">
                      Quote Requested
                    </h3>
                  </div>

                  <p className="text-[12px] text-gray-600 leading-6">
                    {quote.remarks}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex lg:flex-col gap-2 lg:w-[120px]">
                {/* <button className="flex-1 lg:flex-none h-[36px] px-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-center gap-2 text-[11px] font-medium hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                  <Download size={11} />
                  Export
                </button> */}

                <button
                  onClick={() => {
  setSelectedQuote(quote);
  fetchOrderProducts(quote.order_id);
  setShowDetails(true);
}}
                  className="flex-1 lg:flex-none h-[36px] px-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-center gap-2 text-[11px] font-medium hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                >
                  <FileText size={11} />
                  Details
                </button>

                <button
                  onClick={() => handleRespond(quote)}
                  className="flex-1 lg:flex-none h-[36px] px-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-center gap-2 text-[11px] font-medium hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                >
                  <Reply size={11} />
                  Respond
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* OVERLAY */}
      {showDetails && (
        <div
          onClick={() => setShowDetails(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}
      {/* DETAILS SIDEBAR */}
      {showDetails && (
        <div className="fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col">
          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <div>
              <h2 className="text-lg font-bold text-black">Quote Products</h2>

              <p className="text-xs text-gray-500 mt-1">
                Quote #{selectedQuote?.order_id}
              </p>
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all cursor-pointer"
            >
              <FileText size={16} className="hidden" />
              <span className="text-lg">✕</span>
            </button>
          </div>

          {/* PRODUCTS */}
          {products.map((item) => (
  <div
    key={item.order_item_id}
    className="border border-gray-200 rounded-xl p-3 bg-white"
  >
    <div className="flex gap-3">

      {/* IMAGE */}
      <img
        src={
          item.product.images?.[0] ||
          item.product.image ||
          "https://via.placeholder.com/80"
        }
        alt={item.product.name}
        className="w-16 h-16 rounded-lg border object-cover flex-shrink-0"
      />

      {/* DETAILS */}
      <div className="flex-1">

        <h3 className="text-sm font-semibold text-gray-900">
          {item.product.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          Code : {item.product.item_code}
        </p>

        <div className="flex justify-between mt-3">

          <div>
            <p className="text-[11px] text-gray-500">
              Qty
            </p>

            <p className="font-semibold">
              {item.quantity}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[11px] text-gray-500">
              Price
            </p>

            <p className="font-bold text-[#3164E3]">
              ₹{item.price}
            </p>
          </div>

        </div>

      </div>

    </div>
  </div>
))}
          </div>
        
      )}
    </div>
  );
}

export default Quotes;
