import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import faqsData from "./faqsData";
import Bubble from "./Bubble";

const FaqsV2 = () => {
  useGoogleFont();
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">
        <div className="relative px-6 pt-14 pb-10 text-center overflow-hidden">
          <Bubble size={100} top="-15%" left="-4%" opacity={0.1} />
          <Bubble size={60} top="30%" right="6%" opacity={0.1} />
          <span className="relative text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>FAQs</span>
          <h1 style={fraunces} className="relative text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">Frequently Asked Questions</h1>
          <p className="relative text-[#6b7278] mt-3 max-w-xl mx-auto text-sm">
            Answers to common questions about our services and how Car Saloon can help.
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-6 pb-16">
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: `1px solid ${border}` }}>
            {faqsData.map((faq, i) => (
              <div key={faq.question} style={{ borderTop: i > 0 ? `1px solid ${border}` : "none" }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span style={fraunces} className="text-base font-semibold text-[#13242c]">{faq.question}</span>
                  <ChevronDown
                    className="w-4 h-4 shrink-0 transition-transform"
                    style={{ color: accent, transform: openIndex === i ? "rotate(180deg)" : "none" }}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-6 text-sm leading-relaxed text-[#52585d]">
                    <p>{faq.answer}</p>
                    {faq.details && (
                      <div className="mt-4 flex flex-col gap-4">
                        {faq.details.map((d, di) => (
                          <div key={d.title}>
                            <div className="font-semibold text-[#13242c] mb-1">{di + 1}. {d.title}</div>
                            <ul className="flex flex-col gap-1 ml-4">
                              {d.points.map((p) => (
                                <li key={p} className="flex gap-2 text-[#52585d]">
                                  <span style={{ color: accent }}>•</span>{p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 pb-20 text-center">
          <div className="rounded-2xl p-8" style={{ backgroundColor: navy }}>
            <h3 style={fraunces} className="text-xl font-semibold text-white mb-2">Still Have Questions?</h3>
            <p className="text-white/80 text-sm mb-5">Can't find the answer you're looking for? Our team is here to help.</p>
            <button onClick={() => navigate("/new-contact")} className="px-6 py-2.5 rounded-full font-semibold text-sm bg-white" style={{ color: navy }}>
              Contact Us
            </button>
          </div>
        </div>
      </main>
      <RedesignFooter />
    </div>
  );
};

export default FaqsV2;
