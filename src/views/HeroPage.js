import React from "react";
import { useParams } from "react-router-dom";

import { hero_tiers } from "../data/Hero_tiers.js";
import HeroTable from "../components/HeroTable.js";
import { Link } from "react-router-dom";

import hero_data from "../data/heros.json";
import translator_db from "../data/translator.json";

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
  let hero = hero_tiers.find((hero) => hero.Name === heroName);

  /*
  hero_db_info
  class: game class
  forms: (4*, 5*, 6* info)
  id: "name"
  sbw: soulbound weapons
  skins: available skins, if any
  type: type of hero (contract, promo, etc.)
  */
  let hero_db_info = hero_data.find(
    (hero) => hero.id.toLowerCase() === heroName.toLowerCase()
  );
  console.log(hero_db_info);

  // to find item in translator: do translator[key], use keys that seem to have been shortformed
  // example key: TEXT_CHA_WI_1_3_NAME
  let translator = translator_db;

  return (
    <div>
      <h1>{hero.Name}</h1>
      <button>
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
      <br></br>
      <h2>Tiers</h2>
      {hero_db_info.forms.map((form) => {
        return (
          <div>
            <p key={form.id + "name"}>
              {translator[form.name].text} {form.star}*
            </p>
            <img
              key={form.id + "image"}
              src={require(`../data/cq-pandora assets master heroes/${form.image}.png`)}
              alt={form.image + ".png"}
            ></img>
          </div>
        );
      })}

      <br></br>
      <h2>Weapons</h2>
      {hero_db_info.sbws.map((weapon) => {
        return (
          <div>
            <p key={weapon.id + "name"}>{translator[weapon.name].text}</p>
            <img
              key={weapon.id + "image"}
              src={require(`../data/cq-pandora assets master weapons/${weapon.image}.png`)}
              alt={weapon.image + ".png"}
            ></img>
          </div>
        )
      })}
    </div>
  );
};

export default HeroPage;
