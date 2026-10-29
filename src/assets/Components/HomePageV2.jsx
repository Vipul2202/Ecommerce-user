import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Car,
  Droplets,
  Shield,
  Sparkles,
  Home as HomeIcon,
  Settings,
  Wrench,
  Plus,
  Check,
} from "lucide-react";

import heroMyaree from "../../img/myaree.jpeg";
import about from "../../img/about.jpg";
import ceramicImg from "../../img/team1.jpeg";
import interiorPackImg from "../../img/team2.jpg";
import tintingImg from "../../img/team3.jpg";
import paintlessDentImg from "../../img/paintless_dent_repair.png";
import myareeImg from "../../img/myaree.jpeg";

// Loads the design's two fonts only while this preview page is mounted —
// doesn't touch index.html, so the rest of the site is completely
// unaffected by this page existing.
const useGoogleFont = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);
};

const services = [
  { icon: Car, title: "Outside Only", desc: "Exterior wash and rinse", link: "/outside" },
  { icon: Droplets, title: "Inside & Out", desc: "Complete interior and exterior cleaning", link: "/inside_outside" },
  { icon: Shield, title: "Premium Wash", desc: "Premium exterior treatment", link: "/premium_wash" },
  { icon: Settings, title: "Full Detail", desc: "Best for regular care", link: "/full_detail" },
  { icon: Sparkles, title: "Signature Detail", desc: "Restoration-focused detailing", link: "/signature_detail" },
  { icon: HomeIcon, title: "The Works", desc: "Best for offroad and pre-sale", link: "/the_works" },
  { icon: Wrench, title: "Ultra Premium Finishes", desc: "Luxury finishing touches", link: "/ultrapremium" },
  { icon: Plus, title: "Extras", desc: "Additional services", link: "/extras" },
];

const washTiers = [
  { name: "Outside Only", sedan: 35, suv: 45, fourWd: 55, features: ["Wash & chamois dry", "Exterior windows clean", "Wheels clean & tyres gloss", "Spray-on wax"] },
  { name: "Inside & Outside", sedan: 55, suv: 65, fourWd: 75, features: ["Everything in Outside Only", "Interior wiped & dusted", "Interior & boot vacuumed", "Windows clean inside & out"] },
  { name: "Premium Wash", sedan: 95, suv: 105, fourWd: 115, features: ["Everything in Inside & Outside", "Dash & console detailed", "External plastic trims rejuvenation", "Hand wax & polish"] },
];

const detailTiers = [
  { name: "Full Detail", tagline: "Best for Regular Care", sedan: 175, suv: 195, fourWd: 225, highlight: false, features: ["Outside wash & wax", "Interior trims detailed", "Fabric & carpet steam clean", "Leather seats clean & condition"] },
  { name: "Signature Detail", tagline: "Best for Restoration", sedan: 275, suv: 295, fourWd: 325, highlight: true, features: ["Everything in Full Detail", "Head light restoration", "Engine bay degrease", "Hand polish"] },
  { name: "The Works", tagline: "Best for Offroad & Pre-Sale", sedan: 349, suv: 399, fourWd: 449, highlight: false, features: ["Everything in Signature Detail", "Buff & polish", "Underbody clean (using ramp)"] },
];

const premium = [
  { title: "Ceramic Coating", price: "From $499", img: ceramicImg, route: "/ultrapremium" },
  { title: "Interior Protection Pack", price: "From $299", img: interiorPackImg, route: "/ultrapremium" },
  { title: "Windows Tinting", price: "Price on request", img: tintingImg, route: "/ultrapremium" },
  { title: "Paintless Dent Removal", price: "From $199", img: paintlessDentImg, route: "/ultrapremium" },
];

const accent = "#0a7fa6";
const navy = "#0a3b4d";

const HomePageV2 = () => {
  useGoogleFont();
  const navigate = useNavigate();

  const fraunces = { fontFamily: "'Fraunces', serif" };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-40 bg-[#f8f6f1]/90 backdrop-blur border-b border-[#e7e2d8]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div style={fraunces} className="text-xl font-semibold">Car Saloon</div>
          <nav className="hidden md:flex gap-7 text-sm font-medium text-[#4a5056]">
            <a href="#services" className="hover:text-[#0a3b4d]">Services</a>
            <a href="#pricing" className="hover:text-[#0a3b4d]">Pricing</a>
            <a href="#premium" className="hover:text-[#0a3b4d]">Premium</a>
            <a href="#locations" className="hover:text-[#0a3b4d]">Locations</a>
          </nav>
          <button
            onClick={() => navigate("/booking")}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: navy }}
          >
            Book Now
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 flex flex-wrap gap-12 items-center">
        <div className="flex-1 min-w-[320px] flex flex-col gap-5">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>
            Perth's Detailing Studio
          </span>
          <h1 style={fraunces} className="text-[2.4rem] sm:text-5xl leading-[1.08] font-semibold text-[#13242c]">
            Where your car gets the <em className="not-italic" style={{ color: accent }}>saloon</em> treatment.
          </h1>
          <p className="text-[17px] leading-relaxed text-[#52585d] max-w-md">
            High-end detailing, ceramic coating, tinting and paint correction — for the enthusiast, the dealer, and everyone who just loves their car.
          </p>
          <div className="flex gap-3 flex-wrap pt-1">
            <button
              onClick={() => navigate("/booking")}
              className="px-6 py-3 rounded-full font-semibold text-white"
              style={{ backgroundColor: navy }}
            >
              Book a Service
            </button>
            <a
              href="#services"
              className="px-6 py-3 rounded-full font-semibold border"
              style={{ borderColor: navy, color: navy }}
            >
              Explore Services
            </a>
          </div>
          <div className="flex gap-4 pt-2 text-xs text-[#6b7278] flex-wrap">
            <span>GTechniq Accredited Applicator</span>
            <span>·</span>
            <span>Midland &amp; Myaree</span>
          </div>
        </div>
        <div className="flex-1 min-w-[320px]">
          <img
            src={heroMyaree}
            alt="Car Saloon Myaree storefront"
            draggable="false"
            className="w-full rounded-3xl shadow-2xl object-cover"
          />
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-14 items-center">
          <div className="flex-1 min-w-[320px]">
            <img src={about} alt="Car Saloon workshop" draggable="false" className="w-full rounded-2xl" />
          </div>
          <div className="flex-1 min-w-[320px] flex flex-col gap-4">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>About Us</span>
            <h2 style={fraunces} className="text-3xl font-semibold text-[#13242c]">For those who love their cars.</h2>
            <p className="text-[#52585d] leading-loose">
              Your car deserves more than a rinse — it deserves respect. We offer high-end detailing, ceramic coating, tinting and paint correction tailored for true enthusiasts. From underbody washes to full detailing, precision dent and paint repair revives your car's flawless finish — so you drive clean, confident and proud.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-11">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>What We Do</span>
            <h2 style={fraunces} className="text-3xl font-semibold text-[#13242c] mt-2">Premium Washing &amp; Detailing Services</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s) => (
              <a
                key={s.title}
                href={s.link}
                className="bg-white border border-[#e7e2d8] rounded-2xl p-6 flex flex-col gap-3 items-start hover:shadow-md transition-shadow"
              >
                <s.icon className="w-6 h-6" style={{ color: accent }} />
                <div className="font-semibold text-[#13242c]">{s.title}</div>
                <div className="text-sm text-[#7a8188]">{s.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 py-20" style={{ backgroundColor: "#f1ece2" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Washing Services</span>
            <h2 style={fraunces} className="text-3xl font-semibold text-[#13242c] mt-2">Compare Your Plan</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {washTiers.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-[#e7e2d8] p-7 flex flex-col gap-4">
                <div className="font-bold text-lg text-[#13242c]">{t.name}</div>
                <div className="text-sm font-semibold" style={{ color: accent }}>
                  Sedan from ${t.sedan} · SUV from ${t.suv} · 4WD from ${t.fourWd}
                </div>
                <div className="flex flex-col gap-2">
                  {t.features.map((f) => (
                    <div key={f} className="flex gap-2 text-sm text-[#4a5056]">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Detailing Services</span>
            <h2 style={fraunces} className="text-3xl font-semibold text-[#13242c] mt-2">Compare Your Plan</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {detailTiers.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl border p-7 flex flex-col gap-4"
                style={{ borderColor: t.highlight ? accent : "#e7e2d8", borderWidth: t.highlight ? 2 : 1 }}
              >
                <div>
                  <div className="font-bold text-lg text-[#13242c]">{t.name}</div>
                  <div className="text-xs font-bold mt-0.5" style={{ color: accent }}>{t.tagline}</div>
                </div>
                <div className="text-sm font-semibold text-[#6b7278]">
                  Sedan from ${t.sedan} · SUV from ${t.suv} · 4WD from ${t.fourWd}
                </div>
                <div className="flex flex-col gap-2">
                  {t.features.map((f) => (
                    <div key={f} className="flex gap-2 text-sm text-[#4a5056]">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM */}
      <section id="premium" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-11">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Ultra Premium Finishes</span>
            <h2 style={fraunces} className="text-3xl font-semibold text-[#13242c] mt-2">Long-Lasting Services For Your Car</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {premium.map((p) => (
              <button
                key={p.title}
                onClick={() => navigate(p.route)}
                className="bg-white rounded-2xl border border-[#e7e2d8] overflow-hidden text-left flex flex-col"
              >
                <img src={p.img} alt={p.title} draggable="false" className="w-full h-44 object-cover" />
                <div className="p-4 flex flex-col gap-1">
                  <div className="font-semibold text-sm text-[#13242c]">{p.title}</div>
                  <div className="text-sm font-semibold" style={{ color: accent }}>{p.price}</div>
                </div>
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-[#8a8f94] mt-6">
            Ceramic Coating and Windows Tinting require an in-person inspection to confirm exact pricing.
          </p>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="locations" className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-[#e7e2d8] overflow-hidden">
            <img src={myareeImg} alt="Myaree" draggable="false" className="w-full h-56 object-cover" />
            <div className="p-6 flex flex-col gap-2">
              <div className="font-bold text-xl text-[#13242c]">Myaree</div>
              <button onClick={() => navigate("/booking")} className="text-sm font-semibold self-start" style={{ color: accent }}>
                Book at Myaree →
              </button>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#e7e2d8] overflow-hidden">
            <div className="w-full h-56 flex items-center justify-center" style={{ backgroundColor: navy }}>
              <span style={fraunces} className="text-white text-2xl">Midland</span>
            </div>
            <div className="p-6 flex flex-col gap-2">
              <div className="font-bold text-xl text-[#13242c]">Midland</div>
              <button onClick={() => navigate("/booking")} className="text-sm font-semibold self-start" style={{ color: accent }}>
                Book at Midland →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto rounded-3xl py-16 px-10 flex flex-col items-center text-center gap-4" style={{ backgroundColor: navy }}>
          <h2 style={fraunces} className="text-3xl sm:text-4xl font-semibold text-white">Ready for the Saloon Treatment?</h2>
          <p className="text-[#cfe3ea] max-w-md">Pick your service, pick your location, and we'll take care of the rest.</p>
          <button
            onClick={() => navigate("/booking")}
            className="mt-2 px-7 py-3 rounded-full font-semibold bg-white"
            style={{ color: navy }}
          >
            Book Now
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e7e2d8] px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-5 text-sm text-[#7a8188]">
          <div style={fraunces} className="text-lg text-[#13242c]">Car Saloon</div>
          <div>© Car Saloon — Midland &amp; Myaree, Perth WA</div>
          <div className="flex gap-5">
            <a href="/privacy">Privacy</a>
            <a href="/promotional-terms">Offer Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePageV2;
