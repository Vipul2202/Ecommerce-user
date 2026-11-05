import React from "react";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import about from "../../img/about.jpg";
import Bubble from "./Bubble";

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

const approach = [
  { title: "Limited daily bookings", text: "We take on only a few vehicles each day so every car gets our full focus." },
  { title: "Quality products", text: "We use only trusted, professional-grade products." },
  { title: "Experienced professionals", text: "Your car is in skilled, careful hands." },
  { title: "No rushed jobs", text: "We take the time to do it right, every time." },
];

const AboutV2 = () => {
  useGoogleFont();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="relative px-6 pt-14 pb-6 text-center overflow-hidden">
          <Bubble size={100} top="-15%" left="-4%" opacity={0.1} />
          <Bubble size={60} top="30%" right="6%" opacity={0.1} />
          <span className="relative text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>About Car Saloon</span>
          <h1 style={fraunces} className="relative text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">Detailing with attention and care since 2015</h1>
          <p className="relative text-[#6b7278] mt-3 max-w-xl mx-auto text-sm">Two decades of passion for cars, one vehicle at a time.</p>
        </div>

        <div className="max-w-5xl mx-auto px-6 pb-16 flex flex-wrap gap-12 items-center">
          <div className="flex-1 min-w-[300px]">
            <img src={about} alt="Car Saloon" draggable="false" className="w-full rounded-2xl" />
          </div>
          <div className="flex-1 min-w-[300px]">
            <p className="text-[#52585d] leading-loose text-[17px]">
              We are a specialized facility that provides professional cleaning and detailing services for vehicles. We offer a range of services, from basic exterior washes to full interior and exterior detailing. At Car Saloon, we use automated systems, high-pressure water jets, eco-friendly cleaning solutions, and manual handwashing techniques to ensure a thorough and gentle cleaning process.
            </p>
          </div>
        </div>

        {/* TIMELINE */}
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

        {/* OUR APPROACH */}
        <div className="max-w-5xl mx-auto px-6 pb-16">
          <h3 style={fraunces} className="text-2xl font-semibold text-[#13242c] mb-6">Our Approach</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {approach.map((a) => (
              <div
                key={a.title}
                className="bg-white rounded-2xl p-5"
                style={{ borderTop: `3px solid ${accent}`, borderLeft: `1px solid ${border}`, borderRight: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}
              >
                <h4 className="text-sm font-bold text-[#13242c] mb-2">{a.title}</h4>
                <p className="text-sm text-[#6b7278] leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto px-6 pb-20">
          <div className="rounded-2xl text-center p-10" style={{ backgroundColor: navy }}>
            <h3 style={{ ...fraunces, color: "white" }} className="text-2xl font-semibold mb-2">Book your detail today</h3>
            <p className="text-white/75 mb-6">See the difference that care makes. Visit us in Midland or Myaree.</p>
            <div className="flex gap-3 flex-wrap justify-center">
              <a href="tel:0478551640" className="px-6 py-3 rounded-full font-semibold text-sm text-white" style={{ backgroundColor: accent }}>
                Call Midland: 0478 551 640
              </a>
              <a href="tel:0451288164" className="px-6 py-3 rounded-full font-semibold text-sm text-white" style={{ border: "1px solid rgba(255,255,255,0.4)" }}>
                Call Myaree: 0451 288 164
              </a>
              <a href="mailto:info@carsaloon.com.au" className="px-6 py-3 rounded-full font-semibold text-sm text-white" style={{ border: "1px solid rgba(255,255,255,0.4)" }}>
                info@carsaloon.com.au
              </a>
            </div>
          </div>
        </div>
      </main>
      <RedesignFooter />
    </div>
  );
};

export default AboutV2;
