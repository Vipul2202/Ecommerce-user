import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import serviceTierData from "./serviceTierData";

const SEGMENTS = [
  { key: "sedan", label: "Sedan" },
  { key: "suv", label: "SUV" },
  { key: "fourWd", label: "4WD / 7-Seater" },
];

const MockupPriceToggle = () => {
  useGoogleFont();
  const navigate = useNavigate();
  const data = serviceTierData.full_detail;
  const [segment, setSegment] = useState("sedan");

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="px-6 pt-14 pb-10 text-center">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Mockup — Pricing: Segmented Toggle</span>
          <h1 style={fraunces} className="text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">{data.title}</h1>
          {data.tagline && <p className="text-[#6b7278] mt-2">{data.tagline}</p>}
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-20 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-2xl border p-8" style={{ borderColor: border }}>
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
            {data.sections.slice(0, 2).map((s) => (
              <div key={s.heading} className="bg-white rounded-2xl border p-8" style={{ borderColor: border }}>
                <h3 style={fraunces} className="text-xl font-semibold text-[#13242c] mb-2">{s.heading}</h3>
                <p className="text-sm leading-relaxed text-[#52585d]">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl p-6 sticky top-24" style={{ backgroundColor: navy }}>
              <div className="text-white font-bold text-sm tracking-wide uppercase mb-4">Select Your Vehicle</div>
              <div className="flex flex-col gap-2 mb-6">
                {SEGMENTS.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSegment(s.key)}
                    className="text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                    style={{
                      backgroundColor: segment === s.key ? "#ffffff" : "rgba(255,255,255,0.1)",
                      color: segment === s.key ? navy : "#ffffff",
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="text-center mb-6">
                <div className="text-white/70 text-xs uppercase tracking-wide mb-1">Price for {SEGMENTS.find((s) => s.key === segment).label}</div>
                <div style={fraunces} className="text-4xl font-semibold text-white">
                  From ${data.pricing[segment]}
                </div>
              </div>
              <button onClick={() => navigate("/new-booking")} className="w-full py-3 rounded-full font-semibold bg-white" style={{ color: navy }}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </main>
      <RedesignFooter />
    </div>
  );
};

export default MockupPriceToggle;
