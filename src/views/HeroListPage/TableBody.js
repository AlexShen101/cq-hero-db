import React from "react";
import { Link } from "react-router-dom";

import { displayMainHeroImage } from 'global/renderImages';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


let mainTiers = ["OP", "S", "A", "B", "C", "D", "F"]

const HeroTable = (props) => {
    const heroList = props.heroList

    return (
        <TableBody>
            {heroList.map((hero, index) => {
                return (
                    <TableRow key={index}>
                        {props.headers.map((heading, col) => {
                            if (heading === "Name") {
                                return (
                                    <TableCell key={"cell " + index + col} className="hero_table_item_name">
                                        <Link
                                            key={"linked name " + index + col}
                                            to={`/hero/${hero.Name}`} className="hero_link">
                                            <div>
                                                {displayMainHeroImage(hero.Name)}
                                                {hero.Name}
                                            </div>
                                        </Link>
                                    </TableCell>
                                )
                            } else if (heading === "Archetype") {
                                return (
                                    <TableCell
                                        key={"archetype" + index + col}
                                        className="hero_table_item_archetype">
                                        {hero[heading] ? hero[heading] : "?"}
                                    </TableCell>
                                )
                            } else {
                                return (
                                    <TableCell
                                        key={"rating" + index + col}
                                        className={mainTiers.indexOf(hero[heading]) !== -1 ? hero[heading] + " tierText" : "other tierText"}
                                    >{hero[heading] ? hero[heading] : "?"}
                                    </TableCell>
                                )
                            }
                        })}
                    </TableRow>
                )
            })}
            {props.emptyRows > 0 && (
                <TableRow style={{ height: 53 * props.emptyRows }}>
                    <TableCell colSpan={6} />
                </TableRow>
            )}
        </TableBody>
    );
};

export default HeroTable;
