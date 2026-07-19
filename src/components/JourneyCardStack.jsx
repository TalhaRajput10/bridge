import { useState } from "react";
import { Link } from "react-router-dom";

function JourneyCardStack({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const orderedCards = [
    ...cards.slice(currentIndex),
    ...cards.slice(0, currentIndex),
  ];

  const visibleCards = orderedCards.slice(0, 4);

  function showNextCard() {
    setCurrentIndex((current) => (current + 1) % cards.length);
  }

  function showPreviousCard() {
    setCurrentIndex(
      (current) => (current - 1 + cards.length) % cards.length,
    );
  }

  function handleTouchStart(event) {
    setTouchStart(event.touches[0].clientX);
  }

  function handleTouchEnd(event) {
    if (touchStart === null) return;

    const touchEnd = event.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (distance > 50) {
      showNextCard();
    }

    if (distance < -50) {
      showPreviousCard();
    }

    setTouchStart(null);
  }

  if (cards.length === 0) {
    return <p>Journey Cards for this Collection are coming soon.</p>;
  }

  return (
    <div className="journey-deck">
      <div
  className="journey-deck-stage"
  onPointerMove={handlePointerMove}
  onPointerLeave={handlePointerLeave}
  onTouchStart={handleTouchStart}
  onTouchEnd={handleTouchEnd}
>
        {visibleCards
          .map((card, position) => (
            <article
              className={`journey-deck-card ${
                position === 0 ? "active-card" : ""
              }`}
              key={card.id}
              style={{
                "--card-position": position,
                zIndex: visibleCards.length - position,
              }}
            >
              <span>Journey Card {card.number}</span>
{localStorage.getItem(
  `bridge-completed-${card.id}`,
) === "true" && (
  <span className="card-completed-badge">
    ✓ Completed
  </span>
)}
              <h3>{card.title}</h3>

              <p>{card.description}</p>

              <div className="journey-metadata">
                <span>{card.difficulty}</span>
                <span>{card.duration}</span>
              </div>

              {position === 0 && (
                <Link to={`/cards/${card.id}`}>
                  Open Journey Card →
                </Link>
              )}
            </article>
          ))
          .reverse()}
      </div>

      <div className="journey-deck-controls">
        <button type="button" onClick={showPreviousCard}>
          ← Previous
        </button>

        <span>
          {currentIndex + 1} / {cards.length}
        </span>

        <button type="button" onClick={showNextCard}>
          Next →
        </button>
      </div>

      <p className="swipe-instruction">
        Swipe the card on mobile or use the buttons.
      </p>
    </div>
  );
}

export default JourneyCardStack;
function handlePointerMove(event) {
  if (event.pointerType === "touch") return;

  const stage = event.currentTarget;
  const bounds = stage.getBoundingClientRect();

  const pointerX = (event.clientX - bounds.left) / bounds.width;
  const pointerY = (event.clientY - bounds.top) / bounds.height;

  const rotateY = (pointerX - 0.5) * 14;
  const rotateX = (0.5 - pointerY) * 12;

  stage.style.setProperty("--rotate-x", `${rotateX}deg`);
  stage.style.setProperty("--rotate-y", `${rotateY}deg`);
  stage.style.setProperty("--light-x", `${pointerX * 100}%`);
  stage.style.setProperty("--light-y", `${pointerY * 100}%`);
}

function handlePointerLeave(event) {
  const stage = event.currentTarget;

  stage.style.setProperty("--rotate-x", "0deg");
  stage.style.setProperty("--rotate-y", "0deg");
  stage.style.setProperty("--light-x", "50%");
  stage.style.setProperty("--light-y", "30%");
}