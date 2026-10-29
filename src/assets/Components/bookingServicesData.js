import serviceTierData from "./serviceTierData";

// Only 6 of the 8 wash & detail tiers are bookable through the form —
// Mini Detail and Interior Detail were never part of the old form's
// service list (the backend doesn't recognize those names yet), so the
// redesigned form keeps that same set rather than risking a silent
// booking failure on an unrecognized service name.
const BOOKABLE_TIER_KEYS = ["outside", "inside_outside", "premium_wash", "full_detail", "signature_detail", "the_works"];

// Pricing comes straight from serviceTierData.js so this always matches
// the tier pages. `submitLabel` is what gets sent to the backend — for
// these 6 it's identical to the display title.
export const TIER_SERVICES = BOOKABLE_TIER_KEYS.map((key) => {
  const tier = serviceTierData[key];
  return {
    key,
    label: tier.title,
    submitLabel: tier.title,
    tagline: tier.tagline || null,
    pricing: tier.pricing,
  };
});

// Ultra Premium Finishes — flat prices (not vehicle-type dependent).
// Ceramic Coating and Window Tinting don't have a fixed price, so they're
// excluded from the running total and flagged as "quote in-store".
// `submitLabel` matches the exact string the backend expects, which in a
// couple of cases differs from the nicer display label used on-site.
export const PREMIUM_SERVICES = [
  { key: "ceramic_coating", label: "Ceramic Coating", submitLabel: "Ceramic Coating", price: null, note: "In-person inspection required" },
  { key: "interior_protection_pack", label: "Interior Protection Pack", submitLabel: "Interior Protection Pack", price: 299 },
  { key: "window_tinting", label: "Window Tinting", submitLabel: "Windows Tinting", price: null, note: "Price on request" },
  { key: "paintless_dent_removal", label: "Paintless Dent Removal", submitLabel: "Paintless Dent Removal", price: 199 },
];

// Touch Up Extras — flat prices, same for every vehicle type.
export const EXTRA_SERVICES = [
  { key: "stage3_paint_correction", label: "Stage 3 Paint Correction", submitLabel: "Stage 3 Paint Correction", price: 399 },
  { key: "buff_polish", label: "Buff & Polish", submitLabel: "Buff and Polish", price: 179 },
  { key: "headlight_restoration", label: "Headlight Restoration", submitLabel: "Head Light Restoration", price: 50 },
  { key: "leather_steam_clean", label: "Leather Clean & Steam Clean", submitLabel: "Leather Clean/Seats Steam Clean", price: 70 },
  { key: "dog_hair_removal", label: "Dog Hair Removal", submitLabel: "Dog Hair Removal", price: 50 },
  { key: "bull_bar_polish", label: "Bull Bar Polish", submitLabel: "Bull Bar Polish", price: 149 },
];

// Services that need a heads-up about pricing as soon as they're selected,
// not just before submit — matches the old form's SERVICE_NOTICES.
export const SERVICE_NOTICES = {
  ceramic_coating: "In-person inspection required to confirm exact price.",
  window_tinting: "A range of tint films is available, and pricing depends on the film you choose. Visit us in-store for a quote.",
};
