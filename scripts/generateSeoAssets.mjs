import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collections } from "../src/data/collections.js";
import { journeyCards } from "../src/data/journeyCards.js";
import { externalResources } from "../src/data/resources.js";
import { faqGroups } from "../src/data/faqs.js";
import { guideCategories, guides } from "../src/data/guides.js";
import {
  getAllStaticRoutes,
  getIndexableRoutes,
  getSeoForPath,
  getStructuredDataForPath,
  SITE_NAME,
  SITE_URL,
} from "../src/seo/siteSeo.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDirectory = path.join(projectRoot, "public");
const outputDirectory = path.join(projectRoot, "dist");
const publicOnly = process.argv.includes("--public-only");
const distOnly = process.argv.includes("--dist-only");

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeXml(value = "") {
  return escapeHtml(value);
}

function absoluteUrl(route) {
  return route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
}

function renderLink(route, label) {
  return `<li><a href="${escapeHtml(route)}">${escapeHtml(label)}</a></li>`;
}

function renderStaticContent(route) {
  const seo = getSeoForPath(route);
  const sharedHeader = `<header><a href="/" aria-label="BRIDGE CST home">${SITE_NAME}</a><nav aria-label="Primary"><a href="/">Home</a> <a href="/search">Search</a> <a href="/guides">Guides</a> <a href="/resources">Resources</a> <a href="/faq">FAQ</a> <a href="/about">About</a></nav></header>`;

  if (seo.pageKind === "home") {
    return `<main id="main-content" class="seo-static-fallback" data-prerendered-route="/">
      ${sharedHeader}
      <p>A free customer-support career platform</p>
      <h1>Build the skills. Bridge the gap.</h1>
      <p>${escapeHtml(seo.description)}</p>
      <p><a href="/cards/what-customer-support-means">Start your journey</a></p>
      <section aria-labelledby="static-collections"><h2 id="static-collections">Customer support learning collections</h2><ul>
        ${collections.map((collection) => renderLink(`/collections/${collection.id}`, collection.title)).join("\n")}
      </ul></section>
      <section><h2>Learn, practise, and build interview confidence</h2><p>Each Journey Card explains one practical skill, presents a realistic customer scenario, includes a Practice Lab, and connects the lesson to interview preparation.</p></section>
      <section><h2>Customer support career guides</h2><p>Read original guidance about applications, interviews, BPO campaigns, support industries, and technical skills.</p><p><a href="/guides">Browse BRIDGE CST Guides</a></p></section>
      <section><h2>Frequently asked questions</h2><dl>${faqGroups[0].items.map((item) => `<dt>${escapeHtml(item.question)}</dt><dd>${escapeHtml(item.answer)}</dd>`).join("\n")}</dl><p><a href="/faq">Read every FAQ</a></p></section>
    </main>`;
  }

  if (seo.pageKind === "resources") {
    return `<main id="main-content" class="seo-static-fallback" data-prerendered-route="${escapeHtml(route)}">
      ${sharedHeader}
      <p>The BRIDGE CST resource shelf</p>
      <h1>Free customer support tools and career resources</h1>
      <p>${escapeHtml(seo.description)}</p>
      <section><h2>Browse the resource library</h2><ul>
        ${externalResources.map((resource) => `<li><a href="${escapeHtml(resource.url)}" rel="noreferrer">${escapeHtml(resource.title)}</a> — ${escapeHtml(resource.description)}</li>`).join("\n")}
      </ul></section>
    </main>`;
  }

  if (seo.pageKind === "guides") {
    return `<main id="main-content" class="seo-static-fallback" data-prerendered-route="${escapeHtml(route)}">
      ${sharedHeader}
      <p>BRIDGE CST Guides</p>
      <h1>Practical customer support career guides</h1>
      <p>${escapeHtml(seo.description)}</p>
      ${guideCategories.map((category) => `<section><h2>${escapeHtml(category.label)}</h2><ul>${guides.filter((guide) => guide.category === category.id).map((guide) => `<li><a href="/guides/${escapeHtml(guide.id)}">${escapeHtml(guide.title)}</a> — ${escapeHtml(guide.excerpt)}</li>`).join("\n")}</ul></section>`).join("\n")}
    </main>`;
  }

  if (seo.pageKind === "guide") {
    return `<main id="main-content" class="seo-static-fallback" data-prerendered-route="${escapeHtml(route)}">
      ${sharedHeader}
      <p><a href="/guides">Guides</a> / ${escapeHtml(guideCategories.find((category) => category.id === seo.guide.category)?.label || "Customer support")}</p>
      <article>
        <h1>${escapeHtml(seo.guide.title)}</h1>
        <p>${escapeHtml(seo.guide.excerpt)}</p>
        <p>${escapeHtml(seo.guide.readingTime)} minute read · By Talha Rajput</p>
        ${seo.guide.sections.map((section) => `<section><h2>${escapeHtml(section.heading)}</h2>${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n")}${section.bullets ? `<ul>${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("\n")}</ul>` : ""}</section>`).join("\n")}
        ${seo.guide.externalLinks?.length ? `<section><h2>Useful resources</h2><ul>${seo.guide.externalLinks.map((link) => `<li><a href="${escapeHtml(link.url)}" rel="noreferrer">${escapeHtml(link.label)}</a></li>`).join("\n")}</ul></section>` : ""}
        <section><h2>Key takeaway</h2><p>${escapeHtml(seo.guide.takeaway)}</p></section>
        <section><h2>Related Journey Cards</h2><ul>${seo.guide.relatedCardIds.map((id) => { const card = journeyCards.find((item) => item.id === id); return card ? renderLink(`/cards/${card.id}`, card.title) : ""; }).join("\n")}</ul></section>
      </article>
    </main>`;
  }

  if (seo.pageKind === "faq") {
    return `<main id="main-content" class="seo-static-fallback" data-prerendered-route="${escapeHtml(route)}">
      ${sharedHeader}
      <p>BRIDGE CST FAQ</p><h1>Customer support training questions and answers</h1><p>${escapeHtml(seo.description)}</p>
      ${faqGroups.map((group) => `<section><h2>${escapeHtml(group.title)}</h2><dl>${group.items.map((item) => `<dt>${escapeHtml(item.question)}</dt><dd>${escapeHtml(item.answer)}</dd>`).join("\n")}</dl></section>`).join("\n")}
    </main>`;
  }

  if (seo.pageKind === "search") {
    return `<main id="main-content" class="seo-static-fallback" data-prerendered-route="${escapeHtml(route)}">
      ${sharedHeader}
      <p>All 64 Journey Cards</p><h1>Search customer support Journey Cards</h1><p>${escapeHtml(seo.description)}</p>
      ${collections.map((collection) => `<section><h2>${escapeHtml(collection.title)}</h2><ul>${journeyCards.filter((card) => card.collectionId === collection.id).map((card) => renderLink(`/cards/${card.id}`, card.title)).join("\n")}</ul></section>`).join("\n")}
    </main>`;
  }

  if (seo.pageKind === "about") {
    return `<main id="main-content" class="seo-static-fallback" data-prerendered-route="${escapeHtml(route)}">
      ${sharedHeader}
      <p>Why BRIDGE CST exists</p><h1>Customer support deserves a clearer starting point</h1><p>${escapeHtml(seo.description)}</p>
      <section><h2>Built from real support work</h2><p>Talha Rajput created BRIDGE CST for beginners and early-career professionals, especially Pakistan-based learners pursuing global customer support careers.</p></section>
      <section><h2>Practical, accessible, and honest</h2><p>Journey Cards combine plain-language lessons, realistic situations, Practice Labs, and interview connections without promising effortless outcomes.</p></section>
      <section><h2>Product ownership and assistance</h2><p>The original concept, product direction, curriculum decisions, and final editorial judgment belong to Talha Rajput. AI tools supported drafting, code assistance, research organization, and quality checks as project assistants.</p></section>
    </main>`;
  }

  if (seo.pageKind === "collection") {
    const cards = journeyCards.filter((card) => card.collectionId === seo.collection.id);
    return `<main id="main-content" class="seo-static-fallback" data-prerendered-route="${escapeHtml(route)}">
      ${sharedHeader}
      <p><a href="/">BRIDGE CST</a> / Collection ${escapeHtml(seo.collection.number)}</p>
      <h1>${escapeHtml(seo.collection.title)} customer support training</h1>
      <p>${escapeHtml(seo.description)}</p>
      <section><h2>${cards.length} practical Journey Cards</h2><ol>
        ${cards.map((card) => renderLink(`/cards/${card.id}`, card.title)).join("\n")}
      </ol></section>
    </main>`;
  }

  if (seo.pageKind === "card") {
    const collectionCards = journeyCards.filter((card) => card.collectionId === seo.card.collectionId);
    const cardPosition = collectionCards.findIndex((card) => card.id === seo.card.id);
    const previous = cardPosition > 0 ? collectionCards[cardPosition - 1] : null;
    const next = cardPosition >= 0 && cardPosition < collectionCards.length - 1
      ? collectionCards[cardPosition + 1]
      : null;
    const collectionIndex = collections.findIndex((collection) => collection.id === seo.card.collectionId);
    const nextCollection = collectionIndex >= 0 && collectionIndex < collections.length - 1
      ? collections[collectionIndex + 1]
      : null;
    return `<main id="main-content" class="seo-static-fallback" data-prerendered-route="${escapeHtml(route)}">
      ${sharedHeader}
      <p><a href="/collections/${escapeHtml(seo.card.collectionId)}">${escapeHtml(seo.collection?.title || "Journey Cards")}</a> / Journey Card ${escapeHtml(seo.card.number)}</p>
      <h1>${escapeHtml(seo.card.title)}</h1>
      <p>${escapeHtml(seo.card.description)}</p>
      <p>${escapeHtml(seo.card.difficulty)} · ${escapeHtml(seo.card.duration)}</p>
      <section><h2>${escapeHtml(seo.card.skillTitle || "Skill you'll build")}</h2><p>${escapeHtml(seo.card.skill)}</p></section>
      <section><h2>${escapeHtml(seo.card.lessonTitle || "Learn")}</h2><p>${escapeHtml(seo.card.lesson)}</p></section>
      <section><h2>${escapeHtml(seo.card.scenarioTitle || "Real support scenario")}</h2><p>${escapeHtml(seo.card.scenario)}</p></section>
      <section><h2>${escapeHtml(seo.card.practiceTitle || "Practice Lab")}</h2><p>${escapeHtml(seo.card.practice)}</p></section>
      <section><h2>Interview connection</h2><p>${escapeHtml(seo.card.interview)}</p></section>
      <section><h2>Key takeaway</h2><p>${escapeHtml(seo.card.takeaway)}</p></section>
      <nav aria-label="Journey Card navigation">${previous ? `<a href="/cards/${escapeHtml(previous.id)}">Previous: ${escapeHtml(previous.title)}</a>` : ""} ${next ? `<a href="/cards/${escapeHtml(next.id)}">Next: ${escapeHtml(next.title)}</a>` : nextCollection ? `<a href="/collections/${escapeHtml(nextCollection.id)}">Next collection: ${escapeHtml(nextCollection.title)}</a>` : '<a href="/search">Search all Journey Cards</a>'}</nav>
    </main>`;
  }

  if (seo.pageKind === "auth") {
    return `<main id="main-content" class="seo-static-fallback" data-prerendered-route="/auth">${sharedHeader}<h1>Sign in to BRIDGE CST</h1><p>${escapeHtml(seo.description)}</p></main>`;
  }

  if (seo.pageKind === "account") {
    return `<main id="main-content" class="seo-static-fallback" data-prerendered-route="/account">${sharedHeader}<h1>Your private BRIDGE CST learning account</h1><p>${escapeHtml(seo.description)}</p></main>`;
  }

  return `<main id="main-content" class="seo-static-fallback"><h1>Page not found</h1><p><a href="/">Return to BRIDGE CST</a></p></main>`;
}

function upsertMeta(html, attribute, key, content) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`<meta\\s+${attribute}=["']${escapedKey}["'][^>]*>`, "i");
  const tag = `<meta ${attribute}="${escapeHtml(key)}" content="${escapeHtml(content)}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `  ${tag}\n  </head>`);
}

function renderHtml(template, route) {
  const seo = getSeoForPath(route);
  const structuredData = JSON.stringify(getStructuredDataForPath(route)).replaceAll("<", "\\u003c");
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
  html = upsertMeta(html, "name", "description", seo.description);
  html = upsertMeta(html, "name", "robots", seo.robots);
  html = upsertMeta(html, "property", "og:title", seo.title);
  html = upsertMeta(html, "property", "og:description", seo.description);
  html = upsertMeta(html, "property", "og:type", seo.type);
  html = upsertMeta(html, "property", "og:url", seo.canonical);
  html = upsertMeta(html, "property", "og:image", seo.image);
  html = upsertMeta(html, "property", "og:image:alt", seo.imageAlt);
  html = upsertMeta(html, "name", "twitter:title", seo.title);
  html = upsertMeta(html, "name", "twitter:description", seo.description);
  html = upsertMeta(html, "name", "twitter:image", seo.image);
  html = upsertMeta(html, "name", "twitter:image:alt", seo.imageAlt);
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`);
  html = html.replace(/<script\s+id=["']bridge-structured-data["'][^>]*>[\s\S]*?<\/script>/i, `<script id="bridge-structured-data" type="application/ld+json">${structuredData}</script>`);
  html = html.replace(/<div\s+id=["']root["']>[\s\S]*?<\/div>/i, `<div id="root">${renderStaticContent(route)}</div>`);
  return html;
}

async function writePublicCrawlerFiles() {
  await mkdir(publicDirectory, { recursive: true });
  const robots = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /auth",
    "Disallow: /account",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...getIndexableRoutes().map((route) => `  <url><loc>${escapeXml(absoluteUrl(route))}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");
  await writeFile(path.join(publicDirectory, "robots.txt"), robots, "utf8");
  await writeFile(path.join(publicDirectory, "sitemap.xml"), sitemap, "utf8");
}

async function writePrerenderedRoutes() {
  const templatePath = path.join(outputDirectory, "index.html");
  const template = await readFile(templatePath, "utf8");
  for (const route of getAllStaticRoutes()) {
    const outputPath = route === "/"
      ? templatePath
      : path.join(outputDirectory, ...route.slice(1).split("/"), "index.html");
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, renderHtml(template, route), "utf8");
  }
  const notFoundHtml = renderHtml(template, "/not-found");
  await writeFile(path.join(outputDirectory, "404.html"), notFoundHtml, "utf8");
}

if (!distOnly) await writePublicCrawlerFiles();
if (!publicOnly) await writePrerenderedRoutes();

console.log(
  distOnly
    ? `Pre-rendered ${getAllStaticRoutes().length} BRIDGE CST routes.`
    : `Generated robots.txt and sitemap.xml with ${getIndexableRoutes().length} URLs.`,
);
