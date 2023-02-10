const rosters = [
    {
        date: "24.12.23",
        shifts: [
            {
                shift_id: 1,
                employee_id: 1
            },
            {
                shift_id: 1,
                employee_id: 1
            }
        ]
    },
    {
        date: "07.11.23",
        shifts: [
            {
                shift_id: 2,
                employee_id: 2
            },
            {
                shift_id: 3,
                employee_id: 3
            }
        ]
    }
]

function getRosters() {
    return rosters
}

function getRosterById(rosterId) {
    const roster = rosters[rosterId]
    return roster
}

module.exports = {
    getRosters,
    getRosterById
}
