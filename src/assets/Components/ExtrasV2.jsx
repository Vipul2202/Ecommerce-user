import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronDown } from "lucide-react";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import extrasData from "./extrasData";

const ExtrasV2 = () => {
  useGoogleFont();
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="px-6 pt-14 pb-10 text-center">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Touch Up Services</span>
          <h1 style={fraunces} className="text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">Extras</h1>
          <p className="text-[#6b7278] mt-3 max-w-2xl mx-auto text-sm">
            Achieve a flawless finish with Stage 3 Paint Correction, Buff and Polish, Headlight Restoration, Leather Clean &amp; Seat Steam Clean, Dog Hair Removal, and Bull Bar Polish.
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-6 pb-20">
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: `1px solid ${border}` }}>
            {extrasData.map((card, i) => {
              const open = openIndex === i;
              return (
                <div key={card.title} style={{ borderTop: i > 0 ? `1px solid ${border}` : "none" }}>
                  <button
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <div>
                      <div style={fraunces} className="text-base font-semibold text-[#13242c]">{card.title}</div>
                      <div className="text-xs font-semibold mt-0.5" style={{ color: accent }}>{card.tagline}</div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="hidden sm:block text-sm font-semibold" style={{ color: accent }}>{card.price}</span>
                      <ChevronDown
                        className="w-4 h-4 transition-transform"
                        style={{ color: accent, transform: open ? "rotate(180deg)" : "none" }}
                      />
                    </div>
                  </button>
                  {open && (
                    <div className="px-6 pb-6 flex flex-col gap-4">
                      <p className="text-sm text-[#52585d] leading-relaxed">{card.paragraph}</p>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wide text-[#6b7278] mb-2">What We Offer</div>
                          <div className="flex flex-col gap-1.5">
                            {card.offers.map((o) => (
                              <div key={o} className="flex gap-2 text-sm text-[#4a5056]">
                                <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                                {o}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wide text-[#6b7278] mb-2">Why Choose Us</div>
                          <div className="flex flex-col gap-1.5">
                            {card.whyUs.map((w) => (
                              <div key={w} className="flex gap-2 text-sm text-[#4a5056]">
                                <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                                {w}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${border}` }}>
                        <span className="sm:hidden font-semibold text-sm" style={{ color: accent }}>{card.price}</span>
                        <button
                          onClick={() => navigate("/new-booking")}
                          className="ml-auto px-5 py-2 rounded-full text-sm font-semibold text-white"
                          style={{ backgroundColor: navy }}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <RedesignFooter />
    </div>
  );
};

export default ExtrasV2;
