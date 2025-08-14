import React, { useState } from "react";
import sedan from "../../../src/img/sedan.png";
import back from "../../../src/img/back.jpg";
import carousal from "../../../src/img/carousel-1.jpg";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
   const handleLearnMore = (serviceTitle) => {
    navigate(`/booking`);
  };
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
      price: "From $179 onwards",
      footer: "Give Your Car the Glow It Deserves!",
    },
    {
      title: "Leather Clean & Steam Clean – Professional Leather Care You Can Trust",
      Paragraph:
        "Our Leather Clean & Steam Clean service restores that original elegance while protecting your investment.We use advanced steam cleaning technology to gently lift dirt and sanitize without harsh chemicals. ",
      offers: [
        "Professional leather steam cleaning and sanitization",
        "Gentle, pH-balanced leather-safe cleaning solutions",
        "Removal of dirt, oils, and stubborn stains",
        "Premium conditioning to prevent cracks and fading",
      ],
      whyUs: [
        "Specialist Care – Treat each piece with precision",
        "Advanced Equipment – Steam cleaning technology for deep yet gentle cleaning.",
        "Customer Satisfaction Guarantee – We don’t just clean, we bring back the luxury feel.",
        "Eco-Friendly Solutions – Safe for leather, safe for you, and safe for the environment.",
      ],
      price: "From $70 onwards",
      footer: "Get the Perfect Service for Your Car Today!",
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
    {
      title: "Dog Hair Removal – Say Goodbye to Fur!",
      Paragraph:
        "Our Dog Hair Removal service is designed to eliminate stubborn pet hair from every nook and cranny, leaving your space fresh, clean, and allergen-free.Using specialized tools and techniques, we loosen and lift even the most embedded hairs from fabric, leather, and hard-to-reach areas. ",
      offers: [
        "Professional removal of dog and pet hair from all surfaces",
        "Safe techniques for leather and delicate fabrics",
        "Allergen reduction for a healthier environment",
        "Fresh, hair-free, and revitalized appearance",
      ],
      whyUs: [
        "Pet-Friendly Cleaning – Safe methods that protect your surfaces and your pets.",
        "Thorough & Precise – No spot left behind, even in tight spaces.",
        "Fast & Efficient Service – We value your time while delivering top-quality results.",
        "Specialized Equipment – Tools designed to extract hair from any surface.",
      ],
      price: "From $50 onwards",
      footer: "Say Goodbye to Fur – Enjoy a Hair-Free Ride!",
    },
    {
      title: "Underbody Clean & Paint – Protect Your Vehicle from Rust and Corrosion",
      Paragraph:
        "Our Underbody Clean & Paint service ensures your vehicle stays protected, extending its life and maintaining its value.We start with a thorough underbody wash, removing accumulated grime and salt buildup. Then, we apply a high-quality protective coating or paint, sealing the metal against moisture and corrosion. The result is an underbody that is clean, protected, and ready to withstand harsh conditions. ",
      offers: [
        "Complete underbody cleaning to remove dirt, mud, and salt",
        "Rust prevention and corrosion protection",
        "Long-lasting protection for all vehicle types",
        "Enhanced vehicle durability",
      ],
      whyUs: [
        "Expert Care – We specialize in underbody protection for all vehicles.",
        "Experienced Technicians – Skilled in cleaning, painting, and rust prevention.",
        "Premium Materials – High-quality paints and coatings for lasting results.",
        "Customer Satisfaction Guarantee – We protect your investment with precision and care.",
      ],
      price: "From $249 onwards",
      footer: "Say Goodbye to Rust – Protect Your Vehicle Today!",
    },
    
  ];

  return (
    <div className="flex flex-col  text-white bg-black">
      {/* Header */}
<div
  className="bg-white  bg-center py-20 px-4 sm:px-6 lg:px-8 text-center relative"
  style={{
    //backgroundImage: `url(${carousal})`,
  }}
>
  <div className="absolute inset-0 bg-white text-black"></div> {/* dark overlay */}

  <div className="relative z-10">
    <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
      Touch Up Services
    </h1>
    <nav className="text-gray-200">
      <span className="text-black">Home</span>
      <span className=" text-black mx-2">/</span>
      <span className="text-black">Extras</span>
    </nav>
  </div>
</div>


      {/* Centered Description */}
      <div className="text-center px-4 py-8 text-white">
        <h1 className="text-2xl font-semibold mb-4">About Our Touch Up Service</h1>
        <p className="max-w-4xl mx-auto text-lg text-white">
          Achieve a flawless finish with Paintless Dent Removal, Buff and Polish, Headlight Restoration, Leather Clean, Seat Steam Clean, and Dog Hair Removal, leaving your vehicle looking and feeling like new.
        </p>
      </div>

      {/* Cards Section */}
      <div className="max-w-4xl mx-auto px-4 py-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceCards.map((card, index) => (
            <div
              key={index}
              className="bg-[#00a0db] p-6 rounded-lg flex flex-col justify-between "
            >
              <div>
                <h2 className="text-lg font-bold mb-2 items-center flex justify-center text-black ">{card.title}</h2>
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
             <button
  onClick={() => handleLearnMore(card.title)}
  className="bg-white text-black hover:scale-105 transform ease-in-out px-4 py-2 rounded-full hover:bg-black hover:text-white text-sm font-semibold transition duration-300"
>
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
