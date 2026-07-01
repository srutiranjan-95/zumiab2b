/* eslint-disable no-constant-binary-expression */
import { useEffect, useState, useRef } from "react";

import {
  Search,
  Plus,
  Upload,
  Settings2,
  Pencil,
  Trash2,
} from "lucide-react";

import AddProduct from "./AddProduct";

import {
  getAllProducts,
  deleteProduct,
  updateProductStatus,
} from "../../../service/apiProductlist";

import { bulkImportProducts } from "../../../service/apiProductlist";

export default function Products() {

  const [openAddModal, setOpenAddModal] =
    useState(false);

  const [editProduct, setEditProduct] =
    useState(null);

  const [products, setProducts] =
    useState([]);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [openDeleteModal, setOpenDeleteModal] =
    useState(false);

  const [deleteProductId, setDeleteProductId] =
    useState(null);

  const [importing, setImporting] =
  useState(false);

 const fileInputRef = useRef(null);

  const handleBulkImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  try {
    setImporting(true);

    const token = localStorage.getItem("access");

    const response = await bulkImportProducts(
      file,
      token
    );

    alert(
      `Imported: ${response.success_count}, Failed: ${response.failed_count}`
    );

    fetchProducts(currentPage);

  } catch (error) {
    alert(error.message || "Import failed");
  } finally {
    setImporting(false);
    e.target.value = "";
  }
};

  const limit = 10;

  // GET ALL PRODUCTS
  useEffect(() => {

  fetchProducts(currentPage);

  // SCROLL TOP ON PAGE CHANGE
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

}, [currentPage]);

  const fetchProducts = async (
  page = 1
) => {

  try {

    const response =
      await getAllProducts(
        page,
        limit
      );

    const productData =
      response?.data || [];

    const formattedProducts =
      productData.map(
        (item) => {

          const formattedImages =
            Array.isArray(
              item.images
            )
              ? item.images.map(
                  (img) => ({
                    url: img,
                  })
                )
              : [];

          return {

            // FIX SLUG
id:
  item.id,

slug:
  item.slug,

            // MAIN IMAGE
            image:
              formattedImages[0]
                ?.url ||
              item.image ||
              null,

            // PREVIEW IMAGES
            images:
              formattedImages.slice(
                1
              ),

            // PRODUCT NAME
            name:
              item.name ||
              "New Product",

            // SKU
            sku:
              item.sku ||
              "SKU-0000",

            // ITEM CODE
            itemCode:
              item.item_code ||
              "ITEM-0000",

            category:
  item.category?.name ||
  "Indoor Lighting",

brand:
  item.brand?.name ||
  "ZUMIA",

            // PRICES
            mrp:
              `₹${item.mrp}`,

            retail:
              `₹${item.retail}`,

            b2b:
              `₹${item.b2b}`,

            // STOCK
            stock:
              item.stock_quantity ||
              0,

            // STATUS
            status:
  item.status ===
  "Publish"
    ? "Active"
    : "Inactive",

          };

        }
      );

    setProducts(
      formattedProducts
    );

    // PAGINATION
    setCurrentPage(
      response?.page || 1
    );

    setTotalPages(
      Math.ceil(
        (response?.total ||
          0) / limit
      ) || 1
    );

  } catch (error) {

    console.error(
      "Fetch Products Error:",
      error
    );

  }

};

 const toggleStatus = async (
  index,
  slug
) => {

  try {

    // CURRENT UI STATUS
    const currentUiStatus =
      products[index]
        .status;

    // API STATUS
    const apiStatus =
      currentUiStatus ===
      "Active"
        ? "Unpublish"
        : "Publish";

    const response =
      await updateProductStatus(
        slug,
        apiStatus
      );

    if (
      response?.status
    ) {

      const updatedProducts = [
        ...products,
      ];

      // UPDATE UI
      updatedProducts[index].status =
        apiStatus ===
        "Publish"
          ? "Active"
          : "Inactive";

      setProducts(
        updatedProducts
      );
      // AUTO REFRESH PRODUCTS
fetchProducts(currentPage);

    }

  } catch (error) {

    console.error(
      "UPDATE STATUS ERROR:",
      error.response
        ?.data || error
    );

  }

};

  // OPEN DELETE MODAL
  const handleDeleteClick = (
  productSlug
) => {

    setDeleteProductId(
  productSlug
);

    setOpenDeleteModal(true);

  };

  // DELETE PRODUCT
  const handleDelete = async () => {

    try {

      await deleteProduct(
        deleteProductId
      );

      setProducts((prev) =>
  prev.filter(
    (item) =>
      item.slug !==
      deleteProductId
  )
);

      setOpenDeleteModal(false);

      setDeleteProductId(null);

    } catch (error) {

      console.error(
        "Delete Product Error:",
        error
      );

    }

  };

  // EDIT PRODUCT
  const handleEdit = (product) => {

    setEditProduct(product);

    setOpenAddModal(true);

  };

  // CREATE PRODUCT
  const handleCreateProduct = (
    productData
  ) => {

    setProducts((prev) => [
      {
        image:
          productData.image || null,

        images:
          productData.images
            ?.slice(1) || [],

        name:
          productData.name ||
          "New Product",

        sku:
  productData.sku ||
  "SKU-0000",

itemCode:
  productData.item_code ||
  "ITEM-0000",

        category:
          productData.category ||
          "Indoor Lighting",

        brand:
          productData.brand ||
          "ZUMIA",

        mrp:
          productData.mrp || "₹0",

        retail:
          productData.retail ||
          "₹0",

        b2b:
          productData.b2b || "₹0",

        stock:
          productData.stock || 0,

        status: "Inactive",
      },

      ...prev,
    ]);

    setOpenAddModal(false);

    // AUTO REFRESH PRODUCTS
fetchProducts(currentPage);

  };

  return (
    <div className="space-y-5">

      {/* FILTERS */}
      <div className="flex flex-col xl:flex-row gap-3 xl:items-center xl:justify-between">

        <div className="flex flex-wrap gap-3">

          <div className="relative">

            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by name or SKU..."
              className="h-[42px] w-[240px] rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-[13px] outline-none"
            />

          </div>

        </div>

        <div className="flex flex-wrap gap-2">

          {/* <button className="h-[42px] px-4 rounded-xl border border-gray-200 bg-white text-[13px] font-medium flex items-center gap-2">

            <Settings2 size={15} />
            Price Settings

          </button> */}

          <>
  <button
  onClick={handleBulkImportClick}
  disabled={importing}
  className={`h-[42px] px-4 rounded-xl border border-gray-200 bg-white text-[13px] font-medium flex items-center gap-2 transition-all duration-300 ${
    importing
      ? "opacity-50 cursor-not-allowed"
      : "hover:bg-gray-50"
  }`}
>
  <Upload size={15} />
  {importing ? "Importing..." : "Bulk Import"}
</button>

  <input
    type="file"
    ref={fileInputRef}
    className="hidden"
    accept=".xlsx,.xls,.doc,.docx"
    onChange={handleFileChange}
  />
</>

          {/* OPEN MODAL BUTTON */}
          <button
            onClick={() => {

              setEditProduct(null);

              setOpenAddModal(true);

            }}
            className="h-[42px] px-4 rounded-xl bg-blue-600 text-white text-[13px] font-medium flex items-center gap-2"
          >

            <Plus size={15} />
            Add Product

          </button>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1200px]">

            <thead className="bg-[#f8fafc] border-b border-gray-200">

              <tr>

                {[
                  "Product",
                  "Item Code",
                  "Category",
                  "Brand",
                  "MRP",
                  "Retail",
                  "B2B Price",
                  "Stock",
                  "Status",
                  "Actions",
                ].map((head, i) => (

                  <th
                    key={i}
                    className="text-left px-5 py-4 text-[11px] text-gray-500 font-semibold whitespace-nowrap"
                  >
                    {head}
                  </th>

                ))}

              </tr>

            </thead>

            <tbody>

              {products.map(
                (item, i) => (

                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-all duration-300"
                  >

                    {/* PRODUCT */}
                    <td className="px-5 py-5">

                      <div className="flex items-start gap-4">

                        {/* MAIN IMAGE */}
                        <div className="space-y-2">

                          <div className="h-[54px] w-[54px] rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100 flex items-center justify-center">

                            {item.image ? (

                              <img
                                src={
                                  item.image
                                }
                                alt={
                                  item.name
                                }
                                className="h-full w-full object-cover"
                              />

                            ) : (

                              <span className="text-[10px] text-gray-400 font-medium">
                                No Image
                              </span>

                            )}

                          </div>

                          {/* MULTIPLE IMAGE PREVIEW */}
                          {item.images &&
                            item.images.length >
                              0 && (

                              <div className="flex flex-wrap gap-1 max-w-[90px]">

                                {item.images
                                  .slice(0, 6)
                                  .map(
                                    (
                                      img,
                                      index
                                    ) => (

                                      <div
                                        key={index}
                                        className="h-[20px] w-[20px] rounded-md overflow-hidden border border-gray-200 bg-gray-100"
                                      >

                                        <img
                                          src={
                                            img.url
                                          }
                                          alt="preview"
                                          className="h-full w-full object-cover"
                                        />

                                      </div>

                                    )
                                  )}

                              </div>

                            )}

                        </div>

                        {/* INFO */}
                        <div>

                          <h3 className="text-[14px] font-semibold text-black leading-snug">
                            {item.name}
                          </h3>

                          <p className="text-[11px] text-gray-500 mt-1">
                            SKU:{" "}
                            {item.sku}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* ITEM CODE */}
                    {/* ITEM CODE */}
<td className="px-5 py-4 text-[12px] text-gray-600 leading-relaxed">
  {item.itemCode}
</td>

                    {/* CATEGORY */}
                    <td className="px-5 py-4">

                      <div className="inline-flex px-4 py-2 rounded-2xl bg-[#eef2f7] text-[11px] font-medium text-black">
                        {
                          item.category
                        }
                      </div>

                    </td>

                    {/* BRAND */}
                    <td className="px-5 py-4 text-[12px] text-gray-600 font-medium">
                      {item.brand}
                    </td>

                    {/* MRP */}
                    <td className="px-5 py-4 text-[12px] text-gray-500 line-through">
                      {item.mrp}
                    </td>

                    {/* RETAIL */}
                    <td className="px-5 py-4 text-[14px] font-bold text-black">
                      {
                        item.retail
                      }
                    </td>

                    {/* B2B */}
                    <td className="px-5 py-4 text-[14px] font-bold text-blue-600">
                      {item.b2b}
                    </td>

                    {/* STOCK */}
                    <td className="px-5 py-4 text-[14px] font-medium text-green-600">
                      {item.stock}
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-4">

                      <button
                        onClick={() =>
                          toggleStatus(
                            i,
                            item.slug
                          )
                        }
                        className={`px-4 h-[30px] rounded-full text-[11px] font-semibold transition-all duration-300 ${
                          item.status ===
                          "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        {
                          item.status
                        }
                      </button>

                    </td>

                    {/* ACTIONS */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2">

                        {/* EDIT */}
                        <button
                          onClick={() =>
                            handleEdit(
                              item
                            )
                          }
                          className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300"
                        >

                          <Pencil
                            size={18}
                            className="text-black"
                          />

                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            handleDeleteClick(
                              item.slug
                            )
                          }
                          className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-red-50 transition-all duration-300"
                        >

                          <Trash2
                            size={18}
                            className="text-red-500"
                          />

                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}
{totalPages > 1 && (

  <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200">

    <p className="text-[13px] text-gray-500">
      Page {currentPage} of {totalPages}
    </p>

    <div className="flex items-center gap-2 flex-wrap">

      {/* PREVIOUS */}
      <button
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage(
            (prev) => prev - 1
          )
        }
        className={`h-[38px] px-4 rounded-xl text-[13px] font-medium border transition-all duration-300 ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white border-gray-200 hover:bg-gray-50"
        }`}
      >
        Previous
      </button>

      {/* PAGE NUMBERS */}
      {Array.from(
        {
          length: totalPages,
        },
        (_, index) =>
          index + 1
      ).map((page) => (

        <button
          key={page}
          onClick={() =>
            setCurrentPage(
              page
            )
          }
          className={`h-[38px] min-w-[38px] px-3 rounded-xl text-[13px] font-medium border transition-all duration-300 ${
            currentPage === page
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white border-gray-200 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>

      ))}

      {/* NEXT */}
      <button
        disabled={
          currentPage === totalPages
        }
        onClick={() =>
          setCurrentPage(
            (prev) => prev + 1
          )
        }
        className={`h-[38px] px-4 rounded-xl text-[13px] font-medium border transition-all duration-300 ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white border-blue-600"
        }`}
      >
        Next
      </button>

    </div>

  </div>

)}

      </div>

      {/* DELETE MODAL */}
      {openDeleteModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-[340px] rounded-2xl bg-white p-5">

            <div className="flex flex-col items-center text-center">

              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">

                <Trash2
                  size={22}
                  className="text-red-500"
                />

              </div>

              <h2 className="mt-4 text-[18px] font-bold text-black">
                Delete Product
              </h2>

              <p className="mt-2 text-[13px] text-gray-500 leading-relaxed">
                Are you sure you want to delete this product?
              </p>

              <div className="mt-5 flex items-center gap-2 w-full">

                <button
                  onClick={() => {

                    setOpenDeleteModal(false);

                    setDeleteProductId(null);

                  }}
                  className="flex-1 h-[42px] rounded-xl border border-gray-200 bg-white text-[13px] font-semibold text-black"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="flex-1 h-[42px] rounded-xl bg-red-500 text-white text-[13px] font-semibold"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ADD PRODUCT MODAL */}
      {openAddModal && (

        <AddProduct
          editProduct={
            editProduct
          }
          onCreateProduct={
            handleCreateProduct
          }
          closeModal={() => {

            setOpenAddModal(
              false
            );

            setEditProduct(
              null
            );

          }}
        />

      )}

    </div>
  );
}