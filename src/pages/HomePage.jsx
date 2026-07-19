import { collections } from "../data/collections.js";
import CollectionCard from "../components/CollectionCard.jsx";

function HomePage() {
  return (
    <>
      <header className="navbar">
        <a className="logo" href="/">
          BRIDGE
        </a>

        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="#collections">Collections</a>
          <a href="#about">About</a>
        </nav>

        <button className="nav-button">Start Learning</button>
      </header>

      <main>
        <p>Customer Support Career Platform</p>

        <h1>BRIDGE</h1>

        <h2>
          Build the skills.
          <br />
          Land the role.
        </h2>

        <p>Every great support interaction builds a bridge.</p>

        <button>Start Your Journey</button>
      </main>

      <section className="collections" id="collections">
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