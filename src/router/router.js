import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import App from "../views/App.js";
import HeroPage from "../views/HeroPage.js";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact={true} element={<App />}></Route>
        <Route path="/:heroName" element={<HeroPage />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
