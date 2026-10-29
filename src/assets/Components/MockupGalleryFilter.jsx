import React, { useState } from "react";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import galleryCategories from "./galleryData";

const ALL_ITEMS = galleryCategories.flatMap((cat) =>
  cat.pairs.map((pair, i) => ({ ...pair, category: cat.name, id: `${cat.slug}-${i}` }))
);

const MockupGalleryFilter = () => {
  useGoogleFont();
  const [active, setActive] = useState("All");
  const categoryNames = ["All", ...galleryCategories.map((c) => c.name)];
  const visible = active === "All" ? ALL_ITEMS : ALL_ITEMS.filter((i) => i.category === active);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="px-6 pt-14 pb-8 text-center">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Mockup — Filterable Single Grid</span>
          <h1 style={fraunces} className="text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">Before &amp; After Gallery</h1>
        </div>

        <div className="max-w-6xl mx-auto px-6 mb-8 flex flex-wrap justify-center gap-2">
          {categoryNames.map((name) => (
            <button
              key={name}
              onClick={() => setActive(name)}
              className="px-4 py-2 rounded-full text-xs font-semibold border transition-colors"
              style={
                active === name
                  ? { backgroundColor: navy, color: "#fff", borderColor: navy }
                  : { backgroundColor: "#fff", color: "#4a5056", borderColor: border }
              }
            >
              {name}
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {visible.map((item) => (
            <div key={item.id} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${border}` }}>
              <div className="aspect-square relative">
                <img src={item.after} alt={item.category} className="w-full h-full object-cover" />
              </div>
              <div className="px-3 py-2 bg-white text-xs font-semibold text-[#13242c]">{item.category}</div>
            </div>
          ))}
        </div>
      </main>
      <RedesignFooter />
    </div>
  );
};

export default MockupGalleryFilter;
