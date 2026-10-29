import React from "react";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, border, fraunces } from "./redesignTheme";
import galleryCategories from "./galleryData";

const MockupGallerySideBySide = () => {
  useGoogleFont();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="px-6 pt-14 pb-10 text-center">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Mockup — Side-by-Side Pairs</span>
          <h1 style={fraunces} className="text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">Before &amp; After Gallery</h1>
        </div>
        <div className="max-w-6xl mx-auto px-6 pb-20 grid sm:grid-cols-2 gap-6">
          {galleryCategories.map((cat) => {
            const pair = cat.pairs[0];
            return (
              <div key={cat.slug} className="bg-white rounded-2xl overflow-hidden" style={{ border: `1px solid ${border}` }}>
                <div className="grid grid-cols-2">
                  <div className="relative aspect-square">
                    <img src={pair.before} alt="Before" className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wide text-white bg-black/50 px-2 py-0.5 rounded-full">Before</div>
                  </div>
                  <div className="relative aspect-square">
                    <img src={pair.after} alt="After" className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wide text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: accent }}>After</div>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <div style={fraunces} className="text-base font-semibold text-[#13242c]">{cat.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <RedesignFooter />
    </div>
  );
};

export default MockupGallerySideBySide;
