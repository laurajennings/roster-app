const mongoose = require("mongoose")

const RosterShiftSchema = new mongoose.Schema({
    shift_id: String,
})

const RosterSchema = new mongoose.Schema({
    user_id: String, 
    shifts: [RosterShiftSchema],
})

const Roster = mongoose.model("Roster", RosterSchema)

module.exports = Roster