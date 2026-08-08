import { allFaqs, faqGroups } from "../src/data/faqs.js";
import { guideCategories, guides } from "../src/data/guides.js";
import { journeyCards } from "../src/data/journeyCards.js";

const errors = [];
const cardIds = new Set(journeyCards.map((card) => card.id));
const categoryIds = new Set(guideCategories.map((category) => category.id));
const unique = (items) => new Set(items).size === items.length;

if (guides.length < 12) errors.push(`Expected at least 12 launch guides; found ${guides.length}.`);
if (!unique(guides.map((guide) => guide.id))) errors.push("Guide IDs are not unique.");
if (!unique(guides.map((guide) => guide.title))) errors.push("Guide titles are not unique.");
if (!unique(guides.map((guide) => guide.excerpt))) errors.push("Guide excerpts are not unique.");

for (const guide of guides) {
  if (!categoryIds.has(guide.category)) errors.push(`${guide.id}: unknown category ${guide.category}.`);
  if (!guide.seoTitle || guide.seoTitle.length > 60) errors.push(`${guide.id}: SEO title must be present and no longer than 60 characters.`);
  if (!guide.excerpt || guide.excerpt.length > 160) errors.push(`${guide.id}: excerpt must be present and no longer than 160 characters.`);
  if (!Array.isArray(guide.sections) || guide.sections.length < 3) errors.push(`${guide.id}: needs at least three sections.`);
  if (!guide.takeaway) errors.push(`${guide.id}: missing takeaway.`);
  if (!Array.isArray(guide.relatedCardIds) || guide.relatedCardIds.length < 2) errors.push(`${guide.id}: needs at least two related Journey Cards.`);
  for (const cardId of guide.relatedCardIds || []) if (!cardIds.has(cardId)) errors.push(`${guide.id}: unknown Journey Card ${cardId}.`);
  const text = (guide.sections || []).flatMap((section) => [...(section.paragraphs || []), ...(section.bullets || [])]).join(" ");
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < 250) errors.push(`${guide.id}: only ${wordCount} body words; expected at least 250.`);
}

if (faqGroups.length < 3) errors.push("FAQ needs at least three topic groups.");
if (allFaqs.length < 12) errors.push(`FAQ needs at least 12 questions; found ${allFaqs.length}.`);
if (!unique(allFaqs.map((item) => item.question))) errors.push("FAQ questions are not unique.");

if (errors.length) {
  console.error(`Guide audit failed with ${errors.length} problem(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Guide audit passed: ${guides.length} original guides, ${guideCategories.length} categories, ${allFaqs.length} FAQs.`);
