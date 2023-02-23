const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ShiftSchema = new mongoose.Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model("Shift", ShiftSchema)

