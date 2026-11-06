import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSeoForPath, SITE_NAME } from "./seoData";

const SITE_URL = "https://carsaloon.com.au";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

function upsertMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Pages that shouldn't compete with the live site in search results: the
// /new-* redesign preview (not launched yet), /mockup-* prototype pages,
// and the owner-only admin panel.
function isNoIndexPath(pathname) {
  const lower = pathname.toLowerCase();
  return lower.startsWith("/new-") || lower.startsWith("/mockup-") || lower.startsWith("/admin-panel");
}

// Sets document.title + meta description + Open Graph/Twitter tags +
// robots/canonical on every route change, from the lookup table in seoData.js.
const SEOManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description } = getSeoForPath(pathname);
    // Canonical is always the lowercase path, so /Extras and /extras don't
    // compete as duplicate pages.
    const url = `${SITE_URL}${pathname.toLowerCase()}`;
    const noIndex = isNoIndexPath(pathname);

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");

    if (noIndex) {
      // A noindex page carries no canonical — it isn't meant to be the
      // "real" URL for anything.
      document.querySelector('link[rel="canonical"]')?.remove();
    } else {
      upsertLink("canonical", url);
    }

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:image", OG_IMAGE);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", OG_IMAGE);
  }, [pathname]);

  return null;
};

export default SEOManager;
