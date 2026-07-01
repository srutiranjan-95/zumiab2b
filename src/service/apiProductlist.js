import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

// ================= GET ALL PRODUCTS API =================

export const getAllProducts =
  async (page = 1, limit = 10) => {

    try {

      const accessToken =
        localStorage.getItem("access");

      const response =
        await axios.get(
          `${URL}/product/?page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

      return response.data;

    } catch (error) {

      console.error(error);

      throw error;

    }

  };

// ================= DELETE PRODUCT API =================

export const deleteProduct = async (
  slug
) => {

  try {

    const accessToken =
      localStorage.getItem(
        "access"
      );

    const response =
      await axios.delete(
        `${URL}/product/${slug}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

    return response.data;

  } catch (error) {

    console.error(
      "Delete Product Error:",
      error
    );

    throw error;

  }

};

// ================= UPDATE PRODUCT STATUS API =================


export const updateProductStatus =
  async (
    slug,
    status
  ) => {

    try {

      const accessToken =
        localStorage.getItem(
          "access"
        );

      // FORM DATA
      const formData =
        new FormData();

      formData.append(
        "status",
        status
      );

      console.log(
        "STATUS PAYLOAD :",
        status
      );

      const response =
        await axios.post(
          `${URL}/product-status/${slug}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      console.log(
        "STATUS RESPONSE :",
        response.data
      );

      return response.data;

    } catch (error) {

      console.error(
        "UPDATE PRODUCT STATUS ERROR :",
        error.response?.data ||
          error
      );

      throw error;

    }

  };
  
// ================= BULK IMPORT PRODUCTS API =================

export const bulkImportProducts = async (file, token) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${URL}/products/bulk-import/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};


//PRODUCTLIST WITHOUT TOKEN//

export const getPublicProducts = async () => {
  try {
    const response = await axios.get(
      `${URL}/public-products-list/`
    );

    return response.data;
  } catch (error) {
    console.error("Get Products Error:", error);
    throw error;
  }
};