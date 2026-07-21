import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ModuleBar from "../components/ModuleBar.jsx";
import { collections } from "../data/collections.js";
import { journeyCards } from "../data/journeyCards.js";
import { modelAnswers } from "../data/modelAnswers.js";
import { evaluatePracticeResponse } from "../utils/practiceFeedback.js";
import "./JourneyCardPage.css";

const lessonSections = [
  ["skill", "Skill you'll build"],
  ["learn", "Learn"],
  ["scenario", "Real scenario"],
  ["practice", "Practice Lab"],
  ["interview", "Interview"],
  ["takeaway", "Key takeaway"],
];

function JourneyCardPage() {
  const { cardId } = useParams();
  const card = journeyCards.find((item) => item.id === cardId);
  const completionStorageKey = `bridge-completed-${cardId}`;
  const answerStorageKey = `bridge-answer-${cardId}`;

  const [isComplete, setIsComplete] = useState(
    () => localStorage.getItem(completionStorageKey) === "true",
  );
  const [practiceAnswer, setPracticeAnswer] = useState(
    () => localStorage.getItem(answerStorageKey) || "",
  );
  const [answerSaved, setAnswerSaved] = useState(
    () => Boolean(localStorage.getItem(answerStorageKey)),
  );
  const [practiceFeedback, setPracticeFeedback] = useState(null);

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

  function toggleCompletion() {
    const newStatus = !isComplete;
    setIsComplete(newStatus);
    localStorage.setItem(completionStorageKey, String(newStatus));
  }

  function savePracticeAnswer() {
    const cleanedAnswer = practiceAnswer.trim();
    if (!cleanedAnswer) return;

    localStorage.setItem(answerStorageKey, cleanedAnswer);
    setPracticeAnswer(cleanedAnswer);
    setAnswerSaved(true);
  }

  function checkPracticeAnswer() {
    const cleanedAnswer = practiceAnswer.trim();
    if (!cleanedAnswer || !card) return;

    localStorage.setItem(answerStorageKey, cleanedAnswer);
    setPracticeAnswer(cleanedAnswer);
    setAnswerSaved(true);
    setPracticeFeedback(evaluatePracticeResponse(cleanedAnswer, card));
  }

  if (!card) {
    return (
      <main className="journey-page" id="main-content">
        <h1>Journey Card not found</h1>
        <Link to="/">Return home</Link>
      </main>
    );
  }

  const collectionTitle = collection?.title || "BRIDGE";
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
        </aside>

        <div className="lesson-content">
          <section className="lesson-section skill-section" id="skill">
            <p>Skill you'll build</p>
            <h2>{card.skillTitle || "A practical skill you can use at work"}</h2>
            <p>{card.skill}</p>
          </section>

          <section className="lesson-section" id="learn">
            <p>Learn</p>
            <h2>{card.lessonTitle || card.title}</h2>
            <p>{card.lesson}</p>
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
              <div className="practice-response-heading">
                <label htmlFor="practice-answer">Write your response</label>
                <span>Saved privately on your device</span>
              </div>

              <textarea
                key={card.id}
                id="practice-answer"
                rows="7"
                value={practiceAnswer}
                onChange={(event) => {
                  setPracticeAnswer(event.target.value);
                  setAnswerSaved(false);
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

                {answerSaved && <span aria-live="polite">Saved</span>}
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
                    This is guidance based on key ideas, not a grade or the only correct answer. The checker matches written words and phrases; misspelled words may not be recognized.
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

          <section className="lesson-section takeaway-section" id="takeaway">
            <p>Key takeaway</p>
            <h2>{card.takeaway}</h2>
          </section>
        </div>
      </div>

      <section className="completion-panel">
        <div>
          <p>Your progress</p>
          <h2>{isComplete ? "Journey Card completed" : "Ready to complete this card?"}</h2>
          <p>
            {isComplete
              ? "Your progress has been saved on this device."
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
          ) : (
            <Link to={`/collections/${card.collectionId}`}>
              <span>Collection complete</span>
              <strong>Return to {collectionTitle}</strong>
            </Link>
          )}
        </div>
      </nav>
    </main>
  );
}

export default JourneyCardPage;
