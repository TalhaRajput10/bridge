# Foundations Pilot Standard

This document defines the Phase 1 quality standard established with the eight Foundations Journey Cards.

## Content requirements

Each Journey Card must include:

- one clearly named practical skill;
- a plain-language explanation;
- a realistic support scenario;
- one unambiguous Practice Lab task;
- three card-specific evaluation criteria;
- a strong model answer;
- an interview connection;
- a concise key takeaway; and
- definitions or resources only when they materially improve understanding.

## Practice Lab evaluation

The Foundations pilot uses card-specific rubrics stored in `src/data/practiceRubrics.js`.

Each criterion contains:

- a learner-facing label;
- a concrete improvement prompt;
- an explanation of why the idea matters;
- natural-language signals used by the local evaluator; and
- an optional minimum number of signals for structured exercises.

The evaluator tolerates a one-character spelling difference for meaningful single-word signals. It does not grade grammar, guarantee semantic understanding, or make a hiring decision. Every result includes the expected answer structure and a model answer so the learner can revise rather than merely receive a score.

## Card feedback

Every Journey Card includes a compact usefulness control with:

- Yes, Partly, and No ratings;
- optional issue categories;
- an optional 400-character note; and
- a clear privacy reminder.

The pilot stores this feedback on the learner's device. Central reporting will use the same data shape when Supabase feedback storage is introduced:

```text
cardId
rating
reason
note
updatedAt
```

Practice Lab answers must never be included automatically with card feedback.

## Interaction and accessibility requirements

- Practice answers must not carry into another Journey Card.
- Saved feedback must return when the learner revisits the same card.
- All form controls must have visible programmatic labels.
- Rating buttons must expose their selected state with `aria-pressed`.
- Save confirmation must use a live status message.
- Keyboard focus must remain clearly visible.
- Touch targets must be at least 44 pixels high.
- The layout must not create horizontal overflow at a 390-pixel viewport.
- Reduced-motion preferences must be respected.

## Pilot verification

- All eight Foundations model answers satisfy all three card-specific criteria.
- A deliberately misspelled ownership answer still receives appropriate credit.
- All eight cards render their unique criteria and feedback region.
- Desktop and 390 x 844 mobile checks show no horizontal overflow.
- Lint and the production build pass.

## Scaling rule

The remaining Collections should adopt this system one Collection at a time. Rubrics must be written from the actual Practice Lab task; Collection-level generic keyword lists remain only as a temporary fallback until all 64 cards have dedicated rubrics.
