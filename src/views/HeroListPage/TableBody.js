import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

let mainTiers = ["OP", "S", "A", "B", "C", "D", "F"]

const HeroTable = (props) => {
    const heroList = props.heroList
    console.log(heroList)
    return (
        <TableBody>
            {heroList.map((hero, index) => {
                return (
                    <TableRow key={index}>
                        {props.headers.map((heading, col) => {
                            if (heading === "Name") {
                                return (
                                    <TableCell key={"cell " + index + col}>
                                        <Link
                                            key={"linked name " + index + col}
                                            to={`/${hero.Name}`} className="hero_link">
                                            {hero.Name}
                                        </Link>
                                    </TableCell>
                                )
                            } else if (heading === "Archetype") {
                                return (
                                    <TableCell
                                        key={"archetype" + index + col}
                                        className="hero_table_item_archetype">{hero[heading] ? hero[heading] : "?"}
                                    </TableCell>
                                )
                            } else {
                                return (
                                    <TableCell
                                        key={"rating" + index + col}
                                        sx={() => {
                                            let colors = ["#d500f9", "#834bff", "#546eff", "#2979ff", "#00e676", "#c6ff00", "#b22a00"]
                                            let index = mainTiers.indexOf(hero[heading])
                                            let color = (index == -1) ? "#838383" : colors[index]
                                            return {
                                                color: color,
                                                fontWeight: 'bold'
                                            }
                                        }}
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
