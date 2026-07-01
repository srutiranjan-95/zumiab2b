import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

// ================= GET CART ITEMS API =================
export const getCartItems = async () => {
  try {
    const accessToken = localStorage.getItem("access");

    const response = await axios.get(
      `${URL}/cart/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Get Cart Items Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ================= ADD TO CART API =================

export const addToCart = async (
  product_id,
  quantity
) => {
  try {
    const accessToken =
      localStorage.getItem("access");

    console.log(
      "Access Token:",
      accessToken
    );

    const response = await axios.post(
      `${URL}/add_to_cart/`,
      {
        product_id,
        quantity,
      },
      {
        headers: {
          "Content-Type":
            "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Add To Cart Error:",
      error.response?.data ||
        error.message
    );
    throw error;
  }
};

// ================= DELETE CART ITEM API =================

export const deleteCartItem = async (
  cartId,
  productId
) => {
  try {
    const accessToken =
      localStorage.getItem("access");

    const response = await axios.delete(
      `${URL}/cart/delete/${cartId}/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        data: {
          product: productId,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Delete Cart Item Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ================= UPDATE CART ITEM API =================

export const updateCartQuantity = async (productId, quantity) => {
  try {
    const accessToken = localStorage.getItem("access");

    const response = await axios.put(
      `${URL}/cart/update/`,
      {
        product_id: productId,
        quantity: quantity,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Update Cart Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ================= ADD MESSAGE API =================
export const addMessage = async (messageData) => {
  try {
    const accessToken = localStorage.getItem("access");

    const response = await axios.post(
      `${URL}/add-message/`,
      messageData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Add Message API Error:", error);
    throw error;
  }
};