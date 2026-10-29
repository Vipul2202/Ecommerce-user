import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, Car as SedanIcon } from "lucide-react";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import serviceTierData from "./serviceTierData";

const SEGMENTS = [
  { key: "sedan", label: "Sedan" },
  { key: "suv", label: "SUV" },
  { key: "fourWd", label: "4WD / 7-Seater" },
];

const MockupGridStrip = () => {
  useGoogleFont();
  const navigate = useNavigate();
  const data = serviceTierData.full_detail;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="px-6 pt-14 pb-8 text-center">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Mockup — Grid Content + Horizontal Strip Pricing</span>
          <h1 style={fraunces} className="text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">{data.title}</h1>
          {data.tagline && <p className="text-[#6b7278] mt-2">{data.tagline}</p>}
        </div>

        <div className="max-w-5xl mx-auto px-6 mb-14">
          <div className="rounded-2xl p-6 grid sm:grid-cols-3 gap-4" style={{ backgroundColor: navy }}>
            {SEGMENTS.map((s) => (
              <div key={s.key} className="bg-white/10 rounded-xl p-5 flex flex-col items-center text-center gap-2">
                <SedanIcon className="w-6 h-6 text-white/80" />
                <div className="text-white font-semibold text-sm">{s.label}</div>
                <div style={fraunces} className="text-2xl font-semibold text-white">${data.pricing[s.key]}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <button onClick={() => navigate("/new-booking")} className="px-8 py-3 rounded-full font-semibold text-white" style={{ backgroundColor: navy }}>
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

export default MockupGridStrip;
