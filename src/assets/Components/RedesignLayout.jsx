import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, Sparkles, Clock, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { accent, navy, border, fraunces, useGoogleFont } from "./redesignTheme";
import Bubble from "./Bubble";
import siteLogo from "../../img/logo.png";

const FOOTER_SERVICE_LINKS = [
  { label: "Outside Only", href: "/new-outside" },
  { label: "Inside & Out", href: "/new-inside_outside" },
  { label: "Full Detail", href: "/new-full_detail" },
  { label: "The Works", href: "/new-the_works" },
  { label: "Premium Finishes", href: "/new-ultrapremium" },
  { label: "Add on Enhancements", href: "/new-extras" },
  { label: "Products", href: "/new-products" },
];

const FOOTER_COMPANY_LINKS = [
  { label: "About Us", href: "/new-about" },
  { label: "Gallery", href: "/new-gallery" },
  { label: "FAQs", href: "/new-faqs" },
  { label: "Contact Us", href: "/new-contact" },
];

const FOOTER_LEGAL_LINKS = [
  { label: "Terms of Use", href: "/new-terms" },
  { label: "Privacy Policy", href: "/new-privacy" },
  { label: "Offer T&Cs", href: "/new-promotional-terms" },
];

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
  { label: "Add on Enhancements", href: "/new-extras" },
  { label: "Products", href: "/new-products" },
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
          <a href="/new-extras" className="hover:text-[#0a3b4d]">Add on Enhancements</a>
          <a href="/new-products" className="hover:text-[#0a3b4d]">Products</a>
          <a href="/new-gallery" className="hover:text-[#0a3b4d]">Gallery</a>
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
          <a href="/new-extras" onClick={closeMobile} className="py-2.5">Add on Enhancements</a>
          <a href="/new-products" onClick={closeMobile} className="py-2.5">Products</a>
          <a href="/new-gallery" onClick={closeMobile} className="py-2.5">Gallery</a>
        </nav>
      )}
    </header>
    </>
  );
};

export const RedesignFooter = () => {
  const navigate = useNavigate();

  return (
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
            {FOOTER_SERVICE_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-white/75 hover:text-white transition-colors">{l.label}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: accent }}>Company</h4>
          <div className="flex flex-col gap-2.5">
            {FOOTER_COMPANY_LINKS.map((l) => (
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
            <span>Midland: 0478 551 640<br />Myaree: 0451 288 164</span>
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
            {FOOTER_LEGAL_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

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
