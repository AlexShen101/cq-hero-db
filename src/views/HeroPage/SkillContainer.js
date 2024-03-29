import React from 'react';
import translator from 'data/translator_en_us.json';
import skillList from 'data/skills.json';
import SectionHeader from 'components/SectionHeader';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const baseUrl = "https://raw.githubusercontent.com/cq-pandora/assets/master";

const SkillContainer = (props) => {
    const displaySkill = (skillName) => {
        if (skillName === "Any") {
            return null;
        }
        let skillID = findSkillInTranslator(skillName)
        let skillInfo = getSkillInfo(skillID)

        let image = skillInfo.forms[skillInfo.forms.length - 1].image
        return renderSkill(image)
    }

    const findSkillInTranslator = (skillName) => {
        let skillID = Object.keys(translator).find((key) => {
            if (key.split('_')[1] === "SKILL" && key.split('_')[key.split('_').length - 1] === "NAME" && translator[key].text.indexOf(skillName) !== -1) {
                return key
            }
            return null
        })
        return skillID
    }

    const getSkillInfo = (skillID) => {
        let skillInfo = skillList.find((item) => {
            if (item.name === skillID) {
                return item
            }
            return null
        })
        return skillInfo
    }

    const renderSkill = (skillImage) => {
        try {
            return (
                <img
                    className="skill_image"
                    src={`${baseUrl}/skills/${skillImage}.png`}
                    alt={skillImage + ".png"}
                ></img>
            )
        } catch (e) {
            return <Typography>Skill image failed to load</Typography>
        }
    }
    return (
        <React.Fragment>
            <SectionHeader text="Skills:" />
            <Paper className="hero_page_container">
                {props.suggested_skills !== undefined &&
                    <div className="skills_arranger">
                        {props.suggested_skills['Skill 1'] &&
                            <div className="skill_container">
                                {displaySkill(props.suggested_skills['Skill 1'])}
                                <Typography className="skill_title">{props.suggested_skills['Skill 1']}</Typography>
                            </div>
                        }
                        {props.suggested_skills['Skill 2'] &&
                            <div className="skill_container">
                                {displaySkill(props.suggested_skills['Skill 2'])}
                                <Typography className="skill_title">{props.suggested_skills['Skill 2']}</Typography>
                            </div>
                        }
                        {props.suggested_skills['Skill 3'] &&
                            <div className="skill_container">
                                {displaySkill(props.suggested_skills['Skill 3'])}
                                <Typography className="skill_title">{props.suggested_skills['Skill 3']}</Typography>
                            </div>
                        }
                    </div>
                }
                {props.suggested_skills === undefined && <Typography className="error_message">Seems like there are no suggested skills for this hero.</Typography>}
            </Paper>
        </React.Fragment>
    )
}

export default SkillContainer