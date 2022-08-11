import React from 'react';
import Typography from '@mui/material/Typography';
import { findHeroByName } from 'global/queries.js';

export const renderHeroImages = (forms) => {
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
                                    alt={"unknown_form.png"}
                                ></img>
                            )
                        }
                    } else return null
                })
            }
        </React.Fragment>
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
                                src={require(`data/cq-pandora assets master weapons/${weapon.image}.png`)}
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
                    src={require(`data/cq-pandora assets master heroes/ui_collection_icon_03.png`)}
                    alt="unknown_hero.png"
                ></img>
            )
        }
    } else {
        return (
            <img
                key={"unknown form"}
                className="hero_forms_image"
                src={require(`data/cq-pandora assets master heroes/ui_collection_icon_03.png`)}
                alt="unknown_hero.png"
            ></img>
        )
    }
}