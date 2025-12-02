// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MyApp from "./MyApp";
import "./css/main.css";
import { AuthProvider } from "./auth/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <BrowserRouter>
        <MyApp />
      </BrowserRouter>
    </React.StrictMode>
    ,
  </AuthProvider>,
);
