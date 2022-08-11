import React from "react";
import { useParams } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";

import hero_tiers from "data/Hero_tiers.json";
import hero_data from "data/heros.json";
import sigil_suggestions from 'data/sigil_suggestions.json';
import hero_skill_suggestions from 'data/hero_skill_suggestions.json';
import headers from 'data/tier_headers';

import { renderHeroImages, renderWeaponImages } from 'global/renderImages';

import SkillContainer from 'views/HeroPage/SkillContainer.js';
import BuildContainer from 'views/HeroPage/BuildContainer.js';
import SectionHeader from 'components/SectionHeader';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

let mainTiers = ["OP", "S", "A", "B", "C", "D", "F"]

const darkMode = createTheme({
  palette: {
    mode: 'dark',
  }
})

const HeroPage = () => {
  let { heroName } = useParams();

  let hero = {
    ...hero_tiers.find((entry) => {
      let hero1 = entry.Name.toLowerCase()
      let hero2 = heroName.toLowerCase()
      if (hero1 === hero2) return entry
      return null
    }), ...hero_data.find((entry) => {
      let hero1 = entry.id.toLowerCase()
      let hero2 = heroName.toLowerCase().replace(" ", "_")
      // very scuffed way to determine guilty gear collab members (only faust has -GG in his name for now)
      if (hero2.split('-')[1] === 'gg' && hero2.split('-')[0] === hero1 && entry.type === "collab") return entry
      else if (hero1 === hero2) return entry
      else if (hero1.indexOf(hero2) !== -1) return entry
      return null
    })
  }

  console.log(hero)

  if (hero.id === undefined) {
    return <Navigate to="/hero_not_found" />
  }

  let suggested_skills = hero_skill_suggestions.find((item) => item.Hero.toLowerCase() === heroName.toLowerCase())
  let suggested_sigils = sigil_suggestions.find((item) => item.Hero.toLowerCase() === heroName.toLowerCase())

  console.log(hero)
  console.log(suggested_skills)
  console.log(suggested_sigils)

  return (
    <ThemeProvider theme={darkMode}>
      <div className="content_container">
        <Paper className="hero_page_container unit_info">
          {renderHeroImages([hero.forms[hero.forms.length - 1]])}
          <div className="hero_page_title_container">
            <h1 id="hero_page_name">{hero.Name}</h1>
            <Typography id="hero_page_class">{hero.class.toUpperCase()}</Typography>
            <Typography id="hero_page_type">{hero.Archetype}</Typography>
          </div>
          <Button className="hero_page_back_button">
            <Link id="hero_page_back_link" to="/">Back</Link>
          </Button>
        </Paper>

        <div className="hero_page_details">
          <div className="hero_page_right_column">
            <SectionHeader text="Rating:" />
            <Paper className="hero_page_container">
              <Grid className="hero_rating_grid_container" container spacing={1}>
                {headers.map((header) => {
                  if (header !== "Name" && header !== "Archetype") {
                    return (
                      <Grid className="hero_rating_grid_item" item key={"hero_rating_grid_item_" + header}>
                        <div className={mainTiers.indexOf(hero[header]) !== -1 ? hero[header] + " hero_page_tier" : "other hero_page_tier"}>{hero[header] ? hero[header] : '?'}</div>
                        <div className="hero_rating_text_div">
                          <span className="hero_rating_text">{header}</span>
                        </div>
                      </Grid>
                    )
                  }
                  return null
                })}
              </Grid>
            </Paper>

            <SectionHeader text="Icons:" />
            <Paper className="hero_page_container">
              {renderHeroImages(hero.forms)}
              {renderWeaponImages(hero.sbws)}
            </Paper>

            <SkillContainer suggested_skills={suggested_skills} />
          </div>
          <div className="hero_page_left_column">
            <BuildContainer suggested_sigils={suggested_sigils} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default HeroPage;
