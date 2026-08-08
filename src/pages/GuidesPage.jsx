import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PublicFooter from "../components/PublicFooter.jsx";
import PublicHeader from "../components/PublicHeader.jsx";
import { guideCategories, guides } from "../data/guides.js";
import "./GuidesPage.css";

export default function GuidesPage() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const featuredGuide = guides.find((guide) => guide.featured);
  const visibleGuides = useMemo(() => guides.filter((guide) => {
    const categoryMatches = category === "all" || guide.category === category;
    const searchText = `${guide.title} ${guide.excerpt} ${guide.keywords.join(" ")}`.toLowerCase();
    return categoryMatches && searchText.includes(query.trim().toLowerCase());
  }), [category, query]);

  return (
    <div className="guides-page">
      <PublicHeader />
      <main id="main-content" tabIndex="-1">
        <section className="guides-hero">
          <p className="guides-eyebrow">BRIDGE CST Guides</p>
          <h1>Practical career guidance, without the gatekeeping.</h1>
          <p>Original guides for customer support careers, applications, interviews, tools, industries, and BPO campaigns.</p>
          <div className="guides-summary"><span><strong>{guides.length}</strong> launch guides</span><span><strong>{guideCategories.length}</strong> topic areas</span><span><strong>Free</strong> to read</span></div>
        </section>

        {featuredGuide && <section className="featured-guide" aria-labelledby="featured-guide-title">
          <div><p className="guides-eyebrow">Start here</p><h2 id="featured-guide-title">{featuredGuide.title}</h2><p>{featuredGuide.excerpt}</p><Link to={`/guides/${featuredGuide.id}`}>Read the guide <span aria-hidden="true">→</span></Link></div>
          <aside><span>{featuredGuide.readingTime} min read</span><strong>Beginner-friendly</strong><small>Includes related Journey Cards</small></aside>
        </section>}

        <section className="guide-library" aria-labelledby="guide-library-title">
          <div className="guide-library-heading"><div><p className="guides-eyebrow">Explore the library</p><h2 id="guide-library-title">Choose what you need today.</h2></div><label><span className="sr-only">Search guides</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search guides" /></label></div>
          <div className="guide-filters" role="group" aria-label="Filter guides by topic">
            <button className={category === "all" ? "is-active" : ""} onClick={() => setCategory("all")} type="button">All</button>
            {guideCategories.map((item) => <button className={category === item.id ? "is-active" : ""} key={item.id} onClick={() => setCategory(item.id)} type="button">{item.label}</button>)}
          </div>
          <p className="guide-results" aria-live="polite">Showing {visibleGuides.length} {visibleGuides.length === 1 ? "guide" : "guides"}</p>
          <div className="guide-grid">
            {visibleGuides.map((guide, index) => {
              const categoryLabel = guideCategories.find((item) => item.id === guide.category)?.label;
              return <article className="guide-card" key={guide.id}><span>{String(index + 1).padStart(2, "0")}</span><p>{categoryLabel}</p><h3><Link to={`/guides/${guide.id}`}>{guide.title}</Link></h3><p>{guide.excerpt}</p><footer><small>{guide.readingTime} min read</small><Link to={`/guides/${guide.id}`} aria-label={`Read ${guide.title}`}>Read <span aria-hidden="true">→</span></Link></footer></article>;
            })}
          </div>
          {!visibleGuides.length && <p className="empty-guides">No guide matches that search yet. Try a broader term or another topic.</p>}
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

