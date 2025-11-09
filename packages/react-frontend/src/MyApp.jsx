
// MyApp.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./LogIn";
import CreateAccount from "./createAccount";
import NewItemFormPage from "./CreateListingForum";
import Listings from "./components/Listings";
import SellersPage from "./sellersPage";

export default function MyApp() {
  return (
    <div>
      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{" "}
        <Link to="/create-account">Create an account</Link> |{" "}
        <Link to="/new-item">New Item</Link> |{" "}
        
        <Link to="/user-Page">Sellers Page</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to the app!</h1>} />
        <Route
          path="/login"
          element={
            <Login handleSubmit={(data) => console.log("Login data:", data)} />
          }
        />
        <Route
          path="/create-account"
          element={
            <CreateAccount
              handleSubmit={(data) => console.log("New acct data:", data)}
            />
          }
        />
        <Route path="/new-item" element={<NewItemFormPage />} />
        <Route path="/user-page" element ={<SellersPage />} />
        <Route path="/redirect-to-create" element={<NewItemFormPage />} />

        <Route path="/listings" element={<Listings />} />
      </Routes>
    </div>
  );
}
