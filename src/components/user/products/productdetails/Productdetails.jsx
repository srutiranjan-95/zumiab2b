import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ShoppingCart,
  Zap,
  Minus,
  Plus,
  CheckCircle2,
  ScanBarcode,
} from "lucide-react";

import { getSingleProduct } from "../../../../service/apiCustomerpage";

function ProductDetails() {
  const navigate = useNavigate();

  const { slug } = useParams();

  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  // GET SINGLE PRODUCT
  useEffect(() => {
    fetchProductDetails();
  }, [slug]);

  const fetchProductDetails = async () => {
    try {
      const response = await getSingleProduct(slug);

      const data = response?.data?.data;

      setProduct(data);

      setSelectedImage(data?.images?.[0] || "");
    } catch (error) {
      console.log("GET PRODUCT DETAILS ERROR :", error);
    }
  };

  const mrp = Number(product?.mrp || 0);

  const retail = Number(product?.retail || 0);

  const discount =
    mrp > retail && mrp > 0 ? Math.round(((mrp - retail) / mrp) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#F4F7FB] px-2 sm:px-3 lg:px-5 py-3">
      {/* CONTAINER */}
      <div className="max-w-6xl mx-auto">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition-all text-[11px] sm:text-xs font-medium cursor-pointer"
        >
          <ArrowLeft size={13} />
          Back to Products
        </button>

        {/* MAIN SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-[90px_1fr_1fr] gap-4 lg:gap-5 mt-4">
          {/* ================================================= */}
          {/* LEFT THUMBNAILS */}
          {/* ================================================= */}

          <div className="flex lg:flex-col gap-2 order-2 lg:order-1 overflow-x-auto lg:overflow-visible">
            {product?.images?.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`min-w-[65px] w-[65px] h-[65px] rounded-2xl overflow-hidden border-2 bg-white transition-all ${
                  selectedImage === img ? "border-[#3164E3]" : "border-gray-200"
                }`}
              >
                <img
                  src={img}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* ================================================= */}
          {/* MAIN IMAGE */}
          {/* ================================================= */}

          <div className="bg-white rounded-[18px] border border-gray-200 overflow-hidden order-1 lg:order-2">
            <div className="relative">
              <img
                src={
                  selectedImage ||
                  "https://via.placeholder.com/600x600?text=No+Image"
                }
                alt={product?.name}
                className="w-full h-[260px] sm:h-[360px] lg:h-[520px] object-cover"
              />
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT SIDE */}
          {/* ================================================= */}

          <div className="flex flex-col order-3">
            {/* TAGS */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="px-2.5 py-1 rounded-full bg-[#F4F6FA] text-black text-[10px] font-semibold flex items-center gap-1">
                {/* <ShoppingCart size={10} /> */}

                {product?.category?.name?.toUpperCase()}
              </div>

              <span className="text-black font-semibold text-[10px] sm:text-[11px]">
                {product?.brand?.name?.toUpperCase()}
              </span>

              {/* <div className="px-2.5 py-1 rounded-full bg-[#F59E0B] text-white text-[9px] font-semibold">

                B2B

              </div> */}
            </div>

            {/* TITLE */}
            <h1 className="mt-3 text-lg sm:text-xl lg:text-[26px] leading-tight font-bold text-black">
              {product?.name}
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-3 text-[11px] sm:text-xs text-gray-500 leading-relaxed">
              {product?.description}
            </p>

            {/* PRICE CARD */}
            <div className="mt-4 bg-white border border-gray-200 rounded-[16px] p-3 sm:p-4">
              {/* PRICE */}
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[#3164E3] text-2xl sm:text-3xl font-bold">
                  ₹{product?.retail}
                </h2>

                <span className="text-gray-400 line-through text-xs sm:text-sm">
                  ₹{product?.mrp}
                </span>

                {discount > 0 && (
                  <div className="px-2 py-1 rounded-full bg-[#FFF1F2] text-[#EF4444] text-[9px] font-semibold">
                    {discount}% OFF
                  </div>
                )}
              </div>

              {/* STOCK */}
              <div className="flex items-center gap-2 mt-3 text-[#16A34A]">
                <CheckCircle2 size={14} />

                <span className="text-[11px] sm:text-xs font-medium">
                  {product?.stock_quantity} in stock
                </span>
              </div>
            </div>

            

            {/* SKU */}
            <div className="flex flex-wrap items-center gap-5 mt-4 text-[11px] sm:text-xs">
              <div className="flex items-center gap-2 text-gray-500">
                <ScanBarcode size={14} />
                SKU:
                <span className="font-semibold text-black">{product?.sku}</span>
              </div>

              <div className="text-gray-500">
                Code:
                <span className="ml-1 font-semibold text-black">
                  {product?.item_code}
                </span>
              </div>
            </div>

            {/* BADGE */}
            {/* <div className="mt-4">
              <span className="px-2.5 py-1 rounded-full bg-[#3164E3] text-white text-[9px] font-semibold">
                New
              </span>
            </div> */}

            {/* QUANTITY */}
            <div className="mt-5">
              <h3 className="text-[11px] sm:text-xs font-bold text-black mb-2">
                Quantity
              </h3>

              {/* QTY BOX */}
              <div className="w-[125px] h-[38px] rounded-lg border border-gray-200 overflow-hidden flex items-center bg-white">
                {/* MINUS */}
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="w-[38px] h-full flex items-center justify-center hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <Minus size={12} />
                </button>

                {/* NUMBER */}
                <div className="flex-1 text-center text-sm font-bold">
                  {quantity}
                </div>

                {/* PLUS */}
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-[38px] h-full border-l border-gray-200 flex items-center justify-center text-[#3164E3] hover:bg-[#EEF3FF] transition-all cursor-pointer"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-auto pt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* CART */}
              <button className="h-[42px] rounded-[14px] border border-gray-200 bg-white flex items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold hover:border-[#3164E3] hover:text-[#3164E3] transition-all cursor-pointer">
                <ShoppingCart size={14} />
                Add to Cart
              </button>

              {/* BUY */}
              <button
                onClick={() =>
                  navigate("/user/buying", {
                    state: {
                      product,
                      quantity,
                    },
                  })
                }
                className="h-[42px] rounded-[14px] bg-[#3164E3] text-white flex items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold hover:bg-[#1E4FD8] transition-all cursor-pointer"
              >
                <Zap size={14} />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
