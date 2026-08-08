import { Link } from "react-router-dom";
import PublicFooter from "../components/PublicFooter.jsx";
import PublicHeader from "../components/PublicHeader.jsx";
import { faqGroups } from "../data/faqs.js";
import "./FaqPage.css";

export default function FaqPage() {
  return <div className="faq-page"><PublicHeader/><main id="main-content" tabIndex="-1"><header className="faq-hero"><p>BRIDGE CST FAQ</p><h1>The useful answers, before you need to ask.</h1><span>Learn how the platform works, what an account saves, and what BRIDGE CST can and cannot promise.</span></header><div className="faq-layout"><aside><strong>Topics</strong>{faqGroups.map((group)=><a href={`#${group.id}`} key={group.id}>{group.title}</a>)}</aside><div>{faqGroups.map((group)=><section id={group.id} key={group.id}><p>{group.title}</p>{group.items.map((item)=><details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><div><p>{item.answer}</p></div></details>)}</section>)}</div></div><section className="faq-closing"><h2>Ready to turn an answer into a skill?</h2><Link to="/collections/foundations">Start with Foundations <span aria-hidden="true">→</span></Link></section></main><PublicFooter/></div>;
}

