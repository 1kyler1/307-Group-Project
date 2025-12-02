// navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import "./navbar.css";

export default function Navbar() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-logo">SLOFits</h1>
        <div className="nav-links">
          <Link className={isActive("/")} to="/">
            Home
          </Link>

          {/* Show only when NOT logged in */}
          {!isLoggedIn && (
            <>
              <Link className={isActive("/login")} to="/login">
                Login
              </Link>

              <Link
                className={isActive("/create-account")}
                to="/create-account"
              >
                Create Account
              </Link>
            </>
          )}

          {/* Show only when LOGGED IN */}
          {isLoggedIn && (
            <>
              <Link className={isActive("/new-item")} to="/new-item">
                New Item
              </Link>

              <Link className={isActive("/user-page")} to="/user-page">
                Sellers Page
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
