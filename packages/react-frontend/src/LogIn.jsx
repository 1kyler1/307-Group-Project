// src/LogIn.jsx
import React, { useState } from "react";

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
  );
}

export default Login;
