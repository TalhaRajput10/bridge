import { Link } from "react-router-dom";
import PublicFooter from "../components/PublicFooter.jsx";
import PublicHeader from "../components/PublicHeader.jsx";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-page">
      <PublicHeader />
      <main id="main-content" tabIndex="-1">
        <section className="about-hero">
          <p className="about-eyebrow">Why BRIDGE CST exists</p>
          <h1>Customer support deserves a clearer starting point.</h1>
          <p>BRIDGE CST is a free learning platform created for people preparing for their first customer support role or building confidence early in their career.</p>
        </section>

        <section className="about-story" aria-labelledby="about-story-title">
          <div><p className="about-eyebrow">The idea</p><h2 id="about-story-title">Built from real support work—not a generic course outline.</h2></div>
          <div><p>Customer support is often reduced to “answering tickets.” The real work demands empathy, investigation, technical curiosity, judgment, documentation, and ownership.</p><p>Talha Rajput created BRIDGE CST after working directly with customers and seeing how difficult it can be for beginners—especially Pakistan-based professionals pursuing global roles—to find one practical, approachable place to learn those skills.</p><p>Journey Cards turn that uncertainty into short lessons, realistic situations, Practice Labs, and interview connections. The goal is not to make support look easy. It is to make the path into the profession understandable.</p></div>
        </section>

        <section className="about-principles" aria-labelledby="about-principles-title">
          <p className="about-eyebrow">What guides the product</p><h2 id="about-principles-title">Practical. Accessible. Honest.</h2>
          <div><article><span>01</span><h3>Skills before completion</h3><p>Progress matters when a learner can explain, practise, and apply the idea—not merely open a card.</p></article><article><span>02</span><h3>Plain language without shortcuts</h3><p>Jargon is translated, technical topics are introduced carefully, and difficult concepts remain accurate.</p></article><article><span>03</span><h3>Confidence without false promises</h3><p>BRIDGE CST helps learners prepare; it does not guarantee jobs, promotions, or effortless outcomes.</p></article></div>
        </section>

        <section className="about-ownership" aria-labelledby="about-ownership-title"><div><p className="about-eyebrow">Product ownership and assistance</p><h2 id="about-ownership-title">An original project by Talha Rajput.</h2></div><div><p>The concept, audience, product direction, curriculum decisions, visual direction, and final editorial judgment behind BRIDGE CST belong to Talha Rajput.</p><p>AI tools, including ChatGPT and Codex, have supported research organization, drafting, code assistance, quality checks, and iteration as project assistants. They are not the source of the core idea or product ownership.</p></div></section>

        <section className="about-cta"><p className="about-eyebrow">Start where you are</p><h2>One useful skill can change the next conversation.</h2><div><Link to="/cards/what-customer-support-means">Start your first Journey Card <span aria-hidden="true">→</span></Link><Link to="/search">Search all 64 cards</Link></div></section>
      </main>
      <PublicFooter />
    </div>
  );
}
