import React from 'react';
import Typography from '@mui/material/Typography';
import { findHeroByName } from 'global/queries.js';

const baseUrl = "https://raw.githubusercontent.com/cq-pandora/assets/master";

export const renderHeroImages = (forms) => {
    return (
        <React.Fragment>
            {
                forms.map((form, index) => {
                    if (form.star >= 3) {
                        return (
                            <img
                                key={form.id}
                                className="hero_forms_image"
                                src={`${baseUrl}/heroes/${form.image}.png?raw=true`}
                                alt={`${form.image}.png`}
                                onError={(e) => {
                                    console.log("Image threw an error")
                                    e.target.onError = "";
                                    e.target.src = `${baseUrl}/heroes/ui_collection_icon_03.png`;
                                }}
                            ></img>
                        )
                    } else return null
                })
            }
        </React.Fragment >
    )
};

export const renderWeaponImages = (weapons) => {
    return (
        <React.Fragment>
            {
                weapons.map((weapon, index) => {
                    try {
                        return (
                            <img
                                key={weapon.id + index}
                                className="weapon_forms_image"
                                src={`${baseUrl}/weapons/${weapon.image}.png?raw=true`}
                                alt={weapon.image + ".png"}
                            ></img>
                        )
                    } catch (e) {
                        return <Typography>Weapon image failed to load</Typography>
                    }
                })
            }
        </React.Fragment>
    )
}

export const displayMainHeroImage = (heroName) => {
    let heroEntry = findHeroByName(heroName)
    if (heroEntry) {
        try {
            return renderHeroImages([heroEntry.forms[heroEntry.forms.length - 1]])
        }
        catch {
            console.log(`Found hero data but failed to render image for ${heroName}`)
            return (
                <img
                    key={"unknown form"}
                    className="hero_forms_image"
                    src={`${baseUrl}/heroes/ui_collection_icon_03.png?raw=true`}
                    alt="unknown_hero.png"
                ></img>
            )
        }
    } else {
        console.log(`No hero data of ${heroName}`)
        return (
            <img
                key={"unknown form"}
                className="hero_forms_image"
                src={`${baseUrl}/heroes/ui_collection_icon_03.png?raw=true`}
                alt="unknown_hero.png"
            ></img>
        )
    }
}