import { Link } from "react-router-dom";

function CollectionCard({ collection }) {
  return (
    <article className="collection-card">
      <span>{collection.number}</span>

      <h3>{collection.title}</h3>

      <p>{collection.description}</p>

      <Link to={`/collections/${collection.id}`}>
        Explore Collection →
      </Link>
    </article>
  );
}

export default CollectionCard;