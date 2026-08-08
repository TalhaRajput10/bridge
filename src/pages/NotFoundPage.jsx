import { Link } from "react-router-dom";
import PublicHeader from "../components/PublicHeader.jsx";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return <div className="not-found-page"><PublicHeader /><main id="main-content" tabIndex="-1"><p>404 · Wrong turn</p><h1>This bridge does not lead anywhere yet.</h1><p>The address may be incomplete, outdated, or mistyped. Your learning progress has not been affected.</p><div><Link to="/">Return home</Link><Link to="/search">Search Journey Cards</Link></div></main></div>;
}
