//Listings.jsx
// import React, { useEffect, useState } from "react";
import ListingCard from "./listingCard";

export default function Listings(props) {
  if (!props.items) return <div>No listings found.</div>;

  return (
    <div className="listings-grid">
      {props.items.map((item) => (
        <ListingCard key={item._id} item={item} />
      ))}
    </div>
  );
}
