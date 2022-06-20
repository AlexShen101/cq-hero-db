import React, { useState } from "react";
import hero_tiers from "../data/Hero_tiers.json";
import HeroTable from "../components/HeroTable.js";

import SortButtons from "../components/SortButtons.js";
import sorter from "../components/sorter.js";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [activeFilter, setActiveFilter] = useState("Colo-Up");
  const [currentPage, setCurrentPage] = useState(1);

  let displayedHeroes = hero_tiers
    .filter((hero) => {
      if (
        searchInput === "" ||
        hero.Name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
      )
        return hero;
      else return null;
    }).sort((hero1, hero2) => sorter(hero1, hero2, activeFilter));

  let displayLength = displayedHeroes.length

  if (displayLength > 10) {
    displayedHeroes = displayedHeroes.slice((currentPage - 1) * 10, currentPage * 10)
  }

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
        minimalized={false}
      />
      {displayLength > 10 ?
        <div>
          {currentPage > 1 &&
            <button onClick={() => {
              setCurrentPage(currentPage => currentPage - 1)
            }}>{"<"}
            </button>
          }
          <p>Page {currentPage} of {Math.ceil(displayLength / 10)}</p>
          {currentPage < Math.ceil(displayLength / 10) &&
            <button onClick={() => {
              setCurrentPage(currentPage => currentPage + 1)
            }}>{">"}
            </button>
          }
        </div>
        : null}

    </div>
  );
};

export default App;
