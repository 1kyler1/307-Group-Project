// src/LogIn.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import "./Login.css";

function Login() {
  const [person, setPerson] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
    setError(null);
  }

  async function submitLogin(e) {
    e.preventDefault();

    if (person.username.trim() === "" || person.password.trim() === "") {
      setPerson({ username: "", password: "" });
      setError("Username and password cannot be empty.");
      return;
    }

    try {
      const response = await fetch(
        "https://groupproject307-gefba7dfhhdpe0cc.westus3-01.azurewebsites.net/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(person),
        },
      );

      const data = await response.json();
      if (data.ok) {
        console.log("Login successful:", data);
		//console.log(data.ok);
        localStorage.setItem("token", data.token);
        navigate("/user-page");
      } else {
		console.log("Login failed:", data);
        setPerson({ username: "", password: "" });
		console.log(data.error);
        setError(data.error || "Login failed.");
      }
    } catch (e) {
      console.error(e);
      setError("Server error");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Log In</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={submitLogin}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={person.username}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={person.password}
            onChange={handleChange}
          />

          <button type="submit">Log In</button>
        </form>

        <p className="signup-text">
          Don’t have an account? <Link to="/create-account">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export { Login };
