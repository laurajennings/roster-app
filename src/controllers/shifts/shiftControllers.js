const Shift = require("../../models/shift")

const shifts = [
    {
        start: "2023-02-13T11:00:00",
        end: "2023-02-13T16:00:00",
    },
    {
        start: "2023-02-13T05:30:00",
        end: "2023-02-13T11:01:00",
    },
    {
        start: "2023-02-13T09:00:00",
        end: "2023-02-13T15:30:00",
    }
]

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

module.exports = {
    getShifts,
    getShiftById,
    createShift
}