import React, { useState, useEffect } from "react";
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
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import heroMyaree from "../../img/myaree.jpeg";
import heroMidland from "../../img/midland.jpeg";
import about from "../../img/about.jpg";
import ceramicImg from "../../img/team1.jpeg";
import interiorPackImg from "../../img/team2.jpg";
import tintingImg from "../../img/team3.jpg";
import paintlessDentImg from "../../img/paintless_dent_repair.png";
import myareeImg from "../../img/myaree.jpeg";
import midlandImg from "../../img/midland.jpeg";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, navy, fraunces } from "./redesignTheme";
import NovemberSpecialBannerV2 from "./NovemberSpecialBannerV2";
import { isNovemberSpecialActive } from "./promoSchedule";
import Bubble from "./Bubble";
import { useAllPrices } from "./PricingContext";

const services = [
  { icon: Car, title: "Outside Only", desc: "Exterior wash and rinse", link: "/new-outside" },
  { icon: Droplets, title: "Inside & Out", desc: "Complete interior and exterior cleaning", link: "/new-inside_outside" },
  { icon: Shield, title: "Premium Wash", desc: "Premium exterior treatment", link: "/new-premium_wash" },
  { icon: Settings, title: "Full Detail", desc: "Best for regular care", link: "/new-full_detail" },
  { icon: Sparkles, title: "Signature Detail", desc: "Restoration-focused detailing", link: "/new-signature_detail" },
  { icon: HomeIcon, title: "The Works", desc: "Best for offroad and pre-sale", link: "/new-the_works" },
  { icon: Wrench, title: "Ultra Premium Finishes", desc: "Luxury finishing touches", link: "/new-ultrapremium" },
  { icon: Plus, title: "Add on Enhancements", desc: "Additional services", link: "/new-extras" },
];

// Real customer reviews, copied verbatim from Car Saloon's Google Business
// pages (Myaree: 5.0 stars, 34 reviews · Midland: 4.9 stars, 47 reviews).
const testimonials = [
  {
    name: "John Duffy",
    location: "Myaree",
    quote: "Fantastic service. I got the protective paint coating when I first bought my new car. After getting a few scratches, I took it back to Car Saloon and they kindly buffed the finish back to almost original state - at no charge. Highly recommend this business. Friendly, efficient, thoroughly professional.",
  },
  {
    name: "Andrew Kirby",
    location: "Myaree",
    quote: "Very happy with Gary and his staff at Car Saloon. I had my new Mazda in for a 5 year ceramic coating and the car looks fantastic, the paint shines and is so smooth and comes with a warranty and follow up inspection. The price was also very reasonable.",
  },
  {
    name: "Suze H",
    location: "Myaree",
    quote: "Amazing quality and price! Will definitely be making Baljeet my regular detailer.",
  },
  {
    name: "Amanda Flaherty",
    location: "Midland",
    quote: "Great customer service. Polite, friendly and very well priced. Did an excellent job on the car! Will definitely be back.",
  },
  {
    name: "Brenda Reilly",
    location: "Midland",
    quote: "These guys were recommended to us as we had a chemical overspray on the bonnet of our Jeep. They did a fantastic job of removing all the residue, service was quick and inexpensive for the job done.",
  },
  {
    name: "Ben Chaos",
    location: "Midland",
    quote: "Very impressed. The seats steam cleaning made the seats new and feel so fresh, and the signature detail brought the whole car back to life. It feels like I've got a brand-new car again.",
  },
];

// Growing customer counter for the hero: starts at 500 and ticks up by 50
// every week — a deliberate marketing choice (confirmed with the business
// owner) since they only recently started actively collecting reviews,
// despite being in business since 2015.
const CUSTOMER_COUNT_BASE = 500;
const CUSTOMER_COUNT_WEEKLY_INCREMENT = 50;
const CUSTOMER_COUNT_START = new Date("2026-10-31T00:00:00+08:00");
const getCustomerCount = () => {
  const weeksElapsed = Math.max(0, Math.floor((Date.now() - CUSTOMER_COUNT_START.getTime()) / (7 * 24 * 60 * 60 * 1000)));
  return CUSTOMER_COUNT_BASE + weeksElapsed * CUSTOMER_COUNT_WEEKLY_INCREMENT;
};

const washTiers = [
  { name: "Outside Only", priceKey: "outside", route: "/new-outside", sedan: 35, suv: 45, fourWd: 55, features: ["Wash & chamois dry", "Exterior windows clean", "Wheels clean & tyres gloss", "Spray-on wax"] },
  { name: "Inside & Outside", priceKey: "inside_outside", route: "/new-inside_outside", sedan: 55, suv: 65, fourWd: 75, features: ["Everything in Outside Only", "Interior wiped & dusted", "Interior & boot vacuumed", "Windows clean inside & out"] },
  { name: "Premium Wash", priceKey: "premium_wash", route: "/new-premium_wash", sedan: 95, suv: 105, fourWd: 115, features: ["Everything in Inside & Outside", "Dash & console detailed", "External plastic trims rejuvenation", "Hand wax & polish"] },
];

const detailTiers = [
  { name: "Full Detail", priceKey: "full_detail", route: "/new-full_detail", tagline: "Best for Regular Care", sedan: 175, suv: 195, fourWd: 225, highlight: false, features: ["Outside wash & wax", "Interior trims detailed", "Fabric & carpet steam clean", "Leather seats clean & condition"] },
  { name: "Signature Detail", priceKey: "signature_detail", route: "/new-signature_detail", tagline: "Best for Restoration", sedan: 275, suv: 295, fourWd: 325, highlight: true, features: ["Everything in Full Detail", "Head light restoration", "Engine bay degrease", "Hand polish"] },
  { name: "The Works", priceKey: "the_works", route: "/new-the_works", tagline: "Best for Offroad & Pre-Sale", sedan: 349, suv: 399, fourWd: 449, highlight: false, features: ["Everything in Signature Detail", "Buff & polish", "Underbody clean (using ramp)"] },
];

const premium = [
  { title: "Ceramic Coating", key: "ceramic_coating", fallbackPrice: 499, fallbackQuoteOnly: true, img: ceramicImg, route: "/new-ultrapremium" },
  { title: "Interior Protection Pack", key: "interior_protection_pack", fallbackPrice: 299, fallbackQuoteOnly: false, img: interiorPackImg, route: "/new-ultrapremium" },
  { title: "Windows Tinting", key: "window_tinting", fallbackPrice: 499, fallbackQuoteOnly: false, img: tintingImg, route: "/new-ultrapremium" },
  { title: "Paintless Dent Removal", key: "paintless_dent_removal", fallbackPrice: 199, fallbackQuoteOnly: false, img: paintlessDentImg, route: "/new-ultrapremium" },
];

const HomePageV2 = () => {
  useGoogleFont();
  const navigate = useNavigate();
  const { pricesByKey } = useAllPrices();
  const [heroLocation, setHeroLocation] = useState("myaree");
  const heroMain = heroLocation === "myaree" ? heroMyaree : heroMidland;
  const heroBadgeImg = heroLocation === "myaree" ? heroMidland : heroMyaree;
  const heroBadgeLabel = heroLocation === "myaree" ? "Midland" : "Myaree";

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const goToTestimonial = (i) => setTestimonialIndex((i + testimonials.length) % testimonials.length);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen relative overflow-hidden">
      <RedesignNav />
      {isNovemberSpecialActive() && <NovemberSpecialBannerV2 />}

      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-10 flex flex-wrap gap-12 items-center overflow-hidden">
        <Bubble size={140} top="2%" left="-4%" opacity={0.12} />
        <Bubble size={90} top="55%" left="2%" opacity={0.1} />
        <Bubble size={60} top="30%" left="40%" opacity={0.08} />
        <Bubble size={180} top="-8%" right="-6%" opacity={0.1} />
        <Bubble size={110} top="40%" right="6%" opacity={0.12} />
        <Bubble size={70} top="75%" right="22%" opacity={0.1} />
        <div className="flex-1 min-w-[320px] flex flex-col gap-5">
          <span
            className="inline-flex items-center gap-1.5 self-start text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{ backgroundColor: "#fde8e8", color: "#c23b3b" }}
          >
            <Sparkles className="w-3.5 h-3.5" /> Perth's #1 Detailing Studio
          </span>
          <h1 style={fraunces} className="text-[2.6rem] sm:text-6xl leading-[1.05] font-semibold text-[#13242c]">
            Where your car gets the{" "}
            <span className="relative inline-block">
              <span className="relative z-10" style={{ color: accent }}>saloon</span>
              <span className="absolute left-0 right-0 bottom-1 h-3 -z-0" style={{ backgroundColor: "#fde8b8" }}></span>
            </span>{" "}
            treatment.
          </h1>
          <p className="text-[17px] leading-relaxed text-[#52585d] max-w-md">
            High-end detailing, ceramic coating, tinting and paint correction — for the enthusiast, the dealer, and everyone who just loves their car.
          </p>
          <div className="flex gap-3 flex-wrap pt-1">
            <button
              onClick={() => navigate("/new-booking")}
              className="px-7 py-3.5 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform"
              style={{ backgroundColor: navy }}
            >
              Book a Service →
            </button>
            <a
              href="#services"
              className="px-7 py-3.5 rounded-full font-semibold border-2"
              style={{ borderColor: navy, color: navy }}
            >
              Explore Services
            </a>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <div className="flex items-center gap-1 text-sm font-semibold">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1 text-[#4a5056]">5-star rated &middot; {getCustomerCount()}+ happy customers</span>
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-[320px] relative">
          <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl" style={{ backgroundColor: accent, opacity: 0.15 }}></div>
          <img
            src={heroMain}
            alt={`Car Saloon ${heroLocation === "myaree" ? "Myaree" : "Midland"} storefront`}
            draggable="false"
            className="relative w-full rounded-3xl shadow-2xl object-cover"
          />
          <button
            type="button"
            onClick={() => setHeroLocation((loc) => (loc === "myaree" ? "midland" : "myaree"))}
            className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl p-2 flex items-center gap-2.5 hover:scale-105 transition-transform cursor-pointer"
          >
            <img
              src={heroBadgeImg}
              alt={`Car Saloon ${heroBadgeLabel} storefront`}
              draggable="false"
              className="w-14 h-14 rounded-xl object-cover"
            />
            <div className="text-xs pr-2 text-left">
              <div className="font-bold text-[#13242c]">{heroBadgeLabel}</div>
              <div className="text-[#8a8f94]">Tap to switch</div>
            </div>
          </button>
          <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: navy }}>
              GT
            </div>
            <div className="text-xs">
              <div className="font-bold text-[#13242c]">GTechniq Accredited</div>
              <div className="text-[#8a8f94]">Professional Applicator</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative py-20 px-6 overflow-hidden">
        <Bubble size={100} top="10%" right="-3%" opacity={0.1} />
        <Bubble size={55} bottom="8%" left="4%" opacity={0.08} />
        <div className="relative max-w-6xl mx-auto flex flex-wrap gap-14 items-center">
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
      <section id="pricing" className="relative px-6 py-20 overflow-hidden" style={{ backgroundColor: "#f1ece2" }}>
        <Bubble size={160} top="-6%" left="-5%" opacity={0.1} />
        <Bubble size={90} bottom="4%" right="2%" opacity={0.1} />
        <Bubble size={50} top="45%" right="18%" opacity={0.08} />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Washing Services</span>
            <h2 style={fraunces} className="text-3xl font-semibold text-[#13242c] mt-2">Compare Your Plan</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {washTiers.map((t) => {
              const live = pricesByKey[t.priceKey];
              const sedan = live?.sedan ?? t.sedan;
              const suv = live?.suv ?? t.suv;
              const fourWd = live?.fourWd ?? t.fourWd;
              return (
              <div key={t.name} className="bg-white rounded-2xl border border-[#e7e2d8] p-7 flex flex-col gap-4">
                <div className="font-bold text-lg text-[#13242c]">{t.name}</div>
                <div className="text-sm font-semibold" style={{ color: accent }}>
                  Sedan from ${sedan} · SUV from ${suv} · 4WD/7-Seater from ${fourWd}
                </div>
                <div className="flex flex-col gap-2">
                  {t.features.map((f) => (
                    <div key={f} className="flex gap-2 text-sm text-[#4a5056]">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                      {f}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate(t.route)}
                  className="mt-auto self-start px-5 py-2 rounded-full text-sm font-semibold text-white hover:scale-105 transition-transform"
                  style={{ backgroundColor: accent }}
                >
                  Read More →
                </button>
              </div>
              );
            })}
          </div>

          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Detailing Services</span>
            <h2 style={fraunces} className="text-3xl font-semibold text-[#13242c] mt-2">Compare Your Plan</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {detailTiers.map((t) => {
              const live = pricesByKey[t.priceKey];
              const sedan = live?.sedan ?? t.sedan;
              const suv = live?.suv ?? t.suv;
              const fourWd = live?.fourWd ?? t.fourWd;
              return (
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
                  Sedan from ${sedan} · SUV from ${suv} · 4WD/7-Seater from ${fourWd}
                </div>
                <div className="flex flex-col gap-2">
                  {t.features.map((f) => (
                    <div key={f} className="flex gap-2 text-sm text-[#4a5056]">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                      {f}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate(t.route)}
                  className="mt-auto self-start px-5 py-2 rounded-full text-sm font-semibold text-white hover:scale-105 transition-transform"
                  style={{ backgroundColor: accent }}
                >
                  Read More →
                </button>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PREMIUM */}
      <section id="premium" className="relative px-6 py-20 overflow-hidden">
        <Bubble size={120} top="5%" right="-4%" opacity={0.1} />
        <Bubble size={70} bottom="10%" left="2%" opacity={0.1} />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-11">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Ultra Premium Finishes</span>
            <h2 style={fraunces} className="text-3xl font-semibold text-[#13242c] mt-2">Long-Lasting Services For Your Car</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {premium.map((p) => {
              const live = pricesByKey[p.key];
              const quoteOnly = live?.quoteOnly ?? p.fallbackQuoteOnly;
              const price = live?.flatPrice ?? p.fallbackPrice;
              const priceText = quoteOnly ? "Price on request" : `From $${price}`;
              return (
              <button
                key={p.title}
                onClick={() => navigate(p.route)}
                className="bg-white rounded-2xl border border-[#e7e2d8] overflow-hidden text-left flex flex-col"
              >
                <img src={p.img} alt={p.title} draggable="false" className="w-full h-44 object-cover" />
                <div className="p-4 flex flex-col gap-1">
                  <div className="font-semibold text-sm text-[#13242c]">{p.title}</div>
                  <div className="text-sm font-semibold" style={{ color: accent }}>{priceText}</div>
                </div>
              </button>
              );
            })}
          </div>
          <p className="text-center text-sm text-[#8a8f94] mt-6">
            Ceramic Coating requires an in-person inspection to confirm exact pricing.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative px-6 py-20 overflow-hidden" style={{ backgroundColor: "#f1ece2" }}>
        <Bubble size={140} top="-8%" right="-4%" opacity={0.1} />
        <Bubble size={80} bottom="6%" left="2%" opacity={0.1} />
        <div className="relative max-w-2xl mx-auto">
          <div className="text-center mb-11">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>What Our Customers Say</span>
            <h2 style={fraunces} className="text-3xl font-semibold text-[#13242c] mt-2">Real Reviews From Google</h2>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
              >
                {testimonials.map((t) => (
                  <div key={t.name} className="flex-none w-full px-1">
                    <div className="bg-white rounded-2xl border border-[#e7e2d8] p-8 sm:p-10 flex flex-col items-center text-center gap-4 min-h-[260px]">
                      <Quote className="w-8 h-8" style={{ color: accent }} />
                      <p className="text-base sm:text-lg text-[#3a4046] leading-relaxed">{t.quote}</p>
                      <div className="flex flex-col items-center gap-1.5 mt-1">
                        <span className="flex">{[1, 2, 3, 4, 5].map((i2) => <Star key={i2} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</span>
                        <div className="font-semibold text-sm text-[#13242c]">{t.name} &middot; {t.location}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => goToTestimonial(testimonialIndex - 1)}
              aria-label="Previous testimonial"
              className="hidden sm:flex absolute top-1/2 -left-14 -translate-y-1/2 w-10 h-10 rounded-full bg-white border items-center justify-center hover:scale-105 transition-transform"
              style={{ borderColor: "#e7e2d8" }}
            >
              <ChevronLeft className="w-5 h-5" style={{ color: navy }} />
            </button>
            <button
              type="button"
              onClick={() => goToTestimonial(testimonialIndex + 1)}
              aria-label="Next testimonial"
              className="hidden sm:flex absolute top-1/2 -right-14 -translate-y-1/2 w-10 h-10 rounded-full bg-white border items-center justify-center hover:scale-105 transition-transform"
              style={{ borderColor: "#e7e2d8" }}
            >
              <ChevronRight className="w-5 h-5" style={{ color: navy }} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-7">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => goToTestimonial(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="h-2 rounded-full transition-all"
                style={{
                  width: i === testimonialIndex ? "24px" : "8px",
                  backgroundColor: i === testimonialIndex ? accent : "#d8d2c4",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="locations" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Find Us</span>
            <h2 style={fraunces} className="text-3xl font-semibold text-[#13242c] mt-2">2 Studios Across Perth</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-[#e7e2d8] overflow-hidden">
            <img src={myareeImg} alt="Myaree" draggable="false" className="w-full h-56 object-cover" />
            <div className="p-6 flex flex-col gap-2">
              <div className="font-bold text-xl text-[#13242c]">Myaree</div>
              <button onClick={() => navigate("/new-booking")} className="text-sm font-semibold self-start" style={{ color: accent }}>
                Book at Myaree →
              </button>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#e7e2d8] overflow-hidden">
            <img src={midlandImg} alt="Midland" draggable="false" className="w-full h-56 object-cover" />
            <div className="p-6 flex flex-col gap-2">
              <div className="font-bold text-xl text-[#13242c]">Midland</div>
              <button onClick={() => navigate("/new-booking")} className="text-sm font-semibold self-start" style={{ color: accent }}>
                Book at Midland →
              </button>
            </div>
          </div>
          </div>
        </div>
      </section>

      <RedesignFooter />
    </div>
  );
};

export default HomePageV2;
