import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import hero_tiers from "data/Hero_tiers.json";
import HeroTable from "components/HeroTable.js";
import hero_data from "data/heros.json";
import sigil_suggestions from 'data/sigil_suggestions.json';
import hero_skill_suggestions from 'data/hero_skill_suggestions.json';

import SkillContainer from 'views/HeroPage/SkillContainer.js';
import BuildContainer from 'views/HeroPage/BuildContainer.js';

import { Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {

  }
})

const HeroPage = () => {
  let { heroName } = useParams();

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

  const renderHeroImage = (forms) => {
    return (
      <React.Fragment>
        {
          forms.map((form, index) => {
            if (form.star >= 3) {
              try {
                return (
                  <img
                    key={form.id}
                    className="hero_forms_image"
                    src={require(`data/cq-pandora assets master heroes/${form.image}.png`)}
                    alt={form.image + ".png"}
                  ></img>
                )
              } catch (e) {
                return (
                  <img
                    key={"unknown form" + index}
                    className="hero_forms_image"
                    src={require(`data/cq-pandora assets master heroes/ui_collection_icon_03.png`)}
                    alt={form.image + ".png"}
                  ></img>
                )
              }
            } else return null
          })
        }
      </React.Fragment>
    )
  };

  const renderWeaponImage = (weapons) => {
    return (
      <React.Fragment>
        {
          weapons.map((weapon, index) => {
            try {
              return (
                <img
                  key={weapon.id + index}
                  className="weapon_forms_image"
                  src={require(`data/cq-pandora assets master weapons/${weapon.image}.png`)}
                  alt={weapon.image + ".png"}
                ></img>
              )
            } catch (e) {
              return <p>Weapon image failed to load</p>
            }
          })
        }
      </React.Fragment>
    )
  }

  console.log(hero)

  return (

    <div className="content_container">
      <div className="hero_page_container unit_info">
        {renderHeroImage([hero.forms[hero.forms.length - 1]])}
        <div className="hero_page_title_container">
          <h1 id="hero_page_name">{hero.Name}</h1>
          <p id="hero_page_class">{hero.class.toUpperCase()}</p>
          <p id="hero_page_type">{hero.Archetype}</p>
        </div>
        <Button variant="contained" color="primary">
          <Link id="hero_page_back_link" to="/">Back</Link>
        </Button>
      </div>

      <div className="hero_page_details">
        <div className="hero_page_right_column">
          <h1 className="section_header">Rating:</h1>
          <div className="hero_page_container">
            <HeroTable displayedHeroes={[hero]} minimalized={true} />
          </div>

          <h1 className="section_header">Icons:</h1>
          <div className="hero_page_container">
            {renderHeroImage(hero.forms)}
            {renderWeaponImage(hero.sbws)}

          </div>

          <SkillContainer suggested_skills={suggested_skills} />
        </div>
        <div className="hero_page_left_column">
          <BuildContainer suggested_sigils={suggested_sigils} />
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
