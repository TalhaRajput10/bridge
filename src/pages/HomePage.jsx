import { Link } from "react-router-dom";
import CollectionCard from "../components/CollectionCard.jsx";
import { collections } from "../data/collections.js";

function HomePage() {
  return (
    <>
      <header className="navbar">
        <Link className="logo" to="/">
          BRIDGE
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <a href="#collections">Collections</a>
        </nav>

        <Link
          className="nav-button button-link"
          to="/collections/foundations"
        >
          Start Learning
        </Link>
      </header>

      <main id="main-content" tabIndex="-1">
        <p>Customer Support Career Platform</p>

        <h1>BRIDGE</h1>

        <h2>
          Build the skills.
          <br />
          Land the role.
        </h2>

        <p>
          Every great support interaction builds a bridge.
        </p>

        <Link
          className="primary-button button-link"
          to="/collections/foundations"
        >
          Start Your Journey
        </Link>
      </main>

      <section
        className="collections"
        id="collections"
      >
        <div className="section-heading">
          <p>Explore the curriculum</p>
          <h2>Choose your collection.</h2>
        </div>

        <div className="collection-grid">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;