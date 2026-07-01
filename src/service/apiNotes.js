import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const getLastOrderDetails = async () => {
  try {
    console.log("VITE_API_URL:", URL);
    console.log("Request URL:", `${URL}/last-order-details/`);

    const token = localStorage.getItem("access");
    console.log("Token:", token);

    const response = await axios.get(
      `${URL}/last-order-details/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Last Order Details Error:", error);
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);

    return (
      error.response?.data || {
        status: false,
        message: "Something went wrong",
      }
    );
  }
};