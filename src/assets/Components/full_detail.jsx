import React from "react";
import { useNavigate } from "react-router-dom";

const FullDetail = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    // Navigate to booking page
    navigate("/booking");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
         <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#00a0db] mb-4">
        Full Detail
        </h1>
        <p className="text-gray-600 text-lg mb-4">Best for regular care</p>
        <nav className="text-gray-600">
          <span className="text-[#00a0db]">Home</span>
          <span className="mx-2">/</span>
          <span>
            Full Detail
          </span>
        </nav>
      </div>

      {/* Main Content */}
      <main className="px-4 py-12 md:px-8 max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Section - About */}
          <div className="lg:col-span-2">
            <div className="bg-[#00a0db] rounded-lg p-8 md:p-12 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 flex justify-center items-center">
                About Full Detail
              </h1>

              {/* Services Included */}
              <div className="mb-10">
                <h2 className="text-lg font-semibold mb-3">Services Included:</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                  <span className="w-4 h-4 text-white  bg-black mr-2 flex items-center justify-center rounded-sm text-xs font-bol"> ✓</span>Outside Wash and Wax
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 text-white bg-black mr-2 flex items-center justify-center rounded-sm text-xs font-bol"> ✓</span> Windows Cleaning
                  </li>
                  <li className="flex items-center">
                   <span className="w-4 h-4 text-white  bg-black mr-2 flex items-center justify-center rounded-sm text-xs font-bol"> ✓</span> Interior Trims Detailed & Condition
                  </li>
                  <li className="flex items-center">
                   <span className="w-4 h-4 text-white  bg-black mr-2 flex items-center justify-center rounded-sm text-xs font-bol"> ✓</span> Fabric Seats Steam Clean
                  </li>
                  <li className="flex items-center">
                   <span className="w-4 h-4 text-white  bg-black mr-2 flex items-center justify-center rounded-sm text-xs font-bol"> ✓</span> Carpet Steam Clean
                  </li>
                  <li className="flex items-center">
                   <span className="w-4 h-4 text-white  bg-black mr-2 flex items-center justify-center rounded-sm text-xs font-bol"> ✓</span> Roof Lining Clean
                  </li>
                  <li className="flex items-center">
                   <span className="w-4 h-4 text-white  bg-black mr-2 flex items-center justify-center rounded-sm text-xs font-bol"> ✓</span> Leather Seats Clean and Condition
                  </li>

                </ul>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 text-black">OUTSIDE WASH AND WAX</h2>
                <p className="text-sm leading-relaxed">
                  A thorough hand wash to lift dirt and road grime, followed by a protective wax layer. This shields your paint from the elements and leaves a deep, glossy shine that lasts.
                </p>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 text-black">WINDOWS CLEANING</h2>
                <p className="text-sm leading-relaxed">
                  Inside and out, every window is cleaned streak-free for maximum clarity and visibility. A small detail that makes a big difference to how the car looks and feels.
                </p>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 text-black">INTERIOR TRIMS DETAILED & CONDITION</h2>
                <p className="text-sm leading-relaxed">
                  Dashboard, door panels, and console are wiped down and conditioned to remove dust and grime. This restores a fresh look and protects surfaces from UV fading and cracking.
                </p>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 text-black">FABRIC SEATS STEAM CLEAN</h2>
                <p className="text-sm leading-relaxed">
                  A deep steam clean lifts embedded dirt, bacteria, and stains from fabric upholstery. Your seats come out fresh, sanitised, and free of odours.
                </p>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 text-black">CARPET STEAM CLEAN</h2>
                <p className="text-sm leading-relaxed">
                  Floor carpets are steam cleaned to remove trapped dust, dirt, and stains. This leaves the cabin floor looking and smelling like new.
                </p>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 text-black">ROOF LINING CLEAN</h2>
                <p className="text-sm leading-relaxed">
                  The roof lining is gently cleaned to remove built-up dust and marks without damaging the fabric. A finishing touch that completes a fully refreshed interior.
                </p>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 text-black">LEATHER SEATS CLEAN AND CONDITION</h2>
                <p className="text-sm leading-relaxed">
                  Leather seats are cleaned and conditioned to lift dirt and grime while keeping the material soft and supple. Regular conditioning helps prevent cracking and fading, keeping your interior looking premium for longer.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Car Segments */}
          <div className="space-y-6">
            {/* Car Segment Header */}
            <div className="bg-[#00a0db] rounded-lg px-6 py-3 text-center">
              <h2 className="text-white font-bold text-lg tracking-wide">
                CAR SEGMENT
              </h2>
            </div>

            {/* Car Options */}
            <div className="space-y-4">
              {/* Sedan */}
              <div className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                <div className="w-16 h-10 bg-[#00a0db] rounded flex items-center justify-center">
                  <svg
                    className="w-8 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">SEDAN</h3>
                  <p className="text-gray-400 italic">$175</p>
                </div>
              </div>

              {/* SUV */}
              <div className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                <div className="w-16 h-10 bg-[#00a0db] rounded flex items-center justify-center">
                  <svg
                    className="w-8 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                    <rect x="7" y="3" width="10" height="2" rx="1" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">SUV</h3>
                  <p className="text-gray-400 italic">$195</p>
                </div>
              </div>

              {/* 4WD */}
              <div className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                <div className="w-16 h-10 bg-[#00a0db] rounded flex items-center justify-center relative">
                  <svg
                    className="w-8 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                  </svg>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center">
                    {/* <span className="text-xs font-bold text-black">4</span> */}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">4WD / 7 Seater</h3>
                  <p className="text-gray-400 italic">$225</p>
                </div>
              </div>
            </div>

            {/* Book Now Button */}
            <div className="pt-6">
              <button
                onClick={handleBookNow}
                className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl bg-white text-black hover:bg-gray-200"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FullDetail;
