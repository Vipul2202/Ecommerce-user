import React from "react";
import { useNavigate } from "react-router-dom";
import { navy, fraunces } from "./redesignTheme";
import ceramicPhoto from "../../img/team1.jpeg";

const NovemberSpecialBannerV2 = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-56 sm:h-64 overflow-hidden">
      <img src={ceramicPhoto} alt="Car Saloon ceramic coating" draggable="false" className="w-full h-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(65% 75% at 50% 50%, rgba(10,59,77,.65) 0%, rgba(10,59,77,.8) 55%, rgba(10,59,77,.9) 100%)",
        }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="flex items-center gap-4 sm:gap-8 max-w-3xl">
          <div className="relative flex-none w-16 h-16 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center text-center px-1" style={{ backgroundColor: "#0a7fa6" }}>
            <span className="text-sm sm:text-xl font-extrabold leading-none text-white">FREE</span>
            <span className="text-[7px] sm:text-[10px] uppercase tracking-wide text-white/90 mt-0.5 leading-tight">Engine Bay Clean</span>
          </div>
          <div className="flex flex-col gap-1 sm:gap-2 text-left min-w-0">
            <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-amber-300">
              November Special
            </span>
            <h2 style={fraunces} className="text-base sm:text-2xl md:text-3xl font-semibold text-white leading-tight text-balance">
              Spend $150+, get a FREE Engine Bay clean
            </h2>
            <p className="hidden sm:block text-sm md:text-base font-medium text-white/90">
              Degrease + High-Pressure Clean &middot; Valid 1&ndash;30 Nov 2026
            </p>
            <button
              onClick={() => navigate("/new-booking")}
              className="mt-1 self-start px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white"
              style={{ backgroundColor: navy }}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovemberSpecialBannerV2;
