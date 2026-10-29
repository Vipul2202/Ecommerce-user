import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { accent, navy, border, fraunces, useGoogleFont } from "./redesignTheme";

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

  return (
    <header className="sticky top-0 z-40 bg-[#f8f6f1]/90 backdrop-blur border-b" style={{ borderColor: border }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <a href="/new-home" style={fraunces} className="text-xl font-semibold text-[#1c2024]">
          Car Saloon
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
        <button
          onClick={() => navigate("/new-booking")}
          className="px-5 py-2.5 rounded-full text-sm font-semibold text-white shrink-0"
          style={{ backgroundColor: navy }}
        >
          Book Now
        </button>
      </div>
    </header>
  );
};

export const RedesignFooter = () => (
  <footer className="border-t px-6 py-10" style={{ borderColor: border }}>
    <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-6 text-sm text-[#7a8188]">
      <div style={fraunces} className="text-lg text-[#13242c]">Car Saloon</div>
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
