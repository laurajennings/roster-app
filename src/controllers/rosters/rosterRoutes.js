const express = require("express")
const rosterRouter = express.Router()
const {getRosters, 
    //getRosterById,
    createRoster,
    updateRoster,
    deleteRoster,
    getRosterByDate,
    getUpcomingRosters,
    getPreviousRosters,
    getRosterWithShiftInfo,
} = require("./rosterControllers")



rosterRouter.get("/", async (request, response) => {
    const rosters = await getRosters()
    response.json(rosters)
})

rosterRouter.get("/upcoming", async (request, response) => {
    const rosters = await getUpcomingRosters()
    response.json(rosters)
})

rosterRouter.get("/previous", async (request, response) => {
    const rosters = await getPreviousRosters()
    response.json(rosters)
})

/* rosterRouter.get("/:rosterId", async (request, response) => {
    const roster = await getRosterById(request.params.rosterId)
    if(!roster) {
        response.json({
        data: "roster doesn't exist"
        }, 404)
    }
    response.json(roster)
}) */

rosterRouter.get("/date/:startDate", async (request, response) => {
    const roster = await getRosterByDate(request.params.startDate)
    response.json(roster)
})



rosterRouter.post("/", async (request, response) => {
    const roster = await createRoster({
        startDate: request.body.startDate,
        shifts: request.body.shifts
    })
    response.json(roster)
})

rosterRouter.put("/:rosterId", async (request, response) => {
    const roster = await updateRoster(
        request.params.rosterId,
        request.body.startDate,
    )
    if(!roster) {
        response.json({
        data: "roster doesn't exist"
        }, 404)
    }
    response.json(roster)
})

rosterRouter.delete("/:rosterId", async (request, response) => {
    const roster = await deleteRoster(request.params.rosterId)
    response.json(roster)
})

module.exports = rosterRouter

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
