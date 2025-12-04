// SellersPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SellerListingCard from "./components/SellerListingCard";
import { useAuth } from "./auth/useAuth";
import "./css/HomePage.css";

export default function SellersPage() {
  const [listings, setListings] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    async function loadMyListings() {
      try {
        const res = await fetch(
          "https://groupproject307-gefba7dfhhdpe0cc.westus3-01.azurewebsites.net/api/users/me/listings",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          logout();
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

  async function handleDeleteListing(itemId) {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch(
        `https://groupproject307-gefba7dfhhdpe0cc.westus3-01.azurewebsites.net/api/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        logout();
        window.location.href = "/login";
        return;
      }

      if (res.ok) {
        // Remove the deleted item from the local state
        setListings((prevListings) =>
          prevListings.filter((listing) => listing._id !== itemId),
        );
      } else {
        // Check if response is JSON before parsing
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const error = await res.json();
          alert(error.error || "Failed to delete listing");
        } else {
          // Handle HTML error pages (like 404 pages from Azure)
          const text = await res.text();
          console.error("Non-JSON error response:", text.substring(0, 100));
          if (res.status === 404) {
            alert(
              "Delete endpoint not found. The endpoint may not be deployed to the server yet.",
            );
          } else {
            alert(
              `Failed to delete listing. Server returned status ${res.status}.`,
            );
          }
        }
      }
    } catch (err) {
      console.error("Error deleting listing:", err);
      if (err.message.includes("JSON")) {
        alert(
          "Server returned an invalid response. The delete endpoint may not be deployed yet.",
        );
      } else {
        alert("Error deleting listing. Please try again.");
      }
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    logout();
    window.location.href = "/"; // go back to home page
  }

  return (
    <div className="home-container">
      <h1>Seller Dashboard</h1>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <h2>My Listings</h2>
      <div className="listings-grid">
        {listings.length > 0 ? (
          listings.map((item) => (
            <SellerListingCard
              key={item._id}
              item={item}
              onDelete={handleDeleteListing}
            />
          ))
        ) : (
          <div>No listings found.</div>
        )}
      </div>
      <div style={{ marginTop: "2rem" }}>
        <Link to="/redirect-to-create">
          <button>Create New Listing</button>
        </Link>
      </div>
    </div>
  );
}
