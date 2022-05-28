import React, { useState } from "react";
import { hero_tiers } from "../data/Hero_tiers";
import HeroTable from "../components/HeroTable.js";

import SortButtons from "../components/SortButtons.js";
import sorter from "../components/sorter.js";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [activeFilter, setActiveFilter] = useState("Colo-Up");

  let displayedHeroes = hero_tiers
    .filter((hero) => {
      if (
        searchInput === "" ||
        hero.Name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
      )
        return hero;
      else return null;
    })
    .sort((hero1, hero2) => sorter(hero1, hero2, activeFilter));

  console.log(displayedHeroes.length)
  return (
    <div className="App">
      <h1>Heroes:</h1>
      <SortButtons
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <input
        className="search_input"
        autoFocus
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value)
        }}></input>
      <HeroTable
        displayedHeroes={displayedHeroes}
      />

    </div>
  );
};

export default App;
