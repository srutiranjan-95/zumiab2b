import axios from "axios";

const URL = import.meta.env.VITE_API_URL;


// ================= GET ALL ADDRESSES =================
export const getAddresses = async () => {
  try {

    const accessToken =
      localStorage.getItem(
        "access"
      );

    const response =
      await axios.get(
        `${URL}/address/`,
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        }
      );

    return response.data;

  } catch (error) {

    console.error(
      "Get Addresses Error:",
      error
    );

    throw error;
  }
};

// ================= ADD ADDRESS =================

export const addAddress = async (data) => {
  try {

    const accessToken =
      localStorage.getItem("access");

    const response =
      await axios.post(
        `${URL}/address/`,
        {
          full_name: data.fullName,
          mobile_number: data.mobile,
          alternate_mobile_number: data.alternateMobile,
          address_line_1: data.address1,
          address_line_2: data.address2,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
        },
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        }
      );

    return response.data;

  } catch (error) {

    console.error(
      "Add Address Error:",
      error
    );

    throw error;
  }
};

// ================= DELETE ADDRESS =================

export const deleteAddress = async (id) => {
  try {
    const accessToken = localStorage.getItem("access");

    const response = await axios.delete(
      `${URL}/delete-address/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("DELETE ADDRESS ERROR:", error);
    throw error;
  }
};

// ================= CHANGE DEFAULT STATUS =================

export const changeDefaultStatus = async (
  id,
  is_default = true
) => {

  try {

    const accessToken =
      localStorage.getItem("access");

    const response =
      await axios.post(
        `${URL}/change-status/`,
        {
          id,
          is_default,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

    return response.data;

  } catch (error) {

    console.log(
      "CHANGE DEFAULT STATUS ERROR:",
      error
    );

    throw error;

  }

};

// ================= EDIT ADDRESS =================

export const editAddress = async (
  addressId,
  addressData
) => {
  try {

    const accessToken =
      localStorage.getItem("access");

    const response =
      await axios.patch(
        `${URL}/edit-address/${addressId}/`,
        addressData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

    return response.data;

  } catch (error) {

    console.log(
      "EDIT ADDRESS ERROR",
      error
    );

    throw error;
  }
};