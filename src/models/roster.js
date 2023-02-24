const mongoose = require("mongoose")
const Shift = require("./shift")

const RosterSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: true
    },  
    end: {
        type: Date,
        required: true
    },
    shifts: [Shift.schema],
})

const Roster = mongoose.model("Roster", RosterSchema)

module.exports = Roster