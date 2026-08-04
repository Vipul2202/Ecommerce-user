import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carousel1 from "../../../src/img/carousel-1.jpg";
import carousel2 from "../../../src/img/carousel-2.jpg";
import carousel4 from "../../../src/img/gtechniq_s.png";

import team from "../../../src/img/team-2.jpg";
import { Check, ChevronUp } from 'lucide-react';
import team1 from "../../../src/img/team1.jpeg";
import team2 from "../../../src/img/team2.jpg";
import team3 from "../../../src/img/team3.jpg";
import team4 from "../../../src/img/team4.jpeg";

const Homenext = () => {
  const navigate = useNavigate();

  const carouselData = [
     { img: carousel4, subtitle: "", title: "" },
    { img: carousel1, subtitle: "", title: "" },
    { img: carousel2, subtitle: "", title: "" },
    { img: carousel3, subtitle: "Car Washing", title: "Exterior & Interior Washing" },
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
      price: "From $499* onwards",
      image: team3,
      buttonStyle: "black",
      route: "/ultrapremium", // Add specific route
    },
    {
      id: 4,
      title: "Stage 3 Paint Correction",
      price: "From $399* onwards",
      image: team4,
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

  const plans = [
    {
      id: 1,
      name: "OUTSIDE ONLY",
      price: "35",
      features: [
        "Wash & Chamois Dry",
        "Exterior Windows",
        "Wheels Clean & Tyres Gloss",
        "Spray-On Wax"
      ],
      buttonStyle: "black",
      popular: false,
      route: "/outside" // Navigate to CarRentalPage
    },
    {
      id: 2,
      name: "INSIDE & OUTSIDE",
      price: "55",
      features: [
        "Includes Outside Only",
        "Interior Wiped & Dusted",
        "Interior & Boot Vacuumed",
        "Windows Clean Inside & Out"
      ],
      buttonStyle: "white",
      popular: false,
      route: "/inside_outside" // Navigate to CarRentalPage1
    },
    {
      id: 3,
      name: "PREMIUM WASH",
      price: "95",
      features: [
        "Include Inside & Out clean",
        "Dash & Console Detailed with all plastic trims",
        "External Plastic Trims Rejuvenation",
        "Hand Wax & Polish",
        "Seats Wiped & Spot Clean"
      ],
      buttonStyle: "black",
      popular: false,
      route: "/premium_wash" // Navigate to CarRentalPage2
    }
  ];

  // Duplicate plans for second section with different routes
  const plansSecondSection = [
    {
      id: 4,
      name: "MINI DETAIL",
      price: "149",
      features: [
        "Includes Premium Wash",
        "Clay Block Treatment(Paint Cleansing)",
        "Interior Trims Detailed & Protection",
        "Floor Mats Steam Clean"
      ],
      buttonStyle: "black",
      popular: false,
      route: "/mini_detail" // Navigate to CarRentalPage3
    },
    {
      id: 5,
      name: "INTERIOR DETAIL",
      price: "229",
      features: [
        "Includes Mini Detail",
        "Carpets Steam Clean",
        "Roof Lining Steam Clean",
        "Odour Eliminated Treatment"
      ],
      buttonStyle: "white",
      popular: false,
      route: "/interior_detail" // Navigate to CarRentalPage4
    },
    {
      id: 6,
      name: "FULL DETAIL",
      price: "349",
      features: [
        "Include Interior Detail",
        "Engine Bay Degreased",
        "Buff & Polish(Correct Minor Scratches)",
        "Fabric Seats Steam Clean",
        "Leather Seats Steam Clean"
      ],
      buttonStyle: "black",
      popular: true,
      route: "/full_detail" // Navigate to CarRentalPage5
    }
  ];

  // Function to handle navigation to booking page with selected service
  const handleBookNow = (route) => {
    navigate(route);
  };

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
              onClick={() => navigate('/book-now')}
              className="bg-[#00a0db] hover:bg-[#00a0db] text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore All Services
            </button>
          </div>
        </div>
      </div>

      {/* First Plans Section */}
      <div className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#00a0db] text-4xl font-bold tracking-wider uppercase mb-4">
              WASHING SERVICES
            </h2>
            <h1 className="text-3xl md:text-xl lg:text-4xl font-semibold">
              Choose Your Plan
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-gradient-to-b from-[#00a0db] to-[#00a0db] rounded-2xl p-8 lg:p-10 flex flex-col transform hover:scale-105 transition-all duration-300 ${plan.popular
                  ? 'min-h-[750px] lg:min-h-[660px] ring-4 ring-white/20 lg:scale-105 hover:scale-110'
                  : 'min-h-[600px] lg:min-h-[650px]'
                  }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white text-[#00a0db] px-4 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-white font-bold text-2xl mb-4 tracking-wide">
                    {plan.name}
                  </h3>
                  <div className="text-black text-5xl font-bold">
                    ${plan.price}
                    <span className="text-2xl">*</span>
                  </div>
                  <p className="text-white/90 text-sm italic mt-2">
                    *price depends on the model
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-6 flex-grow">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#00a0db]" />
                      </div>
                      <span className="text-white text-md leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <div className="text-center">
                  <button
                    onClick={() => handleBookNow(plan.route)}
                    className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${plan.buttonStyle === "black"
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-white text-black hover:bg-gray-200"
                      }`}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Plans Section */}
      <div className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#00a0db] text-4xl font-bold tracking-wider uppercase mb-4">
              DETAILING SERVICES
            </h2>
            <h1 className="text-3xl md:text-xl lg:text-4xl font-semibold">
              Choose Your Plan
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plansSecondSection.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-gradient-to-b from-[#00a0db] to-[#00a0db] rounded-2xl p-8 lg:p-10 flex flex-col transform hover:scale-105 transition-all duration-300 ${plan.popular
                  ? 'min-h-[750px] lg:min-h-[660px] ring-4 ring-white/20 lg:scale-105 hover:scale-110'
                  : 'min-h-[600px] lg:min-h-[650px]'
                  }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white text-[#00a0db] px-4 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-white font-bold text-2xl mb-4 tracking-wide">
                    {plan.name}
                  </h3>
                  <div className="text-black text-5xl font-bold">
                    ${plan.price}
                    <span className="text-2xl">*</span>
                  </div>
                  <p className="text-white/90 text-sm italic mt-2">
                    *price depends on the model
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-6 flex-grow">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#00a0db]" />
                      </div>
                      <span className="text-white text-md leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <div className="text-center">
                  <button
                    onClick={() => handleBookNow(plan.route)}
                    className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${plan.buttonStyle === "black"
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-white text-black hover:bg-gray-200"
                      }`}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homenext;