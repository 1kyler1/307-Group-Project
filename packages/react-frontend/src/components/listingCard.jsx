// // listingCard.jsx
import "./ListingCard.css";
import { Link } from "react-router-dom";

export default function ListingCard({ item }) {
  const isRaw = item.imageUrl?.toLowerCase().endsWith(".dng");

  const CATEGORY_KEYS = ["top", "bottoms", "accessories"];

  let category = null;

  if (Array.isArray(item.tags)) {
    category =
      item.tags
        .map((t) => String(t).toLowerCase())
        .find((t) => CATEGORY_KEYS.includes(t)) || null;
  } else if (typeof item.tags === "string") {
    const parts = item.tags
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    category = parts.find((t) => CATEGORY_KEYS.includes(t)) || null;
  }

  const displayCategory =
    category && category.charAt(0).toUpperCase() + category.slice(1);

  const GENDER_KEYS = ["male", "women", "female", "man"];

  let gender = null;

  if (item.gender) {
    gender = String(item.gender).toLowerCase();
  } else if (Array.isArray(item.tags)) {
    gender =
      item.tags
        .map((t) => String(t).toLowerCase())
        .find((t) => GENDER_KEYS.includes(t)) || null;
  } else if (typeof item.tags === "string") {
    const parts = item.tags
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    gender = parts.find((t) => GENDER_KEYS.includes(t)) || null;
  }

  const displayGender =
    gender && gender.charAt(0).toUpperCase() + gender.slice(1);

  return (
    <Link to={`/listing/${item._id}`} className="listing-link">
      <div className="listing-card">
        {/* Title on top */}
        <h2 className="listing-title">{item.title}</h2>

        {/* Image in the middle */}
        <div className="listing-image-container">
          {item.imageUrl && !isRaw ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="listing-image"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent)
                  parent.innerHTML =
                    '<div class="image-fallback">Image unavailable</div>';
              }}
            />
          ) : (
            <div className="image-fallback">
              {isRaw ? "DNG preview not supported in browsers" : "No Image"}
            </div>
          )}
        </div>

        {/* Details at the bottom */}
        <div className="listing-field left-field">
          <span className="listing-label">Description:</span>
          <span className="listing-value">{item.description}</span>
        </div>

        {/* Location */}
        <div className="listing-field left-field">
          <span className="listing-label">Location:</span>
          <span className="listing-value">{item.location}</span>
        </div>

        {/* Gender */}
        {displayGender && (
          <div className="listing-field left-field">
            <span className="listing-label">Gender:</span>
            <span className="listing-value">{displayGender}</span>
          </div>
        )}

        {/* Category */}
        {displayCategory && (
          <div className="listing-field left-field">
            <span className="listing-label">Category:</span>
            <span className="listing-value">{displayCategory}</span>
          </div>
        )}

        {/* Tags */}
        <div className="listing-field left-field">
          <span className="listing-label">Tags:</span>
          <span className="listing-value">
            {Array.isArray(item.tags) ? item.tags.join(", ") : "No tags"}
          </span>
        </div>
      </div>
    </Link>
  );
}
