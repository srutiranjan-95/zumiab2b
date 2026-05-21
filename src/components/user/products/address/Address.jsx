import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  X,
  Plus,
  ChevronRight,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";

function Address() {

  const navigate = useNavigate();

  /* FORM */
  const [showForm, setShowForm] = useState(false);

  /* EDIT */
  const [editId, setEditId] = useState(null);

  /* FORM DATA */
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    state: "",
  });

  /* ADDRESS LIST */
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      fullName: "Srutiranjan Nayak",
      mobile: "0637277177",
      address1: "bada sandado",
      address2: "sandado agarpada",
      city: "Bhadrak",
      pincode: "756115",
      state: "Odisha",
      default: true,
    },
  ]);

  /* INPUT CHANGE */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* SAVE ADDRESS */
  const handleSaveAddress = () => {

    if (editId) {

      const updated = addresses.map((item) =>
        item.id === editId
          ? {
              ...item,
              ...formData,
            }
          : item
      );

      setAddresses(updated);

      setEditId(null);

    } else {

      const newAddress = {
        id: Date.now(),
        ...formData,
        default: addresses.length === 0,
      };

      setAddresses([...addresses, newAddress]);

    }

    setShowForm(false);

    setFormData({
      fullName: "",
      mobile: "",
      address1: "",
      address2: "",
      city: "",
      pincode: "",
      state: "",
    });

  };

  /* DELETE */
  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmDelete) return;

    const filtered = addresses.filter((item) => item.id !== id);

    if (filtered.length > 0 && !filtered.some((item) => item.default)) {
      filtered[0].default = true;
    }

    setAddresses(filtered);

  };

  /* EDIT */
  const handleEdit = (item) => {

    setFormData(item);

    setEditId(item.id);

    setShowForm(true);

  };

  /* SET DEFAULT */
  const handleDefault = (id) => {

    const updated = addresses.map((item) => ({
      ...item,
      default: item.id === id,
    }));

    updated.sort((a, b) => b.default - a.default);

    setAddresses(updated);

  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center p-2 sm:p-4">

      {/* MAIN CARD */}
      <div className="w-full max-w-[650px] bg-white rounded-[20px] shadow-lg p-4 sm:p-5">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex items-start justify-between">

          <div>

            {/* TITLE */}
            <div className="flex items-center gap-2">

              <button
                onClick={() => navigate(-1)}
                className="text-gray-500 hover:text-black transition-all"
              >

                <ArrowLeft size={18} />

              </button>

              <h1 className="text-lg sm:text-xl font-bold text-black">
                Delivery Address
              </h1>

            </div>

            {/* STEPS */}
            <div className="flex items-center gap-2 mt-4 flex-wrap">

              {/* STEP 1 */}
              <div className="flex items-center gap-1">

                <div className="w-6 h-6 rounded-full bg-[#3164E3] text-white text-[10px] font-semibold flex items-center justify-center">
                  1
                </div>

                <span className="text-[#3164E3] text-xs font-medium">
                  Qty
                </span>

              </div>

              <div className="w-6 h-[1px] bg-[#3164E3]" />

              {/* STEP 2 */}
              <div className="flex items-center gap-1">

                <div className="w-6 h-6 rounded-full bg-[#3164E3] text-white text-[10px] font-semibold flex items-center justify-center">
                  2
                </div>

                <span className="text-[#3164E3] text-xs font-medium">
                  Address
                </span>

              </div>

              <div className="w-6 h-[1px] bg-gray-300" />

              {/* STEP 3 */}
              <div className="flex items-center gap-1">

                <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-[10px] font-semibold flex items-center justify-center">
                  3
                </div>

                <span className="text-gray-500 text-xs font-medium">
                  Payment
                </span>

              </div>

            </div>

          </div>

          {/* CLOSE */}
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-black transition-all"
          >

            <X size={18} />

          </button>

        </div>

        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        {showForm && (

          <div className="mt-6">

            {/* FULL NAME */}
            <div>

              <label className="text-sm font-semibold">
                Full Name *
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className="mt-2 w-full h-[46px] rounded-[14px] border border-gray-200 px-4 text-sm outline-none"
              />

            </div>

            {/* MOBILE */}
            <div className="mt-4">

              <label className="text-sm font-semibold">
                Mobile Number *
              </label>

              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className="mt-2 w-full h-[46px] rounded-[14px] border border-gray-200 px-4 text-sm outline-none"
              />

            </div>

            {/* ADDRESS 1 */}
            <div className="mt-4">

              <label className="text-sm font-semibold">
                Address Line 1 *
              </label>

              <input
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                placeholder="House no., Building, Street"
                className="mt-2 w-full h-[46px] rounded-[14px] border border-gray-200 px-4 text-sm outline-none"
              />

            </div>

            {/* ADDRESS 2 */}
            <div className="mt-4">

              <label className="text-sm font-semibold">
                Address Line 2
              </label>

              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                placeholder="Area, Colony, Landmark"
                className="mt-2 w-full h-[46px] rounded-[14px] border border-gray-200 px-4 text-sm outline-none"
              />

            </div>

            {/* CITY + PINCODE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

              <div>

                <label className="text-sm font-semibold">
                  City *
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="mt-2 w-full h-[46px] rounded-[14px] border border-gray-200 px-4 text-sm outline-none"
                />

              </div>

              <div>

                <label className="text-sm font-semibold">
                  Pincode *
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                  className="mt-2 w-full h-[46px] rounded-[14px] border border-gray-200 px-4 text-sm outline-none"
                />

              </div>

            </div>

            {/* STATE */}
            <div className="mt-4">

              <label className="text-sm font-semibold">
                State *
              </label>

              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-2 w-full h-[46px] rounded-[14px] border border-gray-200 px-4 text-sm outline-none bg-white"
              >

                <option value="">
                  Select state
                </option>

                <option value="Odisha">
                  Odisha
                </option>

                <option value="Delhi">
                  Delhi
                </option>

                <option value="Maharashtra">
                  Maharashtra
                </option>

              </select>

            </div>

            {/* SAVE BUTTON */}
            <button
              onClick={handleSaveAddress}
              className="mt-5 w-full h-[48px] rounded-[16px] bg-[#3164E3] text-white text-sm font-semibold hover:bg-[#1E4FD8] transition-all cursor-pointer"
            >

              {editId ? "Update Address" : "Save Address"}

            </button>

          </div>

        )}

        {/* ================================================= */}
        {/* ADDRESS LIST */}
        {/* ================================================= */}

        {!showForm && (

          <div className="mt-6">

            {/* EMPTY */}
            {addresses.length === 0 && (

              <div className="py-12 flex flex-col items-center justify-center">

                <div className="w-16 h-16 rounded-full bg-[#F4F7FB] flex items-center justify-center text-gray-400">

                  <MapPin size={30} />

                </div>

                <p className="mt-4 text-gray-500 text-sm">
                  No saved addresses yet
                </p>

              </div>

            )}

            {/* ADDRESS TABLE */}
            <div className="space-y-4">

              {addresses.map((item) => (

                <div
                  key={item.id}
                  className={`rounded-[18px] p-4 border-2 ${
                    item.default
                      ? "border-[#3164E3] bg-[#F8FBFF]"
                      : "border-gray-200 bg-white"
                  }`}
                >

                  <div className="flex items-start justify-between gap-4">

                    {/* LEFT */}
                    <div className="flex gap-3">

                      {/* DEFAULT RADIO */}
                      <button
                        onClick={() => handleDefault(item.id)}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                          item.default
                            ? "border-[#3164E3]"
                            : "border-gray-300"
                        }`}
                      >

                        {item.default && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#3164E3] cursor-pointer" />
                        )}

                      </button>

                      {/* DETAILS */}
                      <div>

                        <div className="flex flex-wrap items-center gap-2">

                          <h2 className="text-base font-bold text-black">
                            {item.fullName}
                          </h2>

                          <span className="text-sm text-gray-500">
                            {item.mobile}
                          </span>

                          {item.default && (
                            <span className="px-2 py-1 rounded-full bg-[#EEF3FF] text-[#3164E3] text-[10px] font-semibold">
                              Default
                            </span>
                          )}

                        </div>

                        <p className="mt-2 text-sm text-gray-500 leading-relaxed">

                          {item.address1}, {item.address2},{" "}
                          {item.city}, {item.state},{" "}
                          {item.pincode}

                        </p>

                      </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-3">

                      {/* EDIT */}
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-gray-500 hover:text-[#3164E3] transition-all cursor-pointer"
                      >

                        <Pencil size={16} />

                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-500 hover:text-red-500 transition-all cursor-pointer"
                      >

                        <Trash2 size={16} />

                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* ADD NEW */}
            <button
              onClick={() => {
                setShowForm(true);
                setEditId(null);
              }}
              className="mt-4 w-full h-[54px] border-2 border-dashed border-gray-200 rounded-[18px] flex items-center justify-center gap-2 text-gray-500 text-sm font-medium hover:border-[#3164E3] hover:text-[#3164E3] transition-all cursor-pointer"
            >

              <Plus size={18} />

              Add New Address

            </button>

            
           {/* CONTINUE */}
<button
  onClick={() => navigate("/user/products/payment")}
  className="mt-5 w-full h-[50px] rounded-[16px] bg-[#3164E3] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#1E4FD8] transition-all cursor-pointer"
>

  Continue

  <ChevronRight size={18} />

</button>

          </div>

        )}

      </div>

    </div>
  );
}

export default Address;