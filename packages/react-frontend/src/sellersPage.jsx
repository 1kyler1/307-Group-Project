import React, {useState, useEffect} from 'react';
import NewItemFormPage from './CreateListingForum';
import { Link } from "react-router-dom";

export default function sellersPage() {

    const [listings, setListings] = useState([]);

  function handleFormSubmit(newItem) {
    
    setListings([...listings, newItem]);
  }


    return (
        <div>
            <h1>Sellers Page</h1>
            <h2>Current Listings</h2>
            

            <ul>
                {listings.map((item, index) => (
                <li key={index}>
                    {item.item} — {item.description}
                </li>
                ))}
            </ul>

            <Link to="/create">
                <button>Create new listing</button>
            </Link>


        </div>
    );



}