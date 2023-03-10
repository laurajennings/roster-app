const { json, response } = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../../models/user")
const Roster = require("../../models/roster")

// Gets all users' names, email, phone and dob
async function getUsers() {
    const users = await User.find({}, {
        _id: 1, 
        firstName: 1, 
        lastName: 1,
        email: 1,
        is_admin: 1,
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
        unavailable: 1})
    return users
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
        is_admin: user.is_admin,
        phone: user.phone,
        dob: user.dob,
        unavailable: user.unavailable,
    })
    return userCreated
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
            id: existingUser._id,
            is_admin: existingUser.is_admin
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        return token
    
}

// Updates a user with userId
async function updateUser(userId, firstName, lastName, email, password, is_admin, phone, dob, unavailable) {
    const updatedUser = await User.findByIdAndUpdate(userId,
        {firstName, lastName, email, password, is_admin, phone, dob, unavailable},
        {new: true}
    )
    return updatedUser
}

// Deletes an unavailability with userId and unavailableId
async function deleteUnabailability(userId, unavailableId) {
    const filter = {_id: userId}
    const update = {$pull: {unavailable: {_id: unavailableId}}}
    const options = {new: true}
    const updatedUser = await User.findOneAndUpdate(filter, update, options)
    return updatedUser
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
    registerUser, 
    loginUser,
    updateUser,
    deleteUnabailability,
    deleteUser,
}
