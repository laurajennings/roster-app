const { json, response } = require("express")
const User = require("../../models/user")

async function registerUser(user) {
    const existingUser = await User.findOne({email: user.email})
    if(existingUser) {
        return {error: "Email already exsits"}
    }
    const userCreated = await User.create({
        name: user.name,
        email: user.email,
        password: user.password
    })
}

async function loginUser(user) {
    const existingUser = await User.findOne({username: user.username})
        if (!existingUser || !existingUser.password) {
            return {error: "username or password is incorrect"}
        }
        return response.json("login successfull")
    
}

async function getUsers() {
    const users = await User.find()
    return users
}

async function deleteUser(userId) {
    const deletedUser = await User.findByIdAndDelete(userId)
    return deletedUser
}

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    deleteUser,
}