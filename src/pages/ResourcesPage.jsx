import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  externalResources,
  resourceCategories,
} from "../data/resources.js";
import "./ResourcesPage.css";

function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All resources");
  const [searchTerm, setSearchTerm] = useState("");

  const visibleResources = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return externalResources.filter((resource) => {
      const matchesCategory =
        activeCategory === "All resources" || resource.category === activeCategory;
      const matchesSearch =
        !query ||
        [
          resource.title,
          resource.provider,
          resource.category,
          resource.description,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="resources-page">
      <header className="resources-navbar">
        <Link className="logo" to="/" aria-label="BRIDGE CST home">
          BRIDGE <span>CST</span>
        </Link>

        <nav aria-label="Resources navigation">
          <Link to="/#collections">Collections</Link>
          <Link to="/guides">Guides</Link>
          <Link className="is-current" to="/resources" aria-current="page">
            Resources
          </Link>
          <Link to="/faq">FAQ</Link>
        </nav>

        <Link className="resources-start-link" to="/cards/what-customer-support-means">
          Start learning
        </Link>
      </header>

      <main id="main-content">
        <section className="resources-hero">
          <p className="resources-eyebrow">The BRIDGE CST resource shelf</p>
          <h1>Useful links, without the tab chaos.</h1>
          <p>
            Every external guide, practice tool, and official product reference
            used across the Journey Cards lives here. BRIDGE CST does not own these
            websites, and interfaces or availability may change.
          </p>
        </section>

        <section className="resources-library" aria-labelledby="resources-heading">
          <div className="resources-library-heading">
            <div>
              <p className="resources-eyebrow">Browse the library</p>
              <h2 id="resources-heading">{visibleResources.length} resources ready to explore</h2>
            </div>

            <label className="resource-search">
              <span>Search resources</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Try Zendesk, typing, HTTP..."
              />
            </label>
          </div>

          <div className="resource-filters" aria-label="Filter resources by category">
            {resourceCategories.map((category) => (
              <button
                type="button"
                key={category}
                className={category === activeCategory ? "is-active" : ""}
                aria-pressed={category === activeCategory}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="resource-grid">
            {visibleResources.map((resource) => (
              <article className="resource-card" key={resource.id}>
                <div className="resource-card-meta">
                  <span>{resource.category}</span>
                  <span>{resource.type}</span>
                </div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <div className="resource-card-footer">
                  <span>By {resource.provider}</span>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${resource.title} in a new tab`}
                  >
                    Open resource <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {!visibleResources.length && (
            <div className="resource-empty">
              <h3>No matching resources yet.</h3>
              <p>Try a broader search or choose a different category.</p>
            </div>
          )}

          <aside className="resource-use-note">
            <p>One useful rule</p>
            <h2>Learn the idea here. Use the official source when details matter.</h2>
            <p>
              Product interfaces, policies, and technical documentation change.
              Journey Cards explain the beginner concept; the linked source is
              where you confirm the current details.
            </p>
          </aside>
        </section>
      </main>

      <footer className="resources-footer">
        <Link className="logo" to="/">BRIDGE <span>CST</span></Link>
        <p>Every great support interaction builds a bridge.</p>
      </footer>
    </div>
  );
}

export default ResourcesPage;
