import React from "react";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, fraunces } from "./redesignTheme";
import galleryCategories from "./galleryData";

const HEIGHTS = ["h-56", "h-72", "h-64", "h-80", "h-60"];

const MockupGalleryMasonry = () => {
  useGoogleFont();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="px-6 pt-14 pb-10 text-center">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Mockup — Masonry Grid</span>
          <h1 style={fraunces} className="text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">Before &amp; After Gallery</h1>
        </div>
        <div className="max-w-6xl mx-auto px-6 pb-20 columns-2 sm:columns-3 gap-5 [&>*]:mb-5">
          {galleryCategories.map((cat, i) => (
            <div key={cat.slug} className={`break-inside-avoid relative rounded-2xl overflow-hidden ${HEIGHTS[i % HEIGHTS.length]}`}>
              <img src={cat.thumbnail} alt={cat.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-white font-semibold text-sm">{cat.name}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <RedesignFooter />
    </div>
  );
};

export default MockupGalleryMasonry;
