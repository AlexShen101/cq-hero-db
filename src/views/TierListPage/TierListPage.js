import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import headers from 'data/tier_headers.js';
import hero_tiers from "data/Hero_tiers.json";

import { displayMainHeroImage } from 'global/renderImages.js';

const darkMode = createTheme({
    palette: {
        mode: 'dark',
    }
})

let allTiers = ["OP", "S", "A", "B", "C", "D", "F", "?", "Who?"]
let mainTiers = ["OP", "S", "A", "B", "C", "D", "F"]

const TierListPage = () => {
    const [activeSort, setActiveSort] = useState("Colo")
    /*
    Filter object:
    {
        property: "Name",
        value: ""
    }
    */
    const [searchInput, setSearchInput] = useState("")

    let filteredList = hero_tiers.filter((hero) => {
        if (
            searchInput === "" ||
            hero.Name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
        )
            return hero;
        else return null;
    })

    /*
    Sorted List Object:
    {
        OP: []
        S: []
    }
    */
    let sortedList = {}
    filteredList.forEach(hero => {
        let tier = hero[activeSort]
        if (tier === "") tier = "?"
        if (!sortedList[tier]) {
            sortedList[tier] = [hero]
        }
        else {
            sortedList[tier].push(hero)
        }
    })

    return (
        <ThemeProvider theme={darkMode}>
            <div>
                <div className="content_container">
                    <div className="hero_list_container">
                        <div className="section_header">
                            <span className="hero_list_title section_title">Hero List</span>
                        </div>
                        <div className="hero_list_center">
                            <span className="hero_list_search_text">Search: </span>
                            <TextField
                                variant="outlined"
                                size="small"
                                className="hero_list_search_input"
                                autoFocus
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value)
                                }}></TextField>

                            <div className="header_buttons">
                                {headers.map(header => {
                                    if (header !== "Name" && header !== "Archetype") {
                                        return (
                                            <Button
                                                className={header === activeSort ? "sort_button active" : "sort_button"}
                                                onClick={(() => setActiveSort(header))} >
                                                {header}
                                            </Button>
                                        )
                                    }
                                    return null
                                })}
                            </div>
                        </div>
                    </div>
                    {allTiers.map(tier => {
                        if (sortedList[tier] !== undefined) {
                            return (
                                <Paper className="tier_container" key={tier}>
                                    <div className={mainTiers.includes(tier) ? `tier_rating ${tier}` : `tier_rating other`}>{tier}</div>
                                    <div className="tier_heroes_container">
                                        <Grid container>
                                            {sortedList[tier].map(hero => {
                                                return (
                                                    <div className="hero_card">
                                                        <Link to={`/hero/${hero.Name}`} className="hero_card_link">
                                                            {displayMainHeroImage(hero.Name)}
                                                            <div className="hero_card_name">{hero["Name"]}</div>
                                                        </Link>
                                                    </div>
                                                )
                                            })}
                                        </Grid>
                                    </div>
                                </Paper>
                            )
                        }
                        return null
                    })}
                </div>
            </div >
        </ThemeProvider >
    )
}

export default TierListPage