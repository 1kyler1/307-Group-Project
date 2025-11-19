// SellersPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Listings from "./components/Listings";

export default function SellersPage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    async function loadMyListings() {
      try {
        const res = await fetch(
          "http://groupproject307-gefba7dfhhdpe0cc.westus3-01.azurewebsites.net/api/users/me/listings",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        const data = await res.json();
        setListings(data.listings || []);
      } catch (err) {
        console.error("Error fetching my listings:", err);
      }
    }

    loadMyListings();
  }, []);

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div>
      <h1>Sellers Page</h1>
      <button onClick={logout}>Log Out</button>
      <h2>My Listings</h2>
      <Listings items={listings} />
      <Link to="/redirect-to-create">
        <button>Create new listing</button>
      </Link>
    </div>
  );
}
