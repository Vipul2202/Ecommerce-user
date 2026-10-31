import React from "react";
import { useNavigate } from "react-router-dom";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, fraunces } from "./redesignTheme";
import galleryCategories from "./galleryData";
import Bubble from "./Bubble";

const HEIGHTS = ["h-56", "h-72", "h-64", "h-80", "h-60"];

const GalleryV2 = () => {
  useGoogleFont();
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="relative px-6 pt-14 pb-10 text-center overflow-hidden">
          <Bubble size={100} top="-15%" left="-4%" opacity={0.1} />
          <Bubble size={60} top="30%" right="6%" opacity={0.1} />
          <span className="relative text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Real Results</span>
          <h1 style={fraunces} className="relative text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">Before &amp; After Gallery</h1>
        </div>
        <div className="max-w-6xl mx-auto px-6 pb-20 columns-2 sm:columns-3 gap-5 [&>*]:mb-5">
          {galleryCategories.map((cat, i) => (
            <button
              key={cat.slug}
              onClick={() => navigate(`/new-gallery/${cat.slug}`)}
              className={`w-full break-inside-avoid relative rounded-2xl overflow-hidden block text-left ${HEIGHTS[i % HEIGHTS.length]}`}
            >
              <img src={cat.thumbnail} alt={cat.name} className="w-full h-full object-cover" draggable="false" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-white font-semibold text-sm">{cat.name}</div>
                <div className="text-white/70 text-xs">{cat.pairs.length} example{cat.pairs.length !== 1 ? "s" : ""}</div>
              </div>
            </button>
          ))}
        </div>
      </main>
      <RedesignFooter />
    </div>
  );
};

export default GalleryV2;
