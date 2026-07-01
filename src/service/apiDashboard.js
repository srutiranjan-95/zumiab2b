import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

// Get customer count

export const getCustomerStatusCount = async (
  token
) => {
  try {
    const response = await axios.get(
      `${URL}/customer-status-count/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Customer Status Count Error:",
      error.response?.data ||
        error.message
    );
    throw error;
  }
};
// Get product count
export const getProductCount = async (token) => {
  try {
    const response = await axios.get(
      `${URL}/product-count/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Product Count Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get order status summary

export const getOrderStatusSummary =
  async (token) => {
    try {
      const response =
        await axios.get(
          `${URL}/order-status-summary/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Order Status Summary Error:",
        error.response?.data ||
          error.message
      );
      throw error;
    }
  };

// Get customer status summary

  export const getCustomerStatusSummary =
  async (token) => {
    try {
      const response =
        await axios.get(
          `${URL}/customer-status-summary/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Customer Status Summary Error:",
        error.response?.data ||
          error.message
      );
      throw error;
    }
  };

// Get delivered order summary revenue//

  export const getDeliveredOrderSummary =
  async (token) => {
    try {
      const response =
        await axios.get(
          `${URL}/delivered-order-summary/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Delivered Order Summary Error:",
        error.response?.data ||
          error.message
      );

      throw error;
    }
  };

// Get pending order summary revenue//
  export const getPendingUpiOrderCount = async (token) => {
  // const token = localStorage.getItem("access");

  const response = await axios.get(
    `${URL}/pending-upi-order-count/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};