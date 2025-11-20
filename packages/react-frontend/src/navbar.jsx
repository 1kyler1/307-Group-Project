import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
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
          <Link className={isActive("/login")} to="/login">
            Login
          </Link>
          <Link className={isActive("/create-account")} to="/create-account">
            Create Account
          </Link>
          <Link className={isActive("/new-item")} to="/new-item">
            New Item
          </Link>
          <Link className={isActive("/user-page")} to="/user-page">
            Sellers Page
          </Link>
        </div>
      </div>
    </nav>
  );
}
