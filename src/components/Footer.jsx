import { MapPin, Phone, Mail } from "lucide-react";
// import { useNavigate } from "react-router-dom";

function Footer() {

  // const navigate = useNavigate();

  return (
    <footer className="bg-[#020c1b] text-gray-300 px-16 py-14">

      {/* Top Section */}
      <div className="grid md:grid-cols-4 gap-10">

        {/* Logo + Info */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">ZUMIA</h2>

          <p className="text-sm text-gray-400 mb-4">
            India's trusted B2B lighting platform. Premium products,
            wholesale pricing, expert support.
          </p>

          <div className="space-y-2 text-sm text-gray-400">
            <p className="flex items-center gap-2">
              <MapPin size={16}/> 123 Business District, Mumbai
            </p>

            <p className="flex items-center gap-2">
              <Phone size={16}/> +91 8093442657
            </p>

            <p className="flex items-center gap-2">
              <Mail size={16}/> sales@lumitech.in
            </p>
          </div>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-white font-semibold mb-4">PRODUCTS</h3>

          <ul className="space-y-2 text-sm text-gray-400">
            <li>Indoor Lighting</li>
            <li>Outdoor Lighting</li>
            <li>Industrial Lighting</li>
            <li>Smart Lighting</li>
            <li>LED Strips</li>
            <li>Emergency Lighting</li>
          </ul>
        </div>

        {/* Business */}
        <div>
          <h3 className="text-white font-semibold mb-4">FOR BUSINESS</h3>

          <ul className="space-y-2 text-sm text-gray-400">
            <li>B2B Registration</li>
            <li>Wholesale Pricing</li>
            <li>Bulk Orders</li>
            <li>Custom Solutions</li>
            <li>Technical Support</li>
            <li>Quote Requests</li>
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h3 className="text-white font-semibold mb-4">GET STARTED</h3>

          <p className="text-sm text-gray-400 mb-5">
            Join 200+ businesses already saving on premium lighting.
          </p>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm">
            Register as B2B Customer →
          </button>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-10 pt-6 flex justify-between text-sm text-gray-500">

        <p>© 2026 ZUMIA. All rights reserved.</p>

        <p>Professional Lighting Solutions · Made in India</p>

      </div>

    </footer>
  );
}

export default Footer;