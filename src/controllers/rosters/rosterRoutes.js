const express = require("express")
const rosterRouter = express.Router()
const {getRosters, 
    getRosterWithShiftInfo,
    //getRosterById,
    getRosterByDate,
    getUpcomingRosters,
    getPreviousRosters,
    createRoster,
    updateRoster,
    deleteRoster,
} = require("./rosterControllers")


// Gets all rosters
rosterRouter.get("/", async (request, response) => {
    const rosters = await getRosters()
    response.json(rosters)
})

// Gets a roster with shifts
rosterRouter.get("/:rosterId", async (request, response) => {
    if (request.query.getShiftInfo) {
        roster = await getRosterWithShiftInfo(request.params.UserId)
    } else {
        const roster = await getRosterById(request.params.rosterId) 
    }

    if(!roster) {
        response.json({
        data: "roster doesn't exist"
        }, 404)
    }
    response.json(roster)
})

// Gets a roster by roster Id
/* rosterRouter.get("/:rosterId", async (request, response) => {
    const roster = await getRosterById(request.params.rosterId)
    if(!roster) {
        response.json({
        data: "roster doesn't exist"
        }, 404)
    }
    response.json(roster)
})  */

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

// Adds a new roster and shifts
rosterRouter.post("/", async (request, response) => {
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
        response.json({
        data: "roster doesn't exist"
        }, 404)
    }
    response.json(roster)
})

// Deletes a roster with roster Id
rosterRouter.delete("/:rosterId", async (request, response) => {
    const roster = await deleteRoster(request.params.rosterId)
    response.json(roster)
})

module.exports = rosterRouter


