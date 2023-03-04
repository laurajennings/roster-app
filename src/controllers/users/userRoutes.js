const express = require("express")
const {getUsers,
    getUserById,
    getUnavailabilities,
    //getShifts,
    registerUser, 
    deleteUser,
    loginUser,
} = require("./userControllers")
const userRouter = express.Router()

const auth = require("../../middlewares/auth")
const admin = require("../../middlewares/admin")
const use = require("../../middlewares/use")

// Gets all users' names, email, phone and dob
userRouter.get("/", use(async (request, response) => {
    const users = await getUsers()
    response.json(users)
}))

// Gets all users' unavailabilities
userRouter.get("/unavailabilities", admin, use(async (request, response) => {
    const unavailabilities = await getUnavailabilities()
    response.json(unavailabilities)
}))

userRouter.get("/:userId", admin, use(async (request, response) => {
    const user = await getUserById(request.params.userId)
    if(!user) {
        return response.status(404).json({
            data: "User doesn't exist"
        })
    }
    response.json(user)
}))

// Creates a new user
userRouter.post("/", use(async (request, response) => {
    const token = await registerUser ({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password,
        is_admin: request.body.is_admin,
        phone: request.body.phone,
        dob: request.body.dob,
        unavailable: request.body.unavailable,
    })
    if(token.error) {
        return response.status(400).json({data: token.error})
    }
    return response.json(token)
}))

// Login user
userRouter.post("/login", use(async (request, response) => {
    const token = await loginUser({
        email: request.body.email,
        password: request.body.password 
    })
    return response.json(token)
}))

// Deletes a user with userId
userRouter.delete("/:userId", admin, use(async (request, response) => {
    const user = await deleteUser(request.params.userId)
    response.json(user)
}))

module.exports = userRouter

/* 
// Gets a users shifts by userId
userRouter.get("/shifts/:userId", use(async (request, response) => {
     const user = await getUserById(request.params.userId)
        if(!user) {
            response.json({
            data: "User doesn't exist"
            }, 404)
        const shifts = await getShifts(request.params.userId)
        response.json(shifts)
    })) 
    */