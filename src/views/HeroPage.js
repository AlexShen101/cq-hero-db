import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import hero_tiers from "../data/Hero_tiers.json";
import HeroTable from "../components/HeroTable.js";
import hero_data from "../data/heros.json";

import sigil_suggestions from '../data/sigil_suggestions.json';
import hero_skill_suggestions from '../data/hero_skill_suggestions.json'

import HeroDisplay from '../components/HeroDisplay.js';
import WeaponDisplay from '../components/WeaponDisplay.js';

const HeroPage = () => {
  let heroName = useParams().heroName;

  // change
  let hero = hero_tiers.find((hero) => {
    let hero1 = hero.Name.toLowerCase()
    let hero2 = heroName.toLowerCase()
    if (hero1 === hero2) return hero
  });

  let hero_db_info = hero_data.find((hero) => {
    let hero1 = hero.id.toLowerCase()
    let hero2 = heroName.toLowerCase().replace(" ", "_")
    if (hero1 === hero2) return hero
    else if (hero1.indexOf(hero2) !== -1) return hero
  });

  if (hero_db_info === undefined) {
    window.location.replace("/");
  }

  let suggested_skills = hero_skill_suggestions.find((item) => item.Hero.toLowerCase() === heroName.toLowerCase())
  let suggested_sigils = sigil_suggestions.find((item) => item.Hero.toLowerCase() === heroName.toLowerCase())

  const showSetData = (set) => {
    console.log(set)
  }

  console.log(hero)
  console.log(hero_db_info)
  console.log(suggested_sigils)

  return (

    <div>
      <h1>{hero.Name}</h1>
      <button id="hero_page_back_button">
        <Link to="/">Go Back</Link>
      </button>
      <p>Class: {hero_db_info.class}</p>
      <p>Role: {hero.Archetype}</p>
      <p>Damage Type: {hero["Damage Type"]}</p>
      <p>
        Quirks: {hero.Quirk} {hero.Quirk2 && `+ ${hero.Quirk2}`}
      </p>
      <p>Description: {hero.Note}</p>
      <h3>Rating:</h3>
      <HeroTable displayedHeroes={[hero]} editable={false} />

      <HeroDisplay hero_db_info={hero_db_info} />
      <WeaponDisplay hero_db_info={hero_db_info} />

      <h2>Suggested Skills:</h2>
      {suggested_skills['Skill 1'] ? <p>{suggested_skills['Skill 1']}</p> : null}
      {suggested_skills['Skill 2'] ? <p>{suggested_skills['Skill 2']}</p> : null}
      {suggested_skills['Skill 3'] ? <p>{suggested_skills['Skill 3']}</p> : null}

      <h2>Builds</h2>
      {suggested_sigils.Sets.map((build) => {
        return (
          <div>
            <p onClick={() => showSetData(build)}>Sigil Set</p>
          </div>
        )
      })}
    </div>
  );
};

export default HeroPage;
