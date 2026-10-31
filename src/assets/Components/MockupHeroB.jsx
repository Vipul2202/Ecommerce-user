import React from "react";
import { useNavigate } from "react-router-dom";
import { RedesignNav } from "./RedesignLayout";
import { useGoogleFont, accent, fraunces } from "./redesignTheme";
import heroMyaree from "../../img/myaree.jpeg";

const MockupHeroB = () => {
  useGoogleFont();
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen">
      <RedesignNav />

      <section className="relative w-full h-[80vh] min-h-[560px] overflow-hidden">
        <img
          src={heroMyaree}
          alt="Car Saloon Myaree storefront"
          draggable="false"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, rgba(10,59,77,.92) 0%, rgba(10,59,77,.55) 45%, rgba(10,59,77,.1) 80%)",
          }}
        ></div>

        <div className="relative h-full max-w-6xl mx-auto px-6 flex flex-col justify-center gap-6">
          <span className="text-sm font-bold tracking-[0.2em] uppercase" style={{ color: "#8fd4ec" }}>
            Perth's Detailing Studio
          </span>
          <h1 style={fraunces} className="text-5xl sm:text-7xl leading-[1.02] font-semibold text-white max-w-2xl">
            The saloon treatment for your car.
          </h1>
          <p className="text-lg text-white/85 max-w-lg leading-relaxed">
            High-end detailing, ceramic coating, tinting and paint correction — for the enthusiast, the dealer, and everyone who just loves their car.
          </p>
          <div className="flex gap-4 flex-wrap pt-2">
            <button
              onClick={() => navigate("/new-booking")}
              className="px-8 py-4 rounded-full font-bold text-lg text-[#0a3b4d] shadow-xl hover:scale-105 transition-transform"
              style={{ backgroundColor: accent }}
            >
              Book a Service
            </button>
            <a
              href="#services"
              className="px-8 py-4 rounded-full font-bold text-lg border-2 border-white text-white hover:bg-white/10 transition-colors"
            >
              Explore Services
            </a>
          </div>
          <div className="flex gap-8 pt-6 text-white/80 text-sm font-semibold flex-wrap">
            <span>★★★★★ 500+ Reviews</span>
            <span>GTechniq Accredited</span>
            <span>Midland &amp; Myaree</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MockupHeroB;
