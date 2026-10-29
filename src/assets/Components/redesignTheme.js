import { useEffect } from "react";

// Shared design tokens for the Concept B ("Daylight Showroom") redesign
// preview pages — every /new-* page uses these so the look stays
// consistent without copy-pasting the same values everywhere.
export const accent = "#0a7fa6";
export const navy = "#0a3b4d";
export const cream = "#f8f6f1";
export const creamDark = "#f1ece2";
export const border = "#e7e2d8";
export const fraunces = { fontFamily: "'Fraunces', serif" };
export const inter = { fontFamily: "'Inter', system-ui, sans-serif" };

// Loads the design's two fonts only while a /new-* page is mounted —
// doesn't touch index.html, so the rest of the site is completely
// unaffected by these preview pages existing.
export const useGoogleFont = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);
};
