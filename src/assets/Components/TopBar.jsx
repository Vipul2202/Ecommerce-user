import React from "react";
import logo from "../../../src/img/logo.png";

const TopBar = () => {
  return (
    <div className="w-full h-auto relative">
      {/* Mobile Blue Bar */}
      <div className="bg-[#00a0db] text-white text-center py-1 lg:hidden">
        <p className="text-sm font-bold">
          Mon–Fri: 7:00AM–5:00PM | Sat: 8:00AM–4:00PM | Sun: Appointment Only
        </p>
      </div>

      {/* Main Top Bar */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="block w-32" aria-label="Go to Home">
            <img
              draggable="false"
              src={logo}
              alt="CarSaloon Logo"
              className="w-40 h-auto object-contain mx-auto lg:mx-0"
            />
          </a>

          {/* Desktop Info Section */}
          <div className="hidden lg:flex w-full lg:w-auto flex-wrap lg:flex-nowrap justify-center lg:justify-end items-center gap-12 text-sm">
            {/* Opening Hour */}
            <div className="flex items-center gap-2">
              <i className="far fa-clock text-xl text-[#00a0db]" />
              <div className="leading-tight">
                <h3 className="text-[#00a0db] font-bold">Opening Hour</h3>
                <p className="font-bold">Mon – Fri, 7:00AM – 5:00PM</p>
                <p className="font-bold">Sat– 8:00AM - 4:00PM</p>
                <p className="font-bold">Sun - Appointment Only</p>
              </div>
            </div>

            {/* Call Us */}
            <div className="flex items-center gap-2">
              <i className="fa fa-phone-alt text-xl text-[#00a0db]" />
              <div className="leading-tight">
                <h3 className="font-bold text-[#00a0db]">Call Us</h3>
                <p className="font-bold">0430 170 164</p>
              </div>
            </div>

            {/* Email Us */}
            <div className="flex items-center gap-2">
              <i className="far fa-envelope text-xl text-[#00a0db]" />
              <div className="leading-tight">
                <h3 className="font-bold text-[#00a0db]">Email Us</h3>
                <p className="font-bold">info@carsaloon.com.au</p>
              </div>
            </div>
          </div>

          {/* Mobile Book Now Button */}
          <div className="lg:hidden">
            <a
              href="/booking"
              className="bg-[#00a0db] text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-[#0088b3] transition"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
