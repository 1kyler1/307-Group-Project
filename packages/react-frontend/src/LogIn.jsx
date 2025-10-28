// src/LogIn.jsx
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

function Login(props) {
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

  function submitLogin() {
    props.handleSubmit(person);
    if (!person.username.trim() || !person.password.trim()) {
      setPerson({ username: "", password: "" });
      setError("Username and password cannot be empty.");
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
	</div>
  );
}

export default Login;
