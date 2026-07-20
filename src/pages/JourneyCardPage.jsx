import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ModuleBar from "../components/ModuleBar.jsx";
import { journeyCards } from "../data/journeyCards.js";
import { evaluatePracticeResponse } from "../utils/practiceFeedback.js";

function JourneyCardPage() {
  const { cardId } = useParams();

  const completionStorageKey =
    `bridge-completed-${cardId}`;

  const answerStorageKey =
    `bridge-answer-${cardId}`;

  const [isComplete, setIsComplete] = useState(
    () =>
      localStorage.getItem(completionStorageKey) ===
      "true",
  );

  const [practiceAnswer, setPracticeAnswer] = useState(
    () => localStorage.getItem(answerStorageKey) || "",
  );

  const [answerSaved, setAnswerSaved] = useState(
    () => Boolean(localStorage.getItem(answerStorageKey)),
  );

  const [practiceFeedback, setPracticeFeedback] = useState(null);

  function toggleCompletion() {
    const newStatus = !isComplete;

    setIsComplete(newStatus);

    localStorage.setItem(
      completionStorageKey,
      String(newStatus),
    );
  }

  function savePracticeAnswer() {
    const cleanedAnswer = practiceAnswer.trim();

    if (!cleanedAnswer) {
      return;
    }

    localStorage.setItem(
      answerStorageKey,
      cleanedAnswer,
    );

    setPracticeAnswer(cleanedAnswer);
    setAnswerSaved(true);
  }

  function checkPracticeAnswer() {
    const cleanedAnswer = practiceAnswer.trim();

    if (!cleanedAnswer || !card) {
      return;
    }

    localStorage.setItem(answerStorageKey, cleanedAnswer);
    setPracticeAnswer(cleanedAnswer);
    setAnswerSaved(true);
    setPracticeFeedback(evaluatePracticeResponse(cleanedAnswer, card));
  }

  const card = journeyCards.find(
    (item) => item.id === cardId,
  );

  const collectionCards = card
    ? journeyCards.filter(
        (item) =>
          item.collectionId === card.collectionId,
      )
    : [];

  const currentCardIndex =
    collectionCards.findIndex(
      (item) => item.id === cardId,
    );

  const previousCard =
    currentCardIndex > 0
      ? collectionCards[currentCardIndex - 1]
      : null;

  const nextCard =
    currentCardIndex <
    collectionCards.length - 1
      ? collectionCards[currentCardIndex + 1]
      : null;

  if (!card) {
    return (
      <main className="journey-page">
        <h1>Journey Card not found</h1>
        <Link to="/">Return Home</Link>
      </main>
    );
  }

  return (
    <article className="journey-page">
      <ModuleBar
        activeCollectionId={card.collectionId}
      />

      <header
        className="journey-page-header"
        id="main-content"
        tabIndex="-1"
      >
        <p>Journey Card {card.number}</p>

        <h1>{card.title}</h1>

        <p>{card.description}</p>

        <div className="journey-metadata">
          <span>{card.difficulty}</span>
          <span>{card.duration}</span>
        </div>
      </header>

      <div className="lesson-content">
        <section className="lesson-section skill-section">
          <p>Skill you'll build</p>

          <h2>
            {card.skillTitle ||
              "A practical skill you can use at work"}
          </h2>

          <p>{card.skill}</p>
        </section>

        <section className="lesson-section">
          <p>Learn</p>

          <h2>
            {card.lessonTitle || card.title}
          </h2>

          <p>{card.lesson}</p>
        </section>

        <section className="lesson-section scenario-section">
          <p>Real support scenario</p>

          <h2>
            {card.scenarioTitle ||
              "See the principle in action"}
          </h2>

          <p>{card.scenario}</p>
        </section>

        <section className="lesson-section practice-section">
          <p>Practice lab</p>

          <h2>
            {card.practiceTitle ||
              "What would you do?"}
          </h2>

          <p>{card.practice}</p>

          <div className="practice-response">
            <label htmlFor="practice-answer">
              Write your response
            </label>

            <textarea
              key={card.id}
              id="practice-answer"
              rows="7"
              value={practiceAnswer}
              onChange={(event) => {
                setPracticeAnswer(
                  event.target.value,
                );

                setAnswerSaved(false);
                setPracticeFeedback(null);
              }}
              placeholder="Type your answer here..."
            />

            <div className="practice-actions">
              <button
                type="button"
                onClick={savePracticeAnswer}
                disabled={!practiceAnswer.trim()}
              >
                {answerSaved
                  ? "Response Saved"
                  : "Save Response"}
              </button>

              <button
                type="button"
                className="feedback-button"
                onClick={checkPracticeAnswer}
                disabled={!practiceAnswer.trim()}
              >
                Check My Response
              </button>

              {answerSaved && (
                <span>
                  Saved privately on this device
                </span>
              )}
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

                <p className="practice-feedback-summary">
                  {practiceFeedback.summary}
                </p>

                <div className="practice-feedback-grid">
                  <div>
                    <h4>What you covered</h4>
                    {practiceFeedback.covered.length > 0 ? (
                      <ul>
                        {practiceFeedback.covered.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>None of the key ideas were clear yet. Use the structure below to revise your answer.</p>
                    )}
                  </div>

                  <div>
                    <h4>What to strengthen</h4>
                    {practiceFeedback.missing.length > 0 ? (
                      <ul>
                        {practiceFeedback.missing.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>You covered every key idea. Refine the wording and keep it concise.</p>
                    )}
                  </div>
                </div>

                <div className="suggested-structure">
                  <h4>Suggested answer structure</h4>
                  <ol>
                    {practiceFeedback.structure.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                  <p>
                    <strong>Key principle:</strong> {card.takeaway}
                  </p>
                </div>

                {card.modelAnswer && (
                  <div className="model-answer">
                    <p>Example of a strong answer</p>
                    <blockquote>{card.modelAnswer}</blockquote>
                    <span>
                      Use this as a reference. Your answer can be different while still demonstrating the same skills.
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

        <section className="lesson-section interview-section">
          <p>Interview connection</p>

          <h2>Prepare your answer</h2>

          <blockquote>
            "{card.interview}"
          </blockquote>
        </section>

        <section className="lesson-section takeaway-section">
          <p>Key takeaway</p>

          <h2>{card.takeaway}</h2>
        </section>
      </div>

      <section className="completion-panel">
        <div>
          <p>Your progress</p>

          <h2>
            {isComplete
              ? "Journey Card completed"
              : "Ready to complete this card?"}
          </h2>

          <p>
            {isComplete
              ? "Your progress has been saved on this device."
              : "Mark this Journey Card complete when you feel confident with the lesson."}
          </p>
        </div>

        <button
          type="button"
          className={
            isComplete
              ? "completed-button"
              : ""
          }
          onClick={toggleCompletion}
        >
          {isComplete
            ? "Completed"
            : "Mark as Complete"}
        </button>
      </section>

      <nav className="lesson-navigation">
        <div>
          {previousCard ? (
            <Link
              to={`/cards/${previousCard.id}`}
            >
              <span>
                Previous Journey Card
              </span>

              <strong>
                {previousCard.title}
              </strong>
            </Link>
          ) : (
            <Link
              to={`/collections/${card.collectionId}`}
            >
              <span>Previous</span>
              <strong>
                Return to Collection
              </strong>
            </Link>
          )}
        </div>

        <div className="next-lesson">
          {nextCard ? (
            <Link to={`/cards/${nextCard.id}`}>
              <span>Next Journey Card</span>
              <strong>{nextCard.title}</strong>
            </Link>
          ) : (
            <Link
              to={`/collections/${card.collectionId}`}
            >
              <span>Collection complete</span>
              <strong>
                Return to Collection
              </strong>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}

export default JourneyCardPage;
