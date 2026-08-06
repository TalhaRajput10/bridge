import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getAllStaticRoutes,
  getIndexableRoutes,
  getSeoForPath,
  SITE_URL,
} from "../src/seo/siteSeo.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "dist");
const failures = [];
const discoveredTitles = new Map();
const discoveredCanonicals = new Map();

function outputPathForRoute(route) {
  return route === "/"
    ? path.join(outputDirectory, "index.html")
    : path.join(outputDirectory, ...route.slice(1).split("/"), "index.html");
}

function expect(condition, message) {
  if (!condition) failures.push(message);
}

function escapeAttribute(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

for (const route of getAllStaticRoutes()) {
  const seo = getSeoForPath(route);
  let html = "";
  try {
    html = await readFile(outputPathForRoute(route), "utf8");
  } catch {
    failures.push(`${route}: pre-rendered file is missing`);
    continue;
  }

  expect(html.includes(`<title>${seo.title}</title>`), `${route}: title is missing or incorrect`);
  expect(html.includes(`content="${escapeAttribute(seo.description)}"`), `${route}: description is missing or incorrect`);
  expect(html.includes(`rel="canonical" href="${seo.canonical}"`), `${route}: canonical URL is missing or incorrect`);
  expect(html.includes('property="og:title"'), `${route}: Open Graph title is missing`);
  expect(html.includes('name="twitter:card"'), `${route}: Twitter card metadata is missing`);
  expect(html.includes(`data-prerendered-route="${route}"`), `${route}: static crawler content is missing`);
  expect(/<h1>[\s\S]*?<\/h1>/i.test(html), `${route}: static H1 is missing`);
  expect(!html.includes("bridge-project"), `${route}: legacy title remains in output`);

  if (discoveredTitles.has(seo.title)) {
    failures.push(`${route}: title duplicates ${discoveredTitles.get(seo.title)}`);
  } else {
    discoveredTitles.set(seo.title, route);
  }
  if (discoveredCanonicals.has(seo.canonical)) {
    failures.push(`${route}: canonical duplicates ${discoveredCanonicals.get(seo.canonical)}`);
  } else {
    discoveredCanonicals.set(seo.canonical, route);
  }

  const structuredMatch = html.match(/<script id="bridge-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  expect(Boolean(structuredMatch), `${route}: structured data is missing`);
  if (structuredMatch) {
    try {
      JSON.parse(structuredMatch[1]);
    } catch {
      failures.push(`${route}: structured data is not valid JSON`);
    }
  }

  if (["/auth", "/account"].includes(route)) {
    expect(html.includes('name="robots" content="noindex,nofollow"'), `${route}: private page is not marked noindex`);
  } else {
    expect(html.includes('name="robots" content="index,follow'), `${route}: public page is not indexable`);
  }
}

const sitemap = await readFile(path.join(outputDirectory, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const expectedUrls = getIndexableRoutes().map((route) => route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`);
expect(sitemapUrls.length === expectedUrls.length, `Sitemap contains ${sitemapUrls.length} URLs instead of ${expectedUrls.length}`);
expect(new Set(sitemapUrls).size === sitemapUrls.length, "Sitemap contains duplicate URLs");
for (const url of expectedUrls) expect(sitemapUrls.includes(url), `Sitemap is missing ${url}`);

const robots = await readFile(path.join(outputDirectory, "robots.txt"), "utf8");
expect(robots.startsWith("User-agent: *"), "robots.txt is not a real robots file");
expect(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), "robots.txt does not reference the sitemap");
expect(robots.includes("Disallow: /auth"), "robots.txt does not protect the auth route");
expect(robots.includes("Disallow: /account"), "robots.txt does not protect the account route");

const notFoundHtml = await readFile(path.join(outputDirectory, "404.html"), "utf8");
expect(notFoundHtml.includes("Page Not Found | BRIDGE"), "404 page has the wrong title");
expect(notFoundHtml.includes('name="robots" content="noindex,nofollow"'), "404 page is not marked noindex");
expect(notFoundHtml.includes("Page not found"), "404 page lacks a crawler-readable message");

const wranglerConfig = await readFile(path.join(projectRoot, "wrangler.jsonc"), "utf8");
expect(wranglerConfig.includes('"directory": "./dist/"'), "Cloudflare is not configured to serve the generated dist directory");
expect(wranglerConfig.includes('"not_found_handling": "404-page"'), "Cloudflare is not configured for pre-rendered SSG routes");
expect(wranglerConfig.includes('"html_handling": "drop-trailing-slash"'), "Cloudflare clean-URL handling does not match canonical URLs");

if (failures.length) {
  console.error("BRIDGE SEO audit failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("BRIDGE SEO audit passed.");
console.log(`${expectedUrls.length} indexable URLs | ${getAllStaticRoutes().length} pre-rendered routes | valid metadata and structured data`);
