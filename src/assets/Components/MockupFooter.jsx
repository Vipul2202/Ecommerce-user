import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { RedesignNav } from "./RedesignLayout";
import { useGoogleFont, accent, navy, fraunces } from "./redesignTheme";
import Bubble from "./Bubble";
import siteLogo from "../../img/logo.png";

const serviceLinks = [
  { label: "Outside Only", href: "/new-outside" },
  { label: "Inside & Out", href: "/new-inside_outside" },
  { label: "Full Detail", href: "/new-full_detail" },
  { label: "The Works", href: "/new-the_works" },
  { label: "Premium Finishes", href: "/new-ultrapremium" },
  { label: "Extras", href: "/new-extras" },
];

const companyLinks = [
  { label: "About Us", href: "/new-about" },
  { label: "Gallery", href: "/new-gallery" },
  { label: "FAQs", href: "/new-faqs" },
  { label: "Contact Us", href: "/new-contact" },
];

const legalLinks = [
  { label: "Terms of Use", href: "/new-terms" },
  { label: "Privacy Policy", href: "/new-privacy" },
  { label: "Offer T&Cs", href: "/new-promotional-terms" },
];

const MockupFooter = () => {
  useGoogleFont();
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1 flex items-center justify-center py-20 text-[#8a8f94] text-sm">
        (page content would go here)
      </main>

      <footer className="relative overflow-hidden" style={{ backgroundColor: navy }}>
        <Bubble size={180} top="-10%" left="-6%" opacity={0.06} color="#ffffff" />
        <Bubble size={120} bottom="-8%" right="4%" opacity={0.07} color="#ffffff" />
        <Bubble size={70} top="40%" right="20%" opacity={0.05} color="#ffffff" />

        {/* CTA strip */}
        <div className="relative border-b border-white/10 px-6 py-10">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 style={fraunces} className="text-2xl font-semibold text-white">Ready for the saloon treatment?</h3>
              <p className="text-white/70 text-sm mt-1">Book online in under a minute — Midland &amp; Myaree.</p>
            </div>
            <button
              onClick={() => navigate("/new-booking")}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
              style={{ backgroundColor: accent, color: "#fff" }}
            >
              Book Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main columns */}
        <div className="relative max-w-6xl mx-auto px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <img src={siteLogo} alt="Car Saloon" draggable="false" className="h-9 w-9 object-contain" />
              <span style={fraunces} className="text-lg font-semibold text-white">Car Saloon</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Perth's #1 detailing studio — high-end washing, detailing, ceramic coating and more since 2015.
            </p>
            <div className="flex gap-3 pt-1">
              <a
                href="https://www.facebook.com/p/Carsaloon-Perth-100075514525242/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-3.5 h-3.5 text-white" />
              </a>
              <a
                href="https://www.instagram.com/carsaloon_perth"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: accent }}>Services</h4>
            <div className="flex flex-col gap-2.5">
              {serviceLinks.map((l) => (
                <a key={l.href} href={l.href} className="text-sm text-white/75 hover:text-white transition-colors">{l.label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: accent }}>Company</h4>
            <div className="flex flex-col gap-2.5">
              {companyLinks.map((l) => (
                <a key={l.href} href={l.href} className="text-sm text-white/75 hover:text-white transition-colors">{l.label}</a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: accent }}>Get In Touch</h4>
            <div className="flex items-start gap-2.5 text-sm text-white/75">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              <span>7 Loton Avenue, Midland, 6056<br />4/41 McCoy Street, Myaree, 6154</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-white/75">
              <Phone className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Midland: 0478 551 640<br />Myaree: 0430 170 164 / 0451 288 164</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-white/75">
              <Mail className="w-4 h-4 shrink-0" />
              <span>info@carsaloon.com.au</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-white/10 px-6 py-5">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-white/60">
            <div>&copy; {new Date().getFullYear()} Car Saloon — Midland &amp; Myaree, Perth WA</div>
            <div className="flex gap-5">
              {legalLinks.map((l) => (
                <a key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MockupFooter;
