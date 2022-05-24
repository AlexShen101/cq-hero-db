import React from 'react'
import CustomTableHead from './CustomTableHead.js'

const HeroTable = (props) => {

    // <p className="hero_name">{props.hero.Name}</p>
    // <p>Damage Type: {props.hero['Damage Type']}</p>
    // <p>Quirk 1: {props.hero.Quirk === "" ? "None" : props.hero.Quirk}</p>
    // <p>Quirk 2: {props.hero.Quirk2 === "" ? "None" : props.hero.Quirk2}</p>
    // <p>Description: {props.hero.Note}</p>

    const headers = ['Name', 'Role', 'Colo', 'Arena', 'CH4', 'CH5', 'Umrat', 'Sera', '']

    return (
        <div>
            {props.displayedHeroes.length !== 0 ?
                <table className="hero_table">
                    <CustomTableHead headers={headers} />
                    <tbody>
                        {props.displayedHeroes.map((hero, index) => {
                            return (
                                <tr key={index}>
                                    <td>{hero.Name ? hero.Name : "?"}</td>
                                    <td>{hero.Archetype ? hero.Archetype : "Unknown"}</td>
                                    <td>{hero.Colo ? hero.Colo : "?"}</td>
                                    <td>{hero.Arena ? hero.Arena : "?"}</td>
                                    <td>{hero.ChE4 ? hero.ChE4 : "?"}</td>
                                    <td>{hero.ChE5 ? hero.ChE5 : "?"}</td>
                                    <td>{hero.Umrat ? hero.Umrat : "?"}</td>
                                    <td>{hero.Sera ? hero.Sera : "?"}</td>
                                    <td>
                                        <button
                                            className="delete_button"
                                            onClick={() => props.removeHero(hero)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                : "No Results Found"}
        </div>
    )
}

export default HeroTable