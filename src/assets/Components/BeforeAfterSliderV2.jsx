import React, { useState } from "react";
import { accent, navy, border } from "./redesignTheme";

// Drag-to-compare before/after slider, reused on the gallery category page.
const BeforeAfterSliderV2 = ({ pair }) => {
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
        aria-label="Drag to compare before and after"
      />
    </div>
  );
};

export default BeforeAfterSliderV2;
