import React, { useMemo, useState } from "react";
import { Check, ChevronUp, ChevronDown } from "lucide-react";
import { RedesignNav, RedesignFooter } from "./RedesignLayout";
import { useGoogleFont, accent, navy, border, fraunces } from "./redesignTheme";
import { TIER_SERVICES, PREMIUM_SERVICES, EXTRA_SERVICES } from "./bookingServicesData";

const VEHICLE_TYPES = [
  { key: "sedan", label: "Sedan" },
  { key: "suv", label: "SUV" },
  { key: "fourWd", label: "4WD" },
];

const fmt = (n) => `$${n}`;

const MockupBookingForm = () => {
  useGoogleFont();
  const [vehicleType, setVehicleType] = useState("sedan");
  const [location, setLocation] = useState("");
  const [selected, setSelected] = useState({
    inside_outside: true,
    ceramic_coating: true,
  });
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  const toggle = (key) => setSelected((prev) => ({ ...prev, [key]: !prev[key] }));

  const lineItems = useMemo(() => {
    const items = [];
    TIER_SERVICES.forEach((t) => {
      if (selected[t.key]) items.push({ label: t.label, price: t.pricing[vehicleType] });
    });
    PREMIUM_SERVICES.forEach((p) => {
      if (selected[p.key]) items.push({ label: p.label, price: p.price, note: p.note });
    });
    EXTRA_SERVICES.forEach((e) => {
      if (selected[e.key]) items.push({ label: e.label, price: e.price });
    });
    return items;
  }, [selected, vehicleType]);

  const total = lineItems.reduce((sum, i) => sum + (i.price || 0), 0);
  const hasQuoteItems = lineItems.some((i) => i.price == null);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-[#f8f6f1] text-[#1c2024] min-h-screen flex flex-col">
      <RedesignNav />
      <main className="flex-1 pb-24 lg:pb-0">
        <div className="px-6 pt-14 pb-10 text-center">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>Book A Service</span>
          <h1 style={fraunces} className="text-3xl sm:text-4xl font-semibold text-[#13242c] mt-3">Book Now</h1>
          <p className="text-[#6b7278] mt-3 max-w-xl mx-auto text-sm">
            Pick your vehicle type and services to see your estimate update live as you go.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-20 grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* LEFT: form */}
          <div className="flex flex-col gap-8">
            {/* Vehicle type */}
            <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${border}` }}>
              <div className="text-xs font-bold uppercase tracking-wide text-[#6b7278] mb-3">Step 1 &middot; Vehicle Type *</div>
              <div className="grid grid-cols-3 gap-3">
                {VEHICLE_TYPES.map((v) => (
                  <button
                    key={v.key}
                    onClick={() => setVehicleType(v.key)}
                    className="rounded-xl py-3 text-sm font-semibold transition-colors"
                    style={
                      vehicleType === v.key
                        ? { backgroundColor: navy, color: "#fff" }
                        : { backgroundColor: "#fff", color: "#4a5056", border: `1px solid ${border}` }
                    }
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${border}` }}>
              <div className="text-xs font-bold uppercase tracking-wide text-[#6b7278] mb-3">Select Location *</div>
              <div className="flex gap-3">
                {["Midland", "Myaree"].map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocation(loc)}
                    className="px-5 py-2 rounded-full text-sm font-semibold transition-colors"
                    style={
                      location === loc
                        ? { backgroundColor: navy, color: "#fff" }
                        : { backgroundColor: "#fff", color: "#4a5056", border: `1px solid ${border}` }
                    }
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Wash & Detail tiers */}
            <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${border}` }}>
              <div className="text-xs font-bold uppercase tracking-wide text-[#6b7278] mb-3">Wash &amp; Detail</div>
              <div className="flex flex-col gap-1">
                {TIER_SERVICES.map((t) => (
                  <label key={t.key} className="flex items-center justify-between gap-3 py-2.5 cursor-pointer" style={{ borderTop: `1px solid ${border}` }}>
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!selected[t.key]}
                        onChange={() => toggle(t.key)}
                        className="w-4 h-4 shrink-0"
                        style={{ accentColor: accent }}
                      />
                      <span className="text-sm">
                        <span className={selected[t.key] ? "font-semibold" : ""} style={selected[t.key] ? { color: navy } : {}}>{t.label}</span>
                        {t.tagline && <span className="block text-xs text-[#8a8f94]">{t.tagline}</span>}
                      </span>
                    </span>
                    <span className="text-sm font-semibold shrink-0" style={{ color: accent }}>{fmt(t.pricing[vehicleType])}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ultra Premium */}
            <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${border}` }}>
              <div className="text-xs font-bold uppercase tracking-wide text-[#6b7278] mb-3">Ultra Premium Finishes</div>
              <div className="flex flex-col gap-1">
                {PREMIUM_SERVICES.map((p) => (
                  <label key={p.key} className="flex items-center justify-between gap-3 py-2.5 cursor-pointer" style={{ borderTop: `1px solid ${border}` }}>
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!selected[p.key]}
                        onChange={() => toggle(p.key)}
                        className="w-4 h-4 shrink-0"
                        style={{ accentColor: accent }}
                      />
                      <span className="text-sm">
                        <span className={selected[p.key] ? "font-semibold" : ""} style={selected[p.key] ? { color: navy } : {}}>{p.label}</span>
                        {p.note && <span className="block text-xs text-[#8a8f94]">{p.note}</span>}
                      </span>
                    </span>
                    <span className="text-sm font-semibold shrink-0" style={{ color: accent }}>
                      {p.price != null ? `From ${fmt(p.price)}` : "Quote in-store"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${border}` }}>
              <div className="text-xs font-bold uppercase tracking-wide text-[#6b7278] mb-3">Touch Up Extras</div>
              <div className="flex flex-col gap-1">
                {EXTRA_SERVICES.map((e) => (
                  <label key={e.key} className="flex items-center justify-between gap-3 py-2.5 cursor-pointer" style={{ borderTop: `1px solid ${border}` }}>
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!selected[e.key]}
                        onChange={() => toggle(e.key)}
                        className="w-4 h-4 shrink-0"
                        style={{ accentColor: accent }}
                      />
                      <span className={`text-sm ${selected[e.key] ? "font-semibold" : ""}`} style={selected[e.key] ? { color: navy } : {}}>{e.label}</span>
                    </span>
                    <span className="text-sm font-semibold shrink-0" style={{ color: accent }}>From {fmt(e.price)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Vehicle + date/time + contact */}
            <div className="bg-white rounded-2xl p-6 flex flex-col gap-5" style={{ border: `1px solid ${border}` }}>
              <div className="text-xs font-bold uppercase tracking-wide text-[#6b7278]">Your Details</div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Vehicle Registration *</label>
                <input type="text" placeholder="Enter vehicle registration" className="w-full rounded-lg px-3 py-2.5 text-sm uppercase placeholder:normal-case" style={{ border: `1px solid ${border}` }} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Date *</label>
                  <input type="date" className="w-full rounded-lg px-3 py-2.5 text-sm" style={{ border: `1px solid ${border}` }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Time *</label>
                  <select className="w-full rounded-lg px-3 py-2.5 text-sm" style={{ border: `1px solid ${border}` }}>
                    <option>--Select Time</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Name *</label>
                <input type="text" placeholder="Name" className="w-full rounded-lg px-3 py-2.5 text-sm" style={{ border: `1px solid ${border}` }} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email *</label>
                  <input type="email" placeholder="Email" className="w-full rounded-lg px-3 py-2.5 text-sm" style={{ border: `1px solid ${border}` }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone *</label>
                  <input type="tel" placeholder="Mobile Number" className="w-full rounded-lg px-3 py-2.5 text-sm" style={{ border: `1px solid ${border}` }} />
                </div>
              </div>
              <label className="flex items-start gap-2 text-xs text-[#6b7278] cursor-pointer">
                <input type="checkbox" className="w-4 h-4 mt-0.5 shrink-0" style={{ accentColor: accent }} />
                I would like to receive promotional offers and updates from Car Saloon via SMS and email.
              </label>
              <p className="text-xs" style={{ color: "#b2721c" }}>
                <span className="font-semibold">Note:</span> Please remove all valuables from your car before drop-off.
              </p>
            </div>
          </div>

          {/* RIGHT: sticky summary (desktop only — mobile uses the fixed bottom bar below) */}
          <div className="hidden lg:block lg:sticky lg:top-24 self-start w-full">
            <div className="bg-white rounded-2xl p-6 flex flex-col gap-4" style={{ border: `1px solid ${border}` }}>
              <h2 style={fraunces} className="text-lg font-semibold text-[#13242c]">Your Estimate</h2>

              {lineItems.length === 0 ? (
                <p className="text-sm text-[#8a8f94]">Select services to see your estimate build up here.</p>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {lineItems.map((i) => (
                    <div key={i.label} className="flex items-start justify-between gap-3 text-sm">
                      <span className="flex items-start gap-2 text-[#4a5056]">
                        <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                        {i.label}
                      </span>
                      <span className="font-semibold shrink-0" style={{ color: i.price == null ? "#b2721c" : navy }}>
                        {i.price != null ? fmt(i.price) : "Quote"}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 flex items-center justify-between" style={{ borderTop: `1px solid ${border}` }}>
                <span style={fraunces} className="text-base font-semibold text-[#13242c]">Estimated Minimum Total</span>
                <span style={fraunces} className="text-xl font-semibold" style={{ color: accent }}>{fmt(total)}</span>
              </div>
              {hasQuoteItems && (
                <p className="text-xs text-[#8a8f94] -mt-2">
                  Items marked "Quote" need an in-person look and aren't included in this total.
                </p>
              )}

              <button
                className="mt-1 w-full py-3 rounded-full font-semibold text-sm text-white"
                style={{ backgroundColor: navy }}
              >
                Book Now
              </button>
              <p className="text-[11px] text-[#8a8f94] text-center -mt-2">Final price confirmed in-store.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile-only sticky estimate bar, fixed to the bottom of the viewport */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        {mobileSummaryOpen && (
          <div
            className="bg-white px-5 pt-4 pb-2 max-h-[60vh] overflow-y-auto"
            style={{ borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}
          >
            {lineItems.length === 0 ? (
              <p className="text-sm text-[#8a8f94] pb-3">Select services to see your estimate build up here.</p>
            ) : (
              <div className="flex flex-col gap-2.5 pb-3">
                {lineItems.map((i) => (
                  <div key={i.label} className="flex items-start justify-between gap-3 text-sm">
                    <span className="flex items-start gap-2 text-[#4a5056]">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                      {i.label}
                    </span>
                    <span className="font-semibold shrink-0" style={{ color: i.price == null ? "#b2721c" : navy }}>
                      {i.price != null ? fmt(i.price) : "Quote"}
                    </span>
                  </div>
                ))}
                {hasQuoteItems && (
                  <p className="text-xs text-[#8a8f94] pt-1">
                    Items marked "Quote" need an in-person look and aren't included in this total.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
        <div
          className="w-full bg-white px-5 py-3 flex items-center justify-between gap-3"
          style={{ borderTop: mobileSummaryOpen ? "none" : `1px solid ${border}`, boxShadow: "0 -4px 12px rgba(10,59,77,0.08)" }}
        >
          <button
            onClick={() => setMobileSummaryOpen((o) => !o)}
            className="flex items-center gap-1.5 text-left"
          >
            <span style={fraunces} className="text-base font-semibold text-[#13242c]">{fmt(total)}</span>
            <span className="text-xs text-[#8a8f94]">est. min</span>
            {mobileSummaryOpen ? (
              <ChevronDown className="w-4 h-4 text-[#8a8f94]" />
            ) : (
              <ChevronUp className="w-4 h-4 text-[#8a8f94]" />
            )}
          </button>
          <button
            className="px-6 py-2.5 rounded-full font-semibold text-sm text-white shrink-0"
            style={{ backgroundColor: navy }}
          >
            Book Now
          </button>
        </div>
      </div>

      <RedesignFooter />
    </div>
  );
};

export default MockupBookingForm;
