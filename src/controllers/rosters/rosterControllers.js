const Roster = require("../../models/roster")

async function getRosters() {
    const rosters = await Roster.find()
    return rosters
}

async function getRosterById(rosterId) {
    const roster = await Roster.findById(rosterId)
    return roster
}

async function getRosterByDate(startDate) {
    const roster = await Roster.find({startDate: startDate})
    return roster
}

async function getUpcomingRosters() {
    const currentDate = new Date()
    const rosters = await Roster.find({ startDate: { $gte: currentDate } })
    return rosters
}

async function getPreviousRosters() {
    const currentDate = new Date()
    const rosters = await Roster.find({ startDate: { $lt: currentDate } })
    return rosters
}

async function createRoster(roster) {
    const newRoster =  await Roster.create(roster)
    return newRoster
}

async function updateRoster(rosterId, startDate) {
    const updatedRoster = await Roster.findByIdAndUpdate(rosterId,
        { startDate },
        { new: true }
      )
    return updatedRoster
}

async function deleteRoster(rosterId) {
    const deletedRoster = await Roster.findByIdAndDelete(rosterId)
    return deletedRoster
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
    getRosterByDate,
    createRoster,
    updateRoster,
    deleteRoster,
    getUpcomingRosters,
    getPreviousRosters,
    //getRosterByUserIdWithShiftInfo
}
