import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, border, fraunces } from "./redesignTheme";
import galleryCategories from "./galleryData";
import Bubble from "./Bubble";

const GalleryCategoryV2 = () => {
  useGoogleFont();
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const category = galleryCategories.find((c) => c.slug === categorySlug);

  if (!category) {
    return (
      <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
        <RedesignNav />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 py-24">
          <h2 style={fraunces} className="text-2xl font-semibold text-[#13242c]">Category not found</h2>
          <button onClick={() => navigate("/new-gallery")} className="text-sm font-semibold" style={{ color: accent }}>
            ← Back to Gallery
          </button>
        </main>
        <RedesignFooter />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="relative px-6 pt-14 pb-10 text-center overflow-hidden">
          <Bubble size={100} top="-15%" left="-4%" opacity={0.1} />
          <Bubble size={60} top="30%" right="6%" opacity={0.1} />
          <button onClick={() => navigate("/new-gallery")} className="relative text-sm font-semibold" style={{ color: accent }}>
            ← Back to Gallery
          </button>
          <h1 style={fraunces} className="relative text-3xl sm:text-4xl font-semibold text-[#13242c] mt-4">{category.name}</h1>
        </div>
        <div className="max-w-6xl mx-auto px-6 pb-20 grid sm:grid-cols-2 gap-6">
          {category.pairs.map((pair, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden" style={{ border: `1px solid ${border}` }}>
              <div className="grid grid-cols-2">
                <div className="relative aspect-square">
                  <img src={pair.before} alt="Before" className="w-full h-full object-cover" draggable="false" />
                  <div className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wide text-white bg-black/50 px-2 py-0.5 rounded-full">Before</div>
                </div>
                <div className="relative aspect-square">
                  <img src={pair.after} alt="After" className="w-full h-full object-cover" draggable="false" />
                  <div className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wide text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: accent }}>After</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <RedesignFooter />
    </div>
  );
};

export default GalleryCategoryV2;
