import React from "react";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import Bubble from "./Bubble";

// Shared template for Terms of Use, Privacy Policy, and Offer Terms &
// Conditions — same structure, different data (see legalPagesData.js).
const LegalPageV2 = ({ data }) => {
  useGoogleFont();

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="relative px-6 pt-14 pb-6 text-center overflow-hidden">
          <Bubble size={80} top="-20%" left="-4%" opacity={0.08} />
          <Bubble size={50} top="20%" right="6%" opacity={0.08} />
          <h1 style={fraunces} className="relative text-3xl sm:text-4xl font-semibold text-[#13242c]">{data.title}</h1>
          <p className="relative text-xs font-bold uppercase tracking-widest mt-3" style={{ color: accent }}>
            Last Updated: {data.lastUpdated}
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-6 pb-8">
          <p className="text-[#52585d] leading-relaxed text-[15px]">{data.intro}</p>
        </div>

        <div className="max-w-3xl mx-auto px-6 pb-10 flex flex-col gap-8">
          {data.sections.map((section) => (
            <div key={section.heading}>
              <h2 style={{ ...fraunces, color: navy }} className="text-lg font-semibold mb-3">{section.heading}</h2>
              <ul className="flex flex-col gap-2">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-[#52585d] leading-relaxed">
                    <span style={{ color: accent }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="rounded-2xl p-6" style={{ backgroundColor: navy }}>
            <p className="text-white text-sm leading-relaxed">{data.finalStatement}</p>
          </div>
        </div>

        {data.ctaHeading && (
          <div className="max-w-3xl mx-auto px-6 pb-20 text-center">
            <div className="rounded-2xl p-8" style={{ border: `1px solid ${border}`, backgroundColor: "#ffffff" }}>
              <h3 style={fraunces} className="text-xl font-semibold text-[#13242c] mb-2">{data.ctaHeading}</h3>
              <p className="text-[#6b7278] text-sm mb-5">{data.ctaBody}</p>
              <a href="/new-contact" className="inline-block px-6 py-2.5 rounded-full font-semibold text-sm text-white" style={{ backgroundColor: navy }}>
                Contact Us
              </a>
            </div>
          </div>
        )}
      </main>
      <RedesignFooter />
    </div>
  );
};

export default LegalPageV2;
