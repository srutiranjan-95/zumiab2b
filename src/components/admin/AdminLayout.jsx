// src/components/admin/AdminLayout.jsx

import { useState } from "react";

import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  Package,
  ShoppingBag,
  FileText,
  ChevronDown,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [openProfile, setOpenProfile] = useState(false);

  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const userEmail = localStorage.getItem("email");

  const tabs = [
    {
      icon: <LayoutDashboard size={15} />,
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: <Users size={15} />,
      name: "Customers",
      path: "/admin/customer",
    },
    {
      icon: <Package size={15} />,
      name: "Products",
      path: "/admin/product",
    },
    {
      icon: <ShoppingBag size={15} />,
      name: "Orders",
      path: "/admin/orders",
    },
    {
      icon: <FileText size={15} />,
      name: "Quotes",
      path: "/admin/quotes",
    },
    {
      icon: <FileText size={15} />,
      name: "Receipts",
      path: "/admin/receipts",
    },
  ];

  /* LOGOUT FUNCTION */
  const handleLogout = () => {
    // REMOVE TOKEN OR USER DATA
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("permission");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("image");

    // REDIRECT HOME PAGE
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      {/* Header */}
      <header className="h-[58px] bg-white border-b border-gray-200 px-5 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* <h1 className="text-[24px] font-black tracking-tight leading-none">
            ZUMIA
          </h1> */}

          <div className="flex items-center gap-1.5 bg-[#edf4ff] text-blue-600 px-3 py-1 rounded-full text-[12px] font-semibold">
            <ShieldCheck size={13} />
            Admin
          </div>
        </div>

        {/* Right */}
        <div
          className="relative"
          onMouseEnter={() => setOpenProfile(true)}
          onMouseLeave={() => setOpenProfile(false)}
        >
          {/* PROFILE BUTTON */}
          <button className="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:cursor-pointer">
            <div className="text-right min-w-[220px]">
              <h3 className="text-[13px] font-semibold text-black leading-tight break-all">
                {userEmail}
              </h3>

              <p className="flex items-center justify-end gap-1 text-[11px] text-blue-600 mt-1">
                <ShieldCheck size={11} />
                Admin
              </p>
            </div>

            <ChevronDown
              size={15}
              className={`text-gray-500 transition-all duration-300 ${
                openProfile ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* DROPDOWN */}
          <div
            className={`absolute right-0 top-[58px] w-[270px] bg-white border border-gray-200 rounded-[24px] shadow-xl overflow-hidden transition-all duration-300 origin-top z-50 ${
              openProfile
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-2"
            }`}
          >
            {/* TOP */}
            <div className="px-6 py-5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                Signed In As
              </p>

              <h2 className="text-[15px] font-bold text-black mt-3 break-all">
                {userEmail}
              </h2>

              <p className="flex items-center gap-1 text-[12px] text-blue-600 mt-2">
                <ShieldCheck size={12} />
                Admin
              </p>
            </div>

            {/* SETTINGS */}
            {/* <button className="w-full h-[58px] px-6 border-t border-gray-200 flex items-center gap-4 text-[13px] font-medium text-gray-800 hover:bg-gray-50 transition-all duration-300">
              <Settings size={18} className="text-gray-500" />
              Settings
            </button> */}

            {/* LOGOUT */}
            <button
              onClick={() => setOpenLogoutModal(true)}
              className="w-full h-[58px] px-6 border-t border-gray-200 flex items-center gap-4 text-[13px] font-medium text-red-500 hover:bg-red-50 transition-all duration-300"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="px-5 py-6">
        {/* Hero Section */}
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-[44px] h-[44px] rounded-2xl bg-[#edf4ff] flex items-center justify-center shrink-0">
            <ShieldCheck className="text-blue-600" size={24} />
          </div>

          {/* Text */}
          <div>
            <h1 className="text-[24px] sm:text-[30px] font-bold tracking-tight leading-tight text-black">
              Admin Dashboard
            </h1>

            <p className="text-[14px] text-gray-500 mt-1">
              Manage customers, products, orders, and quotes
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-7">
          <div className="inline-flex flex-wrap items-center gap-2 bg-[#e9eef5] p-1.5 rounded-2xl">
            {tabs.map((item, i) => (
              <button
                key={i}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[13px] font-medium cursor-pointer transition-all duration-300
                ${
                  location.pathname === item.path
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-500 hover:bg-white"
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Page Content */}
        <div className="mt-6">
          <Outlet />
        </div>
      </div>

      {/* LOGOUT MODAL */}
      {openLogoutModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="w-full max-w-[360px] bg-white rounded-3xl shadow-2xl p-6 relative">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpenLogoutModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition-all duration-300"
            >
              <X size={18} />
            </button>

            {/* ICON */}
            <div className="h-14 w-14 rounded-full bg-red-100 flex items-center justify-center mx-auto">
              <LogOut size={26} className="text-red-500" />
            </div>

            {/* TEXT */}
            <div className="text-center mt-5">
              <h2 className="text-[18px] font-bold text-black">
                Logout Account?
              </h2>

              <p className="text-[13px] text-gray-500 mt-2 leading-relaxed">
                Are you sure you want to logout from your admin account?
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setOpenLogoutModal(false)}
                className="flex-1 h-[42px] rounded-xl border border-gray-200 text-[13px] font-medium hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 h-[42px] rounded-xl bg-red-500 text-white text-[13px] font-medium hover:bg-red-600 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
