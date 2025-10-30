// // listingCard.jsx
import "./ListingCard.css";

async function handleDelete(id) {
  await fetch(`/api/items/${id}`, { method: "DELETE" });
  window.location.reload();
}
export default function ListingCard({ item }) {
  const isRaw = item.imageUrl?.toLowerCase().endsWith(".dng");

  return (
    <div className="listing-card">
      {/* Title on top */}
      <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
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
    </div>
  );
}
