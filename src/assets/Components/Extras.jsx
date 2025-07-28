import React, { useState } from "react";
import sedan from "../../../src/img/sedan.png";
import back from "../../../src/img/back.jpg";
import carousal from "../../../src/img/carousel-1.jpg";
const Extras = () => {
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
      title: "Headlight Restoration – See & Be Seen Clearly!",
      Paragraph:
        "Cloudy, yellowed, or foggy headlights don’t just make your car look old—they also reduce visibility and compromise safety. Our Headlight Restoration Service restores clarity, improves brightness, and enhances the overall look of your vehicle.",
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
      footer: "Drive Safer with Brighter, Clearer Headlights!",
    },
    {
      title: "Buff & Polish – Restore Your Car’s Showroom Shine!",
      Paragraph:
        "Cloudy, yellowed, or foggy headlights don’t just make your car look old—they also reduce visibility and compromise safety. Our Headlight Restoration Service restores clarity, improves brightness, and enhances the overall look of your vehicle.",
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
      footer: "Give Your Car the Glow It Deserves!",
    },
    {
      title: "Window Tinting – Style, Comfort & Protection for Your Ride!",
      Paragraph:
        "Cloudy, yellowed, or foggy headlights don’t just make your car look old—they also reduce visibility and compromise safety. Our Headlight Restoration Service restores clarity, improves brightness, and enhances the overall look of your vehicle.",
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
      footer: "Get the Perfect Tint for Your Car Today!",
    },
    {
      title: "Paintless Dent Removal – Flawless Finish Without the Hassle!",
      Paragraph:
        "Cloudy, yellowed, or foggy headlights don’t just make your car look old—they also reduce visibility and compromise safety. Our Headlight Restoration Service restores clarity, improves brightness, and enhances the overall look of your vehicle.",
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
      footer: "Say Goodbye to Dents – The Smart Way!",
    },
  ];

  return (
    <div className="flex flex-col  text-white">
      {/* Header */}
<div
  className="bg-black bg-cover bg-center py-20 px-4 sm:px-6 lg:px-8 text-center relative"
  style={{
    backgroundImage: `url(${carousal})`,
  }}
>
  <div className="absolute inset-0 bg-black opacity-60"></div> {/* dark overlay */}

  <div className="relative z-10">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
      Touch Up Services
    </h1>
    <nav className="text-gray-200">
      <span className="text-white">Home</span>
      <span className="mx-2">/</span>
      <span>Extras</span>
    </nav>
  </div>
</div>


      {/* Centered Description */}
      <div className="text-center px-4 py-8 text-black">
        <h1 className="text-2xl font-semibold mb-4">About Our Touch Up Service</h1>
        <p className="max-w-4xl mx-auto text-lg text-black">
          Achieve a flawless finish with Paintless Dent Removal, Buff and Polish, Headlight Restoration, Leather Clean, Seat Steam Clean, and Dog Hair Removal, leaving your vehicle looking and feeling like new.
        </p>
      </div>

      {/* Cards Section */}
      <div className="max-w-4xl mx-auto px-4 py-10 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceCards.map((card, index) => (
            <div
              key={index}
              className="bg-[#00a0db] p-6 rounded-lg flex flex-col justify-between "
            >
              <div>
                <h2 className="text-lg font-bold mb-2 ">{card.title}</h2>
                <p className="text-sm mb-2">{card.Paragraph}</p>

                {/* What We Offer */}
                <h3 className="font-semibold text-black">What We Offer:</h3>
                <ul className="mb-3 text-sm space-y-1">
                  {card.offers.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-4 h-4 bg-white text-black mr-2 flex items-center justify-center rounded-sm text-xs font-bold">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Why Choose Us */}
                <h3 className="font-semibold text-black">Why Choose Us?</h3>
                <ul className="mb-4 text-sm space-y-1">
                  {card.whyUs.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-4 h-4 bg-white text-black mr-2 flex items-center justify-center rounded-sm text-xs font-bold">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="italic text-white font-semibold">{card.footer}</p>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-white">
                <div className="flex items-center gap-2">
                  <img
                    src={sedan}
                    alt="Service"
                    draggable="false"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <p className="text-white font-semibold text-sm">{card.price}</p>
                </div>
                <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-orange-200 text-sm font-semibold transition duration-300">
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

export default Extras;
