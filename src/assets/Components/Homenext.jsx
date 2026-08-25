import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carousel1 from "../../../src/img/carousel-1.jpg";
import carousel2 from "../../../src/img/carousel-2.jpg";
import carousel4 from "../../../src/img/gtechniq_s.png";
import carousel5 from "../../../src/img/myaree.jpeg";
import carousel6 from "../../../src/img/interior.jpeg";
import carousel7 from "../../../src/img/banner.jpeg";


import team from "../../../src/img/team-2.jpg";
import { Check, ChevronUp } from 'lucide-react';
import team1 from "../../../src/img/team1.jpeg";
import team2 from "../../../src/img/team2.jpg";
import team3 from "../../../src/img/team3.jpg";
import paintlessDent from "../../img/paintless_dent_repair.png";

const ComparisonTable = ({ eyebrow, heading, columns, rows, navigate }) => (
  <div className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-[#00a0db] text-4xl font-bold tracking-wider uppercase mb-4">
          {eyebrow}
        </h2>
        <h1 className="text-3xl md:text-xl lg:text-4xl font-semibold">
          {heading}
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px]">
          <thead>
            <tr>
              <th className="text-left p-4 text-gray-400 text-sm font-semibold border-b border-gray-800">
                Feature
              </th>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="p-4 text-white text-base font-bold bg-[#00a0db] rounded-t-xl"
                >
                  {col.name}
                </th>
              ))}
            </tr>
            <tr>
              <td className="p-3 text-gray-400 text-xs border-b border-gray-800">
                Pricing
              </td>
              {columns.map((col, i) => (
                <td
                  key={i}
                  className="text-center bg-[#031824] border-b border-gray-800 p-3"
                >
                  <div className="text-gray-200 text-xs leading-relaxed">
                    Sedan <span className="text-[#00a0db] font-semibold">From ${col.sedan}</span><br />
                    SUV <span className="text-[#00a0db] font-semibold">From ${col.suv}</span><br />
                    4WD/7-Seater <span className="text-[#00a0db] font-semibold">From ${col.fourWd}</span>
                  </div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                <td
                  className={`p-3 text-gray-200 text-sm ${ri !== rows.length - 1 ? "border-b border-gray-800" : ""
                    }`}
                >
                  {row.label}
                </td>
                {row.tiers.map((included, ci) => (
                  <td
                    key={ci}
                    className={`text-center ${ri !== rows.length - 1 ? "border-b border-gray-800" : ""
                      } ${included ? "bg-[#00a0db]/10 text-[#00a0db]" : "text-gray-600"}`}
                  >
                    {included ? <Check className="w-4 h-4 mx-auto" /> : "—"}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="p-4"></td>
              {columns.map((col, i) => (
                <td key={i} className="text-center p-4">
                  <button
                    onClick={() => navigate(col.route)}
                    className="bg-[#00a0db] text-white rounded-full px-5 py-2 text-xs font-semibold hover:bg-[#0088b8] hover:scale-110 transform transition-all duration-300"
                  >
                    Learn More
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const Homenext = () => {
  const navigate = useNavigate();

  const carouselData = [
     { img: carousel4, subtitle: "", title: "" },
    { img: carousel1, subtitle: "", title: "" },
    { img: carousel5, subtitle: "", title: "" },
   { img: carousel6, subtitle: "", title: "" },
   { img: carousel7, subtitle: "", title: "" },
   { img: carousel2, subtitle: "", title: "" },
  ];

  const services = [
    { label: "Outside Only", cid: 1 },
    { label: "Inside & Out", cid: 2 },
    { label: "Premium Wash", cid: 3 },
    { label: "Mini Detail", cid: 4 },
    { label: "Interior Detail", cid: 5 },
    { label: "Full Detail", cid: 6 },
    { label: "Ultra Premium Finishes", link: "ultra_premium_finishes.php" },
    { label: "Extras", link: "extras.php" },
  ];

  const service = [
    {
      id: 1,
      title: "Ceramic Coating",
      price: "From $499* onwards",
      image: team1,
      buttonStyle: "black",
      route: "/ultrapremium", // Add specific route
    },
    {
      id: 2,
      title: "Interior Protection Pack",
      price: "From $299* onwards",
      image: team2,
      buttonStyle: "white",
      route: "/ultrapremium", // Add specific route
    },
    {
      id: 3,
      title: "Windows Tinting",
      price: "From $349* onwards",
      image: team3,
      buttonStyle: "black",
      route: "/ultrapremium", // Add specific route
    },
    {
      id: 4,
      title: "Paintless Dent Removal",
      price: "From $199* onwards",
      image: paintlessDent,
      buttonStyle: "black",
      route: "/ultrapremium", // Add specific route
    },
  ];

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };

  const washingColumns = [
    { name: "OUTSIDE ONLY", route: "/outside", sedan: 35, suv: 45, fourWd: 55 },
    { name: "INSIDE & OUTSIDE", route: "/inside_outside", sedan: 55, suv: 65, fourWd: 75 },
    { name: "PREMIUM WASH", route: "/premium_wash", sedan: 95, suv: 105, fourWd: 115 },
  ];

  const washingRows = [
    { label: "Wash & Chamois Dry", tiers: [true, true, true] },
    { label: "Exterior Windows Clean", tiers: [true, true, true] },
    { label: "Wheels Clean & Tyres Gloss", tiers: [true, true, true] },
    { label: "Spray-On Wax", tiers: [true, true, true] },
    { label: "Interior Wiped & Dusted", tiers: [false, true, true] },
    { label: "Interior & Boot Vacuumed", tiers: [false, true, true] },
    { label: "Windows Clean Inside & Out", tiers: [false, true, true] },
    { label: "Dash & Console Detailed (all plastic trims)", tiers: [false, false, true] },
    { label: "External Plastic Trims Rejuvenation", tiers: [false, false, true] },
    { label: "Hand Wax & Polish", tiers: [false, false, true] },
    { label: "Seats Wiped & Spot Clean", tiers: [false, false, true] },
  ];

  const detailingColumns = [
    { name: "FULL DETAIL", route: "/full_detail", sedan: 175, suv: 195, fourWd: 225 },
    { name: "SIGNATURE DETAIL", route: "/signature_detail", sedan: 275, suv: 295, fourWd: 325 },
    { name: "THE WORKS", route: "/the_works", sedan: 375, suv: 395, fourWd: 425 },
  ];

  const detailingRows = [
    { label: "Outside Wash and Wax", tiers: [true, true, true] },
    { label: "Windows Cleaning", tiers: [true, true, true] },
    { label: "Interior Trims Detailed & Condition", tiers: [true, true, true] },
    { label: "Fabric Seats Steam Clean", tiers: [true, true, true] },
    { label: "Carpet Steam Clean", tiers: [true, true, true] },
    { label: "Roof Lining Clean", tiers: [true, true, true] },
    { label: "Leather Seats Clean and Condition", tiers: [true, true, true] },
    { label: "Head Light Restoration", tiers: [false, true, true] },
    { label: "Engine Bay Degrease", tiers: [false, true, true] },
    { label: "Hand Polish", tiers: [false, true, true] },
    { label: "Buff and Polish", tiers: [false, false, true] },
    { label: "Underbody Clean (Using Ramp)", tiers: [false, false, true] },
  ];

  // Function to handle "Learn More" navigation for premium services
  const handleLearnMore = (route) => {
    navigate(route);
  };

  return (
    <div className="text-white">
      <div className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#00a0db] text-sm font-semibold tracking-wider uppercase mb-4">
              HAVE A LOOK AT OUR PREMIUM SERVICES
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold">
              Long Lasting Services For Your Car
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105"
              >
                {/* Image section */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable="false"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-500"></div>
                </div>

                {/* Content section */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white transition-all duration-500 transform translate-y-16 group-hover:translate-y-0">
                  <h3 className="text-xl font-bold tracking-wide">{item.title}</h3>
                  <p className="text-sm opacity-80 mt-1">{item.price}</p>
                  <button
                    onClick={() => handleLearnMore(item.route)}
                    className={`mt-4 relative px-5 py-2 rounded-full font-medium text-sm overflow-hidden group/button transition-all duration-300
            ${item.buttonStyle === "black"
                        ? "bg-black text-white hover:bg-gray-900"
                        : "bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-100 hover:to-white"
                      }`}
                  >
                    <span className="relative z-10">Learn More</span>
                    <span className="absolute inset-0 bg-white/20 group-hover/button:blur-sm rounded-full z-0 transition-all duration-500"></span>
                  </button>
                </div>

                {/* Neon border effect on hover */}
                <div className="absolute inset-0 border border-transparent rounded-3xl group-hover:border-blue-400 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => navigate('/ultrapremium')}
              className="bg-[#00a0db] hover:bg-[#00a0db] text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore All Services
            </button>
          </div>
        </div>
      </div>

      <ComparisonTable
        eyebrow="Washing Services"
        heading="Compare Your Plan"
        columns={washingColumns}
        rows={washingRows}
        navigate={navigate}
      />

      <ComparisonTable
        eyebrow="Detailing Services"
        heading="Compare Your Plan"
        columns={detailingColumns}
        rows={detailingRows}
        navigate={navigate}
      />
    </div>
  );
};

export default Homenext;