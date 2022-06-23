import React from 'react';
import translator from '../data/translator_en_us.json';
import skillList from '../data/skills.json';

const SkillContainer = (props) => {
    const displaySkill = (skillName) => {
        console.log(skillName)
        if (skillName === "Any") {
            return null;
        }
        let skillID = findSkillInTranslator(skillName)
        let skillInfo = getSkillInfo(skillID[0])

        let image = skillInfo.forms[skillInfo.forms.length - 1].image
        return renderSkill(image)
    }

    const findSkillInTranslator = (skillName) => {
        let skillID = Object.keys(translator).filter((key) => {
            if (key.split('_')[1] === "SKILL" && key.split('_')[key.split('_'.length - 1)] === "NAME" && translator[key].text === skillName) {
                console.log(key)
                return key
            }
        })
        return skillID
    }

    const getSkillInfo = (skillID) => {
        let skillInfo = skillList.find((item) => {
            if (item.name === skillID) {
                return item
            }
        })
        return skillInfo
    }

    const renderSkill = (skillImage) => {
        try {
            return (
                <img
                    className="weapon_forms_image"
                    src={require(`../data/cq-pandora assets master skills/${skillImage}.png`)}
                    alt={skillImage + ".png"}
                ></img>
            )
        } catch (e) {
            return <p>Skill image failed to load</p>
        }
    }
    return (
        <div className="hero_page_container">
            <h2 id="hero_page_skill_suggestions_title">Suggested Skills:</h2>
            {props.suggested_skills['Skill 1'] &&
                <React.Fragment>
                    {displaySkill(props.suggested_skills['Skill 1'])}
                    <p>{props.suggested_skills['Skill 1']}</p>
                </React.Fragment>
            }
            {props.suggested_skills['Skill 2'] &&
                <React.Fragment>
                    {displaySkill(props.suggested_skills['Skill 2'])}
                    <p>{props.suggested_skills['Skill 2']}</p>
                </React.Fragment>
            }
            {props.suggested_skills['Skill 3'] &&
                <React.Fragment>
                    {displaySkill(props.suggested_skills['Skill 3'])}
                    <p>{props.suggested_skills['Skill 3']}</p>
                </React.Fragment>
            }
        </div>
    )
}

export default SkillContainer