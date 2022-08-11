import React, { useState } from 'react';
import translator from 'data/translator_en_us.json';
import sigilList from 'data/sigils.json';
import SectionHeader from 'components/SectionHeader';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

let convertBasicSigilAbbvs = [
    {
        "Name": "HP",
        "TrueName": "Epic HP Sigil"
    }, {
        "Name": "Arm",
        "TrueName": "Epic Armor Sigil"
    }, {
        "Name": "Atk",
        "TrueName": "Epic Attack Power Sigil"
    }, {
        "Name": "Apen",
        "TrueName": "Epic Armor Penetration Sigil"
    }, {
        "Name": "Rpen",
        "TrueName": "Epic Resist Penetration Sigil"
    }, {
        "Name": "Res",
        "TrueName": "Epic Resistance Sigil"
    }, {
        "Name": "CC",
        "TrueName": "Epic Critical Chance Sigil"
    }, {
        "Name": "Eva",
        "TrueName": "Epic Evasion Sigil"
    }, {
        "Name": "Acc",
        "TrueName": "Epic Accuracy Sigil"
    }, {
        "Name": "CR",
        "TrueName": "Epic Critical Resistance Sigil"
    }, {
        "Name": "DR",
        "TrueName": "Epic Damage Reduction Sigil"
    }
]

const BuildContainer = (props) => {

    const findSigilInTranslator = (sigilName) => {
        let sigilID = Object.keys(translator).find((key) => {
            if (translator[key].text === sigilName) {
                return key
            }
            return null
        })
        return sigilID
    }

    const getSigilInfo = (sigilName) => {
        // edit this
        // goal: match everything except last number
        // last number is as high as possible
        let sigilMatches = sigilList.filter((item) => {
            if (item['name'] === sigilName) return item
            return null
        })

        sigilMatches.sort((a, b) => {
            let num1 = a['id'].substring(a['id'].length - 1)
            let num2 = b['id'].substring(a['id'].length - 1)
            // neg: b before a    pos: a before b
            return num2 - num1
        })
        let sigilInfo = sigilMatches[0]
        return sigilInfo
    }

    const convertToActiveBuild = (buildObject) => {
        let sigilNames = [
            buildObject['Earlygame 1'],
            buildObject['Earlygame 2'],
            buildObject['Midgame 1'],
            buildObject['Midgame 2'],
            buildObject['Endgame 1'],
            buildObject['Endgame 2']
        ]

        let sigils = []

        sigilNames = sigilNames.map((sigilName) => {
            if (sigilName.indexOf("☆") !== -1) {
                let newSigilItem = convertBasicSigilAbbvs.find((item) => {
                    if (item['Name'] === sigilName.split(' / ')[0]) {
                        return (item)
                    }
                    return null
                })
                return newSigilItem['TrueName']
            } else {
                return sigilName
            }
        })

        sigils = sigilNames.map((name) => {
            let sigilName = findSigilInTranslator(name)
            let sigil = getSigilInfo(sigilName)
            let newSigil = {
                ...sigil,
                "description": translator[sigil['description']].text,
                "name": translator[sigil['name']].text,
            }
            return newSigil
        })

        let activeBuildObject = {
            "Earlygame 1": sigils[0],
            "Earlygame 2": sigils[1],
            "Midgame 1": sigils[2],
            "Midgame 2": sigils[3],
            "Endgame 1": sigils[4],
            "Endgame 2": sigils[5],
            "Note": buildObject['Note'],
            "Set Name": buildObject['Set Name'],
            "Upgrade 1": buildObject['Upgrade 1'],
            "Upgrade 2": buildObject['Upgrade 2'],
        }

        return activeBuildObject
    }

    const [activeBuild, setActiveBuild] = useState(convertToActiveBuild(props.suggested_sigils.Sets['0']))

    const builds = props.suggested_sigils.Sets

    const renderSigil = (sigil) => {

        try {
            return (
                <div className="sigil_container">
                    <img
                        className="sigil_image"
                        src={require(`data/cq-pandora assets master sigils/${sigil.image}.png`)}
                        alt={sigil.image + ".png"}
                    ></img>
                    <Typography className="sigil_name">{sigil.name}</Typography>
                </div>
            )
        } catch (e) {
            return (
                <div className="sigil_container">
                    <Typography className="image_failed">Sigil image failed to load</Typography>
                    <Typography className="sigil_name">{sigil.name}</Typography>
                </div>
            )
        }
    }

    return (
        <React.Fragment>
            <SectionHeader text="Builds:" />
            <Paper className="hero_page_container build_container">
                <Grid container spacing={0.5}>
                    {builds.map((build, index) => {
                        return (
                            <Grid key={`hero_build_grid_item_${index}`} item>
                                <Button
                                    className={JSON.stringify(activeBuild) === JSON.stringify(convertToActiveBuild(build)) ? 'build_tab build_tab_active' : 'build_tab'}
                                    onClick={() => setActiveBuild(convertToActiveBuild(build))}>
                                    {build['Set Name']}
                                </Button>
                            </Grid>
                        )
                    })}
                </Grid>
                <div>
                    <div className="set_upgrades_container">
                        <Typography className="set_header">Upgrades:</Typography>
                        <Typography className="set_upgrade">{activeBuild['Upgrade 1']}</Typography>
                        <Typography className="set_upgrade">{activeBuild['Upgrade 2']}</Typography>
                    </div>

                    <Typography className="set_header">Endgame:</Typography>
                    {renderSigil(activeBuild['Endgame 1'])}
                    {renderSigil(activeBuild['Endgame 2'])}

                    <Typography className="set_header">Midgame:</Typography>
                    {renderSigil(activeBuild['Midgame 1'])}
                    {renderSigil(activeBuild['Midgame 2'])}

                    <Typography className="set_header">Earlygame:</Typography>
                    {renderSigil(activeBuild['Earlygame 1'])}
                    {renderSigil(activeBuild['Earlygame 2'])}
                </div>
            </Paper>
        </React.Fragment >
    )
}

export default BuildContainer