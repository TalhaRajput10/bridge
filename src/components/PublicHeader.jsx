import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./PublicHeader.css";

export default function PublicHeader() {
  const { user } = useAuth();

  return (
    <header className="public-header">
      <Link className="public-logo" to="/" aria-label="BRIDGE CST home">BRIDGE <span>CST</span></Link>
      <nav aria-label="Primary navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/guides">Guides</NavLink>
        <NavLink to="/resources">Resources</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <Link className="public-account-link" to={user ? "/account" : "/auth"}>{user ? "My account" : "Sign in"}</Link>
    </header>
  );
}

