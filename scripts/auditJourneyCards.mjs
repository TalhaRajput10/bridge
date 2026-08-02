import { collections } from "../src/data/collections.js";
import { journeyCards } from "../src/data/journeyCards.js";
import { modelAnswers } from "../src/data/modelAnswers.js";
import { practiceRubrics } from "../src/data/practiceRubrics.js";
import { evaluatePracticeResponse } from "../src/utils/practiceFeedback.js";

const errors = [];
const requiredFields = [
  "id", "number", "collectionId", "title", "description", "difficulty", "duration",
  "skillTitle", "skill", "lessonTitle", "lesson", "scenarioTitle", "scenario",
  "practiceTitle", "practice", "interview", "takeaway",
];

function record(condition, message) {
  if (!condition) errors.push(message);
}

record(collections.length === 8, `Expected 8 collections; found ${collections.length}.`);
record(journeyCards.length === 64, `Expected 64 Journey Cards; found ${journeyCards.length}.`);

const collectionIds = new Set(collections.map((collection) => collection.id));
const cardIds = new Set();

for (const card of journeyCards) {
  record(!cardIds.has(card.id), `Duplicate card id: ${card.id}`);
  cardIds.add(card.id);
  record(collectionIds.has(card.collectionId), `${card.id} uses an unknown collection: ${card.collectionId}`);

  for (const field of requiredFields) {
    record(typeof card[field] === "string" && card[field].trim(), `${card.id} is missing required field: ${field}`);
  }

  const rubric = practiceRubrics[card.id];
  const modelAnswer = modelAnswers[card.id];
  record(Boolean(rubric), `${card.id} is missing a custom Practice Lab rubric.`);
  record(Boolean(modelAnswer), `${card.id} is missing a model answer.`);

  if (rubric) {
    record(Number.isFinite(rubric.minimumWords) && rubric.minimumWords > 0, `${card.id} has an invalid minimum word count.`);
    record(rubric.criteria?.length === 3, `${card.id} must have exactly 3 rubric criteria.`);
    for (const [index, criterion] of (rubric.criteria || []).entries()) {
      const prefix = `${card.id} criterion ${index + 1}`;
      record(Boolean(criterion.label?.trim()), `${prefix} is missing a label.`);
      record(Boolean(criterion.prompt?.trim()), `${prefix} is missing learner guidance.`);
      record(Boolean(criterion.why?.trim()), `${prefix} is missing a rationale.`);
      record(Array.isArray(criterion.signals) && criterion.signals.length > 0, `${prefix} has no matching signals.`);
      record(!criterion.minimumMatches || criterion.minimumMatches <= criterion.signals.length, `${prefix} requires more matches than it has signals.`);
    }
  }

  if (rubric && modelAnswer) {
    const result = evaluatePracticeResponse(modelAnswer, card);
    record(result.covered.length === result.total, `${card.id} model answer only passes ${result.covered.length}/${result.total} criteria.`);
    const wordCount = modelAnswer.trim().split(/\s+/).filter(Boolean).length;
    record(wordCount >= rubric.minimumWords, `${card.id} model answer has ${wordCount} words; rubric requires ${rubric.minimumWords}.`);
  }
}

for (const collection of collections) {
  const cards = journeyCards.filter((card) => card.collectionId === collection.id);
  const expected = Array.from({ length: 8 }, (_, index) => String(index + 1).padStart(2, "0"));
  const actual = cards.map((card) => card.number).sort();
  record(cards.length === 8, `${collection.id} should contain 8 cards; found ${cards.length}.`);
  record(JSON.stringify(actual) === JSON.stringify(expected), `${collection.id} numbering should be 01-08; found ${actual.join(", ")}.`);
}

for (const id of Object.keys(practiceRubrics)) record(cardIds.has(id), `Rubric references unknown card: ${id}`);
for (const id of Object.keys(modelAnswers)) record(cardIds.has(id), `Model answer references unknown card: ${id}`);

if (errors.length) {
  console.error(`BRIDGE content audit failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log("BRIDGE content audit passed.");
  console.log("64 Journey Cards | 8 collections | 64 rubrics | 64 calibrated model answers");
}
