import React from "react";
import { Clock, Phone, Mail } from "lucide-react";
import { RedesignNav } from "./RedesignLayout";
import { useGoogleFont, accent, navy } from "./redesignTheme";

const MARQUEE_ITEMS = ["Walk-ins Welcome — No Booking Required", "GTechniq Ceramic Coating", "Full Detail", "Tinting"];

const MockupMarqueeB = () => {
  useGoogleFont();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen">
      {/* Marquee — accent blue background */}
      <div className="sticky top-0 z-50 py-2 text-xs font-bold tracking-wide overflow-hidden" style={{ backgroundColor: accent, color: "#fff" }}>
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              {item}
              <span className="opacity-60">&bull;</span>
            </span>
          ))}
        </div>
      </div>

      <div className="border-b" style={{ borderColor: "#e7e2d8", backgroundColor: "#ffffff" }}>
        <div className="lg:hidden text-center py-2 text-xs font-semibold" style={{ backgroundColor: "#f1ece2", color: navy }}>
          Mon&ndash;Fri: 7am&ndash;5pm &middot; Sat: 7am&ndash;4pm (Myaree only) &middot; Sun: By appointment
        </div>
        <div className="max-w-6xl mx-auto px-6 py-2.5 hidden lg:flex items-center justify-center gap-10 text-xs">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4" style={{ color: accent }} />
            <div className="leading-tight">
              <div className="font-bold" style={{ color: navy }}>Opening Hours</div>
              <div className="text-[#6b7278]">Mon&ndash;Fri 7am&ndash;5pm &middot; Sat 7am&ndash;4pm (Myaree) &middot; Sun by appt.</div>
            </div>
          </div>
          <div className="w-px h-8" style={{ backgroundColor: "#e7e2d8" }}></div>
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4" style={{ color: accent }} />
            <div className="leading-tight">
              <div className="font-bold" style={{ color: navy }}>Call Us</div>
              <div className="text-[#6b7278]">Midland: 0478 551 640 &middot; Myaree: 0451 288 164</div>
            </div>
          </div>
          <div className="w-px h-8" style={{ backgroundColor: "#e7e2d8" }}></div>
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4" style={{ color: accent }} />
            <div className="leading-tight">
              <div className="font-bold" style={{ color: navy }}>Email Us</div>
              <div className="text-[#6b7278]">info@carsaloon.com.au</div>
            </div>
          </div>
        </div>
      </div>

      <RedesignNav />
      <main className="flex-1 flex items-center justify-center py-24 text-[#8a8f94] text-sm">(page content would go here)</main>
    </div>
  );
};

export default MockupMarqueeB;
