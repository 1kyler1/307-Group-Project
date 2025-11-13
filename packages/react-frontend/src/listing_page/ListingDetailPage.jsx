import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ListingDetailPage() {
  const { id } = useParams();        
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/items/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setItem(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>Loading...</div>;

  return (
    <div className="listing-detail">
      <Link to="/">← Back to Listings</Link>
      <h1>{item.title}</h1>

      {item.imageUrl && (
        <img
          src={`http://localhost:4000${item.imageUrl}`}
          alt={item.title}
          className="listing-detail-image"
        />
      )}

      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Location:</strong> {item.location}</p>
	  <p><strong>Tags:</strong> {item.tags.join(", ")}</p>
    </div>
  );
}
