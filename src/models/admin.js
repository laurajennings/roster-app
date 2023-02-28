const mongoose = require("mongoose")
const Unavailability = require("./unavailability")

const AdminSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    dob: Date,
    unavailable: [Unavailability.schema],
})

const Admin = mongoose.model("Admin", AdminSchema)

module.exports = Admin 