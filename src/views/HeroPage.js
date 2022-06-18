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

  let hero = {
    ...hero_tiers.find((entry) => {
      let hero1 = entry.Name.toLowerCase()
      let hero2 = heroName.toLowerCase()
      if (hero1 === hero2) return entry
    }), ...hero_data.find((entry) => {
      let hero1 = entry.id.toLowerCase()
      let hero2 = heroName.toLowerCase().replace(" ", "_")
      if (hero1 === hero2) return entry
      else if (hero1.indexOf(hero2) !== -1) return entry
    })
  }

  if (hero.id === undefined) {
    window.location.replace("/");
  }

  let suggested_skills = hero_skill_suggestions.find((item) => item.Hero.toLowerCase() === heroName.toLowerCase())
  let suggested_sigils = sigil_suggestions.find((item) => item.Hero.toLowerCase() === heroName.toLowerCase())

  const showSetData = (set) => {
    console.log(set)
  }

  console.log(hero)
  console.log(suggested_sigils)

  return (

    <div>
      <h1>{hero.Name}</h1>
      <button id="hero_page_back_button">
        <Link to="/">Go Back</Link>
      </button>
      <p>Class: {hero.class}</p>
      <p>Role: {hero.Archetype}</p>
      <p>Damage Type: {hero["Damage Type"]}</p>
      <p>
        Quirks: {hero.Quirk} {hero.Quirk2 && `+ ${hero.Quirk2}`}
      </p>
      <p>Description: {hero.Note}</p>
      <h3>Rating:</h3>
      <HeroTable displayedHeroes={[hero]} editable={false} />

      <HeroDisplay forms={hero.forms} />
      <WeaponDisplay weapons={hero.sbws} />

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
