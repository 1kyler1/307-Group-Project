import React, {useState, useEffect} from 'react';
import ItemForm from './itemForm';

export default function sellersPage() {

    const [listings, setListings] = useState([]);

  function handleFormSubmit(newItem) {
    
    setListings([...listings, newItem]);
  }


    return (
        <div>
            <h1>Sellers Page</h1>
            <h2>Current Listings</h2>
            
            <ItemForm handleSubmit={handleFormSubmit} />

            <ul>
                {listings.map((item, index) => (
                <li key={index}>
                    {item.item} — {item.description}
                </li>
                ))}
            </ul>
            <h3 button = './Form'>Create New listing</h3>

        </div>
    );



}