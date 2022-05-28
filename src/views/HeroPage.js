import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { hero_tiers } from "../data/Hero_tiers.js";
import HeroTable from "../components/HeroTable.js";
import hero_data from "../data/heros.json";

import sigil_suggestions from '../data/sigil_suggestions.js';
import hero_skill_suggestions from '../data/hero_skill_suggestions.js'

import HeroDisplay from '../components/HeroDisplay.js';
import WeaponDisplay from '../components/WeaponDisplay.js';

const HeroPage = () => {
  let heroName = useParams().heroName;
  /*
  hero:
    Archetype -> role / description of primary functions (DPS, Healer, Buffer)
    Quirk -> first quirk
    Quirk2 -> second quirk, if exists
    Colo -> colo rating
    Arena -> arena rating
    CHe4 -> challenge 4 rating
    CHe5 -> challenge 5 rating
    Umrat -> umrat raid rating
    Sera -> sera raid rating
  */
  let hero = hero_tiers.find((hero) => {
    let hero1 = hero.Name.toLowerCase()
    let hero2 = heroName.toLowerCase()
    if (hero1 === hero2) return hero
    else if (hero1.indexOf(hero2) !== -1) return hero
  });

  /*
  hero_db_info
  class: game class
  forms: (4*, 5*, 6* info)
  id: "name"
  sbw: soulbound weapons
  skins: available skins, if any
  type: type of hero (contract, promo, etc.)
  */
  let hero_db_info = hero_data.find((hero) => {
    let hero1 = hero.id.toLowerCase()
    let hero2 = heroName.toLowerCase().replace(" ", "_")
    if (hero1 === hero2) return hero
    else if (hero1.indexOf(hero2) !== -1) return hero
  });
  console.log(hero_db_info);

  let suggested_skills = hero_skill_suggestions.find((item) => item.Hero === heroName)
  let suggested_sigils = sigil_suggestions.find((item) => item.Name === heroName)

  const showSetData = (set) => {
    console.log(set)
  }


  return (
    <div>
      <h1>{hero.Name}</h1>
      <button id="hero_page_back_button">
        <Link to="/">Go Back</Link>
      </button>
      <p>Class: {hero_db_info.class}</p>
      <p>Role: {hero.Archetype}</p>
      <p>Damage: {hero["Damage Type"]}</p>
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

      <h2>Sigils</h2>
      {suggested_sigils.Sets.map((set) => {
        return (
          <div>
            <p onClick={() => showSetData(set)}>Sigil Set</p>
          </div>
        )
      })}
    </div>
  );
};

export default HeroPage;
