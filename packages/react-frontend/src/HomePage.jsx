// HomePage.jsx
import React, { useState, useEffect } from "react";
import ListingCard from "./components/listingCard";
import "./HomePage.css";

export default function HomePage() {
  const [listings, setListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedGenders, setSelectedGenders] = useState({
    male: false,
    female: false,
  });

  const [selectedCategories, setSelectedCategories] = useState({
    top: false,
    bottoms: false,
    accessories: false,
  });

  useEffect(() => {
    async function loadAllListings() {
      try {
        const res = await fetch(
          "https://groupproject307-gefba7dfhhdpe0cc.westus3-01.azurewebsites.net/api/items",
        );

        if (!res.ok) {
          console.error("Error fetching listings:", res.status);
          return;
        }

        const data = await res.json();

        const formattedData = data.map((item) => ({
          ...item,
          id: item._id,
          imageUrl: item.imageUrl
            ? item.imageUrl.startsWith("http")
              ? item.imageUrl
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

  useEffect(() => {
    if (!allListings || allListings.length === 0) {
      setListings([]);
      return;
    }

    let filtered = [...allListings];

    const activeGenders = Object.keys(selectedGenders).filter(
      (g) => selectedGenders[g],
    );
    if (activeGenders.length > 0) {
      filtered = filtered.filter((item) =>
        item.gender ? activeGenders.includes(item.gender.toLowerCase()) : false,
      );
    }

    const activeCategories = Object.keys(selectedCategories).filter(
      (c) => selectedCategories[c],
    );
    if (activeCategories.length > 0) {
      filtered = filtered.filter((item) =>
        item.category
          ? activeCategories.includes(item.category.toLowerCase())
          : false,
      );
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      filtered = filtered.filter((item) => {
        return (
          item.title?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.location?.toLowerCase().includes(query) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(query))
        );
      });
    }

    setListings(filtered);
  }, [allListings, searchQuery, selectedGenders, selectedCategories]);

  const handleGenderChange = (e) => {
    const { name, checked } = e.target;
    setSelectedGenders((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setSelectedCategories((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleClearFilters = () => {
    setSelectedGenders({ male: false, female: false });
    setSelectedCategories({ top: false, bottoms: false, accessories: false });
  };

  return (
    <div className="home-container">
      <h1>Browse Listings</h1>

      <div className="home-main">
        <aside className="filters-column">
          <div className="filter-card">
            <h1 className="filter-page-title">Filter Listings</h1>

            <div className="filter-section">
              <h2 className="filter-section-title">Gender</h2>
              <label className="filter-option">
                <input
                  type="checkbox"
                  name="male"
                  checked={selectedGenders.male}
                  onChange={handleGenderChange}
                />
                <span>Male</span>
              </label>
              <label className="filter-option">
                <input
                  type="checkbox"
                  name="female"
                  checked={selectedGenders.female}
                  onChange={handleGenderChange}
                />
                <span>Female</span>
              </label>
            </div>

            <div className="filter-section">
              <h2 className="filter-section-title">Category</h2>
              <label className="filter-option">
                <input
                  type="checkbox"
                  name="top"
                  checked={selectedCategories.top}
                  onChange={handleCategoryChange}
                />
                <span>Top</span>
              </label>
              <label className="filter-option">
                <input
                  type="checkbox"
                  name="bottoms"
                  checked={selectedCategories.bottoms}
                  onChange={handleCategoryChange}
                />
                <span>Bottoms</span>
              </label>
              <label className="filter-option">
                <input
                  type="checkbox"
                  name="accessories"
                  checked={selectedCategories.accessories}
                  onChange={handleCategoryChange}
                />
                <span>Accessories</span>
              </label>
            </div>

            <div className="filter-actions">
              <button
                type="button"
                className="filter-btn secondary"
                onClick={handleClearFilters}
              >
                Clear
              </button>
            </div>
          </div>
        </aside>

        <section className="listings-column">
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
              listings.map((item) => (
                <ListingCard key={item.id || item._id} item={item} />
              ))
            ) : (
              <div className="no-results"></div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
