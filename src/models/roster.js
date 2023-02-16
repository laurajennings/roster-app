const mongoose = require("mongoose")

const RosterShiftSchema = new mongoose.Schema({
    shift_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift"
    },
}, {
    toJSON: {
        virtuals: true,
    }
})

const RosterSchema = new mongoose.Schema({
    user_id: String, 
    shifts: [RosterShiftSchema],
})

RosterShiftSchema.virtual("shift", {
    localField: "shift_id",
    foreignField: "_id",
    ref:"Shift",
    justOne: true,
})

const Roster = mongoose.model("Roster", RosterSchema)

module.exports = Roster