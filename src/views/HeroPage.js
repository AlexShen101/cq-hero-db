import React from "react";
import { useParams } from "react-router-dom";

import { hero_tiers } from "../data/Hero_tiers.js";
import HeroTable from "../components/HeroTable.js";
import { Link } from "react-router-dom";

import hero_data from "../data/heros.json";
import translator_db from "../data/translator_en_us.json";

import sigil_suggestions from '../data/sigil_suggestions.js';
import hero_skill_suggestions from '../data/hero_skill_suggestions.js'

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

  // to find item in translator: do translator[key], use keys that seem to have been shortformed
  // example key: TEXT_CHA_WI_1_3_NAME
  let translator = translator_db;

  let suggested_skills = hero_skill_suggestions.find((item) => item.Hero === heroName)
  //  let suggested_sigils = sigil_suggestions.find(item) => item.

  const formRender = (form) => {
    try {
      return (
        <img
          className="hero_forms_image"
          key={form.id + "image"}
          src={require(`../data/cq-pandora assets master heroes/${form.image}.png`)}
          alt={form.image + ".png"}
        ></img>
      )
    } catch (e) {
      return (<img
        className="hero_forms_image"
        key={form.id + "image"}
        src={require(`../data/cq-pandora assets master heroes/ui_collection_icon_03.png`)}
        alt={form.image + ".png"}
      ></img>)
    }

  };

  const renderWeapon = (weapon) => {
    try {
      return (
        <img
          className="weapon_forms_image"
          key={weapon.id + "image"}
          src={require(`../data/cq-pandora assets master weapons/${weapon.image}.png`)}
          alt={weapon.image + ".png"}
        ></img>
      )
    } catch (e) {
      return <p>Weapon image failed to load</p>
    }
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

      <h2>Heroes</h2>
      <div className="item_container">
        {hero_db_info.forms.map((form) => {
          return (
            <div className="hero_forms_item">
              <p className="hero_forms_text"
                key={form.id + "name"}>
                {translator[form.name] ? translator[form.name].text : "N/A"}{" "}
                {form.star}*
              </p>
              {formRender(form)}
            </div>
          );
        })}
      </div>

      <h2>Weapons</h2>
      <div className="item_container">
        {hero_db_info.sbws.map((weapon) => {
          return (
            <div className="weapon_forms_item">
              <p className="weapon_forms_text"
                key={weapon.id + "name"}>
                {translator[weapon.name] ? translator[weapon.name].text : "N/A"}
              </p>
              {renderWeapon(weapon)}
            </div>
          );
        })}
      </div>

      <h2>Suggested Skills:</h2>
      {suggested_skills['Skill 1'] ? <p>{suggested_skills['Skill 1']}</p> : null}
      {suggested_skills['Skill 2'] ? <p>{suggested_skills['Skill 2']}</p> : null}
      {suggested_skills['Skill 3'] ? <p>{suggested_skills['Skill 3']}</p> : null}

    </div>
  );
};

export default HeroPage;
