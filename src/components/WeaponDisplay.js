import React from "react";

const WeaponDisplay = (props) => {
    const renderWeapon = (weapon) => {
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

    return renderWeapon(props.weapon)
}

export default WeaponDisplay