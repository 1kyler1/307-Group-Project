//Listings.jsx
import React, { useEffect, useState } from "react";
import ListingCard from "./listingCard";

export default function Listings(props) {
  if (!props.items) return <div>No listings found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {props.items.map((item) => (
        <ListingCard key={item._id} item={item} />
      ))}
    </div>
  );
}
