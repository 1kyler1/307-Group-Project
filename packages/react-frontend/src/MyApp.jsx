// // MyApp.jsx
// import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import Login from "./LogIn";
// import CreateAccount from "./CreateAccount";
// import NewItemFormPage from "./CreateListingForum";
// import Listings from "./components/Listings";
// import SellersPage from "./sellersPage";
// import ListingDetailPage from "./listing_page/ListingDetailPage";
// import HomePage from "./HomePage";
// import Navbar from "./navbar";

// export default function MyApp() {
//   return (
//     <div>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route
//           path="/login"
//           element={
//             <Login handleSubmit={(data) => console.log("Login data:", data)} />
//           }
//         />
//         <Route
//           path="/create-account"
//           element={
//             <CreateAccount
//               handleSubmit={(data) => console.log("New acct data:", data)}
//             />
//           }
//         />
//         <Route path="/new-item" element={<NewItemFormPage />} />
//         <Route path="/user-page" element={<SellersPage />} />
//         <Route path="/redirect-to-create" element={<NewItemFormPage />} />
//         <Route path="/listing/:id" element={<ListingDetailPage />} />
//         <Route path="/listings" element={<Listings />} />
//       </Routes>
//     </div>
//   );
//   /*
//   return (
//     <div>
//       <nav style={{ marginBottom: "1rem" }}>
//         <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{" "}
//         <Link to="/create-account">Create an account</Link> |{" "}
//         <Link to="/new-item">New Item</Link> |{" "}
//         <Link to="/user-Page">Sellers Page</Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route
//           path="/login"
//           element={
//             <Login handleSubmit={(data) => console.log("Login data:", data)} />
//           }
//         />
//         <Route
//           path="/create-account"
//           element={
//             <CreateAccount
//               handleSubmit={(data) => console.log("New acct data:", data)}
//             />
//           }
//         />
//         <Route path="/new-item" element={<NewItemFormPage />} />
//         <Route path="/user-page" element={<SellersPage />} />
//         <Route path="/redirect-to-create" element={<NewItemFormPage />} />
//         <Route path="/listing/:id" element={<ListingDetailPage />} />

//         <Route path="/listings" element={<Listings />} />
//       </Routes>
//     </div>
//   );
//   */
// }

// MyApp.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./LogIn";
import CreateAccount from "./CreateAccount";
import NewItemFormPage from "./CreateListingForum";
import Listings from "./components/Listings";
import SellersPage from "./sellersPage";
import ListingDetailPage from "./listing_page/ListingDetailPage";
import HomePage from "./HomePage";
import Navbar from "./navbar";

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
