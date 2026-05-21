import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

// ================= GET ALL USERS API =================

export const getAllUsers = async (
  page = 1,
  limit = 10,
  status = "all"
) => {

  try {

    const accessToken =
      localStorage.getItem("access");

    // BASE URL
    let apiUrl =
      `${URL}/all-users/?page=${page}&limit=${limit}`;

    // FILTER STATUS
    if (
      status &&
      status !== "all"
    ) {

      apiUrl += `&status=${status}`;
    }

    const response = await axios.get(
      apiUrl,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;

  } catch (error) {

    console.error(
      "Get Users API Error:",
      error
    );

    throw error;
  }
};

// ================= UPDATE USER STATUS API =================

export const updateUserStatus = async (
  userId,
  status
) => {

  try {

    const accessToken =
      localStorage.getItem("access");

    const response = await axios.put(
      `${URL}/update-user-status/${userId}/`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type":
            "application/json",
        },
      }
    );

    return response;

  } catch (error) {

    console.error(
      "Update User Status API Error:",
      error
    );

    throw error;
  }
};