import React from "react";
import ceramicPhoto from "../../../src/img/team1.jpeg";

const NovemberSpecialSlide = () => (
  <>
    <img
      src={ceramicPhoto}
      alt="Car Saloon ceramic coating"
      draggable="false"
      className="w-full h-full object-cover"
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(65% 75% at 50% 50%, rgba(0,0,0,.55) 0%, rgba(0,0,0,.72) 55%, rgba(0,0,0,.85) 100%), radial-gradient(45% 60% at 20% 45%, rgba(0,160,219,.28), transparent 65%)",
      }}
    ></div>

    <div className="absolute inset-0 flex items-center justify-center px-3 sm:px-6">
      <div className="flex items-center gap-3 sm:gap-6 md:gap-10 max-w-3xl">
        <div className="relative flex-none w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36 lg:w-44 lg:h-44">
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: "conic-gradient(from -40deg, #00a0db, #016d94, #00a0db)" }}
          ></div>
          <div className="absolute inset-[3px] rounded-full bg-[#00a0db] flex flex-col items-center justify-center shadow-inner text-center px-1">
            <span className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-extrabold leading-none text-white">
              FREE
            </span>
            <span className="text-[6px] sm:text-[9px] md:text-xs uppercase tracking-wide text-white mt-0.5 leading-tight">
              Engine Bay Clean
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 text-left min-w-0">
          <span className="hidden sm:block text-[10px] md:text-sm font-bold tracking-widest uppercase text-amber-400">
            November Special
          </span>
          <h1 className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight text-balance">
            Spend $150+, get a FREE Engine Bay clean
          </h1>
          <p className="hidden sm:block text-base md:text-xl font-semibold text-white leading-snug">
            Degrease + High-Pressure Clean
          </p>
          <span className="block text-[8px] sm:text-[9px] md:text-xs text-white/60 mt-0.5">
            *Min. spend $150 per booking. Not valid with any other offer.
          </span>
        </div>
      </div>
    </div>
  </>
);

export default NovemberSpecialSlide;
