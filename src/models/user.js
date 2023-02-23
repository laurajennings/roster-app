const mongoose = require("mongoose")
const Availability = require("./availability")

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    dob: Date,
    availability: [Availability.schema],
})

const User = mongoose.model("User", UserSchema)

module.exports = User 