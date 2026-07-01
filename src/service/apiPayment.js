import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const placeOrder = async (addressId, token) => {
  try {
    const response = await axios.post(
      `${URL}/place-order/`,
      {
        address_id: addressId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        status: false,
        message: "Something went wrong",
      }
    );
  }
};

// New API function for "Buy Now" order

export const buyNowOrder = async (
  addressId,
  productId,
  quantity,
  remarks,
  token
) => {
  try {
    const response = await axios.post(
      `${URL}/buy-now/`,
      {
        address_id: addressId,
        product_id: productId,
        quantity: quantity,
        remarks,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to place order",
      }
    );
  }
};


// Create UPI Order

export const createUPIOrder = async (payload, token) => {
  const formData = new FormData();

  formData.append("address_id", payload.address_id);
  formData.append("product_id", payload.product_id);
  formData.append("quantity", payload.quantity);
  formData.append("total_amount", payload.total_amount);
  formData.append("payment_method", payload.payment_method);
  formData.append("transaction_id", payload.transaction_id);

  if (payload.transaction_screenshot) {
    formData.append(
      "transaction_screenshot",
      payload.transaction_screenshot
    );
  }

  const response = await axios.post(
    `${URL}/create-upi-order/`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};