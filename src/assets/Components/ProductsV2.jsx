import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Droplet, ShieldCheck } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import Bubble from "./Bubble";

const highlights = [
  { icon: ShieldCheck, title: "Built On Our Expertise", desc: "Formulated from years of hands-on detailing experience in our own studios." },
  { icon: Droplet, title: "Studio-Grade Formulas", desc: "The same quality standard we hold every coating and detail to." },
  { icon: Sparkles, title: "Take The Finish Home", desc: "Keep that fresh-from-the-studio look between visits." },
];

const ProductsV2 = () => {
  useGoogleFont();
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="relative px-6 pt-20 pb-16 text-center overflow-hidden">
          <Bubble size={140} top="-10%" left="-5%" opacity={0.1} />
          <Bubble size={90} top="50%" right="2%" opacity={0.1} />
          <Bubble size={60} bottom="0%" left="20%" opacity={0.08} />

          <span
            className="relative inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{ backgroundColor: "#fde8b8", color: "#8a6416" }}
          >
            <Sparkles className="w-3.5 h-3.5" /> Coming 2027
          </span>
          <h1 style={fraunces} className="relative text-3xl sm:text-5xl font-semibold text-[#13242c] mt-5 max-w-2xl mx-auto">
            Our Own Product Range Is On The Way
          </h1>
          <p className="relative text-[#6b7278] mt-4 max-w-xl mx-auto text-base">
            We're bottling up everything we've learned from years of detailing Perth's cars. A dedicated Car Saloon product line is in the works, so you can keep that studio-fresh finish going at home.
          </p>
          <div className="relative flex flex-wrap items-center justify-center gap-3 mt-7">
            <button
              onClick={() => navigate("/new-booking")}
              className="px-7 py-3.5 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform"
              style={{ backgroundColor: navy }}
            >
              Book a Service →
            </button>
            <a
              href="https://www.instagram.com/carsaloon_perth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border-2"
              style={{ borderColor: navy, color: navy }}
            >
              <FaInstagram className="w-4 h-4" /> Follow For Updates
            </a>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 pb-20">
          <div className="grid sm:grid-cols-3 gap-5">
            {highlights.map((h) => (
              <div key={h.title} className="bg-white rounded-2xl p-6 flex flex-col gap-3" style={{ border: `1px solid ${border}` }}>
                <h.icon className="w-6 h-6" style={{ color: accent }} />
                <div className="font-semibold text-[#13242c]">{h.title}</div>
                <div className="text-sm text-[#6b7278]">{h.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 pb-20 text-center">
          <div className="rounded-2xl p-8" style={{ backgroundColor: navy }}>
            <h3 style={fraunces} className="text-xl font-semibold text-white mb-2">Want To Be The First To Know?</h3>
            <p className="text-white/80 text-sm mb-5">Follow us on social or ask us in-store — we'll share the launch details as soon as they're ready.</p>
            <div className="flex items-center justify-center gap-3">
              <a
                href="https://www.facebook.com/p/Carsaloon-Perth-100075514525242/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://www.instagram.com/carsaloon_perth"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      </main>
      <RedesignFooter />
    </div>
  );
};

export default ProductsV2;
