// App.jsx

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

/* ================= LOGIN ================= */

import Signin from "./components/login/Signin";
import Signup from "./components/login/Signup";

/* ================= ADMIN ================= */

import AdminLayout from "./components/admin/AdminLayout";

import Dashboard from "./components/admin/dashboard/Dashboard";
import Customer from "./components/admin/customer/Customer";
import Orders from "./components/admin/orders/Orders";
import QuotesAdmin from "./components/admin/quotes/Quotes";
import CatalogSettings from "./components/admin/product/CatalogSettings";
import ProductPage from "./components/admin/product/ProductPage";

/* ================= WHY ZUMIA HOMES ================= */

import Verified from "./components/why zumia homes cards/Veified";
import Wholesale from "./components/why zumia homes cards/Wholesale";
import Delivery from "./components/why zumia homes cards/Delivery";
import Quotes from "./components/why zumia homes cards/Quotes";
import Expert from "./components/why zumia homes cards/Expert";
import Quality from "./components/why zumia homes cards/Quality";

/* ================= USER ================= */

import UserLayout from "./components/user/UserLayout";

/* USER PRODUCT PAGE */
import UserProduct from "./components/user/products/Product";

/* CART PAGE */
import Cart from "./components/user/cart/Cart";

/* BUYING PAGE */
import Buying from "./components/user/products/buying/Buying";

import Productdetails from "./components/user/products/productdetails/Productdetails";

import Address from "./components/user/products/address/Address";

import Payment from "./components/user/products/payment/Payment";

// ================= PROTECTED ROUTE =================

function ProtectedRoute({ children }) {

  const token =
    localStorage.getItem("access");

  // IF NO TOKEN REDIRECT LOGIN
  if (!token) {

    return (
      <Navigate
        to="/login/signin"
        replace
      />
    );
  }

  return children;
}

function Layout() {

  const location = useLocation();

  // HIDE MAIN WEBSITE HEADER & FOOTER
  const hideLayout =
    location.pathname.startsWith("/user") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/login");

  return (
    <>
      {/* WEBSITE HEADER */}
      {!hideLayout && <Header />}

      <Routes>

        {/* ================= WEBSITE ================= */}

        <Route path="/" element={<Home />} />

        {/* ================= LOGIN ================= */}

        <Route
          path="/login/signin"
          element={<Signin />}
        />

        <Route
          path="/login/signup"
          element={<Signup />}
        />

        {/* ================= ADMIN PANEL ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>

              <AdminLayout />

            </ProtectedRoute>
          }
        >

          {/* DEFAULT */}
          <Route
            index
            element={
              <Navigate to="/admin/dashboard" />
            }
          />

          {/* DASHBOARD */}
          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          {/* CUSTOMER */}
          <Route
            path="customer"
            element={<Customer />}
          />

          {/* PRODUCT */}
          <Route
            path="product"
            element={<ProductPage />}
          />

          {/* ORDERS */}
          <Route
            path="orders"
            element={<Orders />}
          />

          {/* QUOTES */}
          <Route
            path="quotes"
            element={<QuotesAdmin />}
          />

        </Route>

        {/* CATALOG SETTINGS */}
        <Route
          path="/admin/catalog-settings"
          element={
            <ProtectedRoute>

              <CatalogSettings />

            </ProtectedRoute>
          }
        />

        {/* ================= WHY ZUMIA HOMES ================= */}

        <Route
          path="/verified"
          element={<Verified />}
        />

        <Route
          path="/wholesale"
          element={<Wholesale />}
        />

        <Route
          path="/delivery"
          element={<Delivery />}
        />

        <Route
          path="/quotes"
          element={<Quotes />}
        />

        <Route
          path="/expert"
          element={<Expert />}
        />

        <Route
          path="/quality"
          element={<Quality />}
        />

        {/* ================= USER PANEL ================= */}

        <Route
          path="/user"
          element={<UserLayout />}
        >

          {/* DEFAULT */}
          <Route
            index
            element={<UserProduct />}
          />

          {/* PRODUCTS */}
          <Route
            path="products"
            element={<UserProduct />}
          />

          {/* CART */}
          <Route
            path="cart"
            element={<Cart />}
          />

          {/* BUYING */}
          <Route
            path="buying"
            element={<Buying />}
          />

          {/* ADDRESS */}
          <Route
            path="address"
            element={<Address />}
          />

          {/* PRODUCT DETAILS */}
          <Route
            path="productdetails"
            element={<Productdetails />}
          />

        </Route>

        {/* PAYMENT */}
        <Route
          path="/user/products/payment"
          element={<Payment />}
        />

      </Routes>

      {/* WEBSITE FOOTER */}
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {

  return (
    <BrowserRouter>

      <Layout />

    </BrowserRouter>
  );
}

export default App;