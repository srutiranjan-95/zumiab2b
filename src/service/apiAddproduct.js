import axios from "axios";

const URL = import.meta.env.VITE_API_URL;


// ================= CREATE PRODUCT API =================

export const createProduct =
  async (productData) => {

    try {

      const accessToken =
        localStorage.getItem(
          "access"
        );

      const response =
        await axios.post(
          `${URL}/product/`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            //   "Content-Type":
            //     "application/json",
            },
          }
        );

      return response.data;

    } catch (error) {

      console.log(
        "CREATE PRODUCT API ERROR :",
        error
      );

      throw error;

    }

  };

// ================= GET PUBLISH CATEGORY API =================

export const getPublishCategory =
  async () => {

    try {

      const accessToken =
        localStorage.getItem(
          "access"
        );

      const response =
        await axios.get(
          `${URL}/publish-category/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

      return response.data;

    } catch (error) {

      console.log(
        "GET PUBLISH CATEGORY API ERROR :",
        error
      );

      throw error;

    }

  };



// ================= GET PUBLISH BRANDS API =================

export const getPublishBrand =
  async () => {

    try {

      const accessToken =
        localStorage.getItem(
          "access"
        );

      const response =
        await axios.get(
          `${URL}/publish-brand/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

      return response.data;

    } catch (error) {

      console.log(
        "GET PUBLISH BRAND API ERROR :",
        error
      );

      throw error;

    }

  };