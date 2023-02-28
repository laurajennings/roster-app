const { json, response } = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../../models/user")
const Admin = require("../../models/admin")
const Roster = require("../../models/roster")

// Gets all users' names, email, phone and dob
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

async function getUserById(userId) {
    const user = await User.findById(userId)
    return user
}

// Gets all users' unavailabilities 
async function getUnavailabilities() {
    const users = await User.find({}, {
        _id: 1, 
        firstName: 1, 
        lastName: 1,
        unavailable: 1})
    return users
}

// Gets a users shifts by userId
async function getShifts(userId) {
    const rosters = await Roster.find({ "shifts.employee": userId}, {
        _id: 0,
        startDte: 1,
        "shifts.$": 1
    })//.populate("shifts.employee", "firstName lastName")
    return rosters
}

// Creates a new user
async function registerUser(user) {
    const existingUser = await User.findOne({email: user.email})
    if(existingUser) {
        return {error: "Email already registered"}
    }
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const userCreated = await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
        phone: user.phone,
        dob: user.dob,
        unavailable: user.unavailable,
    })
    const payload = {
        id: userCreated._id
    }
    const token = jwt.sign(payload, "secret")
    return token
}

// Login user
async function loginUser(user) {
    const existingUser = await User.findOne({email: user.email})
        if (!existingUser) {
            return {error: "Username or password is incorrect"}
        }
        const isMatch = await bcrypt.compare(user.password, existingUser.password)
        if(!isMatch) {
            return {error: "Username or password is incorrect"}
        }
        const payload = {
            id: existingUser._id
        }
        const token = jwt.sign(payload, "secret")
        return token
    
}

// Login admin
async function loginAdmin(user) {
    const existingUser = await Admin.findOne({email: user.email})
        if (!existingUser) {
            return {error: "Username or password is incorrect"}
        }
        const isMatch = await bcrypt.compare(user.password, existingUser.password)
        if(!isMatch) {
            return {error: "Username or password is incorrect"}
        }
        const payload = {
            id: existingUser._id,
            is_admin: true,
        }
        const token = jwt.sign(payload, "secret")
        return token
    
}

// Deletes user with userId
async function deleteUser(userId) {
    const deletedUser = await User.findByIdAndDelete(userId)
    return deletedUser
}

module.exports = {
    getUsers,
    getUserById,
    getUnavailabilities,
    getShifts,
    registerUser, 
    deleteUser,
    loginUser,
    loginAdmin,
}
