import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import AppRoutes from "./router/router.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
