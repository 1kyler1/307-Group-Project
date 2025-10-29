import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Listings from './components/Listings';

export default function SellersPage() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/api/items")
          .then((res) => res.json())
          .then((data) => {
            setListings(data);
          })
          .catch((err) => console.error("Error fetching items:", err));
      }, []);
      
  
    return (
        <div>
            <h1>Sellers Page</h1>
            <h2>Current Listings</h2>
            

            <Listings items={listings} />


            <Link to="/redirect-to-create">
                <button>Create new listing</button>
            </Link>


        </div>
    );



}
