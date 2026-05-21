import {
  Home,
  User,
  Shield,
  BriefcaseBusiness,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import zumialogo from "../assets/zumialogo.png";

function Header() {
  const [loginDropdown, setLoginDropdown] = useState(false);

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-[999] w-full bg-[#F2F6FA] px-4 sm:px-6 lg:px-10 py-3">

      <div className="flex items-center justify-between">

        {/* Logo */}
        <div>
          <img
            src={zumialogo}
            alt="ZUMIA Logo"
            className="h-10 sm:h-12 object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">

          {/* Home Button */}
          <button
            onClick={handleHomeClick}
            className="group flex items-center gap-2 px-4 py-1.5 bg-white rounded-[10px] shadow-[0_3px_10px_rgba(0,0,0,0.06)] border border-white transition-all duration-300 cursor-pointer"
          >

            <div className="flex items-center justify-center w-6 h-6">
              <Home
                size={16}
                strokeWidth={2.2}
                className="text-black group-hover:text-blue-600 transition-all duration-300"
              />
            </div>

            <span className="text-[13px] font-medium tracking-[0.3px] text-black group-hover:text-blue-600 transition-all duration-300">
              Home
            </span>

          </button>

          {/* Login Dropdown */}
          <div className="relative group">

            {/* Login Button */}
            <button className="group flex items-center gap-2 px-4 py-1.5 bg-white rounded-[10px] shadow-[0_3px_10px_rgba(0,0,0,0.06)] border border-white transition-all duration-300 cursor-pointer">

              <div className="flex items-center justify-center w-6 h-6">
                <User
                  size={16}
                  strokeWidth={2.2}
                  className="text-black group-hover:text-blue-600 transition-all duration-300"
                />
              </div>

              <span className="text-[13px] font-medium tracking-[0.3px] text-black group-hover:text-blue-600 transition-all duration-300">
                Login
              </span>

            </button>

            {/* Desktop Dropdown Menu */}
            <div className="absolute right-0 mt-3 w-[220px] bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.10)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden z-50">

              {/* Customer Login */}
              <button
                onClick={() => navigate("/user")}
                className="flex items-center gap-4 w-full px-5 py-4 hover:bg-gray-50 transition-all duration-200 border-b border-gray-200"
              >
                <User size={20} className="text-blue-600" />

                <span className="text-[14px] font-medium text-gray-900 cursor-pointer">
                  Customer Login
                </span>
              </button>

              {/* Manager Login */}
              <button className="flex items-center gap-4 w-full px-5 py-4 hover:bg-gray-50 transition-all duration-200 border-b border-gray-200">
                <BriefcaseBusiness size={20} className="text-blue-600" />

                <span className="text-[14px] font-medium text-gray-900">
                  Manager Login
                </span>
              </button>

              {/* Account Login */}
              <button className="flex items-center gap-4 w-full px-5 py-4 hover:bg-gray-50 transition-all duration-200">
                <Shield size={20} className="text-blue-600" />

                <span className="text-[14px] font-medium text-gray-900">
                  Account Login
                </span>
              </button>

            </div>

          </div>

        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2 relative">

          {/* Mobile Home Button */}
          <button
            onClick={handleHomeClick}
            className="flex items-center justify-center w-11 h-11 bg-white rounded-[12px] shadow-[0_3px_10px_rgba(0,0,0,0.06)] border border-white transition-all duration-300"
          >

            <Home
              size={18}
              strokeWidth={2.2}
              className="text-black"
            />

          </button>

          {/* Mobile Login Button */}
          <button
            onClick={() => setLoginDropdown(!loginDropdown)}
            className="flex items-center justify-center w-11 h-11 bg-white rounded-[12px] shadow-[0_3px_10px_rgba(0,0,0,0.06)] border border-white transition-all duration-300"
          >

            <User
              size={18}
              strokeWidth={2.2}
              className="text-black"
            />

          </button>

          {/* Mobile Dropdown */}
          {loginDropdown && (
            <div className="absolute top-[58px] right-0 w-[220px] bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.10)] border border-gray-100 overflow-hidden z-50">

              {/* Customer Login */}
              <button
                onClick={() => navigate("/user")}
                className="flex items-center gap-4 w-full px-5 py-4 hover:bg-gray-50 transition-all duration-200 border-b border-gray-200"
              >
                <User size={20} className="text-blue-600" />

                <span className="text-[15px] font-medium text-gray-900">
                  Customer Login
                </span>
              </button>

              {/* Manager Login */}
              <button className="flex items-center gap-4 w-full px-5 py-4 hover:bg-gray-50 transition-all duration-200 border-b border-gray-200">
                <BriefcaseBusiness size={20} className="text-blue-600" />

                <span className="text-[15px] font-medium text-gray-900">
                  Manager Login
                </span>
              </button>

              {/* Account Login */}
              <button className="flex items-center gap-4 w-full px-5 py-4 hover:bg-gray-50 transition-all duration-200">
                <Shield size={20} className="text-blue-600" />

                <span className="text-[15px] font-medium text-gray-900">
                  Account Login
                </span>
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Header;