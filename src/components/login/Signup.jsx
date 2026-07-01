/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import {
  ArrowLeft,
  X,
  Mail,
  User,
  Phone,
  Building2,
  BriefcaseBusiness,
  Upload,
  Loader2,
  Clock3,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { handleSignup } from "../../service/apiAuth";
import signupimg from "../../assets/signupimg.png";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    businessName: "",
    businessCategory: "",
    customBusinessCategory: "",
    gst_number: "",
    mobile: "",
    visitingCard: null,
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // REMOVE ERROR WHILE TYPING
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // SUBMIT BUTTON
  const handleSubmit = async () => {
    let newErrors = {};

    // EMAIL
    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    // FIRST NAME
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }

    // LAST NAME
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    // BUSINESS NAME
    if (!formData.businessName) {
      newErrors.businessName = "Business name is required";
    }

    // CATEGORY
    if (!formData.businessCategory) {
      newErrors.businessCategory = "Business category is required";
    }

    if (
      formData.businessCategory === "Other" &&
      !formData.customBusinessCategory.trim()
    ) {
      newErrors.customBusinessCategory = "Please enter your business category";
    }

    // GST VALIDATION  <-- ADD HERE
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

    if (!formData.gst_number) {
  newErrors.gst_number = "GST Number is required";
} else if (!gstRegex.test(formData.gst_number.toUpperCase())) {
  newErrors.gst_number = "Invalid GST Number";
}
    // MOBILE
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    }

    // STOP IF ERROR
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    setErrors({});

    setLoading(true);

    try {
      const payload = {
        username: `${formData.firstName} ${formData.lastName}`,

        mobile: formData.mobile,

        email: formData.email,

        business_name: formData.businessName,

        business_category:
          formData.businessCategory === "Other"
            ? formData.customBusinessCategory
            : formData.businessCategory,
        gst_number: formData.gst_number,
        image: formData.visitingCard,
      };

      // SIGNUP API
      console.log("Payload =>", payload);
      const response = await handleSignup(payload);

      console.log(response.data);

      // SUCCESS PAGE
      setApplicationSubmitted(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // SIGN OUT
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f3f5f9] flex items-center justify-center p-3 sm:p-5">
      {/* REVIEW PAGE */}
      {applicationSubmitted ? (
        <div className="w-full max-w-[480px] bg-white rounded-[28px] border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-5 sm:p-7">
          {/* ICON */}
          <div className="w-20 h-20 rounded-full bg-[#fff7e8] flex items-center justify-center mx-auto">
            <Clock3 size={34} className="text-[#e0a800]" />
          </div>

          {/* HEADING */}
          <div className="text-center mt-6">
            <h1 className="text-[26px] font-bold text-black">
              Application Under Review
            </h1>

            <p className="text-[13px] text-gray-600 mt-4">
              Thank you,{" "}
              <span className="font-semibold text-black">
                {formData.firstName || "User"} {formData.lastName || ""}
              </span>
              !
            </p>

            <p className="text-[13px] text-gray-500 leading-relaxed mt-4 max-w-[360px] mx-auto">
              A confirmation email will be sent to your registered email address
              once your B2B account application has been reviewed and approved
              by our team.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="mt-6 space-y-3">
            {/* SIGN OUT */}
            <button
              onClick={handleLogout}
              className="w-full h-[46px] rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all text-black text-[13px] font-medium flex items-center justify-center gap-2"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-6xl bg-white border border-gray-200 rounded-[26px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.06)] grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="relative p-4 sm:p-6 md:p-7 lg:p-8">
            {/* TOP BAR */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-black transition-all"
              >
                <ArrowLeft size={15} />
                Back
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-all cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="max-w-[450px] mx-auto mt-6 sm:mt-8">
              {/* ICON */}
              <div className="w-12 h-12 rounded-full bg-[#edf2ff] flex items-center justify-center mx-auto">
                <Building2 size={22} className="text-blue-600" />
              </div>

              {/* HEADING */}
              <div className="text-center mt-5">
                <h1 className="text-[24px] sm:text-[28px] font-bold text-black leading-tight">
                  Complete B2B Registration
                </h1>

                <p className="text-[12px] sm:text-[13px] text-gray-500 mt-2 leading-relaxed">
                  Provide your business details to apply for a wholesale
                  account.
                </p>
              </div>

              {/* FORM */}
              <div className="mt-7 space-y-3">
                {/* EMAIL */}
                <div>
                  <label className="text-[11px] font-semibold text-black block mb-1.5">
                    Email ID *
                  </label>

                  <div className="h-[46px] rounded-xl border border-gray-200 bg-[#f7f8fb] flex items-center px-3">
                    <Mail size={16} className="text-blue-500" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full bg-transparent outline-none text-[12px] px-2 text-black placeholder:text-gray-400"
                    />
                  </div>

                  {errors.email && (
                    <p className="text-[11px] text-red-500 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* NAME ROW */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* FIRST NAME */}
                  <div>
                    <label className="text-[11px] font-semibold text-black block mb-1.5">
                      First Name *
                    </label>

                    <div className="h-[46px] rounded-xl border border-gray-200 bg-white flex items-center px-3">
                      <User size={16} className="text-blue-500" />

                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className="w-full bg-transparent outline-none text-[12px] px-2 text-black placeholder:text-gray-400"
                      />
                    </div>

                    {errors.firstName && (
                      <p className="text-[11px] text-red-500 mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* LAST NAME */}
                  <div>
                    <label className="text-[11px] font-semibold text-black block mb-1.5">
                      Last Name *
                    </label>

                    <div className="h-[46px] rounded-xl border border-gray-200 bg-white flex items-center px-3">
                      <User size={16} className="text-blue-500" />

                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className="w-full bg-transparent outline-none text-[12px] px-2 text-black placeholder:text-gray-400"
                      />
                    </div>

                    {errors.lastName && (
                      <p className="text-[11px] text-red-500 mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* BUSINESS NAME */}
                <div>
                  <label className="text-[11px] font-semibold text-black block mb-1.5">
                    Business Name *
                  </label>

                  <div className="h-[46px] rounded-xl border border-gray-200 bg-white flex items-center px-3">
                    <Building2 size={16} className="text-blue-500" />

                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Your company / business name"
                      className="w-full bg-transparent outline-none text-[12px] px-2 text-black placeholder:text-gray-400"
                    />
                  </div>

                  {errors.businessName && (
                    <p className="text-[11px] text-red-500 mt-1">
                      {errors.businessName}
                    </p>
                  )}
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="text-[11px] font-semibold text-black block mb-1.5">
                    Business Category *
                  </label>

                  <div className="h-[46px] rounded-xl border border-gray-200 bg-white flex items-center px-3">
                    <BriefcaseBusiness size={16} className="text-blue-500" />

                    <select
                      name="businessCategory"
                      value={formData.businessCategory}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-[12px] px-2 text-black"
                    >
                      <option value="">Select your business type</option>

                      <option value="Retail">Retail</option>

                      <option value="Wholesale">Wholesale</option>

                      <option value="Distributor">Distributor</option>

                      <option value="Interior Designer">
                        Interior Designer
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {errors.businessCategory && (
                    <p className="text-[11px] text-red-500 mt-1">
                      {errors.businessCategory}
                    </p>
                  )}
                </div>
                {formData.businessCategory === "Other" && (
                  <div className="mt-3">
                    <div className="h-[46px] rounded-xl border border-gray-200 bg-white flex items-center px-3">
                      <BriefcaseBusiness size={16} className="text-blue-500" />

                      <input
                        type="text"
                        name="customBusinessCategory"
                        value={formData.customBusinessCategory}
                        onChange={handleChange}
                        placeholder="Enter your business category"
                        className="w-full bg-transparent outline-none text-[12px] px-2 text-black placeholder:text-gray-400"
                      />
                    </div>

                    {errors.customBusinessCategory && (
                      <p className="text-[11px] text-red-500 mt-1">
                        {errors.customBusinessCategory}
                      </p>
                    )}
                  </div>
                )}
                {/* GST NUMBER */}
                <div>
                  <label className="text-[11px] font-semibold text-black block mb-1.5">
                    GST Number *
                  </label>

                  <div className="h-[46px] rounded-xl border border-gray-200 bg-white flex items-center px-3">
                    <Building2 size={16} className="text-blue-500" />

                    <input
                      type="text"
                      name="gst_number"
value={formData.gst_number}
                      onChange={handleChange}
                      placeholder="Enter GST Number"
                      className="w-full bg-transparent outline-none text-[12px] px-2 uppercase text-black placeholder:text-gray-400"
                      maxLength={15}
                    />
                  </div>

                  {errors.gst_number && (
  <p className="text-[11px] text-red-500 mt-1">
    {errors.gst_number}
  </p>
)}
                </div>
                {/* MOBILE */}
                <div>
                  <label className="text-[11px] font-semibold text-black block mb-1.5">
                    Mobile No. *
                  </label>

                  <div className="h-[46px] rounded-xl border border-gray-200 bg-white flex items-center px-3">
                    <Phone size={16} className="text-blue-500" />

                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter your mobile number"
                      className="w-full bg-transparent outline-none text-[12px] px-2 text-black placeholder:text-gray-400"
                    />
                  </div>

                  {errors.mobile && (
                    <p className="text-[11px] text-red-500 mt-1">
                      {errors.mobile}
                    </p>
                  )}
                </div>

                {/* VISITING CARD */}
                <div>
                  <label className="text-[11px] font-semibold text-black block mb-1.5">
                    Visiting Card (optional)
                  </label>

                  <label className="h-[56px] rounded-xl border border-dashed border-gray-300 bg-white flex items-center justify-between px-4 cursor-pointer hover:border-blue-400 transition-all">
                    <div className="flex items-center gap-2.5">
                      {/* ICON */}
                      {formData.visitingCard ? (
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-600"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                      ) : (
                        <Upload size={16} className="text-blue-500" />
                      )}

                      {/* FILE STATUS */}
                      {formData.visitingCard ? (
                        <span className="text-[12px] font-medium text-green-600">
                          Uploaded
                        </span>
                      ) : (
                        <span className="text-[12px] text-gray-500">
                          Upload image of your visiting card
                        </span>
                      )}
                    </div>

                    {/* PREVIEW NAME */}
                    {formData.visitingCard && (
                      <span className="text-[10px] text-gray-400 truncate max-w-[120px]">
                        {formData.visitingCard.name}
                      </span>
                    )}

                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          visitingCard: e.target.files[0],
                        })
                      }
                    />
                  </label>
                </div>

                {/* BUTTON */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full h-[48px] rounded-xl bg-blue-600 hover:bg-blue-700 transition-all text-white text-[13px] font-semibold flex items-center justify-center gap-2 mt-2 shadow-lg shadow-blue-200 disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>Submit B2B Application</>
                  )}
                </button>

                {/* SIGN IN LINK */}
                <div className="mt-5 text-center">
                  <p className="text-[12px] text-gray-500">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/login/Signin")}
                      className="text-[#3164E3] font-semibold hover:underline cursor-pointer"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden lg:block relative min-h-[850px]">
            <img
              src={signupimg}
              alt="Login Wallpaper"
              className="w-full h-full object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            {/* CONTENT */}
            <div className="absolute bottom-7 left-7 right-7">
              <div className="bg-black/25 backdrop-blur-xl border border-white/10 rounded-3xl p-5">
                <p className="text-white/80 text-[11px] mb-1">Trusted by</p>

                <h2 className="text-white text-[24px] font-bold leading-tight">
                  200+ Businesses
                </h2>

                <p className="text-white/70 text-[12px] mt-2 leading-relaxed">
                  Join India’s growing B2B lighting marketplace and get
                  exclusive wholesale pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
