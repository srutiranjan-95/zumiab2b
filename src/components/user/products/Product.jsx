/* eslint-disable no-useless-assignment */
import { useEffect, useState, useRef } from "react";

import { useCartWebSocket } from "../../context/WebSocket";

import { useNavigate } from "react-router-dom";

import { ShoppingCart, Zap, Search, ChevronDown } from "lucide-react";

import {
  getPublishProducts,
  getProductsByPrice,
} from "../../../service/apiCustomerpage";
import { addToCart, getCartItems,} from "../../../service/apiCart";

import {
  getPublishCategory,
  getPublishBrand,
} from "../../../service/apiAddproduct";

function Product() {
  const navigate = useNavigate();

  const {
  sendCartEvent,
  addCartMessageHandler,
} = useCartWebSocket();

  const [categoryOpen, setCategoryOpen] = useState(false);

  const [brandOpen, setBrandOpen] = useState(false);

  const [priceOpen, setPriceOpen] = useState(false);

  const [cartCounts, setCartCounts] = useState({});

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categoryRef = useRef(null);
  const brandRef = useRef(null);
  const priceRef = useRef(null);

  // GET PUBLISH PRODUCTS
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
    fetchCartItems();
  }, []);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      categoryRef.current &&
      !categoryRef.current.contains(event.target)
    ) {
      setCategoryOpen(false);
    }

    if (
      brandRef.current &&
      !brandRef.current.contains(event.target)
    ) {
      setBrandOpen(false);
    }

    if (
      priceRef.current &&
      !priceRef.current.contains(event.target)
    ) {
      setPriceOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

useEffect(() => {
  const removeHandler = addCartMessageHandler((data) => {
    console.log("PRODUCT WS:", data);

    if (data.type === "cart_quantity") {
      setCartCounts((prev) => ({
        ...prev,
        [data.product_id]: data.quantity,
      }));
    }
  });

  return removeHandler;
}, [addCartMessageHandler]);

  const fetchCategories = async () => {
    try {
      const response = await getPublishCategory();

      console.log("CATEGORY RESPONSE:", response);

      setCategories(response || []);
    } catch (error) {
      console.log("CATEGORY ERROR:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await getPublishBrand();

      console.log("BRAND RESPONSE:", response);

      setBrands(response || []);
    } catch (error) {
      console.log("BRAND ERROR:", error);
    }
  };

 const fetchCartItems = async () => {
  try {
    const response = await getCartItems();

    if (response?.status) {
      const counts = {};

      response.data.forEach((item) => {
        counts[item.id] = item.quantity;
      });

      setCartCounts(counts);
    }
  } catch (error) {
    console.error("Cart Fetch Error:", error);
  }
};
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getPublishProducts();

      console.log("API RESPONSE:", response);

      const productData = response?.data || response?.data?.data || [];

      const formattedProducts = productData.map((item) => {
        const mrp = Number(item.mrp || 0);

        const retail = Number(item.retail || 0);

        const discount =
          mrp > retail && mrp > 0
            ? Math.round(((mrp - retail) / mrp) * 100)
            : 0;

        return {
          id: item.id,
          slug: item.slug,

          image:
            item.images?.[0] ||
            "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200&auto=format&fit=crop",

          category: item.category?.name ?? "",

          brand: item.brand?.name ?? "",

          title: item.name ?? "",

          oldPrice:
  item.mrp !== null &&
  item.mrp !== undefined &&
  item.mrp !== ""
    ? `₹${item.mrp}`
    : "",

          price:
  item.retail !== null &&
  item.retail !== undefined &&
  item.retail !== ""
    ? `₹${item.retail}`
    : "",

          stock:
  item.stock_quantity !== null &&
  item.stock_quantity !== undefined &&
  item.stock_quantity !== ""
    ? `${item.stock_quantity} in stock`
    : "",

          discount: discount > 0 ? `${discount}% OFF` : "",
        };
      });

      setProducts(formattedProducts);
      setAllProducts(formattedProducts);
      setLoading(false);
    } catch (error) {
      console.error("FETCH PRODUCTS ERROR:", error);
      setLoading(false);
    }
  };

  const handlePriceFilter = async (priceRange) => {
    try {
      const response = await getProductsByPrice(priceRange);

      console.log("Price Filter:", response);

      const productData = response?.results || [];

      const formattedProducts = productData.map((item) => {
        const mrp = Number(item.mrp || 0);

        return {
          id: item.id,
          slug: item.slug,

          image:
            item.image ||
            "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200&auto=format&fit=crop",

          category: item.category ?? "",

brand: item.brand ?? "",

title: item.name ?? "",

oldPrice:
  item.mrp !== null &&
  item.mrp !== undefined &&
  item.mrp !== ""
    ? `₹${item.mrp}`
    : "",

price:
  item.retail !== null &&
  item.retail !== undefined &&
  item.retail !== ""
    ? `₹${item.retail}`
    : "",

stock:
  item.stock_quantity !== null &&
  item.stock_quantity !== undefined &&
  item.stock_quantity !== ""
    ? `${item.stock_quantity} in stock`
    : "",

          discount: "",
        };
      });

      setProducts(formattedProducts);

      setPriceOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const clearPriceFilter = () => {
    fetchProducts();
    setPriceOpen(false);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter(
      (item) =>
        item.title?.toLowerCase().includes(value.toLowerCase()) ||
        item.brand?.toLowerCase().includes(value.toLowerCase()) ||
        item.category?.toLowerCase().includes(value.toLowerCase()),
    );

    setProducts(filtered);
  };
  console.log("categories =", categories);
  console.log("brands =", brands);
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
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full h-[40px] bg-white border border-gray-200 rounded-xl pl-10 pr-4 text-xs lg:text-sm outline-none"
          />
        </div>

        {/* FILTERS */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* CATEGORY */}
<div className="relative" ref={categoryRef}>
            <button
              onClick={() => {
  setCategoryOpen(!categoryOpen);
  setBrandOpen(false);
  setPriceOpen(false);
}}
              className="h-[36px] px-3 rounded-xl bg-[#EFEAFF] text-[#7B5CF0] font-semibold text-xs flex items-center gap-2 cursor-pointer"
            >
              Category
              <ChevronDown size={14} />
            </button>

            {categoryOpen && (
              <div className="absolute top-[45px] left-0 w-[220px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-[300px] overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setProducts(allProducts);
                    setCategoryOpen(false);
                  }}
                  className="w-full px-5 py-3 text-left text-sm hover:bg-gray-50"
                >
                  All
                </button>

                {categories.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedCategory(item.name);

                      const filtered = allProducts.filter(
                        (product) => product.category === item.name,
                      );

                      setProducts(filtered);
                      setCategoryOpen(false);
                    }}
                    className="w-full px-5 py-3 text-left text-sm hover:bg-gray-50"
                  >
                    {item.name.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* BRAND */}
<div className="relative" ref={brandRef}>
            <button
              onClick={() => {
  setBrandOpen(!brandOpen);
  setCategoryOpen(false);
  setPriceOpen(false);
}}
              className="h-[36px] px-3 rounded-xl bg-[#E7FAF1] text-[#0DAA65] font-semibold text-xs flex items-center gap-2 cursor-pointer"
            >
              Brand
              <ChevronDown size={14} />
            </button>

            {brandOpen && (
              <div className="absolute top-[45px] left-0 w-[220px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-[300px] overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedBrand("All");
                    setProducts(allProducts);
                    setBrandOpen(false);
                  }}
                  className="w-full px-5 py-3 text-left text-sm hover:bg-gray-50"
                >
                  All
                </button>

                {brands.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedBrand(item.name);

                      const filtered = allProducts.filter(
                        (product) => product.brand === item.name,
                      );

                      setProducts(filtered);
                      setBrandOpen(false);
                    }}
                    className="w-full px-5 py-3 text-left text-sm hover:bg-gray-50"
                  >
                    {item.name.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRICE */}
<div className="relative" ref={priceRef}>
            <button
              onClick={() => {
  setPriceOpen(!priceOpen);
  setCategoryOpen(false);
  setBrandOpen(false);
}}
              className="h-[36px] px-3 rounded-xl bg-[#FFF2E8] text-[#F97316] font-semibold text-xs flex items-center gap-2 cursor-pointer"
            >
              Price
              <ChevronDown size={14} />
            </button>

            {priceOpen && (
              <div className="absolute top-[45px] right-0 w-[190px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
               <button
  onClick={() => handlePriceFilter("0-1000")}
  className="w-full px-5 py-4 text-left text-gray-600 text-sm font-semibold hover:bg-gray-100"
>
  ₹0 - ₹1,000
</button>

<button
  onClick={() => handlePriceFilter("1000-5000")}
  className="w-full px-5 py-4 text-left text-sm text-gray-600 hover:bg-gray-100 font-semibold"
>
  ₹1,000 - ₹5,000
</button>

<button
  onClick={() => handlePriceFilter("5000-10000")}
  className="w-full px-5 py-4 text-left text-sm text-gray-600 hover:bg-gray-100 font-semibold"
>
  ₹5,000 - ₹10,000
</button>

<button
  onClick={() => handlePriceFilter("10000-100000")}
  className="w-full px-5 py-4 text-left text-sm text-gray-600 hover:bg-gray-100 font-semibold"
>
  ₹10,000 - ₹1,00,000
</button>
<button
  onClick={() => handlePriceFilter("100000-infinity")}
  className="w-full px-5 py-4 text-left text-sm text-gray-600 hover:bg-gray-100 font-semibold"
>
  ₹1,00,000+
</button>
<button
  onClick={clearPriceFilter}
  className="w-full px-5 py-4 text-left text-red-400 hover:bg-red-50  border-t"
>
  Clear Filter
</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="h-[190px] bg-gray-200"></div>

              <div className="p-3">
                <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>

                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>

                <div className="h-4 w-3/4 bg-gray-200 rounded mb-4"></div>

                <div className="h-5 w-24 bg-gray-200 rounded mb-4"></div>

                <div className="flex gap-2">
                  <div className="w-[34px] h-[34px] bg-gray-200 rounded-lg"></div>

                  <div className="flex-1 h-[34px] bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/user/productdetails/${item.slug}`)}
              className="bg-white border border-gray-200 hover:border-[#3164E3] hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* IMAGE */}
              <div className="relative h-[160px] sm:h-[190px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {item.discount && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-[#EF4444] text-white text-[9px] font-semibold rounded-full">
                    {item.discount}
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-3 flex flex-col min-h-[250px]">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-[9px] font-semibold">
                    {item.category}
                  </span>
                </div>

                <p className="mt-2 text-[10px] text-gray-500">{item.brand}</p>

                <h2 className="mt-1 text-sm lg:text-base font-bold leading-tight h-[48px] overflow-hidden">
                  {item.title}
                </h2>

                <div className="mt-auto">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-gray-400 line-through font-bold">
                      {item.oldPrice}
                    </span>

                    <span className="text-[#3164E3] text-sm lg:text-base font-bold">
                      {item.price}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();

                        try {
                          const response = await addToCart(item.id, 1);

                          if (response?.data?.status) {
  sendCartEvent({
    type: "cart_update",
  });
}
                        } catch (error) {
                          console.error("ADD TO CART ERROR:", error);
                        }
                      }}
                      className="relative w-[34px] h-[34px] rounded-lg border border-gray-200 flex items-center justify-center hover:bg-[#3164E3] hover:text-white hover:border-[#3164E3] transition-all duration-300 cursor-pointer"
                    >
                      {cartCounts[item.id] > 0 && (
                        <div className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#16A34A] text-white text-[9px] font-bold flex items-center justify-center animate-bounce shadow-md">
                          {cartCounts[item.id]}
                        </div>
                      )}

                      <ShoppingCart size={14} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        navigate("/user/buying", {
                          state: {
                            product: item,
                            quantity: 1,
                          },
                        });
                      }}
                      className="flex-1 h-[34px] rounded-lg bg-[#3164E3] text-white font-semibold text-[11px] flex items-center justify-center gap-1 hover:bg-[#1E4FD8] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    >
                      <Zap size={13} />
                      Buy
                    </button>
                  </div>

                  <p className="mt-2 text-[10px] text-[#16A34A] font-medium">
                    {item.stock}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-6xl mb-4">🔍</div>

          <h2 className="text-xl font-bold text-gray-700">No Products Found</h2>

          <p className="mt-2 text-sm text-gray-500">
            No products found for "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
}

export default Product;
