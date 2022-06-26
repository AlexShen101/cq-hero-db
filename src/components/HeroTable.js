import React from "react";
import CustomTableHead from "./CustomTableHead.js";
import { Link } from "react-router-dom";

const HeroTable = (props) => {
    let headers = ['Name', 'Colo', 'Arena', 'ChE4', 'ChE5', 'Sera', 'Archetype'];

    let mainTiers = ["OP", "S", "A", "B", "C", "D", "F"]

    if (props.minimalized === true) {
        headers = ['Colo', 'Arena', 'ChE4', 'ChE5', 'Sera'];
    }

    return (
        <div>
            {props.displayedHeroes.length !== 0 ? (
                <table className="hero_table">
                    <CustomTableHead headers={headers} />
                    <tbody>
                        {props.displayedHeroes.map((hero, index) => {
                            return (
                                <tr key={index}>
                                    {headers.map((heading) => {
                                        if (heading === "Name") {
                                            return (
                                                <Link to={`/${hero.Name}`} className="hero_link">
                                                    {hero.Name
                                                        ? hero.Name
                                                        : "This hero's name should not be empty, check for error"}
                                                </Link>
                                            )
                                        } else if (heading === "Archetype") {
                                            return <td className="hero_table_item_archetype">{hero[heading] ? hero[heading] : "?"}</td>
                                        } else {
                                            return (
                                                <td className={
                                                    `tier_rating color_${mainTiers.find(item => item === hero[heading]) ? hero[heading] : "Other"
                                                    }`
                                                }>{hero[heading] ? hero[heading] : "?"}</td>
                                            )
                                        }
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                "No Results Found"
            )
            }
        </div >
    );
};

export default HeroTable;
