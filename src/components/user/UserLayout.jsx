import {
  ShoppingCart,
  ChevronDown,
  ShieldCheck,
  LogOut,
  X,
} from "lucide-react";
import { useCartWebSocket } from "../context/WebSocket";
import { getCartItems } from "../../service/apiCart";

import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { useState, useEffect } from "react";

import "../../App.css";

import zumialogo from "../../assets/zumialogo.png";

function UserLayout() {
  const [showDropdown, setShowDropdown] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [cartCount, setCartCount] = useState(0);

  const [animateBadge, setAnimateBadge] = useState(false);

  const fetchCartCount = async () => {
    try {
      const response = await getCartItems();

      setCartCount(response?.total_items || 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  useEffect(() => {
    if (cartCount > 0) {
      setAnimateBadge(true);

      const timer = setTimeout(() => {
        setAnimateBadge(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const navigate = useNavigate();

  const { addCartMessageHandler } = useCartWebSocket();

  useEffect(() => {
    const removeHandler = addCartMessageHandler((data) => {
      console.log("HEADER RECEIVED:", data);

      if (data.type === "cart_count") {
        setCartCount(data.count);
      }
    });

    return () => {
      removeHandler();
    };
  }, [addCartMessageHandler]);
  const handleLogout = () => {
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartCount");

    navigate("/");
  };

  const handleNavigation = (path) => {
    setLoading(true);

    setTimeout(() => {
      navigate(path);

      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#F2F6FA] border-b border-gray-200 px-3 sm:px-5 lg:px-6 py-2.5">
        <div className="flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3 lg:gap-6">
            {/* LOGO */}
            <img
              src={zumialogo}
              alt="logo"
              className="h-7 sm:h-8 object-contain"
            />

            {/* NAVIGATION */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => handleNavigation("/user/products")}
                className={`px-4 py-2 rounded-xl font-semibold text-xs lg:text-sm cursor-pointer transition-all duration-300 ${
                  location.pathname === "/user/products" ||
                  location.pathname === "/user"
                    ? "bg-[#DDE7FF] text-[#3164E3]"
                    : "text-black hover:bg-white"
                }`}
              >
                Products
              </button>

              <button
                onClick={() => handleNavigation("/user/orders")}
                className={`px-4 py-2 rounded-xl font-semibold text-xs lg:text-sm cursor-pointer transition-all duration-300 ${
                  location.pathname === "/user/orders" ||
                  location.pathname === "/user"
                    ? "bg-[#DDE7FF] text-[#3164E3]"
                    : "text-black hover:bg-white"
                }`}
              >
                My Orders
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* CART */}
            <div
              onClick={() => handleNavigation("/user/cart")}
              className={`relative cursor-pointer p-2 rounded-xl transition-all duration-300 ${
                location.pathname === "/user/cart"
                  ? "bg-[#DDE7FF]"
                  : "hover:bg-white"
              }`}
            >
              {cartCount > 0 && (
                <span
                  className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center z-10 ${
                    animateBadge ? "cart-badge-pop" : ""
                  }`}
                >
                  {cartCount}
                </span>
              )}

              <ShoppingCart
                size={20}
                className={`transition-all duration-300 ${
                  location.pathname === "/user/cart"
                    ? "text-[#3164E3]"
                    : "text-black"
                }`}
              />
            </div>

            {/* USER DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              {/* USER BUTTON */}
              <button className="hidden sm:flex items-center gap-2 cursor-pointer">
                <div>
                  <h3 className="text-xs lg:text-sm font-semibold">
  {localStorage.getItem("name") }
</h3>

                  <div className="flex items-center gap-1 text-[#3164E3]">
                    <ShieldCheck size={10} />

                    <span className="text-[10px] font-medium">Customer</span>
                  </div>
                </div>

                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-all duration-300 ease-in-out ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* DROPDOWN */}
              <div
                className={`absolute right-0 top-[44px] w-[270px] bg-white rounded-[22px] shadow-[0_15px_40px_rgba(0,0,0,0.10)] border border-gray-200 overflow-hidden z-50 transition-all duration-300 ease-in-out origin-top ${
                  showDropdown
                    ? "opacity-100 visible translate-y-0 scale-100"
                    : "opacity-0 invisible -translate-y-2 scale-95"
                }`}
              >
                {/* TOP */}
                <div className="px-5 py-4">
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wide">
                    Signed In As
                  </p>

                  <h2 className="mt-2 text-[14px] font-bold text-black">
                    {localStorage.getItem("name")}
                  </h2>

                  <div className="mt-1 flex items-center gap-1 text-[#3164E3]">
                    <ShieldCheck size={13} />

                    <span className="text-[13px] font-medium">Customer</span>
                  </div>
                </div>

                {/* BORDER */}
                <div className="border-t border-gray-200" />

                {/* LOGOUT */}
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full px-5 py-4 flex items-center gap-3 text-[#FF4D4F] hover:bg-red-50 transition-all duration-300 cursor-pointer"
                >
                  <LogOut size={14} />

                  <span className="text-[13px] font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="pt-[75px] px-3 sm:px-5 lg:px-6 py-5">
        <Outlet />
      </main>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-[340px] bg-white rounded-[26px] p-5 shadow-2xl transition-all duration-300 scale-100">
            {/* TOP */}
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-black">Logout</h2>

              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all duration-300 cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* TEXT */}
            <p className="text-[12px] text-gray-500 leading-6 mt-3">
              Are you sure you want to logout from your account?
            </p>

            {/* BUTTONS */}
            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="h-[42px] rounded-2xl border border-gray-200 text-[12px] font-semibold hover:bg-gray-100 transition-all duration-300 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="h-[42px] rounded-2xl bg-red-500 hover:bg-red-600 text-white text-[12px] font-semibold transition-all duration-300 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 z-[9999] bg-white/40 backdrop-blur-xs flex items-center justify-center">
          <div className="three-body">
            <div className="three-body__dot"></div>

            <div className="three-body__dot"></div>

            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserLayout;
