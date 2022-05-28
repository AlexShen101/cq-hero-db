
const sorter = (hero1, hero2, activeFilter) => {

    let category = activeFilter.split('-')[0]
    let direction = activeFilter.split('-')[1]

    let result = 0

    const stringCompare = (str1, str2) => {
        return (str1 < str2) ? -1 : (str1 > str2) ? 1 : 0
    }

    const tierCompare = (tier1, tier2) => {
        let order = ['OP', 'S', 'A', 'B', 'C', 'D', 'F', 'BUG', '', "Who?"]
        let result = 0;

        if (order.indexOf(tier1) < order.indexOf(tier2)) result = -1
        else if (order.indexOf(tier1) > order.indexOf(tier2)) result = 1
        else result = 0

        return result
    }

    if (category === 'Name' || category === 'Role') {
        if (category === 'Name') {
            result = stringCompare(hero1.Name, hero2.Name)
        } else {
            result = stringCompare(hero1.Archetype, hero2.Archetype)
        }
    } else {
        if (category === 'Colo') {
            result = tierCompare(hero1.Colo, hero2.Colo)
        } else if (category === 'Arena') {
            result = tierCompare(hero1.Arena, hero2.Arena)
        } else if (category === 'CH4') {
            result = tierCompare(hero1.ChE4, hero2.ChE4)
        } else if (category === 'CH5') {
            result = tierCompare(hero1.ChE5, hero2.ChE5)
        } else if (category === 'Umrat') {
            result = tierCompare(hero1.Umrat, hero2.Umrat)
        } else if (category === 'Sera') {
            result = tierCompare(hero1.Sera, hero2.Sera)
        }
    }
    if (direction === 'Down') result = result * -1
    return result
}

export default sorter