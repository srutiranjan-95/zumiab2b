import { useState, useEffect, useRef } from "react";

import {
  Plus,
  Trash2,
  Layers3,
  Tag,
  Gift,
  House,
  Check,
  X,
} from "lucide-react";

import {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategoryStatus,
  getAllBrands,
  createBrand,
  deleteBrand,
  updateBrandStatus,
} from "../../../service/apiCatalogsettings";

import { getDisplaySettings, updateDisplaySettings } from "../../../service/apiDisplaysettings";

export default function CatalogSettings() {

  const hasFetched = useRef(false);

  const [catalogData, setCatalogData] = useState({
    categories: [],

    brands: [],

    offerTypes: [],

    homeTypes: [],
  });

  const [displaySettings, setDisplaySettings] = useState([
    {
      title: "Retail Price",
      subtitle:
        "Show the available price on product cards",
      active: true,
    },

    {
      title: "MRP",
      subtitle:
        "Show the Maximum Retail Price (with strikethrough)",
      active: true,
    },

    {
      title: "B2B Price",
      subtitle: "Show the wholesale B2B price badge",
      active: true,
    },

    {
      title: "Description",
      subtitle: "Show product description text",
      active: true,
    },

    {
      title: "Brand",
      subtitle: "Show the product brand name",
      active: true,
    },

    {
      title: "Item Code",
      subtitle: "Show the internal item code",
      active: true,
    },

    {
      title: "SKU",
      subtitle: "Show the product SKU number",
      active: true,
    },

    {
      title: "Stock Quantity",
      subtitle: "Show available stock count to customers",
      active: true,
    },
  ]);

  const [showInput, setShowInput] = useState({
    categories: false,
    brands: false,
    offerTypes: false,
    homeTypes: false,
  });

  const [inputValues, setInputValues] = useState({
    categories: "",
    brands: "",
    offerTypes: "",
    homeTypes: "",
  });

  const fetchCategories = async () => {

    try {

      const response =
        await getAllCategories();

      console.log(response);

      const categoriesData =
        response?.data?.data ||
        response?.data ||
        [];

      setCatalogData((prev) => ({
        ...prev,

        categories: categoriesData.map(
          (item) => ({
            id: item.id,

            name:
              item.name?.toUpperCase() || "",

            slug:
              item.slug ||
              item.name
                ?.toLowerCase()
                .replace(/\s+/g, "-") ||
              "",

            active:
              item.publish ===
              "Publish" ||
              item.status ===
              "Publish",
          })
        ),
      }));

    } catch (error) {

      console.error(
        "Fetch Categories Error:",
        error
      );
    }
  };

  const fetchBrands = async () => {

    try {

      const response =
        await getAllBrands();

      console.log(response);

      const brandsData =
        response?.data?.data ||
        response?.data ||
        [];

      setCatalogData((prev) => ({
        ...prev,

        brands: brandsData.map(
          (item) => ({
            id: item.id,

            name:
              item.name?.toUpperCase() || "",

            slug:
              item.slug ||
              item.name
                ?.toLowerCase()
                .replace(/\s+/g, "-") ||
              "",

            active:
              item.publish ===
              "Publish" ||
              item.status ===
              "Publish",
          })
        ),
      }));

    } catch (error) {

      console.error(
        "Fetch Brands Error:",
        error
      );
    }
  };

  const fetchDisplaySettings = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await getDisplaySettings(token);

    setDisplaySettings([
      {
        title: "Retail Price",
        subtitle: "Show the available price on product cards",
        active: response?.retail ?? true,
      },
      {
        title: "MRP",
        subtitle: "Show the Maximum Retail Price (with strikethrough)",
        active: response?.mrp ?? true,
      },
      {
        title: "B2B Price",
        subtitle: "Show the wholesale B2B price badge",
        active: response?.b2b ?? true,
      },
      {
        title: "Description",
        subtitle: "Show product description text",
        active: response?.description ?? true,
      },
      {
        title: "Brand",
        subtitle: "Show the product brand name",
        active: response?.brand ?? true,
      },
      {
        title: "Item Code",
        subtitle: "Show the internal item code",
        active: response?.item_code ?? true,
      },
      {
        title: "SKU",
        subtitle: "Show the product SKU number",
        active: response?.sku ?? true,
      },
      {
        title: "Stock Quantity",
        subtitle: "Show available stock count to customers",
        active: response?.stock_quantity ?? true,
      },
    ]);
  } catch (error) {
    console.error("Display Settings Error:", error);
  }
};

  useEffect(() => {

    if (hasFetched.current) return;

    hasFetched.current = true;

    fetchCategories();

    fetchBrands();

    fetchDisplaySettings();

  }, []);

  const settingsCards = [
    {
      key: "categories",
      title: "Categories",
      subtitle: "Product categories shown in filters",
      icon: Layers3,
      placeholder: "New categorie name...",
    },

    {
      key: "brands",
      title: "Brands",
      subtitle: "Product brands for filtering",
      icon: Tag,
      placeholder: "New brand name...",
    },

    {
      key: "offerTypes",
      title: "Offer Types",
      subtitle: "Special offer tags & types",
      icon: Gift,
      placeholder: "New offer type name...",
    },

    {
      key: "homeTypes",
      title: "Home Types",
      subtitle: "Home room/space types for sorting",
      icon: House,
      placeholder: "New home type name...",
    },
  ];

  const handleAdd = async (key) => {

    const value = inputValues[key].trim();

    if (!value) return;

    try {

      if (key === "categories") {

        const payload = {
          name: value,

          slug: value
            .toLowerCase()
            .replace(/\s+/g, "-"),
        };

        await createCategory(payload);

        await fetchCategories();

      } else if (key === "brands") {

        const payload = {
          name: value,

          slug: value
            .toLowerCase()
            .replace(/\s+/g, "-"),
        };

        await createBrand(payload);

        await fetchBrands();

      } else {

        setCatalogData((prev) => ({
          ...prev,

          [key]: [
            ...prev[key],

            {
              name: value.toUpperCase(),
              active: true,
            },
          ],
        }));
      }

      setInputValues((prev) => ({
        ...prev,
        [key]: "",
      }));

      setShowInput((prev) => ({
        ...prev,
        [key]: false,
      }));

    } catch (error) {

      console.error(
        "Create Category/Brand Error:",
        error
      );
    }
  };

  const handleDelete = async (
    key,
    index
  ) => {

    try {

      if (key === "categories") {

        const category =
          catalogData[key][index];

        await deleteCategory(
          category.slug
        );

        await fetchCategories();

      } else if (key === "brands") {

        const brand =
          catalogData[key][index];

        await deleteBrand(
          brand.slug
        );

        await fetchBrands();

      } else {

        setCatalogData((prev) => ({
          ...prev,

          [key]: prev[key].filter(
            (_, i) => i !== index
          ),
        }));
      }

    } catch (error) {

      console.error(
        "Delete Category/Brand Error:",
        error
      );
    }
  };

  const toggleStatus = async (
    key,
    index
  ) => {

    try {

      if (key === "categories") {

        const category =
          catalogData[key][index];

        const updatedStatus =
          category.active
            ? "Unpublish"
            : "Publish";

        await updateCategoryStatus(
          category.slug,
          {
            status: updatedStatus,
          }
        );

        await fetchCategories();

      } else if (key === "brands") {

        const brand =
          catalogData[key][index];

        const updatedStatus =
          brand.active
            ? "Unpublish"
            : "Publish";

        await updateBrandStatus(
          brand.slug,
          {
            status: updatedStatus,
          }
        );

        await fetchBrands();

      } else {

        setCatalogData((prev) => ({
          ...prev,

          [key]: prev[key].map((item, i) =>
            i === index
              ? {
                  ...item,
                  active: !item.active,
                }
              : item
          ),
        }));
      }

    } catch (error) {

      console.error(
        "Toggle Status Error:",
        error
      );
    }
  };

  const toggleDisplaySetting = async (index) => {
  try {
    const token = localStorage.getItem("token");

    // Updated UI state
    const updatedSettings = displaySettings.map((item, i) =>
      i === index
        ? {
            ...item,
            active: !item.active,
          }
        : item
    );

    setDisplaySettings(updatedSettings);

    // Prepare payload
    const payload = {
      retail: updatedSettings.find(
        (item) => item.title === "Retail Price"
      )?.active,

      mrp: updatedSettings.find(
        (item) => item.title === "MRP"
      )?.active,

      b2b: updatedSettings.find(
        (item) => item.title === "B2B Price"
      )?.active,

      description: updatedSettings.find(
        (item) => item.title === "Description"
      )?.active,

      brand: updatedSettings.find(
        (item) => item.title === "Brand"
      )?.active,

      item_code: updatedSettings.find(
        (item) => item.title === "Item Code"
      )?.active,

      sku: updatedSettings.find(
        (item) => item.title === "SKU"
      )?.active,

      stock_quantity: updatedSettings.find(
  (item) => item.title === "Stock Quantity"
)?.active,
    };

    const response = await updateDisplaySettings(
      payload,
      token
    );

    console.log(response);

  } catch (error) {
    console.error("Update Display Settings Error:", error);
  }
};

  return (
    <div className="space-y-7">
      {/* TITLE */}
      <div>
        <div className="flex items-center gap-2">
          <div className="w-[3px] h-[14px] bg-blue-600 rounded-full"></div>

          <h2 className="text-[14px] font-semibold text-black">
            Catalog Settings
          </h2>

          <p className="text-[11px] text-gray-500">
            — Manage categories, brands, offer
            types & home types
          </p>
        </div>
      </div>

      {/* CATALOG */}
      <div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {settingsCards.map((card, cardIndex) => {
            const Icon = card.icon;

            const activeCount = catalogData[
              card.key
            ].filter((item) => item.active).length;

            return (
              <div
                key={cardIndex}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
              >
                {/* HEADER */}
                <div className="px-3 py-3 border-b border-gray-100 flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <Icon
                      size={13}
                      className="text-blue-600 mt-0.5"
                    />

                    <div>
                      <h3 className="text-[12px] font-semibold">
                        {card.title}
                      </h3>

                      <p className="text-[9px] text-gray-500 mt-[2px]">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-[20px] px-2 rounded-full bg-gray-100 flex items-center justify-center text-[9px] font-semibold">
                      {activeCount} active
                    </div>

                    <button
                      onClick={() =>
                        setShowInput((prev) => ({
                          ...prev,
                          [card.key]: true,
                        }))
                      }
                      className="h-[24px] px-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-medium flex items-center gap-1"
                    >
                      <Plus size={10} />
                      Add
                    </button>
                  </div>
                </div>

                {/* BODY */}
                <div className="p-3">
                  {/* INPUT */}
                  {showInput[card.key] && (
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={inputValues[card.key]}
                        onChange={(e) =>
                          setInputValues((prev) => ({
                            ...prev,
                            [card.key]:
                              e.target.value,
                          }))
                        }
                        placeholder={
                          card.placeholder
                        }
                        className="flex-1 h-[32px] rounded-lg border border-gray-200 bg-white px-3 text-[11px] outline-none"
                      />

                      <button
                        onClick={() =>
                          handleAdd(card.key)
                        }
                        className="w-[30px] h-[30px] rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                      >
                        <Check size={14} />
                      </button>

                      <button
                        onClick={() =>
                          setShowInput((prev) => ({
                            ...prev,
                            [card.key]: false,
                          }))
                        }
                        className="w-[24px] h-[24px] flex items-center justify-center"
                      >
                        <X
                          size={14}
                          className="text-black"
                        />
                      </button>
                    </div>
                  )}

                  {/* ITEMS */}
                  <div className="space-y-2">
                    {catalogData[card.key].length >
                    0 ? (
                      catalogData[card.key].map(
                        (item, index) => (
                          <div
                            key={index}
                            className="h-[42px] rounded-xl border border-gray-200 px-3 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  toggleStatus(
                                    card.key,
                                    index
                                  )
                                }
                                className={`w-[34px] h-[18px] rounded-full relative transition-all ${
                                  item.active
                                    ? "bg-blue-600"
                                    : "bg-gray-300"
                                }`}
                              >
                                <div
                                  className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white transition-all ${
                                    item.active
                                      ? "left-[18px]"
                                      : "left-[2px]"
                                  }`}
                                />
                              </button>

                              <h4 className="text-[11px] font-semibold uppercase">
                                {item.name}
                              </h4>
                            </div>

                            <button
                              onClick={() =>
                                handleDelete(
                                  card.key,
                                  index
                                )
                              }
                            >
                              <Trash2
                                size={13}
                                className="text-red-500"
                              />
                            </button>
                          </div>
                        )
                      )
                    ) : (
                      <div className="h-[60px] flex items-center justify-center text-center text-[10px] text-gray-500">
                        No{" "}
                        {card.title.toLowerCase()}{" "}
                        yet. Click Add to create
                        one.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DISPLAY SETTINGS */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-[3px] h-[14px] bg-blue-600 rounded-full"></div>

          <h3 className="text-[13px] font-semibold">
            Display Settings
          </h3>

          <p className="text-[10px] text-gray-500">
            — Control what customers see on the
            catalog
          </p>
        </div>

        <div className="max-w-[420px] bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100">
            <h4 className="text-[9px] font-semibold tracking-wide text-gray-400 uppercase">
              Customer Visibility
            </h4>
          </div>

          {displaySettings.map((item, index) => (
            <div
              key={index}
              className={`px-3 py-3 flex items-center justify-between ${
                index !==
                displaySettings.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <div>
                <h4 className="text-[11px] font-semibold">
                  {item.title}
                </h4>

                <p className="text-[9px] text-gray-500 mt-[2px]">
                  {item.subtitle}
                </p>
              </div>

              <button
                onClick={() =>
                  toggleDisplaySetting(index)
                }
                className={`w-[34px] h-[18px] rounded-full relative transition-all ${
                  item.active
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white transition-all ${
                    item.active
                      ? "left-[18px]"
                      : "left-[2px]"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}