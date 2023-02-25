const Roster = require("../../models/roster")

// Gets all rosters
async function getRosters() {
    const rosters = await Roster.find()
    return rosters
}

// Gets a roster by rosterId
async function getRosterById(rosterId) {
    const roster = await Roster.findById(rosterId)
    return roster
}

// Gets a roster by searching a start date
async function getRosterByDate(start) {
    const roster = await Roster.find({start: start})
    return roster
}

// Gets all rosters with start dates after the current date
async function getUpcomingRosters() {
    const currentDate = new Date()
    const rosters = await Roster.find({ start: { $gte: currentDate } })
    return rosters
}

// Gets all rosters with end dates before the current date
async function getPreviousRosters() {
    const currentDate = new Date()
    const rosters = await Roster.find({ end: { $lt: currentDate } })
    return rosters
}

// Adds a new roster and shifts
async function createRoster(roster) {
    const newRoster =  await Roster.create(roster)
    return newRoster
}

// Updates a roster with rosterId
async function updateRoster(rosterId, start, end) {
    const updatedRoster = await Roster.findByIdAndUpdate(rosterId,
        { start, end },
        { new: true }
      )
    return updatedRoster
}

// Deletes a roster with rosterId
async function deleteRoster(rosterId) {
    const deletedRoster = await Roster.findByIdAndDelete(rosterId)
    return deletedRoster
}


module.exports = {
    getRosters,
    getRosterById,
    getRosterByDate,
    getUpcomingRosters,
    getPreviousRosters,
    createRoster,
    updateRoster,
    deleteRoster,
}
