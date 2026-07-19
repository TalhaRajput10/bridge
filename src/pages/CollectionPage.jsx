import { Link, useParams } from "react-router-dom";
import { collections } from "../data/collections.js";
import { journeyCards } from "../data/journeyCards.js";
import JourneyCardStack from "../components/JourneyCardStack.jsx";

function CollectionPage() {
  const { collectionId } = useParams();

  const collection = collections.find(
    (item) => item.id === collectionId,
  );

  const collectionJourneyCards = journeyCards.filter(
    (card) => card.collectionId === collectionId,
  );
const completedCards = collectionJourneyCards.filter(
  (card) =>
    localStorage.getItem(`bridge-completed-${card.id}`) ===
    "true",
).length;

const progressPercentage =
  collectionJourneyCards.length > 0
    ? Math.round(
        (completedCards / collectionJourneyCards.length) * 100,
      )
    : 0;
  if (!collection) {
    return (
      <main className="collection-page">
        <h1>Collection not found</h1>
        <Link to="/">Return Home</Link>
      </main>
    );
  }

  return (
    <div className="collection-detail">
      <header className="collection-header">
        <Link to="/">← Return Home</Link>

        <p>BRIDGE Collection</p>

        <h1>{collection.title}</h1>

        <p>{collection.description}</p>
      <div className="collection-progress">
  <div className="progress-summary">
    <span>
      {completedCards} of {collectionJourneyCards.length} completed
    </span>

    <strong>{progressPercentage}%</strong>
  </div>

  <div
    className="progress-track"
    role="progressbar"
    aria-label={`${collection.title} progress`}
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuenow={progressPercentage}
  >
    <div
      className="progress-fill"
      style={{ width: `${progressPercentage}%` }}
    />
  </div>
</div>
      </header>

      <section className="journey-list">
        <div className="journey-list-heading">
          <p>Begin your journey</p>
          <h2>Journey Cards</h2>
          <p>{collectionJourneyCards.length} cards available</p>
        </div>

        <JourneyCardStack cards={collectionJourneyCards} />
      </section>
    </div>
  );
}

export default CollectionPage;