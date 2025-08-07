import React from "react";
import { useNavigate } from "react-router-dom";

// Replace these imports with your actual image imports
import team1 from "../../img/team1.jpeg";
import team2 from "../../img/team2.jpg";
// import team3 from "../..img/team3.jpg";
import team3 from "../../img/team3.jpg"
// import team4 from "../..img/team4.jpeg";
import team4 from "../../img/team4.jpeg";
// import team4 from "../../img/team4.png";

const Lastbar = () => {
  const navigate = useNavigate();

  const service = [
    {
      id: 1,
      title: "Car Touch-up Services",
      price: "From $199* onwards",
      image: team1,
      buttonStyle: "black",
    },
    {
      id: 2,
      title: "Buff And Polish",
      price: "From $179* onwards",
      image: team2,
      buttonStyle: "white",
    },
    {
      id: 3,
      title: "Head Light Restoration",
      price: "From $50* onwards",
      image: team3,
      buttonStyle: "black",
    },
    {
      id: 4,
      title: "Dog Hair Removal",
      price: "From $50* onwards",
      image: team4,
      buttonStyle: "black",
    },
  ];

  const handleLearnMore = (serviceTitle) => {
    navigate(`/extras`);
  };

  return (
    <div className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#00a0db] text-sm font-semibold tracking-wider uppercase mb-4">
            Some Over the Top Services
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold">
            Car Touch-up Services
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {service.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105"
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  draggable="false"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-500"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white transition-all duration-500 transform translate-y-16 group-hover:translate-y-0">
                <h3 className="text-xl font-bold tracking-wide">{item.title}</h3>
                <p className="text-sm opacity-80 mt-1">{item.price}</p>
                <button
                  onClick={() => handleLearnMore(item.title)}
                  className={`mt-4 relative px-5 py-2 rounded-full font-medium text-sm overflow-hidden group/button transition-all duration-300 ${
                    item.buttonStyle === "black"
                      ? "bg-black text-white hover:bg-gray-900"
                      : "bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-100 hover:to-white"
                  }`}
                >
                  <span className="relative z-10">Learn More</span>
                  <span className="absolute inset-0 bg-white/20 group-hover/button:blur-sm rounded-full z-0 transition-all duration-500"></span>
                </button>
              </div>

              {/* Neon border */}
              <div className="absolute inset-0 border border-transparent rounded-3xl group-hover:border-blue-400 transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default Lastbar;
