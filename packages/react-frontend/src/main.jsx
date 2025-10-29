// // src/main.jsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import MyApp from "./MyApp";
// import "./main.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<MyApp />);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MyApp from "./MyApp";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MyApp />
    </BrowserRouter>
  </React.StrictMode>,
);
