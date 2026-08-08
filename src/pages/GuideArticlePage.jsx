import { Link, useParams } from "react-router-dom";
import PublicFooter from "../components/PublicFooter.jsx";
import PublicHeader from "../components/PublicHeader.jsx";
import { getGuideById, getGuideCategory, guides } from "../data/guides.js";
import { journeyCards } from "../data/journeyCards.js";
import "./GuideArticlePage.css";

function headingId(heading) { return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

export default function GuideArticlePage() {
  const { guideId } = useParams();
  const guide = getGuideById(guideId);
  if (!guide) return <div className="guide-article-page"><PublicHeader/><main id="main-content" className="missing-guide"><h1>Guide not found.</h1><Link to="/guides">Browse all guides</Link></main><PublicFooter/></div>;

  const category = getGuideCategory(guide.category);
  const relatedCards = guide.relatedCardIds.map((id) => journeyCards.find((card) => card.id === id)).filter(Boolean);
  const relatedGuides = guides.filter((item) => item.category === guide.category && item.id !== guide.id).slice(0, 2);

  return (
    <div className="guide-article-page">
      <PublicHeader />
      <main id="main-content" tabIndex="-1">
        <header className="guide-article-hero">
          <nav aria-label="Breadcrumb"><Link to="/guides">Guides</Link><span>/</span><span>{category?.label}</span></nav>
          <p className="guide-article-eyebrow">{category?.label}</p>
          <h1>{guide.title}</h1>
          <p>{guide.excerpt}</p>
          <div><span>{guide.readingTime} min read</span><span>Published {new Date(`${guide.publishedAt}T00:00:00`).toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" })}</span><span>By Talha Rajput</span></div>
        </header>

        <div className="guide-article-layout">
          <aside className="guide-toc"><strong>In this guide</strong><nav>{guide.sections.map((section, index) => <a href={`#${headingId(section.heading)}`} key={section.heading}><span>{String(index + 1).padStart(2,"0")}</span>{section.heading}</a>)}</nav></aside>
          <article className="guide-body">
            {guide.sections.map((section) => <section id={headingId(section.heading)} key={section.heading}><h2>{section.heading}</h2>{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}
            {guide.externalLinks?.length > 0 && <section className="guide-tools"><p className="guide-article-eyebrow">Free and official resources</p><h2>Try the tools mentioned in this guide.</h2><div>{guide.externalLinks.map((link) => <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>{link.label}<span aria-hidden="true">↗</span></a>)}</div></section>}
            <aside className="guide-takeaway"><p className="guide-article-eyebrow">Key takeaway</p><p>{guide.takeaway}</p></aside>
          </article>
        </div>

        <section className="guide-next-steps" aria-labelledby="guide-next-title"><p className="guide-article-eyebrow">Continue learning</p><h2 id="guide-next-title">Turn the guide into practice.</h2><div>{relatedCards.map((card) => <article key={card.id}><p>{card.collectionTitle || "Journey Card"}</p><h3>{card.title}</h3><Link to={`/cards/${card.id}`}>Open Journey Card <span aria-hidden="true">→</span></Link></article>)}</div></section>
        {relatedGuides.length > 0 && <section className="related-guides"><h2>Related guides</h2><div>{relatedGuides.map((item) => <Link to={`/guides/${item.id}`} key={item.id}><span>{item.readingTime} min read</span><strong>{item.title}</strong><small>Read guide →</small></Link>)}</div></section>}
      </main>
      <PublicFooter />
    </div>
  );
}

