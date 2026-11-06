// Per-route SEO metadata (title + description), keyed by exact pathname.
// Used by SEOManager to set document.title and meta tags on every
// navigation. Keep titles under ~60 chars and descriptions under ~160
// chars where practical — real, specific copy, not placeholders.

const SITE_NAME = "Car Saloon";
const DEFAULT_TITLE = "Car Saloon | Car Wash & Detailing in Myaree & Midland, Perth";
const DEFAULT_DESCRIPTION =
  "Car wash, detailing, GTechniq ceramic coating and window tinting in Perth. Walk-ins welcome at our Myaree and Midland studios — no booking required.";

const seoData = {
  // ---- Old site ----
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  "/contact": {
    title: "Contact Us | Car Saloon Perth",
    description: "Contact Car Saloon's Myaree and Midland car wash & detailing studios — phone, email, opening hours and directions.",
  },
  "/booking": {
    title: "Book a Car Wash or Detail Online | Car Saloon Perth",
    description: "Book your car wash, detail, ceramic coating or window tinting appointment online at Car Saloon Myaree or Midland in under a minute.",
  },
  "/extras": {
    title: "Add On Enhancements | Car Saloon Perth",
    description: "Stage 3 paint correction, buff & polish, headlight restoration, leather steam clean, dog hair removal and more detailing add-ons in Perth.",
  },
  "/ultrapremium": {
    title: "Ultra Premium Finishes | Ceramic Coating & Tinting | Car Saloon",
    description: "GTechniq-certified ceramic coating, window tinting, interior protection and paintless dent removal at Car Saloon's Perth studios.",
  },
  "/detailing": {
    title: "Car Detailing Services | Car Saloon Perth",
    description: "Professional interior and exterior car detailing in Myaree and Midland, Perth. Full Detail, Signature Detail and The Works packages available.",
  },
  "/washing": {
    title: "Car Wash Services | Car Saloon Perth",
    description: "Outside Only, Inside & Out, and Premium Wash packages at Car Saloon's Myaree and Midland studios in Perth. Walk-ins welcome.",
  },
  "/about": {
    title: "About Car Saloon | Perth Car Detailing Since 2015",
    description: "Car Saloon has been detailing cars with genuine care since 2015. Limited daily bookings, quality products and experienced professionals in Perth.",
  },
  "/gallery": {
    title: "Before & After Gallery | Car Saloon Perth",
    description: "See the results — before and after photos of our car wash, detailing and ceramic coating work at Car Saloon Perth.",
  },
  "/confirmation": {
    title: "Booking Confirmed | Car Saloon",
    description: "Your Car Saloon booking has been received.",
  },
  "/my-orders": {
    title: "My Bookings | Car Saloon",
    description: "View and manage your Car Saloon bookings.",
  },
  "/outside": {
    title: "Outside Only Car Wash – From $35 | Car Saloon Perth",
    description: "Exterior wash, chamois dry, wheel clean and spray wax from $35. Book Car Saloon's Outside Only wash in Myaree or Midland, Perth.",
  },
  "/inside_outside": {
    title: "Inside & Out Car Wash – From $55 | Car Saloon Perth",
    description: "Full interior and exterior wash with vacuuming and window cleaning, from $55. Book online at Car Saloon Perth.",
  },
  "/premium_wash": {
    title: "Premium Wash – From $95 | Car Saloon Perth",
    description: "Dash detailing, trim rejuvenation and hand wax & polish from $95. Book Car Saloon's Premium Wash in Perth.",
  },
  "/mini_detail": {
    title: "Mini Detail – From $149 | Car Saloon Perth",
    description: "A deeper clean with claybar paint treatment, interior trims detailed and leather seats cleaned, from $149. Book at Car Saloon Perth.",
  },
  "/interior_detail": {
    title: "Interior Detail – From $229 | Car Saloon Perth",
    description: "Full interior reset — carpets steam cleaned, roof lining steam cleaned and odour elimination treatment, from $229. Book at Car Saloon.",
  },
  "/full_detail": {
    title: "Full Detail – From $175 | Car Saloon Perth",
    description: "Outside wash & wax, interior trims detailed, fabric steam clean and leather conditioning from $175. Book Car Saloon's Full Detail.",
  },
  "/signature_detail": {
    title: "Signature Detail – From $275 | Car Saloon Perth",
    description: "Everything in Full Detail plus headlight restoration, engine bay degrease and hand polish, from $275. Book at Car Saloon Perth.",
  },
  "/the_works": {
    title: "The Works – From $349 | Car Saloon Perth",
    description: "Our most complete detail: everything in Signature Detail plus buff & polish and underbody clean, from $349. Book at Car Saloon.",
  },
  "/terms": {
    title: "Terms of Use | Car Saloon",
    description: "Terms of use for Car Saloon's website and services.",
  },
  "/faqs": {
    title: "FAQs | Car Saloon Perth",
    description: "Frequently asked questions about Car Saloon's car wash and detailing services in Perth.",
  },
  "/privacy": {
    title: "Privacy Policy | Car Saloon",
    description: "Car Saloon's privacy policy — how we collect, use and protect your information.",
  },
  "/promotional-terms": {
    title: "Offer Terms & Conditions | Car Saloon",
    description: "Terms and conditions for Car Saloon's current promotional offers.",
  },

  // ---- New site (redesign preview) ----
  "/new-home": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  "/new-outside": {
    title: "Outside Only Car Wash – From $35 | Car Saloon Perth",
    description: "Exterior wash, chamois dry, wheel clean and spray wax from $35. Book Car Saloon's Outside Only wash in Myaree or Midland, Perth.",
  },
  "/new-inside_outside": {
    title: "Inside & Out Car Wash – From $55 | Car Saloon Perth",
    description: "Full interior and exterior wash with vacuuming and window cleaning, from $55. Book online at Car Saloon Perth.",
  },
  "/new-premium_wash": {
    title: "Premium Wash – From $95 | Car Saloon Perth",
    description: "Dash detailing, trim rejuvenation and hand wax & polish from $95. Book Car Saloon's Premium Wash in Perth.",
  },
  "/new-mini_detail": {
    title: "Mini Detail – From $149 | Car Saloon Perth",
    description: "A deeper clean with claybar paint treatment, interior trims detailed and leather seats cleaned, from $149. Book at Car Saloon Perth.",
  },
  "/new-interior_detail": {
    title: "Interior Detail – From $229 | Car Saloon Perth",
    description: "Full interior reset — carpets steam cleaned, roof lining steam cleaned and odour elimination treatment, from $229. Book at Car Saloon.",
  },
  "/new-full_detail": {
    title: "Full Detail – From $175 | Car Saloon Perth",
    description: "Outside wash & wax, interior trims detailed, fabric steam clean and leather conditioning from $175. Book Car Saloon's Full Detail.",
  },
  "/new-signature_detail": {
    title: "Signature Detail – From $275 | Car Saloon Perth",
    description: "Everything in Full Detail plus headlight restoration, engine bay degrease and hand polish, from $275. Book at Car Saloon Perth.",
  },
  "/new-the_works": {
    title: "The Works – From $349 | Car Saloon Perth",
    description: "Our most complete detail: everything in Signature Detail plus buff & polish and underbody clean, from $349. Book at Car Saloon.",
  },
  "/new-gallery": {
    title: "Before & After Gallery | Car Saloon Perth",
    description: "See the results — before and after photos of our car wash, detailing and ceramic coating work at Car Saloon Perth.",
  },
  "/new-about": {
    title: "About Car Saloon | Perth Car Detailing Since 2015",
    description: "Car Saloon has been detailing cars with genuine care since 2015. Limited daily bookings, quality products and experienced professionals in Perth.",
  },
  "/new-contact": {
    title: "Contact Us | Car Saloon Perth",
    description: "Contact Car Saloon's Myaree and Midland car wash & detailing studios — phone, email, opening hours and directions.",
  },
  "/new-extras": {
    title: "Add On Enhancements | Car Saloon Perth",
    description: "Stage 3 paint correction, buff & polish, headlight restoration, leather steam clean, dog hair removal and more detailing add-ons in Perth.",
  },
  "/new-products": {
    title: "New Products Coming Soon | Car Saloon Perth",
    description: "Car Saloon is launching its own range of detailing products. Stay tuned for our 2027 product line.",
  },
  "/new-ultrapremium": {
    title: "Ultra Premium Finishes | Ceramic Coating & Tinting | Car Saloon",
    description: "GTechniq-certified ceramic coating, window tinting, interior protection and paintless dent removal at Car Saloon's Perth studios.",
  },
  "/new-faqs": {
    title: "FAQs | Car Saloon Perth",
    description: "Frequently asked questions about Car Saloon's car wash and detailing services in Perth.",
  },
  "/new-terms": {
    title: "Terms of Use | Car Saloon",
    description: "Terms of use for Car Saloon's website and services.",
  },
  "/new-privacy": {
    title: "Privacy Policy | Car Saloon",
    description: "Car Saloon's privacy policy — how we collect, use and protect your information.",
  },
  "/new-promotional-terms": {
    title: "Offer Terms & Conditions | Car Saloon",
    description: "Terms and conditions for Car Saloon's current promotional offers.",
  },
  "/new-booking": {
    title: "Book a Car Wash or Detail Online | Car Saloon Perth",
    description: "Book your car wash, detail, ceramic coating or window tinting appointment online at Car Saloon Myaree or Midland in under a minute.",
  },
};

// Prefix matches for dynamic routes (ids/slugs) that don't have a fixed path.
const prefixSeoData = [
  { prefix: "/car-details/", title: "Vehicle Details | Car Saloon", description: "Vehicle details for your Car Saloon order." },
  { prefix: "/manage-booking/", title: "Manage Your Booking | Car Saloon", description: "View, reschedule or cancel your Car Saloon booking." },
  { prefix: "/gallery/", title: "Before & After Gallery | Car Saloon Perth", description: "See the results — before and after photos of our car wash, detailing and ceramic coating work at Car Saloon Perth." },
  { prefix: "/new-gallery/", title: "Before & After Gallery | Car Saloon Perth", description: "See the results — before and after photos of our car wash, detailing and ceramic coating work at Car Saloon Perth." },
];

export function getSeoForPath(pathname) {
  const lower = pathname.toLowerCase();
  const exact = seoData[lower];
  if (exact) return exact;

  const prefixMatch = prefixSeoData.find((p) => lower.startsWith(p.prefix));
  if (prefixMatch) return { title: prefixMatch.title, description: prefixMatch.description };

  return { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION };
}

export { SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION };
