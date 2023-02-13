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

function getShifts() {
    return shifts
}

function getShiftById(shiftId) {
    const shift = shifts[shiftId]
    return shift
}

function createShift(shift) {
    const newShift = {
        id: 4,
        ...shift,
    }
    return newShift
}

module.exports = {
    getShifts,
    getShiftById,
    createShift
}