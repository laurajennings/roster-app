const mongoose = require("mongoose")

const ShiftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
})

const Shift = mongoose.model("Shift", ShiftSchema)

module.exports = Shift

