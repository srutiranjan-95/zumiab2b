// ================= AUTH APIs =================

import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

// ================= SEND OTP API =================

export const handleSignin = async (payload) => {
  try {

    const response = await axios.post(
      `${URL}/login/`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;

  } catch (error) {

    console.error("Login API Error:", error);

    throw error;
  }
};

// ================= VERIFY OTP API =================

export const verifyOtp = async (payload) => {
  try {

    const response = await axios.post(
      `${URL}/login-otp-verify/`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;

  } catch (error) {

    console.error("Verify OTP API Error:", error);

    throw error;
  }
};

// ================= SIGNUP API =================

export const handleSignup = async (payload) => {
  try {

    // FORM DATA
    const formData = new FormData();

    formData.append(
      "username",
      payload.username
    );

    formData.append(
      "mobile",
      payload.mobile
    );

    formData.append(
      "email",
      payload.email
    );

    formData.append(
      "business_name",
      payload.business_name
    );

    formData.append(
      "business_category",
      payload.business_category
    );

    // IMAGE FILE
    if (payload.image) {

      formData.append(
        "image",
        payload.image
      );

    }

    const response = await axios.post(
      `${URL}/signup/`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response;

  } catch (error) {

    console.error("Signup API Error:", error);

    throw error;
  }
};