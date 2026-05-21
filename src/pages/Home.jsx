import {
  Play,
  Lock,
  ShieldCheck,
  IndianRupee,
  Truck,
  Clock3,
  Headphones,
  BadgeCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Homescreen from "../assets/Homescreen.png";

function Home() {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      category: "FURNITURE",
      title: "Modern Crystal Bed Sconce",
      desc: "Premium decorative chandelier for luxury interiors.",
      brand: "ZUMIA",
      badge: "New",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      category: "Indoor Lighting",
      title: "Crystal Prism Cylinder Wall Sconce",
      desc: "Ornate brass-finish sconce with faceted crystal grid delivers sparkling ambient light.",
      brand: "ZUMIA",
      badge: "New",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
      category: "Indoor Lighting",
      title: "Crystal Prism Cylinder Wall Sconce",
      desc: "Premium decorative chandelier for luxury interiors.",
      brand: "ZUMIA",
      badge: "Bestseller",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
      category: "LED Strips",
      title: "Modern Crystal Chandelier",
      desc: "Premium decorative chandelier for luxury interiors.",
      brand: "ZUMIA",
      badge: "Bestseller",
    },
  ];

  const features = [
    {
      id: 1,
      icon: ShieldCheck,
      title: "Verified B2B Only",
      desc: "Exclusive access for approved businesses with volume discounts and wholesale pricing.",
      bg: "bg-[#f2eefc]",
      iconBg: "bg-[#e8ddff]",
      iconColor: "text-[#7c3aed]",
      link: "/verified",
    },
    {
      id: 2,
      icon: IndianRupee,
      title: "Best Wholesale Rates",
      desc: "Competitive B2B pricing below retail. Special rates for bulk orders.",
      bg: "bg-[#edf8f1]",
      iconBg: "bg-[#d8f3df]",
      iconColor: "text-[#059669]",
      link: "/wholesale",
    },
    {
      id: 3,
      icon: Truck,
      title: "City-Wide Delivery",
      desc: "Fast reliable shipping across the city with express delivery available.",
      bg: "bg-[#edf6fd]",
      iconBg: "bg-[#d9ecfb]",
      iconColor: "text-[#0284c7]",
      link: "/delivery",
    },
    {
      id: 4,
      icon: Clock3,
      title: "Quick Quotes",
      desc: "Get instant pricing on custom or out-of-stock items. Fast response guaranteed.",
      bg: "bg-[#faf5e6]",
      iconBg: "bg-[#f8e7b5]",
      iconColor: "text-[#d97706]",
      link: "/quotes",
    },
    {
      id: 5,
      icon: Headphones,
      title: "Expert Support",
      desc: "Dedicated account managers and interior consultants at your service.",
      bg: "bg-[#fdf0f2]",
      iconBg: "bg-[#ffd9df]",
      iconColor: "text-[#e11d48]",
      link: "/expert",
    },
    {
      id: 6,
      icon: BadgeCheck,
      title: "Certified Quality",
      desc: "All products meet international standards with full manufacturer warranties.",
      bg: "bg-[#f5effc]",
      iconBg: "bg-[#eadcff]",
      iconColor: "text-[#9333ea]",
      link: "/quality",
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${Homescreen})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/35"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center min-h-screen px-5 sm:px-8 md:px-14 lg:px-20 py-24">
          <div className="max-w-2xl text-white">
            <p className="uppercase tracking-[3px] sm:tracking-[4px] text-xs sm:text-sm mb-4 sm:mb-6 text-gray-200">
              Curated For Spaces
            </p>

            <h1 className="font-serif font-light leading-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              Elevate Every
              <br />
              Space
            </h1>

            <p className="mt-6 sm:mt-8 text-base sm:text-lg text-gray-200 leading-7 sm:leading-8 max-w-xl">
              Premium lighting and furniture solutions designed for
              design professionals and businesses worldwide.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:mt-10 w-full sm:w-auto">
              <button className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm tracking-wide hover:bg-gray-200 transition cursor-pointer w-full sm:w-auto">
                EXPLORE COLLECTIONS
              </button>

              <button className="border border-white/60 text-white px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm tracking-wide backdrop-blur-sm hover:bg-white/10 transition cursor-pointer w-full sm:w-auto">
                APPLY FOR TRADE ACCOUNT
              </button>
            </div>
          </div>
        </div>

        {/* Demo Button */}
        <button className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 z-10 flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/30 hover:bg-white/30 transition cursor-pointer text-sm">
          <Play size={16} className="sm:w-[18px] sm:h-[18px]" />
          Watch Product Demo
        </button>
      </section>

      {/* PRODUCT SECTION */}
      <section className="bg-[#f5f5f5] py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-14">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="uppercase tracking-[3px] text-blue-600 text-xs sm:text-sm font-semibold">
            B2B Catalogue Preview
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-black">
            Our Product Range
          </h2>

          <p className="text-gray-600 text-base sm:text-lg mt-5 sm:mt-6 leading-7 sm:leading-8 px-2">
            Browse our lighting catalogue.
            <span className="font-semibold">
              {" "}
              Register or login{" "}
            </span>
            as an approved B2B member to unlock pricing and place orders.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 mt-14 sm:mt-16">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-[20px] overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300 flex flex-col max-w-[320px] w-full mx-auto"
            >
              {/* Image */}
              <div className="relative bg-gray-100 h-[220px] sm:h-[240px] overflow-hidden">
                {/* Badge */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                  <span className="bg-blue-500 text-white text-[10px] px-3 py-1 rounded-full font-medium">
                    {product.badge}
                  </span>

                  <span className="bg-white text-black text-[10px] px-3 py-1 rounded-full font-medium">
                    On Order
                  </span>
                </div>

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <span className="inline-block bg-gray-100 text-black text-[11px] px-4 py-2 rounded-full font-medium w-fit">
                  {product.category}
                </span>

                <h3 className="mt-4 text-xl font-semibold text-black leading-snug min-h-[60px]">
                  {product.title}
                </h3>

                {product.desc && (
                  <p className="text-gray-500 mt-3 text-sm leading-6 min-h-[68px]">
                    {product.desc.length > 50
                      ? `${product.desc.substring(0, 50)}...`
                      : product.desc}
                  </p>
                )}

                <p className="text-gray-500 uppercase text-xs mt-5">
                  {product.brand}
                </p>

                {/* Button */}
                <div className="mt-auto pt-5">
                  <button className="w-full h-[50px] border border-blue-300 text-blue-500 rounded-full flex items-center justify-center gap-2 hover:bg-blue-50 transition cursor-pointer text-sm font-medium">
                    <Lock size={17} />
                    <span className="leading-none">
                      Login to see price
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY ZUMIA SECTION */}
      <section className="bg-[#f5f5f5] px-4 sm:px-6 md:px-10 lg:px-14 pb-20">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="uppercase tracking-[3px] text-blue-600 text-xs sm:text-sm font-semibold">
            WHY ZUMIA HOMES?
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-black leading-tight">
            Built for Businesses That
            <br />
            Demand the Best
          </h2>

          <p className="text-gray-600 text-base sm:text-lg mt-6 leading-7 sm:leading-8 px-2">
            Everything you need to source, order and manage premium home
            furnishings — all in one place.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                onClick={() => navigate(feature.link)}
                className={`${feature.bg} border border-black/5 rounded-[28px] p-7 sm:p-8 block cursor-pointer hover:shadow-xl hover:-translate-y-1 transition duration-300`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${feature.iconBg}`}
                >
                  <Icon className={`${feature.iconColor}`} size={22} />
                </div>

                <h3 className="mt-8 text-2xl font-semibold text-black">
                  {feature.title}
                </h3>

                <p className="mt-4 text-gray-600 text-base leading-8 max-w-sm">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Home;