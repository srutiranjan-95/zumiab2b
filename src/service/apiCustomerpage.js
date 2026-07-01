// ================= GET PUBLISH PRODUCTS API =================

import axios from "axios";

const URL =
  import.meta.env.VITE_API_URL;

export const getPublishProducts =
  async () => {

    try {

      const accessToken =
        localStorage.getItem(
          "access"
        );

      const response =
        await axios.get(
          `${URL}/publish-products/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

      return response.data;

    } catch (error) {

      console.error(
        "GET PUBLISH PRODUCTS ERROR :",
        error
      );

      throw error;

    }

  };
  

// ================= GET SINGLE PRODUCT API =================

export const getSingleProduct =
  async (slug) => {

    try {

      const response =
        await axios.get(
          `${URL}/product/${slug}/`
        );

      return response;

    } catch (error) {

      console.log(
        "GET SINGLE PRODUCT ERROR :",
        error
      );

      throw error;

    }

};

//FILTER PRICE//
export const getProductsByPrice = async (priceRange) => {
  const token = localStorage.getItem("access");

  try {
    const response = await axios.get(
      `${URL}/product-filter/?price=${priceRange}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Price Filter Error:", error);
    throw error;
  }
};