const { json, response } = require("express")
const User = require("../../models/user")
const Shift = require("../../models/shift")
const Roster = require("../../models/roster")

async function registerUser(user) {
    const existingUser = await User.findOne({email: user.email})
    if(existingUser) {
        return {error: "Email already exsits"}
    }
    const userCreated = await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        availability: user.availability,
    })
}

/* async function loginUser(user) {
    const existingUser = await User.findOne({username: user.username})
        if (!existingUser || !existingUser.password) {
            return {error: "username or password is incorrect"}
        }
        return response.json("login successfull")
    
} */

async function getUsers() {
    const users = await User.find({}, {
        _id: 1, 
        firstName: 1, 
        lastName: 1,
        email: 1,
        phone: 1,
        dob: 1})
    return users
}

async function getAvailabilities() {
    const users = await User.find({}, {
        _id: 1, 
        firstName: 1, 
        lastName: 1,
        availability: 1})
    return users
}

async function getShiftsByUserId(userId) {
    try {
        const user = await User.findById(userId)
        if (!user) {
            return {error: "User not found"}
        }
        const shifts = await Roster.aggregate([
            {$match: {"shifts.employee": userId}}
        ])
    return shifts.map((roster) => roster.shifts)
    } catch (err) {
        console.log(err)
    }
}

async function deleteUser(userId) {
    const deletedUser = await User.findByIdAndDelete(userId)
    return deletedUser
}

module.exports = {
    registerUser,
    //loginUser,
    getUsers,
    getAvailabilities,
    getShiftsByUserId,
    deleteUser,
}