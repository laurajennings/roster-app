const express = require("express")
const shiftRouter = express.Router()
const {getShifts, getShiftById, createShift} = require("./shiftControllers")



shiftRouter.get("/", (request, response) => {
    const shifts = getShifts()
    response.json(shifts)
})

shiftRouter.get("/:shiftId", (request, response) => {
    const shift = getShiftById(request.params.shiftId)
    if(!shift) {
        response.json({
        data: "Shift doesn't exist"
        }, 404)
    }
    response.json(shift)
})

shiftRouter.post("/", (request, response) => {
    const shift = createShift({
        start: request.body.start,
        end: request.body.end,
    })
    response.json(shift)
})

module.exports = shiftRouter
