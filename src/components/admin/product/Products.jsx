import { useState } from "react";

import {
  Search,
  Plus,
  Upload,
  Settings2,
  Pencil,
  Trash2,
} from "lucide-react";

import AddProduct from "./AddProduct";

export default function Products() {

  const [openAddModal, setOpenAddModal] =
    useState(false);

  const [editProduct, setEditProduct] =
    useState(null);

  const [products, setProducts] =
    useState([
      {
        image:
          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=300&auto=format&fit=crop",

        images: [
          {
            url:
              "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=300&auto=format&fit=crop",
          },
          {
            url:
              "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=300&auto=format&fit=crop",
          },
        ],

        name: "8112-600X800",
        sku: "SKU-898989",
        category:
          "Indoor Lighting",
        brand: "ZUMIA",
        mrp: "₹3,456.00",
        retail: "₹2,344.90",
        b2b: "₹1,234.00",
        stock: 73,
        status: "Inactive",
      },

      {
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=300&auto=format&fit=crop",

        images: [
          {
            url:
              "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=300&auto=format&fit=crop",
          },
          {
            url:
              "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=300&auto=format&fit=crop",
          },
        ],

        name:
          "Crystal Prism Cylinder Wall Sconce",
        sku: "SKU-7654567",
        category:
          "Indoor Lighting",
        brand: "ZUMIA",
        mrp: "₹2,000.00",
        retail: "₹1,500.00",
        b2b: "₹850.00",
        stock: 12,
        status: "Inactive",
      },
    ]);

  const toggleStatus = (index) => {

    const updatedProducts = [
      ...products,
    ];

    updatedProducts[index].status =
      updatedProducts[index]
        .status === "Active"
        ? "Inactive"
        : "Active";

    setProducts(updatedProducts);

  };

  // DELETE PRODUCT
  const handleDelete = (index) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmDelete) return;

    const updatedProducts =
      products.filter(
        (_, i) => i !== index
      );

    setProducts(updatedProducts);

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
          productData.image ||
          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=300&auto=format&fit=crop",

        images:
          productData.images ||
          [],

        name:
          productData.name ||
          "New Product",

        sku:
          productData.sku ||
          "SKU-0000",

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

        status: "Active",
      },

      ...prev,
    ]);

    setOpenAddModal(false);

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

          <button className="h-[42px] px-4 rounded-xl border border-gray-200 bg-white text-[13px] font-medium flex items-center gap-2">

            <Settings2 size={15} />
            Price Settings

          </button>

          <button className="h-[42px] px-4 rounded-xl border border-gray-200 bg-white text-[13px] font-medium flex items-center gap-2">

            <Upload size={15} />
            Bulk Import

          </button>

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

                          <div className="h-[54px] w-[54px] rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">

                            <img
                              src={
                                item.image
                              }
                              alt={
                                item.name
                              }
                              className="h-full w-full object-cover"
                            />

                          </div>

                          {/* SMALL IMAGE PREVIEW */}
                          {item.images &&
                            item.images
                              .length >
                              0 && (

                              <div className="flex flex-wrap gap-1 max-w-[90px]">

                                {item.images
                                  .slice(
                                    0,
                                    6
                                  )
                                  .map(
                                    (
                                      img,
                                      index
                                    ) => (

                                      <div
                                        key={
                                          index
                                        }
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
                    <td className="px-5 py-4 text-[12px] text-gray-600 leading-relaxed">
                      {item.sku}
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
                            i
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
                            handleDelete(
                              i
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

      </div>

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