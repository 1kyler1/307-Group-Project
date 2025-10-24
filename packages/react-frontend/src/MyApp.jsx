
//   function fetchUsers() {
//     return fetch("http://localhost:8000/users");
//   }

//   function postUser(person) {
//     return fetch("http://localhost:8000/users", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(person),
//     });
//   }

//   function deleteUser(id) {
//     return fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" });
//   }



// import React from "react";
// import CreateListingPage from "./CreateListingPage.jsx";

// export default function App() {
//   return <CreateListingPage />;
// }

import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./LogIn";
import NewItemFormPage from "./CreateListingForum";
import SellersPage from "./sellersPage";

export default function MyApp() {
  return (
    <div>
      
      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/new-item">New Item</Link>
        <Link to="/user-Page">Sellers Page</Link>
      </nav>

      
      <Routes>
        <Route path="/" element={<h1>Welcome to the app!</h1>} />
        <Route
          path="/login"
          element={<Login handleSubmit={(data) => console.log("Login data:", data)} />}
        />
        <Route path="/new-item" element={<NewItemFormPage />} />
        <Route path="/user-page" element ={<SellersPage />} />

      </Routes>
    </div>
  );
}