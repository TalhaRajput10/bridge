import { Link } from "react-router-dom";
import CollectionCard from "../components/CollectionCard.jsx";
import { collections } from "../data/collections.js";
import { journeyCards } from "../data/journeyCards.js";
import "./HomePage.css";

const learningSteps = [
  {
    number: "01",
    title: "Learn the idea",
    description: "Short, focused guidance written for people entering customer support.",
  },
  {
    number: "02",
    title: "Practise the skill",
    description: "Respond to realistic customer situations in built-in Practice Labs.",
  },
  {
    number: "03",
    title: "Build confidence",
    description: "Compare your thinking, save your answers, and prepare for interviews.",
  },
];

function HomePage() {
  const collectionStats = collections.map((collection) => {
    const cards = journeyCards.filter((card) => card.collectionId === collection.id);
    const completed = cards.filter(
      (card) => localStorage.getItem(`bridge-completed-${card.id}`) === "true",
    ).length;

    return {
      ...collection,
      cards,
      completed,
      percentage: cards.length ? Math.round((completed / cards.length) * 100) : 0,
    };
  });

  const totalCompleted = collectionStats.reduce(
    (total, collection) => total + collection.completed,
    0,
  );
  const overallPercentage = Math.round((totalCompleted / journeyCards.length) * 100);
  const nextCard = journeyCards.find(
    (card) => localStorage.getItem(`bridge-completed-${card.id}`) !== "true",
  ) || journeyCards[0];
  const hasStarted = totalCompleted > 0;

  return (
    <div className="home-page">
      <header className="navbar home-navbar">
        <Link className="logo" to="/" aria-label="BRIDGE home">BRIDGE</Link>

        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#learning-path">My path</a>
          <a href="#how-it-works">How it works</a>
          <a href="#collections">Collections</a>
        </nav>

        <Link className="nav-button button-link" to={`/cards/${nextCard.id}`}>
          {hasStarted ? "Continue learning" : "Start learning"}
        </Link>
      </header>

      <main id="main-content" className="home-hero" tabIndex="-1">
        <div className="home-hero-copy">
          <p className="home-eyebrow">A free customer-support career platform</p>
          <h1>
            Build the skills.
            <span>Bridge the gap.</span>
          </h1>
          <p className="home-hero-intro">
            Practical, beginner-friendly learning that helps you handle real
            customer situations and walk into interviews with confidence.
          </p>

          <div className="home-hero-actions">
            <Link className="button-link primary-button" to={`/cards/${nextCard.id}`}>
              {hasStarted ? "Continue your journey" : "Start your journey"}
              <span aria-hidden="true">{"\u2192"}</span>
            </Link>
            <a className="text-button" href="#collections">Explore collections</a>
          </div>

          <div className="home-proof" aria-label="Platform highlights">
            <span><strong>64</strong> Journey Cards</span>
            <span><strong>8</strong> skill collections</span>
            <span><strong>100%</strong> free</span>
          </div>
        </div>

        <div className="bridge-visual">
          <div className="bridge-sky-glow" aria-hidden="true" />
          <div className="bridge-half bridge-half-left" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <div className="bridge-half bridge-half-right" aria-hidden="true">
            <span /><span /><span /><span />
          </div>

          <nav className="bridge-path-cards" aria-label="Your collection progress bridge">
            {collectionStats.map((collection) => (
              <Link
                className={`bridge-path-card ${
                  collection.percentage === 100
                    ? "is-complete"
                    : collection.percentage > 0
                      ? "is-active"
                      : ""
                }`}
                data-label={collection.title}
                aria-label={`${collection.title}: ${collection.completed} of ${collection.cards.length} cards completed`}
                key={collection.id}
                title={`${collection.title}: ${collection.completed} of ${collection.cards.length} cards completed`}
                to={`/collections/${collection.id}`}
              >
                <span>{collection.number}</span>
                <div aria-hidden="true">
                  <i style={{ width: `${collection.percentage}%` }} />
                </div>
              </Link>
            ))}
          </nav>

          <div className="bridge-live-summary" aria-live="polite">
            <strong>{totalCompleted} / {journeyCards.length}</strong>
            <span>Every completed card builds your bridge.</span>
          </div>
        </div>
      </main>

      <section
        className="home-learning-path"
        id="learning-path"
        aria-labelledby="learning-path-heading"
      >
        <div className="learning-path-heading">
          <div>
            <p className="home-eyebrow">Your learning path</p>
            <h2 id="learning-path-heading">Every completed card builds your bridge.</h2>
          </div>

          <div className="overall-progress-summary" aria-label={`${overallPercentage}% complete`}>
            <span>{totalCompleted} of {journeyCards.length} cards completed</span>
            <strong>{overallPercentage}%</strong>
          </div>
        </div>

        <div className="learning-path-scroll">
          <nav className="learning-path-rail" aria-label="Collection progress">
            <div className="learning-path-line" aria-hidden="true">
              <span style={{ width: `${overallPercentage}%` }} />
            </div>

            {collectionStats.map((collection) => (
              <Link
                className={`learning-path-node ${
                  collection.percentage === 100
                    ? "is-complete"
                    : collection.percentage > 0
                      ? "is-active"
                      : ""
                }`}
                key={collection.id}
                to={`/collections/${collection.id}`}
              >
                <span className="path-node-marker">
                  {collection.percentage === 100 ? "\u2713" : collection.number}
                </span>
                <strong>{collection.title}</strong>
                <small>{collection.completed} / {collection.cards.length} cards</small>
              </Link>
            ))}
          </nav>
        </div>

        <Link className="learning-path-continue" to={`/cards/${nextCard.id}`}>
          {hasStarted ? "Continue from your next card" : "Begin with Foundations"}
          <span aria-hidden="true">{"\u2192"}</span>
        </Link>
      </section>

      <section className="home-method" id="how-it-works" aria-labelledby="method-heading">
        <div className="home-section-intro">
          <p className="home-eyebrow">Learn by doing</p>
          <h2 id="method-heading">From unsure to job-ready.</h2>
          <p>
            BRIDGE turns essential support knowledge into small, useful steps
            you can complete at your own pace.
          </p>
        </div>

        <div className="method-grid">
          {learningSteps.map((step) => (
            <article className="method-step" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="collections home-collections" id="collections" aria-labelledby="collections-heading">
        <div className="home-section-intro collections-intro">
          <p className="home-eyebrow">The complete learning path</p>
          <h2 id="collections-heading">Choose where to begin.</h2>
          <p>
            Start with Foundations or open the collection that matches the
            skill you want to strengthen today.
          </p>
        </div>

        <div className="collection-grid">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      <section className="home-closing" aria-labelledby="closing-heading">
        <p className="home-eyebrow">Your next step</p>
        <h2 id="closing-heading">A stronger support career starts with one card.</h2>
        <Link className="button-link primary-button" to={`/cards/${nextCard.id}`}>
          {hasStarted ? "Continue your journey" : "Begin with Foundations"}
          <span aria-hidden="true">{"\u2192"}</span>
        </Link>
      </section>

      <footer className="home-footer">
        <Link className="logo" to="/">BRIDGE</Link>
        <p>Every great support interaction builds a bridge.</p>
        <span>Built for aspiring support professionals.</span>
      </footer>
    </div>
  );
}

export default HomePage;
