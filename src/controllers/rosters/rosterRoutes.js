const express = require("express")
const rosterRouter = express.Router()
const {getRosters, getRosterById, 
    //getRosterByUserIdWithShiftInfo
} = require("./rosterControllers")



rosterRouter.get("/", async (request, response) => {
    const rosters = await getRosters()
    response.json(rosters)
})

rosterRouter.get("/:rosterId", async (request, response) => {
    const roster = await getRosterById(request.params.rosterId)
    if(!roster) {
        response.json({
        data: "roster doesn't exist"
        }, 404)
    }
    response.json(roster)
})

module.exports = rosterRouter
/*
rosterRouter.get("/:rosterId", async (request, response) => {
    if (request.query.getShiftInfo) {
        roster = await getRosterByUserIdWiithShiftInfo(request.params.UserId)
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
*/