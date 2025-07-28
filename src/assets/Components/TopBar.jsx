import React from "react";
import logo from "../../../src/img/logo.png";

const TopBar = () => {
  return (
    <div className="w-full bg-white border-b border h-auto">
      <div className="max-w-screen-xl mx-auto px-4 py-2">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

          {/* Logo Section */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-start">
            <a href="/" className="block w-20">
              <img
                draggable="false"
                src={logo}
                alt="CarSaloon Logo"
                className="w-48 h-auto object-contain"
              />
            </a>
          </div>

          {/* Info Section - Horizontal with gap */}
          <div className="w-full flex flex-wrap lg:flex-nowrap justify-center lg:justify-end items-center gap-12  text-sm">
            
            {/* Opening Hour */}
            <div className="flex items-center gap-2">
              <i className="far fa-clock text-xl text-[#00a0db]" />
              <div className="leading-tight">
                <h3 className=" text-[#00a0db] font-bold">Opening Hour</h3>
                <p className="font-bold">Mon – Fri, 7:00 – 5:00</p>
                <p className="font-bold">Sat–Sun, Appointment Only</p>
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
        </div>
      </div>
    </div>
  );
};

export default TopBar;
