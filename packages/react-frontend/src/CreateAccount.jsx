// src/CreateAccount.jsx
import { set } from "mongoose";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

function CreateAccount(props) {
  const [person, setPerson] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
    setError(null);
  }

  async function submitAccount() {
    const r2 = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data2 = await r2.json();
    const existingUser = data2.find((u) => u.username === person.username);
    if (existingUser) {
      setPerson({ username: "", password: "" });
      setError("Username already exists.");
      console.log("Username already exists.");
      return;
    }

    if (person.username.trim() === "" || person.password.trim() === "") {
      setPerson({ username: "", password: "" });
      setError("Username and password cannot be empty.");
      console.log("Username and password cannot be empty.");
      return;
    } else if (person.password.length < 8) {
      setPerson({ username: "", password: "" });
      setError("Password must be 8 or more characters.");
      console.log("Password must be 8 or more characters.");
      return;
    }

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Account created successfully:", data);
      setPerson({ username: "", password: "" });
    } else {
      console.error("Error creating account:", data.error);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
          Create New Account
        </h1>
        <form>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter a unique username"
            value={person.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter a password (at least 8 characters)"
            value={person.password}
            onChange={handleChange}
          />
          <input type="button" value="Sign up" onClick={submitAccount} />
        </form>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default CreateAccount;
