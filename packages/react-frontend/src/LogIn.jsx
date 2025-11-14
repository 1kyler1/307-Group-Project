// src/LogIn.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [person, setPerson] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
    setError(null);
  }

  async function submitLogin() {
    if (person.username.trim() === "" || person.password.trim() === "") {
      setPerson({ username: "", password: "" });
      setError("Username and password cannot be empty.");
      console.log("Username and password cannot be empty.");
      return;
    }
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        navigate("/user-page");
      } else {
        setPerson({ username: "", password: "" });
        setError(data.error || "Login failed.");
        console.log("Login failed:", data.error);
      }
    } catch (e) {
      console.error(e);
      setError("Server error");
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
          Log in
        </h1>
        <form>
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
          <input type="button" value="Login" onClick={submitLogin} />
        </form>
        Don't have an account? <Link to="/create-account">Sign up</Link>
      </div>
      {error && <p className="text-xl font-bold text-red-900">{error}</p>}
    </div>
  );
}

export default Login;
