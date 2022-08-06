import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HeroListPage from "views/HeroListPage/HeroListPage.js";
import HeroPage from "views/HeroPage/Index";
import TopBar from 'views/TopBar.js';

const AppRoutes = () => {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" exact={true} element={<HeroListPage />}></Route>
        <Route path="/:heroName" element={<HeroPage />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
