const express = require("express")
const shiftRouter = express.Router()
const {getShifts, getShiftById, createShift} = require("./shiftControllers")



shiftRouter.get("/", async (request, response) => {
    const shifts = await getShifts()
    response.json(shifts)
})

shiftRouter.get("/:shiftId", async (request, response) => {
    const shift = await getShiftById(request.params.shiftId)
    if(!shift) {
        response.json({
        data: "Shift doesn't exist"
        }, 404)
    }
    response.json(shift)
})

shiftRouter.post("/", async (request, response) => {
    const shift = await createShift({
        start: request.body.start,
        end: request.body.end,
    })
    response.json(shift)
})

module.exports = shiftRouter
