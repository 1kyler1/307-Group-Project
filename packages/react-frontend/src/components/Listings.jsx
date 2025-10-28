//Listings.jsx
import React, { useEffect, useState } from "react";
import ListingCard from "./listingCard";

export default function Listings() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/items", {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-4">Loading listings…</div>;
  if (err) return <div className="p-4 text-red-600">Failed to load: {err}</div>;
  if (!items.length) return <div className="p-4">No listings found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {items.map((item) => (
        <ListingCard key={item._id} item={item} />
      ))}
    </div>
  );
}
