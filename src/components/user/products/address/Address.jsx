import { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import {
  getAddresses,
  addAddress,
  deleteAddress,
  changeDefaultStatus,
  editAddress,
} from "../../../../service/apiAddress";

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

  const location = useLocation();

  const { cartItems, grandTotal, product, quantity, remarks } = location.state || {};

  console.log("Address Page State =", location.state);
  console.log("Address grandTotal =", grandTotal);
  console.log("Address product =", product);

  /* FORM */
  const [showForm, setShowForm] = useState(false);

  /* EDIT */
  const [editId, setEditId] = useState(null);

  /* FORM DATA */
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    alternateMobile: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    state: "",
  });

  /* ADDRESS LIST */
  const [addresses, setAddresses] = useState([]);

  const selectedAddress = addresses.find((item) => item.default);

  /* FETCH ADDRESSES */
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await getAddresses();

      console.log(response);

      console.log("ADDRESS DATA:", response.data);

      if (response.status) {
        setAddresses(
          response.data.map((item) => ({
            ...item,
            default: item.is_default,
          })),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* INPUT CHANGE */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* SAVE ADDRESS */
  const handleSaveAddress = async () => {
    try {
      const payload = {
        full_name: formData.fullName,
        mobile_number: formData.mobile,
        alternate_mobile_number: formData.alternateMobile,
        address_line_1: formData.address1,
        address_line_2: formData.address2,
        city: formData.city,
        pincode: formData.pincode,
        state: formData.state,
      };

      let response;

      if (editId) {
        // EDIT ADDRESS
        response = await editAddress(editId, payload);
      } else {
        // ADD ADDRESS
        response = await addAddress(formData);
      }

      console.log(response);

      if (response.status === "success" || response.status === true) {
        await fetchAddresses();

        setShowForm(false);

        setEditId(null);

        setFormData({
          fullName: "",
          mobile: "",
          address1: "",
          address2: "",
          city: "",
          pincode: "",
          state: "",
        });

        alert(
          response.message ||
            (editId
              ? "Address updated successfully"
              : "Address added successfully"),
        );
      }
    } catch (error) {
      console.log(error);

      alert(error?.response?.data?.message || "Failed to save address");
    }
  };

  /* DELETE */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteAddress(id);

      console.log(response);

      setAddresses((prev) => prev.filter((item) => item.id !== id));

      alert(response?.message || "Address deleted successfully");
    } catch (error) {
      console.log(error);

      alert(error?.response?.data?.message || "Failed to delete address");
    }
  };

  /* EDIT */
  const handleEdit = (item) => {
    setFormData({
      fullName: item.full_name || "",

      mobile: item.mobile_number || "",

      alternateMobile: item.alternate_mobile_number || "",

      address1: item.address_line_1 || "",

      address2: item.address_line_2 || "",

      city: item.city || "",

      pincode: item.pincode || "",

      state: item.state || "",
    });

    setEditId(item.id);

    setShowForm(true);
  };

  /* SET DEFAULT */
  const handleDefault = async (id) => {
    try {
      const response = await changeDefaultStatus(id, true);

      console.log(response);

      if (response.is_default) {
        await fetchAddresses();
      }
    } catch (error) {
      console.log(error);

      alert(error?.response?.data?.error || "Failed to update default address");
    }
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

                <span className="text-[#3164E3] text-xs font-medium">Qty</span>
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

          {/* HEADER ACTIONS */}
          <div className="flex items-center gap-2">
            {/* BACK */}
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>

            {/* CLOSE */}
            <button
              onClick={() => navigate("/user")}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        {showForm && (
          <div className="mt-6">
            {/* FULL NAME */}
            <div>
              <label className="text-sm font-semibold">Full Name *</label>

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
              <label className="text-sm font-semibold">Mobile Number *</label>

              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className="mt-2 w-full h-[46px] rounded-[14px] border border-gray-200 px-4 text-sm outline-none"
              />
            </div>

            {/* ALTERNATIVE MOBILE */}
            <div className="mt-4">
              <label className="text-sm font-semibold">
                Alternative Mobile Number
              </label>

              <input
                type="text"
                name="alternateMobile"
                value={formData.alternateMobile}
                onChange={handleChange}
                placeholder="Alternative mobile number"
                className="mt-2 w-full h-[46px] rounded-[14px] border border-gray-200 px-4 text-sm outline-none"
              />
            </div>

            {/* ADDRESS 1 */}
            <div className="mt-4">
              <label className="text-sm font-semibold">Address Line 1 *</label>

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
              <label className="text-sm font-semibold">Address Line 2</label>

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
                <label className="text-sm font-semibold">City *</label>

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
                <label className="text-sm font-semibold">Pincode *</label>

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
              <label className="text-sm font-semibold">State *</label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
                className="mt-2 w-full h-[46px] rounded-[14px] border border-gray-200 px-4 text-sm outline-none"
              />
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
                          item.default ? "border-[#3164E3]" : "border-gray-300"
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
                            {item.full_name}
                          </h2>

                          <span className="text-sm text-gray-500">
                            {item.mobile_number}
                          </span>

                          {item.alternate_mobile_number && (
                            <span className="text-sm text-gray-500">
                              | {item.alternate_mobile_number}
                            </span>
                          )}

                          {item.default && (
                            <span className="px-2 py-1 rounded-full bg-[#EEF3FF] text-[#3164E3] text-[10px] font-semibold">
                              Default
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                          {item.address_line_1},{item.address_line_2},
                          {item.city},{item.state},{item.pincode}
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

                setFormData({
                  fullName: "",
                  mobile: "",
                  alternateMobile: "",
                  address1: "",
                  address2: "",
                  city: "",
                  pincode: "",
                  state: "",
                });
              }}
              className="mt-4 w-full h-[54px] border-2 border-dashed border-gray-200 rounded-[18px] flex items-center justify-center gap-2 text-gray-500 text-sm font-medium hover:border-[#3164E3] hover:text-[#3164E3] transition-all cursor-pointer"
            >
              <Plus size={18} />
              Add New Address
            </button>

            {/* CONTINUE */}
            <button
              onClick={() =>
                navigate("/user/products/payment", {
                  state: {
                    selectedAddress,
                    cartItems,
                    grandTotal,
                    product,
                    quantity,
                    remarks,
                  },
                })
              }
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
