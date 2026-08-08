import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collections } from "../data/collections.js";
import { journeyCards } from "../data/journeyCards.js";
import JourneyCardStack from "../components/JourneyCardStack.jsx";
import ModuleBar from "../components/ModuleBar.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import "./CollectionPage.css";

function CollectionPage() {
  const { isCardComplete, syncStatus } = useProgress();
  const { collectionId } = useParams();
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const collection = collections.find((item) => item.id === collectionId);
  const collectionJourneyCards = journeyCards.filter(
    (card) => card.collectionId === collectionId,
  );

  if (!collection) {
    return (
      <main className="collection-page" id="main-content">
        <h1>Collection not found</h1>
        <Link to="/">Return home</Link>
      </main>
    );
  }

  const completedCards = collectionJourneyCards.filter((card) =>
    isCardComplete(card.id),
  ).length;

  const progressPercentage = collectionJourneyCards.length
    ? Math.round((completedCards / collectionJourneyCards.length) * 100)
    : 0;

  const firstCard = collectionJourneyCards[0];

  return (
    <main className="collection-detail">
      <ModuleBar activeCollectionId={collectionId} />

      <header className="collection-header" id="main-content" tabIndex="-1">
        <div className="collection-header-copy">
          <Link className="collection-back-link" to="/">
            <span aria-hidden="true">{"\u2190"}</span> All collections
          </Link>

          <p className="collection-eyebrow">
            Collection {collection.number} {"\u00b7"} Beginner learning path
          </p>
          <h1>{collection.title}</h1>
          <p className="collection-description">{collection.description}</p>

          {firstCard && (
            <Link className="collection-start-button" to={`/cards/${firstCard.id}`}>
              Start Journey Card {firstCard.number}
              <span aria-hidden="true">{"\u2192"}</span>
            </Link>
          )}
        </div>

        <div className="collection-progress-panel">
          <div className="collection-progress-label">
            <span>Your progress</span>
            <strong>{progressPercentage}%</strong>
          </div>
          <p>
            {completedCards} of {collectionJourneyCards.length} Journey Cards completed
          </p>
          <div
            className="progress-track"
            role="progressbar"
            aria-label={`${collection.title} progress`}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={progressPercentage}
          >
            <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
          </div>
          <small>
            {syncStatus === "synced" && "Progress synced privately to your BRIDGE CST account."}
            {["loading", "pending", "syncing"].includes(syncStatus)
              && "Progress saved on this device and syncing to your account."}
            {syncStatus === "error" && "Progress is safe on this device; account sync will retry."}
            {syncStatus === "local" && "Progress is saved automatically on this device."}
          </small>
        </div>
      </header>

      <section className="journey-list" aria-labelledby="journey-list-title">
        <div className="journey-list-heading">
          <p>{collection.title} learning path</p>
          <h2 id="journey-list-title">One skill at a time.</h2>
          <p>
            Move through {collectionJourneyCards.length} practical Journey Cards.
            Swipe the stack or use the controls to explore.
          </p>
        </div>

        <div className="collection-showcase-grid">
          <aside className="collection-overview" aria-label="Collection overview">
            <p className="collection-panel-label">Collection overview</p>
            <dl>
              <div><dt>Goal</dt><dd>{collection.description}</dd></div>
              <div><dt>Level</dt><dd>Beginner</dd></div>
              <div><dt>Estimated time</dt><dd>About {collectionJourneyCards.length * 5} minutes</dd></div>
            </dl>
          </aside>

          <JourneyCardStack
            cards={collectionJourneyCards}
            collectionTitle={collection.title}
            currentIndex={activeCardIndex}
            onIndexChange={setActiveCardIndex}
          />

          <aside className="collection-card-index" aria-label={`${collection.title} Journey Cards`}>
            <p className="collection-panel-label">Your journey</p>
            <ol>
              {collectionJourneyCards.map((card, index) => (
                <li className={index === activeCardIndex ? "is-current" : ""} key={card.id}>
                  <button type="button" onClick={() => setActiveCardIndex(index)} aria-current={index === activeCardIndex ? "step" : undefined}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{card.title}</strong>
                  </button>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default CollectionPage;
