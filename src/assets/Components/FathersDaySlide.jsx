import React from "react";
import storefront from "../../../src/img/fathers-day-storefront.jpg";

const FathersDaySlide = () => (
  <>
    <img
      src={storefront}
      alt="Car Saloon Myaree storefront"
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
          <div className="absolute inset-[3px] rounded-full bg-[#00a0db] flex flex-col items-center justify-center shadow-inner">
            <span className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-extrabold leading-none text-white">
              15%
            </span>
            <span className="text-[7px] sm:text-[10px] md:text-sm uppercase tracking-wide text-white mt-0.5">
              Off
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 text-left min-w-0">
          <span className="hidden sm:block text-[10px] md:text-sm font-bold tracking-widest uppercase text-amber-400">
            This Father's Day
          </span>
          <h1 className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight text-balance">
            Get 15% off any service
          </h1>
          <p className="hidden sm:block text-xs md:text-base text-white/85 leading-snug">
            Walk in — the discount's applied on the spot.
          </p>
          <div className="mt-1 md:mt-2 bg-amber-500/15 border border-amber-400/40 rounded-md md:rounded-lg px-2 py-1 md:px-4 md:py-2 text-[9px] sm:text-xs md:text-sm text-white leading-snug">
            <span className="block">
              <strong className="text-amber-400">Myaree</strong> — walk in
            </span>
            <span className="block">
              <strong className="text-amber-400">Midland</strong> — Book Online
            </span>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default FathersDaySlide;
