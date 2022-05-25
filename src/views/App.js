import React, { useState, useEffect } from "react";
import { hero_tiers } from "../data/Hero_tiers";
import HeroTable from "../components/HeroTable.js";

import { Autocomplete, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import SortButtons from "../components/SortButtons.js";
import sorter from "../components/sorter.js";

const hero_names = hero_tiers.map((hero) => hero.Name);

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#36DDD2",
    },
    secondary: {
      main: "#e29578",
    },
    mode: "dark",
  },
});
const App = () => {
  const [myHeroes, setMyHeroes] = useState(
    JSON.parse(localStorage.getItem("myHeroes")) !== null
      ? JSON.parse(localStorage.getItem("myHeroes"))
      : []
  );

  const [searchInput, setSearchInput] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Colo-Up");

  useEffect(() => {
    localStorage.setItem("myHeroes", JSON.stringify(myHeroes));
  }, [myHeroes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput === null) {
      console.log("Invalid Input");
    } else if (hero_names.indexOf(searchInput) === -1) {
      console.log("Invalid Input");
    } else if (myHeroes.find((hero) => hero.Name === searchInput)) {
      console.log("show user existing hero");
    } else {
      setMyHeroes([
        ...myHeroes,
        hero_tiers.find((hero) => hero.Name === searchInput),
      ]);
      setSearchInput(null);
    }
  };

  const removeHero = (hero) => {
    setMyHeroes(myHeroes.filter((item) => item !== hero));
  };

  let displayedHeroes = myHeroes
    .filter((hero) => {
      if (
        searchInput == null ||
        hero.Name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
      )
        return hero;
      else return null;
    })
    .sort((hero1, hero2) => sorter(hero1, hero2, activeFilter));

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <SortButtons
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <h1>My Heroes:</h1>
        <HeroTable
          displayedHeroes={displayedHeroes}
          removeHero={removeHero}
          editable={true}
        />
        <form onSubmit={handleSubmit}>
          <Autocomplete
            sx={{ width: 250, marginTop: 2 }}
            autoFocus
            autoHighlight={true}
            value={searchInput}
            onChange={(event, newValue) => {
              setSearchInput(newValue);
            }}
            options={hero_names}
            renderInput={(params) => (
              <TextField {...params} label="Search or Add Hero" autoFocus />
            )}
          />
          {searchInput !== null && displayedHeroes.length === 0 && (
            <button onClick={handleSubmit}>Add New Hero</button>
          )}
        </form>
      </div>
    </ThemeProvider>
  );
};

export default App;
