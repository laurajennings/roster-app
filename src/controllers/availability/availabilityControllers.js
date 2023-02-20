/* const Availability = require("../../models/availability
")

async function getAvailability() {
    const availabilities = await Availability.find()
    return availabilities
}

async function getAvailabilityById(availabilityId) {
    try {
    const availability = await availability.findById(availabilityId)
    return availability
    } catch (err) {
        console.log(err)
    }
}

async function createAvailability(availability) {
    const newAvailability =  await availability.create(availability)
    return newAvailability
}

async function updateAvailability(availabilityId, start, end) {
    const updatedAvailability = await Availability.findByIdAndUpdate(availabilityId,
        {start, end},
        {new: true}
      )
    return updatedAvailability
}

async function deleteAvailability(availabilityId) {
    const deletedAvailability = await availability.findByIdAndDelete(availabilityId)
    return deletedAvailability
}

module.exports = {
    getAvailabilities,
    getAvailabilityById,
    createAvailability,
    updateAvailability,
    deleteAvailability,
} */