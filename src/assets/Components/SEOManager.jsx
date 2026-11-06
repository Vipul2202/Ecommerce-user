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

// Sets document.title + meta description + Open Graph/Twitter tags on every
// route change, from the lookup table in seoData.js.
const SEOManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description } = getSeoForPath(pathname);
    const url = `${SITE_URL}${pathname}`;

    document.title = title;
    upsertMeta("name", "description", description);

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
