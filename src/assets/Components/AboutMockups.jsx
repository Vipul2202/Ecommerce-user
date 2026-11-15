import React, { useEffect, useRef, useState } from "react";
import { Award, Star, MapPin, Quote, Users, Sparkles } from "lucide-react";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import Bubble from "./Bubble";
import about from "../../img/about.jpg";
import myaree from "../../img/myaree.jpeg";
import midland from "../../img/midland.jpeg";
import team1 from "../../img/team1.jpeg";
import team2 from "../../img/team2.jpg";
import team3 from "../../img/team3.jpg";

const SectionLabel = ({ children }) => (
  <div className="max-w-5xl mx-auto px-6 pt-10 pb-4">
    <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ backgroundColor: navy, color: "white" }}>
      {children}
    </span>
  </div>
);

const timeline = [
  { year: "2005", title: "Where it started", text: "Our journey began in Melbourne in 2005, washing cars by hand. What started as a job quickly became a passion." },
  { year: "2015", title: "A new chapter in Perth", text: "Car Saloon was born with one clear vision: every car that comes through our doors is detailed with genuine attention and care." },
  { year: "2024", title: "First store opens in Midland", text: "We opened our first permanent studio in Midland, giving that same hand-finished care a dedicated home." },
  { year: "2026", title: "Second store opens in Myaree", text: "Demand grew, and we opened a second studio in Myaree — two dedicated homes for Car Saloon-level care across Perth." },
];

const approach = [
  { title: "Limited daily bookings", text: "We take on only a few vehicles each day so every car gets our full focus." },
  { title: "Quality products", text: "We use only trusted, biodegradable, professional-grade products." },
  { title: "Experienced professionals", text: "Your car is in skilled, careful hands." },
  { title: "No rushed jobs", text: "We take the time to do it right, every time." },
];

// Count up when scrolled into view — same hook as the hero mockups.
function useCountUp(target, duration = 1400) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            setValue(Math.floor(p * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);
  return [ref, value];
}

function CTA({ dark = true }) {
  return (
    <div className="max-w-3xl mx-auto px-6 pb-20">
      <div className="rounded-2xl text-center p-10" style={{ backgroundColor: dark ? navy : "#fff", border: dark ? "none" : `1px solid ${border}` }}>
        <h3 style={{ ...fraunces, color: dark ? "white" : "#13242c" }} className="text-2xl font-semibold mb-2">Book your detail today</h3>
        <p className={dark ? "text-white/75 mb-6" : "text-[#6b7278] mb-6"}>See the difference that care makes. Visit us in Midland or Myaree.</p>
        <div className="flex gap-3 flex-wrap justify-center">
          <a href="tel:0478551640" className="px-6 py-3 rounded-full font-semibold text-sm text-white" style={{ backgroundColor: accent }}>Call Midland</a>
          <a href="tel:0451288164" className="px-6 py-3 rounded-full font-semibold text-sm" style={dark ? { border: "1px solid rgba(255,255,255,0.4)", color: "white" } : { border: `1px solid ${border}`, color: navy }}>Call Myaree</a>
        </div>
      </div>
    </div>
  );
}

// ---------- A: Story & Timeline (close to what's live now) ----------
const AboutA = () => (
  <div className="bg-[#f8f6f1]">
    <SectionLabel>Option A — Story &amp; Timeline (close to what's live now)</SectionLabel>
    <div className="relative px-6 pt-4 pb-6 text-center overflow-hidden">
      <Bubble size={100} top="-15%" left="-4%" opacity={0.1} />
      <span className="relative text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>About Car Saloon</span>
      <h1 style={fraunces} className="relative text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">Detailing with attention and care since 2015</h1>
      <p className="relative text-[#6b7278] mt-3 max-w-xl mx-auto text-sm">Two decades of passion for cars, one vehicle at a time.</p>
    </div>
    <div className="max-w-5xl mx-auto px-6 pb-14 flex flex-wrap gap-12 items-center">
      <div className="flex-1 min-w-[300px]"><img src={about} alt="Car Saloon workshop" draggable="false" className="w-full rounded-2xl" /></div>
      <div className="flex-1 min-w-[300px]">
        <p className="text-[#52585d] leading-loose text-[16px]">
          We are a specialized facility that provides professional cleaning and detailing services for vehicles, using biodegradable cleaning solutions and manual handwashing techniques to ensure a thorough, gentle clean.
        </p>
      </div>
    </div>
    <div className="max-w-3xl mx-auto px-6 pb-14">
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
    <div className="max-w-5xl mx-auto px-6 pb-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {approach.map((a) => (
          <div key={a.title} className="bg-white rounded-2xl p-5" style={{ borderTop: `3px solid ${accent}`, border: `1px solid ${border}`, borderTopWidth: 3, borderTopColor: accent }}>
            <h4 className="text-sm font-bold text-[#13242c] mb-2">{a.title}</h4>
            <p className="text-sm text-[#6b7278] leading-relaxed">{a.text}</p>
          </div>
        ))}
      </div>
    </div>
    <CTA />
  </div>
);

// ---------- B: By the Numbers (stats-led, credibility-first) ----------
const Stat = ({ value, suffix = "", label }) => {
  const [ref, count] = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div style={{ ...fraunces, color: accent }} className="text-4xl sm:text-5xl font-bold">{count}{suffix}</div>
      <div className="text-xs sm:text-sm font-semibold text-white/80 mt-1 uppercase tracking-wide">{label}</div>
    </div>
  );
};

const AboutB = () => (
  <div className="bg-[#f8f6f1]">
    <SectionLabel>Option B — By the Numbers (stats-led, credibility-first)</SectionLabel>
    <div className="relative px-6 pt-4 pb-10 text-center overflow-hidden" style={{ backgroundColor: navy }}>
      <Bubble size={120} top="-20%" right="-8%" opacity={0.08} color="#ffffff" />
      <span className="relative text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>About Car Saloon</span>
      <h1 style={{ ...fraunces, color: "white" }} className="relative text-3xl sm:text-4xl font-semibold mt-3">Trusted with thousands of cars since 2005</h1>
      <p className="relative text-white/70 mt-3 max-w-xl mx-auto text-sm">The numbers behind why Perth keeps coming back.</p>
      <div className="relative max-w-3xl mx-auto mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
        <Stat value={20} suffix="+" label="Years Experience" />
        <Stat value={2} label="Perth Studios" />
        <Stat value={49} suffix="" label="Google Reviews" />
        <Stat value={5} suffix=".0" label="Myaree Rating" />
      </div>
    </div>
    <div className="max-w-4xl mx-auto px-6 py-14 text-center">
      <Award className="w-7 h-7 mx-auto mb-3" style={{ color: accent }} />
      <p className="text-[#52585d] leading-loose text-[17px] max-w-2xl mx-auto">
        What started as hand-washing cars in Melbourne in 2005 became Car Saloon in Perth in 2015 — built on one rule: every car gets genuine attention, biodegradable products, and no rushed jobs.
      </p>
    </div>
    <div className="max-w-5xl mx-auto px-6 pb-16">
      <div className="grid sm:grid-cols-3 gap-5">
        {[team1, team2, team3].map((img, i) => (
          <img key={i} src={img} alt="Car Saloon team at work" draggable="false" className="w-full h-48 object-cover rounded-2xl" />
        ))}
      </div>
    </div>
    <CTA dark={false} />
  </div>
);

// ---------- C: Editorial (pull-quote, photo collage) ----------
const AboutC = () => (
  <div className="bg-[#f8f6f1]">
    <SectionLabel>Option C — Editorial (pull-quote, photo collage)</SectionLabel>
    <div className="max-w-4xl mx-auto px-6 pt-8 pb-4">
      <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Our Story</span>
    </div>
    <div className="max-w-4xl mx-auto px-6 pb-10 relative">
      <Quote className="w-10 h-10 mb-4" style={{ color: accent }} />
      <h1 style={fraunces} className="text-3xl sm:text-5xl font-semibold text-[#13242c] leading-tight">
        "Your car deserves more than a rinse — it deserves respect."
      </h1>
    </div>
    <div className="max-w-5xl mx-auto px-6 pb-14 grid sm:grid-cols-3 gap-4" style={{ gridTemplateRows: "auto" }}>
      <img src={about} alt="Car Saloon workshop" draggable="false" className="w-full h-64 object-cover rounded-2xl sm:col-span-2 sm:row-span-2 sm:h-full" />
      <img src={team1} alt="Car Saloon team member detailing a car" draggable="false" className="w-full h-32 object-cover rounded-2xl" />
      <img src={team2} alt="Car Saloon team member detailing a car" draggable="false" className="w-full h-32 object-cover rounded-2xl" />
    </div>
    <div className="max-w-2xl mx-auto px-6 pb-14">
      <p className="text-[#52585d] leading-loose text-[18px]" style={fraunces}>
        From hand-washing cars in Melbourne in 2005, to opening Car Saloon in Perth in 2015 — the approach never changed. Limited daily bookings. Biodegradable products. Experienced hands. No rushed jobs.
      </p>
    </div>
    <div className="max-w-3xl mx-auto px-6 pb-4 flex flex-wrap gap-x-10 gap-y-2 justify-center">
      {approach.map((a) => (
        <span key={a.title} className="text-sm font-semibold text-[#13242c] flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" style={{ color: accent }} /> {a.title}
        </span>
      ))}
    </div>
    <CTA />
  </div>
);

// ---------- D: Two Studios Side-by-Side (location-forward) ----------
const StudioCard = ({ img, name, address, phone, tel }) => (
  <div className="bg-white rounded-2xl overflow-hidden flex-1 min-w-[280px]" style={{ border: `1px solid ${border}` }}>
    <img src={img} alt={`Car Saloon ${name} studio`} draggable="false" className="w-full h-48 object-cover" />
    <div className="p-6 flex flex-col gap-2">
      <h3 style={fraunces} className="text-xl font-semibold text-[#13242c]">{name}</h3>
      <div className="flex items-start gap-2 text-sm text-[#6b7278]">
        <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} /> {address}
      </div>
      <a href={`tel:${tel}`} className="text-sm font-semibold mt-1" style={{ color: accent }}>Call {name}: {phone} →</a>
    </div>
  </div>
);

const AboutD = () => (
  <div className="bg-[#f8f6f1]">
    <SectionLabel>Option D — Two Studios Side-by-Side (location-forward)</SectionLabel>
    <div className="relative px-6 pt-4 pb-8 text-center overflow-hidden">
      <Bubble size={90} top="-10%" left="2%" opacity={0.1} />
      <span className="relative text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>About Car Saloon</span>
      <h1 style={fraunces} className="relative text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">Two studios, one standard of care</h1>
      <p className="relative text-[#6b7278] mt-3 max-w-xl mx-auto text-sm">Detailing with genuine attention since 2015.</p>
    </div>
    <div className="max-w-4xl mx-auto px-6 pb-14 flex flex-wrap gap-5">
      <StudioCard img={myaree} name="Myaree" address="4/41 McCoy Street, Myaree, 6154" phone="0451 288 164" tel="+61451288164" />
      <StudioCard img={midland} name="Midland" address="7 Loton Avenue, Midland, 6056" phone="0478 551 640" tel="+61478551640" />
    </div>
    <div className="max-w-2xl mx-auto px-6 pb-14 text-center">
      <Users className="w-6 h-6 mx-auto mb-3" style={{ color: accent }} />
      <p className="text-[#52585d] leading-loose text-[16px]">
        Wherever you visit us, you get the same approach: limited daily bookings, biodegradable products, and experienced professionals who never rush a job.
      </p>
    </div>
    <div className="max-w-3xl mx-auto px-6 pb-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
        <span className="text-sm text-[#6b7278] ml-2">4.9★ average across both studios</span>
      </div>
    </div>
    <CTA />
  </div>
);

const AboutMockups = () => {
  useGoogleFont();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="min-h-screen">
      <AboutA />
      <AboutB />
      <AboutC />
      <AboutD />
    </div>
  );
};

export default AboutMockups;
