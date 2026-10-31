import React from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import ceramicImg from "../../img/team1.jpeg";
import interiorPackImg from "../../img/team2.jpg";
import tintingImg from "../../img/team3.jpg";
import paintlessDentImg from "../../img/paintless_dent_repair.png";
import Bubble from "./Bubble";

const serviceCards = [
  {
    title: "Ceramic Coating",
    img: ceramicImg,
    offers: ["Hydrophobic Finish – Repels water, dirt, and grime", "UV & Oxidation Protection – Prevents fading and discolouration", "Deep Gloss Enhancement – Mirror-like, long-lasting shine"],
    whyUs: ["High-Grade Products – Gtechniq and Gyeon only", "Long-Term Protection – Outlasts traditional wax by years", "Guaranteed Satisfaction – Showroom finish every time"],
    notes: ["We are GTechniq Accredited Professional Applicator", "In-person inspection required to confirm exact price"],
    price: "From $499 onwards",
  },
  {
    title: "Interior Protection Pack",
    img: interiorPackImg,
    offers: ["Fabric & Leather Guard – Repels spills and stains", "UV Protection Coating – Prevents dashboard and trim fading", "Odour Neutralising Treatment – Keeps your cabin smelling fresh"],
    whyUs: ["Premium Protective Products – Long-lasting barrier", "Full Interior Coverage – Seats, dash, and door trims", "Keeps Your Interior Looking Newer, Longer"],
    price: "From $299 onwards",
  },
  {
    title: "Window Tinting",
    img: tintingImg,
    offers: ["UV & Heat Protection – Blocks 99% UV", "Enhanced Privacy – Keeps prying eyes away", "Clearer Vision – Improves visibility", "Interior Protection – Prevents fading & cracking"],
    whyUs: ["Top Quality Film – Industry leading tints", "Expert Installation – No bubbles", "Variety of Shades – Match your style", "Legal Compliance – Meets local rules"],
    price: "From $499 onwards",
  },
  {
    title: "Paintless Dent Removal",
    img: paintlessDentImg,
    offers: ["No Paint, No Filler – Keeps original paint", "Eco-Friendly – No chemicals", "Cost Effective – Avoid full repaint", "Faster – Ideal for small dents"],
    whyUs: ["Expert Technicians – Precision tools", "Same-Day Service – Back on road quick", "Advanced PDR – Perfect results", "Guaranteed – Flawless repairs"],
    price: "From $199 onwards",
  },
];

const UltrapremiumV2 = () => {
  useGoogleFont();
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="relative px-6 pt-14 pb-10 text-center overflow-hidden">
          <Bubble size={100} top="-15%" left="-4%" opacity={0.1} />
          <Bubble size={60} top="30%" right="6%" opacity={0.1} />
          <span className="relative text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Ultra Premium Finishes</span>
          <h1 style={fraunces} className="relative text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">Long-Lasting Services For Your Car</h1>
          <p className="relative text-[#6b7278] mt-3 max-w-2xl mx-auto text-sm">
            At Car Saloon, we redefine automotive luxury with ultra-premium finishes, designed for car enthusiasts who demand nothing but the best.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6 pb-20 flex flex-col gap-16">
          {serviceCards.map((card, i) => (
            <div key={card.title} className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center`}>
              <div className="w-full md:w-1/2 shrink-0">
                <img src={card.img} alt={card.title} draggable="false" className="w-full h-72 object-cover rounded-2xl" />
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <h2 style={fraunces} className="text-2xl font-semibold text-[#13242c]">{card.title}</h2>

                <div className="flex flex-col gap-1.5">
                  {card.offers.map((o) => (
                    <div key={o} className="flex gap-2 text-sm text-[#4a5056]">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                      {o}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="text-xs font-bold uppercase tracking-wide text-[#6b7278]">Why Choose Us</div>
                  {card.whyUs.map((w) => (
                    <div key={w} className="flex gap-2 text-sm text-[#4a5056]">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                      {w}
                    </div>
                  ))}
                </div>

                {card.notes && (
                  <div className="flex flex-wrap gap-2">
                    {card.notes.map((n) => (
                      <span key={n} className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "#fde8e8", color: "#b23b3b" }}>
                        {n}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 mt-2" style={{ borderTop: `1px solid ${border}` }}>
                  <div>
                    <div className="font-semibold" style={{ color: accent }}>{card.price}</div>
                    {card.priceNote && <div className="text-xs text-[#8a8f94] italic mt-0.5 max-w-[220px]">{card.priceNote}</div>}
                  </div>
                  <button
                    onClick={() => navigate("/new-booking")}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold text-white shrink-0"
                    style={{ backgroundColor: navy }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <RedesignFooter />
    </div>
  );
};

export default UltrapremiumV2;
