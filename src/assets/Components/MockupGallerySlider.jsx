import React, { useState } from "react";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import galleryCategories from "./galleryData";

const BeforeAfterSlider = ({ pair }) => {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] select-none" style={{ border: `1px solid ${border}` }}>
      <img src={pair.before} alt="Before" className="absolute inset-0 w-full h-full object-cover" draggable="false" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={pair.after} alt="After" className="absolute inset-0 w-full h-full object-cover" draggable="false" />
      </div>
      <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide text-white bg-black/50 px-2 py-1 rounded-full">Before</div>
      <div className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wide text-white bg-black/50 px-2 py-1 rounded-full">After</div>
      <div className="absolute top-0 bottom-0 w-0.5 pointer-events-none" style={{ left: `${pos}%`, backgroundColor: accent }} />
      <div
        className="absolute top-1/2 w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center text-xs font-bold pointer-events-none"
        style={{ left: `${pos}%`, backgroundColor: accent, color: navy }}
      >
        ↔
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
      />
    </div>
  );
};

const MockupGallerySlider = () => {
  useGoogleFont();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="px-6 pt-14 pb-10 text-center">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Mockup — Interactive Before/After Slider</span>
          <h1 style={fraunces} className="text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">Before &amp; After Gallery</h1>
          <p className="text-[#6b7278] mt-2 text-sm">Drag any image to compare</p>
        </div>
        <div className="max-w-6xl mx-auto px-6 pb-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryCategories.map((cat) => (
            <div key={cat.slug} className="flex flex-col gap-3">
              <BeforeAfterSlider pair={cat.pairs[0]} />
              <div style={fraunces} className="text-base font-semibold text-[#13242c]">{cat.name}</div>
            </div>
          ))}
        </div>
      </main>
      <RedesignFooter />
    </div>
  );
};

export default MockupGallerySlider;
