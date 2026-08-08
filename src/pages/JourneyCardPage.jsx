import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ModuleBar from "../components/ModuleBar.jsx";
import { collections } from "../data/collections.js";
import { journeyCards } from "../data/journeyCards.js";
import { getCardEnhancement } from "../data/journeyCardEnhancements.js";
import { modelAnswers } from "../data/modelAnswers.js";
import { getResourcesForCard } from "../data/resources.js";
import { evaluatePracticeResponse } from "../utils/practiceFeedback.js";
import { useProgress } from "../context/ProgressContext.jsx";
import { trackEvent } from "../lib/telemetry.js";
import "./JourneyCardPage.css";

const baseLessonSections = [
  ["skill", "Skill you'll build"],
  ["why-it-matters", "Why it matters"],
  ["learn", "Learn"],
  ["scenario", "Real scenario"],
  ["practice", "Practice Lab"],
  ["interview", "Interview"],
  ["takeaway", "Key takeaway"],
];

function JourneyCardPage() {
  const { cardId } = useParams();
  const card = journeyCards.find((item) => item.id === cardId);
  const {
    getCardFeedback,
    getPracticeAnswer,
    getStretchConfidence,
    isCardComplete,
    saveCardFeedback: persistCardFeedback,
    savePracticeAnswer: persistPracticeAnswer,
    saveStretchConfidence: persistStretchConfidence,
    setCardCompletion,
    syncStatus,
  } = useProgress();
  const savedPracticeAnswer = getPracticeAnswer(cardId);
  const savedStretchConfidence = getStretchConfidence(cardId);
  const savedCardFeedback = getCardFeedback(cardId);
  const isComplete = isCardComplete(cardId);

  const [practiceDraft, setPracticeDraft] = useState(null);
  const [answerSavedOverride, setAnswerSavedOverride] = useState(null);
  const practiceAnswer = practiceDraft ?? savedPracticeAnswer;
  const answerSaved = answerSavedOverride ?? Boolean(savedPracticeAnswer);
  const [practiceFeedback, setPracticeFeedback] = useState(null);
  const [cardRatingDraft, setCardRatingDraft] = useState(null);
  const [cardFeedbackReasonDraft, setCardFeedbackReasonDraft] = useState(null);
  const [cardFeedbackNoteDraft, setCardFeedbackNoteDraft] = useState(null);
  const [cardFeedbackSavedOverride, setCardFeedbackSavedOverride] = useState(null);
  const stretchConfidence = savedStretchConfidence;
  const cardRating = cardRatingDraft ?? savedCardFeedback?.rating ?? "";
  const cardFeedbackReason = cardFeedbackReasonDraft ?? savedCardFeedback?.reason ?? "";
  const cardFeedbackNote = cardFeedbackNoteDraft ?? savedCardFeedback?.note ?? "";
  const cardFeedbackSaved = cardFeedbackSavedOverride ?? Boolean(savedCardFeedback);
  const accountStorageStatus = syncStatus === "synced"
    ? "Saved privately to your BRIDGE CST account"
    : ["loading", "pending", "syncing"].includes(syncStatus)
      ? "Saved on this device · syncing privately to your account"
      : syncStatus === "error"
        ? "Saved on this device · account sync will retry"
        : "Saved privately on this device";

  const collectionCards = card
    ? journeyCards.filter((item) => item.collectionId === card.collectionId)
    : [];
  const currentCardIndex = collectionCards.findIndex((item) => item.id === cardId);
  const previousCard = currentCardIndex > 0 ? collectionCards[currentCardIndex - 1] : null;
  const nextCard = currentCardIndex < collectionCards.length - 1
    ? collectionCards[currentCardIndex + 1]
    : null;
  const collection = card
    ? collections.find((item) => item.id === card.collectionId)
    : null;
  const collectionIndex = card
    ? collections.findIndex((item) => item.id === card.collectionId)
    : -1;
  const nextCollection = collectionIndex >= 0 && collectionIndex < collections.length - 1
    ? collections[collectionIndex + 1]
    : null;
  const enhancement = card ? getCardEnhancement(card) : null;
  const cardResources = card ? getResourcesForCard(card.id) : [];
  const lessonSections = [
    ...baseLessonSections.slice(0, 2),
    ...(enhancement?.technicalStretch
      ? [["technical-stretch", "Technical stretch"]]
      : []),
    ...baseLessonSections.slice(2, 6),
    ...(cardResources.length ? [["resources", "Free resources"]] : []),
    ...baseLessonSections.slice(6),
  ];

  function toggleCompletion() {
    const newStatus = !isComplete;
    setCardCompletion(cardId, newStatus);
    trackEvent(newStatus ? "card_completed" : "card_reopened", {
      cardId,
      collectionId: card.collectionId,
    });
  }

  async function savePracticeAnswer() {
    const cleanedAnswer = practiceAnswer.trim();
    if (!cleanedAnswer) return;

    await persistPracticeAnswer(cardId, cleanedAnswer);
    setPracticeDraft(cleanedAnswer);
    setAnswerSavedOverride(true);
  }

  async function checkPracticeAnswer() {
    const cleanedAnswer = practiceAnswer.trim();
    if (!cleanedAnswer || !card) return;

    await persistPracticeAnswer(cardId, cleanedAnswer);
    setPracticeDraft(cleanedAnswer);
    setAnswerSavedOverride(true);
    const result = evaluatePracticeResponse(cleanedAnswer, card);
    setPracticeFeedback(result);
    trackEvent("practice_checked", {
      cardId,
      collectionId: card.collectionId,
      criteriaCovered: result.covered.length,
      criteriaTotal: result.total,
      wordCount: cleanedAnswer.split(/\s+/).filter(Boolean).length,
    });
  }

  function saveStretchConfidence(value) {
    persistStretchConfidence(cardId, value);
  }

  async function saveCardFeedback(ratingOverride = cardRating) {
    if (!ratingOverride) return;

    await persistCardFeedback(cardId, {
      cardId,
      rating: ratingOverride,
      reason: ratingOverride === "No" ? cardFeedbackReason : "",
      note: ratingOverride === "No" ? cardFeedbackNote.trim() : "",
      updatedAt: new Date().toISOString(),
    });
    trackEvent("card_feedback_submitted", {
      cardId,
      collectionId: card.collectionId,
      rating: ratingOverride,
      reason: ratingOverride === "No" ? cardFeedbackReason : "",
      hasNote: ratingOverride === "No" && Boolean(cardFeedbackNote.trim()),
    });
    setCardFeedbackSavedOverride(true);
  }

  function selectCardRating(rating) {
    setCardRatingDraft(rating);

    if (rating === "No") {
      setCardFeedbackSavedOverride(false);
      return;
    }

    setCardFeedbackReasonDraft("");
    setCardFeedbackNoteDraft("");
    saveCardFeedback(rating);
  }

  if (!card) {
    return (
      <main className="journey-page" id="main-content">
        <h1>Journey Card not found</h1>
        <Link to="/">Return home</Link>
      </main>
    );
  }

  const collectionTitle = collection?.title || "BRIDGE CST";
  const cardPosition = currentCardIndex + 1;
  const pathProgress = collectionCards.length
    ? Math.round((cardPosition / collectionCards.length) * 100)
    : 0;

  return (
    <main className="journey-page">
      <ModuleBar activeCollectionId={card.collectionId} />

      <header className="journey-page-header" id="main-content" tabIndex="-1">
        <div className="journey-header-inner">
          <Link className="journey-back-link" to={`/collections/${card.collectionId}`}>
            <span aria-hidden="true">←</span> {collectionTitle}
          </Link>

          <p className="journey-header-eyebrow">
            {collectionTitle} · Journey Card {card.number}
          </p>
          <h1>{card.title}</h1>
          <p className="journey-header-description">{card.description}</p>

          <div className="journey-header-footer">
            <div className="journey-metadata" aria-label="Journey Card details">
              <span>{card.difficulty}</span>
              <span>{card.duration}</span>
              {enhancement?.technicalStretch && <span>Technical stretch</span>}
            </div>

            <div className="journey-path-progress">
              <span>{cardPosition} of {collectionCards.length}</span>
              <div
                className="journey-path-track"
                role="progressbar"
                aria-label={`${collectionTitle} card position`}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={pathProgress}
              >
                <div style={{ width: `${pathProgress}%` }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="journey-learning-shell">
        <aside className="journey-outline">
          <p>On this journey</p>
          <nav aria-label="Journey Card sections">
            {lessonSections.map(([id, label], index) => (
              <a href={`#${id}`} key={id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {label}
              </a>
            ))}
          </nav>

          {enhancement?.supportSpeak.length > 0 && (
            <details className="support-speak-panel" open>
              <summary>Support Speak, translated</summary>
              <dl>
                {enhancement.supportSpeak.map((item) => (
                  <div key={item.term}>
                    <dt>{item.term}</dt>
                    <dd>{item.definition}</dd>
                  </div>
                ))}
              </dl>
            </details>
          )}
        </aside>

        <div className="lesson-content">
          <section className="lesson-section skill-section" id="skill">
            <p>Skill you'll build</p>
            <h2>{card.skillTitle || "A practical skill you can use at work"}</h2>
            <p>{card.skill}</p>
          </section>

          <section className="lesson-section why-section" id="why-it-matters">
            <p>Why it matters</p>
            <h2>Where this shows up in real support work</h2>
            <p>{enhancement.whyItMatters}</p>
          </section>

          {enhancement.technicalStretch && (
            <section
              className="lesson-section technical-stretch-section"
              id="technical-stretch"
            >
              <p>Technical stretch</p>
              <h2>{enhancement.technicalStretch.title}</h2>
              <p>{enhancement.technicalStretch.intro}</p>

              <div className="stretch-prerequisites">
                <h3>Helpful cards to understand first</h3>
                <div>
                  {enhancement.technicalStretch.prerequisites.map((item) => (
                    <Link key={item.cardId} to={`/cards/${item.cardId}`}>
                      {item.label} <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>

              <ol className="stretch-first-pass">
                {enhancement.technicalStretch.firstPass.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>

              <p className="stretch-check-in">
                <strong>Beginner check-in:</strong>{" "}
                {enhancement.technicalStretch.checkIn}
              </p>

              <div className="stretch-confidence-check">
                <p>How did this first pass land?</p>
                <div>
                  <button
                    type="button"
                    className={stretchConfidence === "clear" ? "is-selected" : ""}
                    aria-pressed={stretchConfidence === "clear"}
                    onClick={() => saveStretchConfidence("clear")}
                  >
                    I can explain the basics
                  </button>
                  <button
                    type="button"
                    className={stretchConfidence === "review" ? "is-selected" : ""}
                    aria-pressed={stretchConfidence === "review"}
                    onClick={() => saveStretchConfidence("review")}
                  >
                    I need another pass
                  </button>
                </div>
                {stretchConfidence === "review" && (
                  <span>
                    That is completely normal. Revisit the prerequisite cards,
                    then use the free visual resource below before trying the
                    Practice Lab.
                  </span>
                )}
                {stretchConfidence === "clear" && (
                  <span>
                    Good. Continue without trying to memorize every technical
                    detail—the goal is recognition and safe investigation.
                  </span>
                )}
              </div>
            </section>
          )}

          <section className="lesson-section" id="learn">
            <p>Learn</p>
            <h2>{card.lessonTitle || card.title}</h2>
            <p>{card.lesson}</p>

            {enhancement.toolNote && (
              <aside className="tool-in-practice">
                <p>Tool in practice</p>
                <span>{enhancement.toolNote}</span>
              </aside>
            )}

            {enhancement.benchmark && (
              <aside className="industry-benchmark">
                <p>{enhancement.benchmark.label}</p>
                <span>{enhancement.benchmark.text}</span>
              </aside>
            )}
          </section>

          <section className="lesson-section scenario-section" id="scenario">
            <p>Real support scenario</p>
            <h2>{card.scenarioTitle || "See the principle in action"}</h2>
            <p>{card.scenario}</p>
          </section>

          <section className="lesson-section practice-section" id="practice">
            <p>Practice Lab</p>
            <h2>{card.practiceTitle || "What would you do?"}</h2>
            <p>{card.practice}</p>

            <div className="practice-response">
              <div className="practice-criteria">
                <p>How your answer is evaluated</p>
                <ul>
                  {enhancement.evaluationCriteria.map((criterion) => (
                    <li key={criterion}>{criterion}</li>
                  ))}
                </ul>
              </div>

              <div className="practice-response-heading">
                <label htmlFor="practice-answer">Write your response</label>
                <span>
                  {accountStorageStatus}
                </span>
              </div>

              <textarea
                key={card.id}
                id="practice-answer"
                rows="7"
                value={practiceAnswer}
                onChange={(event) => {
                  setPracticeDraft(event.target.value);
                  setAnswerSavedOverride(false);
                  setPracticeFeedback(null);
                }}
                placeholder="Think through the situation, then write how you would respond..."
              />

              <div className="practice-actions">
                <button
                  type="button"
                  onClick={savePracticeAnswer}
                  disabled={!practiceAnswer.trim()}
                >
                  {answerSaved ? "Response saved" : "Save response"}
                </button>

                <button
                  type="button"
                  className="feedback-button"
                  onClick={checkPracticeAnswer}
                  disabled={!practiceAnswer.trim()}
                >
                  Check my response
                </button>

                {answerSaved && <span aria-live="polite">{accountStorageStatus}</span>}
              </div>

              {practiceFeedback && (
                <div className="practice-feedback" aria-live="polite">
                  <div className="practice-feedback-heading">
                    <div>
                      <p>Practice feedback</p>
                      <h3>{practiceFeedback.title}</h3>
                    </div>
                    <span>
                      {practiceFeedback.covered.length} of {practiceFeedback.total} key ideas
                    </span>
                  </div>

                  <p className="practice-feedback-summary">{practiceFeedback.summary}</p>

                  <div className="practice-feedback-grid">
                    <div>
                      <h4>What you covered</h4>
                      {practiceFeedback.covered.length ? (
                        <ul>
                          {practiceFeedback.covered.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      ) : (
                        <p>None of the key ideas were clear yet. Use the structure below to revise your answer.</p>
                      )}
                    </div>

                    <div>
                      <h4>What to strengthen</h4>
                      {practiceFeedback.missing.length ? (
                        <ul>
                          {practiceFeedback.missing.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      ) : (
                        <p>You covered every key idea. Refine the wording and keep it concise.</p>
                      )}
                    </div>
                  </div>

                  {practiceFeedback.reasons?.length > 0 && (
                    <div className="feedback-reasons">
                      <h4>Why these ideas matter</h4>
                      <ul>
                        {practiceFeedback.reasons.map((reason) => (
                          <li key={reason}>{reason}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="suggested-structure">
                    <h4>Suggested answer structure</h4>
                    <ol>
                      {practiceFeedback.structure.map((item) => <li key={item}>{item}</li>)}
                    </ol>
                    <p><strong>Key principle:</strong> {card.takeaway}</p>
                  </div>

                  {modelAnswers[card.id] && (
                    <div className="model-answer">
                      <p>Example of a strong answer</p>
                      <blockquote>{modelAnswers[card.id]}</blockquote>
                      <span>
                        Use this as a reference. Your answer can be different while demonstrating the same skills.
                      </span>
                    </div>
                  )}

                  <p className="feedback-disclaimer">
                    This is guidance based on key ideas, not a grade or the only correct answer. Minor spelling mistakes are tolerated where possible, but very different spellings or wording may still affect automated recognition.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="lesson-section interview-section" id="interview">
            <p>Interview connection</p>
            <h2>Prepare your answer</h2>
            <blockquote>“{card.interview}”</blockquote>
          </section>

          {cardResources.length > 0 && (
            <section className="lesson-section card-resources-section" id="resources">
              <p>Free resources</p>
              <h2>Explore the idea in a real tool or trusted guide</h2>
              <p>
                These websites open in a new tab. Product interfaces and
                documentation can change, so use the official source when
                current details matter.
              </p>

              <div className="journey-resource-list">
                {cardResources.map((resource) => (
                  <a
                    href={resource.url}
                    key={resource.id}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{resource.type}</span>
                    <strong>{resource.title}</strong>
                    <small>{resource.description}</small>
                    <b>
                      Open {resource.provider} <span aria-hidden="true">↗</span>
                    </b>
                  </a>
                ))}
              </div>

              <Link className="all-resources-link" to="/resources">
                Browse every BRIDGE CST resource <span aria-hidden="true">→</span>
              </Link>
            </section>
          )}

          <section className="lesson-section takeaway-section" id="takeaway">
            <p>Key takeaway</p>
            <h2>{card.takeaway}</h2>
          </section>

          <section className="lesson-section card-feedback-section" aria-labelledby="card-feedback-title">
            <p>Help improve BRIDGE CST</p>
            <h2 id="card-feedback-title">Was this Journey Card useful?</h2>
            <p>Your feedback helps identify lessons that need clearer language, stronger examples, or better exercises.</p>

            <div className="card-rating-options" role="group" aria-label="Journey Card usefulness">
              {["Yes", "Partly", "No"].map((rating) => (
                <button
                  type="button"
                  key={rating}
                  className={cardRating === rating ? "selected" : ""}
                  aria-pressed={cardRating === rating}
                  onClick={() => selectCardRating(rating)}
                >
                  {rating}
                </button>
              ))}
            </div>

            {cardFeedbackSaved && cardRating !== "No" && (
              <p className="card-feedback-quick-status" role="status">
                Feedback saved. Thank you.
              </p>
            )}

            {cardRating === "No" && (
              <div className="card-feedback-details">
                <label htmlFor="card-feedback-reason">What influenced your answer?</label>
                <select
                  id="card-feedback-reason"
                  value={cardFeedbackReason}
                  onChange={(event) => {
                    setCardFeedbackReasonDraft(event.target.value);
                    setCardFeedbackSavedOverride(false);
                  }}
                >
                  <option value="">Choose a reason (optional)</option>
                  <option value="clear-and-useful">Clear and useful</option>
                  <option value="too-much-jargon">Too much jargon</option>
                  <option value="unclear-exercise">Exercise was unclear</option>
                  <option value="inaccurate-feedback">Practice feedback felt inaccurate</option>
                  <option value="broken-link">A resource link is broken</option>
                  <option value="outdated-content">Content appears outdated</option>
                  <option value="visual-accessibility">Visual or accessibility problem</option>
                  <option value="other">Something else</option>
                </select>

                <label htmlFor="card-feedback-note">Anything else we should know?</label>
                <textarea
                  id="card-feedback-note"
                  rows="3"
                  maxLength="400"
                  value={cardFeedbackNote}
                  onChange={(event) => {
                    setCardFeedbackNoteDraft(event.target.value);
                    setCardFeedbackSavedOverride(false);
                  }}
                  placeholder="Optional note—please do not include private customer information."
                />

                <div className="card-feedback-actions">
                  <button type="button" onClick={() => saveCardFeedback()}>Save feedback</button>
                  {cardFeedbackSaved && <span role="status">{accountStorageStatus}</span>}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      <section className="completion-panel">
        <div>
          <p>Your progress</p>
          <h2>{isComplete ? "Journey Card completed" : "Ready to complete this card?"}</h2>
          <p>
            {isComplete
              ? `${accountStorageStatus}.`
              : "Mark this Journey Card complete when you feel confident with the lesson."}
          </p>
        </div>

        <button
          type="button"
          className={isComplete ? "completed-button" : ""}
          onClick={toggleCompletion}
        >
          {isComplete ? "Completed ✓" : "Mark as complete"}
        </button>
      </section>

      <nav className="lesson-navigation" aria-label="Journey Card navigation">
        <div>
          {previousCard ? (
            <Link to={`/cards/${previousCard.id}`}>
              <span>← Previous Journey Card</span>
              <strong>{previousCard.title}</strong>
            </Link>
          ) : (
            <Link to={`/collections/${card.collectionId}`}>
              <span>← Previous</span>
              <strong>Return to {collectionTitle}</strong>
            </Link>
          )}
        </div>

        <div className="next-lesson">
          {nextCard ? (
            <Link to={`/cards/${nextCard.id}`}>
              <span>Next Journey Card →</span>
              <strong>{nextCard.title}</strong>
            </Link>
          ) : nextCollection ? (
            <Link to={`/collections/${nextCollection.id}`}>
              <span>Next collection →</span>
              <strong>Continue with {nextCollection.title}</strong>
            </Link>
          ) : (
            <Link to="/search">
              <span>Learning path complete</span>
              <strong>Explore any Journey Card</strong>
            </Link>
          )}
        </div>
      </nav>

      {!nextCard && (
        <div className="collection-completion-links" aria-label="Collection completion options">
          <p><strong>{collectionTitle} complete.</strong> Keep building your bridge or revisit any skill whenever you need it.</p>
          <div><Link to="/#collections">Browse all collections</Link><Link to="/search">Search all 64 Journey Cards</Link></div>
        </div>
      )}
    </main>
  );
}

export default JourneyCardPage;
