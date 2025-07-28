import React, { useState } from "react";
import sedan from "../../../src/img/sedan.png";

const Ultrapremium = () => {
  const [formData, setFormData] = useState({
    carType: "",
    registration: "",
    services: [],
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const serviceCards = [
    {
      title: "CERAMIC COATING",
      offers: [
        "Oxidation Removal – Eliminates yellowing and cloudiness",
        "Deep Cleaning & Polishing – Restores headlights",
        "UV Protection Coating – Prevents future fading",
        "Enhanced Visibility – Improves nighttime driving safety",
      ],
      whyUs: [
        "High-Grade Products – Quality restoration kits",
        "Cost-Effective – Fraction of headlight replacement",
        "Quick Service – Done while you wait",
        "Guaranteed Satisfaction – Brighter headlights",
      ],
      price: "From $50 onwards",
     
    },
    {
      title: "INTERIOR PROTECTION PACK",
      
      offers: [
        "Paint Correction – Removes swirl marks, scratches",
        "Professional Polishing – Mirror-like gloss",
        "Protective Wax Coating – Lasting protection",
      ],
      whyUs: [
        "Experienced Technicians – Skilled pros",
        "Tailored Services – Based on your car’s condition",
        "Long-Lasting Results – Shiny longer with premium",
      ],
      price: "From $299 onwards",
     
    },
    {
      title: "WINDOW TINTING",
     
      offers: [
        "UV & Heat Protection – Blocks 99% UV",
        "Enhanced Privacy – Keeps prying eyes away",
        "Clearer Vision – Improves visibility",
        "Interior Protection – Prevents fading & cracking",
      ],
      whyUs: [
        "Top Quality Film – Industry leading tints",
        "Expert Installation – No bubbles",
        "Variety of Shades – Match your style",
        "Legal Compliance – Meets local rules",
      ],
      price: "From $499 onwards",
      
    },
    {
      title: "STAGE 3 PAINT CORRECTION",
      
      offers: [
        "No Paint, No Filler – Keeps original paint",
        "Eco-Friendly – No chemicals",
        "Cost Effective – Avoid full repaint",
        "Faster – Ideal for small dents",
      ],
      whyUs: [
        "Expert Technicians – Precision tools",
        "Same-Day Service – Back on road quick",
        "Advanced PDR – Perfect results",
        "Guaranteed – Flawless repairs",
      ],
      price: "From $199 onwards",
     
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#00a0db] mb-4">
         Ultra Premium Finishes
        </h1>
        <nav className="text-gray-600">
          <span className="text-[#00a0db]">Home</span>
          <span className="mx-2">/</span>
          <span>Premium Services</span>
        </nav>
      </div>

      {/* Centered Description */}
      <div className="text-center px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">About Our Premium Services</h1>
        <p className="max-w-4xl mx-auto text-lg text-white">
          At CarSaloon, we redefine automotive luxury with our ultra-premium finishes, designed for car enthusiasts who demand nothing but the best. Our high-end detailing solutions not only protect your vehicle but also elevate its aesthetic appeal to a whole new level.
        </p>
      </div>

      {/* Cards Section */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceCards.map((card, index) => (
            <div
              key={index}
              className="bg-[#00a0db] p-6 rounded-lg flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2 items-center flex justify-center text-black">{card.title}</h2>
                <p className="text-sm mb-2">{card.Paragraph}</p>

                {/* What We Offer */}
                
                <ul className="mb-3 text-sm space-y-1">
                  {card.offers.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-4 h-4 bg-white text-[#00a0db] mr-2 flex items-center justify-center rounded-sm text-xs font-bold">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Why Choose Us */}
              
                <ul className="mb-4 text-sm space-y-1">
                  {card.whyUs.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-4 h-4 bg-white text-[#00a0db] mr-2 flex items-center justify-center rounded-sm text-xs font-bold">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                
              </div>

              {/* Card Footer */}
              <div className="">
                <div className="flex items-center gap-2">
                  <img
                  draggable="false"
                    src={sedan}
                    alt="Service"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <p className="text-white font-semibold text-sm">{card.price}</p>
                </div>
                <button className="bg-white text-[#00a0db] px-4 py-2 rounded-full hover:bg-[#00a0db] text-sm font-semibold transition duration-300 flex justify-center items-center">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ultrapremium;
