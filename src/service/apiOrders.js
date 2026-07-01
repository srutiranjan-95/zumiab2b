import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

// Get Orders
export const getOrders = async (token) => {
  try {
    const response = await axios.get(
      `${URL}/orders/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Get Orders Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get Order Status

export const getOrderStatus = async (token) => {
  try {
    const response = await axios.get(
      `${URL}/order-status/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
// Update Order Status
export const updateOrderStatus = async (
  orderId,
  orderStatus,
  token
) => {
  try {
    const response = await axios.patch(
      `${URL}/orders/${orderId}/status/`,
      {
        order_status: orderStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":
            "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(
      "Update Status Error:",
      error
    );
    throw error;
  }
};

// Get Status Wise Orders
export const getStatusWiseOrders = async (
  orderStatus,
  token,
  limit = 10,
  offset = 0
) => {
  try {
    const response = await axios.get(
      `${URL}/status-wise-orders/`,
      {
        params: {
          order_status: orderStatus,
          limit,
          offset,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Get Order Status Count

export const getOrderStatusCount = async (token) => {
  try {
    const response = await axios.get(
      `${URL}/order-status-count/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Order Status Count Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get UPI Orders
export const getUpiOrders = async () => {
  const token = localStorage.getItem("access");

  const response = await axios.get(
    `${URL}/upi-orders/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


//for user order history
// GET MY ORDERS
export const getMyOrders = async (token) => {
  try {
    const response = await axios.get(
      `${URL}/my-orders/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Get My Orders Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

//CALENDER FILTER //
export const getProductsByDate = async (
  fromDate,
  toDate,
  token
) => {
  try {
    const response = await axios.get(
      `${URL}/products-by-date/`,
      {
        params: {
          from_date: fromDate,
          to_date: toDate,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Orders By Date Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};