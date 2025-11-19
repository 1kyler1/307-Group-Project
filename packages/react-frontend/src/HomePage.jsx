// src/HomePage.jsx
import React, { useState, useEffect } from "react";
import ListingCard from "./components/listingCard";
import "./HomePage.css";

export default function HomePage() {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allListings, setAllListings] = useState([]); // Store all listings

  useEffect(() => {
    async function loadAllListings() {
      try {
        // const res = await fetch("http://localhost:4000/api/items");
        const res = await fetch("https://groupproject307-gefba7dfhhdpe0cc.westus3-01.azurewebsites.net/api/items");
        

        if (!res.ok) {
          console.error("Error fetching listings:", res.status);
          return;
        }

        const data = await res.json();
        // Transform data to add 'id' field and format image URLs
        const formattedData = data.map((item) => ({
          ...item,
          id: item._id, // Add id field from _id
          imageUrl: item.imageUrl
            ? item.imageUrl.startsWith("http")
              ? item.imageUrl
              // : `http://localhost:4000${item.imageUrl}`
              : `https://groupproject307-gefba7dfhhdpe0cc.westus3-01.azurewebsites.net${item.imageUrl}`
            : null,
        }));
        setAllListings(formattedData || []);
        setListings(formattedData || []);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    }

    loadAllListings();
  }, []);

  // Filter listings based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setListings(allListings);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allListings.filter((item) => {
      return (
        item.title?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.location?.toLowerCase().includes(query) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    });
    setListings(filtered);
  }, [searchQuery, allListings]);

  return (
    <div className="home-container">
      <h1>Browse Listings</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title, description, location, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="listings-grid">
        {listings.length > 0 ? (
          listings.map((item) => <ListingCard key={item._id} item={item} />)
        ) : (
          <div className="no-results">
            {searchQuery
              ? "No listings found matching your search."
              : "No listings available."}
          </div>
        )}
      </div>
    </div>
  );
}
