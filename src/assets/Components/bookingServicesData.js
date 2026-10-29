import serviceTierData from "./serviceTierData";

// The 8 wash & detail tiers — pricing comes straight from serviceTierData.js
// so the booking form always matches the tier pages, keyed by vehicle type.
export const TIER_SERVICES = Object.entries(serviceTierData).map(([key, tier]) => ({
  key,
  label: tier.title,
  tagline: tier.tagline || null,
  pricing: tier.pricing,
}));

// Ultra Premium Finishes — flat prices (not vehicle-type dependent).
// Ceramic Coating and Window Tinting don't have a fixed price, so they're
// excluded from the running total and flagged as "quote in-store".
export const PREMIUM_SERVICES = [
  { key: "ceramic_coating", label: "Ceramic Coating", price: null, note: "In-person inspection required" },
  { key: "interior_protection_pack", label: "Interior Protection Pack", price: 299 },
  { key: "window_tinting", label: "Window Tinting", price: null, note: "Price on request" },
  { key: "paintless_dent_removal", label: "Paintless Dent Removal", price: 199 },
];

// Touch Up Extras — flat prices, same for every vehicle type.
export const EXTRA_SERVICES = [
  { key: "stage3_paint_correction", label: "Stage 3 Paint Correction", price: 299 },
  { key: "buff_polish", label: "Buff & Polish", price: 179 },
  { key: "headlight_restoration", label: "Headlight Restoration", price: 50 },
  { key: "leather_steam_clean", label: "Leather Clean & Steam Clean", price: 70 },
  { key: "dog_hair_removal", label: "Dog Hair Removal", price: 50 },
  { key: "bull_bar_polish", label: "Bull Bar Polish", price: 149 },
];
