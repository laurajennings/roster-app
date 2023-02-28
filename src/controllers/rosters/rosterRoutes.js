const express = require("express")
const rosterRouter = express.Router()
const {getRosters,
    getRosterById,
    getRosterByDate,
    getUpcomingRosters,
    getPreviousRosters,
    createRoster,
    updateRoster,
    deleteRoster,
} = require("./rosterControllers")

const auth = require("../..//middlewares/auth")
const admin = require("../..//middlewares/admin")


// Gets all rosters
rosterRouter.get("/", async (request, response) => {
    const rosters = await getRosters()
    response.json(rosters)
})

// Gets a roster by searching a start date
rosterRouter.get("/date/:start", async (request, response) => {
    const roster = await getRosterByDate(request.params.start)
    response.json(roster)
})

// Gets all rosters with start dates after the current date
rosterRouter.get("/upcoming", async (request, response) => {
    const rosters = await getUpcomingRosters()
    response.json(rosters)
})

// Gets all rosters with end dates before teh current date
rosterRouter.get("/previous", async (request, response) => {
    const rosters = await getPreviousRosters()
    response.json(rosters)
})

// Gets a roster by roster Id
rosterRouter.get("/:rosterId", async (request, response) => {
    const roster = await getRosterById(request.params.rosterId)
    if(!roster) {
        return response.status(404).json({
            data: "Roster doesn't exist"
        })
    }
    response.json(roster)
}) 

// Adds a new roster and shifts
rosterRouter.post("/", auth, async (request, response) => {
    const roster = await createRoster({
        start: request.body.start,
        end: request.body.end,
        shifts: request.body.shifts
    })
    response.json(roster)
})

// Updates a roster with roster Id
rosterRouter.put("/:rosterId", async (request, response) => {
    const roster = await updateRoster(
        request.params.rosterId,
        request.body.start,
        request.body.end
    )
    if(!roster) {
        return response.status(404).json({
            data: "Roster doesn't exist"
        })
    }
    response.json(roster)
})

// Deletes a roster with roster Id
rosterRouter.delete("/:rosterId", admin, async (request, response) => {
    const roster = await deleteRoster(request.params.rosterId)
    response.json(roster)
})

module.exports = rosterRouter


