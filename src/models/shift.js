const mongoose = require("mongoose")

const ShiftSchema = new mongoose.Schema({
    start: Date,
    end: Date
})

const Shift = mongoose.model("Shift", ShiftSchema)

module.exports = Shift