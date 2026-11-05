import React from "react";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";

const SectionLabel = ({ children }) => (
  <div className="max-w-5xl mx-auto px-6 pt-10 pb-4">
    <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ backgroundColor: navy, color: "white" }}>
      {children}
    </span>
  </div>
);

const timeline = [
  {
    year: "2005",
    title: "Where it started",
    text: "Our journey began in Melbourne in 2005, washing cars by hand. What started as a job quickly became a passion. Over the years we learned every aspect of car care, from everyday vehicles to premium and exotic cars that demand the highest level of skill.",
  },
  {
    year: "2015",
    title: "A new chapter in Perth",
    text: "In 2014 we moved to Perth for bigger and better opportunities. A year later, Car Saloon was born with one clear vision: every car that comes through our doors is detailed with genuine attention and care.",
  },
];

// ---------- 1: Vertical line (already live) ----------
const TimelineA = () => (
  <div className="bg-[#f8f6f1]">
    <SectionLabel>Option A — Vertical line with dots (currently live)</SectionLabel>
    <div className="max-w-3xl mx-auto px-6 pb-16">
      <div className="pl-9" style={{ borderLeft: `2px solid ${border}` }}>
        {timeline.map((t, i) => (
          <div key={t.year} className={`relative ${i > 0 ? "mt-10" : ""}`}>
            <div className="absolute w-3.5 h-3.5 rounded-full" style={{ backgroundColor: accent, left: "-43px", top: "6px" }} />
            <div style={{ ...fraunces, color: accent }} className="text-3xl font-bold mb-1">{t.year}</div>
            <h3 style={fraunces} className="text-lg font-semibold text-[#13242c] mb-2">{t.title}</h3>
            <p className="text-[#52585d] leading-relaxed text-[15px]">{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ---------- 2: Horizontal roadmap ----------
const TimelineB = () => (
  <div className="bg-[#f8f6f1]">
    <SectionLabel>Option B — Horizontal roadmap</SectionLabel>
    <div className="max-w-4xl mx-auto px-6 pb-16">
      <div className="relative grid sm:grid-cols-2 gap-10">
        <div className="hidden sm:block absolute top-5 left-[12%] right-[12%] h-0.5" style={{ backgroundColor: border }} />
        {timeline.map((t) => (
          <div key={t.year} className="relative text-center sm:text-left">
            <div className="hidden sm:block absolute -top-[2px] left-1/2 sm:left-0 w-3 h-3 rounded-full -translate-x-1/2 sm:translate-x-0" style={{ backgroundColor: accent }} />
            <div style={{ ...fraunces, color: accent }} className="text-4xl font-bold mt-6 sm:mt-6 mb-2">{t.year}</div>
            <h3 style={fraunces} className="text-lg font-semibold text-[#13242c] mb-2">{t.title}</h3>
            <p className="text-[#52585d] leading-relaxed text-[15px]">{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ---------- 3: Zig-zag with watermark year ----------
const TimelineC = () => (
  <div className="bg-[#f8f6f1]">
    <SectionLabel>Option C — Alternating zig-zag with watermark year</SectionLabel>
    <div className="max-w-4xl mx-auto px-6 pb-16 flex flex-col gap-8">
      {timeline.map((t, i) => (
        <div
          key={t.year}
          className={`relative overflow-hidden rounded-2xl p-8 bg-white flex ${i % 2 === 1 ? "sm:flex-row-reverse" : ""}`}
          style={{ border: `1px solid ${border}` }}
        >
          <div style={{ ...fraunces, color: accent }} className="absolute -bottom-6 -right-2 text-[7rem] font-bold opacity-[0.08] leading-none select-none pointer-events-none">
            {t.year}
          </div>
          <div className="relative flex-1">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3" style={{ backgroundColor: navy, color: "white" }}>
              {t.year}
            </span>
            <h3 style={fraunces} className="text-xl font-semibold text-[#13242c] mb-2">{t.title}</h3>
            <p className="text-[#52585d] leading-relaxed text-[15px] max-w-lg">{t.text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ---------- 4: Editorial big-number split blocks ----------
const TimelineD = () => (
  <div className="bg-[#f8f6f1]">
    <SectionLabel>Option D — Editorial split blocks</SectionLabel>
    <div className="max-w-4xl mx-auto px-6 pb-16 flex flex-col">
      {timeline.map((t, i) => (
        <div
          key={t.year}
          className="flex flex-wrap items-center gap-6 py-8"
          style={{ borderTop: i > 0 ? `1px solid ${border}` : "none" }}
        >
          <div style={{ ...fraunces, color: i % 2 === 0 ? accent : navy }} className="text-6xl sm:text-7xl font-bold w-full sm:w-48 shrink-0">
            {t.year}
          </div>
          <div className="flex-1 min-w-[260px]">
            <h3 style={fraunces} className="text-xl font-semibold text-[#13242c] mb-2">{t.title}</h3>
            <p className="text-[#52585d] leading-relaxed text-[15px]">{t.text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TimelineMockups = () => {
  useGoogleFont();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="min-h-screen">
      <TimelineA />
      <TimelineB />
      <TimelineC />
      <TimelineD />
    </div>
  );
};

export default TimelineMockups;
