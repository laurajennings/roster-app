const Roster = require("../../models/roster")

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

async function getRosters() {
    const rosters = await Roster.find()
    return rosters
}

async function getRosterById(rosterId) {
    const roster = await Roster.findById(rosterId)
    return roster
}

/*
async function getRosgetRosterByUserIdWithShiftInfoterById(userId) {
    const getRosterByUserIdWithShiftInfo = await Roster.findOne({
        user_id: userId
    }).populate("products.product")
    return getRosterByUserIdWithShiftInfo
}
*/ 

module.exports = {
    getRosters,
    getRosterById,
    //getRosterByUserIdWithShiftInfo
}
