// CreateAccount.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TermsAndConditions from "./TermsAndConditions";
import "./CreateAccount.css";

function CreateAccount() {
  const [showTerms, setShowTerms] = useState(true);
  const [person, setPerson] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function handleAcceptTerms() {
    setShowTerms(false);
  }
  function handleDeclineTerms() {
    navigate("/");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setPerson((prev) => ({ ...prev, [name]: value }));
    setError(null);
  }

  async function submitAccount(e) {
    e?.preventDefault();
    if (isSubmitting) return;

    if (person.username.trim() === "" || person.password.trim() === "") {
      setError("Username and password cannot be empty.");
      return;
    }
    if (person.password.length < 8) {
      setError("Password must be 8 or more characters.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const r2 = await fetch(
        "https://groupproject307-gefba7dfhhdpe0cc.westus3-01.azurewebsites.net/api/users",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const data2 = await r2.json();
      const existingUser = Array.isArray(data2)
        ? data2.find((u) => u.username === person.username)
        : null;
      if (existingUser) {
        setError("Username already exists.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(
        "https://groupproject307-gefba7dfhhdpe0cc.westus3-01.azurewebsites.net/api/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(person),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || "Error creating account.");
        setIsSubmitting(false);
        return;
      }

      localStorage.setItem("token", data.token);
      setPerson({ username: "", password: "" });
      navigate("/user-page");
    } catch (err) {
      setError("Network error. Please try again.");
      console.error(err);
      setIsSubmitting(false);
    }
  }

  if (showTerms) {
    return (
      <TermsAndConditions
        onAccept={handleAcceptTerms}
        onDecline={handleDeclineTerms}
      />
    );
  }

  return (
    <div className="create-account-container">
      <div className="create-account-card">
        <h1 className="create-account-title">Create New Account</h1>
        <p className="create-account-subtitle">
          Please enter a unique username and a strong password.
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={submitAccount} noValidate>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter a unique username"
              value={person.username}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter a password (at least 8 characters)"
              value={person.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account…" : "Sign up"}
          </button>
        </form>

        <div className="helper-text">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
