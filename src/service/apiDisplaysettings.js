  import axios from "axios";

  const URL = import.meta.env.VITE_API_URL;


//PUT DISPLAY SETTINGS//

export const updateDisplaySettings = async (data, token) => {
  try {
    const accessToken = token || localStorage.getItem("access");

    if (!accessToken) {
      return {
        status: false,
        message: "Access token not found",
      };
    }

    const response = await axios.put(
      `${URL}/display-settings/update/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Update Display Settings Error:", error.response?.data);

    return (
      error.response?.data || {
        status: false,
        message: "Something went wrong",
      }
    );
  }
};

///GET DISPLAY SETTINGS///


export const getDisplaySettings = async (token) => {
  try {
    const accessToken = token || localStorage.getItem("access");

    const response = await axios.get(`${URL}/display-settings/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Display Settings Error:", error.response?.data);

    return (
      error.response?.data || {
        status: false,
        message: "Something went wrong",
      }
    );
  }
};