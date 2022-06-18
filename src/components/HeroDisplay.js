import React from "react";

const HeroDisplay = (props) => {

    const heroImageRender = (form) => {
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

    return (
        <div className="hero_container">
            <h2>Hero Forms</h2>

            {props.forms.map((form) => {
                return (
                    <div key={form.id + "item"}
                        className="hero_forms_item">
                        {heroImageRender(form)}
                    </div>
                );
            })}
        </div>
    )
}

export default HeroDisplay