import React from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const HeroTable = (props) => {
    let headers = ['Name', 'Colo', 'Arena', 'ChE4', 'ChE5', 'Sera', 'Archetype'];

    let mainTiers = ["OP", "S", "A", "B", "C", "D", "F"]
    return (
        <div>
            {props.displayedHeroes.length !== 0 ? (
                <React.Fragment>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {headers.map(header => {
                                        return (
                                            <TableCell key={header} align="left">{header}</TableCell>
                                        )
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.displayedHeroes.map((hero, index) => {
                                    return (
                                        <TableRow key={index}>
                                            {headers.map((heading, col) => {
                                                if (heading === "Name") {
                                                    return (
                                                        <TableCell key={"cell " + index + col}>
                                                            <Link
                                                                key={"linked name " + index + col}
                                                                to={`/${hero.Name}`} className="hero_link">
                                                                {hero.Name
                                                                    ? hero.Name
                                                                    : "This hero's name should not be empty, check for error"}
                                                            </Link>
                                                        </TableCell>
                                                    )
                                                } else if (heading === "Archetype") {
                                                    return <TableCell
                                                        key={"archetype" + index + col}
                                                        className="hero_table_item_archetype">{hero[heading] ? hero[heading] : "?"}</TableCell>
                                                } else {
                                                    return (
                                                        <TableCell
                                                            key={"rating" + index + col}
                                                            className={
                                                                `tier_rating color_${mainTiers.find(item => item === hero[heading]) ? hero[heading] : "Other"
                                                                }`
                                                            }>{hero[heading] ? hero[heading] : "?"}</TableCell>
                                                    )
                                                }
                                            })}
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </React.Fragment>
            ) : (
                "No Results Found"
            )
            }
        </div >
    );
};

export default HeroTable;
