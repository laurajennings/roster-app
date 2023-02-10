const express = require("express")
const rosterRouter = express.Router()
const {getRosters, getRosterById} = require("./rosterControllers")



rosterRouter.get("/", (request, response) => {
    const rosters = getRosters()
    response.json(rosters)
})

rosterRouter.get("/:rosterId", (request, response) => {
    const roster = getRosterById(request.params.rosterId)
    if(!roster) {
        response.json({
        data: "roster doesn't exist"
        }, 404)
    }
    response.json(roster)
})

module.exports = rosterRouter
