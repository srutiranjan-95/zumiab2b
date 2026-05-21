// src/components/admin/product/AddProduct.jsx

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  X,
 ImagePlus,
  BadgeCheck,
  ClipboardList,
  Plus,
  ChevronDown,
} from "lucide-react";

import {
  getPublishCategory,
  getPublishBrand,
  createProduct,
} from "../../../service/apiAddproduct";

export default function AddProduct({
  closeModal,
  onCreateProduct,
}) {

  // FIX API DOUBLE CALL
  const hasFetched =
    useRef(false);

  const [categories, setCategories] =
    useState([]);

  const [brands, setBrands] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [tags, setTags] = useState([
    "New",
    "Featured",
    "Bestseller",
    "Sale",
    "Limited",
    "Eco",
  ]);

  const [customTag, setCustomTag] =
    useState("");

  const [previewImages, setPreviewImages] =
    useState([]);

  const [productData, setProductData] =
    useState({
      name: "",
      sku: "",
      category: "",
      brand: "",
      mrp: "",
      retail: "",
      b2b: "",
      stock: "",
      description: "",
      min_order_qty: "",
    });

  useEffect(() => {

    if (hasFetched.current)
      return;

    hasFetched.current = true;

    const fetchData =
      async () => {

        await Promise.all([
          fetchPublishCategories(),
          fetchPublishBrands(),
        ]);

      };

    fetchData();

  }, []);

  // FETCH CATEGORY
  const fetchPublishCategories =
    async () => {

      try {

        const response =
          await getPublishCategory();

        setCategories(response);

      } catch (error) {

        console.log(
          "FETCH CATEGORY ERROR :",
          error
        );

      }

    };

  // FETCH BRAND
  const fetchPublishBrands =
    async () => {

      try {

        const response =
          await getPublishBrand();

        setBrands(response);

      } catch (error) {

        console.log(
          "FETCH BRAND ERROR :",
          error
        );

      }

    };

  const handleChange = (e) => {

    setProductData({
      ...productData,
      [e.target.name]:
        e.target.value,
    });

  };

  // IMAGE PREVIEW
  const handleImageUpload = (e) => {

    const files = Array.from(
      e.target.files
    );

    if (
      previewImages.length +
        files.length >
      6
    ) {

      alert(
        "Maximum 6 images allowed"
      );

      return;

    }

    const imagePreviews =
      files.map((file) => ({
        file,
        url: URL.createObjectURL(
          file
        ),
      }));

    setPreviewImages((prev) => [
      ...prev,
      ...imagePreviews,
    ]);

  };

  // REMOVE IMAGE
  const removeImage = (index) => {

    const updatedImages =
      previewImages.filter(
        (_, i) => i !== index
      );

    setPreviewImages(updatedImages);

  };

  // ADD TAG
  const handleAddTag = () => {

    if (
      customTag.trim() !== "" &&
      !tags.includes(
        customTag.trim()
      )
    ) {

      setTags([
        ...tags,
        customTag.trim(),
      ]);

      setCustomTag("");

    }

  };

  // DELETE TAG
  const handleDeleteTag = (
    tagToDelete
  ) => {

    setTags(
      tags.filter(
        (tag) =>
          tag !== tagToDelete
      )
    );

  };

  // CREATE PRODUCT API
  const handleCreateProduct =
    async () => {

      try {

        setLoading(true);

        const payload = {
          name:
            productData.name,

          item_code:
            productData.sku,

          brand:
            productData.brand,

          description:
            productData.description,

          category:
            productData.category,

          mrp: Number(
            productData.mrp
          ),

          retail: Number(
            productData.retail
          ),

          b2b: Number(
            productData.b2b
          ),

          sku:
            productData.sku,

          stock_quantity:
            Number(
              productData.stock
            ),

          min_order_qty:
            Number(
              productData.min_order_qty
            ) || 1,

          is_best_seller: true,

          is_available_on_order: false,

          is_active: true,
        };

        const response =
          await createProduct(
            payload
          );

        console.log(
          "CREATE PRODUCT RESPONSE :",
          response
        );

        onCreateProduct({
          ...productData,

          image:
            previewImages[0]
              ?.url ||
            "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=300&auto=format&fit=crop",

          images:
            previewImages,

          mrp: `₹${productData.mrp}`,

          retail: `₹${productData.retail}`,

          b2b: `₹${productData.b2b}`,
        });

        closeModal();

      } catch (error) {

        console.log(
          "CREATE PRODUCT ERROR :",
          error
        );

      } finally {

        setLoading(false);

      }

    };

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-2 sm:p-4 overflow-y-auto">

      {/* MODAL */}
      <div className="w-full max-w-[600px] bg-white rounded-[20px] shadow-2xl overflow-hidden border border-gray-200 mt-60">

        {/* HEADER */}
        <div className="h-[42px] px-4 border-b border-gray-200 flex items-center justify-between">

          <h2 className="text-[13px] sm:text-[14px] font-semibold text-black">
            Add New Product
          </h2>

          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-black transition-all duration-300"
          >
            <X size={14} />
          </button>

        </div>

        {/* BODY */}
        <div className="p-3 sm:p-4 grid grid-cols-1 md:grid-cols-[170px_1fr] gap-4">

          {/* LEFT SIDE */}
          <div>

            {/* TOP */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">

              <p className="text-[9px] sm:text-[10px] font-semibold text-black">
                Product Photos (up to 6)
              </p>

            </div>

            {/* IMAGE BOX */}
            <label className="h-[110px] sm:h-[120px] border border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition-all duration-300">

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={
                  handleImageUpload
                }
                className="hidden"
              />

              <ImagePlus size={16} />

              <p className="text-[9px] mt-1.5">
                Add photo
              </p>

              <p className="text-[8px] mt-1">
                {
                  previewImages.length
                }
                /6
              </p>

            </label>

            {/* IMAGE PREVIEW */}
            {previewImages.length >
              0 && (

              <div className="grid grid-cols-3 gap-2 mt-2">

                {previewImages.map(
                  (
                    image,
                    index
                  ) => (

                    <div
                      key={index}
                      className="relative h-[48px] rounded-xl overflow-hidden border border-gray-200 group"
                    >

                      <img
                        src={
                          image.url
                        }
                        alt="preview"
                        className="h-full w-full object-cover"
                      />

                      <button
                        onClick={() =>
                          removeImage(
                            index
                          )
                        }
                        className="absolute top-1 right-1 h-4 w-4 rounded-full bg-black/70 text-white hidden group-hover:flex items-center justify-center"
                      >

                        <X size={10} />

                      </button>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

          {/* RIGHT SIDE */}
          <div>

            {/* PRODUCT NAME */}
            <div>

              <label className="text-[9px] sm:text-[10px] font-semibold text-black">
                Product Name *
              </label>

              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                className="mt-1.5 h-[30px] w-full rounded-xl border border-gray-200 px-3 text-[10px] sm:text-[11px] outline-none"
              />

            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">

              <div>

                <label className="text-[9px] sm:text-[10px] font-semibold text-black">
                  Item Code
                </label>

                <input
                  type="text"
                  name="sku"
                  value={productData.sku}
                  onChange={handleChange}
                  placeholder="e.g. LT-1001"
                  className="mt-1.5 h-[30px] w-full rounded-xl border border-gray-200 px-3 text-[10px] sm:text-[11px] outline-none"
                />

              </div>

              {/* BRAND */}
              <div>

                <label className="text-[9px] sm:text-[10px] font-semibold text-black">
                  Brand
                </label>

                <div className="relative">

                  <select
                    name="brand"
                    value={productData.brand}
                    onChange={handleChange}
                    className="mt-1.5 h-[30px] w-full rounded-xl border border-gray-200 px-3 pr-8 text-[10px] sm:text-[11px] appearance-none outline-none bg-white"
                  >

                    <option value="">
                      Select Brand
                    </option>

                    {brands.map(
                      (brand) => (

                        <option
                          key={brand.id}
                          value={brand.name}
                        >
                          {brand.name}
                        </option>

                      )
                    )}

                  </select>

                  <ChevronDown
                    size={12}
                    className="absolute right-3 top-1/2 translate-y-[3px] text-gray-400 pointer-events-none"
                  />

                </div>

              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="mt-3">

              <label className="text-[9px] sm:text-[10px] font-semibold text-black">
                Description
              </label>

              <textarea
                rows={2}
                name="description"
                value={
                  productData.description
                }
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-gray-200 p-3 text-[10px] sm:text-[11px] outline-none resize-none"
              />

            </div>

            {/* CATEGORY */}
            <div className="mt-3">

              <label className="text-[9px] sm:text-[10px] font-semibold text-black">
                Category
              </label>

              <div className="relative">

                <select
                  name="category"
                  value={
                    productData.category
                  }
                  onChange={handleChange}
                  className="mt-1.5 h-[30px] w-full rounded-xl border border-gray-200 px-3 text-[10px] sm:text-[11px] appearance-none outline-none"
                >

                  <option value="">
                    Select a category
                  </option>

                  {categories.map(
                    (category) => (

                      <option
                        key={
                          category.id
                        }
                        value={
                          category.name
                        }
                      >
                        {
                          category.name
                        }
                      </option>

                    )
                  )}

                </select>

                <ChevronDown
                  size={12}
                  className="absolute right-3 top-1/2 translate-y-[3px] text-gray-400 pointer-events-none"
                />

              </div>

            </div>

            {/* PRICING */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">

              <div>

                <label className="text-[9px] sm:text-[10px] font-semibold text-black">
                  MRP
                </label>

                <input
                  type="number"
                  name="mrp"
                  value={productData.mrp}
                  onChange={handleChange}
                  className="mt-1.5 h-[30px] w-full rounded-xl border border-gray-200 px-3 text-[10px] sm:text-[11px] outline-none"
                />

              </div>

              <div>

                <label className="text-[9px] sm:text-[10px] font-semibold text-black">
                  Retail
                </label>

                <input
                  type="number"
                  name="retail"
                  value={productData.retail}
                  onChange={handleChange}
                  className="mt-1.5 h-[30px] w-full rounded-xl border border-gray-200 px-3 text-[10px] sm:text-[11px] outline-none"
                />

              </div>

              <div>

                <label className="text-[9px] sm:text-[10px] font-semibold text-black">
                  B2B
                </label>

                <input
                  type="number"
                  name="b2b"
                  value={productData.b2b}
                  onChange={handleChange}
                  className="mt-1.5 h-[30px] w-full rounded-xl border border-gray-200 px-3 text-[10px] sm:text-[11px] outline-none"
                />

              </div>

              <div>

                <label className="text-[9px] sm:text-[10px] font-semibold text-black">
                  SKU
                </label>

                <input
                  type="text"
                  name="sku"
                  value={productData.sku}
                  onChange={handleChange}
                  className="mt-1.5 h-[30px] w-full rounded-xl border border-gray-200 px-3 text-[10px] sm:text-[11px] outline-none"
                />

              </div>

            </div>

            {/* STOCK */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">

              <div>

                <label className="text-[9px] sm:text-[10px] font-semibold text-black">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  name="stock"
                  value={productData.stock}
                  onChange={handleChange}
                  className="mt-1.5 h-[30px] w-full rounded-xl border border-gray-200 px-3 text-[10px] sm:text-[11px] outline-none"
                />

              </div>

              <div>

                <label className="text-[9px] sm:text-[10px] font-semibold text-black">
                  Min. Order Qty
                </label>

                <input
                  type="number"
                  name="min_order_qty"
                  value={
                    productData.min_order_qty
                  }
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  className="mt-1.5 h-[30px] w-full rounded-xl border border-gray-200 px-3 text-[10px] sm:text-[11px] outline-none"
                />

              </div>

            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-end gap-2 mt-5">

              <button
                onClick={closeModal}
                className="h-[32px] px-4 rounded-xl border border-gray-200 text-[10px] sm:text-[11px] font-medium hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </button>

              <button
                onClick={
                  handleCreateProduct
                }
                disabled={loading}
                className="h-[32px] px-4 rounded-xl bg-blue-600 text-white text-[10px] sm:text-[11px] font-medium hover:bg-blue-700 transition-all duration-300"
              >
                {loading
                  ? "Creating..."
                  : "Create Product"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}