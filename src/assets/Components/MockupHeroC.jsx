import React from "react";
import { useNavigate } from "react-router-dom";
import { Droplets, Sparkles, Shield } from "lucide-react";
import { RedesignNav } from "./RedesignLayout";
import { useGoogleFont, accent, navy, fraunces } from "./redesignTheme";
import heroMyaree from "../../img/myaree.jpeg";

const MockupHeroC = () => {
  useGoogleFont();
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#f8f6f1" }}>
      <RedesignNav />

      <div className="absolute top-0 right-0 w-1/2 h-full" style={{ backgroundColor: navy, clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }}></div>
      <div className="absolute top-24 left-[8%] w-3 h-3 rounded-full" style={{ backgroundColor: accent }}></div>
      <div className="absolute top-52 left-[20%] w-2 h-2 rounded-full" style={{ backgroundColor: "#f0ad4e" }}></div>
      <div className="absolute bottom-24 left-[14%] w-4 h-4 rounded-full opacity-60" style={{ backgroundColor: accent }}></div>

      <section className="relative max-w-6xl mx-auto px-6 pt-14 pb-10 flex flex-wrap gap-12 items-center">
        <div className="flex-1 min-w-[320px] flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px]" style={{ backgroundColor: accent }}></span>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>
              Perth's Detailing Studio
            </span>
          </div>
          <h1 style={fraunces} className="text-[2.6rem] sm:text-6xl leading-[1.05] font-semibold text-[#13242c]">
            Where your car gets the <em className="not-italic" style={{ color: accent }}>saloon</em> treatment.
          </h1>
          <p className="text-[17px] leading-relaxed text-[#52585d] max-w-md">
            High-end detailing, ceramic coating, tinting and paint correction — for the enthusiast, the dealer, and everyone who just loves their car.
          </p>
          <div className="flex gap-3 flex-wrap pt-1">
            <button
              onClick={() => navigate("/new-booking")}
              className="px-7 py-3.5 rounded-full font-semibold text-white shadow-lg"
              style={{ backgroundColor: navy }}
            >
              Book a Service
            </button>
            <a
              href="#services"
              className="px-7 py-3.5 rounded-full font-semibold border-2"
              style={{ borderColor: navy, color: navy }}
            >
              Explore Services
            </a>
          </div>
          <div className="flex gap-6 pt-4 flex-wrap">
            {[
              { icon: Droplets, label: "Hand Wash" },
              { icon: Sparkles, label: "Ceramic Coat" },
              { icon: Shield, label: "Paint Correction" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2 text-sm font-semibold text-[#4a5056]">
                <f.icon className="w-4 h-4" style={{ color: accent }} />
                {f.label}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 min-w-[320px] relative">
          <img
            src={heroMyaree}
            alt="Car Saloon Myaree storefront"
            draggable="false"
            className="w-full rounded-3xl shadow-2xl object-cover rotate-2"
          />
        </div>
      </section>
    </div>
  );
};

export default MockupHeroC;
