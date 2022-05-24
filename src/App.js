import React, { useState } from 'react'
import { hero_tiers } from './data/Hero_tiers'
import HeroTable from './components/HeroTable.js'

import { Autocomplete, TextField } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const hero_names = hero_tiers.map(hero => hero.Name)

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#36DDD2'
    },
    secondary: {
      main: '#e29578'
    },
    mode: 'dark'
  }
})
const App = () => {
  const [myHeroes, setMyHeroes] = useState([])
  const [searchInput, setSearchInput] = useState(null)
  const [activeFilter, setActiveFilter] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput === null) {
      console.log('Invalid Input')
    } else if (hero_names.indexOf(searchInput) === -1) {
      console.log('Invalid Input')
    } else if (myHeroes.find((hero) => hero.Name === searchInput)) {
      console.log("show user existing hero")
    } else {
      setMyHeroes([...myHeroes, hero_tiers.find((hero) => hero.Name === searchInput)])
      setSearchInput(null)
    }
  }

  const removeHero = (hero) => {
    setMyHeroes(myHeroes.filter((item) => item !== hero))
  }

  let displayedHeroes = myHeroes.filter((hero) => {
    if (searchInput == null || hero.Name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1) return hero
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <p>Sort By:</p>
        <div>
          <button>Name</button>
          <button>Role</button>
          <button>Colo</button>
          <button>Arena</button>
          <button>CH4</button>
          <button>CH5</button>
          <button>Umrat</button>
          <button>Sera</button>
        </div>
        <h1>My Heroes:</h1>
        <HeroTable displayedHeroes={displayedHeroes} removeHero={removeHero} />
        <form onSubmit={handleSubmit}>
          <Autocomplete
            sx={{ width: 250, marginTop: 2 }}
            autoFocus
            autoHighlight={true}
            value={searchInput}
            onChange={(event, newValue) => {
              setSearchInput(newValue)
            }}
            options={hero_names}
            renderInput={(params) => <TextField
              {...params}
              label="Search or Add Hero"
              autoFocus
            />}
          />
          {(searchInput !== null && displayedHeroes.length === 0) &&
            <button
              onClick={handleSubmit}>
              Add New Hero
            </button>}
        </form>
      </div>
    </ThemeProvider>
  );
}

export default App;
