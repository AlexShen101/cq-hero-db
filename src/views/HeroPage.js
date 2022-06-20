import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import hero_tiers from "../data/Hero_tiers.json";
import HeroTable from "../components/HeroTable.js";
import hero_data from "../data/heros.json";

import sigil_suggestions from '../data/sigil_suggestions.json';
import hero_skill_suggestions from '../data/hero_skill_suggestions.json'


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
      // very scuffed way to determine guilty gear collab members (only faust has -GG in his name for now)
      if (hero2.split('-')[1] === 'gg' && hero2.split('-')[0] === hero1 && entry.type === "collab") return entry
      else if (hero1 === hero2) return entry
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

  const renderHeroImage = (heroImage) => {
    try {
      return (
        <img
          className="hero_forms_image"
          src={require(`../data/cq-pandora assets master heroes/${heroImage.image}.png`)}
          alt={heroImage.image + ".png"}
        ></img>
      )
    } catch (e) {
      return (<img
        className="hero_forms_image"
        src={require(`../data/cq-pandora assets master heroes/ui_collection_icon_03.png`)}
        alt={heroImage.image + ".png"}
      ></img>)
    }

  };

  const renderWeaponImage = (weapon) => {
    try {
      return (
        <img
          className="weapon_forms_image"
          src={require(`../data/cq-pandora assets master weapons/${weapon.image}.png`)}
          alt={weapon.image + ".png"}
        ></img>
      )
    } catch (e) {
      return <p>Weapon image failed to load</p>
    }
  }

  console.log(hero)

  return (

    <div>
      <div className="top_bar">
        {renderHeroImage(hero.forms[hero.forms.length - 1])}
        <div className="hero_page_title_container">
          <h1 id="hero_page_name">{hero.Name}</h1>
          <p id="hero_page_class">{hero.class}</p>
          <p id="hero_page_type">{hero.Archetype}</p>
        </div>
        <button id="hero_page_back_button">
          <Link id="hero_page_back_link" to="/">Back</Link>
        </button>
      </div>

      <div className="hero_page_info_section">
      <p>Damage Type: {hero["Damage Type"]}</p>
      <p>
        Quirks: {hero.Quirk} {hero.Quirk2 && `+ ${hero.Quirk2}`}
      </p>
      <p>Description: {hero.Note}</p>

      <div className="hero_page_container">
      <h3 id="hero_page_rating">Rating:</h3>
      <HeroTable displayedHeroes={[hero]} minimalized={true} />
      </div>

      <div className="hero_container">
        {
          hero.forms.map((form) => {
            if (form.star >= 3) return (renderHeroImage(form))
          })
        }
      </div>

      <div className="weapon_container">
        {
          hero.sbws.map((weapon) => {
            return (renderWeaponImage(weapon))
          })
        }
      </div>

      <div className="hero_page_container">
      <h2 id="hero_page_skill_suggestions_title">Suggested Skills:</h2>
      {suggested_skills['Skill 1'] ? <p>{suggested_skills['Skill 1']}</p> : null}
      {suggested_skills['Skill 2'] ? <p>{suggested_skills['Skill 2']}</p> : null}
      {suggested_skills['Skill 3'] ? <p>{suggested_skills['Skill 3']}</p> : null}
      </div>

      <div className="hero_page_container">
      <h2>Builds</h2>
      {suggested_sigils.Sets.map((build) => {
        return (
          <div key={build.id}>
            <p onClick={() => showSetData(build)}>Sigil Set</p>
          </div>
        )
      })}
      </div>
    </div>
    </div>
  );
};

export default HeroPage;
