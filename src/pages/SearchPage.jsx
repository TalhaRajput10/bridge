import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PublicFooter from "../components/PublicFooter.jsx";
import PublicHeader from "../components/PublicHeader.jsx";
import { collections } from "../data/collections.js";
import { journeyCards } from "../data/journeyCards.js";
import "./SearchPage.css";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [collectionId, setCollectionId] = useState("all");

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return journeyCards.filter((card) => {
      const collection = collections.find((item) => item.id === card.collectionId);
      const matchesCollection = collectionId === "all" || card.collectionId === collectionId;
      const searchableText = [card.title, card.description, card.skill, card.lesson, collection?.title]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return matchesCollection && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [collectionId, query]);

  return (
    <div className="card-search-page">
      <PublicHeader />
      <main id="main-content" tabIndex="-1">
        <section className="card-search-hero">
          <p className="card-search-eyebrow">All 64 Journey Cards</p>
          <h1>Find the skill you need.</h1>
          <p>Search plain-language lessons, practical scenarios, technical concepts, and interview preparation across every BRIDGE CST collection.</p>
          <label className="card-search-box">
            <span>Search Journey Cards</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try empathy, Zendesk, APIs, interviews..." autoComplete="off" />
          </label>
        </section>

        <section className="card-search-library" aria-labelledby="search-results-title">
          <div className="card-search-heading">
            <div><p className="card-search-eyebrow">Browse the curriculum</p><h2 id="search-results-title">{results.length} {results.length === 1 ? "card" : "cards"} found</h2></div>
            <label><span>Collection</span><select value={collectionId} onChange={(event) => setCollectionId(event.target.value)}><option value="all">All collections</option>{collections.map((collection) => <option value={collection.id} key={collection.id}>{collection.title}</option>)}</select></label>
          </div>

          {results.length ? <div className="card-search-grid">
            {results.map((card) => {
              const collection = collections.find((item) => item.id === card.collectionId);
              return <article className="card-search-result" key={card.id}>
                <div><span>{collection?.title}</span><small>Journey Card {card.number}</small></div>
                <h3><Link to={`/cards/${card.id}`}>{card.title}</Link></h3>
                <p>{card.description}</p>
                <footer><span>{card.difficulty} · {card.duration}</span><Link to={`/cards/${card.id}`} aria-label={`Open ${card.title}`}>Open card <span aria-hidden="true">→</span></Link></footer>
              </article>;
            })}
          </div> : <div className="card-search-empty"><h3>No matching Journey Card yet.</h3><p>Try a broader term or choose another collection.</p><button type="button" onClick={() => { setQuery(""); setCollectionId("all"); }}>Clear search</button></div>}
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
