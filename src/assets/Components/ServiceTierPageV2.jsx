import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, Car as SedanIcon } from "lucide-react";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import Bubble from "./Bubble";
import { usePrice } from "./PricingContext";

const SEGMENTS = [
  { key: "sedan", label: "Sedan" },
  { key: "suv", label: "SUV" },
  { key: "fourWd", label: "4WD / 7-Seater" },
];

// Shared template for every washing/detailing tier page (Outside Only,
// Inside & Out, Premium Wash, Mini Detail, Interior Detail, Full Detail,
// Signature Detail, The Works) — same real content as the live pages,
// laid out with a horizontal pricing strip up top and a two-column grid
// of detail sections below.
const ServiceTierPageV2 = ({ data }) => {
  useGoogleFont();
  const navigate = useNavigate();
  const live = usePrice(data.priceKey);
  const pricing = {
    sedan: live?.sedan ?? data.pricing.sedan,
    suv: live?.suv ?? data.pricing.suv,
    fourWd: live?.fourWd ?? data.pricing.fourWd,
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />

      <main className="flex-1">
        <div className="relative px-6 pt-14 pb-8 text-center overflow-hidden">
          <Bubble size={110} top="-10%" left="-4%" opacity={0.1} />
          <Bubble size={70} top="20%" right="4%" opacity={0.1} />
          <span className="relative text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>
            Washing &amp; Detailing
          </span>
          <h1 style={fraunces} className="relative text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">
            {data.title}
          </h1>
          {data.tagline && <p className="relative text-[#6b7278] mt-2">{data.tagline}</p>}
        </div>

        <div className="max-w-5xl mx-auto px-6 mb-14">
          <div className="relative rounded-2xl p-6 grid sm:grid-cols-3 gap-4 overflow-hidden" style={{ backgroundColor: navy }}>
            <Bubble size={90} top="-20%" right="-6%" opacity={0.1} color="#ffffff" />
            <Bubble size={50} bottom="-15%" left="4%" opacity={0.08} color="#ffffff" />
            {SEGMENTS.map((s) => (
              <div key={s.key} className="bg-white/10 rounded-xl p-5 flex flex-col items-center text-center gap-2">
                <SedanIcon className="w-6 h-6 text-white/80" />
                <div className="text-white font-semibold text-sm">{s.label}</div>
                <div style={fraunces} className="text-2xl font-semibold text-white">From ${pricing[s.key]}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <button
              onClick={() => navigate("/new-booking")}
              className="px-8 py-3 rounded-full font-semibold text-white"
              style={{ backgroundColor: navy }}
            >
              Book Now
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-20">
          <div className="bg-white rounded-2xl border p-8 mb-6" style={{ borderColor: border }}>
            <h2 className="text-lg font-semibold mb-4 text-[#13242c]">What's Included</h2>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
              {data.checklist.map((item) => (
                <div key={item} className="flex gap-2 text-sm text-[#4a5056]">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {data.sections.map((s) => (
              <div key={s.heading} className="bg-white rounded-2xl border p-6" style={{ borderColor: border }}>
                <h3 style={fraunces} className="text-base font-semibold text-[#13242c] mb-2">{s.heading}</h3>
                <p className="text-xs leading-relaxed text-[#52585d]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <RedesignFooter />
    </div>
  );
};

export default ServiceTierPageV2;
