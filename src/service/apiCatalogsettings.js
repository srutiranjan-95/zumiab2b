import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

// ================= GET ALL CATEGORY API =================

export const getAllCategories = async () => {

  try {

    const accessToken =
      localStorage.getItem("access");

    const response = await axios.get(
      `${URL}/category/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;

  } catch (error) {

    console.error(
      "Get Categories API Error:",
      error
    );

    throw error;
  }
};

// ================= CREATE CATEGORY API =================

export const createCategory = async (
  categoryData
) => {

  try {

    const accessToken =
      localStorage.getItem("access");

    const response = await axios.post(
      `${URL}/category/`,
      categoryData,
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
      "Create Category API Error:",
      error
    );

    throw error;
  }
};

// ================= DELETE CATEGORY API =================

export const deleteCategory = async (
  slug
) => {

  try {

    const accessToken =
      localStorage.getItem("access");

    const response = await axios.delete(
      `${URL}/category/${slug}/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;

  } catch (error) {

    console.error(
      "Delete Category API Error:",
      error
    );

    throw error;
  }
};

// ================= GET ALL BRAND API =================

export const getAllBrands = async () => {

  try {

    const accessToken =
      localStorage.getItem("access");

    const response = await axios.get(
      `${URL}/brand/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;

  } catch (error) {

    console.error(
      "Get Brands API Error:",
      error
    );

    throw error;
  }
};

// ================= CREATE BRAND API =================

export const createBrand = async (
  brandData
) => {

  try {

    const accessToken =
      localStorage.getItem("access");

    const response = await axios.post(
      `${URL}/brand/`,
      brandData,
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
      "Create Brand API Error:",
      error
    );

    throw error;
  }
};

// ================= DELETE BRAND API =================

export const deleteBrand = async (
  slug
) => {

  try {

    const accessToken =
      localStorage.getItem("access");

    const response = await axios.delete(
      `${URL}/brand/${slug}/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;

  } catch (error) {

    console.error(
      "Delete Brand API Error:",
      error
    );

    throw error;
  }
};

// ================= UPDATE CATEGORY STATUS API =================

export const updateCategoryStatus = async (
  slug,
  statusData
) => {

  try {

    const accessToken =
      localStorage.getItem("access");

    const response = await axios.patch(
      `${URL}/category/status/${slug}/`,
      statusData,
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
      "Update Category Status API Error:",
      error
    );

    throw error;
  }
};

// ================= UPDATE BRAND STATUS API =================

export const updateBrandStatus = async (
  slug,
  statusData
) => {

  try {

    const accessToken =
      localStorage.getItem("access");

    const response = await axios.patch(
      `${URL}/brand/status/${slug}/`,
      statusData,
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
      "Update Brand Status API Error:",
      error
    );

    throw error;
  }
};