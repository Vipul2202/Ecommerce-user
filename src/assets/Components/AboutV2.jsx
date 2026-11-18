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
    title: "Earning our place on the dealership floor",
    text: "In 2014 we moved to Perth for bigger and better opportunities, and Car Saloon was born a year later. We didn't open a storefront first — we earned contracts detailing for dealership groups like Audi, BMW, Ferrari and more. Every brand had its own standard, every client a different expectation, and no two cars came with the same brief. Getting it right, every time, was the job.",
  },
  {
    year: "2018",
    title: "Juggling sites, chasing consistency",
    text: "As more dealerships trusted us with their cars, we found ourselves running operations across multiple sites at once — different showrooms, different schedules, different pressures. Keeping the same standard of care no matter where the work happened became the real challenge, and it forced us to build processes we still rely on today.",
  },
  {
    year: "2021",
    title: "Growing a team, not just a workforce",
    text: "The hardest part was never the cars — it was the people. We put real time into training every technician to a standard worthy of the vehicles passing through our hands, turning a handful of detailers into a team capable of handling anything from a daily runabout to a six-figure exotic.",
  },
  {
    year: "2024",
    title: "First store opens in Midland",
    text: "After years of proving ourselves behind the scenes for dealerships, we opened our first permanent studio in Midland — the first time we got to serve everyday customers directly, face-to-face, with the same care we'd spent years perfecting.",
  },
  {
    year: "2026",
    title: "Second store opens in Myaree",
    text: "Demand grew, and we opened a second studio in Myaree — two dedicated homes for Car Saloon-level care across Perth.",
  },
];

const brandGroups = [
  {
    title: "Everyday Cars",
    text: "Daily drivers get the same hand-finished care as everything else that comes through our doors.",
    brands: ["Volkswagen", "Volvo", "Hyundai", "MG", "Mazda", "and more"],
  },
  {
    title: "Prestige & Exotic Cars",
    text: "Years on dealership floors across Perth earned us the trust of some of the most demanding brands and owners around.",
    brands: ["Range Rover", "Ferrari", "Lamborghini", "Maserati", "and more"],
  },
];

const approach = [
  { title: "Limited daily bookings", text: "We take on only a few vehicles each day so every car gets our full focus." },
  { title: "Quality products", text: "We use only trusted, biodegradable, professional-grade products." },
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
            <p className="text-[#52585d] leading-loose text-[17px] text-justify">
              We are a specialized facility that provides professional cleaning and detailing services for vehicles. We offer a range of services, from basic exterior washes to full interior and exterior detailing. At Car Saloon, we use automated systems, high-pressure water jets, biodegradable cleaning solutions, and manual handwashing techniques to ensure a thorough and gentle cleaning process.
            </p>
            <p className="text-[#52585d] leading-loose text-[17px] text-justify mt-4">
              We use biodegradable products across our wash and detailing services, so the care we put into your car doesn't come at the environment's expense.
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
                <p className="text-[#52585d] leading-relaxed text-[15px] text-justify">{t.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BRANDS WE'VE WORKED WITH */}
        <div className="max-w-5xl mx-auto px-6 pb-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Trusted By</span>
            <h3 style={fraunces} className="text-2xl sm:text-3xl font-semibold text-[#13242c] mt-2">From everyday drives to the exotics</h3>
            <p className="text-[#6b7278] mt-2 max-w-xl mx-auto text-sm">Years on dealership floors across every price point means we've handled it all — here's a taste of the brands that have trusted us.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {brandGroups.map((g) => (
              <div
                key={g.title}
                className="bg-white rounded-2xl p-6"
                style={{ borderTop: `3px solid ${accent}`, borderLeft: `1px solid ${border}`, borderRight: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}
              >
                <h4 style={fraunces} className="text-lg font-semibold text-[#13242c] mb-1">{g.title}</h4>
                <p className="text-sm text-[#6b7278] mb-4">{g.text}</p>
                <div className="flex flex-wrap gap-2">
                  {g.brands.map((b) => (
                    <span key={b} className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: "#f1ece2", color: navy }}>{b}</span>
                  ))}
                </div>
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
