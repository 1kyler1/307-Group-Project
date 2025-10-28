import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

export default function sellersPage() {
  const [listings, setListings] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/api/items")
          .then((res) => res.json())
          .then((data) => {
            setListings(data);
          })
          .catch((err) => console.error("Error fetching items:", err));
      }, []);
      
  function handleFormSubmit(newItem) {
    setListings([...listings, newItem]);
  }

    return (
        <div>
            <h1>Sellers Page</h1>
            <h2>Current Listings</h2>
            

             <ul>
                {listings.map((item) => (
                <li key={item._id}>
                    <strong>{item.title}</strong> — {item.description} ({item.location})
                    {item.imageUrl && (
                    <div>
                        <img
                        src={`http://localhost:4000${item.imageUrl}`}
                        alt={item.title}
                        style={{ width: "200px", marginTop: "10px" }}
                        />
                    </div>
                    )}
                </li>
                ))}
            </ul>

            <Link to="/redirect-to-create">
                <button>Create new listing</button>
            </Link>


        </div>
    );



}
