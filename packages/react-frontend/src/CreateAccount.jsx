// src/CreateAccount.jsx
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

  function submitAccount() {
    props.handleSubmit(person);
    if (!person.username.trim() || !person.password.trim()) {
      setPerson({ username: "", password: "" });
      setError("Username and password cannot be empty.");
	  console.log("Username and password cannot be empty.");
    }else if (person.password.length < 8){
		setPerson({ username: "", password: "" });
        setError("Password must be 8 or more characters.");
		console.log("Password must be 8 or more characters.");
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
	  Already have an account? <Link to="/login">Login</Link>
	</div>
	</div>
  );
}

export default CreateAccount;
