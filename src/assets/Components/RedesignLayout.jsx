import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, Sparkles, Clock, Phone, Mail } from "lucide-react";
import { accent, navy, border, fraunces, useGoogleFont } from "./redesignTheme";
import siteLogo from "../../img/logo.png";

const MARQUEE_ITEMS = ["Walk-ins Welcome — No Booking Required", "GTechniq Ceramic Coating", "Full Detail", "Tinting"];

// Height of the marquee strip below, so the sticky nav header docks right
// underneath it instead of overlapping (matches the old site's stacked
// sticky marquee + nav behavior).
const MARQUEE_HEIGHT = "36px";

const SERVICE_LINKS = [
  { label: "Outside Only", href: "/new-outside" },
  { label: "Inside & Out", href: "/new-inside_outside" },
  { label: "Premium Wash", href: "/new-premium_wash" },
  { label: "Full Detail", href: "/new-full_detail" },
  { label: "Signature Detail", href: "/new-signature_detail" },
  { label: "The Works", href: "/new-the_works" },
];

const NAV_LINKS = [
  { label: "Home", href: "/new-home" },
  { label: "Gallery", href: "/new-gallery" },
  { label: "Premium", href: "/new-ultrapremium" },
  { label: "Extras", href: "/new-extras" },
  { label: "About", href: "/new-about" },
  { label: "Contact", href: "/new-contact" },
  { label: "FAQs", href: "/new-faqs" },
];

export const RedesignNav = () => {
  const navigate = useNavigate();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <>
      {/* Marquee */}
      <div className="sticky top-0 z-50 py-2.5 text-xs font-bold tracking-wide overflow-hidden" style={{ backgroundColor: navy, color: "#fff" }}>
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-2 mx-3">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                <Sparkles className="w-3 h-3" style={{ color: accent }} />
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Info bar — scrolls away, not sticky */}
      <div className="border-b" style={{ borderColor: border, backgroundColor: "#ffffff" }}>
        <div className="lg:hidden text-center py-2 text-xs font-semibold" style={{ backgroundColor: "#f1ece2", color: navy }}>
          Mon&ndash;Fri: 7am&ndash;5pm &middot; Sat: 7am&ndash;4pm (Myaree only) &middot; Sun: By appointment
        </div>
        <div className="max-w-6xl mx-auto px-6 py-2.5 hidden lg:flex items-center justify-center gap-10 text-xs">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4" style={{ color: accent }} />
            <div className="leading-tight">
              <div className="font-bold" style={{ color: navy }}>Opening Hours</div>
              <div className="text-[#6b7278]">Mon&ndash;Fri 7am&ndash;5pm &middot; Sat 7am&ndash;4pm (Myaree) &middot; Sun by appt.</div>
            </div>
          </div>
          <div className="w-px h-8" style={{ backgroundColor: border }}></div>
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4" style={{ color: accent }} />
            <div className="leading-tight">
              <div className="font-bold" style={{ color: navy }}>Call Us</div>
              <div className="text-[#6b7278]">Midland: 0478 551 640 &middot; Myaree: 0451 288 164</div>
            </div>
          </div>
          <div className="w-px h-8" style={{ backgroundColor: border }}></div>
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4" style={{ color: accent }} />
            <div className="leading-tight">
              <div className="font-bold" style={{ color: navy }}>Email Us</div>
              <div className="text-[#6b7278]">info@carsaloon.com.au</div>
            </div>
          </div>
        </div>
      </div>

      <header className="sticky z-40 bg-[#f8f6f1]/90 backdrop-blur border-b" style={{ top: MARQUEE_HEIGHT, borderColor: border }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <a href="/new-home" className="flex items-center gap-2.5">
          <img src={siteLogo} alt="Car Saloon" draggable="false" className="h-10 w-10 object-contain" />
          <span style={fraunces} className="text-xl font-semibold text-[#1c2024]">Car Saloon</span>
        </a>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#4a5056]">
          <a href="/new-home" className="hover:text-[#0a3b4d]">Home</a>
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-[#0a3b4d]">
              Services <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 pt-2">
                <div className="bg-white rounded-xl border shadow-lg py-2 min-w-[200px]" style={{ borderColor: border }}>
                  {SERVICE_LINKS.map((s) => (
                    <a key={s.href} href={s.href} className="block px-4 py-2 text-sm text-[#4a5056] hover:bg-[#f1ece2] hover:text-[#0a3b4d]">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a href="/new-ultrapremium" className="hover:text-[#0a3b4d]">Premium</a>
          <a href="/new-extras" className="hover:text-[#0a3b4d]">Extras</a>
          <a href="/new-gallery" className="hover:text-[#0a3b4d]">Gallery</a>
          <a href="/new-about" className="hover:text-[#0a3b4d]">About</a>
          <a href="/new-contact" className="hover:text-[#0a3b4d]">Contact</a>
          <a href="/new-faqs" className="hover:text-[#0a3b4d]">FAQs</a>
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate("/new-booking")}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: navy }}
          >
            Book Now
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden p-2 rounded-lg"
            style={{ border: `1px solid ${border}` }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5 text-[#13242c]" /> : <Menu className="w-5 h-5 text-[#13242c]" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t px-6 py-4 flex flex-col gap-1 text-sm font-medium text-[#4a5056]" style={{ borderColor: border }}>
          <a href="/new-home" onClick={closeMobile} className="py-2.5">Home</a>
          <button
            onClick={() => setMobileServicesOpen((o) => !o)}
            className="flex items-center justify-between py-2.5 text-left"
          >
            Services
            <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileServicesOpen && (
            <div className="flex flex-col pl-4 border-l" style={{ borderColor: border }}>
              {SERVICE_LINKS.map((s) => (
                <a key={s.href} href={s.href} onClick={closeMobile} className="py-2 text-sm">
                  {s.label}
                </a>
              ))}
            </div>
          )}
          <a href="/new-ultrapremium" onClick={closeMobile} className="py-2.5">Premium</a>
          <a href="/new-extras" onClick={closeMobile} className="py-2.5">Extras</a>
          <a href="/new-gallery" onClick={closeMobile} className="py-2.5">Gallery</a>
          <a href="/new-about" onClick={closeMobile} className="py-2.5">About</a>
          <a href="/new-contact" onClick={closeMobile} className="py-2.5">Contact</a>
          <a href="/new-faqs" onClick={closeMobile} className="py-2.5">FAQs</a>
        </nav>
      )}
    </header>
    </>
  );
};

export const RedesignFooter = () => (
  <footer className="border-t px-6 py-10" style={{ borderColor: border }}>
    <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-6 text-sm text-[#7a8188]">
      <div className="flex items-center gap-2">
        <img src={siteLogo} alt="Car Saloon" draggable="false" className="h-7 w-7 object-contain" />
        <span style={fraunces} className="text-lg text-[#13242c]">Car Saloon</span>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <a href="/new-outside">Outside Only</a>
        <a href="/new-full_detail">Full Detail</a>
        <a href="/new-ultrapremium">Premium Finishes</a>
        <a href="/new-extras">Extras</a>
        <a href="/new-gallery">Gallery</a>
      </div>
      <div>© Car Saloon — Midland &amp; Myaree, Perth WA</div>
      <div className="flex gap-5">
        <a href="/new-terms">Terms</a>
        <a href="/new-privacy">Privacy</a>
        <a href="/new-promotional-terms">Offer Terms</a>
      </div>
    </div>
  </footer>
);

// Wraps page content with the shared redesign nav + footer, and loads the
// shared fonts. Every /new-* page (except /new-home, which builds its own
// hero around this same nav/footer) should use this.
const RedesignLayout = ({ children }) => {
  useGoogleFont();
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1">{children}</main>
      <RedesignFooter />
    </div>
  );
};

export default RedesignLayout;
