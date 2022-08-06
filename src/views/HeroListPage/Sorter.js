
const sorter = (hero1, hero2, orderBy, order) => {
    let result = 0

    const stringCompare = (str1, str2) => {
        return (str1 < str2) ? -1 : (str1 > str2) ? 1 : 0
    }

    const tierCompare = (tier1, tier2) => {
        let tierOrder = ['OP', 'S', 'A', 'B', 'C', 'D', 'F', 'BUG', '', "Who?"]
        let result = 0;
        if (tierOrder.indexOf(tier1) < tierOrder.indexOf(tier2)) result = -1
        else if (tierOrder.indexOf(tier1) > tierOrder.indexOf(tier2)) result = 1
        else result = 0

        return result
    }

    if (orderBy === 'Name' || orderBy === 'Archetype') {
        if (orderBy === 'Name') {
            result = stringCompare(hero1.Name, hero2.Name)
        } else {
            result = stringCompare(hero1.Archetype, hero2.Archetype)
        }
    } else {
        result = tierCompare(hero1[orderBy], hero2[orderBy])
    }
    if (order === 'desc') result = result * -1
    return result
}

export default sorter