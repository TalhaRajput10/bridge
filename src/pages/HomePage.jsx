import { useMemo } from "react";
import { Link } from "react-router-dom";
import CollectionCard from "../components/CollectionCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { collections } from "../data/collections.js";
import { journeyCards } from "../data/journeyCards.js";
import "./HomePage.css";

const learningSteps = [
  { number: "01", title: "Learn the idea", description: "Short guidance written for people entering customer support." },
  { number: "02", title: "Practise the skill", description: "Respond to realistic situations in built-in Practice Labs." },
  { number: "03", title: "Build confidence", description: "Save your thinking, compare examples, and prepare for interviews." },
];

const pathMilestones = [
  { label: "Learn the basics", threshold: 12 },
  { label: "Handle challenges", threshold: 38 },
  { label: "Build confidence", threshold: 70 },
  { label: "Ace the interview", threshold: 100 },
];

function JourneyIcon({ type }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    chat: <><path {...common} d="M5 6.5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7l-4.5 3v-3H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"/><path {...common} d="M8 12h.01M12 12h.01M16 12h.01"/></>,
    user: <><circle {...common} cx="12" cy="8" r="3.5"/><path {...common} d="M5 21v-2.5a5.5 5.5 0 0 1 5.5-5.5h3a5.5 5.5 0 0 1 5.5 5.5V21"/></>,
    headset: <><path {...common} d="M4 14v-2a8 8 0 0 1 16 0v2"/><path {...common} d="M4 14h3v6H5a1 1 0 0 1-1-1v-5ZM20 14h-3v6h2a1 1 0 0 0 1-1v-5ZM17 20c0 1.1-.9 2-2 2h-3"/></>,
    document: <><path {...common} d="M7 3h7l4 4v14H7z"/><path {...common} d="M14 3v5h4M10 12h5M10 16h5"/></>,
    shield: <><path {...common} d="M12 3 20 6v6c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6z"/><path {...common} d="m8.5 12 2.2 2.2 4.8-5"/></>,
    spark: <><path {...common} d="m12 3 1.6 4.8L18 10l-4.4 2.2L12 17l-1.6-4.8L6 10l4.4-2.2z"/><path {...common} d="M19 4v3M20.5 5.5h-3"/></>,
    chart: <><path {...common} d="M4 20h16"/><path {...common} d="M6 17v-5h3v5M11 17V8h3v9M16 17V4h3v13"/></>,
    graduate: <><path {...common} d="m3 9 9-5 9 5-9 5z"/><path {...common} d="M7 12v4c2.7 2 7.3 2 10 0v-4M21 9v6"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>;
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getCurrentWeek() {
  const today = new Date();
  const monday = new Date(today);
  const offset = (today.getDay() + 6) % 7;
  monday.setDate(today.getDate() - offset);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return { label: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index], key: localDateKey(date) };
  });
}

function HomePage() {
  const { user } = useAuth();
  const { activityDates, completedCount, isCardComplete, streakCount } = useProgress();

  const collectionStats = collections.map((collection) => {
    const cards = journeyCards.filter((card) => card.collectionId === collection.id);
    const completed = cards.filter((card) => isCardComplete(card.id)).length;
    return { ...collection, cards, completed, percentage: cards.length ? Math.round((completed / cards.length) * 100) : 0 };
  });

  const totalCompleted = completedCount;
  const overallPercentage = journeyCards.length ? Math.round((totalCompleted / journeyCards.length) * 100) : 0;
  const nextCard = journeyCards.find((card) => !isCardComplete(card.id)) || journeyCards[0];
  const hasStarted = totalCompleted > 0;
  const week = useMemo(() => getCurrentWeek(), []);
  const streakDates = new Set(activityDates);
  const avatarLabel = user?.email?.slice(0, 1).toUpperCase() || "?";

  return (
    <div className="home-page">
      <header className="home-navbar">
        <Link className="home-logo" to="/" aria-label="BRIDGE CST home">BRIDGE <span>CST</span></Link>
        <nav className="home-nav-links" aria-label="Primary navigation">
          <a href="#learning-path">My Path</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#collections">Collections</a>
          <Link to="/resources">Resources</Link>
        </nav>
        <div className="home-account-actions">
          {user ? (
            <>
              <span className="nav-streak" aria-label={`${streakCount} day learning streak`}><span aria-hidden="true">●</span>{streakCount} day streak</span>
              <Link className="home-avatar" to="/account" aria-label="Open your account">{avatarLabel}</Link>
            </>
          ) : (
            <Link className="home-sign-in" to="/auth">Sign in</Link>
          )}
        </div>
      </header>

      <main id="main-content" className="home-hero" tabIndex="-1">
        <div className="home-hero-copy">
          <p className="home-eyebrow">Customer Support Training for Global Careers</p>
          <h1>Build the skills.<span>Bridge the gap.</span></h1>
          <p className="home-hero-intro">Practical, beginner-friendly learning for real customer situations and confident interviews—built in Pakistan with a global outlook.</p>
          <div className="home-hero-actions">
            <Link className="home-primary-button" to={`/cards/${nextCard.id}`}>{hasStarted ? "Continue your journey" : "Start your journey"}<span aria-hidden="true">→</span></Link>
            <a className="home-secondary-button" href="#collections">Explore collections</a>
          </div>
        </div>

        <div className="night-bridge" aria-label="Journey Cards forming a bridge across your learning path">
          <span className="moon" aria-hidden="true" />
          <div className="bridge-land bridge-land-left" aria-hidden="true"><i /><i /></div>
          <div className="bridge-land bridge-land-right" aria-hidden="true"><i /><i /></div>
          <div className="bridge-water" aria-hidden="true" />
          <nav className="hero-journey-cards" aria-label="Featured collections">
            {collectionStats.map((collection, index) => (
              <Link key={collection.id} to={`/collections/${collection.id}`} aria-label={`${collection.title}: ${collection.percentage}% complete`}>
                <span className="hero-card-icon"><JourneyIcon type={["chat", "user", "headset", "document", "shield", "spark", "chart", "graduate"][index]} /></span>
                <i><b style={{ width: `${Math.max(collection.percentage, 8)}%` }} /></i>
              </Link>
            ))}
          </nav>
        </div>
      </main>

      <section className="home-learning-path" id="learning-path" aria-labelledby="learning-path-heading">
        <div className="learning-path-topline">
          <h2 id="learning-path-heading">Your learning path</h2>
          <p><strong>{totalCompleted}</strong> / {journeyCards.length} cards completed</p>
        </div>
        <div className="milestone-rail" style={{ "--progress": `${overallPercentage}%` }}>
          {pathMilestones.map((milestone, index) => {
            const complete = overallPercentage >= milestone.threshold;
            const active = !complete && (index === 0 || overallPercentage >= pathMilestones[index - 1].threshold);
            return <div className={`milestone ${complete ? "is-complete" : ""} ${active ? "is-active" : ""}`} key={milestone.label}><span>{complete ? "✓" : index + 1}</span><strong>{milestone.label}</strong></div>;
          })}
        </div>

        <div className="home-dashboard-row">
          <Link className="continue-learning-card" to={`/cards/${nextCard.id}`}>
            <span className="continue-icon" aria-hidden="true">◌</span>
            <span><small>Next</small><strong>{nextCard.title}</strong><em>Keep the bridge moving.</em></span>
            <b aria-hidden="true">→</b>
          </Link>

          <section className="streak-strip" aria-labelledby="streak-heading">
            <div className="streak-heading"><h3 id="streak-heading">{user ? `${streakCount} day streak` : "Build a learning streak"}</h3>{!user && <Link to="/auth">Sign in to track it</Link>}</div>
            <div className="streak-days">
              {week.map((day) => <span className={streakDates.has(day.key) ? "is-done" : ""} key={day.key}><i>{streakDates.has(day.key) ? "✓" : ""}</i><small>{day.label}</small></span>)}
            </div>
          </section>
        </div>
        <a className="quiet-collections-link" href="#collections">Explore all collections <span aria-hidden="true">→</span></a>
      </section>

      <section className="home-method" id="how-it-works" aria-labelledby="method-heading">
        <div className="home-section-intro"><p className="home-eyebrow">Learn by doing</p><h2 id="method-heading">From unsure to job-ready.</h2><p>Essential support knowledge, broken into useful steps you can complete at your own pace.</p></div>
        <div className="method-grid">{learningSteps.map((step) => <article className="method-step" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div>
      </section>

      <section className="home-collections" id="collections" aria-labelledby="collections-heading">
        <div className="home-section-intro"><p className="home-eyebrow">The complete learning path</p><h2 id="collections-heading">Choose where to begin.</h2><p>Start with Foundations or strengthen the skill you need today.</p></div>
        <div className="collection-grid">{collections.map((collection) => <CollectionCard key={collection.id} collection={collection} />)}</div>
      </section>

      <section className="home-closing"><p className="home-eyebrow">Your next step</p><h2>A stronger support career starts with one card.</h2><Link className="home-primary-button" to={`/cards/${nextCard.id}`}>{hasStarted ? "Continue your journey" : "Begin with Foundations"}<span aria-hidden="true">→</span></Link></section>
      <footer className="home-footer"><Link className="home-logo" to="/">BRIDGE <span>CST</span></Link><p>Every great support interaction builds a bridge.</p></footer>

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        <Link className="is-current" to="/"><span aria-hidden="true">⌂</span>Home</Link>
        <Link to={`/cards/${nextCard.id}`}><span aria-hidden="true">◇</span>Journey</Link>
        <a href="#collections"><span aria-hidden="true">▤</span>Collections</a>
        <Link to={user ? "/account" : "/auth"}><span aria-hidden="true">○</span>Account</Link>
      </nav>
    </div>
  );
}

export default HomePage;
