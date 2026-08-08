import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { journeyCards } from "../data/journeyCards.js";
import { supabase } from "../lib/supabase.js";

function AccountPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { completedCount, syncStatus } = useProgress();

  if (loading) return <main className="account-page"><p>Loading your account…</p></main>;
  if (!user) return <Navigate to="/auth" replace />;

  const completed = completedCount;
  const percentage = journeyCards.length ? Math.round((completed / journeyCards.length) * 100) : 0;

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <main className="account-page" id="main-content">
      <section className="account-panel">
        <Link className="auth-logo" to="/">BRIDGE <span>CST</span></Link>
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
        <p className="account-note" aria-live="polite">
          {syncStatus === "synced" && "Your progress is synced across your BRIDGE CST account."}
          {["loading", "pending", "syncing"].includes(syncStatus) && "Syncing your latest learning progress…"}
          {syncStatus === "error" && "Your progress is safe on this device, but cloud sync needs attention."}
          {syncStatus === "local" && "Your progress is currently stored on this device."}
        </p>
      </section>
    </main>
  );
}

export default AccountPage;
