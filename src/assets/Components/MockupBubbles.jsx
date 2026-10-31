import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Star } from "lucide-react";
import { RedesignNav } from "./RedesignLayout";
import { useGoogleFont, accent, navy, fraunces } from "./redesignTheme";
import heroMyaree from "../../img/myaree.jpeg";

// Simple bubble, sized/positioned/opacity via props — matches the logo's
// scattered blue soap-bubble motif.
const Bubble = ({ size, top, left, right, bottom, opacity = 1, blur = false }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      top,
      left,
      right,
      bottom,
      backgroundColor: accent,
      opacity,
      filter: blur ? "blur(1px)" : "none",
    }}
  />
);

const MockupBubbles = () => {
  useGoogleFont();
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen relative overflow-hidden">
      <RedesignNav />

      {/* decorative background blobs (existing) */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-20 pointer-events-none" style={{ background: accent }}></div>
      <div className="absolute top-40 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: navy }}></div>

      {/* scattered bubbles — new */}
      <Bubble size={14} top="18%" left="6%" opacity={0.5} />
      <Bubble size={8} top="12%" left="11%" opacity={0.35} />
      <Bubble size={22} top="28%" left="3%" opacity={0.25} blur />
      <Bubble size={10} top="8%" left="46%" opacity={0.4} />
      <Bubble size={6} top="14%" left="50%" opacity={0.3} />
      <Bubble size={16} top="60%" left="8%" opacity={0.3} />
      <Bubble size={28} top="5%" right="8%" opacity={0.18} blur />
      <Bubble size={12} top="22%" right="4%" opacity={0.4} />
      <Bubble size={9} top="34%" right="14%" opacity={0.3} />
      <Bubble size={18} top="70%" right="10%" opacity={0.22} blur />
      <Bubble size={7} top="78%" right="20%" opacity={0.35} />

      <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-10 flex flex-wrap gap-12 items-center">
        <div className="flex-1 min-w-[320px] flex flex-col gap-5">
          <span
            className="inline-flex items-center gap-1.5 self-start text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{ backgroundColor: "#fde8e8", color: "#c23b3b" }}
          >
            <Sparkles className="w-3.5 h-3.5" /> Perth's #1 Detailing Studio
          </span>
          <h1 style={fraunces} className="text-[2.6rem] sm:text-6xl leading-[1.05] font-semibold text-[#13242c]">
            Where your car gets the{" "}
            <span className="relative inline-block">
              <span className="relative z-10" style={{ color: accent }}>saloon</span>
              <span className="absolute left-0 right-0 bottom-1 h-3 -z-0" style={{ backgroundColor: "#fde8b8" }}></span>
            </span>{" "}
            treatment.
          </h1>
          <p className="text-[17px] leading-relaxed text-[#52585d] max-w-md">
            High-end detailing, ceramic coating, tinting and paint correction — for the enthusiast, the dealer, and everyone who just loves their car.
          </p>
          <div className="flex gap-3 flex-wrap pt-1">
            <button
              onClick={() => navigate("/new-booking")}
              className="px-7 py-3.5 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform"
              style={{ backgroundColor: navy }}
            >
              Book a Service →
            </button>
            <a
              href="#services"
              className="px-7 py-3.5 rounded-full font-semibold border-2"
              style={{ borderColor: navy, color: navy }}
            >
              Explore Services
            </a>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <div className="flex items-center gap-1 text-sm font-semibold">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1 text-[#4a5056]">5-star rated &middot; 500+ happy customers</span>
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-[320px] relative">
          <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl" style={{ backgroundColor: accent, opacity: 0.15 }}></div>
          <Bubble size={20} top="-6%" right="18%" opacity={0.5} />
          <Bubble size={11} top="-2%" right="30%" opacity={0.4} />
          <img
            src={heroMyaree}
            alt="Car Saloon Myaree storefront"
            draggable="false"
            className="relative w-full rounded-3xl shadow-2xl object-cover"
          />
          <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: navy }}>
              GT
            </div>
            <div className="text-xs">
              <div className="font-bold text-[#13242c]">GTechniq Accredited</div>
              <div className="text-[#8a8f94]">Professional Applicator</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MockupBubbles;
