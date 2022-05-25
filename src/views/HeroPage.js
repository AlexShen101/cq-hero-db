import React from "react";
import { useParams } from "react-router-dom";

import { hero_tiers } from "../data/Hero_tiers.js";
import HeroTable from "../components/HeroTable.js";
import { Link } from "react-router-dom";

const HeroPage = () => {
  let heroName = useParams().heroName;
  let hero = hero_tiers.find((hero) => hero.Name === heroName);

  return (
    <div>
      <h1>{hero.Name}</h1>
      <p>Role: {hero.Archetype}</p>
      <p>Damage: {hero["Damage Type"]}</p>
      <p>
        Quirks: {hero.Quirk} {hero.Quirk2 && `+ ${hero.Quirk2}`}
      </p>
      <p>Description: {hero.Note}</p>
      <h3>Rating:</h3>
      <HeroTable displayedHeroes={[hero]} editable={false} />

      <button>
        <Link to="/">Go Back</Link>
      </button>
    </div>
  );
};

export default HeroPage;
