const mongoose = require("mongoose")

const AvailabilitySchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    }
}) 

module.exports = mongoose.model("Availability", AvailabilitySchema)