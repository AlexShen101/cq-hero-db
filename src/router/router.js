import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroListPage from "views/HeroListPage/HeroListPage.js";
import HeroPage from "views/HeroPage/Index";
import TopBar from 'views/TopBar.js';
import HeroNotFoundPage from 'views/HeroPage/HeroNotFoundPage.js';
import TierListPage from 'views/TierListPage/TierListPage.js';
import NotFoundPage from 'views/NotFoundPage.js';

const AppRoutes = () => {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" exact={true} element={<HeroListPage />}></Route>
        <Route path="/hero/:heroName" element={<HeroPage />}></Route>
        <Route path="/hero_not_found" element={<HeroNotFoundPage />}></Route>
        <Route path="/tier_list" element={<TierListPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
