import React from 'react';
import { CheckCircle } from 'lucide-react';

const Service = () => {
  const services = [
    {
      id: 1,
      title: "Outside Only",
      price: "From $35*",
      buttonText: "Book Now"
    },
    {
      id: 2,
      title: "Inside And Outside", 
      price: "From $55*",
      buttonText: "Book Now"
    },
    {
      id: 3,
      title: "Premium Wash",
      price: "From $85*", 
      buttonText: "Book Now"
    }
  ];

  const benefits = [
    "Eco-Friendly Products - Safe, high-quality cleaning agents.",
    "Expert Technicians - Skilled professionals ensuring a showroom-like finish.",
    "Convenient Packages - Affordable and tailored services for every car owner."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Professional Car Washing Services at Car Saloon - Keep Your Vehicle Spotless !
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Looking for the best car washing services to keep your vehicle in pristine condition? At our car saloon, we provide top-notch auto detailing and cleaning solutions to enhance your car's appearance and protect its value.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center lg:text-left">
            Why Choose Our Car Saloon?
          </h2>
          <div className="space-y-4 lg:space-y-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3 lg:space-x-4">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-12 lg:mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-orange-400 tracking-wider">
            BOOK YOUR CAR WASH TODAY !
          </h3>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300">
              {/* Car Image */}
              <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-20 md:w-40 md:h-24 bg-gray-700 rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                      <div className="w-20 h-12 md:w-24 md:h-14 bg-blue-400 rounded opacity-80"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Service Info */}
              <div className="bg-orange-500 p-6">
                <div className="text-center mb-4">
                  <button className="bg-gray-800 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-700 transition-colors duration-300 mb-4">
                    {service.buttonText}
                  </button>
                </div>
                
                <h4 className="text-white font-bold text-lg md:text-xl text-center mb-2">
                  {service.title}
                </h4>
                
                <p className="text-white text-xl md:text-2xl font-bold text-center">
                  {service.price} onwards
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 lg:mt-16">
          <p className="text-gray-400 text-sm">
            * Prices may vary based on vehicle size and condition
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;