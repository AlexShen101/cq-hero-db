import React from "react";

const WeaponDisplay = (props) => {
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
        <div className="weapon_container">
            <h2>Weapons</h2>
            {props.weapons.map((weapon) => {
                return (
                    <div key={weapon.id + "item"}
                        className="weapon_forms_item">
                        {/*
                        <p className="weapon_forms_text"
                            key={weapon.id + "name"}>
                            {translator_db[weapon.name] ? translator_db[weapon.name].text : "N/A"}
                        </p>
                        */}
                        {renderWeapon(weapon)}
                    </div>
                );
            })}
        </div>
    )
}

export default WeaponDisplay