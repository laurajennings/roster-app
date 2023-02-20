/* const express = require("express")
const AvailabilityRouter = express.Router()
const {getAvailabilities, getAvailabilityById, createAvailability, updateAvailability, deleteAvailability} = require("./availabilityControllers")



AvailabilityRouter.get("/", async (request, response) => {
    const availabilities = await getAvailabilities()
    response.json(availabilities)
})

AvailabilityRouter.get("/:availabilityId", async (request, response) => {
    const availability = await getAvailabilityById(request.params.AvailabilityId)
    if(!availability) {
        response.json({
        data: "Availability doesn't exist"
        }, 404)
    }
    response.json(availability)
})

AvailabilityRouter.post("/", async (request, response) => {
    const availability = await createAvailability({
        start: request.body.start,
        end: request.body.end,
    })
    response.json(availability)
})

AvailabilityRouter.put("/:availabilityId", async (request, response) => {
    const availability = await updateAvailability(
        request.params.availabilityId,
        request.body.start,
        request.body.end,
    )
    if(!availability) {
        response.json({
        data: "Availability doesn't exist"
        }, 404)
    }
    response.json(availability)
})

AvailabilityRouter.delete("/:availabilityId", async (request, response) => {
    const Availability = await deleteAvailability(request.params.availabilityId)
    response.json(availability)
})

module.exports = AvailabilityRouter */