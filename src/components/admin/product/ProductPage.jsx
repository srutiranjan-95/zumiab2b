// src/components/admin/product/ProductPage.jsx

import Products from "./Products";
import CatalogSettings from "./CatalogSettings";

export default function ProductPage() {
  return (
    <div className="space-y-6">
      <Products />

      <CatalogSettings />
    </div>
  );
}