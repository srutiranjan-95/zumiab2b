import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  MessageSquare,
  X,
  ShieldCheck,
  Truck,
  Receipt,
  CreditCard,
  BadgeCheck,
} from "lucide-react";

import { useCartWebSocket } from "../../context/WebSocket";

import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import {
  getCartItems,
  deleteCartItem,
  updateCartQuantity,
  addMessage,
} from "../../../service/apiCart"; // update path as per your project

function Cart() {
  const navigate = useNavigate();

  const { sendCartEvent } = useCartWebSocket();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [savedNotes, setSavedNotes] = useState({});

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await getCartItems();

      const items = response?.data || response?.results || response || [];

      const formattedItems = items.map((item) => ({
        id: item.id,
        cart_item_id: item.cart_item_id,
        name: item.name,
        image: item.images?.[0] || "/placeholder.png",
        price: Number(item.retail),
        qty: Number(item.quantity),
        note: "",
      }));

      setCartItems(formattedItems);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQty = async (id, type) => {
    const currentItem = cartItems.find((item) => item.id === id);

    if (!currentItem) return;

    const newQty =
      type === "increase"
        ? currentItem.qty + 1
        : currentItem.qty > 1
          ? currentItem.qty - 1
          : 1;

    // Update UI instantly
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item)),
    );

    try {
      await updateCartQuantity(currentItem.id, newQty);
    } catch (error) {
      console.error("Quantity Update Failed:", error);

      // Revert if API fails
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                qty: currentItem.qty,
              }
            : item,
        ),
      );
    }
  };

  const updateNote = (id, value) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          note: value,
        };
      }

      return item;
    });

    setCartItems(updatedCart);

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const saveNote = async (id) => {
    const item = cartItems.find((cartItem) => cartItem.id === id);

    if (!item?.note?.trim()) return;

    try {
      await addMessage({
        message: item.note,
      });

      setSavedNotes((prev) => ({
        ...prev,
        [id]: true,
      }));
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCartItem(selectedItem, selectedItem);

      setCartItems((prev) =>
        prev.filter((item) => item.cart_item_id !== selectedItem),
      );

      sendCartEvent({
        type: "cart_update",
      });

      setShowDeleteModal(false);
    } catch (error) {
      console.error("Delete Failed:", error);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  // const gst = subtotal * 0.18;

  // const shipping = 499;

  const grandTotal = subtotal;
  /* LOADING */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f7fb] px-3 sm:px-4 lg:px-5 py-4 animate-pulse">
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-[24px] border border-gray-200 p-4"
            >
              <div className="flex gap-4">
                <div className="w-[74px] h-[74px] rounded-[18px] bg-gray-200" />

                <div className="flex-1">
                  <div className="h-4 w-48 bg-gray-200 rounded" />

                  <div className="h-3 w-28 bg-gray-200 rounded mt-3" />

                  <div className="h-9 w-28 bg-gray-200 rounded-xl mt-6" />
                </div>
              </div>

              <div className="h-20 bg-gray-100 rounded-2xl mt-5" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  /* EMPTY CART UI */
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center px-4">
        <div className="text-center">
          {/* TITLE */}
          <h1 className="text-[28px] font-bold text-black mt-4">
            Your cart is empty
          </h1>

          {/* SUBTITLE */}
          <p className="text-[12px] text-[#64748b] mt-3">
            Add products from the catalog to get started.
          </p>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/user/products")}
            className="mt-8 h-[36px] px-6 rounded-2xl bg-gradient-to-r from-[#3164E3] to-[#5B7FFF] hover:opacity-95 transition-all text-white text-[18px] font-semibold shadow-[0_10px_25px_rgba(49,100,227,0.25)] flex items-center gap-3 mx-auto cursor-pointer"
          >
            <ArrowLeft size={10} />
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] px-3 sm:px-4 lg:px-5 py-4">
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all"
          >
            <ArrowLeft size={16} />
          </button>

          <div>
            <h1 className="text-[22px] sm:text-[26px] font-bold text-black leading-none">
              Shopping Cart
            </h1>

            <p className="text-[11px] text-gray-500 mt-1">
              {cartItems.length} items in your cart
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 h-[38px] rounded-2xl shadow-sm">
            <ShieldCheck size={14} className="text-[#3164E3]" />

            <span className="text-[11px] font-medium text-gray-700">
              Secure Checkout
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 h-[38px] rounded-2xl shadow-sm">
            <Truck size={14} className="text-[#3164E3]" />

            <span className="text-[11px] font-medium text-gray-700">
              Fast Delivery
            </span>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
        {/* LEFT SIDE */}
        <div className="space-y-3">
          {cartItems.map((item) => {
            const total = item.price * item.qty;

            return (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-[24px] p-4 shadow-[0_10px_25px_rgba(0,0,0,0.03)]"
              >
                {/* TOP */}
                <div className="flex items-start gap-4">
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[74px] h-[74px] rounded-[18px] object-cover border border-gray-200 shrink-0"
                  />

                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">
                    {/* TITLE + PRICE */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="text-[15px] font-semibold text-black leading-6 truncate max-w-[200px] sm:max-w-[260px]">
                          {item.name}
                        </h2>

                        <p className="text-[12px] text-[#5b6b88] mt-1">
                          ₹{item.price.toLocaleString()}.00 each
                        </p>
                      </div>

                      {/* TOTAL PRICE */}
                      <h3 className="text-[18px] font-bold text-black whitespace-nowrap">
                        ₹{total.toLocaleString()}.00
                      </h3>
                    </div>

                    {/* QTY + DELETE */}
                    <div className="flex items-center justify-end gap-3 mt-4">
                      {/* QTY */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, "decrease")}
                          className="w-8 h-8 rounded-2xl border border-gray-200 bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
                        >
                          <Minus size={13} />
                        </button>

                        <span className="text-[14px] font-semibold min-w-[18px] text-center">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => updateQty(item.id, "increase")}
                          className="w-8 h-8 rounded-2xl border border-gray-200 bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* DELETE */}
                      <button
                        onClick={() => {
                          setSelectedItem(item.cart_item_id);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-500 hover:text-red-600 transition-all cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* NOTE BOX */}
                <div className="mt-5 flex items-start gap-3">
                  <MessageSquare
                    size={16}
                    className="text-[#5b6b88] mt-4 shrink-0"
                  />

                  <div className="w-full relative">
                    <textarea
                      value={item.note}
                      onChange={(e) => updateNote(item.id, e.target.value)}
                      placeholder="Item note / special instruction (optional)"
                      className="w-full min-h-[72px] bg-[#fafbfd] border border-gray-200 rounded-[18px] pl-4 pr-[90px] py-4 text-[12px] outline-none resize-none shadow-sm"
                    />

                    {/* SAVE BUTTON */}
                    <button
                      onClick={() => saveNote(item.id)}
                      className={`absolute bottom-3 right-3 transition-all cursor-pointer text-white text-[10px] font-semibold px-3 h-[30px] rounded-xl shadow-[0_8px_20px_rgba(49,100,227,0.25)] ${
                        savedNotes[item.id]
                          ? "bg-green-500"
                          : "bg-gradient-to-r from-[#3164E3] to-[#5B7FFF] hover:opacity-95"
                      }`}
                    >
                      {savedNotes[item.id] ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="sticky top-5 h-fit">
          <div className="bg-white border border-gray-200 rounded-[28px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
            {/* HEADER */}
            <div className="bg-gradient-to-r from-[#3164E3] to-[#5B7FFF] p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-md">
                    <Receipt size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[2px] text-white/70">
                      Order Summary
                    </p>

                    <h2 className="text-[18px] font-bold mt-1">Receipt</h2>
                  </div>
                </div>

                <BadgeCheck size={20} />
              </div>
            </div>

            {/* BODY */}
            <div className="p-4">
              {/* ITEMS */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3"
                  >
                    <div>
                      <h3 className="text-[12px] font-semibold text-black">
                        {item.name}
                      </h3>

                      <p className="text-[10px] text-gray-500 mt-1">
                        ₹{item.price.toLocaleString()} × {item.qty}
                      </p>
                    </div>

                    <h4 className="text-[12px] font-bold text-black whitespace-nowrap">
                      ₹{(item.price * item.qty).toLocaleString()}
                    </h4>
                  </div>
                ))}
              </div>

              {/* DIVIDER */}
              <div className="border-t border-dashed border-gray-300 my-5"></div>

              {/* PRICE DETAILS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-gray-500">Subtotal</p>

                  <p className="text-[12px] font-semibold text-black">
                    ₹{subtotal.toLocaleString()}
                  </p>
                </div>

                {/* <div className="flex items-center justify-between">

                  <p className="text-[11px] text-gray-500">
                    GST (18%)
                  </p>

                  <p className="text-[12px] font-semibold text-black">
                    ₹{gst.toLocaleString()}
                  </p>

                </div> */}

                {/* <div className="flex items-center justify-between">

                  <p className="text-[11px] text-gray-500">
                    Shipping
                  </p>

                  <p className="text-[12px] font-semibold text-black">
                    ₹{shipping.toLocaleString()}
                  </p>

                </div> */}
              </div>

              {/* DIVIDER */}
              <div className="border-t border-dashed border-gray-300 my-5"></div>

              {/* TOTAL */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[2px] text-gray-400">
                    Grand Total
                  </p>

                  <h2 className="text-[26px] font-bold text-black mt-1">
                    ₹{grandTotal.toLocaleString()}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-[#eef3ff] flex items-center justify-center">
                  <CreditCard size={20} className="text-[#3164E3]" />
                </div>
              </div>
              {/* CHECKOUT BUTTON */}
              <button
                onClick={() =>
                  navigate("/user/address", {
                    state: {
                      cartItems,
                      grandTotal,

                      product: {
                        id: cartItems?.[0]?.id,
                        name: cartItems?.[0]?.name,
                      },

                      quantity: cartItems?.[0]?.qty || 1,
                    },
                  })
                }
                className="w-full mt-5 h-[48px] rounded-2xl bg-gradient-to-r from-[#3164E3] to-[#5B7FFF] hover:opacity-95 transition-all text-white text-[13px] font-semibold shadow-[0_10px_25px_rgba(49,100,227,0.25)] cursor-pointer"
              >
                Proceed to Checkout
              </button>

              {/* BOTTOM TEXT */}
              <p className="text-center text-[10px] text-gray-400 mt-4 leading-5">
                Secure payment protected.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-[340px] bg-white rounded-[26px] p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-black">Remove Item</h2>

              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <p className="text-[12px] text-gray-500 leading-6 mt-3">
              Are you sure you want to remove this product from your cart?
            </p>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="h-[42px] rounded-2xl border border-gray-200 text-[12px] font-semibold hover:bg-gray-100 transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="h-[42px] rounded-2xl bg-red-500 hover:bg-red-600 text-white text-[12px] font-semibold transition-all cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
