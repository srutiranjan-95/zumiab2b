import axios from "axios";

const URL = import.meta.env.VITE_API_URL;
// Function to fetch UPI orders for the logged-in user
export const getMyUpiOrders = async () => {
  try {
    const token = localStorage.getItem("access");

    console.log("ACCESS TOKEN:", token);

    const response = await axios.get(
      `${URL}/my-upi-orders/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("UPI ORDERS RESPONSE:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "UPI Orders Error:",
      error?.response?.data || error.message
    );

    throw error;
  }
};

// status can be "pending", "completed", "failed", or "cancelled"

// export const getUpiOrders = async (status = "") => {
//   try {
//     const token = localStorage.getItem("access");

//     const response = await axios.get(
//       `${URL}/upi-orders/?status=${status}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "UPI Orders Error:",
//       error?.response?.data || error.message
//     );
//     throw error;
//   }
// };

// Function to update the status of a UPI order
export const updateUpiOrderStatus = async (orderId, action) => {
  try {
    const token = localStorage.getItem("access");

    const response = await axios.patch(
      `${URL}/upi-order/${orderId}/status-change/`,
      {
        action,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Status Change Error:", error);
    throw error;
  }
};

//CALENDER FILTER//

export const getUpiOrdersByDate = async (
  fromDate,
  toDate
) => {
  try {
    const token = localStorage.getItem("access");

    console.log("Token:", token);

    const response = await axios.get(
      `${URL}/upi-orders-by-date/`,
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
      "UPI Orders API Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};