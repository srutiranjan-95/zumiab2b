/* eslint-disable no-useless-assignment */
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  ShoppingCart,
  Zap,
  Search,
  ChevronDown,
  // Grid2X2,
  // List,
} from "lucide-react";

function Product() {

  const navigate = useNavigate();

  const [categoryOpen, setCategoryOpen] = useState(false);

  const [brandOpen, setBrandOpen] = useState(false);

  const [priceOpen, setPriceOpen] = useState(false);

  const [cartCounts, setCartCounts] = useState({});

  const products = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200&auto=format&fit=crop",
      category: "Furniture",
      brand: "ZUMIA",
      title: "TV Side Table",
      oldPrice: "₹35,000",
      price: "₹12,000",
      stock: "6 in stock",
      discount: "66% OFF",
    },

    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
      category: "Lighting",
      brand: "ZUMIA",
      title: "Crystal Prism",
      oldPrice: "₹2,000",
      price: "₹850",
      stock: "12 in stock",
      discount: "57% OFF",
    },

    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      category: "Lighting",
      brand: "ZUMIA",
      title: "Luxury Chandelier",
      oldPrice: "₹3,456",
      price: "₹1,234",
      stock: "73 in stock",
      discount: "64% OFF",
    },

    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1200&auto=format&fit=crop",
      category: "LED",
      brand: "ZUMIA",
      title: "Modern Hanging",
      oldPrice: "₹2,33,333",
      price: "₹2,222",
      stock: "22 in stock",
      discount: "99% OFF",
    },
  ];

  return (
    <div>

      {/* TOP FILTER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

        {/* SEARCH */}
        <div className="relative w-full lg:w-[320px]">

          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search products..."
            className="w-full h-[40px] bg-white border border-gray-200 rounded-xl pl-10 pr-4 text-xs lg:text-sm outline-none"
          />

        </div>

        {/* FILTERS */}
        <div className="flex items-center gap-2 flex-wrap">

          {/* CATEGORY */}
          <div className="relative">

            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="h-[36px] px-3 rounded-xl bg-[#EFEAFF] text-[#7B5CF0] font-semibold text-xs flex items-center gap-2 cursor-pointer"
            >
              Category
              <ChevronDown size={14} />
            </button>

            {categoryOpen && (
              <div className="absolute top-[45px] left-0 w-[190px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">

                <button className="w-full px-5 py-4 text-left text-sm font-semibold hover:bg-gray-50 flex items-center justify-between">
                  All
                  <span className="text-[#3164E3]">✓</span>
                </button>

                <button className="w-full px-5 py-4 text-left text-sm text-gray-600 hover:bg-gray-50">
                  Furnitures
                </button>

                <button className="w-full px-5 py-4 text-left text-sm text-gray-600 hover:bg-gray-50">
                  Lights
                </button>

              </div>
            )}

          </div>

          {/* BRAND */}
          <div className="relative">

            <button
              onClick={() => setBrandOpen(!brandOpen)}
              className="h-[36px] px-3 rounded-xl bg-[#E7FAF1] text-[#0DAA65] font-semibold text-xs flex items-center gap-2 cursor-pointer"
            >
              Brand
              <ChevronDown size={14} />
            </button>

            {brandOpen && (
              <div className="absolute top-[45px] left-0 w-[190px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">

                <button className="w-full px-5 py-4 text-left text-sm font-semibold hover:bg-gray-50 flex items-center justify-between">
                  All
                  <span className="text-[#3164E3]">✓</span>
                </button>

                <button className="w-full px-5 py-4 text-left text-sm text-gray-600 hover:bg-gray-50">
                  ZUMIA
                </button>

                <button className="w-full px-5 py-4 text-left text-sm text-gray-600 hover:bg-gray-50">
                  IKEA
                </button>

              </div>
            )}

          </div>

          {/* PRICE */}
          <div className="relative">

            <button
              onClick={() => setPriceOpen(!priceOpen)}
              className="h-[36px] px-3 rounded-xl bg-[#FFF2E8] text-[#F97316] font-semibold text-xs flex items-center gap-2 cursor-pointer"
            >
              Price
              <ChevronDown size={14} />
            </button>

            {priceOpen && (
              <div className="absolute top-[45px] right-0 w-[190px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">

                <button className="w-full px-5 py-4 text-left text-sm font-semibold hover:bg-gray-50">
                  ₹0 - ₹1,000
                </button>

                <button className="w-full px-5 py-4 text-left text-sm text-gray-600 hover:bg-gray-50">
                  ₹1,000 - ₹5,000
                </button>

                <button className="w-full px-5 py-4 text-left text-sm text-gray-600 hover:bg-gray-50">
                  ₹5,000+
                </button>

              </div>
            )}

          </div>

          {/* VIEW BUTTONS */}
          <div className="flex items-center overflow-hidden rounded-xl border border-gray-200">

            {/* <button className="w-[38px] h-[36px] bg-[#3164E3] flex items-center justify-center text-white">
              <Grid2X2 size={14} />
            </button>

            <button className="w-[38px] h-[36px] bg-white flex items-center justify-center text-gray-500">
              <List size={14} />
            </button> */}

          </div>

        </div>

      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {products.map((item) => (
          <div
  key={item.id}
  onClick={() => navigate("/user/productdetails")}
  className="bg-white border border-gray-200 hover:border-[#3164E3] hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer"
>

            {/* IMAGE */}
            <div className="relative h-[160px] sm:h-[190px] overflow-hidden">

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              {/* NEW */}
              <div className="absolute top-2 left-2 px-2 py-1 bg-[#3B82F6] text-white text-[9px] font-semibold rounded-full">
                New
              </div>

              {/* DISCOUNT */}
              <div className="absolute top-2 right-2 px-2 py-1 bg-[#EF4444] text-white text-[9px] font-semibold rounded-full">
                {item.discount}
              </div>

            </div>

            {/* CONTENT */}
            <div className="p-3">

              {/* CATEGORY */}
              <div className="flex items-center justify-between">

                <span className="px-2 py-1 bg-gray-100 rounded-full text-[9px] font-semibold">
                  {item.category}
                </span>

                <span className="text-[9px] text-gray-400">
                  #366799
                </span>

              </div>

              {/* BRAND */}
              <p className="mt-2 text-[10px] text-gray-500">
                {item.brand}
              </p>

              {/* TITLE */}
              <h2 className="mt-1 text-sm lg:text-base font-bold leading-tight">
                {item.title}
              </h2>

              {/* PRICE */}
              <div className="mt-3 flex items-center gap-2 flex-wrap">

                <span className="text-gray-400 line-through text-[11px] font-semibold">
                  {item.oldPrice}
                </span>

                <span className="text-[#3164E3] text-sm lg:text-base font-bold">
                  {item.price}
                </span>

              </div>

              {/* BUTTONS */}
              <div className="mt-3 flex items-center gap-2">



{/* CART BUTTON */}
<button
  onClick={(e) => {

    e.stopPropagation();

    const existingCart =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingProduct = existingCart.find(
      (cartItem) => cartItem.id === item.id
    );

    let updatedCart = [];

    if (existingProduct) {

      updatedCart = existingCart.map((cartItem) => {

        if (cartItem.id === item.id) {

          return {
            ...cartItem,
            qty: cartItem.qty + 1,
          };
        }

        return cartItem;
      });

    } else {

      updatedCart = [
        ...existingCart,
        {
          id: item.id,
          name: item.title,
          category: item.category,
          price: Number(
            item.price.replace(/[^0-9]/g, "")
          ),
          qty: 1,
          note: "",
          image: item.image,
        },
      ];
    }

    localStorage.setItem(
      "cartItems",
      JSON.stringify(updatedCart)
    );

    setCartCounts((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  }}
  className="relative w-[34px] h-[34px] rounded-lg border border-gray-200 flex items-center justify-center hover:bg-[#3164E3] hover:text-white hover:border-[#3164E3] transition-all duration-300 cursor-pointer"
>

  {/* BADGE */}
  {cartCounts[item.id] > 0 && (

    <div className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#16A34A] text-white text-[9px] font-bold flex items-center justify-center animate-bounce shadow-md">

      {cartCounts[item.id]}

    </div>

  )}

  <ShoppingCart size={14} />

</button>

                {/* BUY BUTTON */}
                <button
  onClick={(e) => {
    e.stopPropagation();
    navigate("/user/buying");
  }}
                  className="flex-1 h-[34px] rounded-lg bg-[#3164E3] text-white font-semibold text-[11px] flex items-center justify-center gap-1 hover:bg-[#1E4FD8] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >

                  <Zap size={13} />

                  Buy

                </button>

              </div>

              {/* STOCK */}
              <p className="mt-2 text-[10px] text-[#16A34A] font-medium">
                {item.stock}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Product;