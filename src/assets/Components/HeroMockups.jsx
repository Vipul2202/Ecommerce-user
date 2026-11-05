import React, { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, Star, ShieldCheck, MapPin, TrendingUp, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import heroMyaree from "../../img/myaree.jpeg";
import gtechniqLogo from "../../img/gtechniq-logo.svg";

const SectionLabel = ({ children }) => (
  <div className="max-w-6xl mx-auto px-6 pt-10 pb-3">
    <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ backgroundColor: navy, color: "white" }}>
      {children}
    </span>
  </div>
);

// ---- Reusable interactive hooks ----

// Mouse position relative to a container, normalized -1..1
function useMouseParallax(ref) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setPos({ x, y });
    },
    [ref]
  );
  const onLeave = useCallback(() => setPos({ x: 0, y: 0 }), []);
  return { pos, onMove, onLeave };
}

// Count up when scrolled into view
function useCountUp(target, duration = 1200) {
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

// Scroll-reveal (fade + slide up when entering viewport)
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// Typewriter effect — types out text, blinking cursor via CSS
function useTypewriter(text, speedMs = 45) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    setTyped("");
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speedMs);
    return () => clearInterval(t);
  }, [text, speedMs]);
  return typed;
}

const SPOTLIGHT_SERVICES = [
  { label: "Antibacterial Aircon Treatment", price: "From $99" },
  { label: "GTechniq Ceramic Coating", price: "From $499" },
  { label: "Window Tinting", price: "From $99" },
];

const STATS = [
  { label: "Cars Detailed", value: 12000, suffix: "+" },
  { label: "Years Experience", value: 10, suffix: "+" },
  { label: "Google Rating", value: 4.9, suffix: "★", decimal: true },
  { label: "Studios in Perth", value: 2, suffix: "" },
];

// ---------- A: Mouse-parallax layered hero with tilting photo card ----------
const HeroA = () => {
  const containerRef = useRef(null);
  const { pos, onMove, onLeave } = useMouseParallax(containerRef);
  const [spotIndex, setSpotIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSpotIndex((i) => (i + 1) % SPOTLIGHT_SERVICES.length), 2800);
    return () => clearInterval(t);
  }, []);
  const spot = SPOTLIGHT_SERVICES[spotIndex];

  return (
    <div className="bg-[#f8f6f1]">
      <SectionLabel>Option A — Mouse-parallax depth layers + tilting photo + rotating spotlight</SectionLabel>
      <section
        ref={containerRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative max-w-6xl mx-auto px-6 pb-16 pt-6 flex flex-wrap gap-12 items-center"
        style={{ perspective: "1200px" }}
      >
        {/* Background parallax blobs — clipped to their own layer so they don't cut off floating badges */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
          <div
            className="absolute w-72 h-72 rounded-full transition-transform duration-200 ease-out"
            style={{ backgroundColor: accent, opacity: 0.12, top: "-10%", left: "-6%", transform: `translate(${pos.x * -24}px, ${pos.y * -24}px)` }}
          />
          <div
            className="absolute w-56 h-56 rounded-full transition-transform duration-200 ease-out"
            style={{ backgroundColor: navy, opacity: 0.08, bottom: "-6%", right: "10%", transform: `translate(${pos.x * 18}px, ${pos.y * 18}px)` }}
          />
        </div>

        <div
          className="flex-1 min-w-[320px] flex flex-col gap-5 relative transition-transform duration-200 ease-out"
          style={{ transform: `translate(${pos.x * -6}px, ${pos.y * -4}px)` }}
        >
          <span
            className="inline-flex items-center gap-1.5 self-start text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{ backgroundColor: "#fde8e8", color: "#c23b3b" }}
          >
            <Sparkles className="w-3.5 h-3.5" /> Perth's Premium Car Detailing Studio
          </span>
          <h1 style={fraunces} className="text-[2.6rem] sm:text-6xl leading-[1.05] font-semibold text-[#13242c]">
            Where your car gets the <span className="italic" style={{ color: accent }}>saloon</span> treatment.
          </h1>
          <p className="text-[#4a5056] max-w-md text-lg">High-end detailing, ceramic coating, tinting and paint correction.</p>
          <div className="flex gap-3 flex-wrap pt-1">
            <button className="px-7 py-3.5 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform" style={{ backgroundColor: navy }}>Book a Service →</button>
            <button className="px-7 py-3.5 rounded-full font-semibold border-2 hover:scale-105 transition-transform" style={{ borderColor: navy, color: navy }}>Explore Services</button>
          </div>
        </div>

        <div
          className="flex-1 min-w-[320px] relative transition-transform duration-150 ease-out"
          style={{
            transform: `perspective(1200px) rotateY(${pos.x * 8}deg) rotateX(${pos.y * -8}deg) translateZ(0)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl" style={{ backgroundColor: accent, opacity: 0.15 }}></div>
          <img src={heroMyaree} alt="storefront" className="relative w-full rounded-3xl shadow-2xl object-cover h-[380px]" />

          {/* Rotating featured-service spotlight, floats above the card (parallax) */}
          <div
            className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-4 w-64 border transition-transform duration-200"
            style={{ borderColor: border, transform: `translateZ(40px) translate(${pos.x * 10}px, ${pos.y * 10}px)` }}
          >
            <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: accent }}>Featured This Month</div>
            <div key={spot.label} style={fraunces} className="text-base font-semibold text-[#13242c] mb-1 animate-[fadeIn_0.4s_ease]">{spot.label}</div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold" style={{ color: navy }}>{spot.price}</span>
              <button className="text-xs font-semibold px-3 py-1.5 rounded-full text-white hover:scale-105 transition-transform" style={{ backgroundColor: accent }}>Book →</button>
            </div>
            <div className="flex gap-1 mt-2">
              {SPOTLIGHT_SERVICES.map((s, i) => (
                <span key={s.label} className="h-1 rounded-full flex-1 transition-colors" style={{ backgroundColor: i === spotIndex ? accent : border }} />
              ))}
            </div>
          </div>

          <div
            className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-2.5 transition-transform duration-200"
            style={{ transform: `translateZ(30px) translate(${pos.x * 14}px, ${pos.y * 14}px)` }}
          >
            <img src={gtechniqLogo} alt="GTechniq" className="h-9 w-auto" />
            <span className="text-sm font-bold" style={{ color: navy }}>Certified</span>
          </div>
        </div>
      </section>
    </div>
  );
};

// ---------- B: Scroll-parallax full-bleed photo + reveal animations + animated stats ----------
const HeroB = () => {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // relative scroll progress through the section
      setOffset(rect.top * 0.25);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [textRef, textVisible] = useReveal();

  return (
    <div className="bg-[#f8f6f1]">
      <SectionLabel>Option B — Scroll parallax background + reveal-on-scroll + animated stat counters</SectionLabel>
      <section ref={sectionRef} className="relative w-full h-[560px] overflow-hidden">
        <img
          src={heroMyaree}
          alt="storefront"
          className="absolute w-full object-cover"
          style={{ height: "130%", top: "-15%", transform: `translateY(${offset}px)` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(10,36,44,0.92) 32%, rgba(10,36,44,0.45) 65%, rgba(10,36,44,0.15) 100%)" }}></div>

        <div className="absolute top-6 left-0 pl-6 pr-5 py-2 rounded-r-full shadow-lg flex items-center gap-2" style={{ backgroundColor: accent }}>
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-xs font-bold uppercase tracking-wide text-white">Featured: Antibacterial Aircon Treatment · From $99</span>
        </div>
        <div className="absolute top-6 right-6 bg-white rounded-xl shadow-xl px-3 py-2 flex items-center gap-2">
          <img src={gtechniqLogo} alt="GTechniq" className="h-5 w-auto" />
          <span className="text-xs font-bold" style={{ color: navy }}>Certified</span>
        </div>

        <div
          ref={textRef}
          className="relative z-10 h-full flex flex-col justify-center max-w-6xl mx-auto px-6 transition-all duration-700 ease-out"
          style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? "translateY(0)" : "translateY(24px)" }}
        >
          <h1 style={fraunces} className="text-5xl sm:text-6xl font-semibold text-white leading-[1.05] max-w-xl">
            Where your car gets the <span className="italic" style={{ color: "#5fd0ff" }}>saloon</span> treatment.
          </h1>
          <p className="text-white/85 max-w-md text-lg mt-4">High-end detailing, ceramic coating, tinting and paint correction.</p>
          <div className="flex gap-3 flex-wrap pt-6">
            <button className="px-7 py-3.5 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform" style={{ backgroundColor: accent }}>Book a Service →</button>
            <button className="px-7 py-3.5 rounded-full font-semibold border-2 border-white text-white hover:scale-105 transition-transform">Explore Services</button>
          </div>
        </div>
      </section>

      {/* animated stat counters */}
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s) => (
          <StatCounter key={s.label} stat={s} />
        ))}
      </div>
    </div>
  );
};

const StatCounter = ({ stat }) => {
  const [ref, value] = useCountUp(stat.decimal ? stat.value * 10 : stat.value);
  const display = stat.decimal ? (value / 10).toFixed(1) : value;
  return (
    <div ref={ref} className="text-center">
      <div style={{ ...fraunces, color: navy }} className="text-3xl font-bold">{display}{stat.suffix}</div>
      <div className="text-xs font-semibold text-[#6b7278] mt-1 uppercase tracking-wide">{stat.label}</div>
    </div>
  );
};

// ---------- C: Auto-rotating spotlight + infinite marquee trust bar + tilt photo ----------
const HeroC = () => {
  const containerRef = useRef(null);
  const { pos, onMove, onLeave } = useMouseParallax(containerRef);
  const [spotIndex, setSpotIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSpotIndex((i) => (i + 1) % SPOTLIGHT_SERVICES.length), 2600);
    return () => clearInterval(t);
  }, []);
  const spot = SPOTLIGHT_SERVICES[spotIndex];

  return (
    <div className="bg-[#f8f6f1] overflow-hidden">
      <SectionLabel>Option C — Auto-rotating spotlight + infinite marquee trust bar + tilt photo</SectionLabel>
      <section
        ref={containerRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative max-w-6xl mx-auto px-6 pt-6 pb-10 flex flex-wrap gap-12 items-center"
      >
        <div className="flex-1 min-w-[320px] flex flex-col gap-5">
          <h1 style={fraunces} className="text-[2.6rem] sm:text-6xl leading-[1.05] font-semibold text-[#13242c]">
            Where your car gets the <span className="italic" style={{ color: accent }}>saloon</span> treatment.
          </h1>
          <p className="text-[#4a5056] max-w-md text-lg">High-end detailing, ceramic coating, tinting and paint correction.</p>
          <div className="flex gap-3 flex-wrap pt-1">
            <button className="px-7 py-3.5 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform" style={{ backgroundColor: navy }}>Book a Service →</button>
            <button className="px-7 py-3.5 rounded-full font-semibold border-2 hover:scale-105 transition-transform" style={{ borderColor: navy, color: navy }}>Explore Services</button>
          </div>
        </div>

        <div
          className="flex-1 min-w-[320px] relative transition-transform duration-150 ease-out"
          style={{ transform: `perspective(1200px) rotateY(${pos.x * 7}deg) rotateX(${pos.y * -7}deg)` }}
        >
          <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl" style={{ backgroundColor: accent, opacity: 0.15 }}></div>
          <img src={heroMyaree} alt="storefront" className="relative w-full rounded-3xl shadow-2xl object-cover h-[380px]" />
          <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-4 w-64 border" style={{ borderColor: border }}>
            <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: accent }}>Featured This Month</div>
            <div key={spot.label} style={fraunces} className="text-base font-semibold text-[#13242c] mb-1">{spot.label}</div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold" style={{ color: navy }}>{spot.price}</span>
              <button className="text-xs font-semibold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: accent }}>Book →</button>
            </div>
          </div>
        </div>
      </section>

      {/* infinite marquee trust bar */}
      <div className="border-y py-3" style={{ borderColor: border, backgroundColor: navy }}>
        <div className="flex gap-12 animate-[marqueeScroll_18s_linear_infinite] whitespace-nowrap w-max">
          {[...Array(2)].map((_, rep) => (
            <React.Fragment key={rep}>
              <span className="flex items-center gap-2 text-white text-sm font-semibold">
                <img src={gtechniqLogo} alt="GTechniq" className="h-5 w-auto bg-white rounded px-1.5 py-0.5" /> GTechniq Certified Applicator
              </span>
              <span className="flex items-center gap-2 text-white text-sm font-semibold"><ShieldCheck className="w-4 h-4" style={{ color: accent }} /> 10+ Years Experience</span>
              <span className="flex items-center gap-2 text-white text-sm font-semibold"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.9★ Google Rating</span>
              <span className="flex items-center gap-2 text-white text-sm font-semibold"><MapPin className="w-4 h-4" style={{ color: accent }} /> 2 Studios Across Perth</span>
              <span className="flex items-center gap-2 text-white text-sm font-semibold"><TrendingUp className="w-4 h-4" style={{ color: accent }} /> 12,000+ Cars Detailed</span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

// ---------- D: Bento grid, hover-interactive tiles, mouse-tilt photo, live counter ----------
const HeroD = () => {
  const photoRef = useRef(null);
  const { pos, onMove, onLeave } = useMouseParallax(photoRef);
  const [countRef, countValue] = useCountUp(12000, 1500);

  return (
    <div className="bg-[#f8f6f1]">
      <SectionLabel>Option D — Bento grid with hover-lift tiles, tilt photo, live counter</SectionLabel>
      <section className="max-w-6xl mx-auto px-6 pt-6 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:h-[460px]">
          <div
            ref={photoRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden shadow-xl transition-transform duration-150 ease-out hover:shadow-2xl"
            style={{ transform: `perspective(1200px) rotateY(${pos.x * 6}deg) rotateX(${pos.y * -6}deg)` }}
          >
            <img src={heroMyaree} alt="storefront" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,36,44,0.8) 0%, rgba(10,36,44,0) 45%)" }}></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h1 style={fraunces} className="text-3xl sm:text-4xl font-semibold text-white leading-tight">
                Where your car gets the <span className="italic" style={{ color: "#5fd0ff" }}>saloon</span> treatment.
              </h1>
              <button className="mt-4 px-6 py-3 rounded-full font-semibold text-white text-sm shadow-lg hover:scale-105 transition-transform" style={{ backgroundColor: accent }}>Book a Service →</button>
            </div>
          </div>

          <div className="rounded-3xl shadow-xl p-5 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl cursor-pointer" style={{ backgroundColor: navy }}>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1 text-white/70">Featured</div>
              <div style={fraunces} className="text-lg font-semibold text-white leading-snug">Antibacterial Aircon Treatment</div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-bold text-white">From $99</span>
              <button className="text-xs font-semibold px-3 py-1.5 rounded-full text-white hover:scale-105 transition-transform" style={{ backgroundColor: accent }}>Book →</button>
            </div>
          </div>

          <div className="rounded-3xl shadow-xl p-5 flex flex-col items-center justify-center text-center gap-2 bg-white border transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl cursor-pointer" style={{ borderColor: border }}>
            <img src={gtechniqLogo} alt="GTechniq" className="h-7 w-auto" />
            <div className="text-xs font-bold" style={{ color: navy }}>GTechniq Certified<br />Ceramic Coating Applicator</div>
          </div>
        </div>

        {/* live counter strip */}
        <div ref={countRef} className="mt-4 rounded-2xl shadow-lg p-5 flex items-center justify-center gap-3" style={{ backgroundColor: accent }}>
          <TrendingUp className="w-6 h-6 text-white" />
          <span style={fraunces} className="text-2xl font-bold text-white">{countValue.toLocaleString()}+</span>
          <span className="text-sm font-semibold text-white/90 uppercase tracking-wide">Cars Detailed Across Perth</span>
        </div>
      </section>
    </div>
  );
};

// ---------- E: Glassmorphism, morphing gradient blobs, typewriter headline ----------
const HeroE = () => {
  const typed = useTypewriter("Where your car gets the saloon treatment.", 35);
  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: "#0f2730" }}>
      <SectionLabel>Option E — Glassmorphism + morphing gradient blobs + typewriter headline</SectionLabel>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[420px] h-[420px] rounded-full blur-3xl animate-[blobMorph1_10s_ease-in-out_infinite]" style={{ backgroundColor: accent, opacity: 0.35, top: "-10%", left: "5%" }} />
        <div className="absolute w-[360px] h-[360px] rounded-full blur-3xl animate-[blobMorph2_12s_ease-in-out_infinite]" style={{ backgroundColor: "#5fd0ff", opacity: 0.25, bottom: "-10%", right: "8%" }} />
      </div>
      <section className="relative max-w-6xl mx-auto px-6 pb-16 pt-6 flex flex-wrap gap-12 items-center">
        <div className="flex-1 min-w-[320px] flex flex-col gap-5">
          <span className="inline-flex items-center gap-1.5 self-start text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full backdrop-blur-md" style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}>
            <Sparkles className="w-3.5 h-3.5" /> Perth's Premium Car Detailing Studio
          </span>
          <h1 style={fraunces} className="text-[2.6rem] sm:text-6xl leading-[1.05] font-semibold text-white min-h-[1.1em] sm:min-h-[2.2em]">
            {typed}
            <span className="inline-block w-[3px] h-[0.9em] ml-1 align-middle animate-[blink_0.9s_steps(1)_infinite]" style={{ backgroundColor: "#5fd0ff" }} />
          </h1>
          <p className="text-white/70 max-w-md text-lg">High-end detailing, ceramic coating, tinting and paint correction.</p>
          <div className="flex gap-3 flex-wrap pt-1">
            <button className="px-7 py-3.5 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform" style={{ backgroundColor: accent }}>Book a Service →</button>
            <button className="px-7 py-3.5 rounded-full font-semibold border backdrop-blur-md hover:scale-105 transition-transform text-white" style={{ borderColor: "rgba(255,255,255,0.4)" }}>Explore Services</button>
          </div>
        </div>

        <div className="flex-1 min-w-[320px] relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl p-1.5" style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)" }}>
            <img src={heroMyaree} alt="storefront" className="w-full rounded-2xl object-cover h-[360px]" />
          </div>
          <div className="absolute -bottom-7 -left-7 rounded-2xl shadow-2xl p-4 w-64 backdrop-blur-xl" style={{ backgroundColor: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.3)" }}>
            <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#5fd0ff" }}>Featured This Month</div>
            <div style={fraunces} className="text-base font-semibold text-white mb-1">Antibacterial Aircon Treatment</div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">From $99</span>
              <button className="text-xs font-semibold px-3 py-1.5 rounded-full text-white hover:scale-105 transition-transform" style={{ backgroundColor: accent }}>Book →</button>
            </div>
          </div>
          <div className="absolute -top-5 -right-5 rounded-2xl shadow-xl p-3 flex items-center gap-2 backdrop-blur-xl" style={{ backgroundColor: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.3)" }}>
            <img src={gtechniqLogo} alt="GTechniq" className="h-6 w-auto" />
            <span className="text-[11px] font-bold text-white">Certified</span>
          </div>
        </div>
      </section>
      <style>{`
        @keyframes blobMorph1 { 0%,100% { transform: translate(0,0) scale(1); border-radius: 50%; } 50% { transform: translate(30px,20px) scale(1.15); border-radius: 42% 58% 60% 40%; } }
        @keyframes blobMorph2 { 0%,100% { transform: translate(0,0) scale(1); border-radius: 50%; } 50% { transform: translate(-24px,-18px) scale(1.1); border-radius: 58% 42% 40% 60%; } }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
};

// ---------- F: Diagonal split, 3D flip GTechniq badge, swipeable spotlight ----------
const HeroF = () => {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setFlipped((f) => !f), 2600);
    return () => clearInterval(t);
  }, []);
  const [spotIndex, setSpotIndex] = useState(0);
  const dragStartX = useRef(null);
  const next = () => setSpotIndex((i) => (i + 1) % SPOTLIGHT_SERVICES.length);
  const prev = () => setSpotIndex((i) => (i - 1 + SPOTLIGHT_SERVICES.length) % SPOTLIGHT_SERVICES.length);
  const onPointerDown = (e) => { dragStartX.current = e.clientX; };
  const onPointerUp = (e) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    if (dx > 40) prev();
    else if (dx < -40) next();
    dragStartX.current = null;
  };
  const spot = SPOTLIGHT_SERVICES[spotIndex];

  return (
    <div className="bg-[#f8f6f1]">
      <SectionLabel>Option F — Diagonal split layout + 3D flip GTechniq card + drag-to-swipe spotlight</SectionLabel>
      <section className="relative max-w-6xl mx-auto overflow-hidden rounded-3xl shadow-xl mx-6" style={{ height: 460 }}>
        <div className="absolute inset-0 flex">
          <div
            className="relative flex flex-col justify-center gap-5 px-8 sm:px-12"
            style={{ backgroundColor: navy, width: "58%", clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)" }}
          >
            <h1 style={fraunces} className="text-3xl sm:text-5xl leading-[1.08] font-semibold text-white max-w-sm">
              Where your car gets the <span className="italic" style={{ color: "#5fd0ff" }}>saloon</span> treatment.
            </h1>
            <p className="text-white/75 max-w-xs">High-end detailing, ceramic coating, tinting and paint correction.</p>
            <div className="flex gap-3 flex-wrap">
              <button className="px-6 py-3 rounded-full font-semibold text-white text-sm shadow-lg hover:scale-105 transition-transform" style={{ backgroundColor: accent }}>Book a Service →</button>
            </div>
          </div>
          <div className="relative flex-1">
            <img src={heroMyaree} alt="storefront" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>

        {/* 3D flip GTechniq badge */}
        <div className="absolute top-6 right-6" style={{ perspective: "800px" }}>
          <div
            className="relative w-32 h-20 transition-transform duration-700"
            style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            <div className="absolute inset-0 bg-white rounded-xl shadow-xl flex flex-col items-center justify-center gap-1" style={{ backfaceVisibility: "hidden" }}>
              <img src={gtechniqLogo} alt="GTechniq" className="h-5 w-auto" />
              <span className="text-[9px] font-bold" style={{ color: navy }}>Certified</span>
            </div>
            <div
              className="absolute inset-0 rounded-xl shadow-xl flex items-center justify-center text-center px-2"
              style={{ backgroundColor: accent, backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <span className="text-[10px] font-bold text-white leading-tight">Professional Applicator</span>
            </div>
          </div>
        </div>

        {/* draggable/swipeable spotlight card */}
        <div
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          className="absolute bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-4 w-64 cursor-grab active:cursor-grabbing select-none"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>Featured</span>
            <div className="flex gap-1">
              <button onClick={prev} className="p-1 rounded-full hover:bg-black/5"><ChevronLeft className="w-3.5 h-3.5" /></button>
              <button onClick={next} className="p-1 rounded-full hover:bg-black/5"><ChevronRight className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <div style={fraunces} className="text-base font-semibold text-[#13242c] mb-1">{spot.label}</div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold" style={{ color: navy }}>{spot.price}</span>
            <button className="text-xs font-semibold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: accent }}>Book →</button>
          </div>
          <div className="text-[10px] text-[#8a8f94] mt-2 text-center">← drag to browse →</div>
        </div>
      </section>
    </div>
  );
};

// ---------- G: HUD dashboard — orbiting badge, scroll zoom photo, animated progress stat ----------
const HeroG = () => {
  const sectionRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      setZoom(1 + progress * 0.12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [barRef, barVisible] = useReveal();

  return (
    <div className="bg-[#f8f6f1]">
      <SectionLabel>Option G — Orbiting GTechniq badge + scroll-zoom photo + animated satisfaction bar</SectionLabel>
      <section ref={sectionRef} className="relative max-w-6xl mx-auto px-6 pt-6 pb-10 flex flex-wrap gap-12 items-center">
        <div className="flex-1 min-w-[320px] flex flex-col gap-5">
          <h1 style={fraunces} className="text-[2.6rem] sm:text-6xl leading-[1.05] font-semibold text-[#13242c]">
            Where your car gets the <span className="italic" style={{ color: accent }}>saloon</span> treatment.
          </h1>
          <p className="text-[#4a5056] max-w-md text-lg">High-end detailing, ceramic coating, tinting and paint correction.</p>
          <div className="flex gap-3 flex-wrap pt-1">
            <button className="px-7 py-3.5 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform" style={{ backgroundColor: navy }}>Book a Service →</button>
            <button className="px-7 py-3.5 rounded-full font-semibold border-2 hover:scale-105 transition-transform" style={{ borderColor: navy, color: navy }}>Explore Services</button>
          </div>

          {/* animated satisfaction bar */}
          <div ref={barRef} className="pt-4 max-w-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-[#4a5056] mb-1">
              <span>Customer Satisfaction</span>
              <span>{barVisible ? "99%" : "0%"}</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: border }}>
              <div className="h-full rounded-full transition-all duration-[1400ms] ease-out" style={{ backgroundColor: accent, width: barVisible ? "99%" : "0%" }} />
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-[320px] relative flex items-center justify-center" style={{ minHeight: 420 }}>
          <div className="relative w-full rounded-3xl shadow-2xl overflow-hidden" style={{ height: 380 }}>
            <img src={heroMyaree} alt="storefront" className="w-full h-full object-cover transition-transform duration-200 ease-out" style={{ transform: `scale(${zoom})` }} />
          </div>
          {/* orbiting GTechniq badge */}
          <div className="absolute inset-0 pointer-events-none animate-[orbitSpin_14s_linear_infinite]" style={{ transformOrigin: "50% 50%" }}>
            <div className="absolute bg-white rounded-full shadow-xl p-2.5 pointer-events-auto animate-[orbitCounterSpin_14s_linear_infinite]" style={{ top: "-14px", left: "calc(50% - 24px)" }}>
              <img src={gtechniqLogo} alt="GTechniq" className="h-5 w-auto" />
            </div>
          </div>
          <div className="absolute -bottom-4 right-4 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2">
            <Award className="w-4 h-4" style={{ color: accent }} />
            <span className="text-xs font-bold" style={{ color: navy }}>GTechniq Certified Applicator</span>
          </div>
        </div>
      </section>
      <style>{`
        @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbitCounterSpin { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  );
};

const HeroMockups = () => {
  useGoogleFont();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="min-h-screen">
      <HeroA />
      <HeroB />
      <HeroC />
      <HeroD />
      <HeroE />
      <HeroF />
      <HeroG />
    </div>
  );
};

export default HeroMockups;
