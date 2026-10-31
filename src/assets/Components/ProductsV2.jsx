import React from "react";
import { useNavigate } from "react-router-dom";
import { Droplet, ShieldCheck, Sparkles } from "lucide-react";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import Bubble from "./Bubble";
import ceramicImg from "../../img/team1.jpeg";
import interiorPackImg from "../../img/team2.jpg";

const brands = [
  {
    name: "GTechniq",
    tagline: "Accredited Professional Applicator",
    img: ceramicImg,
    points: [
      "Hydrophobic ceramic coatings that repel water, dirt and grime",
      "UV & oxidation protection that prevents fading and discolouration",
      "Deep gloss enhancement for a mirror-like, long-lasting shine",
    ],
  },
  {
    name: "Gyeon",
    tagline: "Premium Detailing & Protection",
    img: interiorPackImg,
    points: [
      "High-grade protective coatings for paint, interior and trims",
      "Long-term protection that outlasts traditional wax by years",
      "A consistent, showroom finish on every vehicle",
    ],
  },
];

const ProductsV2 = () => {
  useGoogleFont();
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="relative px-6 pt-14 pb-10 text-center overflow-hidden">
          <Bubble size={100} top="-15%" left="-4%" opacity={0.1} />
          <Bubble size={60} top="30%" right="6%" opacity={0.1} />
          <span className="relative text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Our Products</span>
          <h1 style={fraunces} className="relative text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">The Brands We Trust</h1>
          <p className="relative text-[#6b7278] mt-3 max-w-xl mx-auto text-sm">
            We only use high-grade, industry-leading products — so every coating, detail and finish holds up long after you drive away.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6 pb-16 grid sm:grid-cols-2 gap-6">
          {brands.map((b) => (
            <div key={b.name} className="bg-white rounded-2xl overflow-hidden flex flex-col" style={{ border: `1px solid ${border}` }}>
              <img src={b.img} alt={b.name} draggable="false" className="w-full h-48 object-cover" />
              <div className="p-6 flex flex-col gap-3">
                <div>
                  <h2 style={fraunces} className="text-xl font-semibold text-[#13242c]">{b.name}</h2>
                  <span className="text-xs font-bold uppercase tracking-wide" style={{ color: accent }}>{b.tagline}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {b.points.map((p) => (
                    <div key={p} className="flex items-start gap-2 text-sm text-[#4a5056]">
                      <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-6 pb-20">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-6 flex items-start gap-3" style={{ border: `1px solid ${border}` }}>
              <ShieldCheck className="w-6 h-6 shrink-0" style={{ color: accent }} />
              <div>
                <div className="font-semibold text-[#13242c]">Accredited Applicators</div>
                <div className="text-sm text-[#6b7278] mt-1">Trained and certified to apply these products correctly, every time.</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 flex items-start gap-3" style={{ border: `1px solid ${border}` }}>
              <Droplet className="w-6 h-6 shrink-0" style={{ color: accent }} />
              <div>
                <div className="font-semibold text-[#13242c]">Nothing Off-The-Shelf</div>
                <div className="text-sm text-[#6b7278] mt-1">The same professional-grade products you'll find at the top detailing studios.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 pb-20 text-center">
          <div className="rounded-2xl p-8" style={{ backgroundColor: navy }}>
            <h3 style={fraunces} className="text-xl font-semibold text-white mb-2">See Them In Action</h3>
            <p className="text-white/80 text-sm mb-5">Book a service and experience the difference these products make.</p>
            <button onClick={() => navigate("/new-booking")} className="px-6 py-2.5 rounded-full font-semibold text-sm bg-white" style={{ color: navy }}>
              Book Now
            </button>
          </div>
        </div>
      </main>
      <RedesignFooter />
    </div>
  );
};

export default ProductsV2;
