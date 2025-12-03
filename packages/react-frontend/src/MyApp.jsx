// MyApp.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Login } from "./LogIn";
import CreateAccount from "./CreateAccount";
import { NewItemFormPage } from "./CreateListingForum";
import Listings from "./components/Listings";
import SellersPage from "./sellersPage";
import ListingDetailPage from "./ListingDetailPage";
import HomePage from "./HomePage";
import Navbar from "./components/navbar";

export default function MyApp() {
  const location = useLocation();
  const authPaths = ["/login", "/create-account"];
  const hideNavbar = authPaths.includes(location.pathname);

  return (
    <div>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
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
        <Route path="/user-page" element={<SellersPage />} />
        <Route path="/redirect-to-create" element={<NewItemFormPage />} />
        <Route path="/listing/:id" element={<ListingDetailPage />} />
        <Route path="/listings" element={<Listings />} />
      </Routes>
    </div>
  );
}
