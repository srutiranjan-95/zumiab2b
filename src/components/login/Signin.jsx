// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

import {
  Mail,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  X,
  Loader2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  handleSignin,
  verifyOtp,
} from "../../service/apiAuth";

export default function SignInPage() {

  const [otpSent, setOtpSent] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [emailError, setEmailError] =
    useState("");

  const [otpError, setOtpError] =
    useState("");

  const [apiError, setApiError] =
    useState("");

  const [loadingOtp, setLoadingOtp] =
    useState(false);

  const [loadingLogin, setLoadingLogin] =
    useState(false);

  const [loadingResend, setLoadingResend] =
    useState(false);

  const navigate = useNavigate();

  // EMAIL VALIDATION
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );
  };

  // SEND OTP
  const handleSendOtp = async () => {

    if (!validateEmail(email)) {

      setEmailError(
        "Please enter a valid email address"
      );

      return;
    }

    setEmailError("");

    setApiError("");

    setLoadingOtp(true);

    try {

      const payload = {
        email,
      };

      // API CALL
      const response =
        await handleSignin(payload);

      console.log(response.data);

      // SUCCESS
      setOtpSent(true);

    } catch (error) {

      console.log(error);

      const message =
        error?.response?.data?.message;

      // ACCOUNT UNDER REVIEW
           // ACCOUNT UNDER REVIEW
      if (
        message ===
        "Your account is under review. Please wait for admin approval."
      ) {

        setApiError(
          "Your account is under review. Please wait for admin approval."
        );

      }

      // ACCOUNT REJECTED
      else if (
        message ===
        "Your request has been rejected"
      ) {

        setApiError(
          "Your request has been rejected by admin. Please contact support for more information."
        );

      }

      // EMAIL NOT EXISTS
      else if (
        message ===
        "Email not exists !!"
      ) {

        setApiError(
          "This email does not exist in our accounts. Please check and try again."
        );

      }

      // OTHER ERROR
      else {

        setApiError(
          "Something went wrong"
        );

      }

    } finally {

      setLoadingOtp(false);

    }
  };

  // RESEND OTP
  const handleResendOtp = async () => {

    setLoadingResend(true);

    try {

      const payload = {
        email,
      };

      // API CALL
      const response =
        await handleSignin(payload);

      console.log(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoadingResend(false);

    }
  };

  // LOGIN FUNCTION
  const handleLogin = async () => {

    // OTP VALIDATION
    if (otp.length !== 4) {

      setOtpError(
        "OTP must be 4 digits"
      );

      return;
    }

    setOtpError("");

    setLoadingLogin(true);

    try {

      const payload = {
        otp,
      };

      // API CALL
      const response =
        await verifyOtp(payload);

      console.log(response.data);

      const data = response.data;

      // SAVE TOKENS
      localStorage.setItem(
        "access",
        data.access
      );

      localStorage.setItem(
        "refresh",
        data.refresh
      );

      // SAVE USER DATA
      localStorage.setItem(
        "email",
        data.email
      );

      localStorage.setItem(
        "permission",
        data.permission
      );

      localStorage.setItem(
        "image",
        data.image
      );

      // ROLE BASED REDIRECT
      if (
        data.permission === "admin"
      ) {

        navigate(
          "/admin/dashboard"
        );

      } else {

        navigate("/user");

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoadingLogin(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef5ff] via-[#f8fbff] to-[#dcecff] flex items-center justify-center p-4">

      <div className="relative w-full max-w-5xl bg-white rounded-[30px] overflow-hidden shadow-[0_20px_60px_rgba(37,99,235,0.15)] border border-blue-100 grid grid-cols-1 md:grid-cols-2">

        {/* Close Button */}
        <button
          onClick={() =>
            navigate("/")
          }
          className="absolute top-5 right-5 z-50 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-blue-100 flex items-center justify-center shadow-lg hover:bg-blue-50 transition-all"
        >
          <X
            size={18}
            className="text-gray-700"
          />
        </button>

        {/* Left Section */}
        <div className="p-7 md:p-10 flex flex-col justify-center bg-white">

          <h1 className="text-[11px] tracking-[4px] font-semibold text-blue-700 mb-10 uppercase">
            Zumia B2B
          </h1>

          <div className="mb-7">

            <h2 className="text-[24px] font-semibold text-[#111827] mb-1">
              Welcome back
            </h2>

            <p className="text-[12px] text-gray-500">
              Login to your account
              using OTP
            </p>

          </div>

          <div className="space-y-4">

            {/* Email */}
            <div>

              <label className="text-[11px] text-gray-600 mb-1 block">
                Email
              </label>

              <div
                className={`h-10 bg-[#f8fbff] rounded-xl border flex items-center px-3 transition-all focus-within:ring-2 ${
                  emailError ||
                  apiError
                    ? "border-red-400 focus-within:ring-red-100"
                    : "border-blue-100 focus-within:border-blue-500 focus-within:ring-blue-100"
                }`}
              >

                <Mail
                  size={15}
                  className="text-blue-500"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {

                    setEmail(
                      e.target.value
                    );

                    setEmailError("");

                    setApiError("");

                  }}
                  className="w-full bg-transparent outline-none text-[12px] px-2 text-gray-700 placeholder:text-gray-400"
                />

              </div>

              {/* EMAIL ERROR */}
              {emailError && (

                <p className="text-[11px] text-red-500 mt-1">
                  {emailError}
                </p>

              )}

              {/* API ERROR */}
              {apiError && (

                <p className="text-[11px] text-red-500 mt-1">
                  {apiError}
                </p>

              )}

            </div>

            {/* OTP */}
            {otpSent && (

              <div>

                <label className="text-[11px] text-gray-600 mb-1 block">
                  Enter OTP
                </label>

                <div
                  className={`h-10 bg-[#f8fbff] rounded-xl border flex items-center px-3 transition-all focus-within:ring-2 ${
                    otpError
                      ? "border-red-400 focus-within:ring-red-100"
                      : "border-blue-100 focus-within:border-blue-500 focus-within:ring-blue-100"
                  }`}
                >

                  <ShieldCheck
                    size={15}
                    className="text-blue-500"
                  />

                  <input
                    type="text"
                    placeholder="0000"
                    value={otp}
                    maxLength={4}
                    onChange={(e) => {

                      const value =
                        e.target.value.replace(
                          /\D/g,
                          ""
                        );

                      setOtp(value);

                      setOtpError("");

                    }}
                    className="w-full bg-transparent outline-none text-[12px] tracking-[10px] px-2 text-gray-700 placeholder:text-gray-400"
                  />

                </div>

                {otpError && (

                  <p className="text-[11px] text-red-500 mt-1">
                    {otpError}
                  </p>

                )}

                <div className="flex items-center justify-between mt-2">

                  <p className="text-[11px] text-gray-500">
                    OTP sent to your
                    email
                  </p>

                  <button
                    onClick={
                      handleResendOtp
                    }
                    disabled={
                      loadingResend
                    }
                    className="text-[11px] text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 disabled:opacity-70"
                  >

                    {loadingResend ? (
                      <>

                        <Loader2
                          size={12}
                          className="animate-spin"
                        />

                        Sending...

                      </>
                    ) : (
                      "Resend"
                    )}

                  </button>

                </div>

              </div>

            )}

            {/* Button */}
            {!otpSent ? (

              <button
                onClick={
                  handleSendOtp
                }
                disabled={
                  loadingOtp
                }
                className="w-full h-10 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all text-white text-[12px] font-medium flex items-center justify-center gap-2 mt-2 shadow-lg shadow-blue-200 disabled:opacity-70"
              >

                {loadingOtp ? (
                  <>

                    <Loader2
                      size={15}
                      className="animate-spin"
                    />

                    Sending...

                  </>
                ) : (
                  <>

                    Send OTP

                    <ArrowRight
                      size={15}
                    />

                  </>
                )}

              </button>

            ) : (

              <button
                onClick={
                  handleLogin
                }
                disabled={
                  loadingLogin
                }
                className="w-full h-10 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all text-white text-[12px] font-medium flex items-center justify-center gap-2 mt-2 shadow-lg shadow-blue-200 disabled:opacity-70"
              >

                {loadingLogin ? (
                  <>

                    <Loader2
                      size={15}
                      className="animate-spin"
                    />

                    Verifying...

                  </>
                ) : (
                  <>

                    Verify & Login

                    <CheckCircle2
                      size={15}
                    />

                  </>
                )}

              </button>

            )}

            {/* Footer */}
            <p className="text-center text-[11px] text-gray-500 pt-2">

              Don’t have an
              account?{" "}

              <span
                onClick={() =>
                  navigate(
                    "/login/signup"
                  )
                }
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Sign up
              </span>

            </p>

          </div>

        </div>

        {/* Right Section */}
        <div className="hidden md:block relative">

          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
            alt="Interior"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-blue-900/10" />

          {/* Glow Effects */}
          <div className="absolute top-16 left-14 w-44 h-44 bg-blue-300/30 blur-3xl rounded-full" />

          <div className="absolute bottom-10 right-10 w-36 h-36 bg-cyan-200/30 blur-3xl rounded-full" />

          {/* Floating Card */}
          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-white/40">

            <p className="text-[11px] text-gray-500 mb-1">
              Trusted by
            </p>

            <h3 className="text-[18px] font-semibold text-[#111827]">
              200+ Businesses
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}