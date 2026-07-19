import { Link } from "react-router-dom";
import { collections } from "../data/collections.js";
import { journeyCards } from "../data/journeyCards.js";

function ModuleBar({ activeCollectionId }) {
  function getCollectionProgress(collectionId) {
    const cards = journeyCards.filter(
      (card) => card.collectionId === collectionId,
    );

    if (cards.length === 0) {
      return 0;
    }

    const completedCards = cards.filter(
      (card) =>
        localStorage.getItem(
          `bridge-completed-${card.id}`,
        ) === "true",
    ).length;

    return Math.round(
      (completedCards / cards.length) * 100,
    );
  }

  return (
    <nav
      className="module-bar"
      aria-label="BRIDGE Collections"
    >
      <Link className="module-bar-logo" to="/">
        BRIDGE
      </Link>

      <div className="module-links">
        {collections.map((collection) => {
          const percentage = getCollectionProgress(
            collection.id,
          );

          return (
            <Link
              key={collection.id}
              to={`/collections/${collection.id}`}
              className={
                collection.id === activeCollectionId
                  ? "active-module"
                  : ""
              }
            >
              <div className="module-link-heading">
                <span>{collection.title}</span>
                <strong>{percentage}%</strong>
              </div>

              <div className="module-progress-track">
                <div
                  className="module-progress-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default ModuleBar;