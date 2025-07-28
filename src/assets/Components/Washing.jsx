import React, { useState } from "react";
import team from "../../../src/img/team-2.jpg";

const Washing = () => {
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

  const service = [
    {
      id: 1,
      title: "Ceramic Coating",
      price: "From $199* onwards",
      image: team,
      buttonStyle: "black",
    },
    {
      id: 2,
      title: "Interior Protection Pack",
      price: "From $299* onwards",
      image: team,
      buttonStyle: "white",
    },
    {
      id: 3,
      title: "Windows Tinting",
      price: "From $499* onwards",
      image: team,
      buttonStyle: "black",
    },
  ];

  return (
    <div className=" flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#00a0db] mb-4">
        Washing Services
        </h1>
        <nav className="text-gray-600">
          <span className="text-[#00a0db]">Home</span>
          <span className="mx-2">/</span>
          <span>Washing Services</span>
        </nav>
      </div>

      {/* Description */}
      <div className="max-w-5xl mx-auto px-4 py-10 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
         Professional Car Washing Services at Car Saloon – Keep Your Vehicle Spotless !

        </h2>
        <p className="text-lg mb-6">
          Looking for the best car washing services to keep your vehicle in pristine condition? At our car salon, we provide top-notch auto detailing and cleaning solutions to enhance your car’s appearance and protect its value.

        </p>

        <h3 className="text-2xl font-semibold mb-4">Why Choose Our Car Salon?</h3>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start"><span className="text-green-400 mr-2">✅</span>Eco-Friendly Products – Safe, high-quality cleaning agents.</li>
          <li className="flex items-start"><span className="text-green-400 mr-2">✅</span>Expert Technicians – Skilled professionals ensuring a showroom-like finish.</li>
          <li className="flex items-start"><span className="text-green-400 mr-2">✅</span>Convenient Packages – Affordable and tailored services for every car owner..</li>
          
        </ul>
      </div>

      {/* Centered Service Cards */}
      <div className="px-4 py-10">
        <div
          className="grid gap-4 place-items-center max-w-screen-lg mx-auto"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
        >
          {service.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition w-full max-w-sm"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  draggable="false"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-[#00a0db] text-white flex flex-col items-start justify-between h-full">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm mb-4">{item.price}</p>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    item.buttonStyle === "black"
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
  );
};

export default Washing;
