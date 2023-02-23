const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Availability = require("./availability")

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    dob: Date,
    availability: [Availability.schema],
    shifts: [{type: Schema.Types.ObjectId, ref: 'Shift'}]
})

const User = mongoose.model("User", UserSchema)

module.exports = User 