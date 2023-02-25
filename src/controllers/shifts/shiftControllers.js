/* const Shift = require("../../models/shift")

async function getShifts() {
    const shifts = await Shift.find()
    return shifts
}

async function getShiftById(shiftId) {
    try {
    const shift = await Shift.findById(shiftId)
    return shift
    } catch (err) {
        console.log(err)
    }
}

async function createShift(shift) {
    const newShift =  await Shift.create(shift)
    return newShift
}

async function updateShift(shiftId, start, end) {
    const updatedShift = await Shift.findByIdAndUpdate(shiftId,
        {employee, start, end},
        {new: true}
      )
    return updatedShift
}

async function deleteShift(shiftId) {
    const deletedShift = await Shift.findByIdAndDelete(shiftId)
    return deletedShift
}

module.exports = {
    getShifts,
    getShiftById,
    createShift,
    updateShift,
    deleteShift,
} */