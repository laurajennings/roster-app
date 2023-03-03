const express = require("express")
const rosterRouter = express.Router()
const {getRosters,
    getRosterById,
    createRoster,
    updateRoster,
    deleteRoster,
} = require("./rosterControllers")

const auth = require("../../middlewares/auth")
const admin = require("../../middlewares/admin")
const use = require("../../middlewares/use")

// Gets all rosters
rosterRouter.get("/", auth, use(async (request, response) => {
    const rosters = await getRosters()
    response.json(rosters)
}))

// Gets a roster by roster Id
rosterRouter.get("/:rosterId", auth, use(async (request, response) => {
    const roster = await getRosterById(request.params.rosterId)
    if(!roster) {
        return response.status(404).json({
            data: "Roster doesn't exist"
        })
    }
    response.json(roster)
}))

// Adds a new roster and shifts
rosterRouter.post("/", admin, use(async (request, response) => {
    const roster = await createRoster({
        start: request.body.start,
        end: request.body.end,
        shifts: request.body.shifts
    })
    response.json(roster)
}))

// Updates a roster with roster Id
rosterRouter.put("/:rosterId", admin, use(async (request, response) => {
    const roster = await updateRoster(
        request.params.rosterId,
        request.body.start,
        request.body.end,
        request.body.shifts
    )
    if(!roster) {
        return response.status(404).json({
            data: "Roster doesn't exist"
        })
    }
    response.json(roster)
}))

// Deletes a roster with roster Id
rosterRouter.delete("/:rosterId", admin, use(async (request, response) => {
    const roster = await deleteRoster(request.params.rosterId)
    if(!roster) {
        return response.status(404).json({
            data: "Roster doesn't exist"
        })
    }
    response.json(roster)
}))

module.exports = rosterRouter


/* // Gets a roster by searching a start date
rosterRouter.get("/date/:start", use(async (request, response) => {
    const roster = await getRosterByDate(request.params.start)
    response.json(roster)
}))

// Gets all rosters with start dates after the current date
rosterRouter.get("/upcoming", use(async (request, response) => {
    const rosters = await getUpcomingRosters()
    response.json(rosters)
}))

// Gets all rosters with end dates before teh current date
rosterRouter.get("/previous", use(async (request, response) => {
    const rosters = await getPreviousRosters()
    response.json(rosters)
})) */

