import React from "react";
import CustomTableHead from "./CustomTableHead.js";
import { Link } from "react-router-dom";

const HeroTable = (props) => {
  let headers = [
    "Name", "Role", "Colo", "Arena",
    "CH4", "CH5", "Umrat", "Sera"
  ];

  let mainTiers = ["OP", "S", "A", "B", "C", "D", "F"]

  if (props.minimalized === true) {
    headers = ["Colo", "Arena",
      "CH4", "CH5", "Umrat", "Sera"]
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
                  {
                    props.minimalized === false &&
                    <td>
                      <Link to={`/${hero.Name}`} className="hero_link">
                        {hero.Name
                          ? hero.Name
                          : "This hero's name should not be empty, check for error"}
                      </Link>
                    </td>
                  }
                  {
                    props.minimalized === false &&
                    <td>{hero.Archetype ? hero.Archetype : "Unknown"}</td>
                  }
                  <td className={
                    `tier_rating color_${mainTiers.find(item => item === hero.Colo) ? hero.Colo : "Other"
                    }`
                  }>{hero.Colo ? hero.Colo : "?"}</td>
                  <td className={
                    `tier_rating color_${mainTiers.find(item => item === hero.Arena) ? hero.Arena : "Other"
                    }`
                  }>{hero.Arena ? hero.Arena : "?"}</td>
                  <td className={
                    `tier_rating color_${mainTiers.find(item => item === hero.ChE4) ? hero.ChE4 : "Other"
                    }`
                  }>{hero.ChE4 ? hero.ChE4 : "?"}</td>
                  <td className={
                    `tier_rating color_${mainTiers.find(item => item === hero.ChE5) ? hero.ChE5 : "Other"
                    }`
                  }>{hero.ChE5 ? hero.ChE5 : "?"}</td>
                  <td className={
                    `tier_rating color_${mainTiers.find(item => item === hero.Umrat) ? hero.Umrat : "Other"
                    }`
                  }>{hero.Umrat ? hero.Umrat : "?"}</td>
                  <td className={
                    `tier_rating color_${mainTiers.find(item => item === hero.Sera) ? hero.Sera : "Other"
                    }`
                  }>{hero.Sera ? hero.Sera : "?"}</td>
                  <td>
                  </td>
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
