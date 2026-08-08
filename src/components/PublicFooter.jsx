import { Link } from "react-router-dom";
import "./PublicFooter.css";

export default function PublicFooter() {
  return (
    <footer className="public-footer">
      <div><Link to="/">BRIDGE <span>CST</span></Link><p>Free customer support training for global careers.</p></div>
      <nav aria-label="Footer navigation"><Link to="/search">Search cards</Link><Link to="/guides">Guides</Link><Link to="/resources">Resources</Link><Link to="/faq">FAQ</Link><Link to="/about">About</Link></nav>
    </footer>
  );
}

