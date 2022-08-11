import hero_data from 'data/heros.json';

export const findHeroByName = (heroName) => {
    return hero_data.find((entry) => {
        let hero1 = entry.id.toLowerCase()
        let hero2 = heroName.toLowerCase().replace(" ", "_")
        // very scuffed way to determine guilty gear collab members (only faust has -GG in his name for now)
        if (hero2.split('-')[1] === 'gg' && hero2.split('-')[0] === hero1 && entry.type === "collab") return entry
        else if (hero1 === hero2) return entry
        else if (hero1.indexOf(hero2) !== -1) return entry
        return null
    })
}