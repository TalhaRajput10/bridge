import { useState } from "react";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: sessionLoading } = useAuth();
  const isRecovery = new URLSearchParams(location.search).get("recovery") === "true";

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (sessionLoading) {
    return <p>Loading your account...</p>;
  }

  if (user && !isRecovery) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isSupabaseConfigured || !supabase) {
      setErrorMessage("Accounts are temporarily unavailable. Please try again shortly.");
      return;
    }

    setSubmitting(true);
    setMessage("");
    setErrorMessage("");

    try {
      if (isRecovery) {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        navigate("/", { replace: true });
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        setMessage(
          "Account created. Please check your email to confirm your account.",
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleForgotPassword() {
    setMessage("");
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Enter your email address first, then select Forgot password.");
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setErrorMessage("Accounts are temporarily unavailable. Please try again shortly.");
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth?recovery=true`,
      });

      if (error) throw error;
      setMessage("Password reset email sent. Check your inbox for the secure link.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to send the reset email.");
    } finally {
      setSubmitting(false);
    }
  }

  function changeMode(nextMode) {
    setMode(nextMode);
    setMessage("");
    setErrorMessage("");
  }

  const heading = isRecovery
    ? "Set a new password."
    : mode === "login"
      ? "Welcome back."
      : "Start building your bridge.";

  const description = isRecovery
    ? "Choose a new password with at least eight characters."
    : mode === "login"
      ? "Continue your Journey Cards and pick up where you left off."
      : "Create a free account to save your progress across devices.";

  return (
    <main id="main-content" className="auth-page">
      <section className="auth-story" aria-labelledby="auth-story-heading">
        <Link to="/" className="auth-logo">BRIDGE</Link>
        <div>
          <h2 id="auth-story-heading">Your progress<br />follows you.</h2>
          <p>Sign in to continue building practical skills, saving responses, and keeping your learning streak alive.</p>
        </div>
      </section>

      <section className="auth-panel">
        <p className="eyebrow">YOUR LEARNING ACCOUNT</p>
        <h1>{heading}</h1>
        <p>{description}</p>

        {!isRecovery && (
          <div className="auth-tabs" aria-label="Account options">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => changeMode("login")}
            >
              Log in
            </button>
            <button
              type="button"
              className={mode === "signup" ? "active" : ""}
              onClick={() => changeMode("signup")}
            >
              Create account
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isRecovery && (
            <>
              <label htmlFor="auth-email">Email address</label>
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </>
          )}

          <div className="auth-password-row">
            <label htmlFor="auth-password">
              {isRecovery ? "New password" : "Password"}
            </label>
            {!isRecovery && mode === "login" && (
              <button
                type="button"
                className="auth-forgot-button"
                onClick={handleForgotPassword}
                disabled={submitting}
              >
                Forgot password?
              </button>
            )}
          </div>

          <input
            id="auth-password"
            type="password"
            autoComplete={isRecovery || mode === "signup" ? "new-password" : "current-password"}
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {errorMessage && (
            <p className="auth-message auth-error" role="alert">{errorMessage}</p>
          )}
          {message && (
            <p className="auth-message auth-success" role="status">{message}</p>
          )}

          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting
              ? "Please wait..."
              : isRecovery
                ? "Update password"
                : mode === "login"
                  ? "Log in"
                  : "Create free account"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AuthPage;
