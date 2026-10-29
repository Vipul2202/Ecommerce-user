import React from "react";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, fraunces } from "./redesignTheme";
import about from "../../img/about.jpg";

const AboutV2 = () => {
  useGoogleFont();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="px-6 pt-14 pb-10 text-center">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>About Us</span>
          <h1 style={fraunces} className="text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">Car Wash &amp; Detailing</h1>
        </div>
        <div className="max-w-5xl mx-auto px-6 pb-20 flex flex-wrap gap-12 items-center">
          <div className="flex-1 min-w-[300px]">
            <img src={about} alt="Car Saloon" draggable="false" className="w-full rounded-2xl" />
          </div>
          <div className="flex-1 min-w-[300px]">
            <p className="text-[#52585d] leading-loose text-[17px]">
              We are a specialized facility that provides professional cleaning and detailing services for vehicles. We offer a range of services, from basic exterior washes to full interior and exterior detailing. At Car Saloon, we use automated systems, high-pressure water jets, eco-friendly cleaning solutions, and manual handwashing techniques to ensure a thorough and gentle cleaning process.
            </p>
          </div>
        </div>
      </main>
      <RedesignFooter />
    </div>
  );
};

export default AboutV2;
