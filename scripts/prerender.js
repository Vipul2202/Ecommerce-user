// Runs automatically after `npm run build` (see package.json "postbuild").
//
// Generates fully-rendered HTML snapshots of the real, indexable pages so
// search engines and other crawlers that don't execute JavaScript see
// actual page content instead of the bare SPA shell. Regular visitors are
// unaffected - the browser still loads the same React app, which replaces
// the snapshot with its own client-rendered output once JS runs.
//
// Designed to fail safe: if Chromium can't launch, or an individual page
// fails to render, this logs a warning and leaves `dist/` untouched for
// that page rather than breaking the build. A failure here should never
// block a deploy - worst case, a page just stays SPA-only, same as today.
//
// REQUIRED nginx config change (one-time, not part of this script):
// the site's nginx server block's `location / { try_files $uri $uri/
// /index.html; }` must become:
//   try_files $uri $uri.html $uri/ /app-shell.html;
// - `$uri.html` serves a prerendered page (e.g. /about -> about.html)
//   without nginx's automatic directory-redirect, which would otherwise
//   send /about -> /about/ and break React Router's route matching.
// - `$uri/` is kept (after $uri.html) so `/` itself still resolves to
//   dist/index.html via nginx's `index` directive - it's the one path
//   with no flat .html alternative.
// - the fallback points at `/app-shell.html` (a neutral shell), not
//   `/index.html` (which is now the *homepage's* prerendered content) -
//   otherwise every non-prerendered path (dynamic routes, /new-* preview
//   pages, typos) would incorrectly inherit the homepage's title/meta.
//
// Verified end-to-end against a real nginx instance with this exact
// config (not just assumed from docs) - see PR description for details.

import { existsSync, mkdirSync, writeFileSync, copyFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, "..", "dist");
const PORT = 4571;

// Real, indexable routes - mirrors public/sitemap.xml.
const ROUTES = [
  "/",
  "/booking",
  "/washing",
  "/detailing",
  "/extras",
  "/ultrapremium",
  "/outside",
  "/inside_outside",
  "/premium_wash",
  "/mini_detail",
  "/interior_detail",
  "/full_detail",
  "/signature_detail",
  "/the_works",
  "/about",
  "/gallery",
  "/contact",
  "/faqs",
  "/terms",
  "/privacy",
  "/promotional-terms",
];

function outputPathFor(route) {
  if (route === "/") return join(DIST_DIR, "index.html");
  // Flat "<route>.html" files, not nested "<route>/index.html" - nginx's
  // `try_files` auto-redirects a directory match to add a trailing slash
  // (e.g. /about -> /about/) before serving its index.html, and that
  // redirected URL breaks React Router's route matching. A flat .html
  // file avoids that redirect entirely - see the nginx config note above.
  return join(DIST_DIR, `${route.replace(/^\//, "")}.html`);
}

function waitForServer(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      fetch(url)
        .then(() => resolve())
        .catch((err) => {
          if (Date.now() > deadline) return reject(err);
          setTimeout(tryOnce, 200);
        });
    };
    tryOnce();
  });
}

async function main() {
  if (!existsSync(DIST_DIR)) {
    console.warn("[prerender] dist/ not found, skipping prerender step.");
    return;
  }

  // Save a copy of the original (un-prerendered) SPA shell under two names:
  // - app-shell.html: what production (nginx) serves for any path with no
  //   matching file (dynamic routes like /car-details/:id, noindex preview
  //   pages, typos) via its `try_files $uri $uri.html /app-shell.html;`
  //   fallback - see the nginx config note at the top of this file.
  // - 404.html: `serve` (the package used for local verification below,
  //   and by anyone running `npx serve dist` to test this locally) only
  //   recognizes that exact filename for its own automatic SPA fallback.
  //   Without it, the routes below would hit a real 404 instead of
  //   booting the SPA, and we'd capture that error page instead of the
  //   actual rendered content.
  const shellHtml = join(DIST_DIR, "index.html");
  copyFileSync(shellHtml, join(DIST_DIR, "app-shell.html"));
  copyFileSync(shellHtml, join(DIST_DIR, "404.html"));

  // Spawn a local static server (same "serve" package used in production)
  // to render each route against, matching what a real visitor/crawler
  // would get once this dist/ folder is deployed.
  const serveProcess = spawn(
    "npx",
    ["--yes", "serve", DIST_DIR, "-l", String(PORT)],
    { stdio: "ignore" }
  );

  const cleanupServer = () => {
    try {
      serveProcess.kill();
    } catch {
      // already exited
    }
  };

  try {
    await waitForServer(`http://localhost:${PORT}/`, 20000);
  } catch (err) {
    console.warn("[prerender] Local static server didn't come up in time, skipping prerender step.");
    cleanupServer();
    return;
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  } catch (err) {
    console.warn("[prerender] Could not launch headless Chrome, skipping prerender step.");
    console.warn("[prerender] Reason:", err.message);
    console.warn("[prerender] The site will still deploy normally - pages just won't have pre-rendered HTML this time.");
    cleanupServer();
    return;
  }

  let succeeded = 0;
  let failed = 0;

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      try {
        await page.goto(`http://localhost:${PORT}${route}`, {
          waitUntil: "networkidle0",
          timeout: 20000,
        });
        // Give React a moment to finish any post-load state updates
        // (e.g. live pricing fetched after initial render).
        await new Promise((r) => setTimeout(r, 500));

        const html = await page.content();
        const outPath = outputPathFor(route);
        mkdirSync(dirname(outPath), { recursive: true });
        writeFileSync(outPath, html);
        succeeded++;
      } catch (err) {
        failed++;
        console.warn(`[prerender] Failed to prerender ${route}: ${err.message}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    cleanupServer();
  }

  console.log(`[prerender] Done: ${succeeded} page(s) prerendered, ${failed} failed.`);
}

main().catch((err) => {
  console.warn("[prerender] Unexpected error, skipping prerender step:", err.message);
});
