import {
  Home,
  User,
} from "lucide-react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import zumialogo from "../assets/zumialogo.png";

import "../App.css";

function Header() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleHomeClick = () => {

    navigate("/");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLoginClick = () => {

    setLoading(true);

    setTimeout(() => {

      navigate("/login/signin");

      setLoading(false);

    }, 1500);
  };

  return (
    <>
      {/* FULL SCREEN LOADER */}
      {loading && (
        <div className="fixed inset-0 z-[9999] bg-white/40 backdrop-blur-xs flex items-center justify-center">

          {/* Loader */}
          <div className="three-body">

            <div className="three-body__dot"></div>

            <div className="three-body__dot"></div>

            <div className="three-body__dot"></div>

          </div>

        </div>
      )}

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

            {/* Login Button */}
            <button
              onClick={handleLoginClick}
              className="group flex items-center gap-2 px-4 py-1.5 bg-white rounded-[10px] shadow-[0_3px_10px_rgba(0,0,0,0.06)] border border-white transition-all duration-300 cursor-pointer"
            >

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
              onClick={handleLoginClick}
              className="flex items-center justify-center w-11 h-11 bg-white rounded-[12px] shadow-[0_3px_10px_rgba(0,0,0,0.06)] border border-white transition-all duration-300"
            >

              <User
                size={18}
                strokeWidth={2.2}
                className="text-black"
              />

            </button>

          </div>

        </div>

      </header>
    </>
  );
}

export default Header;