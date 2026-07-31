import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { journeyCards } from "../data/journeyCards.js";
import { supabase } from "../lib/supabase.js";

function AccountPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) return <main className="account-page"><p>Loading your account…</p></main>;
  if (!user) return <Navigate to="/auth" replace />;

  const completed = journeyCards.filter(
    (card) => localStorage.getItem(`bridge-completed-${card.id}`) === "true",
  ).length;
  const percentage = journeyCards.length ? Math.round((completed / journeyCards.length) * 100) : 0;

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <main className="account-page" id="main-content">
      <section className="account-panel">
        <Link className="auth-logo" to="/">BRIDGE</Link>
        <p className="eyebrow">YOUR LEARNING ACCOUNT</p>
        <h1>Your bridge, in progress.</h1>
        <p className="account-email">Signed in as {user.email}</p>
        <div className="account-progress">
          <span><strong>{completed}</strong> of {journeyCards.length} cards</span>
          <b>{percentage}%</b>
          <div><i style={{ width: `${percentage}%` }} /></div>
        </div>
        <div className="account-actions">
          <Link to="/#learning-path">Continue learning</Link>
          <button type="button" onClick={signOut}>Sign out</button>
        </div>
        <p className="account-note">Your current card progress is stored on this device. Cross-device syncing is the next account upgrade.</p>
      </section>
    </main>
  );
}

export default AccountPage;
