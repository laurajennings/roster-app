const mongoose = require("mongoose")
const Unavailability = require("./unavailability")

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    is_admin: Boolean,
    phone: String,
    dob: Date,
    unavailable: [Unavailability.schema],
})

const User = mongoose.model("User", UserSchema)

module.exports = User 