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
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Services Included:</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                  <span className="w-4 h-4 text-white  bg-black mr-2 flex items-center justify-center rounded-sm text-xs font-bol"> ✓</span>Includes Interior Detail
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 text-white bg-black mr-2 flex items-center justify-center rounded-sm text-xs font-bol"> ✓</span> Engine Bay Degreased
                  </li>
                  <li className="flex items-center">
                   <span className="w-4 h-4 text-white  bg-black mr-2 flex items-center justify-center rounded-sm text-xs font-bol"> ✓</span> Buff and Polish (Correct Minor Scratches)
                  </li>
                  <li className="flex items-center">
                   <span className="w-4 h-4 text-white  bg-black mr-2 flex items-center justify-center rounded-sm text-xs font-bol"> ✓</span> Fabric Seats Steam Clean
                  </li>
                  <li className="flex items-center">
                   <span className="w-4 h-4 text-white  bg-black mr-2 flex items-center justify-center rounded-sm text-xs font-bol"> ✓</span> Leather Seats Clean and Condition
                  </li>
                 
                </ul>
              </div>

              {/* Exterior Wash */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">ENGINE BAY DEGREASED</h2>
                <p className="text-sm leading-relaxed">
                  Transform your engine bay with our expert degreasing service. We meticulously remove layers of grease, grime, and dirt, revealing a cleaner, more polished engine. This deep clean not only enhances the appearance but also promotes optimal performance by improving airflow and reducing dirt buildup on key components. Your engine will look as powerful as it performs!
                </p>
               
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">BUFF AND POLISH (CORRECT MINOR SCRATCHES)</h2>
                <p className="text-sm leading-relaxed">
                  Unlock a flawless finish with our Buff and Polish service. We expertly remove minor scratches and imperfections, restoring your vehicle’s paint to its original shine. Through precision buffing and polishing, we smooth the surface, leaving a glossy, like-new finish that reflects the beauty of your car from every angle.
                </p>
               
              </div>
               <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">FABRIC SEATS STEAM CLEAN AND CONDITION</h2>
                <p className="text-sm leading-relaxed">
                  At CarSaloon, we understand that your vehicle’s interior is just as important as the exterior — especially the seats you sit on every day. Our Fabric Seats Steam Clean & Condition service is designed to give your car’s upholstery a deep and thorough refresh, removing grime, bacteria, and stubborn stains while preserving the integrity of the material.
                </p>
               
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">LEATHER SEATS CLEAN AND CONDITION</h2>
                <p className="text-sm leading-relaxed">
                  Your vehicle's leather seats are a premium feature — but without proper care, they can crack, fade, or lose their supple feel. At CarSaloon, our Leather Seats Clean & Condition service is designed to restore and protect your leather interior, keeping it looking luxurious and feeling smooth.
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
                  <p className="text-gray-400 italic">From $349</p>
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
                  <p className="text-gray-400 italic">From $399</p>
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
                  <h3 className="text-xl font-semibold">4WD</h3>
                  <p className="text-gray-400 italic">From $449</p>
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
