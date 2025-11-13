// src/HomePage.jsx
import React, { useState, useEffect } from "react";
import Listings from "./components/Listings";

export default function HomePage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function loadAllListings() {
      try {
        const res = await fetch("http://localhost:4000/api/items");

        if (!res.ok) {
          console.error("Error fetching listings:", res.status);
          return;
        }

        const data = await res.json();
        // Transform data to add 'id' field and format image URLs
        const formattedData = data.map(item => ({
          ...item,
          id: item._id, // Add id field from _id
          imageUrl: item.imageUrl 
            ? (item.imageUrl.startsWith('http') 
                ? item.imageUrl 
                : `http://localhost:4000${item.imageUrl}`)
            : null
        }));
        setListings(formattedData || []);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    }

    loadAllListings();
  }, []);

  return (
    <div>
      <h1>All Listings</h1>
      <Listings items={listings} />
    </div>
  );
}